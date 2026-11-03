export default {
  name: 'category',
  title: 'Category',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'e.g. News, Politics, Culture',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'color',
      title: 'Accent color',
      type: 'string',
      description: 'Optional hex color for labels',
      initialValue: '#c41230',
    },
  ],
  preview: {
    select: { title: 'title' },
  },
}
