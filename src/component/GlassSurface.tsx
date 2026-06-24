import { useMouseStore } from "@/Context/MouseContext";
import React, {
  useEffect,
  useRef,
  useState,
  useId,
  useMemo,
  useCallback,
} from "react";

export interface GlassSurfaceProps {
  children?: React.ReactNode;
  width?: number | string;
  height?: number | string;
  borderRadius?: number;
  borderWidth?: number;
  brightness?: number;
  opacity?: number;
  blur?: number;
  displace?: number;
  backgroundOpacity?: number;
  saturation?: number;
  distortionScale?: number;
  redOffset?: number;
  greenOffset?: number;
  blueOffset?: number;
  xChannel?: "R" | "G" | "B";
  yChannel?: "R" | "G" | "B";
  mixBlendMode?:
    | "normal"
    | "multiply"
    | "screen"
    | "overlay"
    | "darken"
    | "lighten"
    | "color-dodge"
    | "color-burn"
    | "hard-light"
    | "soft-light"
    | "difference"
    | "exclusion"
    | "hue"
    | "saturation"
    | "color"
    | "luminosity"
    | "plus-darker"
    | "plus-lighter";
  className?: string;
  style?: React.CSSProperties;
}

const useDarkMode = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDark(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setIsDark(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  return isDark;
};

const GlassSurface = React.memo(function GlassSurface({
  children,
  width = 200,
  height = 80,
  borderRadius = 0,
  borderWidth = 0.07,
  brightness = 50,
  opacity = 0.93,
  blur = 11,
  displace = 0,
  backgroundOpacity = 0,
  saturation = 1,
  distortionScale = -180,
  redOffset = 0,
  greenOffset = 10,
  blueOffset = 20,
  xChannel = "R",
  yChannel = "G",
  mixBlendMode = "difference",
  className = "",
  style = {},
}: GlassSurfaceProps) {
  const uniqueId = useId().replace(/:/g, "-");
  const filterId = `glass-filter-${uniqueId}`;
  const redGradId = `red-grad-${uniqueId}`;
  const blueGradId = `blue-grad-${uniqueId}`;

  const [svgSupported, setSvgSupported] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const feImageRef = useRef<SVGFEImageElement>(null);
  const redChannelRef = useRef<SVGFEDisplacementMapElement>(null);
  const greenChannelRef = useRef<SVGFEDisplacementMapElement>(null);
  const blueChannelRef = useRef<SVGFEDisplacementMapElement>(null);
  const gaussianBlurRef = useRef<SVGFEGaussianBlurElement>(null);

  const x = useMouseStore((state) => state.x);
  const y = useMouseStore((state) => state.y);

  const glowRef = useRef(null);
  const boundsRef = useRef({
    width: 0,
    height: 0,
    left: 0,
    top: 0,
  });
  const rect = boundsRef.current;

  const isDarkMode = useDarkMode();

  const generateDisplacementMap = useCallback(() => {
    const rect = containerRef.current?.getBoundingClientRect();
    const actualWidth = rect?.width || 400;
    const actualHeight = rect?.height || 200;
    const edgeSize = Math.min(actualWidth, actualHeight) * (borderWidth * 0.5);

    const svgContent = `
      <svg viewBox="0 0 ${actualWidth} ${actualHeight}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="${redGradId}" x1="100%" y1="0%" x2="0%" y2="0%">
            <stop offset="0%" stop-color="#0000"/>
            <stop offset="100%" stop-color="red"/>
          </linearGradient>
          <linearGradient id="${blueGradId}" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#0000"/>
            <stop offset="100%" stop-color="blue"/>
          </linearGradient>
        </defs>
        <rect x="0" y="0" width="${actualWidth}" height="${actualHeight}" fill="black"></rect>
        <rect x="0" y="0" width="${actualWidth}" height="${actualHeight}" rx="${borderRadius}" fill="url(#${redGradId})" />
        <rect x="0" y="0" width="${actualWidth}" height="${actualHeight}" rx="${borderRadius}" fill="url(#${blueGradId})" style="mix-blend-mode: ${mixBlendMode}" />
        <rect x="${edgeSize}" y="${edgeSize}" width="${actualWidth - edgeSize * 2}" height="${actualHeight - edgeSize * 2}" rx="${borderRadius}" fill="hsl(0 0% ${brightness}% / ${opacity})" style="filter:blur(${blur}px)" />
      </svg>
    `;

    return `data:image/svg+xml,${encodeURIComponent(svgContent)}`;
  }, [borderRadius, borderWidth, brightness, opacity, blur, mixBlendMode]);

const updateDisplacementMap = useCallback(() => {
  feImageRef.current?.setAttribute("href", generateDisplacementMap());
}, [generateDisplacementMap]);

  useEffect(() => {
    updateDisplacementMap();
    [
      { ref: redChannelRef, offset: redOffset },
      { ref: greenChannelRef, offset: greenOffset },
      { ref: blueChannelRef, offset: blueOffset },
    ].forEach(({ ref, offset }) => {
      if (ref.current) {
        ref.current.setAttribute(
          "scale",
          (distortionScale + offset).toString(),
        );
        ref.current.setAttribute("xChannelSelector", xChannel);
        ref.current.setAttribute("yChannelSelector", yChannel);
      }
    });

    gaussianBlurRef.current?.setAttribute("stdDeviation", displace.toString());
  }, [
    width,
    height,
    borderRadius,
    borderWidth,
    brightness,
    opacity,
    blur,
    displace,
    distortionScale,
    redOffset,
    greenOffset,
    blueOffset,
    xChannel,
    yChannel,
    mixBlendMode,
  ]);

  useEffect(() => {
    setSvgSupported(supportsSVGFilters());
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    const resizeObserver = new ResizeObserver(() => {
      requestAnimationFrame(updateDisplacementMap);
    });

    resizeObserver.observe(containerRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    requestAnimationFrame(updateDisplacementMap);
  }, [width, height]);

  const supportsSVGFilters = () => {
    if (typeof window === "undefined" || typeof document === "undefined") {
      return false;
    }

    const isWebkit =
      /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent);
    const isFirefox = /Firefox/.test(navigator.userAgent);

    if (isWebkit || isFirefox) {
      return false;
    }

    const div = document.createElement("div");
    div.style.backdropFilter = `url(#${filterId})`;

    return div.style.backdropFilter !== "";
  };
  const backdropFilterSupported = useMemo(
    () =>
      typeof window !== "undefined" &&
      CSS.supports("backdrop-filter", "blur(10px)"),
    [],
  );

  const getContainerStyles = (): React.CSSProperties => {
    const baseStyles: React.CSSProperties = {
      ...style,
      width: typeof width === "number" ? `${width}px` : width,
      height: typeof height === "number" ? `${height}px` : height,
      borderRadius: `${borderRadius}px`,
      "--glass-frost": backgroundOpacity,
      "--glass-saturation": saturation,
    } as React.CSSProperties;

    if (svgSupported) {
      return {
        ...baseStyles,
        background: isDarkMode
          ? `hsl(0 0% 0% / ${backgroundOpacity})`
          : `hsl(0 0% 100% / ${backgroundOpacity})`,
        backdropFilter: `url(#${filterId}) saturate(${saturation})`,
        boxShadow: isDarkMode
          ? `0 0 2px 1px color-mix(in oklch, white, transparent 85%) inset,
             0 0 10px 4px color-mix(in oklch, black, transparent 65%) inset,
             0px 4px 16px rgba(17, 17, 26, 0.05),
             0px 8px 24px rgba(17, 17, 26, 0.05),
             0px 16px 56px rgba(17, 17, 26, 0.05),
             0px 4px 16px rgba(17, 17, 26, 0.05) inset,
             0px 8px 24px rgba(17, 17, 26, 0.05) inset,
             0px 16px 56px rgba(17, 17, 26, 0.05) inset`
          : `0 0 2px 1px color-mix(in oklch, black, transparent 85%) inset,
             0 0 10px 4px color-mix(in oklch, black, transparent 90%) inset,
             0px 4px 16px rgba(17, 17, 26, 0.05),
             0px 8px 24px rgba(17, 17, 26, 0.05),
             0px 16px 56px rgba(17, 17, 26, 0.05),
             0px 4px 16px rgba(17, 17, 26, 0.05) inset,
             0px 8px 24px rgba(17, 17, 26, 0.05) inset,
             0px 16px 56px rgba(17, 17, 26, 0.05) inset`,
      };
    } else {
      if (isDarkMode) {
        if (!backdropFilterSupported) {
          return {
            ...baseStyles,
            background: "rgba(0, 0, 0, 0.4)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            boxShadow: `inset 0 1px 0 0 rgba(255, 255, 255, 0.2),
                        inset 0 -1px 0 0 rgba(255, 255, 255, 0.1)`,
          };
        } else {
          return {
            ...baseStyles,
            background: "rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(12px) saturate(1.8) brightness(1.2)",
            WebkitBackdropFilter: "blur(12px) saturate(1.8) brightness(1.2)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            boxShadow: `inset 0 1px 0 0 rgba(255, 255, 255, 0.2),
                        inset 0 -1px 0 0 rgba(255, 255, 255, 0.1)`,
          };
        }
      } else {
        if (!backdropFilterSupported) {
          return {
            ...baseStyles,
            background: "rgba(255, 255, 255, 0.4)",
            border: "1px solid rgba(255, 255, 255, 0.3)",
            boxShadow: `inset 0 1px 0 0 rgba(255, 255, 255, 0.5),
                        inset 0 -1px 0 0 rgba(255, 255, 255, 0.3)`,
          };
        } else {
          return {
            ...baseStyles,
            background: "rgba(255, 255, 255, 0.25)",
            backdropFilter: "blur(12px) saturate(1.8) brightness(1.1)",
            WebkitBackdropFilter: "blur(12px) saturate(1.8) brightness(1.1)",
            border: "1px solid rgba(255, 255, 255, 0.3)",
            boxShadow: `0 8px 32px 0 rgba(31, 38, 135, 0.2),
                        0 2px 16px 0 rgba(31, 38, 135, 0.1),
                        inset 0 1px 0 0 rgba(255, 255, 255, 0.4),
                        inset 0 -1px 0 0 rgba(255, 255, 255, 0.2)`,
          };
        }
      }
    }
  };

  const containerStyles = useMemo(
    () => getContainerStyles(),
    [
      width,
      height,
      borderRadius,
      backgroundOpacity,
      saturation,
      svgSupported,
      isDarkMode,
    ],
  );

  const glassSurfaceClasses = useMemo(
  () =>
    "relative flex items-center justify-center overflow-hidden transition-opacity duration-[260ms] ease-out",
  [],
);

  const focusVisibleClasses = isDarkMode
    ? "focus-visible:outline-2 focus-visible:outline-[#0A84FF] focus-visible:outline-offset-2"
    : "focus-visible:outline-2 focus-visible:outline-[#007AFF] focus-visible:outline-offset-2";

  useEffect(() => {
    const updateBounds = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();

      boundsRef.current = {
        width: rect.width,
        height: rect.height,
        left: rect.left,
        top: rect.top,
      };
    };

    updateBounds();

    const ro = new ResizeObserver(updateBounds);

    if (containerRef.current) {
      ro.observe(containerRef.current);
    }

    window.addEventListener("resize", updateBounds);
    window.addEventListener("scroll", updateBounds, true);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", updateBounds);
      window.removeEventListener("scroll", updateBounds, true);
    };
  }, []);

  const { glowW, glowH } = useMemo(
  () => ({
    glowW: rect.width * 0.6,
    glowH: rect.height * 0.8,
  }),
  [rect.width, rect.height],
);

  let localX = 50;
  let localY = 50;

  if (rect) {
    localX = (((x / 100) * window.innerWidth - rect.left) / rect.width) * 100;

    localY = (((y / 100) * window.innerHeight - rect.top) / rect.height) * 100;
  }
  const safeX = Math.max(-50, Math.min(150, localX));
  const safeY = Math.max(-50, Math.min(150, localY));

  let intensity = 0;

  if (rect) {
    const componentCenterX = rect.left + rect.width / 2;
    const componentCenterY = rect.top + rect.height / 2;

    const lightX = (x / 100) * window.innerWidth;
    const lightY = (y / 100) * window.innerHeight;

    const distance = Math.sqrt(
      Math.pow(lightX - componentCenterX, 2) +
        Math.pow(lightY - componentCenterY, 2),
    );

    const maxDistance =
      Math.sqrt(window.innerWidth ** 2 + window.innerHeight ** 2) * 0.35;

    intensity = Math.max(0, Math.min(1, 1 - distance / maxDistance));
  }

  const highlightOpacity = 0.08 * intensity;
  const midOpacity = 0.025 * intensity;
  const outerOpacity = 0.005 * intensity;

  useEffect(() => {
    const glow = glowRef.current;
    if (!glow) return;

    glow.style.setProperty("--light-x", `${safeX}%`);
    glow.style.setProperty("--light-y", `${safeY}%`);
    glow.style.setProperty("--highlight", `${highlightOpacity}`);
    glow.style.setProperty("--mid", `${midOpacity}`);
    glow.style.setProperty("--outer", `${outerOpacity}`);
  }, [x, y]);

  const glowStyle = useMemo(
  () =>
    ({
      "--light-x": `${safeX}%`,
      "--light-y": `${safeY}%`,
      background: `
        radial-gradient(
          ${glowW * 0.2}px ${glowH * 0.2}px
          at var(--light-x) var(--light-y),
          rgba(255,255,255,1) 0%,
          rgba(255,255,255,1) 30%,
          rgba(255,255,255,1) 60%,
          transparent 100%
        ),
        radial-gradient(
          ${glowW}px ${glowH}px
          at var(--light-x) var(--light-y),
          rgba(255,255,255,${highlightOpacity}) 0%,
          rgba(255,255,255,${midOpacity}) 30%,
          rgba(255,255,255,${outerOpacity}) 60%,
          transparent 100%
        )
      `,
      boxShadow: `
        inset 0 1px 0 rgba(255,255,255,.7),
        inset 0 -2px 4px rgba(0,0,0,.15),
        0 4px 12px rgba(0,0,0,.12)
      `,
      filter: `blur(${glowH * 0.2}px)`,
      // mixBlendMode: "screen",
      transition: "background 50ms linear",
    }) as React.CSSProperties,
  [
    safeX,
    safeY,
    glowW,
    glowH,
    highlightOpacity,
    midOpacity,
    outerOpacity,
  ],
);

  return (
    <div className="relative overflow-hidden" style={{ borderRadius: `${borderRadius}px` }}>
      <div
     className="absolute inset-0 pointer-events-none rounded-[inherit] overflow-hidden bg-transparent z-[-20]"
     style={glowStyle}
   />
     
      <div
        ref={containerRef}
        className={`${glassSurfaceClasses} ${focusVisibleClasses} ${className}`}
        style={containerStyles}
      >
        <svg
          className="w-full h-full pointer-events-none absolute inset-0 opacity-0 -z-10"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <filter
              id={filterId}
              colorInterpolationFilters="sRGB"
              x="0%"
              y="0%"
              width="100%"
              height="100%"
            >
              <feImage
                ref={feImageRef}
                x="0"
                y="0"
                width="100%"
                height="100%"
                preserveAspectRatio="none"
                result="map"
              />

              <feDisplacementMap
                ref={redChannelRef}
                in="SourceGraphic"
                in2="map"
                id="redchannel"
                result="dispRed"
              />
              <feColorMatrix
                in="dispRed"
                type="matrix"
                values="1 0 0 0 0
                      0 0 0 0 0
                      0 0 0 0 0
                      0 0 0 1 0"
                result="red"
              />

              <feDisplacementMap
                ref={greenChannelRef}
                in="SourceGraphic"
                in2="map"
                id="greenchannel"
                result="dispGreen"
              />
              <feColorMatrix
                in="dispGreen"
                type="matrix"
                values="0 0 0 0 0
                      0 1 0 0 0
                      0 0 0 0 0
                      0 0 0 1 0"
                result="green"
              />

              <feDisplacementMap
                ref={blueChannelRef}
                in="SourceGraphic"
                in2="map"
                id="bluechannel"
                result="dispBlue"
              />
              <feColorMatrix
                in="dispBlue"
                type="matrix"
                values="0 0 0 0 0
                      0 0 0 0 0
                      0 0 1 0 0
                      0 0 0 1 0"
                result="blue"
              />

              <feBlend in="red" in2="green" mode="screen" result="rg" />
              <feBlend in="rg" in2="blue" mode="screen" result="output" />
              <feGaussianBlur
                ref={gaussianBlurRef}
                in="output"
                stdDeviation="0.7"
              />
            </filter>
          </defs>
        </svg>

        <div className="w-full h-full flex items-center justify-center p-2 rounded-[inherit] relative z-10">
          {children}
        </div>
      </div>
    </div>
  );
});

export default GlassSurface;
