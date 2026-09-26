import BookCall from "@/components/BookCall";
import Compare from "@/components/Compare";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Manifesto from "@/components/Manifesto";
import Marquee from "@/components/Marquee";
import Nav from "@/components/Nav";
import Process from "@/components/Process";
import RevealObserver from "@/components/RevealObserver";
import Services from "@/components/Services";
import Testimonials from "@/components/Testimonials";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Manifesto />
        <Services />
        <Process />
        <Compare />
        <Testimonials />
        <BookCall />
      </main>
      <Footer />
      <RevealObserver />
    </>
  );
}
