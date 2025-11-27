import React from "react";
import ProfileBubble from "./ProfileBubble.jsx";
import "./Resume.css";

export default function ResumePage() {
  return (
    <ProfileBubble>
      <div className="resume-page">
        <h1 className="resume-title">Resume</h1>

        <div className="resume-links">
          <a
            href="/assets/Reuben Varghese Tech Resume.pdf"
            download
            className="resume-download"
          >
            Download Tech Resume (PDF)
          </a>
          <a
            href="/assets/Reuben Varghese Business Resume.pdf"
            download
            className="resume-download business"
          >
            Download Business Resume (PDF)
          </a>
        </div>

        <div className="resume-grid">

          {/* Education */}
          <div className="resume-card">
            <h2>Education</h2>
            <p><strong>Western University</strong></p>
            <p>B.Sc. Computer Science</p>
            <p><em>Ivey AEO Status</em></p>
          </div>

          {/* Technical Skills */}
          <div className="resume-card">
            <h2>Technical Skills</h2>
            <div className="skills-grid">
              <span>Python</span>
              <span>JavaScript</span>
              <span>Java</span>
              <span>React</span>
              <span>HTML/CSS</span>
              <span>SQL</span>
              <span>C/C++</span>
              <span>Git</span>
              <span>APIs</span>
            </div>
          </div>

          {/* Business Skills */}
          <div className="resume-card">
            <h2>Business Skills</h2>
            <div className="skills-grid">
              <span>Leadership</span>
              <span>Project Management</span>
              <span>Public Speaking</span>
              <span>Excel</span>
              <span>Strategic Planning</span>
              <span>Operations</span>
              <span>Marketing</span>
            </div>
          </div>

          {/* Technical Experience */}
          <div className="resume-card">
            <h2>Technical Experience</h2>
            <ul>
              <li>
                <strong>Director of Projects – Founders Network</strong>
                Led workshops, managed 40+ students, organized tech-focused events.
              </li>
              <li>
                <strong>Tech Coordinator – Marthoma Church</strong>
                Improved livestream workflow by 60%, implemented new AV system.
              </li>
              <li>
                <strong>Web Developer</strong>
                Built responsive portfolio website using React, CSS, routing.
              </li>
            </ul>
          </div>

          {/* Business Experience */}
          <div className="resume-card">
            <h2>Business & Operations</h2>
            <ul>
              <li>
                <strong>Director of Operations – Gen Connect</strong>
                Managed a $5K budget, expanded community engagement by 40%.
              </li>
              <li>
                <strong>Student Council President</strong>
                Oversaw fundraising, events, club operations, and leadership teams.
              </li>
            </ul>
          </div>

          {/* Leadership */}
          <div className="resume-card">
            <h2>Leadership</h2>
            <ul>
              <li>
                <strong>President – Photography Club</strong>
                Led creative direction and organized member exhibitions.
              </li>
              <li>
                <strong>President – Student Council</strong>
                Represented student body and coordinated school-wide initiatives.
              </li>
              <li>
                <strong>Director – Founders Network</strong>
                Managed project teams and facilitated startup workshops.
              </li>
            </ul>
          </div>

          {/* Projects */}
          <div className="resume-card">
            <h2>Projects</h2>
            <ul>
              <li>
                <strong>Portfolio Website</strong>
                Built with React, responsive layout, dynamic project pages.
              </li>
              <li>
                <strong>Weather App</strong>
                Real-time API integration, dynamic UI, local caching.
              </li>
              <li>
                <strong>Photography Portfolio</strong>
                Created multiple albums documenting travel, events, and portraits.
              </li>
            </ul>
          </div>

        </div>
      </div>
    </ProfileBubble>
  );
}