import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ThreeBackground } from "./ThreeBackground";
import { ArrowDown } from "lucide-react";

export function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.3 });

    tl.from(badgeRef.current, {
      y: 20,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
    })
      .from(
        titleRef.current?.querySelectorAll(".hero-line") || [],
        {
          y: 100,
          opacity: 0,
          duration: 1,
          stagger: 0.15,
          ease: "power4.out",
        },
        "-=0.4"
      )
      .from(
        subtitleRef.current,
        {
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.5"
      )
      .from(
        ctaRef.current,
        {
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.4"
      );
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0a0a0f]"
    >
      {/* Gradient overlays */}
      <ThreeBackground />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-transparent to-[#0a0a0f] z-[1]" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0f]/50 via-transparent to-[#0a0a0f]/50 z-[1]" />

      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <div
          ref={badgeRef}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#8b5cf6]/30 bg-[#8b5cf6]/10 mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-[#06d6a0] animate-pulse" />
          <span
            className="text-[#a1a1aa]"
            style={{ fontFamily: "Inter, sans-serif", fontSize: "0.8125rem", fontWeight: 400 }}
          >
            Available for freelance work
          </span>
        </div>

        <h1
          ref={titleRef}
          className="text-white mb-6"
          style={{ fontFamily: "Space Grotesk, sans-serif" }}
        >
          <span className="hero-line block" style={{ fontSize: "clamp(2.5rem, 7vw, 5.5rem)", fontWeight: 700, lineHeight: 1.05 }}>
            Designing Experiences
          </span>
          <span className="hero-line block" style={{ fontSize: "clamp(2.5rem, 7vw, 5.5rem)", fontWeight: 700, lineHeight: 1.05 }}>
            That Users Actually
          </span>
          <span
            className="hero-line block bg-gradient-to-r from-[#8b5cf6] via-[#06b6d4] to-[#ec4899] bg-clip-text text-transparent"
            style={{ fontSize: "clamp(2.5rem, 7vw, 5.5rem)", fontWeight: 700, lineHeight: 1.05 }}
          >
            Love
          </span>
        </h1>

        <p
          ref={subtitleRef}
          className="text-[#71717a] max-w-2xl mx-auto mb-10"
          style={{ fontFamily: "Inter, sans-serif", fontSize: "clamp(1rem, 2vw, 1.25rem)", fontWeight: 400, lineHeight: 1.7 }}
        >
          Specialized in mobile apps, wireframing, prototyping, and usability improvement.
        </p>

        <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 items-center justify-center">
          <a
            href="#work"
            className="group px-8 py-4 bg-[#8b5cf6] text-white rounded-full hover:bg-[#7c3aed] transition-all duration-300 hover:shadow-[0_0_40px_rgba(139,92,246,0.4)] flex items-center gap-2"
            style={{ fontFamily: "Inter, sans-serif", fontSize: "1rem", fontWeight: 500 }}
          >
            View My Work
            <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
          </a>
          <a
            href="#about"
            className="px-8 py-4 border border-white/10 text-white rounded-full hover:bg-white/5 transition-all duration-300"
            style={{ fontFamily: "Inter, sans-serif", fontSize: "1rem", fontWeight: 500 }}
          >
            About Me
          </a>
        </div>

        {/* Stats */}
        <div className="mt-20 flex flex-wrap items-center justify-center gap-12 md:gap-20">
          {[
            { value: "20+", label: "Projects Delivered" },
            { value: "3+", label: "Years Experience" },
            { value: "5+", label: "Case Study" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div
                className="text-white"
                style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "2.5rem", fontWeight: 700 }}
              >
                {stat.value}
              </div>
              <div
                className="text-[#71717a] mt-1"
                style={{ fontFamily: "Inter, sans-serif", fontSize: "0.8125rem", fontWeight: 400 }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3">
        <span
          className="text-[#71717a]"
          style={{ fontFamily: "Inter, sans-serif", fontSize: "0.75rem", fontWeight: 400, letterSpacing: "0.15em" }}
        >
          SCROLL
        </span>
        <div className="w-[1px] h-10 bg-gradient-to-b from-[#8b5cf6] to-transparent" />
      </div>
    </section>
  );
}