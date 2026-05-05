"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Github, Linkedin } from "lucide-react";
import { getFooter, type Footer as FooterType } from "@/lib/sanity";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [footerData, setFooterData] = useState<FooterType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFooter() {
      try {
        const data = await getFooter();
        setFooterData(data);
      } catch (error) {
        console.error("Error fetching footer data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchFooter();
  }, []);

  if (loading || !footerData) {
    return (
      <footer
        className="border-t mt-20"
        style={{
          backgroundColor: "var(--background-secondary)",
          borderColor: "var(--border)",
        }}
      >
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center">
            <div className="animate-pulse h-4 bg-gray-300 dark:bg-gray-700 rounded w-48" />
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer
      className="border-t mt-20"
      style={{
        backgroundColor: "var(--background-secondary)",
        borderColor: "var(--border)",
      }}
    >
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <p className="text-sm" style={{ color: "var(--foreground-muted)" }}>
            © {currentYear} {footerData.copyrightName}. All rights reserved.
          </p>

          {/* Social Links */}
          <div className="flex items-center space-x-6">
            <Link
              href={footerData.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors duration-300"
              style={{ color: "var(--foreground-muted)" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "var(--accent)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "var(--foreground-muted)";
              }}
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </Link>
            <Link
              href={footerData.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors duration-300"
              style={{ color: "var(--foreground-muted)" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "var(--accent)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "var(--foreground-muted)";
              }}
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </Link>
          </div>

          {/* Built With */}
          <p className="text-sm" style={{ color: "var(--foreground-muted)" }}>
            Built with{" "}
            {footerData.builtWithTech.map((tech, index) => (
              <span key={tech.name}>
                <span className="font-medium" style={{ color: tech.color }}>
                  {tech.name}
                </span>
                {index < footerData.builtWithTech.length - 1 && " + "}
              </span>
            ))}
          </p>
        </div>
      </div>
    </footer>
  );
}
