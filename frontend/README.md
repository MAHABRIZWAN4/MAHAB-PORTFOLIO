# Mahab Rizwan Portfolio - Frontend

Next.js 15 frontend for AI-powered portfolio website.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **CMS**: Sanity
- **Notifications**: Sonner
- **Testing**: Jest + React Testing Library

## Design System

### Colors
- **Background**: `#0A0A0A` (near black)
- **Accent**: `#6366F1` (electric indigo)
- **Secondary**: `#14B8A6` (teal)
- **Muted**: `#1A1A1A` (dark gray)

### Typography
- **Headings**: Space Grotesk (Google Fonts)
- **Body**: DM Sans (Google Fonts)

### Style
- Dark, refined, futuristic aesthetic
- Glassmorphism effects with backdrop blur
- Subtle grid background pattern
- Smooth animations and transitions

## Getting Started

### Install Dependencies

```bash
cd frontend
npm install
```

### Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

### Run Tests

```bash
npm test
```

### Run Tests in Watch Mode

```bash
npm run test:watch
```

## Project Structure

```
frontend/
├── app/
│   ├── layout.tsx           # Root layout with fonts & metadata
│   ├── page.tsx             # Home page
│   └── globals.css          # Global styles & CSS variables
├── components/
│   └── layout/
│       ├── Navbar.tsx       # Sticky navigation with glassmorphism
│       └── Footer.tsx       # Footer with social links
├── __tests__/
│   └── layout.test.tsx      # Layout component tests
├── public/                  # Static assets
├── .gitignore
├── jest.config.js           # Jest configuration
├── jest.setup.js            # Jest setup file
├── next.config.ts           # Next.js configuration
├── package.json             # Dependencies
├── postcss.config.js        # PostCSS configuration
├── tailwind.config.ts       # Tailwind CSS configuration
└── tsconfig.json            # TypeScript configuration
```

## Features

### Navbar
- Sticky top navigation with glassmorphism
- MR monogram logo
- 4 navigation links: About, Projects, AI Agent, Contact
- Active link indicator with smooth animation
- Mobile hamburger menu
- Slide-down animation on mount

### Footer
- Copyright notice
- Social links (GitHub, LinkedIn)
- "Built with Next.js 15 + Claude AI" badge

### Global Styles
- Custom scrollbar (thin, dark)
- Selection color (indigo)
- Subtle grid background pattern
- Glassmorphism utility classes
- Gradient text utility
- Button variants

## Environment Variables

Create a `.env.local` file:

```env
# Backend API URL
NEXT_PUBLIC_API_URL=http://localhost:8000

# Sanity Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_api_token
```

## Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Manual Build

```bash
npm run build
```

The optimized production build will be in `.next/` directory.

## Testing

All layout components are tested with Jest and React Testing Library:

- ✅ Navbar renders with MR logo
- ✅ Navbar has all 4 navigation links
- ✅ Footer shows current year copyright
- ✅ Footer has GitHub and LinkedIn links
- ✅ Footer shows "Built with Next.js 15 + Claude AI"

Run tests:
```bash
npm test
```

## Author

**Mahab Rizwan**  
AI-Powered Full Stack Developer  
Karachi, Pakistan

- Email: mahabrizwan@gmail.com
- GitHub: [@MAHABRIZWAN4](https://github.com/MAHABRIZWAN4)
- LinkedIn: [mahab-rizwan](https://linkedin.com/in/mahab-rizwan-831095341)
