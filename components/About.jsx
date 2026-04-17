"use client";
import React, { useRef, useEffect, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Sphere, PerspectiveCamera, Float } from "@react-three/drei";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function AmbientBackground() {
  const meshRef = useRef(null);
  useFrame(() => {
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

// 🚀 FIXED: Flex-wrap ensures words stay together and break naturally to the next line
const splitText = (text, charClass) => {
  return (
    <div className="flex flex-wrap gap-y-1 md:gap-y-3">
      {text.split(" ").map((word, i) => (
        <div key={i} className="inline-flex overflow-visible mr-[0.3em]">
          {word.split("").map((char, j) => (
            <span key={j} className={`inline-block overflow-visible ${charClass}`}>
              {char}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
};

export default function About() {
  const containerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=200%", // Extra scroll distance for smoother animation
          pin: true,
          scrub: 1.5,
          pinSpacing: true,
          preventOverlaps: true,
          fastScrollEnd: true
        }
      });

      // 1. RIGHT: Content 1 Fades Out
      tl.to(".content-phase-1", {
        y: -40,
        opacity: 0,
        filter: "blur(10px)",
        duration: 1.5,
        ease: "power2.inOut"
      }, 0);

      // 2. LEFT: Text 1 Breakdown (Scatter away)
      tl.to(".char1", {
        x: "random(-400, 400)",
        y: "random(-400, 400)",
        rotationZ: "random(-180, 180)",
        opacity: 0,
        stagger: 0.01,
        duration: 2,
        ease: "power3.inOut"
      }, 0);

      // 3. LEFT: Text 2 Reconstruction (Assemble)
      tl.fromTo(".char2",
        {
          x: "random(-400, 400)",
          y: "random(-400, 400)",
          rotationZ: "random(-180, 180)",
          opacity: 0
        },
        {
          x: 0,
          y: 0,
          rotationZ: 0,
          opacity: 1,
          stagger: 0.01,
          duration: 2,
          ease: "power3.out"
        },
        1 // Starts assembling half-way through the scatter
      );

      // 4. RIGHT: Content 2 Fades In
      tl.fromTo(".content-phase-2",
        { y: 40, opacity: 0, filter: "blur(10px)", pointerEvents: "none" },
        { y: 0, opacity: 1, filter: "blur(0px)", pointerEvents: "auto", duration: 1.5, ease: "power2.out" },
        1.5 // Fades in exactly when Text 2 is almost ready
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  const text1 = "Transforming ideas into interactive reality.";
  const text2 = "I build scalable full-stack web apps.";

  return (
    <section
      ref={containerRef}
      className="relative z-[50] h-screen w-full bg-[#030303] flex items-center justify-center overflow-hidden px-6 md:px-12 lg:px-24 rounded-t-[40px] md:rounded-t-[80px] shadow-[0_-30px_100px_rgba(0,0,0,0.9)] border-t border-white/5"
    >
      {/* 3D Background */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-50 rounded-t-[40px] md:rounded-t-[80px] overflow-hidden">
        <Canvas>
          <PerspectiveCamera makeDefault position={[0, 0, 8]} />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} color="#3b82f6" />
          <Suspense fallback={null}>
            <AmbientBackground />
          </Suspense>
        </Canvas>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center mt-[-5vh]">

        {/* LEFT SIDE: Typography */}
        <div className="flex flex-col justify-center w-full">
          <div className="flex items-center gap-4 mb-6 md:mb-10">
            <div className="h-[1px] w-8 bg-blue-500/50" />
            <span className="font-mono text-blue-500 text-[10px] md:text-xs uppercase tracking-[0.5em] opacity-80">
              System.Init
            </span>
          </div>

          {/* Fixed Height Wrapper to prevent layout shift */}
          <div className="relative w-full h-[200px] md:h-[280px]">
            {/* Phase 1 Text */}
            <div className="absolute top-0 left-0 w-full text-5xl md:text-6xl lg:text-[70px] font-black tracking-tighter leading-[1] text-white">
              {splitText(text1, "char1")}
            </div>
            {/* Phase 2 Text */}
            <div className="absolute top-0 left-0 w-full text-5xl md:text-6xl lg:text-[70px] font-black tracking-tighter leading-[1] text-blue-500">
              {splitText(text2, "char2")}
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: Perfect Absolute Crossfade */}
        <div className="relative w-full max-w-lg h-[300px] md:h-[350px]">

          {/* CONTENT PHASE 1: Always visible initially */}
          <div className="content-phase-1 absolute inset-0 flex flex-col justify-center space-y-6">
            <h3 className="text-white text-2xl md:text-4xl font-bold tracking-tight">
              The <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-gray-200 italic">Blueprint</span>.
            </h3>
            <p className="text-white/40 text-sm md:text-base font-light leading-relaxed">
              Every great application starts with a raw idea. My process begins by mapping out complex logic and conceptualizing minimalist architectures before writing a single line of code.
            </p>
            <div className="border-l border-white/10 pl-6 py-2 mt-4">
              <p className="text-white/30 text-xs md:text-sm italic">Scroll down to compile the architecture...</p>
            </div>
          </div>

          {/* CONTENT PHASE 2: Hidden initially, fades in smoothly */}
          <div className="content-phase-2 absolute inset-0 flex flex-col justify-center space-y-8 md:space-y-10 opacity-0 pointer-events-none">
            <div className="space-y-4">
              <h3 className="text-white text-2xl md:text-4xl font-bold tracking-tight">
                Architecting the <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400 italic">Future</span>.
              </h3>
              <p className="text-white/40 text-sm md:text-base font-light leading-relaxed">
                I’m a <span className="text-white font-medium">Computer Engineering</span> student
                at Watumull Institute. I specialize in the
                <span className="text-blue-400 font-mono text-[10px] md:text-xs ml-1 bg-blue-500/10 px-2 py-1 rounded border border-blue-500/20">MERN Stack</span> & Next.js.
              </p>
            </div>

            <div className="border-l border-white/10 pl-6 py-1">
              <p className="text-white/30 text-sm italic leading-relaxed">
                "My work focuses on bridging high-level algorithmic logic with clean, minimalist front-end architectures."
              </p>
            </div>

            <div className="flex gap-12 md:gap-16 pt-6 border-t border-white/5 pointer-events-auto">
              <div className="group mag">
                <h4 className="text-3xl md:text-5xl font-black text-white group-hover:text-blue-500 transition-colors font-mono tracking-tighter">10+</h4>
                <p className="text-[10px] uppercase text-white/20 tracking-[0.3em] font-mono mt-2">Projects</p>
              </div>
              <div className="group mag">
                <h4 className="text-3xl md:text-5xl font-black text-white group-hover:text-cyan-400 transition-colors font-mono tracking-tighter">8.55</h4>
                <p className="text-[10px] uppercase text-white/20 tracking-[0.3em] font-mono mt-2">CGPA</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}