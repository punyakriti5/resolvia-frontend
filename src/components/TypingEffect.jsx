import React, { useState, useEffect } from 'react';
import './TypingEffect.css';

const TypingEffect = ({ text }) => {
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      setDisplayText((prevText) => {
        if (currentIndex === text.length) {
          currentIndex = 0; 
          return '';
        }
        const newText = prevText + text[currentIndex];
        currentIndex++;
        return newText;
      });
    }, 300); 
    return () => clearInterval(interval);
  }, [text]);

  return <span className="typing-effect">{displayText}</span>;
};

export default TypingEffect;

