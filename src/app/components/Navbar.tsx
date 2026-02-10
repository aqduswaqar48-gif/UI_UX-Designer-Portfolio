import { useEffect, useState } from "react";

const navLinks = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#0a0a0f]/80 backdrop-blur-xl border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between h-20">
        <a
          href="#"
          className="text-white tracking-tight"
          style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "1.5rem", fontWeight: 700 }}
        >
          <span className="text-[#8b5cf6]">AW</span> Designer
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[#a1a1aa] hover:text-white transition-colors duration-300"
              style={{ fontFamily: "Inter, sans-serif", fontSize: "0.875rem", fontWeight: 400, letterSpacing: "0.05em" }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className="px-6 py-2.5 bg-[#8b5cf6] text-white rounded-full hover:bg-[#7c3aed] transition-all duration-300 hover:shadow-[0_0_30px_rgba(139,92,246,0.3)]"
            style={{ fontFamily: "Inter, sans-serif", fontSize: "0.875rem", fontWeight: 500 }}
          >
            Let's Talk
          </a>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 z-50"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span
            className={`w-6 h-0.5 bg-white transition-all duration-300 ${
              menuOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`w-6 h-0.5 bg-white transition-all duration-300 ${
              menuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`w-6 h-0.5 bg-white transition-all duration-300 ${
              menuOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="fixed inset-0 bg-[#0a0a0f]/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 md:hidden z-40">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-white transition-colors duration-300"
                style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "2rem", fontWeight: 500 }}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setMenuOpen(false)}
              className="px-8 py-3 bg-[#8b5cf6] text-white rounded-full"
              style={{ fontFamily: "Inter, sans-serif", fontSize: "1rem", fontWeight: 500 }}
            >
              Let's Talk
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}