import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Layers,
  Palette,
  PenTool,
  Monitor,
  Smartphone,
  Sparkles,
  Users,
  Zap,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const skills = [
  {
    icon: PenTool,
    title: "UI Design",
    description:
      "Creating visually stunning interfaces with meticulous attention to typography, color, and spacing.",
    color: "#8b5cf6",
  },
  {
    icon: Users,
    title: "UX Research",
    description:
      "Deep user research through interviews, surveys, and usability testing to inform design decisions.",
    color: "#06b6d4",
  },
  {
    icon: Layers,
    title: "Design Systems",
    description:
      "Building scalable component libraries and design tokens that ensure consistency across products.",
    color: "#ec4899",
  },
  {
    icon: Smartphone,
    title: "Mobile Design",
    description:
      "Crafting native iOS and Android experiences with platform-specific patterns and micro-interactions.",
    color: "#f59e0b",
  },
  {
    icon: Sparkles,
    title: "Interaction Design",
    description:
      "Designing meaningful animations and micro-interactions that bring interfaces to life.",
    color: "#06d6a0",
  },
  {
    icon: Monitor,
    title: "Web Design",
    description:
      "Responsive web designs optimized for performance, accessibility, and conversion.",
    color: "#f97316",
  },
  {
    icon: Palette,
    title: "Brand Identity",
    description:
      "Developing cohesive visual identities including logos, color systems, and brand guidelines.",
    color: "#14b8a6",
  },
  {
    icon: Zap,
    title: "Prototyping",
    description:
      "High-fidelity interactive prototypes that communicate design intent to stakeholders and developers.",
    color: "#a855f7",
  },
];

const processSteps = [
  { step: "01", title: "Discover", desc: "Research & Strategy" },
  { step: "02", title: "Define", desc: "Architecture & Wireframes" },
  { step: "03", title: "Design", desc: "Visual Design & Prototype" },
  { step: "04", title: "Deliver", desc: "Testing & Handoff" },
];

export function SkillsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section heading
      gsap.from(".skills-heading-item", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".skills-heading",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      // Skill cards
      const cards = sectionRef.current?.querySelectorAll(".skill-card") || [];
      cards.forEach((card, i) => {
        gsap.from(card, {
          y: 60,
          opacity: 0,
          scale: 0.95,
          duration: 0.7,
          delay: i * 0.05,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        });
      });

      // Process steps
      gsap.from(".process-step", {
        y: 40,
        opacity: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".process-container",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative py-32 bg-[#0a0a0f]"
    >
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 md:px-12">
        {/* Heading */}
        <div className="skills-heading mb-20">
          <span
            className="skills-heading-item block text-[#8b5cf6] mb-4"
            style={{ fontFamily: "Inter, sans-serif", fontSize: "0.875rem", fontWeight: 500, letterSpacing: "0.15em" }}
          >
            EXPERTISE
          </span>
          <h2
            className="skills-heading-item text-white max-w-xl"
            style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 700, lineHeight: 1.1 }}
          >
            What I bring to
            <br />
            <span className="text-[#71717a]">every project</span>
          </h2>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-32">
          {skills.map((skill) => {
            const Icon = skill.icon;
            return (
              <div
                key={skill.title}
                className="skill-card group p-6 bg-[#111118] rounded-2xl border border-white/5 hover:border-white/10 transition-all duration-500 hover:-translate-y-1"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110"
                  style={{
                    backgroundColor: skill.color + "15",
                    border: `1px solid ${skill.color}30`,
                  }}
                >
                  <Icon
                    className="w-5 h-5"
                    style={{ color: skill.color }}
                  />
                </div>
                <h3
                  className="text-white mb-2"
                  style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "1.125rem", fontWeight: 600 }}
                >
                  {skill.title}
                </h3>
                <p
                  className="text-[#71717a]"
                  style={{ fontFamily: "Inter, sans-serif", fontSize: "0.8125rem", fontWeight: 400, lineHeight: 1.7 }}
                >
                  {skill.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Process Section */}
        <div className="process-container">
          <div className="text-center mb-16">
            <span
              className="text-[#8b5cf6] block mb-4"
              style={{ fontFamily: "Inter, sans-serif", fontSize: "0.875rem", fontWeight: 500, letterSpacing: "0.15em" }}
            >
              MY PROCESS
            </span>
            <h2
              className="text-white"
              style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "clamp(1.75rem, 4vw, 2.5rem)", fontWeight: 700, lineHeight: 1.1 }}
            >
              From idea to impact
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, i) => (
              <div key={step.step} className="process-step relative">
                {i < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-[60%] w-[calc(100%-20%)] h-[1px] bg-gradient-to-r from-[#8b5cf6]/30 to-transparent" />
                )}
                <div
                  className="text-[#8b5cf6]/20 mb-4"
                  style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "3.5rem", fontWeight: 700 }}
                >
                  {step.step}
                </div>
                <h3
                  className="text-white mb-2"
                  style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "1.25rem", fontWeight: 600 }}
                >
                  {step.title}
                </h3>
                <p
                  className="text-[#71717a]"
                  style={{ fontFamily: "Inter, sans-serif", fontSize: "0.875rem", fontWeight: 400 }}
                >
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
