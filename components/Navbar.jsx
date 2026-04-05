"use client";
import React from "react";
import { motion } from "framer-motion";

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 flex justify-center p-6">
      <motion.nav 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md shadow-2xl"
      >
        <div className="px-4 py-2 text-sm font-mono font-bold tracking-tighter uppercase text-blue-400">
          <a href="#home" className="text-blue-400 hover:text-blue-300">
            Valaya
          </a>
        </div>

        <div className="w-[1px] h-4 bg-white/20 mx-1" />

        <div className="flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="px-4 py-2 text-[10px] md:text-xs uppercase tracking-[0.2em] text-white/40 hover:text-white transition-all cursor-pointer"
            >
              {link.name}
            </a>
          ))}
        </div>
      </motion.nav>
    </header>
  );
}