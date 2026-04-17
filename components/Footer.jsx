"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaLinkedinIn, FaGithub, FaTwitter, FaArrowUp } from "react-icons/fa";
import Lottie from "lottie-react";
import animationData from "../public/animation.json";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export default function Footer() {
    const footerRef = useRef(null);
    const linksRef = useRef([]);
    const scooterRef = useRef(null);
    const nameRevealRef = useRef(null);
    const nameTrackRef = useRef(null);

    useEffect(() => {
        let ctx = gsap.context(() => {
            // Links animation
            if (linksRef.current.length > 0) {
                gsap.fromTo(
                    linksRef.current,
                    { y: 30, opacity: 0, scale: 0.8 },
                    {
                        y: 0,
                        opacity: 1,
                        scale: 1,
                        duration: 0.8,
                        stagger: 0.1,
                        ease: "back.out(1.7)",
                        scrollTrigger: {
                            trigger: footerRef.current,
                            start: "top 85%",
                        }
                    }
                );
            }

            // Top section animation
            gsap.fromTo(
                ".footer-top-reveal",
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    stagger: 0.2,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: footerRef.current,
                        start: "top 85%",
                    }
                }
            );

            // ── Synchronized Scooter + Text Reveal ──
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: nameTrackRef.current,
                    start: "top 82%",
                }
            });

            // Step 1: Scooter drives from left edge to right edge (3s)
            // Using left % so it tracks across the full width of the container
            tl.fromTo(
                scooterRef.current,
                { left: "-5%" },
                { left: "100%", duration: 3, ease: "power2.inOut" },
                0
            );

            // Step 2: Text clip-path reveals in perfect sync (same 3s)
            tl.fromTo(
                nameRevealRef.current,
                { clipPath: "inset(0 100% 0 0)" },
                { clipPath: "inset(0 0% 0 0)", duration: 3, ease: "power2.inOut" },
                0
            );

            // Step 3: After scooter reaches the end, fade it out smoothly
            tl.to(
                scooterRef.current,
                { opacity: 0, scale: 0.6, duration: 0.6, ease: "power2.in" },
                2.8 // overlap slightly before the move ends for a polished feel
            );

        }, footerRef);

        return () => ctx.revert();
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const name = "VALAYA DASE";

    return (
        <footer ref={footerRef} className="relative bg-[#030303] pt-32 pb-8 overflow-hidden border-t border-white/5">
            {/* Background Glow */}
            <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-full max-w-5xl h-64 bg-blue-600/10 blur-[140px] rounded-full pointer-events-none"></div>

            {/* ── Top Section: CTA + Socials ── */}
            <div className="max-w-7xl mx-auto px-6 relative z-10 w-full mb-28">
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-16">

                    {/* Left side info */}
                    <div className="max-w-lg">
                        <h3 className="footer-top-reveal text-4xl md:text-5xl font-bold tracking-tighter text-white mb-6">
                            Let&apos;s Build Something <span className="text-blue-500">Amazing.</span>
                        </h3>
                        <p className="footer-top-reveal text-white/40 text-lg mb-8 leading-relaxed">
                            Open for freelance opportunities, collaborations, and building the future of web experiences.
                        </p>
                        {/* <a href="mailto:valayadase2005@gmail.com" className="footer-top-reveal inline-flex items-center gap-4 px-8 py-4 bg-white/[0.03] hover:bg-blue-600 border border-white/10 hover:border-blue-500 rounded-full transition-all duration-500 group">
                            <span className="font-mono text-sm tracking-wider uppercase">Say Hello</span>
                            <div className="w-2.5 h-2.5 rounded-full bg-blue-500 group-hover:bg-white transition-colors duration-500"></div>
                        </a> */}
                    </div>

                    {/* Right side connect */}
                    <div className="flex flex-col gap-6">
                        <p className="footer-top-reveal font-mono text-xs uppercase tracking-[0.3em] text-white/30 mb-2">Connect</p>
                        <div className="flex gap-4">
                            {[
                                { icon: <FaLinkedinIn size={20} />, link: "https://linkedin.com/in/valaya-dase" },
                                { icon: <FaGithub size={20} />, link: "https://github.com/Valaya-Dase" },
                                { icon: <FaTwitter size={20} />, link: "#" },
                            ].map((social, i) => (
                                <a
                                    key={i}
                                    href={social.link}
                                    target="_blank"
                                    rel="noreferrer"
                                    ref={el => linksRef.current[i] = el}
                                    className="w-14 h-14 flex items-center justify-center bg-white/[0.03] border border-white/10 rounded-full text-white/50 hover:text-white hover:bg-blue-600 hover:border-blue-500 hover:shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-all duration-300"
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Scooter + Name Reveal Section ── */}
            <div ref={nameTrackRef} className="max-w-7xl mx-auto px-6 w-full relative overflow-hidden" style={{ minHeight: "clamp(80px, 15vw, 200px)" }}>

                {/* 
                    Scooter Container: 
                    - Absolutely positioned inside the name track
                    - Vertically centered using top:50% + translateY(-50%)
                    - Horizontally animated via GSAP left property
                    - Width is responsive: 20vw clamped between 80px and 180px
                */}
                <div
                    ref={scooterRef}
                    className="absolute z-20 pointer-events-none"
                    style={{
                        top: "60%",
                        transform: "translateY(-50%)",
                        left: "-5%",
                        width: "clamp(80px, 20vw, 180px)",
                    }}
                >
                    <Lottie animationData={animationData} loop={true} />
                </div>

                {/* 
                    Name Text:
                    - clip-path inset masks from right, synced with scooter
                    - Uses flex with justify-between to evenly space letters
                    - Font size is responsive via vw units
                */}
                <div
                    ref={nameRevealRef}
                    className="w-full flex justify-between items-center whitespace-nowrap"
                    style={{ clipPath: "inset(0 100% 0 0)" }}
                >
                    {name.split("").map((char, index) => (
                        <span
                            key={index}
                            className="font-black tracking-tighter leading-none cursor-default inline-block select-none transition-colors duration-700 hover:text-blue-500/40"
                            style={{
                                fontSize: "clamp(2.5rem, 10vw, 10rem)",
                                color: "rgba(255, 255, 255, 0.04)",
                            }}
                        >
                            {char === " " ? "\u00A0" : char}
                        </span>
                    ))}
                </div>
            </div>

            {/* Divider */}
            <div className="max-w-7xl mx-auto px-6 w-full">
                <div className="border-b border-white/5 mb-8"></div>
            </div>

            {/* ── Bottom Credit Line ── */}
            <div className="max-w-7xl mx-auto px-6 w-full">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex gap-4 md:gap-6 items-center">
                        <p className="text-white/30 text-[10px] md:text-xs uppercase tracking-[0.2em] font-mono">
                            © {new Date().getFullYear()} Valaya Dase
                        </p>
                        <div className="w-1 h-1 rounded-full bg-white/20"></div>
                        <p className="text-white/30 text-[10px] md:text-xs uppercase tracking-[0.2em] font-mono">
                            All Rights Reserved
                        </p>
                    </div>

                    <button
                        onClick={scrollToTop}
                        className="group flex items-center justify-center gap-3 px-6 py-3 bg-white/[0.03] hover:bg-blue-600 border border-white/10 rounded-full transition-all duration-300"
                    >
                        <span className="font-mono text-[10px] uppercase tracking-widest text-white/50 group-hover:text-white">Back to Top</span>
                        <FaArrowUp className="text-white/50 group-hover:text-white group-hover:-translate-y-1 transition-transform" />
                    </button>
                </div>
            </div>
        </footer>
    );
}