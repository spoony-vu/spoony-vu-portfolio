"use client";

import { AnimatePresence, LayoutGroup, motion, useReducedMotion, useSpring, useTransform } from "motion/react";
import type { CSSProperties, ReactNode } from "react";
import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";

type Mode = "work" | "playground";

type ProjectMedia = {
  type: "image" | "video";
  src: string;
  alt?: string;
  poster?: string;
  objectPosition?: string;
};

type Project = {
  id: string;
  title: string;
  year: string;
  category: string;
  mode: Mode;
  description: string;
  highlights: string[];
  media?: ProjectMedia;
  tint: string;
  shadow: string;
  accent: string;
  x: number;
  y: number;
  w: number;
  h: number;
};

const projects: Project[] = [
  // — Work —
  {
    id: "avast",
    title: "Avast",
    year: "2020–2024",
    category: "Web design",
    mode: "work",
    description:
      "Avast, a leader in cyber security. I was at Avast during a rebranding initiative to modernize its online presence and improve user experience. As part of the design team, I played a role in developing a Figma web design system that created foundation for this transformation, aligning with Avast's commitment to accessible and digital security solutions.",
    highlights: [
      "Built a Figma web design system used by 40+ designers across 3 studios",
      "Redesigned the main marketing site for avast.com and norton.com post-merger",
      "Defined the visual language for a new brand identity rollout",
      "Partnered with engineering to establish a component library in production",
      "Ran design reviews and established cross-team design critique culture",
    ],
    tint: "linear-gradient(145deg, rgba(254,220,209,0.85), rgba(255,186,92,0.88))",
    shadow: "rgba(255, 180, 91, 0.24)",
    accent: "#b86714",
    x: -22,
    y: 5,
    w: 18,
    h: 22,
  },
  {
    id: "rossum",
    title: "Rossum",
    year: "2024–2026",
    category: "AI product",
    mode: "work",
    description:
      "Rossum is an IDP document processing AI company helping enterprises automate document understanding at scale. I worked at the intersection of product, brand, and marketing, focusing on creating design impact that scaled.",
    highlights: [
      "Redesigned the core document queue and extraction review UI",
      "Led the brand and marketing design across web and campaigns",
      "Shipped a new design system alongside the engineering platform team",
      "Owned design for 4 major product launches across 18 months",
      "Built and mentored a small embedded design team from the ground up",
      "Introduced motion design standards into the product component library",
    ],
    tint: "linear-gradient(145deg, rgba(214,228,255,0.85), rgba(133,160,255,0.85))",
    shadow: "rgba(114, 146, 255, 0.2)",
    accent: "#4d63ca",
    x: 5,
    y: 2,
    w: 22,
    h: 26,
  },
  {
    id: "wrike",
    title: "Wrike",
    year: "2018–2020",
    category: "Product design",
    mode: "work",
    description:
      "Wrike is a project management and collaboration tool that helps teams organize their tasks, manage projects, and improve communication. My main task was to improve the visual consistency across the platform and make the product feel easier to navigate.",
    highlights: [
      "Audited and consolidated 200+ UI patterns into a coherent component set",
      "Redesigned the task detail panel — one of the most used surfaces in the app",
      "Collaborated with PMs on a navigation restructure to reduce cognitive load",
      "Contributed to Wrike's first internal design system documentation site",
    ],
    tint: "linear-gradient(145deg, rgba(227,254,214,0.85), rgba(132,220,133,0.85))",
    shadow: "rgba(124, 197, 117, 0.2)",
    accent: "#4c8f4a",
    x: 36,
    y: 56,
    w: 14,
    h: 18,
  },
  {
    id: "anchovi",
    title: "Anchovi",
    year: "2023–2024",
    category: "Ecommerce platform",
    mode: "work",
    description:
      "Founded by food supply chain leaders, Anchovi developed an ecommerce platform to help foodservice distributors thrive in the digital age. I improved the product by exploring new features and helping drive user adoption across mobile and web.",
    highlights: [
      "Designed a mobile-first order management flow from scratch",
      "Built and shipped a new onboarding experience that reduced drop-off by 30%",
      "Prototyped and validated a new product catalog browsing pattern",
      "Worked directly with the founders and a single engineer — zero bureaucracy",
    ],
    tint: "linear-gradient(145deg, rgba(214,244,255,0.85), rgba(78,151,199,0.85))",
    shadow: "rgba(65, 138, 186, 0.18)",
    accent: "#31698a",
    x: -12,
    y: 76,
    w: 17,
    h: 14,
  },
  {
    id: "marinade",
    title: "Marinade",
    year: "2026–now",
    category: "DeFi product",
    mode: "work",
    description:
      "Marinade.finance is the leading liquid staking protocol on Solana. I joined to lead design across product, marketing, and brand — helping shape how DeFi feels for both newcomers and power users.",
    highlights: [
      "Leading design across product, marketing, and brand strategy",
      "Redesigning the staking dashboard and delegation flow",
      "Building the visual system for a new protocol brand refresh",
      "Collaborating with community contributors and partner teams on co-branded campaigns",
    ],
    tint: "linear-gradient(145deg, rgba(209,248,235,0.88), rgba(60,185,140,0.82))",
    shadow: "rgba(48, 162, 120, 0.22)",
    accent: "#1e7a57",
    x: 62,
    y: 4,
    w: 20,
    h: 16,
  },
  {
    id: "design-systems",
    title: "Design Systems",
    year: "2018–now",
    category: "Craft",
    mode: "work",
    description:
      "Across every company I've worked at, I've built or contributed to a design system. Token architecture, component libraries, and the documentation culture that makes teams actually use them.",
    highlights: [
      "Designed token hierarchies in Figma Variables across 3 products",
      "Wrote component documentation that engineers actually read",
      "Created a design system audit methodology used by my teams",
      "Contributed to open-source component patterns and accessibility guidelines",
    ],
    tint: "linear-gradient(145deg, rgba(255,248,210,0.86), rgba(220,185,80,0.82))",
    shadow: "rgba(198, 162, 54, 0.2)",
    accent: "#8a6614",
    x: -32,
    y: 50,
    w: 13,
    h: 16,
  },
  {
    id: "brand-work",
    title: "Brand & Identity",
    year: "Various",
    category: "Visual identity",
    mode: "work",
    description:
      "Logo systems, color theory in practice, and the craft of making a brand feel consistent across every surface — from product UI to out-of-home.",
    highlights: [
      "Logo and identity work for MatMat, Anchovi, and several freelance clients",
      "Brand guidelines that translate cleanly to digital and physical materials",
      "Color system design using OKLCH for perceptual consistency",
      "Typography selection and pairing across Czech and Latin scripts",
    ],
    tint: "linear-gradient(145deg, rgba(255,215,230,0.86), rgba(200,110,140,0.82))",
    shadow: "rgba(184, 88, 120, 0.18)",
    accent: "#943055",
    x: 10,
    y: 86,
    w: 18,
    h: 11,
  },
  {
    id: "web-craft",
    title: "Web Craft",
    year: "Ongoing",
    category: "Interactive web",
    mode: "work",
    description:
      "Landing pages, microsites, and coded prototypes where design and engineering overlap. I build to understand what's possible, and to close the gap between mockup and production.",
    highlights: [
      "Built this portfolio in Next.js with Framer Motion — no template",
      "Coded marketing landing pages that shipped to production",
      "Prototyped scroll-driven animations and canvas interactions for design reviews",
      "Contributed UI components to engineering repos in React and TypeScript",
    ],
    tint: "linear-gradient(145deg, rgba(240,220,255,0.86), rgba(170,120,220,0.82))",
    shadow: "rgba(148, 98, 198, 0.18)",
    accent: "#7240b0",
    x: 64,
    y: 50,
    w: 11,
    h: 24,
  },
  // — Playground —
  {
    id: "matmat",
    title: "MatMat Boba",
    year: "2023–now",
    category: "Founder and creative",
    mode: "playground",
    description:
      "At MatMat in Prague, my wife and I channel creativity not only through our drinks but also through the brand identity. I shape the visual language across the website, interiors, and marketing materials.",
    highlights: [
      "Founded and designed the full brand identity from zero",
      "Interior design and signage for the Prague shop",
      "Photography and visual content for all social channels",
      "Website design and development — ongoing",
      "Seasonal menu design and packaging for limited runs",
    ],
    media: {
      type: "video",
      src: "/socials/x-1993614197951799296.mp4",
      objectPosition: "center center",
    },
    tint: "linear-gradient(145deg, rgba(255,220,225,0.9), rgba(205,136,159,0.82))",
    shadow: "rgba(196, 123, 150, 0.2)",
    accent: "#a34b66",
    x: -10,
    y: 15,
    w: 22,
    h: 24,
  },
  {
    id: "photography",
    title: "Photography",
    year: "2012–now",
    category: "Portraits and food",
    mode: "playground",
    description:
      "Professional photography has been a long-running side practice. It sharpened my eye for composition, gave me a deep respect for texture and light, and keeps feeding the rest of my design work.",
    highlights: [
      "Portrait and lifestyle work for brands and editorial clients",
      "Food photography for MatMat and Czech restaurant clients",
      "Self-published a small zine of film photography from Prague",
      "Shot campaigns for Avast brand initiatives",
    ],
    media: {
      type: "video",
      src: "/socials/x-2021516999424086016.mp4",
      objectPosition: "center center",
    },
    tint: "linear-gradient(145deg, rgba(255,240,214,0.82), rgba(212,167,98,0.84))",
    shadow: "rgba(186, 140, 62, 0.18)",
    accent: "#9c6820",
    x: 10,
    y: 65,
    w: 14,
    h: 20,
  },
  {
    id: "boba-lab",
    title: "Boba Lab",
    year: "Side build",
    category: "Retail experiment",
    mode: "playground",
    description:
      "A rolling collection of brand, packaging, and small retail experiments. The point is to stay playful: test ideas fast, shape them in public, and keep the work tactile.",
    highlights: [
      "Designed a packaging system for limited-run boba kits",
      "Tested direct-to-consumer shipping with a hand-packed tea subscription",
      "Explored brand extensions: tote bags, stickers, zine-style recipe booklets",
      "Documented the process publicly on Instagram and Substack",
    ],
    media: {
      type: "video",
      src: "/socials/x-2018713165261885440.mp4",
      objectPosition: "center center",
    },
    tint: "linear-gradient(145deg, rgba(230,217,255,0.84), rgba(130,113,198,0.82))",
    shadow: "rgba(118, 102, 187, 0.18)",
    accent: "#5d4da6",
    x: 46,
    y: 44,
    w: 24,
    h: 28,
  },
  {
    id: "motion-notes",
    title: "Motion Notes",
    year: "Ongoing",
    category: "Creative coding",
    mode: "playground",
    description:
      "Interactive sketches, tiny coded scenes, and motion studies where I can push typography, transitions, and material effects without product constraints.",
    highlights: [
      "Canvas sketches using Web Animations API and raw SVG transforms",
      "Spring physics experiments with Framer Motion and Motion One",
      "Typography-driven generative art pieces",
      "Published several open interactions to CodePen",
    ],
    media: {
      type: "video",
      src: "/socials/x-2027115154010238976.mp4",
      objectPosition: "center center",
    },
    tint: "linear-gradient(145deg, rgba(223,255,236,0.84), rgba(103,194,137,0.82))",
    shadow: "rgba(85, 166, 116, 0.18)",
    accent: "#2f7a49",
    x: 20,
    y: 5,
    w: 20,
    h: 14,
  },
  {
    id: "illustration",
    title: "Illustration",
    year: "Ongoing",
    category: "Drawing practice",
    mode: "playground",
    description:
      "Ink sketches, digital drawings, and occasional illustration for MatMat and side projects. A slow practice that keeps my hand connected to the work.",
    highlights: [
      "Menu illustrations for MatMat seasonal campaigns",
      "Personal sketchbook practice — mostly ink on paper",
      "Character work and iconography for side brand experiments",
    ],
    tint: "linear-gradient(145deg, rgba(255,235,205,0.86), rgba(230,160,80,0.82))",
    shadow: "rgba(204, 136, 52, 0.2)",
    accent: "#a05e18",
    x: 66,
    y: 8,
    w: 13,
    h: 18,
  },
  {
    id: "type-experiments",
    title: "Type Experiments",
    year: "Ongoing",
    category: "Typography",
    mode: "playground",
    description:
      "Variable fonts, optical sizing, and typographic systems pushed past what product work allows. Sometimes just for the pleasure of getting letters to behave.",
    highlights: [
      "Variable font explorations with Framer and CSS custom properties",
      "Built a type specimen generator as a side tool",
      "Experimented with optical sizing on large-format display type",
      "Studied Czech and Slovak type design traditions",
    ],
    tint: "linear-gradient(145deg, rgba(208,240,255,0.86), rgba(80,160,220,0.82))",
    shadow: "rgba(58, 138, 196, 0.2)",
    accent: "#1e6898",
    x: -24,
    y: 62,
    w: 16,
    h: 11,
  },
  {
    id: "writing",
    title: "Writing",
    year: "Ongoing",
    category: "Substack & notes",
    mode: "playground",
    description:
      "Short essays on design craft, process, and the odd thing that caught my attention. Published slowly, mostly for the thinking-by-writing discipline.",
    highlights: [
      "Essays on design systems, taste, and visual thinking",
      "Process notes from MatMat and side projects",
      "Occasional longer-form pieces on craft and working in DeFi",
    ],
    tint: "linear-gradient(145deg, rgba(230,255,230,0.84), rgba(100,190,120,0.82))",
    shadow: "rgba(76, 164, 96, 0.18)",
    accent: "#2d7040",
    x: 76,
    y: 76,
    w: 10,
    h: 14,
  },
];

const heroCopy = {
  work: {
    title: "spoony.vu",
    lines: [
      "Designer working in crypto and AI, learning to code and ship.",
      "Currently working at Marinade.finance",
    ],
  },
  playground: {
    title: "Playground",
    lines: [
      "Fun things I build outside of work.",
      "From shipping components and full apps to building a boba tea shop and photography.",
      "This is where I experiment, play, and recharge.",
    ],
  },
};

const links = [
  { label: "X", href: "https://x.com/" },
  { label: "Linkedin", href: "https://www.linkedin.com/" },
  { label: "Substack", href: "https://substack.com/" },
  { label: "Instagram", href: "https://www.instagram.com/" },
];

function usePointerParallax() {
  const x = useSpring(0, { stiffness: 90, damping: 24, mass: 0.8 });
  const y = useSpring(0, { stiffness: 90, damping: 24, mass: 0.8 });

  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      const nextX = (event.clientX / window.innerWidth - 0.5) * 2;
      const nextY = (event.clientY / window.innerHeight - 0.5) * 2;
      x.set(nextX);
      y.set(nextY);
    };

    const onLeave = () => {
      x.set(0);
      y.set(0);
    };

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
    };
  }, [x, y]);

  return { x, y };
}

function GooFilters() {
  return (
    <svg style={{ position: "absolute", width: 0, height: 0 }} aria-hidden="true" focusable="false">
      <defs>
        <filter id="goo-ambient" colorInterpolationFilters="sRGB">
          <feGaussianBlur in="SourceGraphic" stdDeviation="50" result="blur" />
          <feColorMatrix
            in="blur"
            mode="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 8 -3"
            result="goo"
          />
          <feComposite in="SourceGraphic" in2="goo" operator="atop" />
        </filter>
      </defs>
    </svg>
  );
}

function hexToRgb(hex: string): [number, number, number] | null {
  const m = hex.match(/^#([0-9a-f]{6})$/i);
  if (!m) return null;
  const n = parseInt(m[1], 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function AmbientBlobs({
  mode,
  accent,
  prefersReducedMotion,
}: {
  mode: Mode;
  accent: string | null;
  prefersReducedMotion: boolean | null;
}) {
  const isWork = mode === "work";
  const rgb = accent ? hexToRgb(accent) : null;
  const baseOpacity = isWork ? 0.36 : 0.14;
  const color = rgb
    ? `${rgb[0]}, ${rgb[1]}, ${rgb[2]}`
    : isWork
      ? "220, 185, 130"
      : "90, 75, 180";

  const blobs: Array<{ style: CSSProperties; opacity: number }> = [
    { style: { left: "-8%", top: "8%", width: "52vw", height: "52vw" }, opacity: baseOpacity },
    { style: { right: "2%", top: "25%", width: "44vw", height: "44vw" }, opacity: baseOpacity * 0.7 },
    { style: { left: "28%", bottom: "2%", width: "38vw", height: "38vw" }, opacity: baseOpacity * 0.5 },
  ];

  return (
    <div className="ambient-blob-layer" aria-hidden="true">
      {blobs.map((blob, i) => (
        <motion.div
          key={i}
          className="ambient-blob"
          style={blob.style}
          animate={
            prefersReducedMotion
              ? false
              : { background: `rgb(${color})`, opacity: blob.opacity }
          }
          initial={{ background: `rgb(${color})`, opacity: blob.opacity }}
          transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
        />
      ))}
    </div>
  );
}

const PROXIMITY_FAR = 180;
const PROXIMITY_CLOSE = 40;

function distanceToRect(px: number, py: number, rect: DOMRect): number {
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;
  return Math.hypot(px - cx, py - cy);
}

function GooeyTitle({ text }: { text: string }) {
  const filterId = useId();
  const zoneRef = useRef<HTMLDivElement>(null);
  const blurRef = useRef<SVGFEGaussianBlurElement>(null);
  const intensitySpring = useSpring(0, { stiffness: 120, damping: 28 });
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const onMove = (e: PointerEvent) => {
      const zone = zoneRef.current;
      if (!zone) return;

      const rect = zone.getBoundingClientRect();
      const dist = distanceToRect(e.clientX, e.clientY, rect);
      const raw = 1 - (dist - PROXIMITY_CLOSE) / (PROXIMITY_FAR - PROXIMITY_CLOSE);
      const intensity = Math.max(0, Math.min(1, raw));
      intensitySpring.set(intensity);
    };

    const onLeave = () => intensitySpring.set(0);

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
    };
  }, [intensitySpring, prefersReducedMotion]);

  useEffect(() => {
    const blur = blurRef.current;
    if (!blur || prefersReducedMotion) return;

    const unsub = intensitySpring.on("change", (v) => {
      blur.setAttribute("stdDeviation", String(v * 8));
    });
    blur.setAttribute("stdDeviation", String(intensitySpring.get() * 8));
    return unsub;
  }, [intensitySpring, prefersReducedMotion]);

  const shadowOpacity = useTransform(intensitySpring, [0, 1], [0, 0.88]);
  const scale = useTransform(intensitySpring, [0, 1], [1, 1.025]);
  const liftY = useTransform(intensitySpring, [0, 1], [0, -5]);

  return (
    <div ref={zoneRef} className="gooey-title-zone">
      <motion.div
        className="gooey-title"
        style={{
          scale: prefersReducedMotion ? 1 : scale,
          y: prefersReducedMotion ? 0 : liftY,
          transformOrigin: "0 50%",
        }}
      >
        <svg
          className="gooey-title-svg"
          viewBox="0 0 380 90"
          preserveAspectRatio="xMinYMid meet"
          aria-hidden="true"
        >
          <defs>
            <filter id={filterId} colorInterpolationFilters="sRGB">
              <feGaussianBlur
                ref={blurRef}
                in="SourceGraphic"
                stdDeviation="0"
                result="blur"
              />
              <feColorMatrix
                in="blur"
                mode="matrix"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 24 -10"
                result="goo"
              />
              <feComposite in="SourceGraphic" in2="goo" operator="atop" />
            </filter>
          </defs>
          <g filter={`url(#${filterId})`}>
            <motion.text
              className="gooey-shadow-svg"
              x="0"
              y="72"
              style={{ opacity: shadowOpacity }}
            >
              {text}
            </motion.text>
            <text className="gooey-main-svg" x="0" y="72">
              {text}
            </text>
          </g>
        </svg>
        <h1 className="gooey-title-sr">{text}</h1>
      </motion.div>
    </div>
  );
}

function DockButton({
  active,
  label,
  onClick,
  icon,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
  icon: ReactNode;
}) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <button
      type="button"
      className={`dock-button ${active ? "dock-button-active" : ""}`}
      onClick={onClick}
      aria-pressed={active}
    >
      {active && (
        <motion.span
          layoutId="dock-indicator"
          className="dock-indicator"
          transition={
            prefersReducedMotion
              ? { duration: 0 }
              : { type: "spring", stiffness: 380, damping: 32 }
          }
        />
      )}
      <span className="dock-icon">{icon}</span>
      <span>{label}</span>
    </button>
  );
}

function ProjectMediaLayer({
  media,
  className,
}: {
  media?: ProjectMedia;
  className?: string;
}) {
  if (!media) {
    return <span className={className ?? "project-card-art"} aria-hidden="true" />;
  }

  if (media.type === "image") {
    return (
      <div className={className ?? "project-card-art"}>
        <img
          src={media.src}
          alt={media.alt ?? ""}
          className="project-media"
          style={{ objectPosition: media.objectPosition }}
        />
      </div>
    );
  }

  return (
    <div className={className ?? "project-card-art"}>
      <video
        className="project-media"
        src={media.src}
        poster={media.poster}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        style={{ objectPosition: media.objectPosition }}
        aria-label={media.alt}
      />
    </div>
  );
}

export default function Page() {
  const prefersReducedMotion = useReducedMotion();
  const [canHover, setCanHover] = useState(true);
  const [mode, setMode] = useState<Mode>("work");
  const [activeId, setActiveId] = useState<string | null>(null);
  const [vw, setVw] = useState(0);
  const [vh, setVh] = useState(0);
  const { x, y } = usePointerParallax();

  useEffect(() => {
    let tid: ReturnType<typeof setTimeout>;
    const update = () => { setVw(window.innerWidth); setVh(window.innerHeight); };
    const debounced = () => { clearTimeout(tid); tid = setTimeout(update, 100); };
    update();
    window.addEventListener("resize", debounced);
    return () => { window.removeEventListener("resize", debounced); clearTimeout(tid); };
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover)");
    setCanHover(mq.matches);
    const h = () => setCanHover(mq.matches);
    mq.addEventListener("change", h);
    return () => mq.removeEventListener("change", h);
  }, []);

  const activeProject = useMemo(
    () => projects.find((project) => project.id === activeId) ?? null,
    [activeId],
  );

  const visibleProjects = useMemo(
    () => projects.filter((project) => project.mode === mode),
    [mode],
  );

  // Compute the pixel offset to move the active card to center of the right area
  const activeCardFocusOffset = useMemo(() => {
    if (!activeProject || vw === 0 || vh === 0) return { x: 0, y: 0 };
    const panelW = Math.min(vw * 0.42, 704); // 44rem cap
    const rightCenter = panelW + (vw - panelW) / 2;
    const cardW = activeProject.w * 16;
    const cardH = activeProject.h * 16;
    const cardCenterX = (activeProject.x / 100) * vw + cardW / 2;
    const cardCenterY = (activeProject.y / 100) * vh + cardH / 2;
    return {
      x: rightCenter - cardCenterX,
      y: vh / 2 - cardCenterY,
    };
  }, [activeProject, vw, vh]);

  const parallaxX = useTransform(x, [-1, 1], mode === "work" ? [28, -28] : [34, -34]);
  const parallaxY = useTransform(y, [-1, 1], mode === "work" ? [22, -22] : [28, -28]);

  // Smoothly mute parallax to zero when panel is open so the focused card holds still
  const parallaxMult = useSpring(1, { stiffness: 140, damping: 30 });
  useEffect(() => {
    parallaxMult.set(activeProject ? 0 : 1);
  }, [activeProject, parallaxMult]);
  const canvasX = useTransform([parallaxX, parallaxMult], ([px, pm]) => (px as number) * (pm as number));
  const canvasY = useTransform([parallaxY, parallaxMult], ([py, pm]) => (py as number) * (pm as number));

  useEffect(() => {
    if (activeProject && activeProject.mode !== mode) {
      setActiveId(visibleProjects[0]?.id ?? null);
    }
  }, [activeProject, mode, visibleProjects]);

  const panelRef = useRef<HTMLElement>(null);
  const closePanel = useCallback(() => setActiveId(null), []);

  useEffect(() => {
    if (activeProject?.id) {
      panelRef.current?.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [activeProject?.id]);

  useEffect(() => {
    if (!activeProject) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closePanel();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeProject, closePanel]);

  const goldenEase = [0.16, 1, 0.3, 1] as const;
  const exitEase = [0.4, 0, 1, 1] as const;

  return (
    <LayoutGroup>
      <motion.main
        className={`scene ${mode === "playground" ? "scene-playground" : "scene-work"}`}
        animate={{ backgroundColor: mode === "playground" ? "#050505" : "#ece9e2" }}
        transition={{ duration: 0.55, ease: "easeOut" }}
      >
        <GooFilters />
        <div className="scene-noise" aria-hidden="true" />
        <AmbientBlobs
          mode={mode}
          accent={activeProject?.accent ?? null}
          prefersReducedMotion={prefersReducedMotion}
        />
        <header className="topbar">
          <a href="#about" className="text-button">
            About me
          </a>
          <p className="topbar-city">Prague based</p>
          <nav className="topbar-links" aria-label="Social links">
            {links.map((link) => (
              <a key={link.label} href={link.href} className="topbar-link" rel="noopener noreferrer" target="_blank">
                {link.label}
              </a>
            ))}
          </nav>
        </header>

        <AnimatePresence mode="wait">
          <motion.section
            id="about"
            key={mode}
            className="hero-copy"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.4, ease: goldenEase }}
          >
            <GooeyTitle text={heroCopy[mode].title} />
            <div className="hero-text">
              {heroCopy[mode].lines.map((line) => (
                <p key={line}>{line}</p>
              ))}
              <p>
                You can reach me by <a href="mailto:hello@vmhieu.com">email</a>.
              </p>
            </div>
          </motion.section>
        </AnimatePresence>

        <motion.section
          className="canvas"
          style={{
            x: prefersReducedMotion ? 0 : canvasX,
            y: prefersReducedMotion ? 0 : canvasY,
          }}
        >
          {visibleProjects.map((project, index) => {
            const isActive = activeProject?.id === project.id;
            const delay = index * 0.04;

            return (
              <motion.button
                key={project.id}
                type="button"
                className={`project-card ${isActive ? "project-card-active" : ""}`}
                aria-label={`View ${project.title} – ${project.category}`}
                aria-expanded={isActive}
                style={
                  {
                    "--card-x": `${project.x}%`,
                    "--card-y": `${project.y}%`,
                    "--card-w": `${project.w}rem`,
                    "--card-h": `${project.h}rem`,
                    "--card-tint": project.tint,
                    "--card-shadow": project.shadow,
                    "--card-accent": project.accent,
                  } as CSSProperties
                }
                onClick={() => setActiveId(isActive ? null : project.id)}
                initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.92, y: 22 }}
                animate={
                  prefersReducedMotion
                    ? false
                    : {
                        opacity: isActive ? 1 : activeProject ? 0.32 : 0.92,
                        scale: isActive ? 1.05 : activeProject ? 0.94 : 1,
                        x: isActive ? activeCardFocusOffset.x : 0,
                        y: isActive ? activeCardFocusOffset.y : 0,
                      }
                }
                transition={{
                  opacity: { duration: 0.3, ease: goldenEase },
                  scale: { type: "spring", stiffness: 220, damping: 28, delay: isActive ? 0 : delay },
                  x: { type: "spring", stiffness: 220, damping: 28 },
                  y: { type: "spring", stiffness: 220, damping: 28 },
                }}
                whileHover={prefersReducedMotion || !canHover || isActive ? undefined : { scale: 1.035, y: -4 }}
                whileTap={prefersReducedMotion || isActive ? undefined : { scale: 0.985 }}
              >
                <ProjectMediaLayer media={project.media} />
                <span className="project-card-meta">
                  <span>{project.title}</span>
                  <span>{project.category}</span>
                </span>
              </motion.button>
            );
          })}
        </motion.section>

        <AnimatePresence>
          {activeProject ? (
            <>
              {/* Backdrop — click outside to close */}
              <motion.div
                className="detail-backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                onClick={closePanel}
                aria-hidden="true"
              />
              <motion.aside
                ref={panelRef}
                className="detail-panel"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={{
                  hidden: { x: "-100%", opacity: 0 },
                  visible: {
                    x: 0,
                    opacity: 1,
                    transition: {
                      type: "spring",
                      stiffness: 340,
                      damping: 34,
                      opacity: { duration: 0.18, ease: "easeOut" },
                    },
                  },
                  exit: {
                    x: "-100%",
                    opacity: 0,
                    transition: { duration: 0.26, ease: exitEase },
                  },
                }}
                role="dialog"
                aria-modal="true"
                aria-labelledby="detail-panel-title"
                aria-label={`${activeProject.title} project details`}
              >
                <div className="detail-panel-inner">
                  <div className="detail-rule">
                    <button
                      type="button"
                      className="detail-close"
                      onClick={closePanel}
                      aria-label="Close project details"
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                        <path d="M18 6 6 18M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  <div className="detail-header">
                    <motion.div
                      className="detail-card-preview"
                      initial={{ opacity: 0, scale: 0.94 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.38, ease: goldenEase, delay: 0.16 }}
                      style={
                        {
                          "--card-tint": activeProject.tint,
                          "--card-shadow": activeProject.shadow,
                        } as CSSProperties
                      }
                    >
                      <ProjectMediaLayer media={activeProject.media} className="detail-card-art" />
                    </motion.div>
                    <div className="detail-header-copy">
                      <h2 id="detail-panel-title">{activeProject.title}</h2>
                      <div className="detail-header-meta">
                        <span>{activeProject.year}</span>
                        <span>{activeProject.category}</span>
                      </div>
                    </div>
                  </div>
                  <div className="detail-body">
                    <p>{activeProject.description}</p>
                    {activeProject.highlights.length > 0 && (
                      <ul className="detail-highlights">
                        {activeProject.highlights.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                <div className="detail-footer">
                  <button
                    type="button"
                    className="pager-button"
                    onClick={() => {
                      const index = visibleProjects.findIndex((project) => project.id === activeProject.id);
                      const previous = visibleProjects[(index - 1 + visibleProjects.length) % visibleProjects.length];
                      setActiveId(previous.id);
                    }}
                    aria-label="Previous project"
                  >
                    Previous
                  </button>
                  <button
                    type="button"
                    className="pager-button"
                    onClick={() => {
                      const index = visibleProjects.findIndex((project) => project.id === activeProject.id);
                      const next = visibleProjects[(index + 1) % visibleProjects.length];
                      setActiveId(next.id);
                    }}
                    aria-label="Next project"
                  >
                    Next
                  </button>
                </div>
                </div>
            </motion.aside>
            </>
          ) : null }
        </AnimatePresence>

        <footer className="footer">
          <a href="mailto:hello@vmhieu.com" className="footer-link">
            hello@vmhieu.com
          </a>
          <div className="dock" role="group" aria-label="Portfolio mode">
            <DockButton
              active={mode === "work"}
              label="Work"
              onClick={() => setMode("work")}
              icon={
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M3.75 7.5h16.5a1.5 1.5 0 0 1 1.5 1.5v8.25a1.5 1.5 0 0 1-1.5 1.5H3.75a1.5 1.5 0 0 1-1.5-1.5V9a1.5 1.5 0 0 1 1.5-1.5Z" />
                  <path d="M8.25 7.5v-1.5A2.25 2.25 0 0 1 10.5 3.75h3A2.25 2.25 0 0 1 15.75 6v1.5" />
                </svg>
              }
            />
            <DockButton
              active={mode === "playground"}
              label="Playground"
              onClick={() => setMode("playground")}
              icon={
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M8.25 8.25 4.5 12l3.75 3.75" />
                  <path d="m15.75 8.25 3.75 3.75-3.75 3.75" />
                  <path d="m9.75 19.5 4.5-15" />
                </svg>
              }
            />
          </div>
          <p className="footer-year">© 2026</p>
        </footer>
      </motion.main>
    </LayoutGroup>
  );
}
