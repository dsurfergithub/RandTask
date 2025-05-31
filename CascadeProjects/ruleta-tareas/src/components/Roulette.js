import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import './styles.css';

const Roulette = ({ tasks, isSpinning, onSpinComplete }) => {
  useEffect(() => {
    if (isSpinning && tasks.length > 0) {
      const timer = setTimeout(() => {
        const randomIndex = Math.floor(Math.random() * tasks.length);
        onSpinComplete(tasks[randomIndex]);
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [isSpinning, tasks, onSpinComplete]);

  if (tasks.length === 0) {
    return (
      <div className="roulette-wheel">
        ¡Añade tareas para girar la rueda!
      </div>
    );
  }

  return (
    <motion.div 
      className="roulette-wheel"
      animate={{
        rotate: isSpinning ? 3600 : 0,
        transition: { 
          duration: 3, 
          ease: "easeOut" 
        }
      }}
    >
      {tasks.map((task, index) => {
        const rotation = (360 / tasks.length) * index;
        return (
          <div 
            key={index} 
            className={`roulette-segment ${index % 2 === 0 ? 'segment-green' : 'segment-yellow'}`}
            style={{
              transform: `rotate(${rotation}deg)`,
              transformOrigin: "50% 50%"
            }}
          >
            <div 
              className="roulette-text"
              style={{
                transform: `rotate(${rotation > 180 ? 180 : 0}deg)`,
                transformOrigin: 'center',
                position: 'absolute',
                bottom: '50%',
                width: '100px',
                textAlign: 'center'
              }}
            >
              {task}
            </div>
          </div>
        );
      })}
    </motion.div>
  );
};

export default Roulette;
