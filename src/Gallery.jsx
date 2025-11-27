import { Link } from "react-router-dom";
import projects from "./Projects.jsx";
import projectpage from "./ProjectPage.jsx";
import './Gallery.css';

export default function Gallery() {
  return (
    <div className="gallery">
      <h2>Photography Projects</h2>

      <div className="photo-grid">
        {projects.map((project) => (
          <Link 
            to={`/project/${project.id}`} 
            className="photo-card" 
            key={project.id}
          >

            {/* IMAGE WRAPPER WITH BLUR EFFECT */}
            <div className="image-wrap">
              <img src={project.cover} alt={project.title} />
            </div>

            {/* TITLE CENTERED ON IMAGE */}
            <h3>{project.title}</h3>

          </Link>
        ))}
      </div>
    </div>
  );
}
