import { useEffect } from 'react';

export const useCustomCursor = () => {
  useEffect(() => {
    // Only add custom cursor on desktop
    if (window.innerWidth < 768) {
      document.body.style.cursor = 'auto';
      return;
    }

    const cursor = document.createElement('div');
    const cursorDot = document.createElement('div');
    
    cursor.className = 'custom-cursor';
    cursorDot.className = 'custom-cursor-dot';
    
    document.body.appendChild(cursor);
    document.body.appendChild(cursorDot);
    
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    
    const moveCursor = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    
    const animateCursor = () => {
      cursorX += (mouseX - cursorX) * 0.1;
      cursorY += (mouseY - cursorY) * 0.1;
      
      cursor.style.left = cursorX + 'px';
      cursor.style.top = cursorY + 'px';
      cursorDot.style.left = mouseX + 'px';
      cursorDot.style.top = mouseY + 'px';
      
      requestAnimationFrame(animateCursor);
    };
    
    animateCursor();
    
    const handleMouseEnter = () => {
      cursor.style.width = '30px';
      cursor.style.height = '30px';
      cursor.style.borderColor = 'rgba(154, 176, 166, 1)';
      cursorDot.style.width = '8px';
      cursorDot.style.height = '8px';
    };
    
    const handleMouseLeave = () => {
      cursor.style.width = '20px';
      cursor.style.height = '20px';
      cursor.style.borderColor = 'rgba(154, 176, 166, 0.8)';
      cursorDot.style.width = '6px';
      cursorDot.style.height = '6px';
    };
    
    document.addEventListener('mousemove', moveCursor, { passive: true });
    document.body.style.cursor = 'none';
    
    // Use event delegation for dynamic elements
    const handleMouseEnterDelegated = (e) => {
      if (e.target.matches('a, button, .photo-card, .home-btn, .photo-card *')) {
        handleMouseEnter();
      }
    };
    
    const handleMouseLeaveDelegated = (e) => {
      if (e.target.matches('a, button, .photo-card, .home-btn, .photo-card *')) {
        handleMouseLeave();
      }
    };
    
    document.addEventListener('mouseenter', handleMouseEnterDelegated, true);
    document.addEventListener('mouseleave', handleMouseLeaveDelegated, true);
    
    return () => {
      document.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseenter', handleMouseEnterDelegated, true);
      document.removeEventListener('mouseleave', handleMouseLeaveDelegated, true);
      document.body.style.cursor = 'auto';
      if (cursor.parentNode) cursor.parentNode.removeChild(cursor);
      if (cursorDot.parentNode) cursorDot.parentNode.removeChild(cursorDot);
    };
  }, []);
};

