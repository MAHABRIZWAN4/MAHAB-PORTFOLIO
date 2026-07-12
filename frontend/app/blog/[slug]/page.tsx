"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Clock, Share2, Tag } from "lucide-react";
import Link from "next/link";
import { getBlogBySlug, urlFor, type Blog } from "@/lib/sanity";
import PortableTextRenderer from "@/components/blog/PortableTextRenderer";

const categoryColors: { [key: string]: { bg: string; text: string } } = {
  ai: { bg: "rgba(139, 92, 246, 0.1)", text: "#A78BFA" },
  webdev: { bg: "rgba(34, 211, 238, 0.1)", text: "#22D3EE" },
  devops: { bg: "rgba(251, 146, 60, 0.1)", text: "#FB923C" },
  tutorial: { bg: "rgba(74, 222, 128, 0.1)", text: "#4ADE80" },
  opinion: { bg: "rgba(244, 114, 182, 0.1)", text: "#F472B6" },
};

const categoryLabels: { [key: string]: string } = {
  ai: "AI & Agents",
  webdev: "Web Development",
  devops: "DevOps",
  tutorial: "Tutorial",
  opinion: "Opinion",
};

export default function BlogPostPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBlog() {
      try {
        const data = await getBlogBySlug(slug);
        if (data) {
          setBlog(data);
        } else {
          router.push("/blog");
        }
      } catch (error) {
        console.error("Error fetching blog:", error);
        router.push("/blog");
      } finally {
        setLoading(false);
      }
    }
    if (slug) {
      fetchBlog();
    }
  }, [slug, router]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleShare = async () => {
    if (navigator.share && blog) {
      try {
        await navigator.share({
          title: blog.title,
          text: blog.excerpt,
          url: window.location.href,
        });
      } catch (error) {
        console.log("Share failed:", error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-[#0A0E18] flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-violet-500"></div>
      </div>
    );
  }

  if (!blog) {
    return null;
  }

  const colors = categoryColors[blog.category] || categoryColors.ai;

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-[#0A0E18]">
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-6 overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-violet-50 dark:from-violet-900/10 via-transparent to-transparent" />

        {/* Animated Orbs */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
          }}
          className="absolute top-20 right-20 w-96 h-96 bg-violet-300/20 dark:bg-violet-500/20 rounded-full blur-[120px]"
        />

        <div className="relative max-w-4xl mx-auto space-y-8">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-gray-600 dark:text-white/60 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 group"
            >
              <ArrowLeft
                size={20}
                className="group-hover:-translate-x-1 transition-transform duration-200"
              />
              <span>Back to Blog</span>
            </Link>
          </motion.div>

          {/* Category & Meta */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex items-center gap-4 flex-wrap"
          >
            <span
              className="px-4 py-1.5 rounded-full text-sm font-medium"
              style={{
                background: colors.bg,
                color: colors.text,
              }}
            >
              {categoryLabels[blog.category]}
            </span>

            <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-white/40">
              <div className="flex items-center gap-1.5">
                <Calendar size={16} />
                <span>{formatDate(blog.publishedAt)}</span>
              </div>

              {blog.readingTime && (
                <div className="flex items-center gap-1.5">
                  <Clock size={16} />
                  <span>{blog.readingTime} min read</span>
                </div>
              )}
            </div>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight"
          >
            {blog.title}
          </motion.h1>

          {/* Excerpt */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-xl text-gray-600 dark:text-white/60 leading-relaxed"
          >
            {blog.excerpt}
          </motion.p>

          {/* Tags & Share */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex items-center justify-between flex-wrap gap-4 pt-4 border-t border-gray-200 dark:border-white/10"
          >
            {/* Tags */}
            {blog.tags && blog.tags.length > 0 && (
              <div className="flex items-center gap-2 flex-wrap">
                <Tag size={16} className="text-gray-400 dark:text-white/40" />
                {blog.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-lg text-sm bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-white/50 hover:bg-gray-200 dark:hover:bg-white/10 transition-colors duration-200"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Share Button */}
            <button
              onClick={handleShare}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-white/60 hover:bg-gray-200 dark:hover:bg-white/10 hover:text-gray-900 dark:hover:text-white transition-all duration-200"
            >
              <Share2 size={16} />
              <span className="text-sm">Share</span>
            </button>
          </motion.div>
        </div>
      </section>

      {/* Cover Image */}
      {blog.coverImage && (
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="px-6 pb-16"
        >
          <div className="max-w-5xl mx-auto rounded-3xl overflow-hidden border border-gray-200 dark:border-white/10 shadow-xl">
            <img
              src={urlFor(blog.coverImage).width(1400).height(800).url()}
              alt={blog.coverImage.alt || blog.title}
              className="w-full h-auto"
            />
          </div>
        </motion.section>
      )}

      {/* Content */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="px-6 pb-20"
      >
        <article className="max-w-3xl mx-auto prose prose-gray dark:prose-invert prose-lg">
          <PortableTextRenderer content={blog.body} />
        </article>
      </motion.section>

      {/* Back to Blog CTA */}
      <section className="px-6 pb-20">
        <div className="max-w-4xl mx-auto">
          <div className="relative rounded-3xl overflow-hidden border border-gray-200 dark:border-white/10 bg-gradient-to-br from-violet-50 dark:from-violet-500/10 via-white dark:via-transparent to-cyan-50 dark:to-cyan-500/10 p-12 text-center shadow-lg">
            {/* Glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-violet-200/30 dark:from-violet-500/20 to-cyan-200/30 dark:to-cyan-500/20 blur-3xl opacity-50" />

            <div className="relative space-y-6">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                Enjoyed this article?
              </h2>
              <p className="text-gray-600 dark:text-white/60 text-lg">
                Check out more insights and tutorials on my blog
              </p>
              <Link href="/blog">
                <button className="px-8 py-4 rounded-xl bg-gradient-to-r from-violet-500 to-cyan-500 text-white font-medium transition-all duration-300 hover:scale-105 shadow-lg shadow-violet-500/25">
                  Back to All Posts
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
