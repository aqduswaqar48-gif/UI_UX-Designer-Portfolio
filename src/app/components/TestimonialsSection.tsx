import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Star } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    id: 1,
    quote:
      "Alexis transformed our product from a clunky tool into an intuitive experience. Our user engagement increased by 300% after the redesign.",
    author: "Sarah Chen",
    role: "CEO, TechFlow",
    avatar: "SC",
    color: "#8b5cf6",
  },
  {
    id: 2,
    quote:
      "Working with Alexis was an absolute game-changer. The design system they built has saved our team hundreds of hours in development time.",
    author: "Marcus Johnson",
    role: "CTO, Scalr",
    avatar: "MJ",
    color: "#06b6d4",
  },
  {
    id: 3,
    quote:
      "The attention to detail and user-centric approach made all the difference. Our app store rating went from 3.2 to 4.8 stars.",
    author: "Emily Rodriguez",
    role: "Product Lead, Bloom",
    avatar: "ER",
    color: "#ec4899",
  },
];

export function TestimonialsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".testimonial-heading", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".testimonial-heading",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(".testimonial-card", {
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".testimonials-grid",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-32 bg-[#08080d]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="testimonial-heading text-center mb-16">
          <span
            className="block text-[#8b5cf6] mb-4"
            style={{ fontFamily: "Inter, sans-serif", fontSize: "0.875rem", fontWeight: 500, letterSpacing: "0.15em" }}
          >
            TESTIMONIALS
          </span>
          <h2
            className="text-white"
            style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 700, lineHeight: 1.1 }}
          >
            Kind words from
            <br />
            <span className="text-[#71717a]">amazing people</span>
          </h2>
        </div>

        <div className="testimonials-grid grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="testimonial-card p-8 bg-[#111118] rounded-2xl border border-white/5 hover:border-white/10 transition-all duration-500"
            >
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-[#f59e0b] text-[#f59e0b]"
                  />
                ))}
              </div>
              <p
                className="text-[#a1a1aa] mb-8"
                style={{ fontFamily: "Inter, sans-serif", fontSize: "0.9375rem", fontWeight: 400, lineHeight: 1.8 }}
              >
                "{t.quote}"
              </p>
              <div className="flex items-center gap-4">
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center"
                  style={{
                    backgroundColor: t.color + "20",
                    border: `1px solid ${t.color}40`,
                  }}
                >
                  <span
                    style={{
                      color: t.color,
                      fontFamily: "Inter, sans-serif",
                      fontSize: "0.75rem",
                      fontWeight: 600,
                    }}
                  >
                    {t.avatar}
                  </span>
                </div>
                <div>
                  <div
                    className="text-white"
                    style={{ fontFamily: "Inter, sans-serif", fontSize: "0.875rem", fontWeight: 500 }}
                  >
                    {t.author}
                  </div>
                  <div
                    className="text-[#71717a]"
                    style={{ fontFamily: "Inter, sans-serif", fontSize: "0.8125rem", fontWeight: 400 }}
                  >
                    {t.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
