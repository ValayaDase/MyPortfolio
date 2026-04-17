"use client";
import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { FaLinkedinIn, FaGithub, FaTwitter, FaEnvelope } from "react-icons/fa";
import Lottie from "lottie-react";
import contactAnimation from "../public/contactUs.json";
import FuturisticBackground from "./FuturisticBackground";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
  },
};

export default function Contact() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { amount: 0.2 });
  const lottieRef = useRef(null);

  useEffect(() => {
    if (isInView) {
      lottieRef.current?.goToAndPlay(0, true);
    } else {
      lottieRef.current?.goToAndStop(0, true);
    }
  }, [isInView]);

  return (
    <section id="contact" ref={sectionRef} className="py-24 bg-[#0a0a0a] border-t border-white/5 relative overflow-hidden">
      <FuturisticBackground />
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="max-w-6xl mx-auto px-6"
      >

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Left Side: Connect Info */}
          <div>
            <motion.span variants={itemVariants} className="font-mono text-blue-500 text-[10px] uppercase tracking-[0.5em] block mb-4">
              // 05. What's Next?
            </motion.span>

            <motion.h2 variants={itemVariants} className="text-5xl md:text-7xl font-bold tracking-tighter text-white mb-8">
              Get In Touch<span className="text-blue-500">.</span>
            </motion.h2>

            <motion.p variants={itemVariants} className="text-white/40 text-lg leading-relaxed max-w-md mb-10">
              Currently looking for new opportunities or just a friendly hello.
              My inbox is always open.
            </motion.p>

            <motion.div variants={itemVariants} className="w-full max-w-[380px]">
              <Lottie
                lottieRef={lottieRef}
                animationData={contactAnimation}
                loop={false}
                autoplay={false}
              />
            </motion.div>
          </div>

          {/* Right Side: Contact Form */}
          <motion.div variants={itemVariants} className="bg-white/[0.02] border border-white/5 p-8 md:p-10 rounded-[2.5rem] backdrop-blur-sm">
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-mono uppercase tracking-widest text-white/30 ml-2">Name</label>
                  <input type="text" placeholder="John Doe" className="bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white outline-none focus:border-blue-500/50 focus:bg-blue-500/5 transition-all w-full" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-mono uppercase tracking-widest text-white/30 ml-2">Email</label>
                  <input type="email" placeholder="john@example.com" className="bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white outline-none focus:border-blue-500/50 focus:bg-blue-500/5 transition-all w-full" />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-mono uppercase tracking-widest text-white/30 ml-2">Subject</label>
                <input type="text" placeholder="Project Inquiry" className="bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white outline-none focus:border-blue-500/50 focus:bg-blue-500/5 transition-all w-full" />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-mono uppercase tracking-widest text-white/30 ml-2">Message</label>
                <textarea rows="4" placeholder="Tell me about your project..." className="bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white outline-none focus:border-blue-500/50 focus:bg-blue-500/5 transition-all w-full resize-none"></textarea>
              </div>

              <button type="button" className="w-full py-5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-2xl transition-all shadow-lg shadow-blue-600/20 active:scale-[0.98]">
                Send Message
              </button>
            </form>
          </motion.div>

        </div>

        {/* Footer Area with Socials */}
        {/* <motion.div variants={itemVariants} className="mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          
          <a href="mailto:valayadase2005@gmail.com" className="flex items-center gap-3 text-white/60 hover:text-blue-500 transition-colors group">
            <div className="p-3 bg-white/5 rounded-full group-hover:bg-blue-500/10 transition-colors">
              <FaEnvelope size={16} />
            </div>
            <span className="font-mono text-sm">valayadase2005@gmail.com</span>
          </a>

          <div className="flex gap-4">
            {[
              { icon: <FaLinkedinIn size={18} />, link: "https://linkedin.com/in/valaya-dase" },
              { icon: <FaGithub size={18} />, link: "https://github.com/Valaya-Dase" },
              { icon: <FaTwitter size={18} />, link: "#" },
            ].map((social, i) => (
              <a 
                key={i}
                href={social.link}
                target="_blank"
                className="p-3 bg-white/5 rounded-xl text-white/40 hover:text-white hover:bg-blue-600 transition-all duration-300"
              >
                {social.icon}
              </a>
            ))}
          </div>

          <p className="text-white/20 text-[10px] uppercase tracking-[0.3em] text-center md:text-right hidden lg:block">
            © 2026 Valaya Dase.<br/>All Rights Reserved.
          </p>

        </motion.div> */}

      </motion.div>
    </section>
  );
}