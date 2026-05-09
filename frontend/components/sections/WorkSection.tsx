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

  useEffect(() => {
    setMounted(true)
  }, [])

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
  const labelColor = isDark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)"

  if (loading) {
    return (
      <section
        id="work"
        className="relative py-24 px-4 sm:px-6 lg:px-8"
        style={{
          background: baseBg,
          borderTop: `1px solid ${borderColor}`,
        }}
      >
        <div className="max-w-7xl mx-auto bg-green-500">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            <div className="flex-1 w-full">
              <div className="h-24 w-48 bg-gray-700 animate-pulse rounded mb-6" />
              <div className="h-28 w-full max-w-md bg-gray-700 animate-pulse rounded mb-8" />
              <div className="h-12 w-40 bg-gray-700 animate-pulse rounded" />
            </div>
            <div className="flex-1 flex justify-center lg:justify-end">
              <div className="w-full max-w-[320px] sm:max-w-[380px] lg:max-w-[440px] aspect-square bg-gray-700 animate-pulse rounded-2xl" />
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (!work) {
    return null
  }

  return (
    <section
      id="work"
      className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
      style={{
        background: baseBg,
        borderTop: `1px solid ${borderColor}`,
      }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Top Section: Heading + Description + Video */}
        <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-16 xl:gap-20">
          {/* LEFT SIDE - Content */}
          <div className="flex-1 w-full lg:w-auto">
            {/* Premium Heading "My Work" split into two lines */}
            <div className="mb-8">
              <div className="overflow-hidden">
                <motion.h2
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
                  className="text-[56px] sm:text-[72px] lg:text-[88px] font-bold tracking-tight"
                  style={{
                    fontFamily: "Space Grotesk, sans-serif",
                    color: headingColor,
                    lineHeight: 1,
                  }}
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
                  style={{
                    fontFamily: "Space Grotesk, sans-serif",
                    color: headingColor,
                    lineHeight: 1,
                  }}
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
              className="text-[14px] sm:text-[15px] leading-[1.7] max-w-[480px] mb-10"
              style={{
                fontFamily: "Inter, sans-serif",
                color: descColor,
              }}
            >
              {work.description}
            </motion.p>

            {/* Featured Project with Arrow - using Sanity data */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="group cursor-pointer inline-block"
              onClick={() => {
                document.querySelector('#projects')?.scrollIntoView({
                  behavior: 'smooth',
                  block: 'start'
                })
              }}
            >
              <div className="flex items-center gap-3">
                <span
                  className="text-[13px] uppercase tracking-wider"
                  style={{
                    fontFamily: "monospace",
                    color: labelColor,
                  }}
                >
                  {work.featuredLabel}
                </span>
                <div className="w-8 h-px" style={{ background: labelColor }} />
              </div>
              
              <div className="flex items-center gap-2 mt-3 group">
                <span
                  className="text-[24px] sm:text-[28px] lg:text-[32px] font-semibold tracking-tight transition-all duration-300 group-hover:translate-x-1"
                  style={{
                    fontFamily: "Space Grotesk, sans-serif",
                    color: headingColor,
                  }}
                >
                  {work.buttonText}
                </span>
                <motion.svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="transition-all duration-300 group-hover:translate-x-1 group-hover:scale-110"
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
                >
                  <path
                    d="M5 12H19M19 12L12 5M19 12L12 19"
                    stroke={headingColor}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </motion.svg>
              </div>
            </motion.div>
          </div>

          {/* RIGHT SIDE - Video with perfect responsive sizing */}
          <div className="flex-1   flex justify-center lg:justify-end w-full lg:w-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.33, 1, 0.68, 1] }}
              className="relative w-full max-w-[320px] sm:max-w-[380px] md:max-w-[420px] lg:max-w-[460px] xl:max-w-[500px] mx-auto lg:mx-0"
            >
              {/* Premium glow effect */}
              <div
                className="absolute inset-0 rounded-2xl opacity-20 blur-3xl"
                style={{
                  background: "linear-gradient(135deg, #a855f7, #ec4899)",
                  transform: "scale(0.8)",
                }}
              />
              
              {/* Subtle border */}
              <div
                className="absolute inset-0 rounded-2xl"
                style={{
                  border: `1px solid ${borderColor}`,
                }}
              />

              {/* Video Container */}
              <div className="relative z-10 border-r-red-500 overflow-hidden aspect-video">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                >
                  <source src="/work-video.webm" type="video/webm" />
                </video>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-8px);
          }
        }
      `}</style>
    </section>
  )
}