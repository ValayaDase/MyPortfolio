"use client";
import React, { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";

// Helper to split text into individual spans for 3D Particle Assembly
const SplitText = ({ text }) => {
  return (
    <span aria-label={text} className="inline-block flex">
      {text.split("").map((char, index) => (
        <span
          key={index}
          aria-hidden="true"
          className="particle-char inline-block"
          style={{ whiteSpace: char === " " ? "pre" : "normal" }}
        >
          {char}
        </span>
      ))}
    </span>
  );
};

const Hero = () => {
  const scrollTrackRef = useRef(null);
  const cardGroupRef = useRef(null);
  const cardBackplateRef = useRef(null);
  const imageWrapperRef = useRef(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const mm = gsap.matchMedia();

    mm.add({
      isDesktop: "(min-width: 768px)",
      isMobile: "(max-width: 767px)"
    }, (context) => {
      const { isDesktop } = context.conditions;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: scrollTrackRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.5,
        },
      });

      if (isDesktop) {
        tl
          // Phase 1: Entire Card Group scales down slightly
          .to(cardGroupRef.current, {
            scale: 0.85,
            duration: 1,
            ease: "power2.inOut",
          })

          // Phase 2: Card Group moves RIGHT and Flips in 3D
          .addLabel("moveRight")
          .to(
            cardGroupRef.current,
            {
              x: "22vw", // Move to right side
              rotateY: -20, // 3D Tilt
              rotateX: 10,
              duration: 3,
              ease: "power3.inOut",
            },
            "moveRight",
          )

          // Intensify the glow on the backplate as it moves
          .to(
            cardBackplateRef.current,
            {
              boxShadow: "0 0 80px rgba(0, 255, 255, 0.4)",
              borderColor: "rgba(0, 255, 255, 0.5)",
              duration: 3,
            },
            "moveRight",
          )

          // Phase 3: TRUE Image Pop-Out
          .to(
            imageWrapperRef.current,
            {
              scale: 1.25,
              x: -30, // Shift left out of bounds
              y: -40, // Shift up out of bounds
              z: 50, // Pushes image forward
              rotateY: 10, // Counter-rotation
              boxShadow: "-20px 40px 60px rgba(0,0,0,0.9)", // Drop shadow
              duration: 2.5,
              ease: "power2.out",
            },
            "-=1.5",
          )

          // Phase 4: Particle 3D Assembly (Text forms on the Left)
          .fromTo(
            ".particle-char",
            {
              opacity: 0,
              x: () => gsap.utils.random(-400, 0),
              y: () => gsap.utils.random(-300, 300),
              z: () => gsap.utils.random(200, 800), // Start close to camera
              filter: "blur(20px)",
              scale: 0,
            },
            {
              opacity: 1,
              x: 0,
              y: 0,
              z: 0,
              filter: "blur(0px)",
              scale: 1,
              duration: 3,
              stagger: 0.03,
              ease: "power3.out",
            },
            "moveRight+=0.5",
          )

          // Phase 5: Fade in description and UI elements smoothly
          .fromTo(
            ".content-fade",
            { opacity: 0, y: 40, filter: "blur(10px)" },
            {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              duration: 2,
              stagger: 0.15,
              ease: "power2.out",
            },
            "moveRight+=1.5",
          );
      } else {
        // Mobile Animation Sequence
        tl
          // Phase 1: Card Group scales down
          .to(cardGroupRef.current, {
            scale: 0.8,
            duration: 1,
            ease: "power2.inOut",
          })

          // Phase 2: Card Group moves UP and tilts in 3D
          .addLabel("moveUp")
          .to(
            cardGroupRef.current,
            {
              y: "0", // Move up on mobile
              rotateX: 12,
              rotateY: -8,
              duration: 3,
              ease: "power3.inOut",
            },
            "moveUp",
          )

          // Glow backplate
          .to(
            cardBackplateRef.current,
            {
              boxShadow: "0 0 60px rgba(0, 255, 255, 0.35)",
              borderColor: "rgba(0, 255, 255, 0.4)",
              duration: 3,
            },
            "moveUp",
          )

          // Phase 3: Image Pop-Out (Less aggressive)
          .to(
            imageWrapperRef.current,
            {
              scale: 1.15,
              y: -15,
              z: 30,
              rotateX: -5,
              boxShadow: "0 15px 30px rgba(0,0,0,0.8)",
              duration: 2.5,
              ease: "power2.out",
            },
            "-=1.5",
          )

          // Phase 4: Particle 3D Assembly (Text forms below the card)
          .fromTo(
            ".particle-char",
            {
              opacity: 0,
              y: () => gsap.utils.random(100, 300),
              z: () => gsap.utils.random(100, 400),
              filter: "blur(10px)",
              scale: 0.5,
            },
            {
              opacity: 1,
              x: 0,
              y: 0,
              z: 0,
              filter: "blur(0px)",
              scale: 1,
              duration: 3,
              stagger: 0.02,
              ease: "power3.out",
            },
            "moveUp+=0.5",
          )

          // Phase 5: Fade in description and UI elements
          .fromTo(
            ".content-fade",
            { opacity: 0, y: 30, filter: "blur(5px)" },
            {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              duration: 2,
              stagger: 0.10,
              ease: "power2.out",
            },
            "moveUp+=1.2",
          );
      }
    });

    return () => mm.revert();
  }, []);

  const leftHalfVariants = {
    hidden: { x: "-100%", opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { type: "spring", damping: 20, stiffness: 60, delay: 0.2 },
    },
  };

  const rightHalfVariants = {
    hidden: { x: "100%", opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { type: "spring", damping: 20, stiffness: 60, delay: 0.2 },
    },
  };

  const fadeInVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut", delay: 0.6 },
    },
  };

  return (
    <div className="relative w-full bg-[#050505]">
      {/* --- THE FIXED STAGE --- */}
      <div
        className="fixed top-0 left-0 w-full h-screen z-0 overflow-hidden"
        style={{ perspective: "2000px" }}
      >
        <div className="container mx-auto max-w-[1400px] h-full flex flex-col-reverse md:flex-row items-center justify-center relative px-6 md:px-8 gap-8 md:gap-0">

          {/* CONTENT: Assembles on the Left (Desktop) or Bottom (Mobile) */}
          <div className="relative md:absolute md:left-[10%] w-full md:w-[50%] z-20 pointer-events-none flex flex-col items-center md:items-start text-center md:text-left mb-6 md:mb-0">
            <h1 className="text-white text-4xl sm:text-5xl md:text-8xl font-black tracking-tighter leading-none mb-4 md:mb-6">
              <SplitText text="VALAYA" /> <br />
              <span className="text-cyan-500">
                <SplitText text="DASE." />
              </span>
            </h1>

            <div className="content-fade opacity-0 pointer-events-auto flex flex-col items-center md:items-start">
              <p className="text-white/70 text-sm md:text-xl max-w-sm md:max-w-md font-light leading-relaxed mb-6 md:mb-8">
                Full-stack developer building immersive, high-performance
                digital experiences. Focused on bridging scalable logic with
                fluid, cinematic motion design.
              </p>

              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 md:gap-6">
                {/* LinkedIn */}
                <a
                  target="_blank"
                  href="https://www.linkedin.com/in/valaya-dase-9b17a8331/"
                  className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-[#0A66C2] hover:border-[#0A66C2] hover:text-white transition-all duration-300"
                >
                  <svg
                    className="w-3.5 h-3.5 md:w-4 md:h-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>

                {/* GitHub */}
                <a
                  target="_blank"
                  href="https://github.com/ValayaDase"
                  className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:border-white hover:text-black transition-all duration-300"
                >
                  <svg
                    className="w-4 h-4 md:w-5 md:h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>

                {/* Instagram */}
                <a
                  target="_blank"
                  href="https://www.instagram.com/_valaya_.02"
                  className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-[#E1306C] hover:border-[#E1306C] hover:text-white transition-all duration-300"
                >
                  <svg
                    className="w-4 h-4 md:w-5 md:h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>

                {/* Resume download button */}
                <a href="/resume.pdf" download="Valaya_Dase_Resume.pdf" target="_blank" rel="noopener noreferrer">
                  <button className="relative overflow-hidden group px-6 py-3 md:px-8 md:py-4 rounded-full border border-cyan-500 text-cyan-400 font-bold uppercase tracking-widest text-[10px] md:text-xs transition-colors">
                    <span className="absolute inset-x-0 bottom-0 h-0 bg-cyan-500 transition-all duration-300 ease-out group-hover:h-full z-0"></span>
                    <span className="relative z-10 group-hover:text-black transition-colors duration-300">
                      Download Resume
                    </span>
                  </button>
                </a>
              </div>
            </div>
          </div>

          {/* CARD MASTER GROUP: Holds both backplate and image */}
          <div
            ref={cardGroupRef}
            className="relative z-10 w-[220px] h-[330px] sm:w-[280px] sm:h-[420px] md:w-[340px] md:h-[500px] shrink-0 mt-16 md:mt-0"
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* 1. The Glowing Backplate (Pushed slightly back) */}
            <div
              ref={cardBackplateRef}
              className="absolute inset-0 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[1.5rem] md:rounded-[2rem] shadow-[0_0_30px_rgba(0,0,0,0.8)]"
              style={{ transform: "translateZ(-1px)" }}
            />

            {/* 2. The Image Wrapper (Pulled slightly forward initially) */}
            <div
              ref={imageWrapperRef}
              className="absolute inset-3 md:inset-4 z-20 rounded-[1.2rem] md:rounded-[1.5rem] overflow-hidden bg-[#050505]"
              style={{ transform: "translateZ(1px)" }}
            >
              <Image
                src="/valaya.jpeg"
                alt="Valaya Dase Portrait"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 220px, (max-width: 1200px) 280px, 340px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
              <div className="absolute bottom-4 md:bottom-6 left-0 w-full text-center z-20">
                <p className="text-white font-mono text-[10px] md:text-xs tracking-widest uppercase shadow-black drop-shadow-md">
                  Valaya Dase
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- THE SCROLL TRACK --- */}
      <div
        ref={scrollTrackRef}
        className="relative z-10 w-full h-[250vh] pointer-events-none"
      />

      {/* --- ABOUT SECTION OVERLAP --- */}
      <section className="relative z-30 bg-black text-white min-h-screen rounded-t-[2.5rem] md:rounded-t-[4rem] shadow-[0_-30px_60px_rgba(0,0,0,0.9)] flex items-center justify-center px-4 overflow-hidden">
        <div className="max-w-7xl mx-auto w-full text-center font-bold text-base sm:text-xl md:text-3xl lg:text-5xl tracking-tight text-gray-300 select-none flex flex-col gap-3 md:gap-4">

          {/* --- Line 1 Split --- */}
          <div className="flex w-full justify-center overflow-hidden py-1 md:py-2">
            <motion.div
              initial={{ x: "-40%", opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ type: "spring", damping: 20, stiffness: 70 }}
              className="text-right pr-1 w-1/2"
            >
              I <span className="text-[#3b82f6]">build</span> robust full-stack
            </motion.div>

            <motion.div
              initial={{ x: "40%", opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ type: "spring", damping: 20, stiffness: 70 }}
              className="text-left pl-1 w-1/2"
            >
              apps with flawless logic.
            </motion.div>
          </div>

          {/* --- Line 2 Split --- */}
          <div className="flex flex-wrap w-full justify-center items-center py-1 md:py-2">
            <motion.span
              initial={{ x: "-20px", opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ type: "spring", damping: 20, stiffness: 70 }}
              className="inline-block pr-2"
            >
              Engineering <span className="text-[#3b82f6]">scalable</span>,
              high-performance
            </motion.span>

            <motion.span
              initial={{ x: "20px", opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ type: "spring", damping: 20, stiffness: 70 }}
              className="inline-block text-white"
            >
              architecture for users.
            </motion.span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
