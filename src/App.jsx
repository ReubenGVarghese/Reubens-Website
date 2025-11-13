// App.jsx
import { Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './Home.jsx'
import Navbar from './Navbar.jsx'
import About from './About.jsx'

function App() {
  return (
    <>
      <Navbar /> 
      <div className="page-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </>
  )
}

export default App
