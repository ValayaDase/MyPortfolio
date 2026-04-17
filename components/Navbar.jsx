"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [activeTab, setActiveTab] = useState("Home");

  useEffect(() => {
    // Optional scroll tracking logic
  }, []);

  return (
    <header className="fixed top-6 left-0 w-full z-[100] flex justify-center px-6 pointer-events-none">
      
      {/* Navbar Container */}
      <motion.nav 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="pointer-events-auto flex items-center p-1.5 rounded-full bg-[#1e1e1e]/90 backdrop-blur-xl border border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.5)]"
      >
        
        {/* 🚀 PURE CODE-BASED LOGO SECTION */}
        <a 
          href="#home" 
          onClick={() => setActiveTab("Home")} 
          className="flex items-center justify-center px-3 mag group"
        >
          <div className="relative flex items-center justify-center w-8 h-8 rounded-full border border-white/20 bg-gradient-to-br from-white/10 to-transparent overflow-hidden transition-all duration-300 group-hover:border-blue-500/50 shadow-[0_0_10px_rgba(255,255,255,0.05)] group-hover:shadow-[0_0_15px_rgba(37,99,235,0.4)]">
            {/* Animated background glow on hover */}
            <div className="absolute inset-0 bg-blue-500/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
            
            {/* Sleek Typography Monogram */}
            <span className="relative z-10 font-serif font-black text-white text-xs tracking-tighter flex items-center">
              V<span className="text-blue-400 -ml-[1px]">D</span>
            </span>
          </div>
        </a>

        {/* Divider Line */}
        <div className="w-[1px] h-6 bg-white/20 mx-2" />

        {/* NAVIGATION LINKS */}
        <div className="flex items-center">
          {navLinks.map((link) => {
            const isActive = activeTab === link.name;
            const isContact = link.name === "Contact";

            return (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setActiveTab(link.name)}
                className={`relative px-5 py-2.5 text-xs md:text-sm font-semibold rounded-full transition-colors duration-300 mag
                  ${isActive ? "text-white" : "text-white/60 hover:text-white"}
                  ${isContact && !isActive ? "bg-[#0a0a0a] ml-1" : ""} 
                `}
              >
                {/* Sliding Blue Background Animation */}
                {isActive && (
                  <motion.div
                    layoutId="active-pill"
                    className="absolute inset-0 bg-blue-600 rounded-full shadow-[0_0_15px_rgba(37,99,235,0.5)]"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    style={{ zIndex: 0 }}
                  />
                )}
                
                {/* Text Rendering */}
                <span className="relative z-10 tracking-wide">
                  {link.name}
                </span>
              </a>
            );
          })}
        </div>

      </motion.nav>
    </header>
  );
}