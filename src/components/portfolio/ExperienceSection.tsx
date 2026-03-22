import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";

const experiences = [
  {
    company: "RED.Health",
    role: "Front-End Developer",
    period: "Feb 2024 – Present",
    location: "Bangalore",
    highlights: [
      "Built an Uber-like dispatch system for ambulances with auto/manual dispatch and keyboard-friendly UI — more advanced than 911 dispatch",
      "Reduced ambulance dispatch times by 70% (15 min → 2–5 min) through an optimized real-time system",
      "Implemented real-time updates using Next.js + PubNub for mission-critical operations",
    ],
    tech: ["React", "Next.js", "Vite", "React Native", "PubNub"],
  },
  {
    company: "RevDau (Aditya Birla Group)",
    role: "Front-End Developer",
    period: "Jul 2023 – Jan 2024",
    location: "Pune",
    highlights: [
      "Built graphical visualization of live data using WebSocket for real-time streaming",
      "Created cloud architecture UI builder with ReactFlow for AWS/Azure",
      "Designed intuitive drag-and-drop dashboards with Formkit, improving user engagement",
    ],
    tech: ["React", "Next.js", "Angular", "WebSocket"],
  },
  {
    company: "nDimensions",
    role: "Full Stack Developer",
    period: "Sep 2022 – Jun 2023",
    location: "Udaipur",
    highlights: [
      "Developed political analytics dashboard with advanced filtering and data visualizations",
      "Built and launched Shopify e-commerce projects for multiple clients",
    ],
    tech: ["React", "PHP", "Shopify", "JavaScript"],
  },
  {
    company: "Razorpay",
    role: "Software Engineer",
    period: "Jul 2021 – Mar 2022",
    location: "Bangalore (Remote)",
    highlights: [
      "Integrated multiple banking partners into India's leading payment platform",
      "Built bank platform simulator for faster development cycles",
      "Migrated legacy bank integrations to modern architecture",
    ],
    tech: ["Golang", "PHP", "Laravel"],
  },
];

const ExperienceSection = () => {
  return (
    <section id="experience" className="section-padding">
      <div className="container-tight">
        <motion.div
          initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-sm font-mono text-primary mb-3 tracking-wider uppercase">Experience</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-16 text-balance">
            Where I've <span className="gradient-text">made impact</span>
          </h2>
        </motion.div>

        <div className="relative">
          {experiences.map((exp, i) => (
            <motion.div
              key={exp.company}
              className="relative pl-12 pb-16 last:pb-0 group"
              initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: 0.1 * i, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Timeline connector */}
              {i < experiences.length - 1 && <div className="timeline-line" />}

              {/* Dot */}
              <div className="absolute left-0 top-1 w-10 h-10 rounded-full glass flex items-center justify-center border-primary/20 group-hover:border-primary/50 transition-colors duration-300">
                <Briefcase className="w-4 h-4 text-primary" />
              </div>

              <div className="glass-hover rounded-xl p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 gap-1">
                  <div>
                    <h3 className="text-lg font-semibold">{exp.company}</h3>
                    <p className="text-sm text-primary">{exp.role}</p>
                  </div>
                  <div className="text-sm text-muted-foreground font-mono">
                    {exp.period}
                  </div>
                </div>
                <ul className="space-y-2 mb-4">
                  {exp.highlights.map((h, j) => (
                    <li key={j} className="text-sm text-muted-foreground leading-relaxed flex gap-2">
                      <span className="text-primary mt-1.5 shrink-0">›</span>
                      {h}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-2">
                  {exp.tech.map((t) => (
                    <span key={t} className="px-2.5 py-1 rounded-md bg-primary/10 text-primary text-xs font-medium">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
