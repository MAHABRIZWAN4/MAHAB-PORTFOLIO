"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"
import { getWork, type Work } from "@/lib/work"

export default function WorkSection() {
  const [work, setWork] = useState<Work | null>(null)
  const [loading, setLoading] = useState(true)
  const [mounted, setMounted] = useState(false)
  const { theme } = useTheme()

  useEffect(() => { setMounted(true) }, [])

  useEffect(() => {
    async function fetchWork() {
      try {
        const data = await getWork()
        setWork(data)
      } finally {
        setLoading(false)
      }
    }
    fetchWork()
  }, [])

  const isDark = mounted && theme === "dark"

  const baseBg = isDark ? "#0a0e18" : "#f8f9fa"
  const borderColor = isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"
  const headingColor = isDark ? "#ffffff" : "#0a0a0a"
  const descColor = isDark ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.7)"

  const scrollToProjects = () => {
    document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  if (loading) {
    return (
      <section
        id="work"
        className="relative py-24 px-4 sm:px-6 lg:px-8"
        style={{ background: baseBg, borderTop: `1px solid ${borderColor}` }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            <div className="flex-1 w-full">
              <div className="h-24 w-48 bg-gray-700 animate-pulse rounded mb-6" />
              <div className="h-28 w-full max-w-md bg-gray-700 animate-pulse rounded mb-8" />
            </div>
            <div className="flex-1 flex justify-center lg:justify-end">
              <div className="w-full max-w-[320px] sm:max-w-[380px] lg:max-w-[440px] aspect-video bg-gray-700 animate-pulse rounded-2xl" />
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (!work) return null

  return (
    <section
      id="work"
      className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
      style={{ background: baseBg, borderTop: `1px solid ${borderColor}` }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-16 xl:gap-20">

          {/* LEFT SIDE */}
          <div className="flex-1 w-full lg:w-auto">
            {/* Heading */}
            <div className="mb-8">
              <div className="overflow-hidden">
                <motion.h2
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
                  className="text-[56px] sm:text-[72px] lg:text-[88px] font-bold tracking-tight"
                  style={{ fontFamily: "Space Grotesk, sans-serif", color: headingColor, lineHeight: 1 }}
                >
                  My
                </motion.h2>
              </div>
              <div className="overflow-hidden mt-[-8px]">
                <motion.h2
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.08, ease: [0.33, 1, 0.68, 1] }}
                  className="text-[56px] sm:text-[72px] lg:text-[88px] font-bold tracking-tight"
                  style={{ fontFamily: "Space Grotesk, sans-serif", color: headingColor, lineHeight: 1 }}
                >
                  Work
                </motion.h2>
              </div>
            </div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-[14px] sm:text-[15px] leading-[1.7] max-w-[480px]"
              style={{ fontFamily: "Inter, sans-serif", color: descColor }}
            >
              {work.description}
            </motion.p>

            {/* ← FEATURED PROJECT / View Project button REMOVED from here */}
          </div>

          {/* RIGHT SIDE - Video + Handwriting annotation */}
          <div className="w-full lg:w-auto lg:self-start">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.33, 1, 0.68, 1] }}
              className="relative w-full sm:w-[400px] md:w-[480px] lg:w-[520px] xl:w-[580px]"
            >
              {/* Glow */}
              <div
                className="absolute inset-0 rounded-2xl opacity-20 blur-3xl"
                style={{ background: "linear-gradient(135deg, #a855f7, #ec4899)", transform: "scale(0.8)" }}
              />
              {/* Border overlay */}
              <div className="absolute inset-0 rounded-2xl" style={{ border: `1px solid ${borderColor}` }} />

              {/* Video */}
              <div className="relative z-10 overflow-hidden rounded-2xl aspect-video">
                <video autoPlay loop muted playsInline className="w-full h-full object-cover">
                  <source src="/work-video.webm" type="video/webm" />
                </video>
              </div>

              {/* ── Handwriting annotation — CLICKABLE, scrolls to #projects ── */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
                onClick={scrollToProjects}
                className="relative z-10 flex items-center gap-3 mt-5 pl-6 cursor-pointer group select-none"
                title="View Projects"
              >
                {/* Downward curved arrow pointing toward the section below */}
                <div className="relative w-14 h-14 flex-shrink-0">
                  <img
                    src="/curved-arrow.png"
                    alt=""
                    className="w-full h-full object-contain opacity-70 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      // flip horizontally + rotate so it curves downward
                      transform: "scaleX(-1) rotate(160deg)",
                      transformOrigin: "center",
                    }}
                  />
                </div>

                {/* Animated handwriting "View Project" */}
                <svg
                  viewBox="0 0 260 60"
                  className="w-[200px] sm:w-[240px]"
                  style={{ overflow: "visible" }}
                >
                  <motion.text
                    x="0" y="44"
                    style={{
                      fontFamily: "'Caveat', cursive",
                      fontSize: "38px",
                      fill: isDark ? "rgba(255,255,255,0.85)" : "#000000",
                      fontWeight: 600,
                    }}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.65 }}
                    className="group-hover:fill-white transition-all duration-300"
                  >
                    View Project
                  </motion.text>

                  {/* Underline scribble */}
                  <motion.path
                    d="M 2 52 Q 80 58 160 50 Q 200 47 240 53"
                    stroke={isDark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.3)"}
                    strokeWidth="1.5"
                    fill="none"
                    strokeLinecap="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 1.0, ease: "easeOut" }}
                  />
                </svg>
              </motion.div>

              <style>{`@import url('https://fonts.googleapis.com/css2?family=Caveat:wght@600&display=swap');`}</style>
            </motion.div>
          </div>

        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
      `}</style>
    </section>
  )
}