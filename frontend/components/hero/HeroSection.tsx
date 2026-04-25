"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Github, Linkedin, Download, Mic } from "lucide-react";
import AnimatedTitle from "./AnimatedTitle";
import MRMonogram from "./MRMonogram";
import StatsBar from "./StatsBar";

export default function HeroSection() {
  return (
    <section className="min-h-screen bg-background pt-20 pb-12 px-4">
      <div className="container mx-auto">
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

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-5xl md:text-7xl font-heading font-bold text-white"
            >
              Mahab Rizwan
            </motion.h1>

            {/* Animated Title */}
            <AnimatedTitle />

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-lg text-muted-foreground max-w-xl"
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
                className="btn-primary flex items-center space-x-2"
              >
                <span>View Projects</span>
              </Link>

              <Link
                href="/cv.pdf"
                target="_blank"
                className="btn-outline flex items-center space-x-2"
              >
                <Download className="w-4 h-4" />
                <span>Download CV</span>
              </Link>

              <Link
                href="#ai-agent"
                className="btn border border-secondary text-secondary hover:bg-secondary hover:text-white flex items-center space-x-2"
              >
                <Mic className="w-4 h-4" />
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
                className="text-muted-foreground hover:text-accent transition-colors duration-300"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </Link>
              <Link
                href="https://linkedin.com/in/mahab-rizwan-831095341"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-accent transition-colors duration-300"
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
