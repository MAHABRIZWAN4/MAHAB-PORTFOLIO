"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"
import { getExpertise, type Expertise } from "@/lib/expertise"
import ScrollToNextButton from "../ui/ScrollToNextButton"

const accentColors = {
  indigo: "#6366f1",
  teal: "#14b8a6",
  amber: "#f59e0b",
}

const IconAI = ({ color }: { color: string }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Z" />
    <path d="M12 6v12" />
    <path d="M6 12h12" />
    <circle cx="12" cy="12" r="2" />
  </svg>
)

const IconFullStack = ({ color }: { color: string }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
)

const IconDevOps = ({ color }: { color: string }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="3" width="20" height="14" rx="2" />
    <line x1="8" y1="21" x2="16" y2="21" />
    <line x1="12" y1="17" x2="12" y2="21" />
  </svg>
)

const getIcon = (iconType: string, color: string) => {
  switch (iconType) {
    case "ai":
      return <IconAI color={color} />
    case "fullstack":
      return <IconFullStack color={color} />
    case "devops":
      return <IconDevOps color={color} />
    default:
      return <IconAI color={color} />
  }
}

export default function ExpertiseSection() {
  const [expertise, setExpertise] = useState<Expertise[]>([])
  const [loading, setLoading] = useState(true)
  const [mounted, setMounted] = useState(false)
  const { theme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    async function fetchExpertise() {
      try {
        const data = await getExpertise()
        setExpertise(data)
      } catch (error) {
        console.error("Error fetching expertise:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchExpertise()
  }, [])

  const isDark = mounted && theme === "dark"

  const baseBg = isDark ? "#0a0e18" : "#f8f9fa"
  const overlayTop = isDark ? "rgba(10,14,24,0.88)" : "rgba(248,249,250,0.88)"
  const overlayMiddle = isDark ? "rgba(10,14,24,0.78)" : "rgba(248,249,250,0.78)"
  const cardBg = isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)"
  const cardBorder = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"
  const titleColor = isDark ? "#ffffff" : "#0a0a0a"
  const descColor = isDark ? "rgba(255,255,255,0.32)" : "rgba(0,0,0,0.4)"
  const subtitleColor = isDark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.4)"
  const labelColor = isDark ? "rgba(255,255,255,0.35)" : "rgba(0,0,0,0.35)"
  const tagColor = isDark ? "#f472b6" : "#be185d"
  const bgOpacity = isDark ? 0.15 : 0.08

  if (loading) {
    return (
      <section
        id="expertise"
        className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
        style={{ background: baseBg }}
      >
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="h-4 w-24 bg-gray-700 animate-pulse mx-auto mb-4 rounded" />
            <div className="h-10 w-48 bg-gray-700 animate-pulse mx-auto rounded" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 max-w-5xl mx-auto">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="p-6 md:p-7 rounded-xl animate-pulse"
                style={{
                  background: cardBg,
                  border: `1px solid ${cardBorder}`,
                }}
              >
                <div className="w-10 h-10 bg-gray-700 rounded-lg mb-4" />
                <div className="h-5 w-32 bg-gray-700 rounded mb-2" />
                <div className="h-3 w-24 bg-gray-700 rounded mb-4" />
                <div className="h-16 bg-gray-700 rounded" />
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (!expertise || expertise.length === 0) {
    return null
  }

  return (
    <section
      id="expertise"
      className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
      style={{ background: baseBg }}
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/expertise-bg.png"
          alt=""
          className="w-full h-full object-cover"
          style={{ opacity: bgOpacity }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to bottom, ${overlayTop} 0%, ${overlayMiddle} 50%, ${overlayTop} 100%)`,
            opacity: 0.6,
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-[11px] tracking-[3px] uppercase mb-4"
            style={{
              fontFamily: "monospace",
              color: labelColor,
            }}
          >
            WHAT I DO
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-[40px] md:text-[40px] sm:text-[28px] font-extrabold mb-4"
            style={{
              fontFamily: "Space Grotesk, sans-serif",
              color: titleColor,
            }}
          >
            My Expertise
          </motion.h2>

          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 60 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="h-[3px] mx-auto"
            style={{ background: "#6366f1" }}
          />
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 max-w-5xl mx-auto">
          {expertise.map((item, index) => {
            const accent = accentColors[item.accentColor]

            return (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="h-full"
              >
                <div
                  className="h-full p-5 md:p-7 rounded-xl transition-all duration-300 hover:-translate-y-1 flex flex-col"
                  style={{
                    background: cardBg,
                    border: `1px solid ${cardBorder}`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = `${accent}80`
                    e.currentTarget.style.background = isDark
                      ? `rgba(${parseInt(accent.slice(1, 3), 16)}, ${parseInt(accent.slice(3, 5), 16)}, ${parseInt(accent.slice(5, 7), 16)}, 0.05)`
                      : `rgba(${parseInt(accent.slice(1, 3), 16)}, ${parseInt(accent.slice(3, 5), 16)}, ${parseInt(accent.slice(5, 7), 16)}, 0.05)`
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = cardBorder
                    e.currentTarget.style.background = cardBg
                  }}
                >
                  {/* Icon */}
                  <div
                    className="w-10 h-10 md:w-10 md:h-10 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center mb-5"
                    style={{
                      background: `${accent}1A`,
                      border: `1px solid ${accent}4D`,
                    }}
                  >
                    {getIcon(item.icon, accent)}
                  </div>

                  {/* Title */}
                  <div className="mb-4">
                    <h3
                      className="text-[17px] md:text-[17px] sm:text-[15px] font-bold mb-2"
                      style={{ color: titleColor }}
                    >
                      {item.title}
                    </h3>
                    <div
                      className="h-[2px] w-full mb-3"
                      style={{
                        background: `linear-gradient(to right, ${accent}, transparent)`,
                      }}
                    />
                    <p
                      className="text-[12px] md:text-[12px] sm:text-[11px]"
                      style={{ color: subtitleColor }}
                    >
                      {item.subtitle}
                    </p>
                  </div>

                  {/* Description */}
                  <div
                    className="text-[10.5px] md:text-[10.5px] sm:text-[10px] leading-[1.7] pl-[10px]"
                    style={{
                      fontFamily: "monospace",
                      color: descColor,
                      borderLeft: `2px solid ${accent}4D`,
                    }}
                  >
                    <span style={{ color: tagColor }}>&lt;h3&gt;</span>
                    {item.description}
                    <span style={{ color: tagColor }}>&lt;/h3&gt;</span>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Scroll to Next Section Button */}
      <ScrollToNextButton nextSectionId="work" />
    </section>
  )
}
