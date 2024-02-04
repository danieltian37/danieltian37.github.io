import React, { useEffect } from 'react';
import styles from '../styles/Home.module.css';

const Faders = ({ children, margin = '-400px' }) => {
    useEffect(() => {
      const elements = document.querySelectorAll(`.${styles.fadein}`);
      
      const handleIntersection = (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.appear);
          } else {
            entry.target.classList.remove(styles.appear);
          }
        });
      };

      const intersectionObserver = new IntersectionObserver(handleIntersection, {
        threshold: 0.2,
        rootMargin: margin + " 5px -100px 5px",
      });

      elements.forEach(element => {
        intersectionObserver.observe(element);
      });

      return () => {
        elements.forEach(element => {
          intersectionObserver.unobserve(element);
        });
      };
  }, []);

  return (
    <div className={`${styles.fadein}`}>
      { children }
    </div>
  );
}

export default Faders;