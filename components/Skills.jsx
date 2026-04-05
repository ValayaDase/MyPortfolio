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

// Seamless Three.js Background to match other sections
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

const skillsData = [
  { name: "React", icon: "/react.png", level: "Expert", shadow: "#61DAFB" },
  { name: "Next.js", icon: "/next.png", level: "Advanced", shadow: "#ffffff" },
  { name: "Node.js", icon: "/node.png", level: "Intermediate", shadow: "#339933" },
  { name: "MongoDB", icon: "/mongo.png", level: "Intermediate", shadow: "#47A248" },
  { name: "Python", icon: "/python.png", level: "Advanced", shadow: "#3776AB" },
  { name: "Java", icon: "/java.png", level: "Expert", shadow: "#007396" },
  { name: "Tailwind", icon: "/tailwind.png", level: "Expert", shadow: "#06B6D4" },
];

export default function Skills() {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    let ctx = gsap.context(() => {
      // 1. PINNING MASTER TIMELINE
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=200%",
          pin: true,
          scrub: 1,
          pinSpacing: true,
          anticipatePin: 1,
        }
      });

      // 2. TITLE REVEAL (Top Row)
      tl.fromTo(".skill-char", 
        { y: "100%", opacity: 0, filter: "blur(12px)", rotateX: -30 },
        { 
          y: "0%", 
          opacity: 1, 
          filter: "blur(0px)", 
          rotateX: 0, 
          stagger: 0.02, 
          duration: 1, 
          ease: "power3.out" 
        }
      );

      // 3. GRID REVEAL (GSAP Outer Container Entrance)
      tl.fromTo(".skill-card-container",
        { y: 80, opacity: 0, filter: "blur(10px)", scale: 0.9 },
        { 
          y: 0, 
          opacity: 1, 
          filter: "blur(0px)", 
          scale: 1,
          stagger: {
            each: 0.1,
            from: "start",
            grid: "auto"
          }, 
          duration: 1.2, 
          ease: "back.out(1.2)" 
        },
        "-=0.5"
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const title = "Skills & Tools.".split(" ");

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

      <section className="relative h-screen w-full flex flex-col items-center justify-center px-6 lg:px-24">
        
        <div className="relative z-10 w-full max-w-7xl flex flex-col gap-12 md:gap-20 items-center">
          
          {/* Top Row: Title (Centered) */}
          <div className="flex flex-col items-center justify-center text-center">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-[1px] w-8 md:w-12 bg-blue-500/50" />
              <span className="font-mono text-blue-500 text-[10px] uppercase tracking-[0.5em] opacity-80">
                  // 03. Tech Ecosystem
              </span>
              <div className="h-[1px] w-8 md:w-12 bg-blue-500/50" />
            </div>
            
            <h2 className="text-5xl md:text-7xl lg:text-[7rem] font-black tracking-tighter leading-none text-white">
              {title.map((word, i) => (
                <span key={i} className="inline-block mr-[0.3em] overflow-hidden py-2">
                  <span className="skill-char inline-block">{word}</span>
                </span>
              ))}
            </h2>
            
          </div>

          {/* Bottom Row: The Floating Ecosystem Grid */}
          <div className="flex flex-wrap justify-center gap-6 md:gap-10 w-full">
            {skillsData.map((skill, index) => (
              
              // GSAP Entrance Wrapper
              <div key={index} className="skill-card-container">
                
                {/* Framer Motion Continuous Floating Effect */}
                <motion.div 
                  animate={{ y: [0, -12, 0] }}
                  transition={{ 
                    duration: 3 + (index % 3), // Randomizes speed slightly for organic feel
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }}
                  className="group relative flex flex-col items-center"
                >
                  
                  {/* The Glass Orb / Icon Container */}
                  <div className="w-24 h-24 md:w-32 md:h-32 rounded-[2rem] bg-gradient-to-b from-white/[0.05] to-white/[0.01] border border-white/10 backdrop-blur-3xl flex items-center justify-center p-6 mb-4 shadow-xl transition-all duration-500 group-hover:border-blue-500/50 group-hover:bg-white/[0.05]">
                    
                    {/* The Icon */}
                    <img 
                      src={skill.icon} 
                      alt={skill.name} 
                      className="w-full h-full object-contain filter grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"
                    />

                    {/* Ambient Glow behind icon on hover */}
                    <div 
                      className="absolute inset-0 rounded-[2rem] blur-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none"
                      style={{ backgroundColor: skill.shadow }} 
                    />
                  </div>

                  {/* Skill Name & Level */}
                  <div className="text-center">
                    <h4 className="text-white font-bold text-base md:text-lg tracking-wide group-hover:text-blue-400 transition-colors">
                      {skill.name}
                    </h4>
                    <span className="text-blue-500/50 font-mono text-[9px] uppercase tracking-widest mt-1 block">
                      {skill.level}
                    </span>
                  </div>

                  {/* Underglow Reflection */}
                  <div className="w-16 h-2 bg-blue-500/0 group-hover:bg-blue-500/30 blur-[10px] rounded-full absolute -bottom-4 transition-all duration-500" />

                </motion.div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Global Overlays */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,#030303_100%)] opacity-70" />
      <div className="absolute inset-0 pointer-events-none opacity-[0.02] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </div>
  );
}