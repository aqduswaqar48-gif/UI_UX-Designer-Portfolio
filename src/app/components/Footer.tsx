export function Footer() {
  return (
    <footer className="relative bg-[#08080d] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <a
            href="#"
            className="text-white tracking-tight"
            style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "1.5rem", fontWeight: 700 }}
          >
            <span className="text-[#8b5cf6]">AW</span> Designer.
          </a>

          <p
            className="text-[#3f3f46]"
            style={{ fontFamily: "Inter, sans-serif", fontSize: "0.8125rem", fontWeight: 400 }}
          >
            &copy; 2026 AW Designer. Designed with care.
          </p>

          <div className="flex gap-6">
            {[
              { name: "Behance", url: "https://www.behance.net/aqduswaqar1" },
              { name: "LinkedIn", url: "https://www.linkedin.com/in/aqdaswaqar" },
            ].map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#3f3f46] hover:text-[#a1a1aa] transition-colors duration-300"
                style={{ fontFamily: "Inter, sans-serif", fontSize: "0.8125rem", fontWeight: 400 }}
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}