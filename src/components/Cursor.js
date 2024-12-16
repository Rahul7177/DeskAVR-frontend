import React,{useEffect} from "react";
import '../stylesheets/Cursor.css'

const CustomCursor = () => {
    useEffect(() => {
      const cursor = document.querySelector('.custom-cursor');
      const links = document.querySelectorAll('a, button, .aboutus-card');
  
      document.addEventListener('mousemove', (e) => {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
      });
  
      links.forEach((link) => {
        link.addEventListener('mouseover', () => {
          cursor.classList.add('hovered');
        });
        link.addEventListener('mouseleave', () => {
          cursor.classList.remove('hovered');
        });
      });
  
      return () => {
        links.forEach((link) => {
          link.removeEventListener('mouseover', () => cursor.classList.add('hovered'));
          link.removeEventListener('mouseleave', () => cursor.classList.remove('hovered'));
        });
      };
    }, []);
  
    return <div className="custom-cursor"></div>;
  };

export default CustomCursor;