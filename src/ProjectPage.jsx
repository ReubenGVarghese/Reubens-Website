import React, { useState } from "react";
import { useParams } from "react-router-dom";
import projects from "./Projects.jsx";
import './ProjectPage.css';

export default function ProjectPage() {
  const { id } = useParams();
  const project = projects.find((p) => p.id === id);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

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

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') goToNext();
    if (e.key === 'ArrowLeft') goToPrev();
  };

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
            <img src={photo} alt={`${project.title} ${index}`} />
          </div>
        ))}
      </div>

      {/* LIGHTBOX */}
      {lightboxOpen && (
        <div 
          className="lightbox-overlay" 
          onClick={closeLightbox}
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          <button className="lightbox-close" onClick={closeLightbox}>×</button>
          
          <button 
            className="lightbox-nav lightbox-prev" 
            onClick={(e) => {
              e.stopPropagation();
              goToPrev();
            }}
          >
            ‹
          </button>

          <img 
            src={project.photos[currentIndex]} 
            alt={`${project.title} ${currentIndex}`}
            className="lightbox-image"
            onClick={(e) => e.stopPropagation()}
          />

          <button 
            className="lightbox-nav lightbox-next" 
            onClick={(e) => {
              e.stopPropagation();
              goToNext();
            }}
          >
            ›
          </button>

          <div className="lightbox-counter">
            {currentIndex + 1} / {project.photos.length}
          </div>
        </div>
      )}
    </div>
  );
}