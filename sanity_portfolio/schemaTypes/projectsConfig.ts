import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'projectsConfig',
  title: 'Projects Section Config',
  type: 'document',
  fields: [
    defineField({
      name: 'sectionHeading',
      title: 'Section Heading',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'Main heading for the projects section (e.g., "Featured Projects")',
    }),
    defineField({
      name: 'sectionDescription',
      title: 'Section Description',
      type: 'text',
      rows: 2,
      validation: (Rule) => Rule.required().max(200),
      description: 'Brief description shown below the heading',
    }),
    defineField({
      name: 'terminalPath',
      title: 'Terminal Path',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'Terminal-style path shown at the top (e.g., "~/portfolio/projects")',
    }),
    defineField({
      name: 'categories',
      title: 'Project Categories',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'name',
              type: 'string',
              title: 'Category Name',
              validation: (Rule) => Rule.required(),
              description: 'e.g., "AI", "Full Stack", "Backend", "Web3"',
            },
            {
              name: 'accentColor',
              type: 'string',
              title: 'Accent Color (Hex)',
              validation: (Rule) =>
                Rule.required().regex(/^#[0-9A-Fa-f]{6}$/, {
                  name: 'hex color',
                  invert: false,
                }),
              description: 'Hex color code (e.g., #00ff9d)',
            },
            {
              name: 'glowColor',
              type: 'string',
              title: 'Glow Color (RGBA)',
              validation: (Rule) => Rule.required(),
              description: 'RGBA color for glow effect (e.g., rgba(0,255,157,0.15))',
            },
            {
              name: 'tagColor',
              type: 'string',
              title: 'Tag Background Color (RGBA)',
              validation: (Rule) => Rule.required(),
              description: 'RGBA color for tag background (e.g., rgba(0,255,157,0.12))',
            },
          ],
          preview: {
            select: {
              title: 'name',
              subtitle: 'accentColor',
            },
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1),
      description: 'Categories for filtering projects. First category will be used as default.',
    }),
  ],
  preview: {
    select: {
      title: 'sectionHeading',
      subtitle: 'sectionDescription',
    },
  },
})
