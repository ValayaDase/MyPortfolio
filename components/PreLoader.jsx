"use client";
import React, { useState, useRef, useLayoutEffect } from 'react';
// Next.js fix: Import from the dist folder for better compatibility
import gsap from 'gsap';

const PreLoader = ({ onComplete }) => {
    const [progress, setProgress] = useState(0);
    const containerRef = useRef(null);
    
    const firstName = "VALAYA".split("");
    const lastName = "DASE".split("");

    useLayoutEffect(() => {
        // Hydration check
        if (typeof window === "undefined") return;

        let ctx = gsap.context(() => {
            const tl = gsap.timeline({
                onComplete: () => {
                    if (onComplete) onComplete();
                }
            });

            // 1. INITIAL STATE: Letters chote aur blur honge
            gsap.set(".letter", { 
                opacity: 0, 
                scale: 0, 
                filter: "blur(15px)",
                display: "inline-block" 
            });
            gsap.set(".loader-line", { width: 0 });
            gsap.set(".name-wrapper", { scale: 0.9 });

            // 2. SLOW & SMOOTH COUNTER
            const loaderValue = { value: 0 };
            gsap.to(loaderValue, {
                value: 100,
                duration: 5,
                ease: "power3.inOut",
                onUpdate: () => setProgress(Math.floor(loaderValue.value)),
            });

            // 3. CENTER-OUT REVEAL: Middle se letters reveal honge
            tl.to(".letter", {
                opacity: 1,
                scale: 1,
                filter: "blur(0px)",
                duration: 1.8,
                stagger: {
                    each: 0.12,
                    from: "center" 
                },
                ease: "expo.out",
            }, 0.3);

            // 4. PROGRESS LINE (Sync with Name)
            tl.to(".loader-line", {
                width: "100%",
                duration: 4.2,
                ease: "power2.inOut",
            }, 0.5);

            // 5. THE EXPANSION: Name ekdam bada hoke disappear hoga
            tl.to(".name-wrapper", {
                scale: 6, // Ultra expansion
                opacity: 0,
                filter: "blur(40px)",
                duration: 1.5,
                ease: "expo.inOut"
            }, "+=0.3");

            // 6. GRID STRIPS EXIT: Parda khulega
            tl.to(".grid-strip", {
                yPercent: -100,
                duration: 1.3,
                stagger: {
                    amount: 0.6,
                    from: "center"
                },
                ease: "expo.inOut"
            }, "-=1");

            // 7. HIDE PRELOADER
            tl.to(containerRef.current, { visibility: "hidden", duration: 0 });
        }, containerRef); // Scope assigned to containerRef

        return () => ctx.revert(); // Cleanup memory on unmount
    }, [onComplete]);

    return (
        <div ref={containerRef} className="fixed inset-0 z-[9999] overflow-hidden bg-[#050505] touch-none">
            
            {/* Background Strips */}
            <div className="absolute inset-0 flex pointer-events-none">
                {[...Array(12)].map((_, i) => (
                    <div key={i} className="grid-strip flex-1 bg-[#0a0a0a] h-full" />
                ))}
            </div>

            {/* Cinematic Overlay */}
            <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

            {/* Content Container */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full w-full px-4">
                
                <div className="name-wrapper flex flex-col items-center">
                    {/* Compact Name Reveal */}
                    <div className="flex flex-wrap justify-center gap-x-4 md:gap-x-8 mb-8">
                        <div className="flex shrink-0">
                            {firstName.map((char, i) => (
                                <span key={`f-${i}`} className="letter text-4xl md:text-6xl font-black font-mono text-white tracking-tighter">
                                    {char}
                                </span>
                            ))}
                        </div>
                        <div className="flex shrink-0">
                            {lastName.map((char, i) => (
                                <span key={`l-${i}`} className="letter text-4xl md:text-6xl font-black font-mono text-white tracking-tighter">
                                    {char}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Loader UI */}
                    <div className="w-full max-w-[250px] md:max-w-[350px]">
                        <div className="h-[1px] w-full bg-white/10 overflow-hidden rounded-full">
                            <div className="loader-line h-full bg-white shadow-[0_0_15px_rgba(255,255,255,1)]"></div>
                        </div>
                        <div className="flex justify-between mt-3 font-mono text-[9px] tracking-[0.3em] text-white/30 uppercase">
                            <span>Initializing System</span>
                            <span className="tabular-nums">{progress}%</span>
                        </div>
                    </div>
                </div>

                {/* Bottom Branding */}
                <div className="absolute bottom-12 flex flex-col items-center opacity-20">
                    <div className="h-8 w-[1px] bg-gradient-to-b from-white to-transparent mb-4"></div>
                    <span className="text-[8px] font-mono tracking-[0.6em] uppercase">
                        VALAYA DASE © 2026
                    </span>
                </div>
            </div>
        </div>
    );
};

export default PreLoader;