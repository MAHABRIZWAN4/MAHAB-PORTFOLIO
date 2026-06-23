"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { getSkills, type Skill } from "@/lib/skills";
import ScrollToNextButton from "../ui/ScrollToNextButton";

// Floating code particles data
const codeSymbols = [
  "{ }", "< >", "=>", "( )", "[ ]", "//", "/**/", ";", "&&", "||",
  "fn", "def", "class", "import", "export", "const", "let", "var",
  "async", "await", "return", "if", "else", "for", "while", "map",
  "filter", "reduce", "useState", "useEffect", "interface", "type",
  "public", "private", "static", "void", "int", "string", "bool",
  "try", "catch", "throw", "new", "this", "self", "super", "extends",
  "implements", "enum", "struct", "trait", "mut", "ref", "match",
  "lambda", "yield", "with", "as", "from", "require", "module",
  "package", "namespace", "using", "include", "define", "typedef",
  "===", "!==", ">=", "<=", "++", "--", "+=", "-=", "*=", "/=",
  "...", "?.", "??", "?:", "<T>", "@", "#", "$", "`", "~",
  "null", "undefined", "true", "false", "None", "nil", "NaN",
  "Array", "Object", "Map", "Set", "Promise", "Observable",
  "React", "Vue", "Angular", "Next", "Node", "Deno", "Bun",
  "Python", "Rust", "Go", "Java", "C++", "Swift", "Kotlin",
  "API", "HTTP", "REST", "GraphQL", "SQL", "NoSQL", "Redis",
  "Docker", "K8s", "AWS", "GCP", "Azure", "CI/CD", "Git"
];

export default function SkillsSection() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [terminalLines, setTerminalLines] = useState<Array<{ text: string; color?: string; type?: string }>>([
    { text: "mahab@portfolio:~$ ./install-skills.sh", color: "#4ade80" },
    { text: "Press \"run all\" or a category to start...", color: "rgba(255,255,255,0.55)" },
    { text: "mahab@portfolio:~$ ", color: "#4ade80", type: "cursor" },
  ]);
  const [isAnimating, setIsAnimating] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Mouse parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { damping: 20, stiffness: 100 });
  const smoothMouseY = useSpring(mouseY, { damping: 20, stiffness: 100 });

  useEffect(() => {
    getSkills().then(setSkills);
  }, []);

  // Track mouse movement for parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      mouseX.set((e.clientX - centerX) / 25);
      mouseY.set((e.clientY - centerY) / 25);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const scrollToBottom = () => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  };

  const animateCategory = async (skill: Skill) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveCategory(skill.category);

    const newLines: Array<{ text: string; color?: string; type?: string }> = [];

    // Command line
    newLines.push({ text: `mahab@portfolio:~$ ${skill.command}`, color: "#4ade80" });
    setTerminalLines((prev) => [...prev.filter((l) => l.type !== "cursor"), ...newLines]);
    await new Promise((resolve) => setTimeout(resolve, 320));
    scrollToBottom();

    // Installing message
    newLines.push({ text: `» Installing ${skill.categoryLabel} skills...`, color: skill.color });
    setTerminalLines((prev) => [...prev, newLines[newLines.length - 1]]);
    await new Promise((resolve) => setTimeout(resolve, 320));
    scrollToBottom();

    // Each item
    for (const item of skill.items) {
      newLines.push({ text: `  installing ${item.pkg}...`, color: "rgba(255,255,255,0.7)" });
      setTerminalLines((prev) => [...prev, newLines[newLines.length - 1]]);
      await new Promise((resolve) => setTimeout(resolve, 320));
      scrollToBottom();
    }

    // Success summary
    newLines.push({ text: `✓ ${skill.items.length} skills installed successfully`, color: "#4ade80" });
    setTerminalLines((prev) => [...prev, newLines[newLines.length - 1]]);
    await new Promise((resolve) => setTimeout(resolve, 200));
    scrollToBottom();

    for (const item of skill.items) {
      newLines.push({
        text: `  + ${item.pkg} — ${item.note}`,
        color: "rgba(255,255,255,0.55)",
        type: "summary"
      });
      setTerminalLines((prev) => [...prev, {
        text: `  + ${item.pkg} — ${item.note}`,
        color: "rgba(255,255,255,0.55)",
        type: "summary"
      }]);
      await new Promise((resolve) => setTimeout(resolve, 150));
      scrollToBottom();
    }

    // Add cursor back
    setTerminalLines((prev) => [...prev, { text: "mahab@portfolio:~$ ", color: "#4ade80", type: "cursor" }]);
    setIsAnimating(false);
    setActiveCategory(null);
    scrollToBottom();
  };

  const runAll = async () => {
    if (isAnimating) return;
    setIsAnimating(true);

    // Clear and start fresh
    setTerminalLines([]);
    await new Promise((resolve) => setTimeout(resolve, 100));

    for (const skill of skills) {
      await animateCategoryInline(skill);
    }

    // Final message
    setTerminalLines((prev) => [
      ...prev.filter((l) => l.type !== "cursor"),
      { text: "mahab@portfolio: all skills loaded. ready to build.", color: "#4ade80" },
      { text: "mahab@portfolio:~$ ", color: "#4ade80", type: "cursor" },
    ]);
    setIsAnimating(false);
    scrollToBottom();
  };

  const animateCategoryInline = async (skill: Skill) => {
    const newLines: Array<{ text: string; color?: string; type?: string }> = [];

    newLines.push({ text: `mahab@portfolio:~$ ${skill.command}`, color: "#4ade80" });
    setTerminalLines((prev) => [...prev.filter((l) => l.type !== "cursor"), ...newLines]);
    await new Promise((resolve) => setTimeout(resolve, 320));
    scrollToBottom();

    newLines.push({ text: `» Installing ${skill.categoryLabel} skills...`, color: skill.color });
    setTerminalLines((prev) => [...prev, newLines[newLines.length - 1]]);
    await new Promise((resolve) => setTimeout(resolve, 320));
    scrollToBottom();

    for (const item of skill.items) {
      newLines.push({ text: `  installing ${item.pkg}...`, color: "rgba(255,255,255,0.7)" });
      setTerminalLines((prev) => [...prev, newLines[newLines.length - 1]]);
      await new Promise((resolve) => setTimeout(resolve, 320));
      scrollToBottom();
    }

    newLines.push({ text: `✓ ${skill.items.length} skills installed successfully`, color: "#4ade80" });
    setTerminalLines((prev) => [...prev, newLines[newLines.length - 1]]);
    await new Promise((resolve) => setTimeout(resolve, 200));
    scrollToBottom();

    for (const item of skill.items) {
      setTerminalLines((prev) => [...prev, {
        text: `  + ${item.pkg} — ${item.note}`,
        color: "rgba(255,255,255,0.55)",
        type: "summary"
      }]);
      await new Promise((resolve) => setTimeout(resolve, 150));
      scrollToBottom();
    }
  };

  const clearTerminal = () => {
    if (isAnimating) return;
    setTerminalLines([
      { text: "mahab@portfolio:~$ ./install-skills.sh", color: "#4ade80" },
      { text: "Press \"run all\" or a category to start...", color: "rgba(255,255,255,0.55)" },
      { text: "mahab@portfolio:~$ ", color: "#4ade80", type: "cursor" },
    ]);
    setActiveCategory(null);
  };

  return (
    <section id="skills" className="py-20 px-6 md:px-12 lg:px-20 relative overflow-hidden bg-gray-50 dark:bg-background" ref={sectionRef}>
      {/* Animated Gradient Mesh Background - Different for light/dark mode */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Light Mode Gradient */}
        <motion.div
          animate={{
            background: [
              "radial-gradient(circle at 20% 30%, rgba(199, 210, 254, 0.4) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(233, 213, 255, 0.4) 0%, transparent 50%), radial-gradient(circle at 50% 50%, rgba(191, 219, 254, 0.3) 0%, transparent 50%)",
              "radial-gradient(circle at 80% 20%, rgba(233, 213, 255, 0.4) 0%, transparent 50%), radial-gradient(circle at 20% 80%, rgba(199, 210, 254, 0.4) 0%, transparent 50%), radial-gradient(circle at 50% 50%, rgba(191, 219, 254, 0.3) 0%, transparent 50%)",
              "radial-gradient(circle at 50% 80%, rgba(191, 219, 254, 0.4) 0%, transparent 50%), radial-gradient(circle at 50% 20%, rgba(233, 213, 255, 0.4) 0%, transparent 50%), radial-gradient(circle at 50% 50%, rgba(199, 210, 254, 0.3) 0%, transparent 50%)",
              "radial-gradient(circle at 20% 30%, rgba(199, 210, 254, 0.4) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(233, 213, 255, 0.4) 0%, transparent 50%), radial-gradient(circle at 50% 50%, rgba(191, 219, 254, 0.3) 0%, transparent 50%)",
            ],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute inset-0 opacity-100 dark:opacity-0"
        />

        {/* Dark Mode Gradient */}
        <motion.div
          animate={{
            background: [
              "radial-gradient(circle at 20% 30%, rgba(99, 102, 241, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(168, 85, 247, 0.15) 0%, transparent 50%), radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 80% 20%, rgba(168, 85, 247, 0.15) 0%, transparent 50%), radial-gradient(circle at 20% 80%, rgba(99, 102, 241, 0.15) 0%, transparent 50%), radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 50% 80%, rgba(59, 130, 246, 0.15) 0%, transparent 50%), radial-gradient(circle at 50% 20%, rgba(168, 85, 247, 0.15) 0%, transparent 50%), radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 20% 30%, rgba(99, 102, 241, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(168, 85, 247, 0.15) 0%, transparent 50%), radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)",
            ],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute inset-0 opacity-0 dark:opacity-60"
        />
      </div>

      {/* Floating Code Particles - Optimized for both modes */}
      <div className="absolute inset-0 pointer-events-none">
        {codeSymbols.map((symbol, i) => {
          const colors = ["#a78bfa", "#34d399", "#fb923c", "#60a5fa", "#f472b6"];
          const color = colors[i % colors.length];
          return (
            <motion.div
              key={i}
              className="absolute font-mono text-sm font-semibold"
              style={{
                left: `${(i * 7) % 100}%`,
                top: `${(i * 13) % 100}%`,
                color: color,
                textShadow: `0 0 10px ${color}`,
              }}
              animate={{
                y: [0, -30, 0],
                x: [0, Math.sin(i) * 20, 0],
                rotate: [0, 360],
                opacity: [0.25, 0.45, 0.25],
              }}
              transition={{
                duration: 8 + (i % 5),
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.2,
              }}
            >
              {symbol}
            </motion.div>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-[860px] mx-auto relative z-10"
      >
        {/* Section Header */}
        <div className="mb-12 text-center">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground mb-3"
          >
            TECHNICAL PROFICIENCY
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold mb-4 text-foreground"
          >
            Skills & Expertise
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 60 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="h-1 bg-indigo-500 mx-auto rounded-full"
          />
        </div>

        {/* Terminal Window with Holographic Effect */}
        <motion.div
          className="relative"
        >
          {/* Holographic Glow Layers - Adjusted for both modes */}
          <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-xl opacity-20 dark:opacity-20 blur-xl animate-pulse" />
          <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 rounded-xl opacity-25 dark:opacity-30 blur-lg" />

          {/* RGB Chromatic Aberration Effect */}
          <div className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none">
            <div className="absolute inset-0 bg-red-500/5 translate-x-[1px]" />
            <div className="absolute inset-0 bg-blue-500/5 -translate-x-[1px]" />
          </div>

          {/* Terminal adapts to theme */}
          <div className="relative bg-white dark:bg-[#0d1117] border border-gray-200 dark:border-white/[0.12] rounded-xl overflow-hidden shadow-2xl backdrop-blur-sm">
            {/* Title Bar with Enhanced Glow */}
            <div className="bg-gray-100 dark:bg-[#161b22] px-4 py-3 flex items-center justify-between border-b border-gray-200 dark:border-white/[0.08] relative">
              <div className="flex items-center gap-2">
                <div className="flex gap-2">
                  <motion.div
                    className="w-3 h-3 rounded-full bg-[#ff5f57]"
                    animate={{ boxShadow: ["0 0 5px #ff5f57", "0 0 10px #ff5f57", "0 0 5px #ff5f57"] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <motion.div
                    className="w-3 h-3 rounded-full bg-[#febc2e]"
                    animate={{ boxShadow: ["0 0 5px #febc2e", "0 0 10px #febc2e", "0 0 5px #febc2e"] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                  />
                  <motion.div
                    className="w-3 h-3 rounded-full bg-[#28c840]"
                    animate={{ boxShadow: ["0 0 5px #28c840", "0 0 10px #28c840", "0 0 5px #28c840"] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
                  />
                </div>
                <span className="hidden md:block text-[11px] font-mono text-gray-600 dark:text-white/60 ml-2">
                  mahab@portfolio — skills.sh
                </span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={runAll}
                  disabled={isAnimating}
                  className="px-3 py-1 text-[11px] font-mono text-gray-600 dark:text-white/70 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-white/[0.08] rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  run all
                </button>
                <button
                  onClick={clearTerminal}
                  disabled={isAnimating}
                  className="px-3 py-1 text-[11px] font-mono text-gray-600 dark:text-white/70 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-white/[0.08] rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  clear
                </button>
              </div>
            </div>

            {/* Category Buttons with Glow */}
            <div className="bg-gray-100 dark:bg-[#161b22] px-4 py-2 flex flex-wrap gap-2 border-b border-gray-200 dark:border-white/[0.08]">
              {skills.map((skill) => (
                <motion.button
                  key={skill._id}
                  onClick={() => animateCategory(skill)}
                  disabled={isAnimating}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-3 py-1 text-[11px] font-mono rounded transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                    activeCategory === skill.category
                      ? "text-gray-900 dark:text-white bg-gray-200 dark:bg-white/[0.08]"
                      : "text-gray-600 dark:text-white/60 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200/50 dark:hover:bg-white/[0.05]"
                  }`}
                  style={{
                    boxShadow: activeCategory === skill.category ? `0 0 15px ${skill.color}40` : "none",
                  }}
                >
                  {skill.categoryLabel}
                </motion.button>
              ))}
            </div>

            {/* Terminal Output with Enhanced Cursor */}
            <div
              ref={terminalRef}
              className="p-4 min-h-[320px] max-h-[500px] overflow-y-auto font-mono text-[13px] leading-[1.8] scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-white/10 scrollbar-track-transparent bg-white dark:bg-[#0d1117]"
            >
              {terminalLines.map((line, index) => {
                // Determine text color based on theme
                let textColor = line.color;

                // If no specific color, use default text color
                if (!textColor || textColor === "rgba(255,255,255,0.7)") {
                  textColor = "inherit"; // Will use the div's text color
                } else if (textColor === "rgba(255,255,255,0.55)") {
                  textColor = "inherit"; // Will use muted color
                }

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.25 }}
                    style={{
                      color: textColor,
                    }}
                    className={`${line.type === "summary" ? "ml-2 text-gray-600 dark:text-white/55" : "text-gray-800 dark:text-white/70"}`}
                  >
                    {line.text}
                    {line.type === "cursor" && (
                      <motion.span
                        className="inline-block w-2 h-4 bg-[#4ade80] ml-1"
                        animate={{
                          opacity: [1, 0.3, 1],
                          boxShadow: ["0 0 5px #4ade80", "0 0 15px #4ade80", "0 0 5px #4ade80"],
                        }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      />
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll to Next Section Button */}
      <ScrollToNextButton nextSectionId="projects" />
    </section>
  );
}
