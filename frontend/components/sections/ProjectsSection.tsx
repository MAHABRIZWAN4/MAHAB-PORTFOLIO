"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import ProjectCard from "../projects/ProjectCard";
import FilterTabs from "../projects/FilterTabs";

const projectsData = [
  {
    id: 1,
    title: "AI-Powered Portfolio",
    description: "Interactive portfolio with AI chatbot powered by Claude API, featuring real-time conversations and intelligent responses.",
    techStack: ["Next.js 15", "FastAPI", "Claude AI", "Supabase", "Docker"],
    category: "AI",
    githubUrl: "https://github.com/MAHABRIZWAN4",
    liveUrl: "#",
    gradient: "from-indigo-500 via-purple-500 to-pink-500",
    icon: "🤖",
    featured: true,
  },
  {
    id: 2,
    title: "AI Chatbot with Claude",
    description: "Advanced conversational AI using Claude 3.5 Sonnet with context awareness and natural language understanding.",
    techStack: ["Python", "Claude API", "FastAPI", "WebSocket", "Redis"],
    category: "AI",
    githubUrl: "https://github.com/MAHABRIZWAN4",
    liveUrl: "#",
    gradient: "from-cyan-500 via-blue-500 to-indigo-500",
    icon: "💬",
    featured: true,
  },
  {
    id: 3,
    title: "Full Stack E-commerce",
    description: "Modern e-commerce platform with payment integration, inventory management, and real-time order tracking.",
    techStack: ["Next.js", "Node.js", "PostgreSQL", "Stripe", "Tailwind"],
    category: "Full Stack",
    githubUrl: "https://github.com/MAHABRIZWAN4",
    liveUrl: "#",
    gradient: "from-emerald-500 via-teal-500 to-cyan-500",
    icon: "🛒",
    featured: false,
  },
  {
    id: 4,
    title: "Dockerized REST API",
    description: "High-performance REST API with FastAPI, containerized with Docker and deployed on Kubernetes.",
    techStack: ["FastAPI", "Docker", "Kubernetes", "Python", "PostgreSQL"],
    category: "Backend",
    githubUrl: "https://github.com/MAHABRIZWAN4",
    liveUrl: "#",
    gradient: "from-blue-500 via-indigo-500 to-violet-500",
    icon: "🐳",
    featured: false,
  },
];

const categories = ["All", "AI", "Full Stack", "Backend"];

export default function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredProjects =
    activeFilter === "All"
      ? projectsData
      : projectsData.filter((project) => project.category === activeFilter);

  return (
    <section
      id="projects"
      className="py-20 px-4"
      style={{ backgroundColor: "var(--background)" }}
    >
      <div className="container mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ color: "var(--foreground)" }}
          >
            Featured Projects
          </h2>
          <p
            className="text-lg max-w-2xl mx-auto"
            style={{ color: "var(--foreground-muted)" }}
          >
            A showcase of my recent work in AI, full-stack development, and backend engineering
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <div className="flex justify-center mb-8">
          <FilterTabs
            categories={categories}
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
          />
        </div>

        {/* Projects Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
