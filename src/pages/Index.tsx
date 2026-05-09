import Navbar from "@/components/portfolio/Navbar";
import HeroSection from "@/components/portfolio/HeroSection";
// import HeroSection from "@/components/portfolio/HeroSection-2";
import AboutSection from "@/components/portfolio/AboutSection";
import SkillsSection from "@/components/portfolio/SkillsSection";
import ExperienceSection from "@/components/portfolio/ExperienceSection";
import ProjectsSection from "@/components/portfolio/ProjectsSection";
import InteractiveTerminal from "@/components/portfolio/InteractiveTerminal";
import ContactSection from "@/components/portfolio/ContactSection";
import Footer from "@/components/portfolio/Footer";
import CommandPalette from "@/components/portfolio/CommandPalette";
import CursorGlow from "@/components/portfolio/CursorGlow";
import TargetCursor from "@/component/TargetCursor";
import SoftAurora from "@/components/SoftAurora";

const Index = () => {
  return (
    <div className="min-h-screen grid-bg">
      {/* <CursorGlow /> */}
      {/* <div className="fixed inset-0"></div> */}

      <TargetCursor
        spinDuration={2}
        hideDefaultCursor
        parallaxOn={false}
        hoverDuration={0.2}
      />
      <CommandPalette />
      {/* <Navbar /> */}
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
