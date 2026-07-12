# Quick Start Guide - Testing Your Blog

## 🎯 What's Ready

Your portfolio now has a complete blog system:
- ✅ Navbar has "Blog" link
- ✅ `/blog` page with category filtering
- ✅ `/blog/[slug]` dynamic pages for individual posts
- ✅ Featured blogs section on homepage
- ✅ Sanity CMS integration ready
- ✅ Build successful

## 🚀 Testing Steps

### Step 1: Start the Development Server
```bash
npm run dev
```
Opens at: **http://localhost:3000**

### Step 2: Navigate to Blog
1. Click **"Blog"** in the navbar (between Experience and AI Agent)
2. You'll see the blog listing page with category filters
3. Since no blogs exist yet, you'll see: "No blog posts yet. Check back soon!"

### Step 3: Add Sample Content in Sanity

Open a new terminal and start Sanity Studio:
```bash
cd sanity_portfolio
npm run dev
```
Opens at: **http://localhost:3333**

### Step 4: Create Your First Blog Post

In Sanity Studio:
1. Click **"Blog"** in sidebar
2. Click **"Create"** button
3. Fill in:
   - **Title**: "The Agent Factory: AI Ki Nai Duniya"
   - **Slug**: Click "Generate" (auto-generates from title)
   - **Category**: Select "AI & Agents"
   - **Excerpt**: "SaaS era tools bechta tha — Agent Factory era results bechta hai. AI-Native Companies kaise digital employees bana rahi hain."
   - **Body**: Add some content using the rich text editor
   - **Published At**: Select today's date
   - **Featured**: Toggle ON (to show on homepage)
   - **Reading Time**: 5
   - **Tags**: Add "AI", "Agent Factory", "SaaS"

4. Click **"Publish"** (top right)

### Step 5: See It Live!

Go back to: **http://localhost:3000**
- Scroll to **"Featured Blog Posts"** section on homepage
- Click **"Blog"** in navbar to see all posts
- Click on a blog card to read the full post

## 📝 Adding the 5 Blog Posts

You mentioned these topics. Here's the quickest way:

### Option A: Manual (Sanity Studio UI)
Follow Step 4 above for each blog post. Takes ~5-10 min per post.

### Option B: Using Your AI Agent
Since you have Sanity MCP integrated, you can ask your AI agent:
```
"Create a blog post in Sanity with title 'The Agent Factory: AI Ki Nai Duniya', category AI & Agents, excerpt '...', and body with these key points: ..."
```

The AI can create posts directly without you opening Sanity Studio!

## 🎨 What Each Page Looks Like

### Homepage (`/`)
- Scroll down to see "Featured Blog Posts" section
- Shows 3 cards with gradient effects
- "View All Posts" button

### Blog Listing (`/blog`)
- Animated hero with gradient orbs
- Category filter tabs (All, AI & Agents, Web Dev, etc.)
- Grid of blog cards
- Each card shows:
  - Cover image
  - Category badge (color-coded)
  - Title
  - Excerpt
  - Reading time & date
  - Tags
  - "Read More" link

### Individual Post (`/blog/[slug]`)
- Full-width cover image
- Category badge
- Title with gradient effect
- Excerpt
- Reading time & publish date
- Tags
- Share button
- Full blog content with:
  - Formatted headings (H2, H3, H4)
  - Code blocks with syntax highlighting
  - Images with captions
  - Lists, links, bold/italic text
- "Back to All Posts" CTA

## 🎯 Pro Tips

### 1. Featured Posts Strategy
- Mark your best 3 posts as "Featured"
- They appear on homepage
- Great for showcasing your top content

### 2. Category Selection
- **AI & Agents**: "The Agent Factory", "Prompting in 2026"
- **Tutorial**: "How I Built an AI Agent"
- **Web Development**: "Next.js 15 vs 14", "Why Sanity CMS"

### 3. Cover Images
- Recommended size: 1400x800px
- Use tools like:
  - Unsplash (free stock photos)
  - Pexels (free stock photos)
  - Canva (create custom graphics)
  - Your own screenshots

### 4. Code Blocks
In Sanity rich text editor:
- Click code icon `</>`
- Select language (JavaScript, Python, etc.)
- Add filename (optional)
- Paste code
- Looks beautiful with syntax highlighting!

### 5. SEO Optimization
For each post, expand "SEO" section and add:
- Meta Title (shows in Google)
- Meta Description (160 chars)

## 🔄 Content Update Workflow

### Adding New Post:
1. Open Sanity Studio
2. Create → Blog
3. Fill in fields
4. Publish
5. Instantly appears on your site!

### Editing Existing Post:
1. Open post in Sanity Studio
2. Make changes
3. Click "Publish"
4. Changes appear immediately

### Deleting Post:
1. Open post in Sanity Studio
2. Click "⋯" menu (top right)
3. "Unpublish" → "Delete"

## 📊 What to Check

### Navbar:
- [ ] "Blog" link visible between "Experience" and "AI Agent"
- [ ] Link works on desktop
- [ ] Link works in mobile menu

### Homepage:
- [ ] Featured blogs section appears (when you have featured posts)
- [ ] Shows max 3 posts
- [ ] Cards look good
- [ ] "View All Posts" button works

### Blog Listing Page:
- [ ] Hero animation works
- [ ] Category filters work
- [ ] Blog cards display correctly
- [ ] Hover effects smooth
- [ ] Responsive on mobile

### Individual Blog Page:
- [ ] Cover image displays
- [ ] Content renders correctly
- [ ] Code blocks have syntax highlighting
- [ ] Share button works
- [ ] Back button works
- [ ] Tags display
- [ ] Responsive on mobile

## 🐛 Common Issues & Fixes

### Issue: "No blog posts yet"
**Fix**: Create posts in Sanity Studio and click "Publish"

### Issue: Featured section not showing on homepage
**Fix**: 
- Create at least 1 blog post
- Toggle "Featured" to ON
- Make sure it has a published date

### Issue: Images not loading
**Fix**: 
- Check Sanity environment variables in `.env.local`
- Verify images are uploaded in Sanity

### Issue: Code highlighting not working
**Fix**: 
- Already installed: `react-syntax-highlighter`
- Rebuild: `npm run build`

### Issue: Blog page is blank
**Fix**:
- Check browser console for errors
- Verify Sanity credentials in `.env.local`
- Make sure posts are published (not draft)

## 🎉 You're All Set!

Your blog is production-ready. Just add content!

### Quick checklist:
- [x] Navbar updated
- [x] Blog pages created
- [x] Components built
- [x] Sanity integration done
- [x] Build successful
- [ ] Add blog content (your next step!)

---

**Need help?** Check `BLOG_CONFIG_GUIDE.md` for detailed instructions on writing each blog post!
