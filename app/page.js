import Hero from "@/components/Hero";
import About from "@/components/About";
import Education from "@/components/Education";
import Projects from "@/components/Project";
import Contact from "@/components/Contact";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import TextMarquee from "@/components/TextMarquee";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col">
      <section><Hero /></section>
      <section id="about"><About /></section>
      <section id="skills"><Skills /></section>
      <section id="experience"><Experience /></section>
      <section id="projects"><Projects /></section>
      <section><TextMarquee /></section>
      <section id="contact"><Contact /></section>
      <section><Footer /></section>

      {/* <Education /> */}
      
    </div>
  );
}