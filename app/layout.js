"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import GlobalCursor from "@/components/GlobalCursor";
import PreLoader from "@/components/PreLoader";
import Navbar from "@/components/Navbar";
import SmoothScroll from "@/components/SmoothScroll";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export default function RootLayout({ children }) {
  const [isLoading, setIsLoading] = useState(true);

  // Yeh function tab trigger hoga jab PreLoader ki 
  // GSAP animation poori khatam ho jayegi
  const handleLoadingComplete = () => {
    setIsLoading(false);
    setTimeout(() => {
      window.dispatchEvent(new Event("resize"));
      ScrollTrigger.refresh();
    }, 150);
  };

  return (
    <html lang="en" className={`${inter.variable} ${mono.variable}`}>
      <body className="bg-[#0a0a0a] text-white antialiased overflow-x-hidden">
        <SmoothScroll>

        <ToastContainer
          position="top-right"
          autoClose={3000}
          theme="dark"
        />

        {/* global cursor */}
        <GlobalCursor />

        <AnimatePresence mode="wait">
          {isLoading && (
            <PreLoader
              key="loader"
              onComplete={handleLoadingComplete}
            />
          )}
        </AnimatePresence>

        {/* Content Reveal with Stagger or Simple Fade */}
        {!isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1.2,
              ease: [0.22, 1, 0.36, 1] // Custom Cubic Bezier for premium feel
            }}
          >
            <Navbar />
            <main>{children}</main>
          </motion.div>
        )}
        </SmoothScroll>
      </body>
    </html>
  );
}