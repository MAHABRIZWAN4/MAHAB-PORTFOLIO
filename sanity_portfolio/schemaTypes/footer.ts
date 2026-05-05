import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'footer',
  title: 'Footer',
  type: 'document',
  fields: [
    defineField({
      name: 'copyrightName',
      title: 'Copyright Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'Name to display in copyright text',
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
      name: 'builtWithTech',
      title: 'Built With Technologies',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'name',
              type: 'string',
              title: 'Technology Name',
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'color',
              type: 'string',
              title: 'Color (CSS variable)',
              description: 'e.g., "var(--accent)" or "var(--accent-teal)"',
              validation: (Rule: any) => Rule.required(),
            },
          ],
        },
      ],
      validation: (Rule) => Rule.required().min(1),
      description: 'Technologies to display in "Built with" section',
    }),
  ],
  preview: {
    select: {
      title: 'copyrightName',
    },
    prepare(selection) {
      return {
        title: `Footer - ${selection.title}`,
      }
    },
  },
})
