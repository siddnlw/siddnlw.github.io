import BorderGlow from "@/component/BorderGlow";
import { motion } from "framer-motion";
import { Code2, Zap, Layers, Users } from "lucide-react";

const highlights = [
  { icon: Code2, label: "React Ecosystem", desc: "React, Next.js, TypeScript" },
  { icon: Zap, label: "Performance", desc: "70% faster dispatch times" },
  {
    icon: Layers,
    label: "Full-Stack",
    desc: "Frontend-focused, full-stack capable",
  },
  { icon: Users, label: "Impact", desc: "Large-scale production systems" },
];

const AboutSection = () => {
  return (
    <section id="about" className="section-padding">
      <div className="container-tight">
        <motion.div
          initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-sm font-mono text-primary mb-3 tracking-wider uppercase">
            About
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-balance">
            Building interfaces that
            <span className="gradient-text"> perform</span>
          </h2>
        </motion.div>

        <motion.p
          className="text-muted-foreground text-lg max-w-2xl mb-16 leading-relaxed"
          initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          Frontend developer with 4+ years of experience building
          high-performance web and mobile applications. Specialized in the React
          ecosystem with a strong focus on UI/UX, scalability, and performance
          optimization. Proven track record of reducing critical response times
          and delivering user-friendly solutions for large-scale systems at
          companies like Razorpay and RED.Health.
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {highlights.map((item, i) => (
            <div className="cursor-target h-fit">
              <BorderGlow
                edgeSensitivity={30}
                glowColor="40 80 80"
                backgroundColor="#120F17"
                borderRadius={28}
                className=" p-6 "
                glowRadius={40}
                glowIntensity={1}
                coneSpread={25}
                animated={false}
                colors={["#c084fc", "#f472b6", "#38bdf8"]}
              >
                <item.icon className="w-5 h-5 text-primary mb-4 transition-transform duration-300 group-hover:scale-110" />
                <h3 className="font-semibold mb-1">{item.label}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </BorderGlow>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
