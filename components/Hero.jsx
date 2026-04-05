"use client";
import React, { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaGithub, FaLinkedin, FaEnvelope, FaDownload, FaArrowRight } from "react-icons/fa";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Realistic Floating Icon Component (Refined Size)
const FloatingTechCard = ({ src, delay, position, shadowColor }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ 
        opacity: 0.8, // Subtle visibility for background elements
        scale: 1,
        y: [0, -10, 0], // Subtle Floating movement
        rotate: [0, 3, -3, 0] // Very subtle tilting
      }}
      transition={{
        opacity: { duration: 0.5, delay },
        scale: { duration: 0.5, delay },
        y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: delay },
        rotate: { duration: 7, repeat: Infinity, ease: "easeInOut", delay: delay }
      }}
      style={{
        top: position.top, left: position.left, right: position.right, bottom: position.bottom,
      }}
      className="absolute z-0 pointer-events-none"
    >
      <div 
        style={{ filter: `drop-shadow(0 0 15px ${shadowColor}33)` }}
        className="relative bg-white/5 backdrop-blur-lg border border-white/5 p-3 md:p-4 rounded-full flex items-center justify-center transition-all duration-300"
      >
        <img 
          src={src} 
          alt="tech icon" 
          className="w-6 h-6 md:w-9 md:h-9 object-contain filter drop-shadow-md opacity-80" 
        />
      </div>
    </motion.div>
  );
};

export default function Hero() {
  const sectionRef = useRef(null);
  const editorRef = useRef(null);
  const contentRef = useRef(null);
  const nameRef = useRef(null);
  const [showIcons, setShowIcons] = useState(false);

  useEffect(() => {
    const nameText = "VALAYA DASE";
    let i = 0;
    const typing = setInterval(() => {
      if (nameRef.current) {
        nameRef.current.innerHTML = nameText.slice(0, i) + '<span class="text-blue-500 animate-pulse">|</span>';
        i++; if (i > nameText.length) clearInterval(typing);
      }
    }, 120);

    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=250%", 
          scrub: 1.2,
          pin: true,
          pinSpacing: true, 
        },
      });

      tl.to(editorRef.current, { scale: 0.5, rotateX: 25, opacity: 0, y: -100, duration: 1.5, ease: "power2.inOut" })
        .fromTo(contentRef.current, 
          { y: 150, opacity: 0, scale: 0.95 }, 
          { y: 0, opacity: 1, scale: 1, duration: 2, ease: "expo.out" }, "-=0.8");

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        onUpdate: (self) => setShowIcons(self.progress > 0.25)
      });
    }, sectionRef);

    return () => { ctx.revert(); clearInterval(typing); };
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-screen w-full bg-[#050505] overflow-hidden flex items-center justify-center font-inter">
      
      {/* 2.0 Floating Icons Layer (The Reality) */}
      <AnimatePresence>
        {showIcons && (
          <div className="absolute inset-0 z-0 pointer-events-none">
            {/* React Icon */}
            <FloatingTechCard 
              src="/react.png" delay={0} shadowColor="#61DAFB"
              position={{ top: "18%", left: "15%" }} 
            />
            {/* MongoDB Icon */}
            <FloatingTechCard 
              src="/mongo.png" delay={0.2} shadowColor="#47A248"
              position={{ top: "22%", right: "18%" }} 
            />
            {/* Node Icon */}
            <FloatingTechCard 
              src="/node.png" delay={0.4} shadowColor="#339933"
              position={{ bottom: "25%", left: "20%" }} 
            />
            {/* Next.js Icon */}
            <FloatingTechCard 
              src="/next.png" delay={0.6} shadowColor="#ffffff"
              position={{ bottom: "28%", right: "15%" }} 
            />
          </div>
        )}
      </AnimatePresence>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]" />

      {/* Code Editor Layer (Initial View) */}
      <div ref={editorRef} className="absolute z-20 w-full max-w-xl px-6 pointer-events-none">
        <div className="bg-[#0f0f0f]/90 border border-white/5 rounded-2xl shadow-2xl overflow-hidden">
          <div className="bg-white/5 p-3 flex gap-1.5 border-b border-white/5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
          </div>
          <div className="p-8 font-mono text-xs md:text-sm leading-relaxed text-white/70">
            <span className="text-pink-500 italic">class</span> <span className="text-blue-400 font-bold">ValayaDase</span>: <br/>
            <div className="pl-6 mt-2 border-l border-white/5">
              name = "<span ref={nameRef} className="text-yellow-100"></span>" <br/>
              focus = <span className="text-green-400">"Scalable Full-Stack Architecture"</span> <br/>
              location = <span className="text-purple-400">"Dombivli, MH"</span>
            </div>
          </div>
        </div>
      </div>

      {/* Final Hero Content (The Compact Reality) */}
      <div ref={contentRef} className="relative z-30 text-center px-6 opacity-0 flex flex-col items-center">
          
          <motion.span 
            className="text-blue-500 font-mono tracking-[0.6em] mb-4 block uppercase text-[10px]"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            Digital Architect
          </motion.span>
          
          {/* Typo: Chota aur sleek like reference 2 */}
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-white leading-none mb-10">
            VALAYA <span className="text-white/20">DASE.</span>
          </h1>

          {/* Para: Compact aur Light Weight */}
          <p className="text-white/40 text-sm md:text-base max-w-2xl mb-12 font-light leading-relaxed">
            Crafting high-performance <span className="text-white">Full-Stack experiences</span>. Currently a Computer Engineering Student at Watumull Institute.
          </p>
          
          <div className="flex flex-wrap justify-center items-center gap-10">
            {/* Social Icons - Clean & Professional */}
            <div className="flex gap-6 text-xl text-white/20">
              <motion.a whileHover={{ y: -5, color: '#fff' }} href="#" className="transition-all"><FaGithub /></motion.a>
              <motion.a whileHover={{ y: -5, color: '#3b82f6' }} href="#" className="transition-all"><FaLinkedin /></motion.a>
              <motion.a whileHover={{ y: -5, color: '#fff' }} href="#" className="transition-all"><FaEnvelope /></motion.a>
            </div>
            
            {/* Professional Buttons with Magnetic Hover Animation */}
            <div className="flex gap-3">
              <motion.button 
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="group flex items-center gap-2 px-8 py-4 bg-white text-black rounded-full font-bold text-xs uppercase tracking-widest hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] transition-all"
              >
                Hire Me
                <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
              </motion.button>
              
              <motion.button 
                whileHover={{ scale: 1.05, bg: "rgba(255,255,255,0.1)" }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 border border-white/10 text-white rounded-full font-bold text-xs uppercase tracking-widest flex items-center gap-2 transition-all"
              >
                <FaDownload /> CV
              </motion.button>
            </div>
          </div>
      </div>

    </section>
  );
}