import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import projects from "./Projects.jsx";
import './ProjectPage.css';

export default function ProjectPage() {
  const { id } = useParams();
  const project = projects.find((p) => p.id === id);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const lightboxRef = useRef(null);

  if (!project) return <h2>Project Not Found</h2>;

  const openLightbox = (index) => {
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

  // Handle keyboard navigation - independent state
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

      {/* Independent Lightbox State - No scroll locking */}
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
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
