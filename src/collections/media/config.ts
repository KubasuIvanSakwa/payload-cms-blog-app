import type { CollectionConfig } from 'payload'
import { generateAltHook } from './lib/generate-image-alt.hook'
import { generateBlurDataUrl, isElibleForBlurDataUrl } from './lib/generate-blur-data-url'

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
    {
      name: 'blurDataUrl',
      type: 'text',
      required: true,
      admin: { hidden: true },
    },
  ],
  upload: true,
  hooks: {
    beforeChange: [
        async ({ operation, data, req }) => {
          if (operation !== 'create') return data
          // 1. check if media file is elegible
          if(!isElibleForBlurDataUrl(req.file?.mimetype)) return data
          // 2. if eligible generate blur hash
          const base64 = await generateBlurDataUrl(req.file?.data)
          if(!base64) return data
          // 3. set it to data.blurDataUrl
          data.blurDataUrl = base64
          console.log(`generated blur data url for ${data.filename}`)
          // 4. return data
          return data
        }
    ]
  }
}
