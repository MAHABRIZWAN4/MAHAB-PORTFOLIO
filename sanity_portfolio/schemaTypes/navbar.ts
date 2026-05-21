import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'navbar',
  title: 'Navbar Configuration',
  type: 'document',
  fields: [
    defineField({
      name: 'logo',
      title: 'Logo Text',
      type: 'string',
      validation: (Rule) => Rule.required().max(3),
      description: 'Short logo text (e.g., "MR", "AB", "JD") - max 3 characters',
    }),
    defineField({
      name: 'name',
      title: 'Full Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'Your full name displayed in the navbar',
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline/Role',
      type: 'string',
      validation: (Rule) => Rule.required().max(50),
      description: 'Your role or tagline (e.g., "AI Full Stack Developer")',
    }),
    defineField({
      name: 'mobileSubtitle',
      title: 'Mobile Sidebar Subtitle',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'Subtitle shown in mobile sidebar (e.g., "Portfolio Navigation")',
    }),
    defineField({
      name: 'navLinks',
      title: 'Navigation Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'name',
              type: 'string',
              title: 'Link Name',
              validation: (Rule) => Rule.required(),
              description: 'Display name (e.g., "Home", "Projects")',
            },
            {
              name: 'href',
              type: 'string',
              title: 'Link Href',
              validation: (Rule) => Rule.required(),
              description: 'Section anchor (e.g., "#home", "#projects")',
            },
          ],
          preview: {
            select: {
              title: 'name',
              subtitle: 'href',
            },
          },
        },
      ],
      validation: (Rule) => Rule.required().min(3).max(8),
      description: 'Navigation menu links (3-8 links recommended)',
    }),
    defineField({
      name: 'githubUrl',
      title: 'GitHub URL',
      type: 'url',
      validation: (Rule) => Rule.required(),
      description: 'Your GitHub profile URL',
    }),
    defineField({
      name: 'linkedinUrl',
      title: 'LinkedIn URL',
      type: 'url',
      validation: (Rule) => Rule.required(),
      description: 'Your LinkedIn profile URL',
    }),
    defineField({
      name: 'ctaButtonText',
      title: 'CTA Button Text (Desktop)',
      type: 'string',
      validation: (Rule) => Rule.required().max(20),
      description: 'Call-to-action button text for desktop (e.g., "Hire Me")',
    }),
    defineField({
      name: 'ctaButtonMobile',
      title: 'CTA Button Text (Mobile)',
      type: 'string',
      validation: (Rule) => Rule.required().max(30),
      description: 'Call-to-action button text for mobile (e.g., "Let\'s Work Together")',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'tagline',
    },
  },
})
