import { render, screen, fireEvent } from "@testing-library/react";
import ProjectsSection from "@/components/sections/ProjectsSection";

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
      viewport,
      layout,
      ...rest
    } = props;
    return rest;
  };

  return {
    motion: {
      div: ({ children, ...props }: any) => <div {...filterProps(props)}>{children}</div>,
      h2: ({ children, ...props }: any) => <h2 {...filterProps(props)}>{children}</h2>,
      h3: ({ children, ...props }: any) => <h3 {...filterProps(props)}>{children}</h3>,
      p: ({ children, ...props }: any) => <p {...filterProps(props)}>{children}</p>,
      button: ({ children, ...props }: any) => <button {...filterProps(props)}>{children}</button>,
      span: ({ children, ...props }: any) => <span {...filterProps(props)}>{children}</span>,
    },
    AnimatePresence: ({ children }: any) => <>{children}</>,
    useInView: () => true,
  };
});

// Mock next/link
jest.mock("next/link", () => {
  return ({ children, ...props }: any) => {
    return <a {...props}>{children}</a>;
  };
});

describe("ProjectsSection", () => {
  it("projects section renders with correct id", () => {
    render(<ProjectsSection />);
    expect(document.getElementById("projects")).toBeInTheDocument();
  });

  it("all 4 project titles visible", async () => {
    render(<ProjectsSection />);
    expect(await screen.findByText("AI-Powered Portfolio")).toBeInTheDocument();
    expect(await screen.findByText("AI Chatbot with Claude")).toBeInTheDocument();
    expect(await screen.findByText("Full Stack E-commerce")).toBeInTheDocument();
    expect(await screen.findByText("Dockerized REST API")).toBeInTheDocument();
  });

  it("filter tabs render", () => {
    render(<ProjectsSection />);
    expect(screen.getByText("All")).toBeInTheDocument();
    const aiElements = screen.getAllByText("AI");
    expect(aiElements.length).toBeGreaterThanOrEqual(1);
    const fullStackElements = screen.getAllByText("Full Stack");
    expect(fullStackElements.length).toBeGreaterThanOrEqual(1);
    const backendElements = screen.getAllByText("Backend");
    expect(backendElements.length).toBeGreaterThanOrEqual(1);
  });

  it("filter works - click AI tab", async () => {
    render(<ProjectsSection />);
    // Wait for projects to load
    await screen.findByText("AI-Powered Portfolio");
    const aiButtons = screen.getAllByText("AI");
    // Click the first AI button (which should be the filter tab)
    fireEvent.click(aiButtons[0]);
    expect(screen.getByText("AI-Powered Portfolio")).toBeInTheDocument();
    expect(screen.queryByText("Full Stack E-commerce")).not.toBeInTheDocument();
  });

  it("github links present", async () => {
    render(<ProjectsSection />);
    // Wait for projects to load
    await screen.findByText("AI-Powered Portfolio");
    const githubLinks = screen.getAllByText(/GitHub/i);
    expect(githubLinks.length).toBeGreaterThanOrEqual(1);
  });

  it("featured badge shows on featured projects", () => {
    render(<ProjectsSection />);
    const featuredBadges = screen.getAllByText(/Featured/i);
    expect(featuredBadges.length).toBeGreaterThanOrEqual(1);
  });
});
