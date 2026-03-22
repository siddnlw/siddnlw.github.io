import { motion } from "framer-motion";
import { useState } from "react";

type Category = "Frontend" | "Backend" | "Tools";

const skills: Record<Category, { name: string; level: number }[]> = {
  Frontend: [
    { name: "React.js", level: 95 },
    { name: "Next.js", level: 90 },
    { name: "TypeScript", level: 88 },
    { name: "JavaScript", level: 95 },
    { name: "Tailwind CSS", level: 92 },
    { name: "React Native", level: 75 },
    { name: "Vite", level: 85 },
  ],
  Backend: [
    { name: "Node.js", level: 70 },
    { name: "PHP / Laravel", level: 65 },
    { name: "Golang", level: 55 },
    { name: "PostgreSQL", level: 68 },
    { name: "MySQL", level: 65 },
  ],
  Tools: [
    { name: "Git", level: 90 },
    { name: "REST APIs", level: 92 },
    { name: "Figma", level: 78 },
    { name: "Shopify", level: 72 },
    { name: "PubNub", level: 75 },
    { name: "WebSocket", level: 80 },
  ],
};

const categories: Category[] = ["Frontend", "Backend", "Tools"];

const SkillsSection = () => {
  const [active, setActive] = useState<Category>("Frontend");

  return (
    <section id="skills" className="section-padding">
      <div className="container-tight">
        <motion.div
          initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-sm font-mono text-primary mb-3 tracking-wider uppercase">Skills</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-10 text-balance">
            Technologies I <span className="gradient-text">work with</span>
          </h2>
        </motion.div>

        {/* Category tabs */}
        <motion.div
          className="flex gap-2 mb-10"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 active:scale-[0.96] ${
                active === cat
                  ? "bg-primary text-primary-foreground shadow-[0_0_20px_-5px_hsl(var(--primary)/0.4)]"
                  : "glass text-muted-foreground hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Skills grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {skills[active].map((skill, i) => (
            <motion.div
              key={skill.name}
              className="glass-hover rounded-xl p-5 group"
              initial={{ opacity: 0, x: -16, filter: "blur(4px)" }}
              whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: 0.06 * i, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex justify-between items-center mb-3">
                <span className="font-medium">{skill.name}</span>
                <span className="text-sm text-muted-foreground font-mono">{skill.level}%</span>
              </div>
              <div className="skill-bar">
                <motion.div
                  className="skill-bar-fill"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.1 * i, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
