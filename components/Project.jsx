"use client";
import React, { useEffect, useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Sphere, PerspectiveCamera, Float } from "@react-three/drei";
import { FaGithub } from "react-icons/fa";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Background Effect
function AmbientBackground() {
  const meshRef = useRef(null);
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y -= 0.001;
      meshRef.current.rotation.z += 0.001;
    }
  });

  return (
    <Float speed={3} rotationIntensity={0.5} floatIntensity={0.5}>
      <Sphere ref={meshRef} args={[1, 100, 100]} scale={3.2}>
        <MeshDistortMaterial
          color="#1d4ed8"
          distort={0.4}
          speed={2}
          roughness={0.1}
          metalness={1}
          opacity={0.05}
          transparent
        />
      </Sphere>
    </Float>
  );
}

const projects = [
  {
    title: "VendorHub",
    desc: "Artist studio management portal featuring seller dashboards and activity tracking.",
    image: "/vendor-hub.png",
    tech: ["React", "Express", "Tailwind"]
  },
  {
    title: "ToggleNest",
    desc: "Collaborative task management for tracking projects and tasks with team members.",
    image: "/toggle-nest.png",
    tech: ["Next.js", "Node", "MongoDB"]
  },
  {
    title: "Recipe Finder",
    desc: "Discover and manage recipes with a focus on user preferences.",
    image: "/recipe.png",
    tech: ["Python", "Flask", "NLP"]
  },
  {
    title: "EventHub",
    desc: "Real-time event organizing platform with user engagement features.",
    image: "/toggle-nest.png",
    tech: ["React", "Socket.io"]
  },
];

export default function Projects() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    let ctx = gsap.context(() => {
      // 1. TITLE REVEAL
      gsap.fromTo(".proj-char",
        { y: "100%", opacity: 0, filter: "blur(12px)", rotateX: -30 },
        {
          y: "0%",
          opacity: 1,
          filter: "blur(0px)",
          rotateX: 0,
          stagger: 0.02,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          }
        }
      );

      // 2. HORIZONTAL SCROLL TIMELINE (FIXED)
      const track = trackRef.current;
      
      const getScrollDistance = () => {
        // Calculate exact distance: total width of track minus screen width + padding
        return track.scrollWidth - window.innerWidth + 200; 
      };

      gsap.to(track, {
        x: () => -getScrollDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${getScrollDistance()}`, // Sync end duration perfectly with scroll distance
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true, 
          pinSpacing: true, // EXTREMELY IMPORTANT: Keeps next section pushed down
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const titleWords = "My Works.".split(" ");

  return (
    <div ref={sectionRef} className="relative w-full bg-[#030303] overflow-hidden h-screen flex flex-col justify-center">

      {/* Three.js Background */}
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

      <div className="relative z-10 w-full h-full flex flex-col pt-20 pb-12">

        {/* Top: Compact Title Area */}
        <div className="flex flex-col items-center justify-center text-center shrink-0 mb-8 md:mb-12 px-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-[1px] w-6 md:w-8 bg-blue-500/50" />
            <span className="font-mono text-blue-500 text-[10px] uppercase tracking-[0.5em] opacity-80">
                // 04. Projects
            </span>
            <div className="h-[1px] w-6 md:w-8 bg-blue-500/50" />
          </div>

          <div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter leading-none text-white">
              {titleWords.map((word, i) => (
                <span key={i} className="inline-block mr-[0.2em] overflow-hidden py-1">
                  <span className="proj-char inline-block">{word}</span>
                </span>
              ))}
            </h2>
          </div>
        </div>

        {/* Bottom: Horizontal Scrolling Track */}
        <div className="relative w-full flex-1 flex items-center overflow-hidden">
          
          <div 
            ref={trackRef} 
            className="flex flex-nowrap flex-row gap-12 md:gap-24 lg:gap-32 w-max h-full max-h-[400px] lg:max-h-[480px] pl-[5vw] md:pl-[10vw] lg:pl-[15vw] pr-[10vw]"
          >
            {projects.map((project, index) => (
              <div
                key={index}
                className="relative shrink-0 w-[90vw] md:w-[75vw] lg:w-[65vw] h-full flex flex-col md:flex-row items-center bg-[#080808] border border-white/5 rounded-[1.5rem] md:rounded-[2rem] p-5 md:p-8 lg:p-10 shadow-[0_0_30px_rgba(0,0,0,0.5)] transition-all duration-500 hover:-translate-y-2 hover:border-blue-500/40 group overflow-hidden"
              >
                
                {/* --- Fluid Blue Hover Effect --- */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-[radial-gradient(circle,rgba(37,99,235,0.12)_0%,transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none blur-3xl z-0 mix-blend-screen" />

                {/* Left: Image Box */}
                <div className="relative z-10 h-[45%] md:h-full w-full md:w-[45%] bg-[#0f0f0f] rounded-xl overflow-hidden border border-white/5 shrink-0 flex items-center justify-center transition-transform duration-500 group-hover:bg-[#12182b] group-hover:border-blue-500/20 mr-0 md:mr-8 mb-6 md:mb-0">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-contain p-4 md:p-6 transition-transform duration-700 group-hover:scale-[1.05]"
                  />
                </div>

                {/* Right: Info Box */}
                <div className="relative z-10 flex flex-col justify-center h-[55%] md:h-full w-full md:w-[55%]">
                  <div className="flex justify-between items-start mb-3 md:mb-5">
                    <h3 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight line-clamp-1 transition-colors duration-300 group-hover:text-blue-400 drop-shadow-md">
                      {project.title}
                    </h3>
                    <a
                      href="https://github.com/Valaya-Dase"
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 md:p-3 bg-white/5 rounded-full text-white/40 hover:text-white hover:bg-blue-600 transition-all border border-white/5 shrink-0 hover:shadow-[0_0_15px_rgba(37,99,235,0.5)] z-20"
                    >
                      <FaGithub size={20} />
                    </a>
                  </div>

                  <p className="text-white/50 text-sm md:text-base lg:text-lg leading-relaxed mb-6 md:mb-8 line-clamp-3 md:line-clamp-none transition-colors duration-300 group-hover:text-white/80">
                    {project.desc}
                  </p>

                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.tech.map((t, idx) => (
                      <span key={idx} className="px-3 md:px-4 py-1.5 bg-white/5 border border-white/10 rounded-md text-[10px] md:text-xs font-mono text-white/60 uppercase tracking-widest transition-all duration-300 group-hover:bg-blue-500/10 group-hover:border-blue-500/30 group-hover:text-blue-300">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Cinematic Overlays */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,#030303_100%)] opacity-80 z-20" />
      <div className="absolute inset-0 pointer-events-none opacity-[0.02] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] z-30" />
    </div>
  );
}