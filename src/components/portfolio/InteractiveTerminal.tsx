import { motion } from "framer-motion";
import { useState, useRef, useEffect, useCallback } from "react";

const commandMap: Record<string, string | string[]> = {
  help: [
    "Available commands:",
    "  about       → Who is Siddharth?",
    "  skills      → Tech stack",
    "  experience  → Work history",
    "  contact     → Get in touch",
    "  projects    → Featured work",
    "  joke        → A dev joke",
    "  clear       → Clear terminal",
    "  sudo hire   → 🤫",
  ],
  about:
    "Frontend Developer with 4+ years of experience. Based in Bangalore, India. Passionate about building high-performance interfaces with React, Next.js & TypeScript.",
  skills: [
    "Frontend:  React · Next.js · TypeScript · Tailwind · Vite · React Native",
    "Backend:   Node.js · Golang · PHP/Laravel · PostgreSQL",
    "Tools:     Git · Figma · PubNub · WebSocket · REST APIs",
  ],
  experience: [
    "RED.Health       → Frontend Developer (2023–Present)",
    "  ↳ Built ambulance dispatch system, 70% faster dispatch times",
    "RevDau (ABG)     → Frontend Developer (2023–2024)",
    "  ↳ Real-time data viz, cloud architecture builder",
    "nDimensions      → Full Stack Developer (2022–2023)",
    "  ↳ Political analytics, Shopify projects",
    "Razorpay         → Software Engineer (2021–2022)",
    "  ↳ Payment integrations, bank simulators",
  ],
  contact: [
    "Email:    siddharthnalwaya75@gmail.com",
    "GitHub:   github.com/siddnlw",
    "LinkedIn: linkedin.com/in/siddharthnalwaya",
    "Phone:    +91-9571305075",
  ],
  projects: [
    "1. Ambulance Dispatch System  → 70% faster dispatch (React, Next.js, PubNub)",
    "2. Cloud Architecture Builder → Drag-and-drop AWS/Azure (ReactFlow)",
    "3. Political Analytics Dashboard → Advanced filtering & data viz",
    "4. Shield Helvetia → Brand website (HTML/CSS/JS)",
    "5. Sales Dashboard → Interactive charts & tables (React)",
  ],
  joke: "Why do programmers prefer dark mode? Because light attracts bugs. 🪲",
  "sudo hire": [
    "🎉 ACCESS GRANTED",
    "",
    "Congratulations! You've unlocked the secret hiring protocol.",
    "Siddharth is ready to bring 70% performance improvements to your team.",
    "",
    "→ Email: siddharthnalwaya75@gmail.com",
    "→ Available for: Full-time | Contract | Freelance",
  ],
};

type Line = { type: "input" | "output" | "system"; content: string };

const InteractiveTerminal = () => {
  const [lines, setLines] = useState<Line[]>([
    { type: "system", content: "Welcome to siddharth.dev — Type 'help' to get started." },
  ]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = useCallback(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(scrollToBottom, [lines, scrollToBottom]);

  const processCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    setLines((prev) => [...prev, { type: "input", content: cmd }]);
    setHistory((prev) => [...prev, cmd]);
    setHistoryIdx(-1);
    setInput("");

    if (trimmed === "clear") {
      setLines([{ type: "system", content: "Terminal cleared. Type 'help' for commands." }]);
      return;
    }

    const result = commandMap[trimmed];
    if (result) {
      const outputLines = Array.isArray(result) ? result : [result];
      // Stagger output lines
      outputLines.forEach((line, i) => {
        setTimeout(() => {
          setLines((prev) => [...prev, { type: "output", content: line }]);
        }, 40 * i);
      });
    } else {
      setTimeout(() => {
        setLines((prev) => [
          ...prev,
          { type: "output", content: `Command not found: '${trimmed}'. Type 'help' for available commands.` },
        ]);
      }, 40);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      processCommand(input);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length > 0) {
        const newIdx = historyIdx < history.length - 1 ? historyIdx + 1 : historyIdx;
        setHistoryIdx(newIdx);
        setInput(history[history.length - 1 - newIdx]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIdx > 0) {
        const newIdx = historyIdx - 1;
        setHistoryIdx(newIdx);
        setInput(history[history.length - 1 - newIdx]);
      } else {
        setHistoryIdx(-1);
        setInput("");
      }
    }
  };

  return (
    <section id="interactive" className="section-padding">
      <div className="container-tight">
        <motion.div
          initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-sm font-mono text-primary mb-3 tracking-wider uppercase">Interactive</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
            Explore via <span className="gradient-text">terminal</span>
          </h2>
          <p className="text-muted-foreground text-sm mb-10 max-w-md">
            Type commands to learn more about me. Try <code className="px-1.5 py-0.5 rounded bg-secondary text-primary font-mono text-xs">help</code> to
            see what's available.
          </p>
        </motion.div>

        <motion.div
          className="glass rounded-2xl overflow-hidden max-w-2xl"
          initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Terminal header */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-border/50">
            <div className="w-3 h-3 rounded-full bg-destructive/60" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
            <div className="w-3 h-3 rounded-full bg-primary/60" />
            <span className="text-xs text-muted-foreground ml-2 font-mono">siddharth@portfolio ~ %</span>
          </div>

          {/* Terminal body */}
          <div
            className="p-4 font-mono text-sm h-[340px] overflow-y-auto cursor-text"
            onClick={() => inputRef.current?.focus()}
          >
            {lines.map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.15 }}
                className={`leading-6 ${
                  line.type === "input"
                    ? "text-primary"
                    : line.type === "system"
                    ? "text-[hsl(var(--glow-secondary))]"
                    : "text-muted-foreground"
                }`}
              >
                {line.type === "input" && <span className="text-primary/60">❯ </span>}
                {line.content}
              </motion.div>
            ))}

            {/* Input line */}
            <div className="flex items-center gap-0 mt-1">
              <span className="text-primary/60">❯ </span>
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent text-foreground outline-none caret-primary"
                autoComplete="off"
                spellCheck={false}
              />
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
                className="w-2 h-4 bg-primary/80 ml-0.5"
              />
            </div>
            <div ref={endRef} />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default InteractiveTerminal;
