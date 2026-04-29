import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import HeroSection from "@/components/hero/HeroSection";
import MRMonogram from "@/components/hero/MRMonogram";
import StatsBar from "@/components/hero/StatsBar";

// Mock framer-motion
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
      layoutId,
      ...rest
    } = props;
    return rest;
  };

  return {
    motion: {
      div: ({ children, ...props }: any) => <div {...filterProps(props)}>{children}</div>,
      h1: ({ children, ...props }: any) => <h1 {...filterProps(props)}>{children}</h1>,
      h2: ({ children, ...props }: any) => <h2 {...filterProps(props)}>{children}</h2>,
      p: ({ children, ...props }: any) => <p {...filterProps(props)}>{children}</p>,
      span: ({ children, ...props }: any) => <span {...filterProps(props)}>{children}</span>,
      circle: ({ children, ...props }: any) => <circle {...filterProps(props)}>{children}</circle>,
      g: ({ children, ...props }: any) => <g {...filterProps(props)}>{children}</g>,
    },
  };
});

// Mock next-themes
jest.mock("next-themes", () => ({
  useTheme: () => ({ theme: "dark", setTheme: jest.fn() }),
}));

// Mock next/link
jest.mock("next/link", () => {
  return ({ children, ...props }: any) => {
    return <a {...props}>{children}</a>;
  };
});

describe("Hero Section", () => {
  it("test_hero_renders_name - Mahab Rizwan visible", () => {
    render(<HeroSection />);
    // Name is split into individual letters, so check for unique letters
    const mLetters = screen.getAllByText("M");
    expect(mLetters.length).toBeGreaterThanOrEqual(1);
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

  it("download link has correct href", () => {
    render(<HeroSection />);
    const downloadLink = document.querySelector('[download]');
    expect(downloadLink).toHaveAttribute("href", "/CV_MAHAB_RIZWAN.pdf");
  });

  it("tech pills render in hero", () => {
    render(<HeroSection />);
    expect(screen.getByText("Next.js 15")).toBeInTheDocument();
    expect(screen.getByText("Python")).toBeInTheDocument();
    expect(screen.getByText("Docker")).toBeInTheDocument();
    expect(screen.getByText("Kubernetes")).toBeInTheDocument();
  });
});
