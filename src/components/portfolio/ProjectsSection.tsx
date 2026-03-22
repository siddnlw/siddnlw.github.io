import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ExternalLink, Github, X, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import TiltCard from "./TiltCard";

const projects = [
  {
    title: "Ambulance Dispatch System",
    desc: "Uber-like real-time dispatch system for emergency ambulances. Features auto/manual dispatch, keyboard-driven UI, and real-time tracking — outperforming traditional 911 dispatch.",
    tech: ["React", "Next.js", "PubNub", "Vite", "React Native"],
    metrics: "70% reduction in dispatch time",
    features: ["Real-time tracking", "Auto/manual dispatch", "Keyboard-first UI"],
    category: "React",
  },
  {
    title: "Cloud Architecture Builder",
    desc: "Visual drag-and-drop interface for designing AWS/Azure cloud architectures. Built with ReactFlow for intuitive node-based editing.",
    tech: ["React", "Next.js", "ReactFlow", "WebSocket"],
    features: ["Drag-and-drop UI", "Live data visualization", "WebSocket streaming"],
    category: "Next.js",
  },
  {
    title: "Political Analytics Dashboard",
    desc: "Data-rich dashboard for political parties with advanced graphical and tabular data representations, sorting, and filtering capabilities.",
    tech: ["React", "JavaScript", "PHP"],
    features: ["Advanced filtering", "Data visualization", "Tabular views"],
    category: "React",
  },
  {
    title: "Shield Helvetia",
    desc: "Professional, responsive website incorporating the client's brand identity, delivering an engaging online presence and enhancing business visibility.",
    tech: ["HTML", "CSS", "JavaScript"],
    link: "https://shield-helvetia.netlify.app/",
    features: ["Responsive design", "Brand-focused", "Performance optimized"],
    category: "Other",
  },
  {
    title: "Sales Dashboard",
    desc: "Visually appealing React dashboard with intuitive UI components, data tables, filters, sorting options, and interactive graphs for sales data analysis.",
    tech: ["React"],
    github: "https://github.com/siddnlw/react-dashboard",
    features: ["Interactive graphs", "Data tables", "Filter & sort"],
    category: "React",
  },
  {
    title: "COVID-19 Tracker",
    desc: "Real-time tracker for COVID-19 cases in India, displaying tabular data with dynamic sorting and filtering to monitor virus spread.",
    tech: ["React"],
    github: "https://github.com/siddnlw/covid-19-tracker",
    features: ["Real-time data", "Sorting & filtering", "Tabular display"],
    category: "React",
  },
];

const filters = ["All", "React", "Next.js", "Other"];

type Project = typeof projects[number];

const ProjectCard = ({ project, onClick }: { project: Project; onClick: () => void }) => (
  <TiltCard>
    <motion.div
      layout
      className="glass-hover rounded-xl overflow-hidden cursor-pointer group h-full"
      onClick={onClick}
    >
      <div className="h-32 bg-gradient-to-br from-primary/10 to-[hsl(var(--glow-secondary))]/10 flex items-center justify-center relative overflow-hidden">
        <Layers className="w-10 h-10 text-primary/40 transition-transform duration-500 group-hover:scale-125 group-hover:rotate-12" />
        <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent" />
      </div>
      <div className="p-5">
        <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors duration-200">{project.title}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{project.desc}</p>
        {project.metrics && <div className="text-xs font-mono text-primary mb-3">{project.metrics}</div>}
        <div className="flex flex-wrap gap-1.5">
          {project.tech.slice(0, 4).map((t) => (
            <span key={t} className="px-2 py-0.5 rounded text-xs bg-secondary text-secondary-foreground">{t}</span>
          ))}
        </div>
      </div>
    </motion.div>
  </TiltCard>
);

const ProjectModal = ({ project, onClose }: { project: Project; onClose: () => void }) => (
  <motion.div
    className="fixed inset-0 z-50 flex items-center justify-center p-4"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={onClose} />
    <motion.div
      className="relative glass rounded-2xl max-w-lg w-full p-8 max-h-[80vh] overflow-y-auto"
      initial={{ scale: 0.95, opacity: 0, y: 20 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{ scale: 0.95, opacity: 0, y: 20 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
    >
      <button onClick={onClose} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors active:scale-95">
        <X className="w-5 h-5" />
      </button>
      <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
      {project.metrics && <p className="text-sm font-mono text-primary mb-4">{project.metrics}</p>}
      <p className="text-muted-foreground mb-6 leading-relaxed">{project.desc}</p>
      <div className="mb-6">
        <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">Key Features</h4>
        <ul className="space-y-2">
          {project.features.map((f) => (
            <li key={f} className="flex items-center gap-2 text-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              {f}
            </li>
          ))}
        </ul>
      </div>
      <div className="mb-6">
        <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">Tech Stack</h4>
        <div className="flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <span key={t} className="px-3 py-1 rounded-md bg-primary/10 text-primary text-sm font-medium">{t}</span>
          ))}
        </div>
      </div>
      <div className="flex gap-3">
        {project.link && (
          <Button variant="hero" size="sm" asChild>
            <a href={project.link} target="_blank" rel="noopener noreferrer">
              Live Site <ExternalLink className="w-3 h-3 ml-1" />
            </a>
          </Button>
        )}
        {project.github && (
          <Button variant="heroOutline" size="sm" asChild>
            <a href={project.github} target="_blank" rel="noopener noreferrer">
              GitHub <Github className="w-3 h-3 ml-1" />
            </a>
          </Button>
        )}
      </div>
    </motion.div>
  </motion.div>
);

const ProjectsSection = () => {
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState<Project | null>(null);

  const filtered = filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <section id="projects" className="section-padding">
      <div className="container-tight">
        <motion.div
          initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-sm font-mono text-primary mb-3 tracking-wider uppercase">Projects</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-10 text-balance">
            Things I've <span className="gradient-text">built</span>
          </h2>
        </motion.div>

        <motion.div
          className="flex gap-2 mb-10 flex-wrap"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 active:scale-[0.96] ${
                filter === f
                  ? "bg-primary text-primary-foreground"
                  : "glass text-muted-foreground hover:text-foreground"
              }`}
            >
              {f}
            </button>
          ))}
        </motion.div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <ProjectCard key={project.title} project={project} onClick={() => setSelected(project)} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <AnimatePresence>
        {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  );
};

export default ProjectsSection;
