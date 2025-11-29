import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useScrollAnimation } from './hooks/useScrollAnimation'
import './Home.css'

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [titleOffset, setTitleOffset] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const headshotRef = useRef(null);
  
  const [subtitleRef, subtitleVisible] = useScrollAnimation({ threshold: 0.3 });
  const [aboutRef, aboutVisible] = useScrollAnimation({ threshold: 0.2 });
  const [buttonsRef, buttonsVisible] = useScrollAnimation({ threshold: 0.2 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        setMousePosition({ x, y });

        // Calculate push effect for title
        if (titleRef.current) {
          const titleRect = titleRef.current.getBoundingClientRect();
          const titleCenterX = titleRect.left + titleRect.width / 2;
          const titleCenterY = titleRect.top + titleRect.height / 2;
          
          const distanceX = e.clientX - titleCenterX;
          const distanceY = e.clientY - titleCenterY;
          const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
          
          // Push effect within 200px
          if (distance < 200) {
            const strength = (200 - distance) / 200;
            setTitleOffset({
              x: distanceX * strength * 0.1,
              y: distanceY * strength * 0.1
            });
          } else {
            setTitleOffset({ x: 0, y: 0 });
          }
        }

        // Push effect for headshot
        if (headshotRef.current) {
          const headshotRect = headshotRef.current.getBoundingClientRect();
          const headshotCenterX = headshotRect.left + headshotRect.width / 2;
          const headshotCenterY = headshotRect.top + headshotRect.height / 2;
          
          const distanceX = e.clientX - headshotCenterX;
          const distanceY = e.clientY - headshotCenterY;
          const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
          
          if (distance < 250) {
            const strength = (250 - distance) / 250;
            headshotRef.current.style.transform = `translate(${distanceX * strength * 0.15}px, ${distanceY * strength * 0.15}px) scale(${1 + strength * 0.05})`;
          } else {
            headshotRef.current.style.transform = 'translate(0, 0) scale(1)';
          }
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="home-container"
      style={{
        '--mouse-x': `${mousePosition.x}px`,
        '--mouse-y': `${mousePosition.y}px`
      }}
    >
      {/* INTERACTIVE TITLE SECTION WITH INTEGRATED PROFILE */}
      <section className="hero-intro-section">
        <div className="interactive-title-wrapper">
          <h1 
            ref={titleRef}
            className="interactive-title"
            style={{
              transform: `translate(${titleOffset.x}px, ${titleOffset.y}px)`
            }}
          >
            <span className="title-word" data-word="Hey">Hey</span>
            <span className="title-word" data-word="I'm">I'm</span>
            <span className="title-word highlight" data-word="Reuben">Reuben</span>
          </h1>
        </div>

        {/* PROFILE PHOTO INTEGRATED INTO INITIAL VIEW */}
        <div 
          ref={headshotRef}
          className="profile-photo-container integrated"
        >
          <div className="profile-frame">
            <div className="profile-glow"></div>
            <div className="profile-particles">
              {[...Array(12)].map((_, i) => (
                <div 
                  key={i}
                  className="profile-particle"
                  style={{
                    '--angle': `${(i * 30)}deg`,
                    '--delay': `${i * 0.1}s`
                  }}
                ></div>
              ))}
            </div>
            <img 
              src="/assets/Portrait.jpg" 
              alt="Reuben" 
              className="profile-photo"
            />
            <div className="profile-border"></div>
          </div>
        </div>
      </section>

      {/* SCROLL REVEAL SECTIONS */}
      <section 
        className={`reveal-section subtitle-section ${subtitleVisible ? 'visible' : ''}`}
        ref={subtitleRef}
      >
        <div className="reveal-content">
          <p className="reveal-subtitle">
            <span className="reveal-item">Photographer</span>
            <span className="reveal-separator">•</span>
            <span className="reveal-item">Creator</span>
            <span className="reveal-separator">•</span>
            <span className="reveal-item">Storyteller</span>
          </p>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section 
        className={`reveal-section about-section ${aboutVisible ? 'visible' : ''}`}
        ref={aboutRef}
      >
        <div className="reveal-content">
          <p className="about-text">
            I'm a <span className="highlight-text">photographer</span> and <span className="highlight-text">computer science maker</span> who loves capturing real stories and building practical 
            tools that make life easier. Whether I'm creating images that reveal authentic moments or 
            coding projects that solve everyday problems, my goal is always to <span className="highlight-text">make people feel and connect</span>.
          </p>
        </div>
      </section>

      {/* BUTTONS SECTION */}
      <section 
        className={`reveal-section buttons-section ${buttonsVisible ? 'visible' : ''}`}
        ref={buttonsRef}
      >
        <div className="reveal-content">
          <div className="home-buttons">
            <Link to="/gallery" className="home-btn primary-btn">
              <span className="btn-bg"></span>
              <span className="btn-content">
                <span className="btn-text">Explore Portfolio</span>
                <span className="btn-arrow">→</span>
              </span>
            </Link>
            <a 
              href="https://github.com/ReubenGVarghese" 
              target="_blank" 
              rel="noopener noreferrer"
              className="home-btn secondary-btn"
            >
              <span className="btn-bg"></span>
              <span className="btn-content">
                <span className="btn-text">View Code</span>
                <span className="btn-arrow">→</span>
              </span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
