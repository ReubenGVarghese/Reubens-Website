import React from "react";
import "./ProfileBubble.css";


export default function ProfileBubble({ children }) {
  return (
    <div className="profile-bubble">
      <img 
        src="/assets/headshot.jpg" 
        alt="Headshot"
        className="headshot"
      />

      <h2 className="profile-name">Reuben Varghese</h2>
      <p className="profile-title">ReubenGVarghese@gmail.com</p>

      {/* Everything passed in (resume content) goes inside the bubble */}
      <div className="bubble-content">
        {children}
      </div>
    </div>
  );
}
