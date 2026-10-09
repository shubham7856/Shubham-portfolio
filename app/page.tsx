import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Evidence from "@/components/Evidence";
import Work from "@/components/Work";
import SkillsPit from "@/components/SkillsPit";
import About from "@/components/About";
import Contact from "@/components/Contact";
import SmoothScroll from "@/components/motion/SmoothScroll";
import ScrollFx from "@/components/motion/ScrollFx";

export default function Home() {
  return (
    <>
      <SmoothScroll />
      <Navbar />
      <main>
        <Hero />
        <Evidence />
        <Work />
        <SkillsPit />
        <About />
        <Contact />
      </main>
      <ScrollFx />
    </>
  );
}
