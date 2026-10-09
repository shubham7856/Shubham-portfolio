import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Evidence from "@/components/Evidence";
import Work from "@/components/Work";
import About from "@/components/About";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Evidence />
        <Work />
        <About />
        <Contact />
      </main>
    </>
  );
}
