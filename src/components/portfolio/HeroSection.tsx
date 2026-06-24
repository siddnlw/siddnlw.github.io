import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowDown, Send } from "lucide-react";
import MagneticButton from "./MagneticButton";
import SoftAurora from "../SoftAurora";
import GlassSurface from "@/component/GlassSurface";

const HeroSection = () => {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <div className="w-full h-[100dvh] absolute top-0 left-0 pointer-events-none to-black/80 from-black/0 bg-gradient-to-t">
        {/* <Iridescence speed={0.5} amplitude={0.05} mouseReact /> */}
        {/* <LightPillar
          topColor="#6843ff"
          bottomColor="#FF9FFC"
          intensity={1}
          rotationSpeed={0.3}
          glowAmount={0.004}
          pillarWidth={6.2}
          pillarHeight={0.4}
          noiseIntensity={0}
          pillarRotation={35}
          interactive={false}
          mixBlendMode="screen"
          quality="high"
        /> */}
        <SoftAurora
          speed={0.6}
          scale={0.1}
          brightness={0.4}
          color1="#f7f7f7"
          color2="#e100ff"
          noiseFrequency={10}
          noiseAmplitude={10}
          bandHeight={0.5}
          bandSpread={3}
          octaveDecay={0.01}
          layerOffset={0}
          colorSpeed={0.1}
          enableMouseInteraction={false}
          mouseInfluence={0.25}
        />
      </div>
      <div className="w-full h-[100dvh] absolute top-0 left-0 pointer-events-none blur-[1px]">
        {/* <Ballpit
          count={1}
          gravity={0}
          friction={1}
          wallBounce={1}
          colors={["#5227FF", "#7cff67", "#ff6b6b", "#ffffff"]}
        /> */}
      </div>
      {/* <div className="w-full h-[100dvh] absolute top-0 left-0 pointer-events-none blur-[1px]">
        <Ballpit
          count={50}
          gravity={0}
          friction={1}
          wallBounce={1}
          followCursor={false}
          colors={["#5227FF", "#7cff67", "#ff6b6b", "#ffffff"]}
        />
      </div>
      <div className="w-full h-[100dvh] absolute top-0 left-0 pointer-events-none z-40">
        <Ballpit
          count={10}
          gravity={0}
          friction={1}
          wallBounce={1}
          followCursor={false}
          colors={["#5227FF", "#7cff67", "#ff6b6b", "#ffffff"]}
        />
      </div> */}

      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[120px] animate-pulse-glow" />
      <div
        className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-[hsl(var(--glow-secondary))]/5 blur-[120px] animate-pulse-glow"
        style={{ animationDelay: "1.5s" }}
      />

      <div className="relative z-10 container-tight text-center px-4 flex flex-col items-center">
        <div className="mt-20 sm:mt-10">
          <div className="relative w-[200px] h-[40px] mx-auto mb-10 sm:mb-5 select-none">
            <GlassSurface
              displace={0.5}
              distortionScale={-180}
              redOffset={0}
              greenOffset={10}
              blueOffset={20}
              brightness={500}
              opacity={0.93}
              mixBlendMode="screen"
              borderRadius={40}
              className="!w-full !h-full "
            >
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse-glow" />
              <span className="whitespace-nowrap text-xs ml-3 [text-shadow:_0px_0px_1px_rgba(0,0,0,1)]">
                {" "}
                Available for opportunities
              </span>
              {/* <span className="inset-0 flex items-center w-[calc(100%-0px)] absolute h-[calc(100%-0px)] border border-transparent border-l-[rgba(174,218,238,1)] border-t-[rgba(174,218,238,1)] rounded-full bg-[radial-gradient(circle,rgba(174,218,238,1)_0%,rgba(148,187,233,1)_100%)] opacity-45"/> */}
              {/* <span className="inset-0 -z-10 flex items-center w-[calc(100%-0px)] absolute h-[calc(100%-0px)] border border-transparent border-l-[#000000] border-t-[#000000] rounded-full bg-[radial-gradient(circle,rgba(0,0,0,1)_0%,rgba(0,0,0,1)_100%)] opacity-45" /> */}
              {/* <span className="w-5 h-2 -rotate-45 absolute bottom-0 right-0 rounded-full bg-white/40 blur-[8px] " /> */}
              {/* <span className="w-3 h-2 -rotate-45 absolute top-0 left-0 rounded-full bg-white/70 blur-[8px] " /> */}
              {/* <span className="w-20 h-[1px] absolute bottom-0 left-1 blur-[3px] rounded-full bg-white/80 " /> */}
            </GlassSurface>
          </div>

          <motion.h1
            className="text-6xl sm:text-6xl md:text-8xl font-bold tracking-tight leading-[0.95] mb-6 "
            initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{
              duration: 0.8,
              delay: 0.15,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            Siddharth
            <br />
            <span className="gradient-text">Nalwaya</span>
          </motion.h1>
        </div>

        <motion.div className=" flex justify-center flex-col items-center w-full mt-20 sm:mt-10">
          <motion.p
            className="text-sm md:text-base text-white max-w-xl text-center mx-auto mb-10 text-balance [text-shadow:_0px_0px_1px_rgba(0,0,0,1)]"
            initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{
              duration: 0.7,
              delay: 0.35,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            Frontend Developer crafting high-performance web experiences with
            React, Next.js &amp; TypeScript. 4+ years of shipping products that
            users love.
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.5,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {/* <MagneticButton strength={0.4}> */}
              <Button
                className="cursor-target"
                variant="hero"
                size="lg"
                asChild
              >
                <a href="#projects">
                  View Work
                  <ArrowDown className="ml-1 w-4 h-full" />
                </a>
              </Button>
            {/* </MagneticButton> */}
            {/* <MagneticButton strength={0.4} className=" "> */}
              <GlassSurface
                displace={0.5}
                distortionScale={-180}
                redOffset={0}
                greenOffset={10}
                blueOffset={20}
                brightness={500}
                opacity={0.93}
                mixBlendMode="screen"
                borderRadius={10}
                className="w-full cursor-target"
                width={150}
                height={50}
              >
                {/* <Button variant="heroOutline" className="glass cursor-target" size="lg" asChild> */}
                <a
                  href="#contact"
                  className="flex items-center gap-2 [text-shadow:_0px_0px_1px_rgba(0,0,0,1)]"
                >
                  {/* <span className="inset-0 -z-10 flex items-center w-[calc(100%-0px)] absolute h-[calc(100%-0px)] border border-transparent border-l-[#000000] border-t-[#000000] rounded-full bg-[radial-gradient(circle,rgba(0,0,0,1)_0%,rgba(0,0,0,1)_100%)] opacity-45" /> */}
                  Contact Me
                  <Send className="ml-1 w-4 h-4" />
                  {/* <span className="w-5 h-2 -rotate-45 absolute bottom-0 right-0 rounded-full bg-white/40 blur-[8px] " /> */}
                  {/* <span className="w-3 h-2 -rotate-45 absolute top-0 left-0 rounded-full bg-white/70 blur-[8px] " /> */}
                  {/* <span className="w-20 h-[1px] absolute bottom-0 left-1 blur-[3px] rounded-full bg-white/80 " /> */}
                </a>
                {/* </Button> */}
              </GlassSurface>
            {/* </MagneticButton> */}
          </motion.div>

          {/* Cmd+K hint */}
          <motion.div
            className="mt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.5 }}
          >
            <kbd className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg glass text-xs text-muted-foreground/60 font-mono">
              <span className="text-[10px]">⌘</span>K to navigate
            </kbd>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex justify-center pt-2">
          <div className="w-1 h-2 rounded-full bg-muted-foreground/50" />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
