import type { CollectionConfig } from 'payload'
import { generateSlugHook } from './hooks/generate-slug.hook'
import { generateContentSummaryHook } from './hooks/generate-content-summary.hook'
import { convertLexicalToPlaintext } from '@payloadcms/richtext-lexical/plaintext'
import { STATUS_OPTION } from './constants'

// fields
// - title ✔
// - slug (auto-genetated from title) ✔
// - content (rich text, WYSIWYG editor) ✔
// - content_summary ( auto-filled from content; for SEO and article cards) ✔
// - read_time_in_mins (auto-generated from content) ✔
// - cover_image ✔
// - author (relation to users collecction) ✔
// - status (draft, pulished) ✔
// - published_at (only visible when status is pulished) ✔

export const Articles: CollectionConfig = {
  slug: 'articles',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      hooks: {
        beforeValidate: [generateSlugHook],
      },
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
    },
    {
      name: 'contentSummary',
      type: 'textarea',
      required: true,
      hooks: {
        beforeValidate: [generateContentSummaryHook],
      },
    },
    {
      name: 'readTimeInMins',
      type: 'number',
      defaultValue: 0,
      hooks: {
        beforeChange: [
          ({ siblingData }) => {
            delete siblingData.readTimeInMins
          },
        ],
        afterRead: [
          ({ data }) => {
            const text = convertLexicalToPlaintext({ data: data?.content })
            const wordsPerMinute = 200
            const words = text.trim().split(/\s+/).length
            return Math.max(1, Math.ceil(words / wordsPerMinute))
          },
        ],
      },
    },
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'article-authors',
      required: true,
    },
    {
      name: 'status',
      type: 'select',
      options: [STATUS_OPTION.DRAFT, STATUS_OPTION.PUBLISHED],
      required: true,
      defaultValue: STATUS_OPTION.DRAFT,
    },
    {
      name: 'publishedAt',
      type: 'date',
      required: true,
      admin: {
        condition: (data) => data?.status === STATUS_OPTION.PUBLISHED,
        date: { pickerAppearance: 'dayAndTime'}
      }
    },
  ],
}
