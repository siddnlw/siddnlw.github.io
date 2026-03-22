import { motion } from "framer-motion";
import { Mail, Github, Linkedin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const socials = [
  { icon: Github, href: "https://github.com/siddnlw", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com/in/siddharth-nalwaya", label: "LinkedIn" },
  { icon: Mail, href: "mailto:siddnlw@gmail.com", label: "Email" },
];

const ContactSection = () => {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <section id="contact" className="section-padding">
      <div className="container-tight max-w-xl">
        <motion.div
          initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center"
        >
          <p className="text-sm font-mono text-primary mb-3 tracking-wider uppercase">Contact</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
            Let's <span className="gradient-text">connect</span>
          </h2>
          <p className="text-muted-foreground mb-10">
            Have a project in mind or want to chat? Drop me a message.
          </p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          className="glass rounded-2xl p-6 space-y-4 mb-8"
          initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <input
            type="text"
            placeholder="Name"
            required
            className="w-full px-4 py-3 rounded-lg bg-secondary border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          />
          <input
            type="email"
            placeholder="Email"
            required
            className="w-full px-4 py-3 rounded-lg bg-secondary border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          />
          <textarea
            placeholder="Your message..."
            rows={4}
            required
            className="w-full px-4 py-3 rounded-lg bg-secondary border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
          />
          <Button variant="hero" className="w-full" type="submit" disabled={sent}>
            {sent ? "Message Sent ✓" : <>Send Message <Send className="w-4 h-4 ml-1" /></>}
          </Button>
        </motion.form>

        <motion.div
          className="flex justify-center gap-4"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full glass flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 transition-all duration-200 active:scale-95"
              aria-label={s.label}
            >
              <s.icon className="w-5 h-5" />
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
