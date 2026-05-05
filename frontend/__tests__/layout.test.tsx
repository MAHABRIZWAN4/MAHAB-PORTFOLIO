import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

// Mock framer-motion to avoid animation issues in tests
jest.mock("framer-motion", () => {
  const filterProps = (props: any) => {
    const {
      initial,
      animate,
      exit,
      transition,
      variants,
      whileHover,
      whileTap,
      whileFocus,
      whileDrag,
      whileInView,
      onHoverStart,
      onHoverEnd,
      onTap,
      onTapStart,
      onTapCancel,
      onDrag,
      onDragStart,
      onDragEnd,
      ...rest
    } = props;
    return rest;
  };

  return {
    motion: {
      nav: ({ children, ...props }: any) => <nav {...filterProps(props)}>{children}</nav>,
      div: ({ children, ...props }: any) => <div {...filterProps(props)}>{children}</div>,
    },
    AnimatePresence: ({ children }: any) => <>{children}</>,
  };
});

// Mock next/link
jest.mock("next/link", () => {
  return ({ children, ...props }: any) => {
    return <a {...props}>{children}</a>;
  };
});

describe("Layout Components", () => {
  describe("Navbar", () => {
    it("renders navbar with MahabRizwan._ logo", () => {
      render(<Navbar />);
      const logo = screen.getByText("MahabRizwan._");
      expect(logo).toBeInTheDocument();
    });

    it("navbar has all 4 nav links", () => {
      render(<Navbar />);
      expect(screen.getByText("About")).toBeInTheDocument();
      expect(screen.getByText("Projects")).toBeInTheDocument();
      expect(screen.getByText("AI Agent")).toBeInTheDocument();
      expect(screen.getByText("Contact")).toBeInTheDocument();
    });

    it("has mobile menu button", () => {
      render(<Navbar />);
      const menuButton = screen.getByLabelText("Toggle menu");
      expect(menuButton).toBeInTheDocument();
    });
  });

  describe("Footer", () => {
    it("footer shows 2026 copyright", async () => {
      render(<Footer />);
      expect(
        await screen.findByText(/© 2026 Mahab Rizwan. All rights reserved./i)
      ).toBeInTheDocument();
    });

    it("footer has GitHub link", async () => {
      render(<Footer />);
      const githubLink = await screen.findByLabelText("GitHub");
      expect(githubLink).toHaveAttribute(
        "href",
        "https://github.com/test"
      );
    });

    it("footer has LinkedIn link", async () => {
      render(<Footer />);
      const linkedinLink = await screen.findByLabelText("LinkedIn");
      expect(linkedinLink).toHaveAttribute(
        "href",
        "https://linkedin.com/in/test"
      );
    });

    it("footer shows built with Next.js 15 and Claude AI", async () => {
      render(<Footer />);
      expect(await screen.findByText("Next.js 15")).toBeInTheDocument();
      expect(await screen.findByText("Claude AI")).toBeInTheDocument();
    });
  });
});
