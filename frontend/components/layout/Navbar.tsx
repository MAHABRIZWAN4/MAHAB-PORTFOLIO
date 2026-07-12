"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Github,
  Linkedin,
  Sun,
  Moon,
} from "lucide-react";
import { useTheme } from "next-themes";
import { getNavbar, type Navbar as NavbarType } from "@/lib/sanity";
import { getSiteSettings, type SiteSettings } from "@/lib/siteSettings";
import { useHireModalStore } from "@/lib/hire-modal-store";

// Default fallbacks
const defaultNavLinks = [
  { name: "Home", href: "/#home" },
  { name: "Expertise", href: "/#expertise" },
  { name: "Projects", href: "/#projects" },
  { name: "Skills", href: "/#skills" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [navbarConfig, setNavbarConfig] = useState<NavbarType | null>(null);
  const [siteSettings, setSiteSettings] = useState<SiteSettings | null>(null);

  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const pathname = usePathname();
  const { open: openHireModal } = useHireModalStore();

  // Handle navigation for hash links
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // If it's a hash link and we're not on the home page
    if (href.startsWith("/#") && pathname !== "/") {
      e.preventDefault();
      // Use absolute URL to ensure proper navigation from any page
      window.location.href = window.location.origin + href;
    }
    // For regular links or if already on home page, let Next.js Link handle it normally
  };

  // Fetch navbar config
  useEffect(() => {
    async function fetchNavbar() {
      try {
        const data = await getNavbar();
        if (data) {
          setNavbarConfig(data);
        }
      } catch (error) {
        console.error("Error fetching navbar config:", error);
      }
    }
    fetchNavbar();
  }, []);

  // Fetch site settings for logo
  useEffect(() => {
    async function fetchSettings() {
      try {
        const data = await getSiteSettings();
        if (data) {
          setSiteSettings(data);
        }
      } catch (error) {
        console.error("Error fetching site settings:", error);
      }
    }
    fetchSettings();
  }, []);

  useEffect(() => {
    setMounted(true);

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isDark = mounted && theme === "dark";

  // Use config data or fallbacks
  const logo = navbarConfig?.logo || "MR";
  const name = navbarConfig?.name || "Mahab Rizwan";
  const tagline = navbarConfig?.tagline || "AI Full Stack Developer";
  const navLinks = navbarConfig?.navLinks || defaultNavLinks;
  const githubUrl = navbarConfig?.githubUrl || "https://github.com";
  const linkedinUrl = navbarConfig?.linkedinUrl || "https://linkedin.com";
  const ctaButtonText = navbarConfig?.ctaButtonText || "Hire Me";
  const ctaButtonMobile = navbarConfig?.ctaButtonMobile || "Let's Work Together";
  const mobileSubtitle = navbarConfig?.mobileSubtitle || "Portfolio Navigation";

  const navBackground = isDark
    ? scrolled
      ? "rgba(10, 14, 24, 0.78)"
      : "rgba(10, 14, 24, 0.45)"
    : scrolled
    ? "rgba(255,255,255,0.92)"
    : "rgba(255,255,255,0.72)";

  const navBorder = isDark
    ? "rgba(255,255,255,0.08)"
    : "rgba(0,0,0,0.08)";

  const textPrimary = isDark ? "#ffffff" : "#111827";

  const textSecondary = isDark
    ? "rgba(255,255,255,0.72)"
    : "rgba(17,24,39,0.72)";

  const glassBg = isDark
    ? "rgba(255,255,255,0.06)"
    : "rgba(0,0,0,0.04)";

  return (
    <>
      {/* NAVBAR */}
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7 }}
        className="fixed top-0 left-0 w-full z-50 px-4 sm:px-6 lg:px-8"
      >
        <div
          className="mx-auto mt-4 max-w-7xl rounded-2xl border backdrop-blur-xl transition-all duration-300"
          style={{
            background: navBackground,
            borderColor: navBorder,
            boxShadow: isDark
              ? "0 8px 40px rgba(0,0,0,0.35)"
              : "0 8px 30px rgba(0,0,0,0.08)",
          }}
        >
          <div className="flex items-center justify-between h-[50px] px-5 lg:px-8">
            {/* LOGO */}
            <Link href="/#home" onClick={(e) => handleNavClick(e, "/#home")}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-3 cursor-pointer"
              >
                {siteSettings?.logoUrl ? (
                  <img
                    src={siteSettings.logoUrl}
                    alt="Logo"
                    className="h-20 w-auto object-contain transition-transform duration-200"
                    style={{
                      filter: "drop-shadow(0 0 12px rgba(99,102,241,0.3))",
                    }}
                  />
                ) : (
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white"
                    style={{
                      background:
                        "linear-gradient(135deg, #6366F1 0%, #14B8A6 100%)",
                      boxShadow:
                        "0 0 25px rgba(99,102,241,0.45)",
                    }}
                  >
                    {logo}
                  </div>
                )}

                <div className="hidden sm:block">
                  <h2
                    className="font-bold text-lg leading-none"
                    style={{
                      color: textPrimary,
                    }}
                  >
                    {name}
                  </h2>

                  <p
                    className="text-xs tracking-[2px] uppercase mt-1"
                    style={{
                      color: textSecondary,
                    }}
                  >
                    {tagline}
                  </p>
                </div>
              </motion.div>
            </Link>

            {/* DESKTOP NAV */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="relative group text-sm font-medium transition-all duration-300"
                  style={{
                    color: textSecondary,
                  }}
                >
                  {link.name}

                  <span
                    className="absolute left-0 -bottom-1 h-[2px] w-0 group-hover:w-full transition-all duration-300"
                    style={{
                      background:
                        "linear-gradient(90deg, #6366F1, #14B8A6)",
                    }}
                  />
                </Link>
              ))}
            </div>

            {/* RIGHT SIDE */}
            <div className="hidden lg:flex items-center gap-4">
              {/* THEME TOGGLE */}
              <button
                onClick={() =>
                  setTheme(isDark ? "light" : "dark")
                }
                className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110"
                style={{
                  background: glassBg,
                  color: textPrimary,
                  border: `1px solid ${navBorder}`,
                }}
              >
                {isDark ? (
                  <Sun size={18} />
                ) : (
                  <Moon size={18} />
                )}
              </button>

              {/* GITHUB */}
              <Link
                href={githubUrl}
                target="_blank"
                className="transition-all duration-300 hover:scale-110"
                style={{
                  color: textSecondary,
                }}
              >
                <Github size={18} />
              </Link>

              {/* LINKEDIN */}
              <Link
                href={linkedinUrl}
                target="_blank"
                className="transition-all duration-300 hover:scale-110"
                style={{
                  color: textSecondary,
                }}
              >
                <Linkedin size={18} />
              </Link>

              {/* BUTTON */}
              <button
                onClick={openHireModal}
                className="px-5 py-2 rounded-xl text-sm font-medium text-white transition-all duration-300 hover:scale-105"
                style={{
                  background:
                    "linear-gradient(135deg, #6366F1 0%, #14B8A6 100%)",
                  boxShadow:
                    "0 0 30px rgba(99,102,241,0.35)",
                }}
              >
                {ctaButtonText}
              </button>
            </div>

            {/* MOBILE BUTTONS */}
            <div className="lg:hidden flex items-center gap-3">
              {/* MOBILE THEME TOGGLE */}
              <button
                onClick={() =>
                  setTheme(isDark ? "light" : "dark")
                }
                className="w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300"
                style={{
                  background: glassBg,
                  color: textPrimary,
                  border: `1px solid ${navBorder}`,
                }}
              >
                {isDark ? (
                  <Sun size={20} />
                ) : (
                  <Moon size={20} />
                )}
              </button>

              {/* MENU BUTTON */}
              <button
                onClick={() => setIsOpen(true)}
                className="flex items-center justify-center w-11 h-11 rounded-xl transition-all duration-300"
                style={{
                  background: glassBg,
                  color: textPrimary,
                  border: `1px solid ${navBorder}`,
                }}
              >
                <Menu size={22} />
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* MOBILE SIDEBAR */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* OVERLAY */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
            />

            {/* SIDEBAR */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{
                type: "spring",
                damping: 24,
              }}
              className="fixed top-0 right-0 h-full w-[85%] max-w-[360px] z-50 lg:hidden"
              style={{
                background: isDark
                  ? "linear-gradient(180deg, #0B1020 0%, #111827 100%)"
                  : "linear-gradient(180deg, #FFFFFF 0%, #F8FAFC 100%)",

                borderLeft: isDark
                  ? "1px solid rgba(255,255,255,0.08)"
                  : "1px solid rgba(0,0,0,0.06)",

                boxShadow:
                  "-10px 0 40px rgba(0,0,0,0.25)",
              }}
            >
              {/* GLOW */}
              <div
                className="absolute top-0 right-0 w-[250px] h-[250px] rounded-full blur-[100px] opacity-30 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(135deg, #6366F1 0%, #14B8A6 100%)",
                }}
              />

              <div className="relative h-full flex flex-col px-6 py-6">
                {/* TOP */}
                <div className="flex items-center justify-between mb-12">
                  <div>
                    <h2
                      className="text-xl font-bold"
                      style={{
                        color: textPrimary,
                      }}
                    >
                      {name}
                    </h2>

                    <p
                      className="text-xs uppercase tracking-[3px] mt-2"
                      style={{
                        color: textSecondary,
                      }}
                    >
                      {mobileSubtitle}
                    </p>
                  </div>

                  <button
                    onClick={() => setIsOpen(false)}
                    className="w-11 h-11 rounded-xl flex items-center justify-center"
                    style={{
                      background: glassBg,
                      color: textPrimary,
                    }}
                  >
                    <X size={22} />
                  </button>
                </div>

                {/* LINKS */}
                <div className="flex flex-col gap-3">
                  {navLinks.map((link, index) => (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, x: 40 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: index * 0.08,
                      }}
                    >
                      <Link
                        href={link.href}
                        onClick={(e) => {
                          handleNavClick(e, link.href);
                          setIsOpen(false);
                        }}
                        className="flex items-center justify-between px-5 py-4 rounded-2xl transition-all duration-300"
                        style={{
                          background: isDark
                            ? "rgba(255,255,255,0.04)"
                            : "rgba(0,0,0,0.03)",
                        }}
                      >
                        <span
                          className="text-base font-medium"
                          style={{
                            color: textPrimary,
                          }}
                        >
                          {link.name}
                        </span>

                        <span className="text-cyan-400">
                          →
                        </span>
                      </Link>
                    </motion.div>
                  ))}
                </div>

                {/* BOTTOM BUTTON */}
                <div className="mt-auto pt-10">
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      openHireModal();
                    }}
                    className="w-full py-4 rounded-2xl text-white font-medium transition-all duration-300 hover:scale-[1.02]"
                    style={{
                      background:
                        "linear-gradient(135deg, #6366F1 0%, #14B8A6 100%)",

                      boxShadow:
                        "0 0 30px rgba(99,102,241,0.35)",
                    }}
                  >
                    {ctaButtonMobile}
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}