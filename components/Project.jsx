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
  const titleRef = useRef(null);
  const cardsRef = useRef([]);

  const addToRefs = (el) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  useEffect(() => {
    if (typeof window === "undefined") return;

    let ctx = gsap.context(() => {
      // 1. PINNING TIMELINE
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: `+=${projects.length * 100}%`,
          pin: true,
          scrub: 1,
          pinSpacing: true,
          anticipatePin: 1,
        }
      });

      // 2. TITLE REVEAL
      tl.fromTo(".proj-char",
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

      // 3. CARDS STACKING
      const cards = cardsRef.current;

      tl.fromTo(cards[0],
        { y: "100vh", opacity: 0 },
        { y: "0%", opacity: 1, duration: 1, ease: "power2.out" }
      );

      cards.forEach((card, i) => {
        if (i > 0) {
          const prevCard = cards[i - 1];
          // Push prev card back (reduced opacity to hide text bleed)
          tl.to(prevCard, {
            scale: 0.92,
            opacity: 0, // Fully fade out previous card's content to avoid mess
            y: "-4%",
            duration: 1,
            ease: "power2.inOut"
          }, `stack-${i}`);

          tl.fromTo(card,
            { y: "100vh", boxShadow: "0px -30px 60px rgba(0,0,0,0.8)" },
            { y: "0%", duration: 1, ease: "power2.inOut" },
            `stack-${i}`
          );
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const titleWords = "My Works.".split(" ");

  return (
    <div ref={sectionRef} className="relative w-full bg-[#030303] overflow-hidden">

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

      {/* Main Section - Exactly 100vh */}
      <section className="relative h-screen w-full flex flex-col items-center px-4 md:px-8 lg:px-20">

        {/* Full height wrapper with proper padding */}
        <div className="relative z-10 w-full max-w-6xl flex flex-col h-full pt-20 pb-12">

          {/* Top: Compact Title Area */}
          <div className="flex flex-col items-center justify-center text-center shrink-0 mb-6 md:mb-8">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-[1px] w-6 md:w-8 bg-blue-500/50" />
              <span className="font-mono text-blue-500 text-[10px] uppercase tracking-[0.5em] opacity-80">
                  // 04. Projects
              </span>
              <div className="h-[1px] w-6 md:w-8 bg-blue-500/50" />
            </div>

            <div ref={titleRef}>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter leading-none text-white">
                {titleWords.map((word, i) => (
                  <span key={i} className="inline-block mr-[0.2em] overflow-hidden py-1">
                    <span className="proj-char inline-block">{word}</span>
                  </span>
                ))}
              </h2>
            </div>
          </div>

          {/* Bottom: Flexible Cards Area that fills EXACT remaining space */}
          <div className="relative w-full flex-1 flex justify-center items-center min-h-0">

            {/* The absolute container takes 100% of the flexible space but caps at 400px so it doesn't look stretched */}
            <div className="relative w-full max-w-5xl h-full max-h-[400px] lg:max-h-[450px]">
              {projects.map((project, index) => (
                <div
                  key={index}
                  ref={addToRefs}
                  // bg-[#050505] instead of transparent to block the previous card's text
                  className="absolute top-0 left-0 w-full h-full flex flex-col md:flex-row gap-6 md:gap-10 items-center bg-[#050505] border border-white/10 rounded-[1.5rem] md:rounded-[2rem] p-5 md:p-8 lg:p-10 shadow-[0_0_50px_rgba(0,0,0,0.8)] origin-top"
                >

                  {/* Left: Image Box */}
                  <div className="relative h-[45%] md:h-full w-full md:w-[50%] bg-[#0a0a0a] rounded-xl overflow-hidden border border-white/5 shrink-0 flex items-center justify-center">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-contain p-2 md:p-6"
                    />
                  </div>

                  {/* Right: Info Box */}
                  <div className="flex flex-col justify-center h-[55%] md:h-full w-full md:w-[50%]">
                    <div className="flex justify-between items-start mb-2 md:mb-4">
                      <h3 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight line-clamp-1">
                        {project.title}
                      </h3>
                      <a
                        href="https://github.com/Valaya-Dase"
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 md:p-3 bg-white/5 rounded-full text-white/40 hover:text-blue-500 hover:bg-blue-500/10 transition-all border border-white/5 shrink-0"
                      >
                        <FaGithub size={18} />
                      </a>
                    </div>

                    <p className="text-white/40 text-xs md:text-sm lg:text-base leading-relaxed mb-4 md:mb-8 line-clamp-3 md:line-clamp-none">
                      {project.desc}
                    </p>

                    <div className="flex flex-wrap gap-2 mt-auto">
                      {project.tech.map((t, idx) => (
                        <span key={idx} className="px-2 md:px-3 py-1 bg-blue-500/5 border border-blue-500/10 rounded-md text-[9px] md:text-[10px] font-mono text-blue-400 uppercase tracking-widest">
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
      </section>

      {/* Cinematic Overlays */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,#030303_100%)] opacity-70 z-20" />
      <div className="absolute inset-0 pointer-events-none opacity-[0.02] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] z-30" />
    </div>
  );
}