import Link from "next/link";
import { Github, Linkedin } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="glass border-t border-border mt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <p className="text-muted-foreground text-sm">
            © {currentYear} Mahab Rizwan. All rights reserved.
          </p>

          {/* Social Links */}
          <div className="flex items-center space-x-6">
            <Link
              href="https://github.com/MAHABRIZWAN4"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-accent transition-colors duration-300"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </Link>
            <Link
              href="https://linkedin.com/in/mahab-rizwan-831095341"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-accent transition-colors duration-300"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </Link>
          </div>

          {/* Built With */}
          <p className="text-muted-foreground text-sm">
            Built with{" "}
            <span className="text-accent font-medium">Next.js 15</span> +{" "}
            <span className="text-secondary font-medium">Claude AI</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
