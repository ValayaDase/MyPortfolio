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

// Seamless Three.js Background
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

// Divided Data into 2 Sections
const frontendSkills = [
  { name: "React", icon: "/react.png", shadow: "#61DAFB" },
  { name: "Next.js", icon: "/next.png", shadow: "#ffffff" },
  { name: "Tailwind", icon: "/tailwind.png", shadow: "#06B6D4" },
  { name: "HTML/CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg", shadow: "#E34F26" },
  { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", shadow: "#F7DF1E" },
];

const backendSkills = [
  { name: "Node.js", icon: "/node.png", shadow: "#339933" },
  { name: "MongoDB", icon: "/mongo.png", shadow: "#47A248" },
  { name: "Python", icon: "/python.png", shadow: "#3776AB" },
  { name: "Java", icon: "/java.png", shadow: "#007396" },
  { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg", shadow: "#336791" },
];

export default function Skills() {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    let ctx = gsap.context(() => {
      // 🚀 NO PINNING, Natural Scroll Animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%", // Trigger when section is 20% visible
          // play on enter, reverse on leave back (vapas scroll karne pe jayega)
          toggleActions: "play none none reverse", 
        }
      });

      // 1. TITLE REVEAL
      tl.fromTo(".skill-char", 
        { y: 50, opacity: 0, filter: "blur(8px)", rotateX: -30 },
        { 
          y: 0, 
          opacity: 1, 
          filter: "blur(0px)", 
          rotateX: 0, 
          stagger: 0.02, 
          duration: 0.8, 
          ease: "power3.out" 
        }
      )
      
      // 2. SHORT DESCRIPTION (Comes from Top)
      .fromTo(".skill-desc",
        { y: -40, opacity: 0, filter: "blur(5px)" },
        { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.8, ease: "power2.out" },
        "-=0.5"
      )

      // 3. LEFT SECTION (Comes from Left)
      .fromTo(".skill-left",
        { x: -100, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, ease: "power3.out" },
        "-=0.6"
      )

      // 4. RIGHT SECTION (Comes from Right)
      .fromTo(".skill-right",
        { x: 100, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, ease: "power3.out" },
        "-=0.8" // Starts almost together with left
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const title = "Tech Arsenal.".split(" ");

  return (
    <div ref={sectionRef} className="relative w-full bg-[#030303] overflow-hidden min-h-screen py-24 z-20 border-t border-white/5">
      
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

      <section className="relative z-10 w-full max-w-6xl mx-auto px-6 lg:px-12 flex flex-col gap-12 md:gap-20">
        
        {/* Top Area: Header & Description */}
        <div className="w-full flex flex-col items-start text-left max-w-3xl">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-[1px] w-8 bg-blue-500/50" />
            <span className="font-mono text-blue-500 text-[10px] uppercase tracking-[0.5em] opacity-80">
                // 03. Skills
            </span>
          </div>
          
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-none text-white mb-8">
            {title.map((word, i) => (
              <span key={i} className="inline-block mr-[0.3em] overflow-hidden py-2">
                <span className="skill-char inline-block">{word}</span>
              </span>
            ))}
          </h2>

          <p className="skill-desc text-white/60 text-lg md:text-2xl font-light leading-relaxed">
            I build full stack websites that combine <span className="text-white font-medium">smooth user experiences</span> with <span className="text-white font-medium">reliable backend performance</span>.
          </p>
        </div>

        {/* Bottom Area: 2 Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 w-full">
          
          {/* LEFT COLUMN: Frontend & Frameworks */}
          <div className="skill-left flex flex-col gap-6">
            <h4 className="text-[11px] text-white/40 uppercase tracking-[0.3em] font-bold border-b border-white/10 pb-4 mb-2">
              Frontend & Frameworks
            </h4>
            <div className="flex flex-wrap gap-6">
              {frontendSkills.map((skill, index) => (
                <div key={index} className="group relative flex flex-col items-center gap-3 mag">
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center p-4 transition-all duration-300 group-hover:bg-white/[0.08] group-hover:border-white/20 group-hover:-translate-y-2">
                    <img src={skill.icon} alt={skill.name} className="w-full h-full object-contain filter drop-shadow-md grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300" />
                  </div>
                  <span className="text-xs text-white/50 font-mono group-hover:text-white transition-colors">{skill.name}</span>
                  
                  {/* Hover Glow */}
                  <div className="absolute inset-0 blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none rounded-2xl" style={{ backgroundColor: skill.shadow }} />
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN: Backend & Databases */}
          <div className="skill-right flex flex-col gap-6">
            <h4 className="text-[11px] text-white/40 uppercase tracking-[0.3em] font-bold border-b border-white/10 pb-4 mb-2">
              Backend & Databases
            </h4>
            <div className="flex flex-wrap gap-6">
              {backendSkills.map((skill, index) => (
                <div key={index} className="group relative flex flex-col items-center gap-3 mag">
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center p-4 transition-all duration-300 group-hover:bg-white/[0.08] group-hover:border-white/20 group-hover:-translate-y-2">
                    <img src={skill.icon} alt={skill.name} className="w-full h-full object-contain filter drop-shadow-md grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300" />
                  </div>
                  <span className="text-xs text-white/50 font-mono group-hover:text-white transition-colors">{skill.name}</span>

                  {/* Hover Glow */}
                  <div className="absolute inset-0 blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none rounded-2xl" style={{ backgroundColor: skill.shadow }} />
                </div>
              ))}
            </div>
          </div>

        </div>

      </section>

      {/* Global Overlays */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,#030303_100%)] opacity-70" />
      <div className="absolute inset-0 pointer-events-none opacity-[0.02] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </div>
  );
}