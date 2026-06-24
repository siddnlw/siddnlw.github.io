import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import GlassSurface from "@/component/GlassSurface";

const links = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      // Track active section
      const sections = links.map((l) => l.href.slice(1));
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top < 200) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="sticky !w-[95dvw] mx-auto  top-4 -mt-[4.5rem] z-50 transition-all duration-300">
    <GlassSurface
      displace={0.5}
      distortionScale={-180}
      brightness={500}
      opacity={.73}
      mixBlendMode="screen"
      borderRadius={20}
      className="!w-full"
      height={70}
    >
      {/* <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "glass py-3" : "py-5"
        }`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      > */}
        <div className="container-tight flex items-center justify-between px-4 w-full">
          <a href="#hero" className={"text-lg [text-shadow:_0px_0px_1px_rgba(0,0,0,1)] font-bold tracking-tight transition-colors duration-[5000ms] " + (scrolled ? "text-white" : "text-white")}>
            S<span className="text-green-600">.</span>N
          </a>

          {/* Desktop */}
          <nav className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className={`text-sm transition-all duration-200 relative cursor-target px-3 py-1 ${
                  activeSection === l.href.slice(1)
                    ? "text-green-600"
                    : (scrolled ? "text-white" : "text-white") +" hover:text-foreground [text-shadow:_0px_0px_1px_rgba(0,0,0,1)]"
                }`}
              >
                {l.label}
                {activeSection === l.href.slice(1) && (
                  <motion.span
                    layoutId="nav-indicator"
                    className="absolute -bottom-1 left-0 right-0 h-px bg-primary"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            ))}
          </nav>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-foreground active:scale-95"
            onClick={() => setOpen(!open)}
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile menu */}
      {/* </motion.header> */}
    </GlassSurface>
        {open && (
          <motion.nav
            className="md:hidden glass mt-2 mx-4 rounded-xl p-4 flex flex-col gap-3 "
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors py-1"
              >
                {l.label}
              </a>
            ))}
          </motion.nav>
        )}
    </div>

  );
};

export default Navbar;
