import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import WorkSection from '@/components/sections/WorkSection'
import type { Work } from '@/lib/work'

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
    span: ({ children, ...props }: any) => <span {...props}>{children}</span>,
  },
}))

// Mock the work lib
const mockGetWork = jest.fn()
jest.mock('@/lib/work', () => ({
  getWork: () => mockGetWork(),
}))

const mockWorkData: Work = {
  _id: '1',
  heading: 'My Work',
  description: 'Developed and deployed scalable AI-powered web applications using Next.js 15, FastAPI, and Claude API. Built intelligent AI agents with multilingual voice support and advanced Prompt and Context Engineering.',
  featuredLabel: 'Featured Project',
  featuredProjectName: 'AI-Powered Portfolio',
  featuredProjectUrl: 'https://github.com/MAHABRIZWAN4',
  buttonText: 'View Project',
  order: 1,
}

describe('WorkSection', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('renders without crashing', async () => {
    mockGetWork.mockResolvedValue(mockWorkData)

    render(<WorkSection />)

    await waitFor(() => {
      expect(screen.queryByText('My Work')).toBeInTheDocument()
    })
  })

  test('section has id="work"', async () => {
    mockGetWork.mockResolvedValue(mockWorkData)

    const { container } = render(<WorkSection />)

    await waitFor(() => {
      const section = container.querySelector('#work')
      expect(section).toBeInTheDocument()
    })
  })

  test('shows loading skeleton while fetching', () => {
    mockGetWork.mockImplementation(
      () => new Promise(() => {}) // Never resolves
    )

    const { container } = render(<WorkSection />)

    const skeletons = container.querySelectorAll('.animate-pulse')
    expect(skeletons.length).toBeGreaterThan(0)
  })

  test('heading "My Work" renders when data loads', async () => {
    mockGetWork.mockResolvedValue(mockWorkData)

    render(<WorkSection />)

    await waitFor(() => {
      expect(screen.getByText('My Work')).toBeInTheDocument()
    })
  })

  test('featured project name renders', async () => {
    mockGetWork.mockResolvedValue(mockWorkData)

    render(<WorkSection />)

    await waitFor(() => {
      expect(screen.getByText('AI-Powered Portfolio')).toBeInTheDocument()
    })
  })

  test('View Project button renders with correct href', async () => {
    mockGetWork.mockResolvedValue(mockWorkData)

    render(<WorkSection />)

    await waitFor(() => {
      const button = screen.getByText('View Project')
      expect(button).toBeInTheDocument()
      expect(button.closest('a')).toHaveAttribute('href', 'https://github.com/MAHABRIZWAN4')
      expect(button.closest('a')).toHaveAttribute('target', '_blank')
    })
  })

  test('video element is present in the component', async () => {
    mockGetWork.mockResolvedValue(mockWorkData)

    const { container } = render(<WorkSection />)

    await waitFor(() => {
      const video = container.querySelector('video')
      expect(video).toBeInTheDocument()
      expect(video).toHaveAttribute('autoPlay')
      expect(video).toHaveAttribute('loop')
      expect(video).toHaveAttribute('muted')

      const source = video?.querySelector('source')
      expect(source).toHaveAttribute('src', '/work-video.webm')
    })
  })
})
