"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ProjectCard from "../projects/ProjectCard";
import FilterTabs from "../projects/FilterTabs";
import { getProjects, type Project } from "@/lib/sanity";

const categories = ["All", "AI", "Full Stack", "Backend", "Web3"];

export default function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const data = await getProjects();
        setProjects(data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProjects();
  }, []);

  const filteredProjects =
    activeFilter === "All"
      ? projects
      : projects.filter((project) => project.category === activeFilter);

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

        {/* Loading Skeleton */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="rounded-xl overflow-hidden border animate-pulse"
                style={{
                  backgroundColor: "var(--card)",
                  borderColor: "var(--card-border)",
                }}
              >
                <div className="h-48 bg-gray-300 dark:bg-gray-700" />
                <div className="p-5 space-y-3">
                  <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4" />
                  <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2" />
                  <div className="h-16 bg-gray-300 dark:bg-gray-700 rounded" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* No Projects Message */}
        {!loading && projects.length === 0 && (
          <div className="text-center py-12">
            <p
              className="text-lg"
              style={{ color: "var(--foreground-muted)" }}
            >
              No projects yet
            </p>
          </div>
        )}

        {/* Projects Grid */}
        {!loading && projects.length > 0 && (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project._id} project={project} index={index} />
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
