# Navbar Configuration Guide

## ✅ Changes Completed

### 1. Sanity Schema Created
- **File**: `sanity_portfolio/schemaTypes/navbar.ts`
- **Registered in**: `sanity_portfolio/schemaTypes/index.ts`

### 2. Frontend Updated
- **Interface added**: `frontend/lib/sanity.ts` - `Navbar` interface
- **Fetch function added**: `frontend/lib/sanity.ts` - `getNavbar()`
- **Component updated**: `frontend/components/layout/Navbar.tsx`

---

## 📝 How to Fill Data in Sanity Studio

### Step 1: Start Sanity Studio
```bash
cd sanity_portfolio
npm run dev
```

### Step 2: Open Sanity Studio
- Open browser: `http://localhost:3333`
- Login with your Sanity account

### Step 3: Create Navbar Configuration Document
1. Click on **"Navbar Configuration"** in the sidebar
2. Click **"Create new"** button
3. Fill in the following fields:

---

## 📋 Fields to Fill

### 1. Logo Text
**Field**: `logo`
**Type**: String (max 3 characters)
**Example**: `MR`
**Description**: Short logo text displayed in the navbar (your initials)

---

### 2. Full Name
**Field**: `name`
**Type**: String
**Example**: `Mahab Rizwan`
**Description**: Your full name displayed next to the logo

---

### 3. Tagline/Role
**Field**: `tagline`
**Type**: String (max 50 characters)
**Example**: `AI Full Stack Developer`
**Description**: Your role or professional tagline

---

### 4. Mobile Sidebar Subtitle
**Field**: `mobileSubtitle`
**Type**: String
**Example**: `Portfolio Navigation`
**Description**: Subtitle shown in the mobile sidebar menu

---

### 5. Navigation Links
**Field**: `navLinks`
**Type**: Array of Objects (3-8 links recommended)
**Description**: Main navigation menu links

#### Add Each Link:
Click **"Add item"** and fill:

##### Link 1: Home
- **Link Name**: `Home`
- **Link Href**: `#home`

##### Link 2: Expertise
- **Link Name**: `Expertise`
- **Link Href**: `#expertise`

##### Link 3: Projects
- **Link Name**: `Projects`
- **Link Href**: `#projects`

##### Link 4: Skills
- **Link Name**: `Skills`
- **Link Href**: `#skills`

##### Link 5: Experience
- **Link Name**: `Experience`
- **Link Href**: `#experience`

##### Link 6: Contact
- **Link Name**: `Contact`
- **Link Href**: `#contact`

**Note**: You can add, remove, or reorder links as needed. The href should match the section IDs in your page.

---

### 6. GitHub URL
**Field**: `githubUrl`
**Type**: URL
**Example**: `https://github.com/yourusername`
**Description**: Your GitHub profile URL

---

### 7. LinkedIn URL
**Field**: `linkedinUrl`
**Type**: URL
**Example**: `https://linkedin.com/in/yourusername`
**Description**: Your LinkedIn profile URL

---

### 8. CTA Button Text (Desktop)
**Field**: `ctaButtonText`
**Type**: String (max 20 characters)
**Example**: `Hire Me`
**Description**: Call-to-action button text shown on desktop navbar

---

### 9. CTA Button Text (Mobile)
**Field**: `ctaButtonMobile`
**Type**: String (max 30 characters)
**Example**: `Let's Work Together`
**Description**: Call-to-action button text shown in mobile sidebar

---

## 💡 Tips

### Navigation Links Order
- Links appear in the order you add them
- Use the drag handle to reorder links in Sanity Studio
- Keep it between 3-8 links for best UX

### Link Hrefs
- Use `#sectionId` format for same-page navigation
- Example: `#home`, `#about`, `#projects`
- Make sure the section IDs exist on your page

### Logo Text
- Keep it short (2-3 characters)
- Usually your initials
- Examples: `MR`, `AB`, `JD`, `SK`

### CTA Buttons
- Desktop button is shorter (space constraint)
- Mobile button can be longer (full width)
- Make it action-oriented: "Hire Me", "Get in Touch", "Let's Talk"

---

## 🔄 After Filling Data

1. Click **"Publish"** button in Sanity Studio
2. Wait a few seconds for the data to sync
3. Refresh your frontend application
4. The Navbar should now show your custom content!

---

## 🎯 Default Fallbacks

If no config is found in Sanity, the component will use these defaults:
- **Logo**: "MR"
- **Name**: "Mahab Rizwan"
- **Tagline**: "AI Full Stack Developer"
- **Nav Links**: Home, Expertise, Projects, Skills, Experience, Contact
- **GitHub**: https://github.com
- **LinkedIn**: https://linkedin.com
- **CTA Desktop**: "Hire Me"
- **CTA Mobile**: "Let's Work Together"
- **Mobile Subtitle**: "Portfolio Navigation"

---

## 🐛 Troubleshooting

### Navbar not updating?
1. Check Sanity Studio - is the document published?
2. Check browser console for errors
3. Verify your Sanity project ID and dataset in `.env` files
4. Try hard refresh (Ctrl+Shift+R or Cmd+Shift+R)

### Links not working?
1. Make sure href matches section IDs on your page
2. Section IDs should be lowercase and match exactly
3. Example: If href is `#projects`, page should have `<section id="projects">`

### Social links not opening?
1. Verify URLs are complete (include `https://`)
2. Check for typos in URLs
3. Test URLs in a new browser tab first

---

## 📊 Example Complete Configuration

```
Logo Text: MR
Full Name: Mahab Rizwan
Tagline: AI Full Stack Developer
Mobile Subtitle: Portfolio Navigation

Navigation Links:
  1. Home → #home
  2. About → #about
  3. Projects → #projects
  4. Skills → #skills
  5. Contact → #contact

GitHub URL: https://github.com/mahabrizwan
LinkedIn URL: https://linkedin.com/in/mahabrizwan
CTA Button (Desktop): Hire Me
CTA Button (Mobile): Let's Work Together
```

---

## ✨ Customization Ideas

### Different Link Styles
- Professional: Home, About, Services, Portfolio, Contact
- Creative: Intro, Work, Skills, Story, Connect
- Minimal: Work, About, Contact
- Detailed: Home, Expertise, Projects, Experience, Skills, Testimonials, Contact

### CTA Button Variations
- **Hiring**: "Hire Me", "Available for Work", "Let's Collaborate"
- **Networking**: "Connect", "Get in Touch", "Say Hello"
- **Business**: "Start a Project", "Book a Call", "Request Quote"
- **Casual**: "Let's Chat", "Coffee?", "Ping Me"

---

## 🎨 What Gets Updated

When you change Navbar config in Sanity, these elements update automatically:
- ✅ Logo text in navbar
- ✅ Your name (desktop & mobile)
- ✅ Tagline/role
- ✅ All navigation links
- ✅ GitHub icon link
- ✅ LinkedIn icon link
- ✅ Desktop CTA button text
- ✅ Mobile sidebar subtitle
- ✅ Mobile CTA button text

Everything is now fully configurable from Sanity! 🚀
