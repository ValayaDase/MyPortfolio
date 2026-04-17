"use client";
import React, { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaGithub, FaLinkedin, FaEnvelope, FaDownload, FaArrowRight } from "react-icons/fa";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// 🚀 Chote aur premium Dev Symbols
const DevSymbol = ({ char, delay, position, color, glow }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{
        opacity: [0.3, 0.7, 0.3],
        scale: 1,
        y: [0, -10, 0],
        rotate: [0, 4, -4, 0]
      }}
      transition={{
        opacity: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: delay },
        y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: delay },
      }}
      style={{ ...position, color: color, textShadow: `0 0 10px ${glow}` }}
      className="absolute z-0 pointer-events-none font-mono text-2xl md:text-4xl font-black select-none"
    >
      {char}
    </motion.div>
  );
};

export default function Hero() {
  const wrapperRef = useRef(null); // The tall container for scroll distance
  const editorRef = useRef(null);
  const contentRef = useRef(null);
  const nameRef = useRef(null);
  const [showIcons, setShowIcons] = useState(false);

  useEffect(() => {
    // 1. Console Typing Effect
    const nameText = "VALAYA DASE_";
    let i = 0;
    const typing = setInterval(() => {
      if (nameRef.current) {
        nameRef.current.innerHTML = nameText.slice(0, i) + '<span class="text-blue-500 animate-pulse">|</span>';
        i++; if (i > nameText.length) clearInterval(typing);
      }
    }, 120);

    // 2. GSAP Animation tied to the tall wrapper
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top top",
          end: "bottom bottom", // Animation finishes when wrapper ends
          scrub: 1.2,
          // 🚀 PIN HATA DIYA HAI. Sticky layout handle karega overlap!
        },
      });

      tl.to(editorRef.current, { scale: 0.5, rotateX: 25, opacity: 0, y: -100, duration: 1.5, ease: "power2.inOut" })
        .fromTo(contentRef.current,
          { y: 150, opacity: 0, scale: 0.95 },
          { y: 0, opacity: 1, scale: 1, duration: 2, ease: "expo.out" }, "-=0.8");

      ScrollTrigger.create({
        trigger: wrapperRef.current,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => setShowIcons(self.progress > 0.15)
      });
    }, wrapperRef);

    return () => { ctx.revert(); clearInterval(typing); };
  }, []);

  return (
    // 🚀 THE MAGIC WRAPPER: height is 250vh so you have plenty of time to scroll and see the animation
    <section ref={wrapperRef} className="relative w-full h-[250vh] z-10 bg-[#050505]">

      {/* 🚀 THE STICKY HERO: This stays fixed on screen while you scroll through the 250vh */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden font-inter">

        {/* Background Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:50px_50px]" />

        {/* Symbols Layer */}
        <AnimatePresence>
          {showIcons && (
            <div className="absolute inset-0 z-0 pointer-events-none">
              <DevSymbol char="</>" delay={0} color="#3b82f6" glow="rgba(59, 130, 246, 0.4)" position={{ top: "25%", left: "18%" }} />
              <DevSymbol char="{ }" delay={0.4} color="#8b5cf6" glow="rgba(139, 92, 246, 0.4)" position={{ top: "30%", right: "20%" }} />
              <DevSymbol char=";" delay={0.8} color="#10b981" glow="rgba(16, 185, 129, 0.4)" position={{ bottom: "25%", right: "18%" }} />
            </div>
          )}
        </AnimatePresence>

        {/* Editor Console */}
        <div ref={editorRef} className="absolute z-20 w-full max-w-lg px-6 pointer-events-none">
          <div className="bg-[#0f0f0f]/90 border border-white/5 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-md">
            <div className="bg-white/5 p-3 flex gap-1.5 border-b border-white/5">
              <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
            </div>
            <div className="p-8 font-mono text-xs md:text-sm leading-relaxed text-white/70">
              <span className="text-pink-500 italic">const</span> <span className="text-blue-400 font-bold">developer</span> = {"{"} <br />
              <div className="pl-6 mt-2 border-l border-white/5">
                name: <span className="text-green-400">"</span><span ref={nameRef} className="text-green-400"></span><span className="text-green-400">"</span>, <br />
                passion: <span className="text-yellow-400">"Scalable Logic"</span>, <br />
                status: <span className="text-purple-400">"Building Future"</span>
              </div>
              {"}"}
            </div>
          </div>
        </div>

        {/* Final Text Content */}
        <div ref={contentRef} className="relative z-30 text-center px-6 opacity-0 flex flex-col items-center pointer-events-auto">
          <motion.span
            className="text-blue-500 font-mono tracking-[0.6em] mb-4 block uppercase text-[10px]"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            Digital Architect
          </motion.span>
          <h1 className="text-5xl md:text-[90px] font-black tracking-tighter text-white leading-none mb-10 select-none">
            VALAYA <span className="text-white/20">DASE.</span>
          </h1>
          <p className="text-white/40 text-sm md:text-base max-w-2xl mb-12 font-light leading-relaxed">
            Architecting robust full-stack applications with elegant code.
          </p>
          <div className="flex flex-wrap justify-center items-center gap-10">
            <div className="flex gap-6 text-xl text-white/20">
              <motion.a whileHover={{ y: -5, color: '#fff' }} href="#" className="mag"><FaGithub /></motion.a>
              <motion.a whileHover={{ y: -5, color: '#3b82f6' }} href="#" className="mag"><FaLinkedin /></motion.a>
              <motion.a whileHover={{ y: -5, color: '#fff' }} href="#" className="mag"><FaEnvelope /></motion.a>
            </div>
            <div className="flex gap-3">
              <motion.button whileHover={{ scale: 1.05 }} className="group flex items-center gap-2 px-8 py-4 bg-white text-black rounded-full font-bold text-xs uppercase tracking-widest mag">
                Explore Work <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}