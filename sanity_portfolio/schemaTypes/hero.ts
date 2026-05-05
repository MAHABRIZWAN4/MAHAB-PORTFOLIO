import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'hero',
  title: 'Hero Section',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'rotatingTitles',
      title: 'Rotating Titles',
      type: 'array',
      of: [{type: 'string'}],
      validation: (Rule) => Rule.required().min(1).max(5),
      description: 'Animated titles that rotate on the hero section',
    }),
    defineField({
      name: 'techPills',
      title: 'Tech Pills',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'icon', type: 'string', title: 'Icon (emoji)'},
            {name: 'label', type: 'string', title: 'Label'},
          ],
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required().max(200),
    }),
    defineField({
      name: 'availabilityStatus',
      title: 'Availability Status',
      type: 'string',
      description: 'e.g., "Available for hire"',
    }),
    defineField({
      name: 'availabilityYear',
      title: 'Availability Year',
      type: 'string',
      description: 'e.g., "2026"',
    }),
    defineField({
      name: 'stats',
      title: 'Stats',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'value', type: 'string', title: 'Value (e.g., "3+")'},
            {name: 'label', type: 'string', title: 'Label (e.g., "Apps Built")'},
          ],
        },
      ],
      validation: (Rule) => Rule.required().min(4).max(4),
      description: 'Exactly 4 stats to display',
    }),
    defineField({
      name: 'githubUrl',
      title: 'GitHub URL',
      type: 'url',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'linkedinUrl',
      title: 'LinkedIn URL',
      type: 'url',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'cvFile',
      title: 'CV File',
      type: 'file',
      description: 'Upload your CV/Resume PDF',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'tagline',
    },
  },
})
