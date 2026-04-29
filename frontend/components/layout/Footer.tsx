"use client";

import Link from "next/link";
import { Github, Linkedin } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

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
            © {currentYear} Mahab Rizwan. All rights reserved.
          </p>

          {/* Social Links */}
          <div className="flex items-center space-x-6">
            <Link
              href="https://github.com/MAHABRIZWAN4"
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
              href="https://linkedin.com/in/mahab-rizwan-831095341"
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
            <span className="font-medium" style={{ color: "var(--accent)" }}>
              Next.js 15
            </span>{" "}
            +{" "}
            <span className="font-medium" style={{ color: "var(--accent-teal)" }}>
              Claude AI
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
