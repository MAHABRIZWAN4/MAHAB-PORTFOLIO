# Projects Section Configuration Guide

## ✅ Changes Completed

### 1. Sanity Schema Created
- **File**: `sanity_portfolio/schemaTypes/projectsConfig.ts`
- **Registered in**: `sanity_portfolio/schemaTypes/index.ts`

### 2. Frontend Updated
- **Interface added**: `frontend/lib/sanity.ts` - `ProjectsConfig` interface
- **Fetch function added**: `frontend/lib/sanity.ts` - `getProjectsConfig()`
- **Component updated**: `frontend/components/sections/ProjectsSection.tsx`

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

### Step 3: Create Projects Config Document
1. Click on **"Projects Section Config"** in the sidebar
2. Click **"Create new"** button
3. Fill in the following fields:

---

## 📋 Fields to Fill

### 1. Section Heading
**Field**: `sectionHeading`
**Type**: String
**Example**: `Featured Projects`
**Description**: Main heading that appears at the top of the projects section

---

### 2. Section Description
**Field**: `sectionDescription`
**Type**: Text
**Example**: `// A showcase of work in AI, full-stack, and backend engineering`
**Description**: Brief description shown below the heading

---

### 3. Terminal Path
**Field**: `terminalPath`
**Type**: String
**Example**: `~/portfolio/projects`
**Description**: Terminal-style path shown at the top (keep the tilde and slashes)

---

### 4. Project Categories
**Field**: `categories`
**Type**: Array of Objects
**Description**: Categories for filtering projects with their colors

#### For Each Category, Add:

##### Category 1: AI
- **Category Name**: `AI`
- **Accent Color (Hex)**: `#00ff9d`
- **Glow Color (RGBA)**: `rgba(0,255,157,0.15)`
- **Tag Background Color (RGBA)**: `rgba(0,255,157,0.12)`

##### Category 2: Full Stack
- **Category Name**: `Full Stack`
- **Accent Color (Hex)**: `#00c8ff`
- **Glow Color (RGBA)**: `rgba(0,200,255,0.15)`
- **Tag Background Color (RGBA)**: `rgba(0,200,255,0.12)`

##### Category 3: Backend
- **Category Name**: `Backend`
- **Accent Color (Hex)**: `#ff6b35`
- **Glow Color (RGBA)**: `rgba(255,107,53,0.15)`
- **Tag Background Color (RGBA)**: `rgba(255,107,53,0.12)`

##### Category 4: Web3
- **Category Name**: `Web3`
- **Accent Color (Hex)**: `#bf5af2`
- **Glow Color (RGBA)**: `rgba(191,90,242,0.15)`
- **Tag Background Color (RGBA)**: `rgba(191,90,242,0.12)`

---

## 🎨 How to Add a Category

1. Click **"Add item"** button under "Project Categories"
2. Fill in:
   - **Category Name**: The display name (e.g., "AI", "Mobile", "DevOps")
   - **Accent Color**: Hex color code starting with # (e.g., `#00ff9d`)
   - **Glow Color**: RGBA format for glow effect (e.g., `rgba(0,255,157,0.15)`)
   - **Tag Background**: RGBA format for tag background (e.g., `rgba(0,255,157,0.12)`)

### Color Tips:
- **Accent Color**: Main color for text and borders
- **Glow Color**: Same as accent but with low opacity (0.15) for glow effects
- **Tag Background**: Same as accent but with very low opacity (0.12) for tag backgrounds

### Example for Custom Category "Mobile":
```
Category Name: Mobile
Accent Color: #ff6b9d
Glow Color: rgba(255,107,157,0.15)
Tag Background: rgba(255,107,157,0.12)
```

---

## ⚠️ Important Notes

1. **Only create ONE document** - The system will use the first document it finds
2. **Category Names must match** - Make sure category names in this config match the `category` field in your Project documents
3. **First category is default** - The first category in the list will be used as the default color for the "All" filter
4. **Hex color format** - Must start with # and have 6 characters (e.g., #00ff9d)
5. **RGBA format** - Must be in format: `rgba(R,G,B,A)` where R,G,B are 0-255 and A is 0-1

---

## 🔄 After Filling Data

1. Click **"Publish"** button in Sanity Studio
2. Wait a few seconds for the data to sync
3. Refresh your frontend application
4. The Projects section should now show your custom content!

---

## 🎯 Default Fallbacks

If no config is found in Sanity, the component will use these defaults:
- **Heading**: "Featured Projects"
- **Description**: "// A showcase of work in AI, full-stack, and backend engineering"
- **Terminal Path**: "~/portfolio/projects"
- **Categories**: AI, Full Stack, Backend, Web3 (with default colors)

---

## 🐛 Troubleshooting

### Data not showing?
1. Check Sanity Studio - is the document published?
2. Check browser console for errors
3. Verify your Sanity project ID and dataset in `.env` files

### Colors not working?
1. Verify hex colors start with `#`
2. Verify RGBA colors are in correct format
3. Check for typos in color values

### Categories not filtering?
1. Make sure category names in Projects Config match the `category` field in your Project documents exactly (case-sensitive)
2. Example: If config has "Full Stack", projects must also have "Full Stack" (not "full stack" or "FullStack")
