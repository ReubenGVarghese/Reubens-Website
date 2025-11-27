import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'



const navItems = [
  // { name: 'Home', path: '/' },
  // { name: 'About', path: '/about' },
  { name: 'Photography', path: '/gallery' },
  { name: 'Resume', path: '/resume' }
]

function Navbar(){
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || window.pageYOffset;
      setIsScrolled(scrollTop > 0);
    };

    // Set initial state in case page is already scrolled
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar${isScrolled ? ' scrolled' : ''}`}>
      <div className="navbar-logo">
        <Link to="/" className="navbar-logo"><p>Reuben's Home</p></Link>
      </div>
      <ul className="navbar-links">
        {navItems.map(item => (
          <li key={item.path}><Link to={item.path}>{item.name}</Link></li>
        ))}
      </ul>
    </nav>
  );
}

export default Navbar;