"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export default function GlobalCursor() {
  const cursorRef = useRef(null);
  const followerRef = useRef(null);

  useEffect(() => {
    // 1. Mouse Move Tracking (Desktop Only)
    const xToCursor = gsap.quickTo(cursorRef.current, "x", { duration: 0.1, ease: "power2.out" });
    const yToCursor = gsap.quickTo(cursorRef.current, "y", { duration: 0.1, ease: "power2.out" });
    
    const xToFollower = gsap.quickTo(followerRef.current, "x", { duration: 0.5, ease: "power3.out" });
    const yToFollower = gsap.quickTo(followerRef.current, "y", { duration: 0.5, ease: "power3.out" });

    const moveCursor = (e) => {
      const { clientX: x, clientY: y } = e;
      xToCursor(x);
      yToCursor(y);
      xToFollower(x);
      yToFollower(y);
    };

    // 2. Hover Interactions (Scale up on links/buttons)
    const onHover = () => {
      gsap.to(cursorRef.current, { scale: 0.5, duration: 0.3 }); // Dot shrinks
      gsap.to(followerRef.current, { scale: 2.5, backgroundColor: "rgba(255,255,255,0.1)", borderColor: "transparent", duration: 0.3 }); // Ring expands and fills
    };

    const onLeave = () => {
      gsap.to(cursorRef.current, { scale: 1, duration: 0.3 });
      gsap.to(followerRef.current, { scale: 1, backgroundColor: "transparent", borderColor: "white", duration: 0.3 });
    };

    // 3. Event Listeners
    window.addEventListener("mousemove", moveCursor);

    // Add hovers to all interactive elements
    const interactiveElements = document.querySelectorAll("a, button, .magnetic-target");
    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", onHover);
      el.addEventListener("mouseleave", onLeave);
    });

    // Cleanup
    return () => {
      window.removeEventListener("mousemove", moveCursor);
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", onHover);
        el.removeEventListener("mouseleave", onLeave);
      });
    };
  }, []);

  return (
    <>
      {/* 1. Inner Dot (The active point) */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-3 h-3 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference -translate-x-1/2 -translate-y-1/2"
      />
      {/* 2. Outer Follower Ring (The smooth element) */}
      <div
        ref={followerRef}
        className="fixed top-0 left-0 w-10 h-10 border border-white rounded-full pointer-events-none z-[9998] mix-blend-difference -translate-x-1/2 -translate-y-1/2"
      />
    </>
  );
}