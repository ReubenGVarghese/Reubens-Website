import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import projects from "./Projects.jsx";
import { useScrollAnimation } from "./hooks/useScrollAnimation";
import { useCounter } from "./hooks/useCounter";
import './Gallery.css';

export default function Gallery() {
  const [titleRef, titleVisible] = useScrollAnimation({ threshold: 0.3 });
  const [gridRef, gridVisible] = useScrollAnimation({ threshold: 0.1 });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        });
      }
    };

    const hero = heroRef.current;
    if (hero) {
      hero.addEventListener('mousemove', handleMouseMove);
      return () => hero.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  return (
    <div className="gallery">
      {/* INTERACTIVE HERO SECTION */}
      <div 
        ref={heroRef}
        className="gallery-hero"
        style={{
          '--mouse-x': `${mousePosition.x}px`,
          '--mouse-y': `${mousePosition.y}px`
        }}
      >
        {/* INTERACTIVE BACKGROUND GRID */}
        <div className="hero-grid"></div>
        

        {/* INTERACTIVE PARTICLES */}
        <div className="interactive-particles">
          {[...Array(20)].map((_, i) => (
            <div 
              key={i}
              className="particle"
              style={{
                '--delay': `${i * 0.1}s`,
                '--duration': `${10 + (i % 5) * 2}s`
              }}
            ></div>
          ))}
        </div>

        {/* MAIN CONTENT */}
        <div ref={titleRef} className={`gallery-title-wrapper ${titleVisible ? 'visible' : ''}`}>
          <div className="title-container">
            <h1 className="gallery-main-title">
              <span className="title-line interactive-text" data-text="Photography">
                Photography
              </span>
              <span className="title-line highlight interactive-text" data-text="Portfolio">
                Portfolio
              </span>
            </h1>
            <p className="gallery-subtitle">Capturing moments, telling stories</p>
            
            {/* INTERACTIVE STATS */}
            <StatsCounter 
              collections={4}
              photosText=">6-7"
            />
          </div>
        </div>

        {/* MOUSE TRACKER EFFECT */}
        <div 
          className="mouse-tracker"
          style={{
            left: mousePosition.x,
            top: mousePosition.y
          }}
        ></div>
      </div>

      {/* INTERACTIVE BACKGROUND PHOTOS - CURSOR RESPONSIVE */}
      <InteractiveBackgroundPhotos mousePosition={mousePosition} />

      {/* PHOTO GRID WITH MASONRY LAYOUT */}
      <div ref={gridRef} className={`photo-grid-container ${gridVisible ? 'visible' : ''}`}>
        <h2 className="collections-title">Collections</h2>
        <div className="photo-grid">
          {projects.map((project, index) => (
            <GalleryCard 
              key={project.id} 
              project={project} 
              index={index}
            />
          ))}
        </div>
      </div>

      {/* DECORATIVE ELEMENTS */}
      <div className="gallery-decorations">
        <div className="decoration decoration-1"></div>
        <div className="decoration decoration-2"></div>
        <div className="decoration decoration-3"></div>
      </div>
    </div>
  );
}

function GalleryCard({ project, index }) {
  const [cardRef, cardVisible] = useScrollAnimation({ 
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
  });
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const cardElementRef = useRef(null);

  // Random sizing for masonry effect
  const sizes = ['small', 'medium', 'large'];
  const randomSize = sizes[index % sizes.length];

  const handleMouseMove = (e) => {
    if (cardElementRef.current) {
      const rect = cardElementRef.current.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
  };

  return (
    <Link 
      to={`/project/${project.id}`} 
      className={`photo-card ${randomSize} ${cardVisible ? 'visible' : ''} ${isHovered ? 'hovered' : ''}`}
      ref={(node) => {
        cardRef.current = node;
        cardElementRef.current = node;
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setMousePos({ x: 0, y: 0 });
      }}
      onMouseMove={handleMouseMove}
      style={{ 
        animationDelay: `${index * 0.1}s`,
        transitionDelay: `${index * 0.05}s`,
        '--mouse-x': `${mousePos.x}px`,
        '--mouse-y': `${mousePos.y}px`
      }}
    >
      {/* IMAGE WRAPPER */}
      <div className="image-wrap">
        <img 
          src={project.cover} 
          alt={project.title}
          loading="lazy"
        />
        <div className="image-overlay"></div>
        <div className="image-shine"></div>
      </div>

      {/* TITLE AND INFO */}
      <div className="card-content">
        <div className="card-title-wrapper">
          <h3 className="card-title">{project.title}</h3>
          {project.subtitle && (
            <p className="card-subtitle">{project.subtitle}</p>
          )}
          <div className="card-line"></div>
        </div>
        <div className="card-info">
          <span className="card-photo-count">{project.photos.length} photos</span>
          <span className="card-arrow">→</span>
        </div>
      </div>

      {/* HOVER EFFECT OVERLAY */}
      <div className={`card-hover-overlay ${isHovered ? 'active' : ''}`}>
        <div className="hover-content">
          <span className="hover-text">View Collection</span>
        </div>
      </div>

      {/* DECORATIVE CORNERS */}
      <div className="card-corner corner-tl"></div>
      <div className="card-corner corner-tr"></div>
      <div className="card-corner corner-bl"></div>
      <div className="card-corner corner-br"></div>

      {/* INTERACTIVE GLOW EFFECT */}
      <div 
        className="card-glow"
        style={{
          left: mousePos.x,
          top: mousePos.y
        }}
      ></div>
    </Link>
  );
}

function InteractiveBackgroundPhotos({ mousePosition }) {
  const heroRef = useRef(null);
  const numPhotos = 15;
  const [photoOffsets, setPhotoOffsets] = useState(Array(numPhotos).fill({ x: 0, y: 0, scale: 1 }));

  // Get photos from all projects except baptism
  const allPhotos = projects
    .filter(p => p.id !== "jonathans-baptism")
    .flatMap(p => p.photos);
  // Cycle through photos if we need more than available
  const selectedPhotos = [];
  for (let i = 0; i < numPhotos; i++) {
    selectedPhotos.push(allPhotos[i % allPhotos.length]);
  }
  
  // Fixed positions for photos (distributed across the background)
  const photoPositions = [
    { x: 10, y: 15, rotation: -8 },
    { x: 25, y: 10, rotation: 12 },
    { x: 40, y: 20, rotation: -5 },
    { x: 60, y: 12, rotation: 10 },
    { x: 80, y: 18, rotation: -12 },
    { x: 15, y: 35, rotation: 7 },
    { x: 35, y: 30, rotation: -10 },
    { x: 55, y: 40, rotation: 8 },
    { x: 75, y: 35, rotation: -7 },
    { x: 90, y: 45, rotation: 15 },
    { x: 20, y: 60, rotation: -9 },
    { x: 45, y: 65, rotation: 11 },
    { x: 65, y: 70, rotation: -6 },
    { x: 85, y: 75, rotation: 9 },
    { x: 30, y: 85, rotation: -11 }
  ];

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        
        const newOffsets = photoPositions.map((pos, idx) => {
          const photoX = (pos.x / 100) * rect.width;
          const photoY = (pos.y / 100) * rect.height;
          
          const distanceX = mouseX - photoX;
          const distanceY = mouseY - photoY;
          const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
          const maxDistance = 250;
          
          if (distance < maxDistance && distance > 0) {
            const strength = (maxDistance - distance) / maxDistance;
            return {
              x: (distanceX / distance) * strength * 25,
              y: (distanceY / distance) * strength * 25,
              scale: 1 + strength * 0.15
            };
          }
          return { x: 0, y: 0, scale: 1 };
        });
        
        setPhotoOffsets(newOffsets);
      }
    };

    const hero = heroRef.current;
    if (hero) {
      hero.addEventListener('mousemove', handleMouseMove, { passive: true });
      return () => hero.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  return (
    <div ref={heroRef} className="interactive-background-photos">
      {selectedPhotos.map((photo, idx) => {
        const pos = photoPositions[idx] || { x: 50, y: 50, rotation: 0 };
        const offset = photoOffsets[idx] || { x: 0, y: 0, scale: 1 };

        return (
          <div
            key={`bg-photo-${idx}`}
            className="interactive-bg-photo"
            style={{
              left: `${pos.x}%`,
              top: `${pos.y}%`,
              transform: `translate(${offset.x}px, ${offset.y}px) rotate(${pos.rotation}deg) scale(${offset.scale})`,
              transition: 'transform 0.15s ease-out'
            }}
          >
            <img src={photo} alt={`Background photo ${idx + 1}`} />
            <div className="bg-photo-overlay"></div>
          </div>
        );
      })}
    </div>
  );
}

function StatsCounter({ collections, photosText }) {
  const collectionsCount = 4;
  
  return (
    <div className="hero-stats">
      <div className="stat-item">
        <span className="stat-number">{collectionsCount}</span>
        <span className="stat-label">Collections</span>
      </div>
      <div className="stat-item">
        <span className="stat-number">{photosText}</span>
        <span className="stat-label">Photos</span>
      </div>
      <div className="stat-item">
        <span className="stat-number">2024</span>
        <span className="stat-label">Year</span>
      </div>
    </div>
  );
}
