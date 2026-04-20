"use client";
import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function TextMarquee() {
  const sectionRef = useRef(null);
  const topMarqueeRef = useRef(null);
  const bottomMarqueeRef = useRef(null);

  const skills = [
    "React", "Next.js", "Java", "MongoDB", "Node.js", 
    "TailwindCSS", "PostgreSQL", "Express", "TypeScript", "AWS"
  ];

  // Repeat skills to ensure the marquee is long enough to scroll infinitely or purely scrub
  const duplicatedSkills = [...skills, ...skills, ...skills, ...skills];

  useEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%", // Start when section enters viewport
          end: "bottom 20%", // End before it leaves viewport
          scrub: 1, // Smooth scrubbing, NO pinning so user doesn't wait
        }
      });

      const windowWidth = window.innerWidth;
      const scrollDistance = windowWidth * 0.6; // Moves only 60% of the screen width for a much slower, relaxed pace

      // Top Marquee - moves left
      tl.to(topMarqueeRef.current, {
        x: -scrollDistance,
        ease: "none"
      }, 0);

      // Bottom Marquee - moves right
      // Start shifted left so it can seamlessly move right towards 0
      gsap.set(bottomMarqueeRef.current, { x: -scrollDistance });
      tl.to(bottomMarqueeRef.current, {
        x: 0,
        ease: "none"
      }, 0);

      // Liquid Fill Animation for highlighted words (from bottom to top)
      tl.to(".liquid-fill", {
        clipPath: "inset(0% 0 0 0)",
        ease: "power2.inOut"
      }, 0.1);

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const Highlight = ({ children }) => (
    <span className="relative inline-block text-transparent whitespace-nowrap" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.4)" }}>
      {children}
      <span 
        className="liquid-fill absolute left-0 top-0 w-full h-full bg-gradient-to-t from-blue-600 via-blue-500 to-cyan-400 bg-clip-text text-transparent select-none drop-shadow-[0_0_15px_rgba(59,130,246,0.6)]" 
        style={{ WebkitTextStroke: "0px", clipPath: "inset(100% 0 0 0)" }}
        aria-hidden="true"
      >
        {children}
      </span>
    </span>
  );

  return (
    <section 
      ref={sectionRef} 
      // YAHAN CHANGE KIYA HAI: pt-24 pb-48 md:pt-32 md:pb-64 aur z-10 rakha hai
      className="relative w-full pt-24 pb-48 md:pt-32 md:pb-64 bg-[#030303] flex flex-col justify-center overflow-hidden z-10 border-t border-white/5"
    >
      {/* Edge gradients so text doesn't cut sharply */}
      <div className="absolute inset-y-0 left-0 w-24 md:w-48 bg-gradient-to-r from-[#030303] via-[#030303]/90 to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-24 md:w-48 bg-gradient-to-l from-[#030303] via-[#030303]/90 to-transparent z-10 pointer-events-none" />

      {/* Top Marquee */}
      <div className="w-full overflow-hidden flex mb-12 md:mb-16 opacity-60 select-none">
        <div ref={topMarqueeRef} className="flex items-center gap-8 md:gap-16 text-2xl md:text-5xl lg:text-6xl font-black uppercase text-transparent whitespace-nowrap" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.6)", width: "max-content" }}>
          {duplicatedSkills.map((skill, index) => (
            <React.Fragment key={`top-${index}`}>
              <span>{skill}</span>
              <span className="text-blue-500 text-2xl md:text-5xl">•</span>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Middle Sentence */}
      <div className="relative z-20 w-full max-w-[70rem] mx-auto px-6 md:px-12 text-center text-2xl md:text-4xl lg:text-5xl font-black leading-[1.3] md:leading-[1.4] text-white/90 tracking-tight">
        I bridge complex logic with minimalist design, building scalable <Highlight>full-stack</Highlight> solutions and <Highlight>robust APIs</Highlight> while crafting clean, intuitive <Highlight>user interfaces</Highlight>.
      </div>

      {/* Bottom Marquee */}
      <div className="w-full overflow-hidden flex mt-12 md:mt-16 opacity-60 select-none">
        <div ref={bottomMarqueeRef} className="flex items-center gap-8 md:gap-16 text-2xl md:text-5xl lg:text-6xl font-black uppercase text-transparent whitespace-nowrap" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.6)", width: "max-content" }}>
          {duplicatedSkills.map((skill, index) => (
            <React.Fragment key={`bottom-${index}`}>
              <span>{skill}</span>
              <span className="text-blue-500 text-2xl md:text-5xl">•</span>
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}