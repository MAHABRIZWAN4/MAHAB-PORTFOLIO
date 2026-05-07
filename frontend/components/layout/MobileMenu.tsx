"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  activeLink: string;
  setActiveLink: (link: string) => void;
  theme: string | undefined;
  mounted: boolean;
}

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "AI Agent", href: "#ai-agent" },
  { name: "Contact", href: "#contact" },
];

export default function MobileMenu({
  isOpen,
  onClose,
  activeLink,
  setActiveLink,
  theme,
  mounted,
}: MobileMenuProps) {
  const isDark = mounted && theme === "dark";

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="lg:hidden absolute top-16 left-0 right-0 z-40 overflow-hidden"
          style={{
            backgroundColor: isDark ? "rgba(10, 10, 10, 0.98)" : "rgba(255, 255, 255, 0.98)",
            backdropFilter: "blur(12px)",
            borderBottom: `1px solid ${isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}`,
          }}
        >
          <div className="container mx-auto px-4 py-6 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => {
                  setActiveLink(link.href);
                  onClose();
                }}
                className="block py-3 font-mono text-sm tracking-[2px] uppercase transition-colors duration-300"
                style={{
                  color:
                    activeLink === link.href
                      ? isDark
                        ? "#ffffff"
                        : "#000000"
                      : isDark
                      ? "rgba(255, 255, 255, 0.6)"
                      : "rgba(0, 0, 0, 0.6)",
                  borderBottom: `1px solid ${
                    isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"
                  }`,
                }}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
