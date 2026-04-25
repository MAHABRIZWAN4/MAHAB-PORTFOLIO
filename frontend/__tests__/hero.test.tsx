import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import HeroSection from "@/components/hero/HeroSection";
import MRMonogram from "@/components/hero/MRMonogram";
import StatsBar from "@/components/hero/StatsBar";

// Mock framer-motion
jest.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    h1: ({ children, ...props }: any) => <h1 {...props}>{children}</h1>,
    h2: ({ children, ...props }: any) => <h2 {...props}>{children}</h2>,
    p: ({ children, ...props }: any) => <p {...props}>{children}</p>,
    circle: ({ children, ...props }: any) => <circle {...props}>{children}</circle>,
    g: ({ children, ...props }: any) => <g {...props}>{children}</g>,
  },
}));

// Mock next/link
jest.mock("next/link", () => {
  return ({ children, href }: any) => {
    return <a href={href}>{children}</a>;
  };
});

describe("Hero Section", () => {
  it("test_hero_renders_name - Mahab Rizwan visible", () => {
    render(<HeroSection />);
    expect(screen.getByText("Mahab Rizwan")).toBeInTheDocument();
  });

  it("test_hero_has_cta_buttons - all 3 buttons present", () => {
    render(<HeroSection />);
    expect(screen.getByText("View Projects")).toBeInTheDocument();
    expect(screen.getByText("Download CV")).toBeInTheDocument();
    expect(screen.getByText("Talk to AI Agent")).toBeInTheDocument();
  });

  it("test_monogram_renders - MR text in SVG", () => {
    render(<MRMonogram />);
    expect(screen.getByText("MR")).toBeInTheDocument();
  });

  it("test_stats_bar_shows - 3+ and 50+ visible", () => {
    render(<StatsBar />);
    expect(screen.getByText("3+")).toBeInTheDocument();
    expect(screen.getByText("50+")).toBeInTheDocument();
    expect(screen.getByText("99%")).toBeInTheDocument();
    expect(screen.getByText("2+")).toBeInTheDocument();
  });

  it("test_available_badge - Available for hire text present", () => {
    render(<HeroSection />);
    expect(screen.getByText(/Available for hire/i)).toBeInTheDocument();
  });

  it("renders tagline about Karachi Pakistan", () => {
    render(<HeroSection />);
    expect(
      screen.getByText(/From Karachi, Pakistan/i)
    ).toBeInTheDocument();
  });

  it("renders social links", () => {
    render(<HeroSection />);
    const githubLinks = screen.getAllByLabelText("GitHub");
    const linkedinLinks = screen.getAllByLabelText("LinkedIn");
    expect(githubLinks.length).toBeGreaterThan(0);
    expect(linkedinLinks.length).toBeGreaterThan(0);
  });

  it("renders tech badges in monogram", () => {
    render(<MRMonogram />);
    expect(screen.getByText("Next.js")).toBeInTheDocument();
    expect(screen.getByText("Claude AI")).toBeInTheDocument();
    expect(screen.getByText("FastAPI")).toBeInTheDocument();
  });
});
