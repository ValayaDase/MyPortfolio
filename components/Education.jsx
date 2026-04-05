"use client";
import React, { useEffect, useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Sphere, PerspectiveCamera, Float } from "@react-three/drei";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Three.js Background Component
function AmbientBackground() {
  const meshRef = useRef(null);
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.001;
      meshRef.current.rotation.z += 0.001;
    }
  });

  return (
    <Float speed={3} rotationIntensity={0.5} floatIntensity={0.5}>
      <Sphere ref={meshRef} args={[1, 100, 100]} scale={3}>
        <MeshDistortMaterial
          color="#1d4ed8"
          distort={0.4}
          speed={2}
          roughness={0.1}
          metalness={1}
          opacity={0.08}
          transparent
        />
      </Sphere>
    </Float>
  );
}

export default function Education() {
  const sectionRef = useRef(null);
  const cardsContainerRef = useRef(null);

  const educationData = [
    {
      year: "2023 — 2027",
      degree: "BE in Computer Engineering",
      institute: "Watumull Institute",
      details: "Current CGPA: 8.55 | Focus on Full Stack Architecture.",
    },
    {
      year: "2021 — 2023",
      degree: "HSC (Secondary)",
      institute: "Jana Gana Mana Vidya Mandir",
      details: "Percentage: 75.83% | Science Stream.",
    },
    {
      year: "2011 — 2021",
      degree: "SSC (Primary)",
      institute: "Jana Gana Mana Vidya Mandir",
      details: "Percentage: 90.40% | Foundation in Mathematics.",
    },
  ];

  useEffect(() => {
    if (typeof window === "undefined") return;

    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=250%", 
          pin: true,
          scrub: 1,
          pinSpacing: true,
        }
      });

      // 1. Title Animation: Blur to Clear (Top Row)
      tl.fromTo(".edu-char", 
        { y: "100%", opacity: 0, filter: "blur(12px)", rotateX: -30 },
        { 
          y: "0%", 
          opacity: 1, 
          filter: "blur(0px)", 
          rotateX: 0, 
          stagger: 0.02, 
          duration: 0.8, 
          ease: "power3.out" 
        }
      );

      // 2. Horizontal Cards Entry: Below the Title
      tl.fromTo(".edu-card-horiz",
        { x: "100vw", opacity: 0, filter: "blur(8px)" },
        { 
          x: "0%", 
          opacity: 1, 
          filter: "blur(0px)", 
          stagger: 0.3, 
          duration: 1.2, 
          ease: "power2.out" 
        },
        "-=0.4"
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const title = "Learning Path.".split(" ");

  return (
    <div ref={sectionRef} className="relative w-full bg-[#030303] overflow-hidden">
      
      {/* Background Visuals */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
        <Canvas>
          <PerspectiveCamera makeDefault position={[0, 0, 8]} />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1.5} color="#3b82f6" />
          <Suspense fallback={null}>
            <AmbientBackground />
          </Suspense>
        </Canvas>
      </div>

      <section className="relative h-screen w-full flex flex-col items-center justify-center px-10 lg:px-24">
        
        <div className="relative z-10 w-full max-w-7xl flex flex-col gap-16 md:gap-24">
          
          {/* Top Row: Title */}
          <div className="w-full flex flex-col items-start md:items-center text-left md:text-center">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-[1px] w-8 bg-blue-500/50" />
              <span className="font-mono text-blue-500 text-[10px] uppercase tracking-[0.5em] opacity-80">
                  // 02. Education
              </span>
            </div>
            
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-none text-white w-full">
              {title.map((word, i) => (
                <span key={i} className="inline-block mr-[0.3em] overflow-hidden py-2">
                  <span className="edu-char inline-block">{word}</span>
                </span>
              ))}
            </h2>
          </div>

          {/* Bottom Row: Horizontal Glide Cards */}
          <div ref={cardsContainerRef} className="flex flex-wrap md:flex-nowrap items-center justify-center gap-6 w-full">
            {educationData.map((edu, index) => (
              <div 
                key={index} 
                className="edu-card-horiz w-full md:w-[380px] p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5 backdrop-blur-3xl transition-all duration-500 hover:border-blue-500/30 group relative"
              >
                <div className="flex justify-between items-center mb-6">
                  <span className="text-blue-500 font-mono text-[10px] tracking-widest">{edu.year}</span>
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                </div>
                
                <h4 className="text-xl md:text-2xl font-bold mb-2 text-white group-hover:text-blue-400 transition-colors">
                    {edu.degree}
                </h4>
                <p className="text-white/40 text-sm mb-6 font-light">
                    {edu.institute}
                </p>
                
                <div className="h-[1px] w-12 bg-white/10 group-hover:w-full transition-all duration-700 mb-6" />
                <p className="text-white/20 text-xs leading-relaxed font-light line-clamp-3">
                    {edu.details}
                </p>

                {/* Subtle Hover Glow */}
                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-blue-600/5 blur-[50px] opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Overlays */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,#030303_100%)] opacity-70" />
      <div className="absolute inset-0 pointer-events-none opacity-[0.02] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </div>
  );
}