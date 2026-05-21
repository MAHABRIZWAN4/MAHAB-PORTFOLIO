"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { getSkills, type Skill } from "@/lib/skills";

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

  useEffect(() => {
    getSkills().then(setSkills);
  }, []);

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
    <section id="skills" className="py-20 px-6 md:px-12 lg:px-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-[860px] mx-auto"
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

        {/* Terminal Window */}
        <div className="bg-[#0d1117] border border-white/[0.12] rounded-xl overflow-hidden shadow-2xl">
          {/* Title Bar */}
          <div className="bg-[#161b22] px-4 py-3 flex items-center justify-between border-b border-white/[0.08]">
            <div className="flex items-center gap-2">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                <div className="w-3 h-3 rounded-full bg-[#28c840]" />
              </div>
              <span className="hidden md:block text-[11px] font-mono text-white/60 ml-2">
                mahab@portfolio — skills.sh
              </span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={runAll}
                disabled={isAnimating}
                className="px-3 py-1 text-[11px] font-mono text-white/70 hover:text-white hover:bg-white/[0.08] rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                run all
              </button>
              <button
                onClick={clearTerminal}
                disabled={isAnimating}
                className="px-3 py-1 text-[11px] font-mono text-white/70 hover:text-white hover:bg-white/[0.08] rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                clear
              </button>
            </div>
          </div>

          {/* Category Buttons */}
          <div className="bg-[#161b22] px-4 py-2 flex flex-wrap gap-2 border-b border-white/[0.08]">
            {skills.map((skill) => (
              <button
                key={skill._id}
                onClick={() => animateCategory(skill)}
                disabled={isAnimating}
                className={`px-3 py-1 text-[11px] font-mono rounded transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                  activeCategory === skill.category
                    ? "text-white bg-white/[0.08]"
                    : "text-white/60 hover:text-white hover:bg-white/[0.05]"
                }`}
              >
                {skill.categoryLabel}
              </button>
            ))}
          </div>

          {/* Terminal Output */}
          <div
            ref={terminalRef}
            className="p-4 min-h-[320px] max-h-[500px] overflow-y-auto font-mono text-[13px] leading-[1.8] scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent"
          >
            {terminalLines.map((line, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.25 }}
                style={{ color: line.color || "rgba(255,255,255,0.7)" }}
                className={line.type === "summary" ? "ml-2" : ""}
              >
                {line.text}
                {line.type === "cursor" && (
                  <span className="inline-block w-2 h-4 bg-[#4ade80] ml-1 animate-pulse" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
