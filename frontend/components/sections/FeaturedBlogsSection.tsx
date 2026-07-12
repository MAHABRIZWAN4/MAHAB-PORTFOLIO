"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import BlogCard from "@/components/blog/BlogCard";
import { getFeaturedBlogs, type Blog } from "@/lib/sanity";

export default function FeaturedBlogsSection() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const data = await getFeaturedBlogs();
        setBlogs(data);
      } catch (error) {
        console.error("Error fetching featured blogs:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchBlogs();
  }, []);

  // Don't render section if no featured blogs
  if (!loading && blogs.length === 0) {
    return null;
  }

  return (
    <section className="relative py-20 px-6 overflow-hidden bg-gray-50 dark:bg-transparent" id="blog">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-100/20 dark:via-violet-500/5 to-transparent" />

      <div className="relative max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-violet-500/10 to-cyan-500/10 border border-violet-200 dark:border-white/10">
            <Sparkles size={16} className="text-violet-500 dark:text-violet-400" />
            <span className="text-sm text-gray-700 dark:text-white/70">Latest Insights</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 via-fuchsia-500 to-cyan-500 dark:from-violet-400 dark:via-fuchsia-400 dark:to-cyan-400">
              Featured Blog Posts
            </span>
          </h2>

          <p className="text-gray-600 dark:text-white/60 text-lg max-w-2xl mx-auto">
            Deep dives into AI, web development, and building the future
          </p>
        </motion.div>

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-violet-500"></div>
          </div>
        )}

        {/* Blog Grid */}
        {!loading && blogs.length > 0 && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {blogs.map((blog, index) => (
                <BlogCard key={blog._id} blog={blog} index={index} />
              ))}
            </div>

            {/* View All Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center"
            >
              <Link href="/blog">
                <button className="group inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-violet-500 to-cyan-500 text-white font-medium transition-all duration-300 hover:scale-105 shadow-lg shadow-violet-500/25">
                  <span>View All Posts</span>
                  <ArrowRight
                    size={20}
                    className="group-hover:translate-x-1 transition-transform duration-300"
                  />
                </button>
              </Link>
            </motion.div>
          </>
        )}
      </div>
    </section>
  );
}
