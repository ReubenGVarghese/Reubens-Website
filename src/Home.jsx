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
        I'm a photographer and computer science maker who loves capturing real stories and building practical 
        tools that make life easier. Whether I'm creating images that reveal authentic moments or 
        coding projects that solve everyday problems, my goal is always to make people feel and connect.
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