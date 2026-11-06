export default {
  name: 'article',
  title: 'Article',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'excerpt',
      title: 'Summary',
      type: 'text',
      rows: 3,
      description: 'Short deck shown under the headline',
    },
    {
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      options: { hotspot: true },
      description:
        'Use Unsplash/Pexels/Wikimedia or your own photos — never publisher news photos without a licence.',
      fields: [
        { name: 'alt', type: 'string', title: 'Alt text' },
        {
          name: 'photographer',
          type: 'string',
          title: 'Photographer',
        },
        {
          name: 'source',
          type: 'string',
          title: 'Source',
          description: 'e.g. Unsplash, Pexels, Wikimedia Commons',
        },
        {
          name: 'sourceUrl',
          type: 'url',
          title: 'Original image URL',
        },
        {
          name: 'licence',
          type: 'string',
          title: 'Licence',
          description: 'e.g. Unsplash License, Pexels License, CC BY-SA 4.0',
        },
        {
          name: 'attributionRequired',
          type: 'boolean',
          title: 'Attribution required',
          initialValue: false,
        },
        {
          name: 'downloadDate',
          type: 'date',
          title: 'Download date',
        },
      ],
    },
    {
      name: 'sources',
      title: 'Source references',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', type: 'string', title: 'Label' },
            { name: 'url', type: 'url', title: 'URL' },
          ],
          preview: {
            select: { title: 'label', subtitle: 'url' },
          },
        },
      ],
      description:
        'Link original reporting and official sources. Citing a publisher does not allow copying their text.',
    },
    {
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'category' }],
    },
    {
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{ type: 'author' }],
    },
    {
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    },
    {
      name: 'featured',
      title: 'Featured on homepage',
      type: 'boolean',
      initialValue: false,
      description: 'Show in the top opinion / feature strip',
    },
    {
      name: 'isLead',
      title: 'Lead story',
      type: 'boolean',
      initialValue: false,
      description: 'Main homepage headline (use only one)',
    },
    {
      name: 'isLive',
      title: 'Live',
      type: 'boolean',
      initialValue: false,
      description: 'Show as a live story block',
    },
    {
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'Quote', value: 'blockquote' },
          ],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'URL',
                  },
                ],
              },
            ],
          },
        },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alt text',
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Caption',
            },
          ],
        },
      ],
    },
  ],
  orderings: [
    {
      title: 'Published date, newest',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'mainImage',
      category: 'category.title',
    },
    prepare({ title, author, media, category }) {
      return {
        title,
        subtitle: [category, author].filter(Boolean).join(' · '),
        media,
      }
    },
  },
}
