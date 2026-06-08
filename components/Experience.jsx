"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Experience = () => {
  const [activeTab, setActiveTab] = useState('internships');

  const tabs = [
    { id: 'internships', label: 'Internships' },
    { id: 'hackathons', label: 'Hackathons' },
    { id: 'others', label: 'Others' }
  ];

  const experienceData = {
    internships: [
      {
        title: 'Frontend Developer Intern',
        organization: 'Ideamagix',
        duration: '2026',
        logo: '/ideamagix.png', 
        points: [
          'Worked actively on frontend development using React and SCSS, building clean layouts completely from scratch without relying on AI tools.',
          'Handled everyday development tasks, including testing active projects, fixing bugs, and improving UI components.',
          'Gained practical experience in writing clean, reliable code and adapting quickly to a real company environment.'
        ]
      },
      {
        title: 'MERN Stack Developer Intern',
        organization: 'Sapphire',
        duration: '2025',
        logo: '/sapphire.jpeg', 
        points: [
          'Gained hands-on experience building a full-stack web application from scratch using MongoDB, Express.js, React, and Node.js.',
          'Developed clean, reusable frontend components and integrated them smoothly with backend databases.',
          'Created scalable server-side logic and secure APIs to handle user data and application routing efficiently.',
          'Collaborated with the team to write clean code, test features, and ensure the web app could handle real-world traffic.'
        ]
      }
    ],
    hackathons: [
      {
        title: 'Hackathon Participant',
        organization: 'HackNiche 4.0 (D.J. Sanghvi College of Engineering)',
        duration: '2025',
        logo: '/hackniche.jpeg',
        points: [
          'Designed and developed a Web Application Accessibility Audit Platform to analyze URLs for web compliance standards.',
          'Worked with a team to build the core architecture under a tight deadline, focusing on clean frontend implementation.',
          'Implemented features to detect UI flaws, ensuring web designs are usable for people with disabilities.'
        ]
      },
      {
        title: 'Hackathon Participant',
        organization: "Hack To Crack 2.0 (ViMEET)",
        duration: 'March 2025',
        logo: '/hack_to_crack.png',
        points: [
          'Participated as a beginner developer, gaining valuable hands-on experience in building software prototypes from scratch.',
          'Worked closely with industry mentors to understand system architecture, project planning, and efficient debugging.',
          'Learned how to collaborate effectively within a team environment to solve real-world technical problems under pressure.'
        ]
      }
    ],
    others: [
      {
        title: 'Open Source Contributor',
        organization: "Social Summer of Code (SSOC'26)",
        duration: '2026',
        logo: '/ssoc.png',
        points: [
          'Selected as an official contributor for a major open-source development program.',
          'Contributed to real-world repositories by solving GitHub issues, fixing bugs, and improving code quality.',
          'Collaborated with mentors and developers using advanced Git and GitHub workflows.'
        ]
      },
      {
        title: 'Technical Committee Member',
        organization: 'CSI (Computer Society of India) Student Chapter',
        duration: '2024 - 2025',
        logo: '/csi.jpeg',
        points: [
          'Served as a core technical team member to organize and execute major college tech festivals and competitions.',
          'Managed the technical setup and operations for Technokruti, our college’s annual technical event.',
          'Successfully co-organized HackVerse, a 24-hour hackathon, ensuring smooth infrastructure, system readiness, and support for participating teams.',
          'Collaborated with a team to promote technical learning, coordinate schedules, and manage event workflows.'
        ]
      }
    ]
  };

  return (
    <section id='experience' className="relative z-40 bg-black text-white py-28 px-6 md:px-12 lg:px-20 min-h-screen flex flex-col justify-start items-center overflow-hidden shadow-[0_-30px_60px_rgba(0,0,0,1)]">
      
      {/* Section Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
          My <span className="text-blue-500 italic">Experience</span>
        </h2>
        <div className="w-12 h-[3px] bg-blue-600 mx-auto mt-4 rounded-full shadow-[0_0_15px_#1a56ff]"></div>
      </motion.div>

      {/*  FIXED: Seamless Capsule Navigation Tabs matching Hero's liquid layout */}
      <div className="flex bg-[#0d0d0f] border border-white/5 p-2 rounded-full gap-2 mb-20 shadow-2xl max-w-full relative z-50">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="relative overflow-hidden group px-7 py-3 rounded-full border border-transparent hover:border-blue-500/20 text-sm md:text-base font-bold uppercase tracking-widest text-xs transition-all duration-300 outline-none select-none"
              style={{ WebkitTapHighlightColor: 'transparent' }}
            >
              {/* Liquid Hover Wave Fill Effect (Matches Hero Resume Download logic) */}
              <span className="absolute inset-x-0 bottom-0 h-0 bg-blue-500 transition-all duration-300 ease-out group-hover:h-full -z-10" />

              {/* Active Tab Background Layer */}
              {isActive && (
                <motion.span
                  layoutId="activeTabPill"
                  className="absolute inset-0 bg-blue-600 rounded-full -z-10 shadow-[0_0_25px_rgba(37,99,235,0.6)] border border-blue-400/30"
                  transition={{ type: "spring", stiffness: 300, damping: 24 }}
                />
              )}
              
              <span className={`relative z-10 transition-colors duration-300 ${isActive ? 'text-white' : 'text-white/60 group-hover:text-white'}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Cards Grid Container (Directional Entrance Animations) */}
      <div className="w-full max-w-6xl mx-auto relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full"
          >
            {experienceData[activeTab].map((item, index) => {
              const isEven = index % 2 === 0;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: isEven ? -80 : 80 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: isEven ? -80 : 80 }}
                  transition={{ type: 'spring', stiffness: 100, damping: 18, mass: 0.8 }}
                  whileHover={{ y: -6 }}
                  className="relative bg-zinc-900/20 backdrop-blur-md border border-zinc-900 hover:border-blue-500/40 p-6 md:p-8 rounded-2xl flex flex-col justify-between transition-all duration-300 shadow-xl group overflow-hidden"
                >
                  <div className="absolute -right-20 -top-20 w-40 h-40 bg-blue-600/5 rounded-full blur-3xl group-hover:bg-blue-600/15 transition-all duration-500 pointer-events-none" />
                  
                  <div>
                    {/* Upper Header Row */}
                    <div className="flex items-start justify-between gap-4 mb-6 border-b border-zinc-800/60 pb-5">
                      <div className="flex items-center gap-4">
                        {/* Img Box Shell Container */}
                        <div className="w-12 h-12 rounded-xl border border-zinc-800 bg-black flex items-center justify-center overflow-hidden p-1 group-hover:border-blue-500/30 transition-colors duration-300 shrink-0 shadow-lg">
                          <img 
                            src={item.logo} 
                            alt={`${item.organization} logo`} 
                            className="w-full h-full object-contain rounded-lg"
                            onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/150' }} 
                          />
                        </div>
                        <div>
                          <h3 className="text-lg md:text-xl font-bold text-white tracking-wide group-hover:text-blue-400 transition-colors duration-300">
                            {item.title}
                          </h3>
                          <p className="text-blue-500 font-medium text-sm tracking-wide mt-0.5">
                            {item.organization}
                          </p>
                        </div>
                      </div>
                      <span className="text-[11px] font-semibold tracking-wider px-3 py-1 bg-zinc-900 text-zinc-400 border border-zinc-800 rounded-full whitespace-nowrap mt-1">
                        {item.duration}
                      </span>
                    </div>

                    {/* Descriptive Core Points */}
                    <ul className="space-y-4">
                      {item.points.map((point, ptIdx) => (
                        <li key={ptIdx} className="flex items-start gap-3 text-zinc-400 text-sm md:text-[15px] leading-relaxed">
                          <span className="min-w-[6px] h-[6px] rounded-full bg-blue-500 mt-2 shadow-[0_0_8px_#1a56ff]" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Experience;