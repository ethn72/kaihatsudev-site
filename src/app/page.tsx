import { Nav } from "@/components/ui/Nav";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { Work } from "@/components/sections/Work";
import { About } from "@/components/sections/About";
import { KaiSection } from "@/components/sections/KaiSection";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";
import { KaiWidget } from "@/components/ui/KaiWidget";

export default function Home() {
  return (
    <>
      <SmoothScroll />
      <Nav />
      <main>
        <Hero />
        <Services />
        <Work />
        <About />
        <KaiSection />
        <Contact />
      </main>
      <Footer />
      <KaiWidget />
    </>
  );
}
