import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Navbar } from "./components/Navbar";
import { HeroSection } from "./components/HeroSection";
import { WorkSection } from "./components/WorkSection";
import { AboutSection } from "./components/AboutSection";
import { SkillsSection } from "./components/SkillsSection";
import { ContactSection } from "./components/ContactSection";
import { Footer } from "./components/Footer";

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  useEffect(() => {
    // Smooth section color transitions
    const sections = document.querySelectorAll("section");
    sections.forEach((section) => {
      ScrollTrigger.create({
        trigger: section,
        start: "top 80%",
        end: "bottom 20%",
        toggleClass: { targets: section, className: "is-active" },
      });
    });

    // Horizontal scroll progress bar
    ScrollTrigger.create({
      trigger: "body",
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        const bar = document.querySelector(".scroll-progress") as HTMLElement;
        if (bar) {
          bar.style.transform = `scaleX(${self.progress})`;
        }
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div
      className="min-h-screen bg-[#0a0a0f] overflow-x-hidden"
      style={{ fontFamily: "Inter, sans-serif" }}
    >
      {/* Scroll progress bar */}
      <div className="fixed top-0 left-0 right-0 h-[2px] z-[60]">
        <div
          className="scroll-progress h-full bg-gradient-to-r from-[#8b5cf6] via-[#06b6d4] to-[#ec4899] origin-left"
          style={{ transform: "scaleX(0)" }}
        />
      </div>

      {/* Cursor glow effect (desktop only) */}
      <div
        className="fixed w-[300px] h-[300px] rounded-full pointer-events-none z-[5] hidden lg:block"
        id="cursor-glow"
        style={{
          background: "radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 70%)",
          transform: "translate(-50%, -50%)",
          left: "50%",
          top: "50%",
          transition: "left 0.3s ease-out, top 0.3s ease-out",
        }}
      />

      <Navbar />
      <HeroSection />
      <WorkSection />
      <AboutSection />
      <SkillsSection />
      <ContactSection />
      <Footer />

      {/* Cursor glow script */}
      <CursorGlow />
    </div>
  );
}

function CursorGlow() {
  useEffect(() => {
    const glow = document.getElementById("cursor-glow");
    if (!glow) return;

    const handleMouseMove = (e: MouseEvent) => {
      glow.style.left = e.clientX + "px";
      glow.style.top = e.clientY + "px";
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return null;
}