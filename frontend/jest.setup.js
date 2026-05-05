import "@testing-library/jest-dom";

// Mock nanoid to avoid ES module issues
jest.mock("nanoid", () => ({
  nanoid: () => "test-id-123",
  customAlphabet: () => () => "test-custom-id-456",
}));

// Mock Sanity to avoid ES module issues
jest.mock("@/lib/sanity", () => ({
  getHero: jest.fn(() =>
    Promise.resolve({
      name: "MAHAB RIZWAN",
      rotatingTitles: ["Full Stack Developer", "AI Engineer"],
      tagline: "From Karachi, Pakistan",
      availabilityStatus: "Available for hire",
      availabilityYear: "2026",
      techPills: ["Next.js 15", "Python", "Docker", "Kubernetes"],
      githubUrl: "https://github.com/test",
      linkedinUrl: "https://linkedin.com/in/test",
      cvFile: { asset: { url: "/CV_MAHAB_RIZWAN.pdf" } },
      stats: [
        { label: "Years Experience", value: "3+" },
        { label: "Projects Completed", value: "50+" },
        { label: "Client Satisfaction", value: "99%" },
        { label: "Years in AI", value: "2+" },
      ],
    })
  ),
  getProjects: jest.fn(() =>
    Promise.resolve([
      {
        _id: "1",
        title: "AI-Powered Portfolio",
        description: "A portfolio with AI",
        category: "AI",
        tags: ["Next.js", "AI"],
        techStack: ["Next.js", "TypeScript", "Claude AI"],
        image: { asset: { url: "/test1.jpg" } },
        githubUrl: "https://github.com/test1",
        liveUrl: "https://test1.com",
      },
      {
        _id: "2",
        title: "AI Chatbot with Claude",
        description: "Chatbot using Claude",
        category: "AI",
        tags: ["Python", "Claude"],
        techStack: ["Python", "FastAPI", "Claude AI"],
        image: { asset: { url: "/test2.jpg" } },
        githubUrl: "https://github.com/test2",
        liveUrl: "https://test2.com",
      },
      {
        _id: "3",
        title: "Full Stack E-commerce",
        description: "E-commerce platform",
        category: "Web",
        tags: ["React", "Node"],
        techStack: ["React", "Node.js", "MongoDB"],
        image: { asset: { url: "/test3.jpg" } },
        githubUrl: "https://github.com/test3",
        liveUrl: "https://test3.com",
      },
      {
        _id: "4",
        title: "Dockerized REST API",
        description: "REST API with Docker",
        category: "Backend",
        tags: ["Docker", "FastAPI"],
        techStack: ["Docker", "FastAPI", "PostgreSQL"],
        image: { asset: { url: "/test4.jpg" } },
        githubUrl: "https://github.com/test4",
        liveUrl: "https://test4.com",
      },
    ])
  ),
  getFooter: jest.fn(() =>
    Promise.resolve({
      copyrightName: "Mahab Rizwan",
      githubUrl: "https://github.com/test",
      linkedinUrl: "https://linkedin.com/in/test",
      builtWithTech: [
        { name: "Next.js 15", color: "#6366F1" },
        { name: "Claude AI", color: "#14B8A6" },
      ],
    })
  ),
  client: {},
  urlFor: jest.fn(() => ({
    url: () => "/test-image.jpg",
  })),
}));
