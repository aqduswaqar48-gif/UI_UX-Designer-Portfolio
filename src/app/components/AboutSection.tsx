import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import aboutPhoto from "figma:asset/b8e7e0027c8a2a0efdbe52180938920548650dd4.png";

gsap.registerPlugin(ScrollTrigger);

export function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image reveal
      gsap.from(".about-image-wrapper", {
        x: -80,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".about-image-wrapper",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      // Text content
      gsap.from(".about-text-item", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".about-text-content",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      // Marquee
      gsap.to(".marquee-track", {
        xPercent: -50,
        ease: "none",
        duration: 20,
        repeat: -1,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const tools = [
    "Figma",
    "Canva",
    "Affinity",
    "Photoshop",
    "Sketch",
    "Framer",
    "Miro",
    "Balsamiq",
    "Adobe XD",
    "Notion",
  ];

  return (
    <section id="about" ref={sectionRef} className="relative bg-[#0a0a0f]">
      {/* Marquee divider */}
      <div className="overflow-hidden py-8 border-y border-white/5">
        <div className="marquee-track flex gap-12 whitespace-nowrap" style={{ width: "max-content" }}>
          {[...tools, ...tools].map((tool, i) => (
            <span
              key={i}
              className="text-[#3f3f46] flex items-center gap-12"
              style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "1.25rem", fontWeight: 500 }}
            >
              {tool}
              <span className="w-2 h-2 rounded-full bg-[#8b5cf6]/40" />
            </span>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <div className="about-image-wrapper relative">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/5]">
              <ImageWithFallback
                src={aboutPhoto}
                alt="AW Designer - UI/UX Designer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f]/60 to-transparent" />
            </div>
            {/* Floating accent */}
            <div className="absolute -bottom-6 -right-6 w-40 h-40 bg-[#8b5cf6]/10 rounded-2xl border border-[#8b5cf6]/20 flex items-center justify-center backdrop-blur-sm">
              <div className="text-center">
                <div
                  className="text-[#8b5cf6]"
                  style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "2.5rem", fontWeight: 700 }}
                >
                  3+
                </div>
                <div
                  className="text-[#a1a1aa]"
                  style={{ fontFamily: "Inter, sans-serif", fontSize: "0.75rem", fontWeight: 400 }}
                >
                  Years of
                  <br />
                  Experience
                </div>
              </div>
            </div>
          </div>

          {/* Text Content */}
          <div className="about-text-content">
            <span
              className="about-text-item block text-[#8b5cf6] mb-4"
              style={{ fontFamily: "Inter, sans-serif", fontSize: "0.875rem", fontWeight: 500, letterSpacing: "0.15em" }}
            >
              ABOUT ME
            </span>
            <h2
              className="about-text-item text-white mb-6"
              style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, lineHeight: 1.1 }}
            >
              Designing with purpose,
              <br />
              <span className="text-[#71717a]">building with passion</span>
            </h2>
            <p
              className="about-text-item text-[#a1a1aa] mb-6"
              style={{ fontFamily: "Inter, sans-serif", fontSize: "1rem", fontWeight: 400, lineHeight: 1.8 }}
            >
              Hi, I'm Aqdas Waqar, a UI/UX Designer focused on creating simple,
              user-centered digital experiences. I have worked on end-to-end
              projects from research and wireframing to prototyping aiming to
              improve usability and business results.
            </p>
            <p
              className="about-text-item text-[#a1a1aa] mb-10"
              style={{ fontFamily: "Inter, sans-serif", fontSize: "1rem", fontWeight: 400, lineHeight: 1.8 }}
            >
              I have designed 200+ screens/pages across multiple mobile and web
              projects, ensuring consistency and usability at scale. I enjoy
              turning complex ideas into clean, intuitive interfaces that users
              can navigate with ease. My goal is to create designs that are both
              visually refined and functionally effective.
            </p>

            <div className="about-text-item grid grid-cols-2 gap-6 mb-10">
              {[
                { label: "Projects Completed", value: "20+" },
                { label: "Screens Designed", value: "200+" },
                { label: "End-to-End Case Studies", value: "5+" },
                { label: "Years Experience", value: "3+" },
              ].map((item) => (
                <div key={item.label} className="p-4 bg-[#111118] rounded-xl border border-white/5">
                  <div
                    className="text-white"
                    style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "1.5rem", fontWeight: 700 }}
                  >
                    {item.value}
                  </div>
                  <div
                    className="text-[#71717a] mt-1"
                    style={{ fontFamily: "Inter, sans-serif", fontSize: "0.8125rem", fontWeight: 400 }}
                  >
                    {item.label}
                  </div>
                </div>
              ))}
            </div>

            <a
              href="#contact"
              className="about-text-item inline-flex items-center gap-2 text-[#8b5cf6] hover:text-[#a78bfa] transition-colors duration-300"
              style={{ fontFamily: "Inter, sans-serif", fontSize: "1rem", fontWeight: 500 }}
            >
              Let's work together
              <span className="text-xl">&rarr;</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}