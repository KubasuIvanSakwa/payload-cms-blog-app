import type { CollectionConfig } from 'payload'
import { generateAltHook } from './Articles/hooks/generate-image-alt.hook'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      hooks: {
        beforeChange: [generateAltHook]
      }
    },
  ],
  upload: true,
}
