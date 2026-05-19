"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { getProjects, getProjectsConfig, type Project, type ProjectsConfig, urlFor } from "@/lib/sanity";

// Default fallbacks
const defaultCategories = ["All", "AI", "Full Stack", "Backend", "Web3"];
const defaultCategoryColors: Record<string, { accent: string; glow: string; tag: string }> = {
  AI:           { accent: "#00ff9d", glow: "rgba(0,255,157,0.15)", tag: "rgba(0,255,157,0.12)" },
  "Full Stack": { accent: "#00c8ff", glow: "rgba(0,200,255,0.15)", tag: "rgba(0,200,255,0.12)" },
  Backend:      { accent: "#ff6b35", glow: "rgba(255,107,53,0.15)", tag: "rgba(255,107,53,0.12)" },
  Web3:         { accent: "#bf5af2", glow: "rgba(191,90,242,0.15)", tag: "rgba(191,90,242,0.12)" },
  All:          { accent: "#00ff9d", glow: "rgba(0,255,157,0.10)", tag: "rgba(0,255,157,0.10)" },
};

function HackerCard({
  project,
  index,
  categoryColors
}: {
  project: Project;
  index: number;
  categoryColors: Record<string, { accent: string; glow: string; tag: string }>;
}) {
  const [hovered, setHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();

  const cat = project.category || "AI";
  const colors = categoryColors[cat] || categoryColors["AI"];

  // Parallax on image inside card
  const parallaxY = useTransform(scrollY, [0, 1000], [0, -40]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width - 0.5) * 20,
      y: ((e.clientY - rect.top) / rect.height - 0.5) * 20,
    });
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        opacity: { duration: 0.6, delay: index * 0.1, ease: [0.33, 1, 0.68, 1] },
        y: { duration: 0.6, delay: index * 0.1, ease: [0.33, 1, 0.68, 1] },
        default: { type: "spring", stiffness: 300, damping: 25 }
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setMousePos({ x: 0, y: 0 }); }}
      animate={{
        rotateX: hovered ? -mousePos.y * 0.3 : 0,
        rotateY: hovered ? mousePos.x * 0.3 : 0,
        y: hovered ? -8 : 0,
        scale: hovered ? 1.02 : 1,
      }}
      style={{ transformStyle: "preserve-3d", perspective: 1000 }}
      className="relative group cursor-pointer"
    >
      {/* Glow halo on hover */}
      <motion.div
        className="absolute -inset-px rounded-xl pointer-events-none z-0"
        animate={{
          opacity: hovered ? 1 : 0,
          boxShadow: hovered
            ? `0 0 40px ${colors.glow}, 0 0 80px ${colors.glow}, inset 0 0 40px ${colors.glow}`
            : "none",
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Card body — glassmorphism */}
      <div
        className="relative z-10 rounded-xl overflow-hidden h-full flex flex-col bg-white/90 dark:bg-[rgba(10,14,24,0.75)] backdrop-blur-xl"
        style={{
          border: `1px solid ${hovered ? colors.accent + "55" : "var(--card-border)"}`,
          transition: "border-color 0.3s ease",
        }}
      >
        {/* ── Image with parallax ── */}
        <div className="relative h-48 overflow-hidden">
          <motion.div
            ref={imageRef}
            style={{ y: parallaxY, scale: 1.15 }}
            className="absolute inset-0"
            animate={{
              filter: hovered ? "blur(8px)" : "blur(0px)",
            }}
            transition={{ duration: 0.3 }}
          >
            {project.coverImage?.asset ? (
              <img
                src={urlFor(project.coverImage).url()}
                alt={project.coverImage.alt || project.title}
                className="w-full h-full object-cover"
              />
            ) : (
              /* Fallback: animated terminal grid */
              <div
                className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 dark:from-[#0a0e18] dark:to-[#0f1520]"
              >
                <svg width="100%" height="100%" className="absolute inset-0 opacity-10">
                  <defs>
                    <pattern id={`grid-${index}`} width="30" height="30" patternUnits="userSpaceOnUse">
                      <path d="M 30 0 L 0 0 0 30" fill="none" stroke={colors.accent} strokeWidth="0.5"/>
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill={`url(#grid-${index})`} />
                </svg>
                <span style={{ fontFamily: "monospace", color: colors.accent, fontSize: "2rem", opacity: 0.4 }}>
                  {"</>"}
                </span>
              </div>
            )}
          </motion.div>

          {/* Scanline overlay */}
          <div
            className="absolute inset-0 pointer-events-none opacity-30 dark:opacity-100"
            style={{
              background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.08) 2px, rgba(0,0,0,0.08) 4px)",
            }}
          />

          {/* Hover overlay — tech stack */}
          <AnimatePresence>
            {hovered && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0 flex flex-col justify-center items-center gap-2 p-4 backdrop-blur-sm bg-white/80 dark:bg-[rgba(10,14,24,0.85)]"
              >
                <p
                  className="text-[10px] uppercase tracking-widest mb-2 opacity-70"
                  style={{ fontFamily: "monospace", color: colors.accent }}
                >
                  // tech stack
                </p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {(project.techStack || []).map((tech: string, i: number) => (
                    <motion.span
                      key={tech}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.05 }}
                      className="px-2 py-0.5 rounded text-[11px] font-semibold"
                      style={{
                        fontFamily: "monospace",
                        color: colors.accent,
                        background: colors.tag,
                        border: `1px solid ${colors.accent}44`,
                      }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ── Card content ── */}
        <div className="flex-1 flex flex-col p-5 gap-3">
          {/* Category badge */}
          <div className="flex items-center gap-2 mb-1">
            <span
              className="px-2 py-0.5 rounded text-[10px] font-bold tracking-widest uppercase w-fit"
              style={{
                fontFamily: "monospace",
                color: colors.accent,
                background: colors.tag,
                border: `1px solid ${colors.accent}33`,
              }}
            >
              {project.category || "PROJECT"}
            </span>
          </div>

          {/* Terminal prompt line */}
          <div className="flex items-center gap-2">
            <span style={{ color: colors.accent, fontFamily: "monospace", fontSize: "12px" }}>❯</span>
            <h3
              className="text-[15px] font-bold tracking-tight truncate text-gray-900 dark:text-gray-100"
              style={{ fontFamily: "monospace" }}
            >
              {project.title}
            </h3>
          </div>

          <p
            className="text-[13px] leading-relaxed flex-1 line-clamp-3 text-gray-600 dark:text-gray-400"
            style={{ fontFamily: "monospace" }}
          >
            {project.description}
          </p>

          {/* Divider */}
          <div className="h-px w-full bg-gradient-to-r from-gray-300 dark:from-[var(--accent)]/20 to-transparent" />

          {/* Explore button */}
          <motion.a
            href={project.liveUrl || project.githubUrl || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="group/btn flex items-center gap-2 w-fit"
            whileHover={{ x: 4 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            onClick={(e) => e.stopPropagation()}
          >
            <span
              className="text-[12px] font-bold tracking-widest uppercase"
              style={{ fontFamily: "monospace", color: colors.accent }}
            >
              Explore Project
            </span>
            {/* Animated arrow */}
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 1.5 }}
              style={{ color: colors.accent, display: "inline-block" }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.span>
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
}

export default function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [typedText, setTypedText] = useState("");

  // Sanity config state
  const [config, setConfig] = useState<ProjectsConfig | null>(null);
  const [categories, setCategories] = useState<string[]>(defaultCategories);
  const [categoryColors, setCategoryColors] = useState(defaultCategoryColors);

  const fullText = config?.sectionHeading || "Featured Projects";

  // Fetch projects config
  useEffect(() => {
    async function fetchConfig() {
      try {
        const data = await getProjectsConfig();
        if (data) {
          setConfig(data);

          // Build categories array with "All" first
          const cats = ["All", ...data.categories.map(c => c.name)];
          setCategories(cats);

          // Build categoryColors object
          const colors: Record<string, { accent: string; glow: string; tag: string }> = {
            All: { accent: data.categories[0]?.accentColor || "#00ff9d", glow: data.categories[0]?.glowColor || "rgba(0,255,157,0.10)", tag: data.categories[0]?.tagColor || "rgba(0,255,157,0.10)" },
          };

          data.categories.forEach(cat => {
            colors[cat.name] = {
              accent: cat.accentColor,
              glow: cat.glowColor,
              tag: cat.tagColor,
            };
          });

          setCategoryColors(colors);
        }
      } catch (error) {
        console.error("Error fetching projects config:", error);
      }
    }
    fetchConfig();
  }, []);

  // Typing animation for heading
  useEffect(() => {
    let i = 0;
    setTypedText("");
    const interval = setInterval(() => {
      if (i < fullText.length) {
        setTypedText(fullText.slice(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
      }
    }, 60);
    return () => clearInterval(interval);
  }, [fullText]);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const data = await getProjects();
        setProjects(data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProjects();
  }, []);

  const filteredProjects =
    activeFilter === "All"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  const colors = categoryColors[activeFilter] || categoryColors["All"];

  return (
    <section
      id="projects"
      className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
      style={{ backgroundColor: "var(--background)" }}
    >
      {/* Background: terminal grid + noise */}
      <div className="absolute inset-0 pointer-events-none">
        <svg width="100%" height="100%" className="opacity-[0.03] dark:opacity-[0.03]">
          <defs>
            <pattern id="bg-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-gray-400 dark:text-[#00ff9d]"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#bg-grid)" />
        </svg>
        {/* Ambient glow blobs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-5 blur-3xl bg-teal-400 dark:bg-[#00ff9d]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full opacity-5 blur-3xl bg-cyan-400 dark:bg-[#00c8ff]" />
      </div>

      <div className="container mx-auto relative z-10">

        {/* ── Section Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          {/* Terminal path label */}
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-2 h-2 rounded-full bg-red-500" />
            <div className="w-2 h-2 rounded-full bg-yellow-400" />
            <div className="w-2 h-2 rounded-full bg-green-400" />
            <span
              className="ml-3 text-[11px] tracking-widest uppercase text-gray-400 dark:text-gray-600"
              style={{ fontFamily: "monospace" }}
            >
              {config?.terminalPath || "~/portfolio/projects"}
            </span>
          </div>

          {/* Typed heading */}
          <h2
            className="text-4xl md:text-5xl font-bold mb-4 inline-flex items-center gap-1 text-gray-900 dark:text-gray-100"
            style={{ fontFamily: "monospace", letterSpacing: "-0.02em" }}
          >
            <span style={{ color: colors.accent, marginRight: "8px" }}>_</span>
            {typedText}
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              style={{ color: colors.accent, marginLeft: "2px" }}
            >
              |
            </motion.span>
          </h2>

          <p
            className="text-[14px] max-w-xl mx-auto leading-relaxed text-gray-500 dark:text-gray-400"
            style={{ fontFamily: "monospace" }}
          >
            {config?.sectionDescription || "// A showcase of work in AI, full-stack, and backend engineering"}
          </p>
        </motion.div>

        {/* ── Filter Tabs ── */}
        <div className="flex justify-center mb-10">
          <div
            className="flex gap-1 p-1 rounded-lg bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10"
          >
            {categories.map((cat) => {
              const isActive = activeFilter === cat;
              const c = categoryColors[cat] || categoryColors["All"];
              return (
                <motion.button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-1.5 rounded-md text-[12px] font-bold tracking-widest uppercase transition-all duration-200 relative overflow-hidden"
                  style={{
                    fontFamily: "monospace",
                    color: isActive ? c.accent : "var(--foreground-muted)",
                    background: isActive ? c.tag : "transparent",
                    border: isActive ? `1px solid ${c.accent}44` : "1px solid transparent",
                  }}
                >
                  {isActive && (
                    <motion.span
                      layoutId="filter-pill"
                      className="absolute inset-0 rounded-md"
                      style={{ background: c.tag }}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{cat}</span>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* ── Loading Skeleton ── */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="rounded-xl overflow-hidden animate-pulse bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10"
                style={{ height: "360px" }}
              >
                <div className="h-48 bg-gray-200 dark:bg-white/10" />
                <div className="p-5 space-y-3">
                  <div className="h-3 bg-gray-200 dark:bg-white/10 rounded w-3/4" />
                  <div className="h-3 bg-gray-200 dark:bg-white/10 rounded w-1/2" />
                  <div className="h-16 bg-gray-200 dark:bg-white/10 rounded" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── Empty State ── */}
        {!loading && projects.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-400 dark:text-gray-500 text-[14px]" style={{ fontFamily: "monospace" }}>
              {"// no projects found"}
            </p>
          </div>
        )}

        {/* ── Projects Grid ── */}
        {!loading && projects.length > 0 && (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project._id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <HackerCard project={project} index={index} categoryColors={categoryColors} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600;700&display=swap');
      `}</style>
    </section>
  );
}