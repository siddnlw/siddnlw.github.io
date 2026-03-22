import { motion } from "framer-motion";
import { useState } from "react";

const codeLines = [
  { indent: 0, content: "const ", highlight: "siddharth", rest: " = {" },
  { indent: 1, content: "role: ", value: "'Frontend Developer'" },
  { indent: 1, content: "experience: ", value: "'4+ years'" },
  { indent: 1, content: "location: ", value: "'Bangalore, India'" },
  { indent: 1, content: "skills: ", value: "[" },
  { indent: 2, content: "", value: "'React', 'Next.js', 'TypeScript'," },
  { indent: 2, content: "", value: "'Tailwind CSS', 'React Native'," },
  { indent: 1, content: "", value: "]," },
  { indent: 1, content: "impact: ", value: "{" },
  { indent: 2, content: "dispatchTimeReduction: ", value: "'70%'" },
  { indent: 2, content: "companiesWorked: ", value: "4" },
  { indent: 2, content: "projectsShipped: ", value: "'10+'" },
  { indent: 1, content: "", value: "}," },
  { indent: 1, content: "passions: ", value: "[" },
  { indent: 2, content: "", value: "'Performance', 'UI/UX', 'Clean Code'" },
  { indent: 1, content: "", value: "]," },
  { indent: 0, content: "}", rest: ";" },
];

const InteractiveSection = () => {
  const [hoveredLine, setHoveredLine] = useState<number | null>(null);

  return (
    <section id="interactive" className="section-padding">
      <div className="container-tight">
        <motion.div
          initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-sm font-mono text-primary mb-3 tracking-wider uppercase">Profile</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-10 text-balance">
            In <span className="gradient-text">code</span>
          </h2>
        </motion.div>

        <motion.div
          className="glass rounded-2xl overflow-hidden max-w-2xl"
          initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Editor header */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-border/50">
            <div className="w-3 h-3 rounded-full bg-destructive/60" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
            <div className="w-3 h-3 rounded-full bg-primary/60" />
            <span className="text-xs text-muted-foreground ml-2 font-mono">profile.ts</span>
          </div>

          {/* Code body */}
          <div className="p-5 font-mono text-sm leading-7 overflow-x-auto">
            {codeLines.map((line, i) => (
              <motion.div
                key={i}
                className={`flex transition-colors duration-150 rounded px-2 -mx-2 cursor-default ${
                  hoveredLine === i ? "bg-primary/5" : ""
                }`}
                onMouseEnter={() => setHoveredLine(i)}
                onMouseLeave={() => setHoveredLine(null)}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.03 * i }}
              >
                <span className="text-muted-foreground/40 select-none w-8 shrink-0 text-right mr-4">{i + 1}</span>
                <span style={{ paddingLeft: `${line.indent * 1.5}rem` }}>
                  <span className="text-muted-foreground">{line.content}</span>
                  {line.highlight && <span className="text-primary">{line.highlight}</span>}
                  {line.value && <span className="text-[hsl(var(--glow-secondary))]">{line.value}</span>}
                  {line.rest && <span className="text-muted-foreground">{line.rest}</span>}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default InteractiveSection;
