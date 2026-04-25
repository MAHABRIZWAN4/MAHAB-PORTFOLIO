import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

// Mock framer-motion to avoid animation issues in tests
jest.mock("framer-motion", () => ({
  motion: {
    nav: ({ children, ...props }: any) => <nav {...props}>{children}</nav>,
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

// Mock next/link
jest.mock("next/link", () => {
  return ({ children, href }: any) => {
    return <a href={href}>{children}</a>;
  };
});

describe("Layout Components", () => {
  describe("Navbar", () => {
    it("renders navbar with MR logo", () => {
      render(<Navbar />);
      const logo = screen.getByText("MR");
      expect(logo).toBeInTheDocument();
    });

    it("navbar has all 4 nav links", () => {
      render(<Navbar />);
      expect(screen.getByText("About")).toBeInTheDocument();
      expect(screen.getByText("Projects")).toBeInTheDocument();
      expect(screen.getByText("AI Agent")).toBeInTheDocument();
      expect(screen.getByText("Contact")).toBeInTheDocument();
    });

    it("renders Mahab Rizwan name in navbar", () => {
      render(<Navbar />);
      expect(screen.getByText("Mahab Rizwan")).toBeInTheDocument();
    });

    it("has mobile menu button", () => {
      render(<Navbar />);
      const menuButton = screen.getByLabelText("Toggle menu");
      expect(menuButton).toBeInTheDocument();
    });
  });

  describe("Footer", () => {
    it("footer shows 2026 copyright", () => {
      render(<Footer />);
      const currentYear = new Date().getFullYear();
      expect(
        screen.getByText(`© ${currentYear} Mahab Rizwan. All rights reserved.`)
      ).toBeInTheDocument();
    });

    it("footer has GitHub link", () => {
      render(<Footer />);
      const githubLink = screen.getByLabelText("GitHub");
      expect(githubLink).toHaveAttribute(
        "href",
        "https://github.com/MAHABRIZWAN4"
      );
    });

    it("footer has LinkedIn link", () => {
      render(<Footer />);
      const linkedinLink = screen.getByLabelText("LinkedIn");
      expect(linkedinLink).toHaveAttribute(
        "href",
        "https://linkedin.com/in/mahab-rizwan-831095341"
      );
    });

    it("footer shows built with Next.js 15 and Claude AI", () => {
      render(<Footer />);
      expect(screen.getByText("Next.js 15")).toBeInTheDocument();
      expect(screen.getByText("Claude AI")).toBeInTheDocument();
    });
  });
});
