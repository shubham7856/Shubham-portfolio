import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Evidence from "@/components/Evidence";
import Marquee from "@/components/Marquee";
import Work from "@/components/Work";
import About from "@/components/About";
import Contact from "@/components/Contact";
import SmoothScroll from "@/components/motion/SmoothScroll";
import ScrollFx from "@/components/motion/ScrollFx";
import Cursor from "@/components/motion/Cursor";

export default function Home() {
  return (
    <>
      <SmoothScroll />
      <Cursor />
      <Navbar />
      <main>
        <Hero />
        <Evidence />
        <Marquee />
        <Work />
        <About />
        <Contact />
      </main>
      <ScrollFx />
    </>
  );
}
