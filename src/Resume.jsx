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
            href="/assets/Reuben Varghese Resume.pdf"
            download
            className="resume-download"
          >
            Download Resume (PDF)
          </a>
        </div>

        <div className="resume-grid">

          {/* Education */}
          <div className="resume-card">
            <h2>Education</h2>
            <p><strong>Western University</strong> — London, ON</p>
            <p>B.Sc. in Computer Science with Ivey Advanced Entry Opportunity (AEO)</p>
            <p><em>Sept 2025 – May 2029</em></p>
          </div>

          {/* Technical Skills */}
          <div className="resume-card">
            <h2>Technical Skills</h2>
            <div className="skills-grid">
              <span>Python (Pandas/NumPy)</span>
              <span>JavaScript (React)</span>
              <span>Node</span>
              <span>C/C++</span>
              <span>HTML/CSS</span>
              <span>SQL</span>
              <span>Excel (Pivot Tables, VLOOKUP, Modeling)</span>
              <span>Tableau</span>
              <span>Power BI</span>
              <span>PowerPoint</span>
              <span>Google Cloud</span>
              <span>Git</span>
              <span>APIs</span>
            </div>
          </div>

          {/* Business Skills */}
          <div className="resume-card">
            <h2>Business Skills</h2>
            <div className="skills-grid">
              <span>Project Management</span>
              <span>Strategic Planning</span>
              <span>Financial Modeling</span>
              <span>Marketing</span>
              <span>Operations</span>
              <span>Partnership Development</span>
              <span>Data-Driven Analytics</span>
            </div>
          </div>

          {/* Experience */}
          <div className="resume-card">
            <h2>Experience</h2>
            <ul>
              <li>
                <strong>AI/ML Student Research</strong> — University Health Network, Toronto
                <br /><em>Jan 2026 – Present</em>
                <br />Developed survival-analysis models using clinical datasets in Python (Pandas, scikit-survival). Implemented Kaplan–Meier estimators, Cox proportional hazards models, and DeepSurv neural networks.
              </li>
              <li>
                <strong>Director of Operations</strong> — Gen Connect, Toronto
                <br /><em>Sept 2023 – Present</em>
                <br />Founded a registered non-profit connecting youth with elders. Led technical coordination, partnerships, and data-driven marketing that increased attendance and volunteer engagement by 40%.
              </li>
              <li>
                <strong>Director of Projects</strong> — Western Founders Network, London
                <br /><em>Oct 2025 – Present</em>
                <br />Led teams in organizing student-led full-stack projects. Hosted technical workshops teaching React, APIs, ML structure, and Git version control.
              </li>
              <li>
                <strong>Small Business Owner (Photography Services)</strong> — Self-Employed, GTA
                <br /><em>Apr 2022 – July 2025</em>
                <br />Designed operational systems for scheduling and client tracking. Used analytics and SEO to increase customer acquisition by 70%.
              </li>
            </ul>
          </div>

          {/* Projects */}
          <div className="resume-card">
            <h2>Projects</h2>
            <ul>
              <li>
                <strong>WFN Browser</strong> <em>(WIP 2025–2026)</em>
                <br />TypeScript, JavaScript, HTML, CSS — Custom browser interface inspired by Arc-style vertical tabs and workspaces. Built interactive tab components, event-driven state updates, and workspace management.
              </li>
              <li>
                <strong>Commercial Real Estate Financial Modeling</strong> <em>2025</em>
                <br />Excel, Python (Pandas) — Cash-flow model for income-producing property with cap rate analysis, financing structures, leverage assumptions, and debt service coverage evaluation.
              </li>
              <li>
                <strong>Survival Modelling Framework — ML Survival Analysis Toolkit</strong> <em>2026</em>
                <br />Python, Pandas, Scikit-learn, Matplotlib — Modular ML framework for time-to-event prediction using Cox models, Random Survival Forests, and Deep Forest architectures.
              </li>
            </ul>
          </div>

        </div>
      </div>
    </ProfileBubble>
  );
}
