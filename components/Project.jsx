"use client";
import React, { useEffect, useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  MeshDistortMaterial,
  Sphere,
  PerspectiveCamera,
  Float,
} from "@react-three/drei";
import { FaGithub } from "react-icons/fa";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Immersive 3D Background
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
          color="#2563eb"
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

const projects = [
  {
    title: "Nyaya-Sahayak",
    desc: "Legal Document Analyzer that analyzes legal documents and gives suggestions, focusing on user security.",
    image: "/Nyay-Sahayak.png",
    tech: ["Machine Learning", "AES-256", "OCR", "MERN"],
    number: "01",
    github: "https://github.com/gawadeaditya21/Nyay-Sahayak.git",
  },
  {
    title: "VendorHub",
    desc: "Multi vendor management portal featuring seller dashboards and activity tracking.",
    image: "/vendor-hub.png",
    tech: ["MERN", "Tailwind"],
    number: "02",
    github: "https://github.com/ValayaDase/Multi-Vendor-Marketplace.git",
  },
  {
    title: "EventHub",
    desc: "Real-time event organizing platform with user engagement features.",
    image: "/event_hub.png",
    tech: ["MERN", "Socket.io"],
    number: "03",
    github: "https://github.com/ValayaDase/Collaborativ_Event_Management.git",
  },
  {
    title: "Eco Track AI",
    desc: "AI-powered carbon footprints tracking and analytics platform.",
    image: "/eco-track-ai.png",
    tech: ["TensorFlow", "Next.js"],
    number: "04",
  },
];

export default function Projects() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    let mm = gsap.matchMedia();

    mm.add(
      {
        isDesktop: "(min-width: 768px)",
      },
      (context) => {
        const { isDesktop } = context.conditions;
        if (!isDesktop) return;

        const track = trackRef.current;

        // Calculate total width of the track
        const totalWidth = track.scrollWidth;

        // Start the track off-screen to the right, and pull it completely to the left
        gsap.fromTo(
          track,
          { x: window.innerWidth * 0.7 }, // Start at the right edge
          {
            x: -totalWidth + window.innerWidth, // Scroll until the last card hits the left
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: () => `+=${totalWidth + window.innerWidth}`, // Pin duration based on travel distance
              pin: true,
              scrub: 1, // Smooth scrolling transition
              pinSpacing: true,
              invalidateOnRefresh: true,
            },
          },
        );
      },
    );

    return () => mm.revert();
  }, []);

  return (
    <div
      ref={sectionRef}
      className="relative w-full bg-[#080a10] overflow-hidden h-auto md:h-screen py-24 md:py-0 flex flex-col justify-center"
    >
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Canvas>
          <PerspectiveCamera makeDefault position={[0, 0, 8]} />
          <ambientLight intensity={0.5} />
          <Suspense fallback={null}>
            <AmbientBackground />
          </Suspense>
        </Canvas>
      </div>

      <div className="relative z-10 w-full flex flex-col items-center pt-10">
        {/* Title and subtitle merged onto a single perfectly sized h2 line */}
        <div className="flex flex-col sm:flex-row items-center sm:items-baseline justify-center gap-2 sm:gap-4 mb-10 w-full px-4 text-center">
          <h2 className="text-white text-3xl font-bold tracking-tighter m-0 p-0">
            My Works.
          </h2>
          <span className="text-gray-500 font-mono text-xs md:text-sm uppercase tracking-[0.2em] m-0 p-0">
            Hover to explore details
          </span>
        </div>

        {/* Mobile: horizontal scroll with snap-x. Desktop: overflow-visible for GSAP track */}
        <div
          ref={trackRef}
          className="flex flex-row md:flex-nowrap gap-6 md:gap-[2vw] px-[7vw] md:px-[2vw] items-center w-full md:w-max overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none hide-scrollbar pb-10 md:pb-0"
        >
          {projects.map((proj, i) => (
            <ProjectCard key={i} project={proj} index={i} />
          ))}
        </div>
      </div>

      <style jsx global>{`
        .custom-card {
          position: relative;
          /* Precisely sized so exactly 3 cards fit on screen, gracefully degrading on mobile */
          width: max(300px, 30vw);
          height: max(380px, min(65vh, 480px));
          background: #0f121a;
          border-radius: 24px;
          padding: 30px;
          overflow: hidden;
          transition: all 0.4s ease;
          border: 1px solid rgba(255, 255, 255, 0.03);
          display: flex;
          flex-direction: column;
          flex-shrink: 0;
          will-change: transform;
        }

        /* Mobile styles configured for native swiping/snapping */
        @media (max-width: 767px) {
          .custom-card {
            width: 85vw; /* Shows a small peek of the next card to indicate swiping */
            max-width: 340px;
            height: auto;
            min-height: 420px;
            padding: 24px;
            scroll-snap-align: center; /* Snaps the card to the center of the screen */
          }
        }

        /* Utility to hide the horizontal scrollbar for a clean slider look */
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        .custom-card:before {
          content: "";
          position: absolute;
          z-index: 0;
          top: -20px;
          right: -20px;
          background: #2563eb;
          height: 44px;
          width: 44px;
          border-radius: 50%;
          transform: scale(1);
          transform-origin: center;
          transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .custom-card:hover:before {
          transform: scale(40);
        }

        .go-corner {
          display: flex;
          align-items: center;
          justify-content: center;
          position: absolute;
          width: 48px;
          height: 48px;
          top: 0;
          right: 0;
          background: rgba(255, 255, 255, 0.08);
          border-radius: 0 24px 0 30px;
          z-index: 2;
        }

        .card-content {
          position: relative;
          z-index: 2;
          height: 100%;
          display: flex;
          flex-direction: column;
        }

        .custom-card:hover h3,
        .custom-card:hover p,
        .custom-card:hover .text-label,
        .custom-card:hover .gh-icon {
          color: #ffffff !important;
          opacity: 1 !important;
        }

        .custom-card:hover .tech-tag {
          background: rgba(255, 255, 255, 0.15);
          border-color: rgba(255, 255, 255, 0.3);
          color: #fff;
        }
      `}</style>
    </div>
  );
}

function ProjectCard({ project, index }) {
  return (
    <div
      className="custom-card proj-card group"
      style={{ "--card-index": index }}
    >
      <div className="go-corner">
        <div className="text-white text-lg">→</div>
      </div>
      <a href={project.github} target="_blank" rel="noopener noreferrer">
        <div className="card-content flex flex-col h-full">
          <div className="flex justify-between items-start mb-4 md:mb-6 shrink-0">
            <span className="text-label font-mono text-xs tracking-widest opacity-40 text-white uppercase transition-colors duration-300">
              Project — {project.number}
            </span>
            <FaGithub
              size={20}
              className="gh-icon text-white opacity-30 transition-colors duration-300"
            />
          </div>

          {/* BULLETPROOF IMAGE WRAPPER */}
          <div className="relative w-full flex flex-col flex-grow min-h-[160px] bg-black/40 rounded-xl border border-white/5 mb-4 md:mb-6 overflow-hidden">
            {/* Browser Dots */}
            <div className="flex gap-1.5 p-2.5 border-b border-white/5 bg-white/5 shrink-0">
              <div className="w-1.5 h-1.5 rounded-full bg-red-500/20" />
              <div className="w-1.5 h-1.5 rounded-full bg-yellow-500/20" />
              <div className="w-1.5 h-1.5 rounded-full bg-green-500/20" />
            </div>

            {/* Next.js Image Container: 
              - 'flex-1' forces it to fill the remaining height 
              - 'opacity-100' ensures it is always visible on mobile without needing hover
          */}
            <div className="relative flex-1 w-full p-3 opacity-100 transition-all duration-500">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-contain p-4"
                priority={project.number === "01"}
              />
            </div>
          </div>

          {/* Text Content */}
          <div className="shrink-0 mt-auto">
            <h3 className="text-white text-xl md:text-2xl font-bold mb-2 tracking-tight transition-colors duration-300">
              {project.title}
            </h3>

            <p className="text-gray-400 text-xs md:text-sm leading-relaxed line-clamp-2 md:line-clamp-3 transition-colors duration-300">
              {project.desc}
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              {project.tech.map((t, i) => (
                <span
                  key={i}
                  className="tech-tag px-2.5 py-1 border border-white/10 rounded-md text-[9px] font-mono text-gray-400 uppercase tracking-tighter transition-all"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </a>
    </div>
  );
}
