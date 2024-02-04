import React, { useState, useRef } from 'react';
import styles from '../styles/Home.module.css';

const Gradient = () => {
  const [waves, setWaves] = useState([]);
  const containerRef = useRef(null);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const containerRect = containerRef.current.getBoundingClientRect();

    const offsetX = clientX - containerRect.left;
    const offsetY = clientY - containerRect.top;

    const newWave = {
      id: Date.now(),
      x: offsetX,
      y: offsetY,
    };

    setWaves([...waves, newWave]);

    // Remove the oldest wave after a certain threshold to prevent too many waves
    if (waves.length > 200) {
      setWaves(waves.slice(1));
    }
  };

  return (
    <div ref={containerRef} className={styles.gradient} onMouseMove={handleMouseMove}>
      {waves.map((wave) => (
        <div
          key={wave.id}
          className={styles.wave}
          style={{
            left: wave.x,
            top: wave.y,
          }}
        />
      ))}
      <h1>Your Website Title</h1>
      <p>Your website content goes here.</p>
    </div>
  );
};

export default Gradient;