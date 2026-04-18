"use client";
import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function TextMarquee() {
  const sectionRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Dynamic calculation so it scrolls exactly from start to end
      const getScrollAmount = () => {
        let textWidth = textRef.current.scrollWidth;
        let windowWidth = window.innerWidth;
        return -(textWidth - windowWidth + 100); // 100px buffer margin
      };

      gsap.to(textRef.current, {
        x: getScrollAmount,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "center center", 
          // Scroll length adjusts automatically to the text length
          end: () => `+=${textRef.current.scrollWidth}`, 
          pin: true,
          pinSpacing: true,
          scrub: 1, // Smooth lag effect
          invalidateOnRefresh: true, // Recalculates on screen resize
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const contentList = [
    { text: "Bridging Complex Logic With Minimalist Design", stroke: true },
    { text: "Engineering Scalable Full-Stack Solutions", stroke: false },
    { text: "Developing Robust RESTful APIs", stroke: true },
    { text: "Crafting Intuitive User Interfaces", stroke: true },
  ];

  return (
    <section 
      ref={sectionRef} 
      className="relative w-full py-10 md:py-14 bg-[#030303] flex items-center overflow-hidden z-20 border-t border-b border-white/5"
    >
      {/* Edge gradients so text doesn't cut sharply */}
      <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-[#030303] via-[#030303]/90 to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-[#030303] via-[#030303]/90 to-transparent z-10 pointer-events-none" />

      {/* The moving text container */}
      <div 
        ref={textRef} 
        // 🚀 CRITICAL FIXES HERE: 
        // 1. `whitespace-nowrap` guarantees it stays on ONE single line.
        // 2. `text-2xl md:text-4xl` sets the perfect H2 size.
        className="flex items-center whitespace-nowrap font-black text-2xl md:text-4xl uppercase tracking-tight select-none pl-6 md:pl-12"
        style={{ width: "max-content" }}
      >
        {contentList.map((item, index) => (
          <React.Fragment key={index}>
            <span 
              className={item.stroke ? "text-transparent" : "text-white/60"}
              style={item.stroke ? { WebkitTextStroke: "1px rgba(255,255,255,0.5)" } : {}}
            >
              {item.text}
            </span>
            
            {/* The Blue Dot separator */}
            {index !== contentList.length - 1 && (
              <span className="mx-6 md:mx-10 text-blue-500 text-2xl md:text-4xl">•</span>
            )}
          </React.Fragment>
        ))}
      </div>
    </section>
  );
}