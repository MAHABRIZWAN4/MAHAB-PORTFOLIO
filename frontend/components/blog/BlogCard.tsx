"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { urlFor, type Blog } from "@/lib/sanity";

interface BlogCardProps {
  blog: Blog;
  index: number;
}

const categoryColors: { [key: string]: { bg: string; text: string; glow: string } } = {
  ai: {
    bg: "rgba(139, 92, 246, 0.1)",
    text: "#A78BFA",
    glow: "rgba(139, 92, 246, 0.3)",
  },
  webdev: {
    bg: "rgba(34, 211, 238, 0.1)",
    text: "#22D3EE",
    glow: "rgba(34, 211, 238, 0.3)",
  },
  devops: {
    bg: "rgba(251, 146, 60, 0.1)",
    text: "#FB923C",
    glow: "rgba(251, 146, 60, 0.3)",
  },
  tutorial: {
    bg: "rgba(74, 222, 128, 0.1)",
    text: "#4ADE80",
    glow: "rgba(74, 222, 128, 0.3)",
  },
  opinion: {
    bg: "rgba(244, 114, 182, 0.1)",
    text: "#F472B6",
    glow: "rgba(244, 114, 182, 0.3)",
  },
};

const categoryLabels: { [key: string]: string } = {
  ai: "AI & Agents",
  webdev: "Web Development",
  devops: "DevOps",
  tutorial: "Tutorial",
  opinion: "Opinion",
};

export default function BlogCard({ blog, index }: BlogCardProps) {
  const colors = categoryColors[blog.category] || categoryColors.ai;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
    >
      <Link href={`/blog/${blog.slug.current}`}>
        <div className="group relative h-full rounded-2xl overflow-hidden border border-gray-200 dark:border-white/5 bg-white dark:bg-gradient-to-br dark:from-white/[0.03] dark:to-transparent backdrop-blur-sm transition-all duration-500 hover:border-violet-300 dark:hover:border-white/10 hover:scale-[1.02] hover:shadow-xl">
          {/* Glow Effect */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl"
            style={{
              background: `radial-gradient(circle at 50% 0%, ${colors.glow}, transparent 70%)`,
            }}
          />

          {/* Cover Image */}
          {blog.coverImage && (
            <div className="relative w-full h-48 overflow-hidden">
              <img
                src={urlFor(blog.coverImage).width(600).height(400).url()}
                alt={blog.coverImage.alt || blog.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E18] via-transparent to-transparent" />
            </div>
          )}

          {/* Content */}
          <div className="relative p-6 space-y-4">
            {/* Category & Meta */}
            <div className="flex items-center gap-3 flex-wrap">
              <span
                className="px-3 py-1 rounded-full text-xs font-medium"
                style={{
                  background: colors.bg,
                  color: colors.text,
                }}
              >
                {categoryLabels[blog.category]}
              </span>

              <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-white/40">
                <div className="flex items-center gap-1">
                  <Calendar size={14} />
                  <span>{formatDate(blog.publishedAt)}</span>
                </div>

                {blog.readingTime && (
                  <div className="flex items-center gap-1">
                    <Clock size={14} />
                    <span>{blog.readingTime} min read</span>
                  </div>
                )}
              </div>
            </div>

            {/* Title */}
            <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-violet-600 group-hover:to-cyan-500 dark:group-hover:from-violet-400 dark:group-hover:to-cyan-400 group-hover:bg-clip-text transition-all duration-300">
              {blog.title}
            </h3>

            {/* Excerpt */}
            <p className="text-gray-600 dark:text-white/60 text-sm line-clamp-3 leading-relaxed">
              {blog.excerpt}
            </p>

            {/* Tags */}
            {blog.tags && blog.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-2">
                {blog.tags.slice(0, 3).map((tag, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 rounded-md text-xs bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-white/50"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Read More */}
            <div className="flex items-center gap-2 text-sm font-medium pt-2 group-hover:gap-3 transition-all duration-300">
              <span
                className="transition-colors duration-300"
                style={{ color: colors.text }}
              >
                Read More
              </span>
              <ArrowRight
                size={16}
                className="transition-transform duration-300"
                style={{ color: colors.text }}
              />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
