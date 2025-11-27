import React from 'react'
import { Link } from 'react-router-dom'
import './Home.css'

export default function Home() {
  return (
    <div className="home-container">

      {/* HEADSHOT */}
      <div className="headshot-wrapper">
        <img 
          src="/assets/Portrait.jpg" 
          alt="Reuben Headshot" 
          className="headshot"
        />
      </div>

      {/* ANIMATED TITLE */}
      <h1 className="animated-title">
        This is Reuben.
      </h1>
      

      {/* SUBTEXT */}
      <p className="subtitle">
        SWE • Creator • Storyteller
      </p>

      {/* ABOUT SECTION */}
      <p className="about-text">
        I'm a photographer passionate about documenting real stories, authentic
        moments, and the beauty in everyday life.  
        Whether I'm traveling across the world or capturing meaningful events 
        close to home, my goal is to create images that make people feel something.
      </p>

      {/* OPTIONAL BUTTONS */}
      <div className="home-buttons">
        <Link to="/gallery" className="home-btn">View My Work</Link>
        <a 
          href="https://github.com/ReubenGVarghese" 
          target="_blank" 
          rel="noopener noreferrer"
          className="home-btn secondary"
        >
          See My CompSci Projects
        </a>
      </div>

    </div>
  );
}