import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ArrowRight, User, Code2, Briefcase, Layers, Mail, Sparkles } from "lucide-react";
import GlassSurface from "@/component/GlassSurface";

const commands = [
  { id: "about", label: "About Me", icon: User, section: "#about", category: "Navigate" },
  { id: "skills", label: "Skills & Technologies", icon: Code2, section: "#skills", category: "Navigate" },
  { id: "experience", label: "Work Experience", icon: Briefcase, section: "#experience", category: "Navigate" },
  { id: "projects", label: "Projects", icon: Layers, section: "#projects", category: "Navigate" },
  { id: "contact", label: "Contact", icon: Mail, section: "#contact", category: "Navigate" },
  { id: "github", label: "Open GitHub", icon: ArrowRight, section: "https://github.com/siddnlw", category: "Links", external: true },
  { id: "linkedin", label: "Open LinkedIn", icon: ArrowRight, section: "https://linkedin.com/in/siddharthnalwaya", category: "Links", external: true },
  { id: "resume", label: "Download Resume", icon: ArrowRight, section: "/assets/pdf/resume.pdf", category: "Actions", downloadable: true },
];

const CommandPalette = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);

  const filtered = commands.filter((c) =>
    c.label.toLowerCase().includes(query.toLowerCase()) ||
    c.category.toLowerCase().includes(query.toLowerCase())
  );

  const execute = useCallback((cmd: typeof commands[0]) => {
    setOpen(false);
    setQuery("");
    if (cmd.external) {
      window.open(cmd.section, "_blank");
    } else {
      document.querySelector(cmd.section)?.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((o) => !o);
        setQuery("");
        setSelected(0);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      document.querySelector(`[data-command-id="${filtered[selected]?.id}"]`)?.scrollIntoView({ behavior: "smooth" });
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelected((s) => Math.min(s + 1, filtered.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelected((s) => Math.max(s - 1, 0));
      } else if (e.key === "Enter" && filtered[selected]) {
        execute(filtered[selected]);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, selected, filtered, execute]);

  useEffect(() => setSelected(0), [query]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-start justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
        >
            <div
              className="absolute inset-0 bg-black/15 backdrop-blur-md overscroll-contain overflow-y-auto"
              onClick={() => setOpen(false)}
            />
          <GlassSurface
            displace={0.5}
            distortionScale={-180}
            redOffset={0}
            saturation={1}
            greenOffset={50}
            blueOffset={50}
            brightness={50}
            opacity={0.93}
            mixBlendMode="screen"
            borderRadius={20}
            className="mx-4 !w-[85dvw] sm:!w-[45dvw] flex flex-col  mt-[10vh]"
            // width={"45dvw"}
            height={"50dvh"}
            
          >
            <motion.div
              className="relative !w-full h-[50dvh] mx-4 rounded-2xl "
              initial={{ scale: 0.95, opacity: 0, y: -10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: -10 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Search input */}
              <div className="flex items-center gap-3 px-5 py-4 border-b border-border/50">
                <Search className="w-4 h-4 text-white shrink-0" />
                <input
                  autoFocus
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Type a command or search..."
                  className="flex-1 bg-transparent text-sm text-foreground placeholder:text-white outline-none"
                />
                <kbd className="hidden sm:inline-flex px-2 py-0.5 rounded bg-secondary text-[10px] text-white font-mono">
                  ESC
                </kbd>
              </div>

              {/* Results */}
              <div className="max-h-[38dvh] p-2 scrollbar-none [&::-webkit-scrollbar]:hidden overflow-y-auto overscroll-contain">
                {filtered.length === 0 && (
                  <div className="text-sm text-white text-center py-8">
                    No results found.
                  </div>
                )}
                {(() => {
                  let lastCategory = "";
                  return filtered.map((cmd, i) => {
                    const showCategory = cmd.category !== lastCategory;
                    lastCategory = cmd.category;
                    return (
                      <div key={cmd.id} data-command-id={cmd.id}>
                        {showCategory && (
                          <div className="text-[10px] uppercase tracking-widest text-white/60 font-mono px-3 pt-3 pb-1">
                            {cmd.category}
                          </div>
                        )}
                        {cmd.downloadable ? (
                          <a
                            href={cmd.section}
                            download="Siddharth_Nalwaya_Resume.pdf"
                            className={`w-full cursor-target flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors duration-100 ${
                              selected === i
                                ? "bg-primary/10 text-lime-500"
                                : "text-white hover:text-foreground [text-shadow:_0px_0px_1px_rgba(0,0,0,1)]"
                            }`}
                          >
                            <cmd.icon className="w-4 h-4 shrink-0" />
                            <span className="flex-1 text-left">{cmd.label}</span>
                          </a>
                        ) : (
                          <button
                          onClick={() => execute(cmd)}
                          onMouseEnter={() => setSelected(i)}
                          className={`w-full cursor-target flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors duration-100 ${
                            selected === i
                              ? "bg-primary/10 text-lime-500"
                              : "text-white hover:text-foreground [text-shadow:_0px_0px_1px_rgba(0,0,0,1)]"
                          }`}
                        >
                          <cmd.icon className="w-4 h-4 shrink-0" />
                          <span className="flex-1 text-left">{cmd.label}</span>
                          {selected === i && (
                            <motion.span
                              initial={{ opacity: 0, x: -4 }}
                              animate={{ opacity: 1, x: 0 }}
                              className="text-primary"
                            >
                              <ArrowRight className="w-3 h-3" />
                            </motion.span>
                          )}
                        </button>
                        )}
                      </div>
                    );
                  });
                })()}
              </div>

              {/* Footer hint */}
              <div className="absolute w-full bottom-0 flex items-center justify-between px-4 py-2.5 border-t border-border/50 text-[10px] text-white/50 font-mono">
                <span>↑↓ navigate</span>
                <span>↵ select</span>
                <span>esc close</span>
              </div>
            </motion.div>
          </GlassSurface>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CommandPalette;
