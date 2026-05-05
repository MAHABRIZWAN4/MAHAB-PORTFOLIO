"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "AI Agent", href: "#ai-agent" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("");
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 "
      style={{
        backgroundColor: isScrolled ? "rgba(var(--background-rgb), 0.8)" : "transparent",
        backdropFilter: isScrolled ? "blur(12px)" : "none",
        borderBottom: isScrolled ? "1px solid var(--border)" : "none",
        boxShadow: isScrolled ? "0 4px 6px -1px rgba(0, 0, 0, 0.1)" : "none",
      }}
    >
      <div className="container mx-auto px-4   ">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span
              className="font-mono font-bold text-[17px] tracking-[2px]"
              style={{ color: "#00d4ff" }}
            >
              MahabRizwan._
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setActiveLink(link.href)}
                className="relative font-mono text-[12px] tracking-[2px] uppercase transition-colors duration-300 group"
                style={{
                  color: activeLink === link.href
                    ? (mounted && theme === "light" ? "#000000" : "#ffffff")
                    : (mounted && theme === "light" ? "rgba(0, 0, 0, 0.6)" : "rgba(255, 255, 255, 0.5)"),
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = mounted && theme === "light" ? "#000000" : "#ffffff";
                }}
                onMouseLeave={(e) => {
                  if (activeLink !== link.href) {
                    e.currentTarget.style.color = mounted && theme === "light" ? "rgba(0, 0, 0, 0.6)" : "rgba(255, 255, 255, 0.5)";
                  }
                }}
              >
                {link.name}
                <span
                  className="absolute -bottom-1 left-0 h-[1px] bg-[#00d4ff] transition-all duration-300 group-hover:w-full"
                  style={{ width: activeLink === link.href ? "100%" : "0" }}
                />
              </Link>
            ))}

            {/* Theme Toggle */}
            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="px-3 py-1.5 rounded font-mono text-[11px] tracking-[1px] uppercase transition-all duration-200"
                style={{
                  backgroundColor: "transparent",
                  border: theme === "light" ? "1px solid rgba(0, 0, 0, 0.25)" : "1px solid rgba(0, 212, 255, 0.25)",
                  color: theme === "light" ? "rgba(0, 0, 0, 0.5)" : "rgba(255, 255, 255, 0.5)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = theme === "light" ? "#000000" : "#00d4ff";
                  e.currentTarget.style.color = theme === "light" ? "#000000" : "#00d4ff";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = theme === "light" ? "rgba(0, 0, 0, 0.25)" : "rgba(0, 212, 255, 0.25)";
                  e.currentTarget.style.color = theme === "light" ? "rgba(0, 0, 0, 0.5)" : "rgba(255, 255, 255, 0.5)";
                }}
                aria-label="Toggle theme"
              >
                {theme === "dark" ? "Light" : "Dark"}
              </button>
            )}
          </div>

          {/* Mobile Menu Button & Theme Toggle */}
          <div className="md:hidden flex items-center space-x-2">
            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="px-3 py-1.5 rounded font-mono text-[11px] tracking-[1px] uppercase transition-all duration-200"
                style={{
                  backgroundColor: "transparent",
                  border: theme === "light" ? "1px solid rgba(0, 0, 0, 0.25)" : "1px solid rgba(0, 212, 255, 0.25)",
                  color: theme === "light" ? "rgba(0, 0, 0, 0.5)" : "rgba(255, 255, 255, 0.5)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = theme === "light" ? "#000000" : "#00d4ff";
                  e.currentTarget.style.color = theme === "light" ? "#000000" : "#00d4ff";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = theme === "light" ? "rgba(0, 0, 0, 0.25)" : "rgba(0, 212, 255, 0.25)";
                  e.currentTarget.style.color = theme === "light" ? "rgba(0, 0, 0, 0.5)" : "rgba(255, 255, 255, 0.5)";
                }}
                aria-label="Toggle theme"
              >
                {theme === "dark" ? "Light" : "Dark"}
              </button>
            )}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg transition-colors"
              style={{
                backgroundColor: "transparent",
                color: "var(--foreground)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "var(--badge-bg)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
              }}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t"
            style={{
              backgroundColor: "var(--background-secondary)",
              borderColor: "var(--border)",
            }}
          >
            <div className="container mx-auto px-4 py-4 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => {
                    setActiveLink(link.href);
                    setIsMobileMenuOpen(false);
                  }}
                  className="block py-2 font-medium transition-colors duration-300"
                  style={{
                    color: activeLink === link.href ? "var(--accent)" : "var(--foreground)",
                  }}
                  onMouseEnter={(e) => {
                    if (activeLink !== link.href) {
                      e.currentTarget.style.color = "var(--accent)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (activeLink !== link.href) {
                      e.currentTarget.style.color = "var(--foreground)";
                    }
                  }}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
