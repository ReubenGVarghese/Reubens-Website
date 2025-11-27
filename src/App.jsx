// App.jsx
import { Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './Home.jsx'
import Navbar from './Navbar.jsx'
import About from './About.jsx'
import Gallery from './Gallery.jsx'
import CategoryPage from './CategoryPage.jsx'
import ProjectPage from './ProjectPage.jsx'
import Resume from './Resume.jsx'

function App() {
  return (
    <>
      <Navbar /> 
      <div className="page-content">
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/about" element={<About />} /> */}
          <Route path="/gallery" element={<Gallery />} />
          <Route path="category/:type" element={<CategoryPage />} />
          <Route path="/project/:id" element={<ProjectPage />} />
          <Route path="/resume" element={<Resume />} />
        </Routes>
      </div>
    </>
  )
}

export default App
