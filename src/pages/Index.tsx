import Navbar from "@/components/portfolio/Navbar";
import HeroSection from "@/components/portfolio/HeroSection";
import AboutSection from "@/components/portfolio/AboutSection";
import SkillsSection from "@/components/portfolio/SkillsSection";
import ExperienceSection from "@/components/portfolio/ExperienceSection";
import ProjectsSection from "@/components/portfolio/ProjectsSection";
import InteractiveTerminal from "@/components/portfolio/InteractiveTerminal";
import ContactSection from "@/components/portfolio/ContactSection";
import Footer from "@/components/portfolio/Footer";
import CommandPalette from "@/components/portfolio/CommandPalette";
import CursorGlow from "@/components/portfolio/CursorGlow";

const Index = () => {
  return (
    <div className="min-h-screen">
      <CursorGlow />
      <CommandPalette />
      <Navbar />
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ExperienceSection />
      <ProjectsSection />
      <InteractiveTerminal />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
