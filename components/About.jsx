"use client";
import React, { useRef, useEffect, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Sphere, PerspectiveCamera, Float } from "@react-three/drei";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Optimized Three.js Background Component
function AmbientBackground() {
  const meshRef = useRef(null);
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.001;
      meshRef.current.rotation.z += 0.001;
    }
  });

  return (
    <Float speed={4} rotationIntensity={0.5} floatIntensity={1}>
      <Sphere ref={meshRef} args={[1, 100, 100]} scale={2.8}>
        <MeshDistortMaterial
          color="#1d4ed8"
          attach="material"
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

export default function About() {
  const containerRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // 1. PINNING & REVEAL TIMELINE
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=120%", 
          pin: true,
          scrub: 1.2,
          pinSpacing: true,
        }
      });

      // Character Reveal with Blur (Compact size fix)
      tl.fromTo(".char", 
        { y: "100%", opacity: 0, rotateX: -45, filter: "blur(8px)" },
        { 
          y: "0%", 
          opacity: 1, 
          rotateX: 0, 
          filter: "blur(0px)", 
          stagger: 0.02, 
          duration: 0.8, 
          ease: "power3.out" 
        }
      );

      // Right Content Staggered Reveal
      tl.fromTo(".reveal-part",
        { y: 40, opacity: 0, filter: "blur(10px)" },
        { 
          y: 0, 
          opacity: 1, 
          filter: "blur(0px)", 
          stagger: 0.1, 
          duration: 1, 
          ease: "power2.out" 
        },
        "-=0.4"
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  const heading = "Transforming ideas into interactive reality.".split(" ");

  return (
    <section 
      ref={containerRef} 
      className="relative h-screen w-full bg-[#030303] flex items-center justify-center overflow-hidden px-8 lg:px-24"
    >
      {/* Three.js Layer - Purely Ambient */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-50">
        <Canvas>
          <PerspectiveCamera makeDefault position={[0, 0, 8]} />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} color="#3b82f6" />
          <Suspense fallback={null}>
            <AmbientBackground />
          </Suspense>
        </Canvas>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
        
        {/* Left Side: Scaled Down Typography */}
        <div className="flex flex-col justify-center">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-[1px] w-8 bg-blue-500/50" />
            <span className="font-mono text-blue-500 text-[10px] uppercase tracking-[0.5em] opacity-80">
                Intelligence.01
            </span>
          </div>
          
          <div ref={titleRef}>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-[1.05] text-white">
              {heading.map((word, i) => (
                <span key={i} className="inline-block mr-[0.3em] overflow-hidden py-1">
                  <span className="char inline-block">{word}</span>
                </span>
              ))}
            </h2>
          </div>
        </div>

        {/* Right Side: Professional & Aligned Content */}
        <div className="flex flex-col justify-center space-y-10 lg:space-y-12 max-w-lg">
          
          <div className="reveal-part space-y-4">
             <h3 className="text-white text-xl md:text-2xl font-bold tracking-tight">
               Architecting the <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400 italic">Future</span>.
             </h3>
             <p className="text-white/40 text-sm md:text-base font-light leading-relaxed">
               I’m a <span className="text-white font-medium">Computer Engineering</span> student 
               at Watumull Institute. I specialize in the 
               <span className="text-blue-400 font-mono text-[11px] ml-1 bg-blue-500/5 px-2 py-0.5 rounded border border-blue-500/10">MERN Stack</span> & Next.js.
             </p>
          </div>

          <div className="reveal-part border-l border-white/10 pl-6 py-1">
            <p className="text-white/30 text-sm italic leading-relaxed">
              "My work focuses on bridging high-level algorithmic logic with clean, 
              minimalist front-end architectures."
            </p>
          </div>

          {/* Stats - More Compact */}
          <div className="reveal-part flex gap-16 pt-6 border-t border-white/5">
            <div className="group">
              <h4 className="text-3xl md:text-4xl font-black text-white group-hover:text-blue-500 transition-colors font-mono tracking-tighter">10+</h4>
              <p className="text-[9px] uppercase text-white/20 tracking-[0.3em] font-mono mt-1">Projects</p>
            </div>
            <div className="group">
              <h4 className="text-3xl md:text-4xl font-black text-white group-hover:text-cyan-400 transition-colors font-mono tracking-tighter">8.55</h4>
              <p className="text-[9px] uppercase text-white/20 tracking-[0.3em] font-mono mt-1">CGPA</p>
            </div>
          </div>
        </div>
      </div>

      {/* Cinematic Vignette */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,#030303_100%)] opacity-70" />
      
      {/* Noise Texture */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </section>
  );
}