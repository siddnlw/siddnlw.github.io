import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowDown, Send } from "lucide-react";
import MagneticButton from "./MagneticButton";
import Iridescence from "../custom/Iridescence";
import FluidGlass from "../FluidGlass";
import LiquidGlassTheme from "../LiquidGlass/LiquidGlassTheme";
import { LiquidGlassDiv } from "../LiquidGlass/LiquidGlassDiv";
import { Text } from "@react-three/drei";
import { Html } from "@react-three/drei";
import Ballpit from "../Ballpit";
import SoftAurora from "../SoftAurora";
import GlassSurface from "@/component/GlassSurface";
import LightPillar from "@/component/LightPillar";

const HeroSection = () => {
  return (
  
    <section
      id="hero"
      className="relative min-h-screen -mt-10 flex items-center justify-center overflow-hidden"
    >
      <div className="bg-[#230A08] w-[60%] h-[90dvh] text-[#A89471] flex items-center justify-center tracking-[1rem]">
        SIDDHARTH NALWAYA
      </div>
      <div className="bg-[#E2412A] w-[0.5%] h-[90dvh] shadow-[0_0_60px_10px_#E2412A] blur-sm"/>
      <div className="bg-[#FBC85F] w-[14%] h-[90dvh]"/>
      <div className="bg-[#E2412A] w-[0.5%] h-[90dvh] shadow-[0_0_60px_10px_#E2412A] blur-sm"/>
      <div className="bg-[#230A08] w-[25%] h-[90dvh]"/>
      
    </section>
    // </Html>

    // </LiquidGlassTheme>
  );
};

export default HeroSection;
