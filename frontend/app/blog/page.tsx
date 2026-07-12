"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import BlogHero from "@/components/blog/BlogHero";
import BlogCard from "@/components/blog/BlogCard";
import { getBlogs, type Blog } from "@/lib/sanity";

const categories = [
  { value: "all", label: "All Posts" },
  { value: "ai", label: "AI & Agents" },
  { value: "webdev", label: "Web Development" },
  { value: "devops", label: "DevOps" },
  { value: "tutorial", label: "Tutorial" },
  { value: "opinion", label: "Opinion" },
];

export default function BlogPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [filteredBlogs, setFilteredBlogs] = useState<Blog[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const data = await getBlogs();
        setBlogs(data);
        setFilteredBlogs(data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchBlogs();
  }, []);

  useEffect(() => {
    if (selectedCategory === "all") {
      setFilteredBlogs(blogs);
    } else {
      setFilteredBlogs(blogs.filter((blog) => blog.category === selectedCategory));
    }
  }, [selectedCategory, blogs]);

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-[#0A0E18]">
      <BlogHero />

      <section className="relative py-20 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-wrap gap-3 justify-center mb-16"
          >
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value)}
                className={`px-6 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                  selectedCategory === cat.value
                    ? "bg-gradient-to-r from-violet-500 to-cyan-500 text-white shadow-lg shadow-violet-500/25"
                    : "bg-white dark:bg-white/5 text-gray-700 dark:text-white/60 hover:bg-gray-100 dark:hover:bg-white/10 hover:text-gray-900 dark:hover:text-white/80 border border-gray-200 dark:border-white/10"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </motion.div>

          {/* Loading State */}
          {loading && (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-violet-500"></div>
            </div>
          )}

          {/* Empty State */}
          {!loading && filteredBlogs.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <p className="text-gray-500 dark:text-white/40 text-lg">
                {selectedCategory === "all"
                  ? "No blog posts yet. Check back soon!"
                  : "No posts in this category yet."}
              </p>
            </motion.div>
          )}

          {/* Blog Grid */}
          {!loading && filteredBlogs.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredBlogs.map((blog, index) => (
                <BlogCard key={blog._id} blog={blog} index={index} />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
