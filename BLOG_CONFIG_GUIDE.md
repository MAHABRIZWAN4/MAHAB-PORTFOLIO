# Blog Configuration Guide

## Overview
Your portfolio includes a fully-featured blog system powered by Sanity CMS. This guide explains how to manage blog content through the Sanity Studio.

## Blog Schema

The blog schema (`sanity_portfolio/schemaTypes/blog.ts`) is already configured with all necessary fields.

## Adding a New Blog Post

### Step 1: Access Sanity Studio
1. Navigate to `sanity_portfolio` directory
2. Run `npm run dev` to start the studio
3. Open `http://localhost:3333` in your browser
4. Click on "Blog" in the sidebar

### Step 2: Create a New Blog Post
Click "Create" → "Blog" and fill in the following fields:

#### Required Fields:
- **Title**: Your blog post title (e.g., "The Agent Factory: AI Ki Nai Duniya")
- **Slug**: Auto-generated from title (click "Generate" button)
- **Excerpt**: Short summary (max 300 characters) - shows in cards
- **Category**: Choose from:
  - AI & Agents (`ai`)
  - Web Development (`webdev`)
  - DevOps (`devops`)
  - Tutorial (`tutorial`)
  - Opinion (`opinion`)
- **Body**: Main content (see Rich Text Guide below)
- **Published At**: Publication date and time

#### Optional Fields:
- **Cover Image**: Upload a featured image
  - Add alternative text for accessibility
- **Featured**: Toggle ON to show on homepage (max 3 featured posts)
- **Reading Time**: Estimated minutes to read
- **Tags**: Add keywords (e.g., `AI`, `Claude`, `Next.js`)
- **SEO**: 
  - Meta Title (for search engines)
  - Meta Description (max 160 characters)

### Step 3: Writing Content (Body Field)

#### Text Formatting:
- **Headings**: Use H2, H3, H4 from toolbar
- **Bold**: Ctrl/Cmd + B
- **Italic**: Ctrl/Cmd + I
- **Underline**: Available in marks
- **Links**: Select text → Link icon → Enter URL

#### Adding Images:
1. Click the image icon in the toolbar
2. Upload image or select from assets
3. Add alt text (required for accessibility)
4. Add optional caption

#### Adding Code Blocks:
1. Click code icon `</>` in toolbar
2. Select language from dropdown
3. Add filename (optional, e.g., `app.js`)
4. Paste your code

**Supported Languages:**
- JavaScript, TypeScript
- Python, Rust, Go, Java, C++
- HTML, CSS, JSON
- Bash, SQL

#### Lists:
- Bullet lists: Click bullet icon or type `-` + space
- Numbered lists: Click number icon or type `1.` + space

### Step 4: SEO Configuration (Optional but Recommended)
Expand "SEO" section at bottom:
- **Meta Title**: Custom title for Google (default: post title)
- **Meta Description**: Search result description (160 chars max)

### Step 5: Publish
1. Review your content
2. Click **"Publish"** button (top right)
3. Your post is now live!

## Pre-Written Blog Topics

Here are the 5 blog posts you wanted to write:

### Blog 1: The Agent Factory
**Title:** The Agent Factory: AI Ki Nai Duniya — Digital Employees Ka Daur
**Category:** AI & Agents (`ai`)
**Tags:** `AI`, `Agent Factory`, `SaaS`, `Digital FTEs`, `10-80-10`

**Key Points to Cover:**
- SaaS era tools bechta tha — Agent Factory era results bechta hai
- AI-Native Companies woh hain jo AI employees (Digital FTEs) banati hain
- 10-80-10 rule: Human 10% intent set kare, AI 80% kaam kare, Human 10% verify kare
- Humans khud tasks nahin karte — woh AI workforce ko supervise karte hain
- Aapka personal experience: is portfolio ka AI Agent isi concept ka living example hai

---

### Blog 2: How I Built an AI Agent
**Title:** How I Built My Portfolio's AI Agent with Claude API
**Category:** Tutorial (`tutorial`)
**Tags:** `Claude API`, `OpenRouter`, `FastAPI`, `Voice Input`, `AI Agent`

**Key Points to Cover:**
- OpenRouter + Gemma model use kiya (free tier)
- System prompt mein guardrails kaise lagaye
- FastAPI backend kaise connect kiya
- Voice input Web Speech API se
- 50+ languages support kaise kaam karta hai
- Real challenges jo face kiye aur solutions

---

### Blog 3: Next.js 15 vs 14
**Title:** Next.js 15 vs 14 — Meri Portfolio Build Se Jo Seekha
**Category:** Web Development (`webdev`)
**Tags:** `Next.js`, `React 19`, `Turbopack`, `App Router`

**Key Points to Cover:**
- App Router improvements
- React 19 integration
- Turbopack by default
- Server Components vs Client Components practically kya farq para
- Aapke portfolio mein kya actually change hua

---

### Blog 4: Why Sanity CMS
**Title:** Portfolio Mein Sanity CMS Kyun — Hardcode Se CMS Tak Ka Safar
**Category:** Web Development (`webdev`)
**Tags:** `Sanity`, `CMS`, `GROQ`, `Sanity MCP`

**Key Points to Cover:**
- Pehle hardcoded data tha — phir Sanity connect ki
- GROQ queries ka power
- Non-technical content updates bina code touch kiye
- Sanity MCP se Claude seedha content manage kar sakta hai
- Real examples apni portfolio se

---

### Blog 5: Prompting in 2026
**Title:** Prompting in 2026 — Jo 2022 Mein Kaam Karta Tha Woh Ab Kafi Nahi
**Category:** Opinion (`opinion`)
**Tags:** `Prompting`, `AI`, `Claude`, `LLMs`, `Agent Factory`

**Key Points to Cover:**
- Context window 1000x barha — pura brief do
- Novice vs Power User — kaise brief karein
- Brainstorm-iterate loop — pehli draft mat maango
- Reasoning modes — "ghaur se socho" kab kahein

## Blog URLs

Your blog will be available at:
- **All Posts**: `https://yourdomain.com/blog`
- **Individual Post**: `https://yourdomain.com/blog/post-slug`
- **Homepage Featured**: Shows 3 most recent featured posts

## Blog Features

### On Homepage:
- Featured blogs section shows 3 posts marked as "Featured"
- Beautiful gradient cards with hover effects
- Direct links to full posts

### On Blog Page (`/blog`):
- Hero section with animated background
- Category filter (All, AI & Agents, Web Dev, etc.)
- Grid layout of all blog posts
- Responsive design

### On Individual Post Page (`/blog/[slug]`):
- Full-width cover image
- Category badge with custom colors
- Reading time and publish date
- Share button (native share or copy link)
- Tags display
- Rich text content with:
  - Syntax-highlighted code blocks
  - Embedded images with captions
  - Formatted headings and lists
  - Custom styled links
- Back to blog CTA

## Category Colors

Each category has a unique color scheme:
- **AI & Agents**: Violet/Purple
- **Web Development**: Cyan/Blue
- **DevOps**: Orange
- **Tutorial**: Green
- **Opinion**: Pink

## Tips for Great Blog Posts

### Writing:
1. Start with a strong hook in the excerpt
2. Use headings (H2, H3) to break up content
3. Add code examples where relevant
4. Include images to make it visual
5. Write in your natural voice (mix of English/Urdu works great!)

### SEO:
1. Use descriptive titles with keywords
2. Write compelling meta descriptions
3. Add relevant tags
4. Include alt text for all images
5. Link to your other posts when relevant

### Images:
- Recommended cover image size: 1400x800px
- Use high-quality images
- Always add alt text
- Compress images before uploading

### Code Blocks:
- Always specify the language
- Add filename when showing file examples
- Keep code snippets focused and short
- Add comments to explain complex parts

## Updating the Navbar

The navbar is already configured to show the Blog link. To customize:

1. Open Sanity Studio
2. Go to "Navbar Configuration"
3. Under "Navigation Links", you'll see the Blog entry
4. You can reorder links by dragging
5. Publish changes

## Troubleshooting

### Blog posts not showing?
- Check if posts are published (not draft)
- Verify Sanity environment variables in `frontend/.env.local`
- Check browser console for errors

### Images not loading?
- Verify image is uploaded in Sanity
- Check if `NEXT_PUBLIC_SANITY_PROJECT_ID` is set correctly

### Featured posts not on homepage?
- Make sure exactly 3 posts have "Featured" toggle ON
- Check they have publishedAt date
- Rebuild the site: `npm run build`

### Code highlighting not working?
- Verify language is supported (see list above)
- Check if react-syntax-highlighter is installed
- Try rebuilding: `npm run build`

## Development Workflow

### Local Development:
1. Start Sanity Studio: `cd sanity_portfolio && npm run dev`
2. Start Next.js: `cd frontend && npm run dev`
3. Create/edit content in Studio
4. Changes appear immediately on frontend

### Production Deployment:
1. Deploy Sanity: `cd sanity_portfolio && npx sanity deploy`
2. Deploy Frontend: Push to Vercel/Netlify
3. Your blog is live!

## Future Enhancements

Consider adding:
- Related posts section
- Comments (Disqus/Giscus)
- Newsletter signup
- Social share counts
- Blog search functionality
- Author profiles (for multi-author blogs)
- Series/Collections grouping

## Need Help?

- Sanity Docs: https://www.sanity.io/docs
- GROQ Query Guide: https://www.sanity.io/docs/groq
- Next.js Docs: https://nextjs.org/docs
- Your AI Agent: Ask it about blog management! 😄

---

**Happy Blogging! 🚀**
