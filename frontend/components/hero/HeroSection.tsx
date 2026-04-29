"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Github, Linkedin, Download, Mic } from "lucide-react";
import AnimatedTitle from "./AnimatedTitle";
import AnimatedName from "./AnimatedName";
import TechPills from "./TechPills";
import AmbientBackground from "./AmbientBackground";
import MRMonogram from "./MRMonogram";
import StatsBar from "./StatsBar";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden min-h-screen pt-20 pb-12 px-4" style={{ backgroundColor: "var(--background)" }}>
      <AmbientBackground />
      <div className="container mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-8rem)]">
          {/* LEFT SIDE - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {/* Available Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20"
            >
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [1, 0.5, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="w-2 h-2 rounded-full bg-green-500"
              />
              <span className="text-sm font-medium text-green-500">
                Available for hire · 2026
              </span>
            </motion.div>

            {/* Animated Name */}
            <AnimatedName />

            {/* Tech Pills */}
            <TechPills />

            {/* Animated Title */}
            <AnimatedTitle />

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-lg max-w-xl"
              style={{ color: "var(--foreground-muted)" }}
            >
              From Karachi, Pakistan — building scalable AI-powered web
              applications.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              <Link
                href="#projects"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-white transition-all duration-200"
                style={{ backgroundColor: "var(--accent)" }}
              >
                <span>View Projects</span>
              </Link>

              <a
                href="/CV_MAHAB_RIZWAN.pdf"
                download="CV_Mahab_Rizwan.pdf"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border transition-all duration-200"
                style={{
                  borderColor: "var(--border)",
                  color: "var(--foreground)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--accent)";
                  e.currentTarget.style.color = "var(--accent)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--border)";
                  e.currentTarget.style.color = "var(--foreground)";
                }}
              >
                <Download size={16} />
                <span>Download CV</span>
              </a>

              <Link
                href="#ai-agent"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border transition-all duration-200"
                style={{
                  borderColor: "var(--accent-teal)",
                  color: "var(--accent-teal)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "var(--accent-teal)";
                  e.currentTarget.style.color = "white";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color = "var(--accent-teal)";
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
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex items-center space-x-4 pt-4"
            >
              <Link
                href="https://github.com/MAHABRIZWAN4"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors duration-300"
                style={{ color: "var(--foreground-muted)" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "var(--accent)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "var(--foreground-muted)";
                }}
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </Link>
              <Link
                href="https://linkedin.com/in/mahab-rizwan-831095341"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors duration-300"
                style={{ color: "var(--foreground-muted)" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "var(--accent)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "var(--foreground-muted)";
                }}
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </Link>
            </motion.div>
          </motion.div>

          {/* RIGHT SIDE - MR Monogram */}
          <div className="hidden lg:flex items-center justify-center">
            <MRMonogram />
          </div>
        </div>

        {/* Stats Bar */}
        <StatsBar />
      </div>
    </section>
  );
}
