"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaTimes } from "react-icons/fa";

const navLinks = [
  { name: "Home", href: "#" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Experience", href: "#experience"},
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [activeTab, setActiveTab] = useState("Home");
  const [isOpen, setIsOpen] = useState(false);

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
        className="relative pointer-events-auto flex items-center justify-between w-full md:w-auto p-2 md:p-1.5 rounded-full bg-[#1e1e1e]/90 backdrop-blur-xl border border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.5)]"
      >

        {/* 🚀 PURE CODE-BASED LOGO SECTION */}
        <a
          href="#home"
          onClick={() => {
            setActiveTab("Home");
            setIsOpen(false);
          }}
          className="flex items-center justify-center px-3 mag group"
        >
          <div className="relative flex items-center justify-center w-8 h-8 rounded-full border border-white/20 bg-gradient-to-br from-white/10 to-transparent overflow-hidden transition-all duration-300 group-hover:border-blue-500/50 shadow-[0_0_10px_rgba(255,255,255,0.05)] group-hover:shadow-[0_0_15px_rgba(37,99,235,0.4)]">
            {/* Animated background glow on hover */}
            <div className="absolute inset-0 bg-blue-500/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />

            {/* Sleek Typography Monogram */}
            <span
              onClick={() => {
                document.getElementById("home")?.scrollIntoView({
                  behavior: "smooth",
                });
              }}
              className="relative z-10 font-serif font-black text-white text-xs tracking-tighter flex items-center">
              V<span className="text-blue-400 -ml-[1px]">D</span>
            </span>
          </div>
        </a>

        {/* Divider Line */}
        <div className="hidden md:block w-[1px] h-6 bg-white/20 mx-2" />

        {/* NAVIGATION LINKS - Desktop Only */}
        <div className="hidden md:flex items-center">
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
                    className="absolute inset-0 bg-blue-600 rounded-full shadow-[0_0_25px_rgba(37,99,235,0.8)] border border-blue-400/50"
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
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

        {/* Mobile Hamburger Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex md:hidden items-center justify-center w-8 h-8 rounded-full border border-white/10 bg-white/5 text-white hover:bg-white/10 transition-all duration-300 ml-2 mr-2 outline-none"
        >
          {isOpen ? <FaTimes size={12} /> : <FaBars size={12} />}
        </button>

        {/* Mobile Dropdown Menu Drawer */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="absolute top-[120%] left-0 w-full p-4 rounded-[2rem] bg-[#1e1e1e]/95 backdrop-blur-2xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.8)] flex flex-col gap-2 z-50 pointer-events-auto"
            >
              {navLinks.map((link) => {
                const isActive = activeTab === link.name;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => {
                      setActiveTab(link.name);
                      setIsOpen(false);
                    }}
                    className={`relative px-6 py-3.5 text-xs font-bold rounded-2xl transition-all duration-300 flex items-center justify-between uppercase tracking-wider
                      ${isActive ? "text-white bg-blue-600 shadow-[0_0_20px_rgba(37,99,235,0.5)] border border-blue-400/30" : "text-white/60 hover:text-white hover:bg-white/5"}
                    `}
                  >
                    <span>{link.name}</span>
                    {isActive && <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />}
                  </a>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>

      </motion.nav>
    </header>
  );
}