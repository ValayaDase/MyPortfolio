"use client";
import { motion } from "framer-motion";
import { FaLinkedinIn, FaGithub, FaTwitter, FaEnvelope } from "react-icons/fa";

export default function Contact() {
  return (
    <section id="contact" className="py-24 bg-[#0a0a0a] border-t border-white/5">
      <div className="max-w-6xl mx-auto px-6">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* Left Side: Connect Info */}
          <div>
            <motion.span 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="font-mono text-blue-500 text-[10px] uppercase tracking-[0.5em] block mb-4"
            >
              // 05. What's Next?
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl font-bold tracking-tighter text-white mb-8"
            >
              Get In Touch<span className="text-blue-500">.</span>
            </motion.h2>
            <p className="text-white/40 text-lg leading-relaxed max-w-md mb-12">
              Currently looking for new opportunities or just a friendly hello. 
              My inbox is always open.
            </p>

            <div className="space-y-6">
              <a href="mailto:valayadase2005@gmail.com" className="flex items-center gap-4 text-white/60 hover:text-blue-500 transition-colors group">
                <div className="p-4 bg-white/5 rounded-full group-hover:bg-blue-500/10">
                  <FaEnvelope size={20} />
                </div>
                <span className="font-mono text-sm">valayadase2005@gmail.com</span>
              </a>

              <div className="flex gap-4 pt-4">
                {[
                  { icon: <FaLinkedinIn />, link: "https://linkedin.com/in/valaya-dase" },
                  { icon: <FaGithub />, link: "https://github.com/Valaya-Dase" },
                  { icon: <FaTwitter />, link: "#" },
                ].map((social, i) => (
                  <a 
                    key={i}
                    href={social.link}
                    target="_blank"
                    className="p-4 bg-white/5 rounded-2xl text-white/40 hover:text-white hover:bg-blue-600 transition-all duration-300"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side: Contact Form (Ready for EmailJS) */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="bg-white/[0.02] border border-white/5 p-8 md:p-10 rounded-[2.5rem] backdrop-blur-sm"
          >
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-mono uppercase tracking-widest text-white/30 ml-2">Name</label>
                  <input 
                    type="text" 
                    placeholder="John Doe"
                    className="bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white outline-none focus:border-blue-500/50 focus:bg-blue-500/5 transition-all w-full"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-mono uppercase tracking-widest text-white/30 ml-2">Email</label>
                  <input 
                    type="email" 
                    placeholder="john@example.com"
                    className="bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white outline-none focus:border-blue-500/50 focus:bg-blue-500/5 transition-all w-full"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-mono uppercase tracking-widest text-white/30 ml-2">Subject</label>
                <input 
                  type="text" 
                  placeholder="Project Inquiry"
                  className="bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white outline-none focus:border-blue-500/50 focus:bg-blue-500/5 transition-all w-full"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-mono uppercase tracking-widest text-white/30 ml-2">Message</label>
                <textarea 
                  rows="4"
                  placeholder="Tell me about your project..."
                  className="bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white outline-none focus:border-blue-500/50 focus:bg-blue-500/5 transition-all w-full resize-none"
                ></textarea>
              </div>

              <button 
                type="button"
                className="w-full py-5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-2xl transition-all shadow-lg shadow-blue-600/20 active:scale-[0.98]"
              >
                Send Message
              </button>
            </form>
          </motion.div>

        </div>

        {/* Minimal Footer */}
        {/* <div className="mt-32 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/20 text-[10px] uppercase tracking-[0.3em]">
            © 2026 Valaya Dase. All Rights Reserved.
          </p>
          <p className="text-white/20 text-[10px] uppercase tracking-[0.3em]">
            Built with Next.js & Framer Motion
          </p>
        </div> */}

      </div>
    </section>
  );
}