import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'skill',
  title: 'Skill',
  type: 'document',
  fields: [
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Frontend', value: 'frontend' },
          { title: 'Backend', value: 'backend' },
          { title: 'AI & Agents', value: 'ai' },
          { title: 'DevOps', value: 'devops' },
          { title: 'Tools & CMS', value: 'tools' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'categoryLabel',
      title: 'Category Label',
      type: 'string',
      description: 'Display name for the category (e.g., "Frontend")',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'command',
      title: 'Command',
      type: 'string',
      description: 'Terminal command (e.g., "npm install frontend-stack")',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'color',
      title: 'Color',
      type: 'string',
      description: 'Hex color code (e.g., "#a78bfa")',
      validation: (Rule) => Rule.required().regex(/^#[0-9A-Fa-f]{6}$/),
    }),
    defineField({
      name: 'items',
      title: 'Items',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'pkg',
              title: 'Package',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'note',
              title: 'Note',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
          ],
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      validation: (Rule) => Rule.required(),
    }),
  ],
})
