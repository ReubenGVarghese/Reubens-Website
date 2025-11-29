import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import projects from "./Projects.jsx";
import './ProjectPage.css';

export default function ProjectPage() {
  const { id } = useParams();
  const project = projects.find((p) => p.id === id);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollY = useRef(0);
  const lightboxRef = useRef(null);

  if (!project) return <h2>Project Not Found</h2>;

  const openLightbox = (index) => {
    // Save scroll position BEFORE opening
    scrollY.current = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % project.photos.length);
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + project.photos.length) % project.photos.length);
  };

  // Lock scroll when lightbox is open - prevent scrolling out
  useEffect(() => {
    const preventScroll = (e) => {
      e.preventDefault();
      e.stopPropagation();
      return false;
    };

    if (lightboxOpen) {
      // Save scroll position
      scrollY.current = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
      
      // Lock body scroll - position fixed approach
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY.current}px`;
      document.body.style.left = '0';
      document.body.style.right = '0';
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
      
      // Lock html element
      document.documentElement.style.overflow = 'hidden';
      document.documentElement.style.position = 'fixed';
      document.documentElement.style.top = `-${scrollY.current}px`;
      
      // Hide navbar
      document.body.classList.add('lightbox-open');
      
      // Prevent all scroll events
      window.addEventListener('wheel', preventScroll, { passive: false });
      window.addEventListener('touchmove', preventScroll, { passive: false });
      window.addEventListener('scroll', preventScroll, { passive: false });
      document.addEventListener('wheel', preventScroll, { passive: false });
      document.addEventListener('touchmove', preventScroll, { passive: false });
    } else {
      // Show navbar
      document.body.classList.remove('lightbox-open');
      
      // Restore body styles
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
      
      // Restore html styles
      document.documentElement.style.overflow = '';
      document.documentElement.style.position = '';
      document.documentElement.style.top = '';
      
      // Restore scroll position immediately
      window.scrollTo(0, scrollY.current);
    }

    return () => {
      // Cleanup
      document.body.classList.remove('lightbox-open');
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      document.documentElement.style.position = '';
      document.documentElement.style.top = '';
      
      window.removeEventListener('wheel', preventScroll);
      window.removeEventListener('touchmove', preventScroll);
      window.removeEventListener('scroll', preventScroll);
      document.removeEventListener('wheel', preventScroll);
      document.removeEventListener('touchmove', preventScroll);
    };
  }, [lightboxOpen]);

  // Keyboard navigation
  useEffect(() => {
    if (!lightboxOpen) return;

    const handleKey = (e) => {
      if (e.key === 'Escape') {
        closeLightbox();
      } else if (e.key === 'ArrowRight') {
        goToNext();
      } else if (e.key === 'ArrowLeft') {
        goToPrev();
      }
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [lightboxOpen, currentIndex, project.photos.length]);

  return (
    <div className="project-page">
      <h1>{project.title}</h1>
      <div className="project-grid">
        {project.photos.map((photo, index) => (
          <div 
            className="project-photo-card" 
            key={index}
            onClick={() => openLightbox(index)}
          >
            <img src={photo} alt={`${project.title} ${index + 1}`} />
          </div>
        ))}
      </div>

      {/* Lightbox - Locked and Enhanced UI */}
      {lightboxOpen && (
        <>
          {/* Blurred Background Overlay */}
          <div 
            className="lightbox-backdrop" 
            onClick={closeLightbox}
            aria-hidden="true"
          />
          
          {/* Lightbox Content */}
          <div 
            ref={lightboxRef}
            className="lightbox-overlay" 
            onClick={closeLightbox}
          >
            <button 
              className="lightbox-close" 
              onClick={(e) => {
                e.stopPropagation();
                closeLightbox();
              }}
              aria-label="Close lightbox"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            
            <button 
              className="lightbox-nav lightbox-prev" 
              onClick={(e) => {
                e.stopPropagation();
                goToPrev();
              }}
              aria-label="Previous image"
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>

            <div 
              className="lightbox-image-container" 
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={project.photos[currentIndex]} 
                alt={`${project.title} ${currentIndex + 1}`}
                className="lightbox-image"
                key={currentIndex}
              />
            </div>

            <button 
              className="lightbox-nav lightbox-next" 
              onClick={(e) => {
                e.stopPropagation();
                goToNext();
              }}
              aria-label="Next image"
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>

            <div className="lightbox-counter">
              <span className="counter-current">{currentIndex + 1}</span>
              <span className="counter-separator">/</span>
              <span className="counter-total">{project.photos.length}</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
