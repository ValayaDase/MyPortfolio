"use client";
import React, { useEffect, useState } from "react";

const CHARS = "!<>-_\\/[]{}—=+*^?#________";

export default function ScrambleText({ text, delay = 0, className, speed = 30, iterations = 3 }) {
  const [displayText, setDisplayText] = useState(text.replace(/./g, " "));

  useEffect(() => {
    let timeout;
    let interval;
    
    timeout = setTimeout(() => {
      let iteration = 0;
      
      interval = setInterval(() => {
        setDisplayText(() => 
          text
            .split("")
            .map((letter, index) => {
              if(index < iteration) {
                return text[index];
              }
              return CHARS[Math.floor(Math.random() * CHARS.length)];
            })
            .join("")
        );
        
        if(iteration >= text.length){
          clearInterval(interval);
          setDisplayText(text);
        }
        
        iteration += 1 / iterations;
      }, speed);
    }, delay * 1000);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [text, delay, speed, iterations]);

  return <span className={className}>{displayText}</span>;
}
