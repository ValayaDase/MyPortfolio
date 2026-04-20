import Hero from "@/components/Hero";
import About from "@/components/About";
import Education from "@/components/Education";
import Projects from "@/components/Project";
import Contact from "@/components/Contact";
import Skills from "@/components/Skills";
import TextMarquee from "@/components/TextMarquee";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <About />
      {/* <Education /> */}
      <Skills />
      
      <Projects />
     <TextMarquee /> 
      <Contact />
      <Footer />
      {/* Future sections (Skills, Projects, Contact) yahan aayenge */}
      {/* <section className="h-[50vh] flex items-center justify-center border-t border-white/5 opacity-20">
        <p className="font-mono text-xs uppercase tracking-[1em]">Stay Tuned for More</p>
      </section> */}
    </div>
  );
}