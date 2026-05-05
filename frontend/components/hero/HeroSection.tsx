"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Github, Linkedin, Download, Mic } from "lucide-react";
import AnimatedName from "./AnimatedName";
import MRMonogram from "./MRMonogram";
import StatsBar from "./StatsBar";
import { getHero, type Hero } from "@/lib/sanity";
import { useTheme } from "next-themes";

export default function HeroSection() {
  const [heroData, setHeroData] = useState<Hero | null>(null);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    async function fetchHero() {
      try {
        const data = await getHero();
        setHeroData(data);
      } catch (error) {
        console.error("Error fetching hero data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchHero();
  }, []);

  if (loading) {
    return (
      <section className="relative overflow-hidden min-h-screen pt-20 pb-12 px-4" style={{ backgroundColor: "var(--background)" }}>
        <div className="container mx-auto relative z-10 flex items-center justify-center min-h-[calc(100vh-8rem)]">
          <div className="animate-pulse text-center">
            <div className="h-12 bg-gray-300 dark:bg-gray-700 rounded w-64 mx-auto mb-4" />
            <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-48 mx-auto" />
          </div>
        </div>
      </section>
    );
  }

  if (!heroData) {
    return null;
  }

  const isDark = mounted && theme === "dark";

  return (
    <section
      className="relative overflow-hidden min-h-screen pt-20 pb-12 px-4"
      style={{
        background: isDark
          ? "linear-gradient(160deg, #080c18, #0c1220, #101828, #0a0e18)"
          : "#ffffff",
      }}
    >
      {/* Cube Background Image - Full Page */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "url(/hero-bg.png)",
        
          opacity: isDark ? 8.9999 : 0.950,
        }}
      />

      {/* Left Dark Overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          display: isDark ? "block" : "none",
          background: "linear-gradient(90deg, rgba(6,9,18,0.92) 0%, rgba(6,9,18,0.75) 45%, rgba(6,9,18,0.2) 75%, transparent 100%)",
        }}
      />

      {/* Bottom Fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[100px] pointer-events-none"
        style={{
          background: isDark
            ? "linear-gradient(to top, rgba(6,9,18,0.9), transparent)"
            : "linear-gradient(to top, rgba(240,242,248,0.9), transparent)",
        }}
      />

      <div className="container mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 items-center min-h-[calc(100vh-8rem)]">
          {/* LEFT SIDE - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex-1 max-w-[520px] space-y-6 relative"
          >
            {/* Warm Glow Behind Name */}
            <div
              className="absolute pointer-events-none"
              style={{
                display: isDark ? "block" : "none",
                top: "60px",
                left: "-20px",
                width: "420px",
                height: "160px",
                background: "radial-gradient(ellipse, rgba(255,150,40,0.13), transparent)",
                filter: "blur(40px)",
                animation: "glow-pulse 3s ease-in-out infinite",
                zIndex: 0,
              }}
            />

            {/* Available Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 relative z-10"
            >
              <motion.div
                className="w-2 h-2 rounded-full bg-green-500"
                style={{
                  animation: "badge-pulse 2s ease-in-out infinite",
                }}
              />
              <span className="text-sm font-medium text-green-500">
                {heroData.availabilityStatus || "Available for hire"} · {heroData.availabilityYear || "2026"}
              </span>
            </motion.div>

            {/* Animated Name */}
            <div className="relative z-10 ">
              {/* Sun/Light Orb - Behind Name */}
              <div
                className="absolute pointer-events-none bg-blue-950"
                style={{
                  display: isDark ? "block" : "none",
                  top: "20%",
                  left: "20%",
                  transform: "translate(-50%, -50%)",
                  width: "80px",
                  height: "80px",
                  background: "radial-gradient(circle, rgba(255,120,80,0.95) 0%, rgba(255,180,100,0.85) 40%, rgba(255,210,120,0.6) 70%, transparent 100%)",
                  boxShadow: "0 0 80px rgba(255,100,60,0.6), 0 0 150px rgba(255,140,80,0.5), 0 0 250px rgba(255,160,100,0.4), 0 0 400px rgba(255,180,120,0.3)",
                  borderRadius: "50%",
                  animation: "glow-pulse 3s ease-in-out infinite",
                  zIndex: -1,
                }}
              />
              <h1
                className="font-black uppercase tracking-tight leading-[0.9]"
                style={{
                  fontSize: "clamp(52px, 6vw, 80px)",
                  letterSpacing: "-1px",
                  color: isDark ? "#ffffff" : "#0a0a0a",
                  textShadow: isDark
                    ? "0 0 60px rgba(255,255,255,0.06), 0 2px 40px rgba(255,140,40,0.08)"
                    : "0 0 60px rgba(0,0,0,0.03), 0 2px 40px rgba(255,140,40,0.05)",
                  wordBreak: "keep-all",
                }}
              >
                <AnimatedName name={heroData.name} />
              </h1>
            </div>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="font-mono uppercase tracking-[3.5px] leading-[1.9] relative z-10"
              style={{
                fontSize: "10.5px",
                color: isDark ? "rgba(255,255,255,0.38)" : "rgba(0,0,0,0.45)",
              }}
            >
              SOFTWARE ENGINEER, AI-POWERED FULL STACK DEVELOPER.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap gap-4 relative z-10"
            >
              <Link
                href="#projects"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-white transition-all duration-200"
                style={{
                  backgroundColor: "#6366f1",
                  boxShadow: "0 0 24px rgba(99,102,241,0.35)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = "0 0 32px rgba(99,102,241,0.5)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "0 0 24px rgba(99,102,241,0.35)";
                }}
              >
                <span>View Projects</span>
              </Link>

              <a
                href={heroData.cvFile?.asset?.url || "/CV_MAHAB_RIZWAN.pdf"}
                download="CV_Mahab_Rizwan.pdf"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg transition-all duration-200"
                style={{
                  backgroundColor: "transparent",
                  border: "1px solid rgba(255,255,255,0.18)",
                  color: isDark ? "#ffffff" : "#0a0a0a",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = isDark ? "#ffffff" : "#0a0a0a";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.18)";
                }}
              >
                <Download size={16} />
                <span>Download CV</span>
              </a>

              <Link
                href="#ai-agent"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg transition-all duration-200"
                style={{
                  backgroundColor: "transparent",
                  border: "1px solid rgba(20,184,166,0.28)",
                  color: "#14b8a6",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#14b8a6";
                  e.currentTarget.style.color = "white";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color = "#14b8a6";
                }}
              >
                <Mic size={16} />
                <span>Talk to AI Agent</span>
              </Link>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex items-center space-x-3 pt-4 relative z-10"
            >
              <Link
                href={heroData.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono uppercase tracking-[1px] transition-colors duration-300"
                style={{
                  fontSize: "11px",
                  color: isDark ? "rgba(255,255,255,0.28)" : "rgba(0,0,0,0.35)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = isDark ? "#ffffff" : "#0a0a0a";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = isDark ? "rgba(255,255,255,0.28)" : "rgba(0,0,0,0.35)";
                }}
              >
                GitHub
              </Link>
              <span style={{ color: isDark ? "rgba(255,255,255,0.28)" : "rgba(0,0,0,0.35)" }}>|</span>
              <Link
                href={heroData.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono uppercase tracking-[1px] transition-colors duration-300"
                style={{
                  fontSize: "11px",
                  color: isDark ? "rgba(255,255,255,0.28)" : "rgba(0,0,0,0.35)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = isDark ? "#ffffff" : "#0a0a0a";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = isDark ? "rgba(255,255,255,0.28)" : "rgba(0,0,0,0.35)";
                }}
              >
                LinkedIn
              </Link>
            </motion.div>
          </motion.div>

          {/* RIGHT SIDE - MR Monogram */}
          <div className="hidden lg:flex items-center justify-center flex-1">
            <MRMonogram />
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center space-y-2 z-10"
        >
          <div
            className="w-[26px] h-[42px] rounded-full flex items-start justify-center pt-2"
            style={{
              border: "1px solid rgba(255,255,255,0.12)",
            }}
          >
            <div
              className="w-1 h-2 rounded-full bg-white"
              style={{
                animation: "scroll-bounce 2s ease-in-out infinite",
                opacity: 0.5,
              }}
            />
          </div>
          <span
            className="font-mono uppercase tracking-[2px]"
            style={{
              fontSize: "9px",
              color: "rgba(255,255,255,0.2)",
            }}
          >
            SCROLL
          </span>
        </motion.div>

        {/* Stats Bar */}
        <StatsBar stats={heroData.stats} />
      </div>
    </section>
  );
}
