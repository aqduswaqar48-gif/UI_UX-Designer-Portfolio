import { Mail, MapPin, Send, ArrowUpRight, Check, Loader2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function ContactSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    project: "",
    message: "",
  });
  const [submitStatus, setSubmitStatus] = useState<"idle" | "sending" | "sent">("idle");

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".contact-heading-item",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".contact-heading",
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );

      gsap.fromTo(
        ".contact-form",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".contact-form",
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setSubmitStatus("sending");

    const subject = encodeURIComponent(
      `New Project Inquiry – ${formData.project || "General"} | from ${formData.name}`
    );
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\nProject Type: ${formData.project || "Not specified"}\n\nMessage:\n${formData.message}`
    );

    window.open(
      `https://mail.google.com/mail/?view=cm&to=aqduswaqar48@gmail.com&su=${subject}&body=${body}`,
      "_blank"
    );

    setSubmitStatus("sent");
    setFormData({ name: "", email: "", project: "", message: "" });
    setTimeout(() => setSubmitStatus("idle"), 3000);
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-32 bg-[#0a0a0f]"
    >
      {/* Purple glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#8b5cf6]/5 rounded-full blur-[120px]" />

      <div className="relative max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Left */}
          <div>
            <div className="contact-heading">
              <span
                className="contact-heading-item block text-[#8b5cf6] mb-4"
                style={{ fontFamily: "Inter, sans-serif", fontSize: "0.875rem", fontWeight: 500, letterSpacing: "0.15em" }}
              >
                GET IN TOUCH
              </span>
              <h2
                className="contact-heading-item text-white mb-6"
                style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 700, lineHeight: 1.1 }}
              >
                Let's create
                <br />
                something{" "}
                <span className="bg-gradient-to-r from-[#8b5cf6] to-[#06b6d4] bg-clip-text text-transparent">
                  amazing
                </span>
              </h2>
              <p
                className="contact-heading-item text-[#71717a] max-w-md"
                style={{ fontFamily: "Inter, sans-serif", fontSize: "1rem", fontWeight: 400, lineHeight: 1.8 }}
              >
                Have a project in mind? I'd love to hear about it. Let's
                discuss how we can work together to bring your vision to
                life.
              </p>
            </div>

            <div className="contact-info mt-12 space-y-6">
              <div
                onClick={() => window.open("https://mail.google.com/mail/?view=cm&to=Aqduswaqar48@gmail.com", "_blank")}
                className="contact-info-item flex items-center gap-4 p-4 bg-[#111118] rounded-xl border border-white/5 hover:border-[#8b5cf6]/30 transition-all duration-300 group cursor-pointer"
              >
                <div className="w-12 h-12 rounded-xl bg-[#8b5cf6]/10 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-[#8b5cf6]" />
                </div>
                <div className="min-w-0">
                  <div
                    className="text-[#71717a]"
                    style={{ fontFamily: "Inter, sans-serif", fontSize: "0.75rem", fontWeight: 400 }}
                  >
                    Email
                  </div>
                  <div
                    className="text-white group-hover:text-[#8b5cf6] transition-colors break-all"
                    style={{ fontFamily: "Inter, sans-serif", fontSize: "0.9375rem", fontWeight: 500 }}
                  >
                    Aqduswaqar48@gmail.com
                  </div>
                </div>
              </div>

              <div className="contact-info-item flex items-center gap-4 p-4 bg-[#111118] rounded-xl border border-white/5">
                <div className="w-12 h-12 rounded-xl bg-[#06b6d4]/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-[#06b6d4]" />
                </div>
                <div>
                  <div
                    className="text-[#71717a]"
                    style={{ fontFamily: "Inter, sans-serif", fontSize: "0.75rem", fontWeight: 400 }}
                  >
                    Location
                  </div>
                  <div
                    className="text-white"
                    style={{ fontFamily: "Inter, sans-serif", fontSize: "0.9375rem", fontWeight: 500 }}
                  >
                    Delhi, India
                  </div>
                </div>
              </div>

              {/* Social links */}
              <div className="contact-info-item flex gap-3 pt-4">
                {[
                  { name: "Behance", url: "https://www.behance.net/aqduswaqar1" },
                  { name: "LinkedIn", url: "https://www.linkedin.com/in/aqdaswaqar" },
                ].map(
                  (social) => (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-[#111118] border border-white/5 rounded-full text-[#a1a1aa] hover:text-white hover:border-[#8b5cf6]/30 transition-all duration-300 flex items-center gap-1.5"
                      style={{ fontFamily: "Inter, sans-serif", fontSize: "0.8125rem", fontWeight: 400 }}
                    >
                      {social.name}
                      <ArrowUpRight className="w-3 h-3" />
                    </a>
                  )
                )}
              </div>
            </div>
          </div>

          {/* Right - Form */}
          <form
            onSubmit={handleSubmit}
            className="contact-form space-y-6 p-8 md:p-10 bg-[#111118] rounded-2xl border border-white/5"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label
                  className="block text-[#a1a1aa] mb-2"
                  style={{ fontFamily: "Inter, sans-serif", fontSize: "0.8125rem", fontWeight: 400 }}
                >
                  Your Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="John Doe"
                  className="w-full px-4 py-3 bg-[#0a0a0f] border border-white/10 rounded-xl text-white placeholder-[#3f3f46] focus:outline-none focus:border-[#8b5cf6]/50 transition-colors"
                  style={{ fontFamily: "Inter, sans-serif", fontSize: "0.9375rem", fontWeight: 400 }}
                />
              </div>
              <div>
                <label
                  className="block text-[#a1a1aa] mb-2"
                  style={{ fontFamily: "Inter, sans-serif", fontSize: "0.8125rem", fontWeight: 400 }}
                >
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="john@example.com"
                  className="w-full px-4 py-3 bg-[#0a0a0f] border border-white/10 rounded-xl text-white placeholder-[#3f3f46] focus:outline-none focus:border-[#8b5cf6]/50 transition-colors"
                  style={{ fontFamily: "Inter, sans-serif", fontSize: "0.9375rem", fontWeight: 400 }}
                />
              </div>
            </div>

            <div>
              <label
                className="block text-[#a1a1aa] mb-2"
                style={{ fontFamily: "Inter, sans-serif", fontSize: "0.8125rem", fontWeight: 400 }}
              >
                Project Type
              </label>
              <select
                value={formData.project}
                onChange={(e) =>
                  setFormData({ ...formData, project: e.target.value })
                }
                className="w-full px-4 py-3 bg-[#0a0a0f] border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#8b5cf6]/50 transition-colors appearance-none"
                style={{ fontFamily: "Inter, sans-serif", fontSize: "0.9375rem", fontWeight: 400 }}
              >
                <option value="" className="bg-[#0a0a0f]">
                  Select a project type
                </option>
                <option value="ui-design" className="bg-[#0a0a0f]">
                  UI/UX Design
                </option>
                <option value="mobile" className="bg-[#0a0a0f]">
                  Mobile App Design
                </option>
                <option value="web" className="bg-[#0a0a0f]">
                  Website Design
                </option>
                <option value="design-system" className="bg-[#0a0a0f]">
                  Design System
                </option>
                <option value="brand" className="bg-[#0a0a0f]">
                  Brand Identity
                </option>
                <option value="other" className="bg-[#0a0a0f]">
                  Other
                </option>
              </select>
            </div>

            <div>
              <label
                className="block text-[#a1a1aa] mb-2"
                style={{ fontFamily: "Inter, sans-serif", fontSize: "0.8125rem", fontWeight: 400 }}
              >
                Message
              </label>
              <textarea
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                placeholder="Tell me about your project..."
                rows={5}
                className="w-full px-4 py-3 bg-[#0a0a0f] border border-white/10 rounded-xl text-white placeholder-[#3f3f46] focus:outline-none focus:border-[#8b5cf6]/50 transition-colors resize-none"
                style={{ fontFamily: "Inter, sans-serif", fontSize: "0.9375rem", fontWeight: 400 }}
              />
            </div>

            <button
              type="submit"
              disabled={submitStatus !== "idle"}
              className={`w-full py-4 text-white rounded-xl transition-all duration-300 flex items-center justify-center gap-2 ${
                submitStatus === "sent"
                  ? "bg-green-600 hover:bg-green-600"
                  : "bg-[#8b5cf6] hover:bg-[#7c3aed] hover:shadow-[0_0_40px_rgba(139,92,246,0.3)]"
              } disabled:opacity-70`}
              style={{ fontFamily: "Inter, sans-serif", fontSize: "1rem", fontWeight: 500 }}
            >
              {submitStatus === "sending" ? (
                <>
                  Opening Gmail...
                  <Loader2 className="w-4 h-4 animate-spin" />
                </>
              ) : submitStatus === "sent" ? (
                <>
                  Gmail Opened!
                  <Check className="w-4 h-4" />
                </>
              ) : (
                <>
                  Send Message
                  <Send className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}