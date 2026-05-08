import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import ExpertiseSection from '@/components/sections/ExpertiseSection'
import Home from '@/app/page'
import type { Expertise } from '@/lib/expertise'

// Mock next-themes
jest.mock('next-themes', () => ({
  useTheme: () => ({
    theme: 'dark',
    setTheme: jest.fn(),
  }),
}))

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    p: ({ children, ...props }: any) => <p {...props}>{children}</p>,
    h2: ({ children, ...props }: any) => <h2 {...props}>{children}</h2>,
  },
}))

// Mock the expertise lib
const mockGetExpertise = jest.fn()
jest.mock('@/lib/expertise', () => ({
  getExpertise: () => mockGetExpertise(),
}))

// Mock ProjectsSection to avoid dependency issues when testing Home
jest.mock('@/components/sections/ProjectsSection', () => {
  return function MockProjectsSection() {
    return <div data-testid="projects-section">Projects Section</div>
  }
})

// Mock HeroSection
jest.mock('@/components/hero/HeroSection', () => {
  return function MockHeroSection() {
    return <div data-testid="hero-section">Hero Section</div>
  }
})

const mockExpertiseData: Expertise[] = [
  {
    _id: '1',
    title: 'AI Development',
    subtitle: 'Claude API, Agent SDK',
    description: 'Building intelligent AI agents with Claude API, Prompt and Context Engineering, and OpenRouter integration for multilingual voice-enabled experiences',
    icon: 'ai',
    accentColor: 'indigo',
    order: 1,
  },
  {
    _id: '2',
    title: 'Full Stack Dev',
    subtitle: 'Next.js 15, FastAPI',
    description: 'Scalable modern web applications with Next.js 15, TypeScript, Tailwind CSS, Python FastAPI and high-performance REST APIs with secure authentication',
    icon: 'fullstack',
    accentColor: 'teal',
    order: 2,
  },
  {
    _id: '3',
    title: 'DevOps and Cloud',
    subtitle: 'Docker, Kubernetes',
    description: 'Production-ready deployments with Docker, Kubernetes, GitHub Actions CI/CD pipelines and Sanity CMS content management',
    icon: 'devops',
    accentColor: 'amber',
    order: 3,
  },
]

describe('ExpertiseSection', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('renders without crashing', async () => {
    mockGetExpertise.mockResolvedValue(mockExpertiseData)

    render(<ExpertiseSection />)

    await waitFor(() => {
      expect(screen.queryByText('WHAT I DO')).toBeInTheDocument()
    })
  })

  test('section has id="expertise"', async () => {
    mockGetExpertise.mockResolvedValue(mockExpertiseData)

    const { container } = render(<ExpertiseSection />)

    await waitFor(() => {
      const section = container.querySelector('#expertise')
      expect(section).toBeInTheDocument()
    })
  })

  test('shows loading skeleton with 3 placeholder cards while fetching', () => {
    mockGetExpertise.mockImplementation(
      () => new Promise(() => {}) // Never resolves to keep loading state
    )

    const { container } = render(<ExpertiseSection />)

    const skeletonCards = container.querySelectorAll('.animate-pulse')
    expect(skeletonCards.length).toBeGreaterThan(0)
  })

  test('renders three cards when mock data is provided', async () => {
    mockGetExpertise.mockResolvedValue(mockExpertiseData)

    render(<ExpertiseSection />)

    await waitFor(() => {
      expect(screen.getByText('AI Development')).toBeInTheDocument()
      expect(screen.getByText('Full Stack Dev')).toBeInTheDocument()
      expect(screen.getByText('DevOps and Cloud')).toBeInTheDocument()
    })
  })

  test('card titles are visible', async () => {
    mockGetExpertise.mockResolvedValue(mockExpertiseData)

    render(<ExpertiseSection />)

    await waitFor(() => {
      const aiTitle = screen.getByText('AI Development')
      const fullStackTitle = screen.getByText('Full Stack Dev')
      const devOpsTitle = screen.getByText('DevOps and Cloud')

      expect(aiTitle).toBeVisible()
      expect(fullStackTitle).toBeVisible()
      expect(devOpsTitle).toBeVisible()
    })
  })

  test('section is present in the page component', () => {
    mockGetExpertise.mockResolvedValue(mockExpertiseData)

    const { container } = render(<Home />)

    // Check that ExpertiseSection is rendered in the page
    const expertiseSection = container.querySelector('#expertise')
    expect(expertiseSection).toBeInTheDocument()
  })
})
