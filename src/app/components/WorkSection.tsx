import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import logisticDashboard from "figma:asset/bf1293b5542762f58824cb4c26224fc0c7b0a8e5.png";
import berkowitsMockup from "figma:asset/b5631628fa5d0b67639659bb96233704443d1ca6.png";
import happyShopping from "figma:asset/da10233d248e920459360c931302786393d2887c.png";
import openFashionMockup from "figma:asset/67da9db4a6fe2d82cf6fff5992b64f656529a353.png";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    title: "Logistic Dashboard",
    category: "SaaS Website",
    description:
      "An end-to-end logistics SaaS dashboard built to simplify fleet, order, and tracking workflows through a clean and user-friendly interface.",
    image: logisticDashboard,
    tags: ["Figma", "Prototyping", "Design System"],
    color: "#8b5cf6",
    url: "https://www.behance.net/gallery/242026761/Logestic-dashboard",
  },
  {
    id: 2,
    title: "AI Hair Assessment",
    category: "Hair Test flow",
    description:
      "A guided assessment flow that takes users through step-by-step questions to generate personalized recommendations. It simplifies decision-making and improves engagement with a clear, easy experience.",
    image: berkowitsMockup,
    tags: ["Mobile", "iOS", "User Research"],
    color: "#166534",
    url: "",
  },
  {
    id: 3,
    title: "E-Commerce Reimagined",
    category: "Web Design",
    description:
      "An end-to-end e-commerce experience covering user research, wireframes, UI design, and interactive prototyping. The flow optimizes product discovery, checkout, and usability to improve conversions.",
    image: happyShopping,
    tags: ["Shopify", "Web", "A/B Testing"],
    color: "#ec4899",
    url: "",
  },
  {
    id: 4,
    title: "Mobile App",
    category: "UI/UX Design",
    description:
      "An Open Fashion mobile app offers a minimal, user-friendly interface for exploring apparel and completing purchases quickly. It prioritizes clear navigation and a seamless shopping experience.",
    image: openFashionMockup,
    tags: ["Branding", "Webflow", "Motion"],
    color: "#f59e0b",
    url: "",
  },
];

export function WorkSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.from(
        headingRef.current?.querySelectorAll(
          ".work-heading-item",
        ) || [],
        {
          y: 60,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        },
      );

      // Project cards stagger animation
      const cards =
        sectionRef.current?.querySelectorAll(".project-card") ||
        [];
      cards.forEach((card, i) => {
        gsap.from(card, {
          y: 100,
          opacity: 0,
          duration: 0.9,
          delay: i * 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="work"
      ref={sectionRef}
      className="relative py-32 bg-[#0a0a0f]"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div ref={headingRef} className="mb-20">
          <span
            className="work-heading-item block text-[#8b5cf6] mb-4"
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "0.875rem",
              fontWeight: 500,
              letterSpacing: "0.15em",
            }}
          >
            SELECTED WORK
          </span>
          <h2
            className="work-heading-item text-white max-w-xl"
            style={{
              fontFamily: "Space Grotesk, sans-serif",
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontWeight: 700,
              lineHeight: 1.1,
            }}
          >
            Projects that push boundaries
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              onClick={() => {
                if (project.url) {
                  window.open(
                    project.url,
                    "_blank",
                    "noopener,noreferrer",
                  );
                }
              }}
              className="project-card group relative bg-[#111118] rounded-2xl overflow-hidden border border-white/5 hover:border-white/10 transition-all duration-500 cursor-pointer"
            >
              <div className="relative overflow-hidden aspect-[16/10]">
                <ImageWithFallback
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111118] via-transparent to-transparent" />
                <div
                  className="absolute top-4 left-4 px-3 py-1 rounded-full"
                  style={{
                    backgroundColor: project.color + "20",
                    border: `1px solid ${project.color}40`,
                  }}
                >
                  <span
                    style={{
                      color: project.color,
                      fontFamily: "Inter, sans-serif",
                      fontSize: "0.75rem",
                      fontWeight: 500,
                    }}
                  >
                    {project.category}
                  </span>
                </div>
              </div>

              <div className="p-6 md:p-8">
                <div className="flex items-start justify-between mb-3">
                  <h3
                    className="text-white group-hover:text-[#8b5cf6] transition-colors duration-300"
                    style={{
                      fontFamily: "Space Grotesk, sans-serif",
                      fontSize: "1.5rem",
                      fontWeight: 600,
                    }}
                  >
                    {project.title}
                  </h3>
                  <ArrowUpRight className="w-5 h-5 text-[#71717a] group-hover:text-[#8b5cf6] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300 mt-1 flex-shrink-0" />
                </div>
                <p
                  className="text-[#71717a] mb-5"
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "0.875rem",
                    fontWeight: 400,
                    lineHeight: 1.7,
                  }}
                >
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-white/5 text-[#a1a1aa] rounded-full"
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: "0.75rem",
                        fontWeight: 400,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}