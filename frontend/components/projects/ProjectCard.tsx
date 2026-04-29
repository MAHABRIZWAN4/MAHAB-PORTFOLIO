"use client";

import { motion } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";
import Link from "next/link";

interface ProjectCardProps {
  project: {
    id: number;
    title: string;
    description: string;
    techStack: string[];
    category: string;
    githubUrl: string;
    liveUrl: string;
    gradient: string;
    icon: string;
    featured: boolean;
  };
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="rounded-xl overflow-hidden border transition-all duration-300 hover:shadow-lg"
      style={{
        backgroundColor: "var(--card)",
        borderColor: "var(--card-border)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "var(--accent)";
        e.currentTarget.style.boxShadow = "0 10px 40px rgba(99, 102, 241, 0.1)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "var(--card-border)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {/* Image Placeholder with Gradient */}
      <div className="relative h-48 overflow-hidden">
        <motion.div
          className={`w-full h-full bg-gradient-to-br ${project.gradient} flex items-center justify-center`}
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.3 }}
        >
          <span className="text-6xl">{project.icon}</span>
        </motion.div>

        {/* Featured Badge */}
        {project.featured && (
          <div
            className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold"
            style={{
              backgroundColor: "var(--accent)",
              color: "white",
            }}
          >
            Featured
          </div>
        )}
      </div>

      {/* Card Body */}
      <div className="p-5">
        {/* Category Badge */}
        <div className="mb-3">
          <span
            className="inline-block px-3 py-1 rounded-full text-xs font-medium"
            style={{
              backgroundColor: project.category === "AI" ? "rgba(99, 102, 241, 0.1)" : "rgba(20, 184, 166, 0.1)",
              color: project.category === "AI" ? "var(--accent)" : "var(--accent-teal)",
            }}
          >
            {project.category}
          </span>
        </div>

        {/* Title */}
        <h3
          className="font-semibold text-lg mb-2"
          style={{ color: "var(--foreground)" }}
        >
          {project.title}
        </h3>

        {/* Description */}
        <p
          className="text-sm mb-3 line-clamp-2"
          style={{ color: "var(--foreground-muted)" }}
        >
          {project.description}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-1 mb-4">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="text-xs px-2 py-0.5 rounded"
              style={{
                backgroundColor: "var(--badge-bg)",
                color: "var(--badge-text)",
              }}
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex gap-2">
          <Link
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border transition-all duration-200"
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
            <Github size={16} />
            <span>GitHub</span>
          </Link>

          <Link
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
            style={{
              backgroundColor: "var(--accent)",
              color: "white",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.filter = "brightness(0.9)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.filter = "brightness(1)";
            }}
          >
            <ExternalLink size={16} />
            <span>Live Demo</span>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
