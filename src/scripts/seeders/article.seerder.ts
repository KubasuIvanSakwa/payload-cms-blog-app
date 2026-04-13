import { Payload } from 'payload'
import { faker } from '@faker-js/faker'
import { convertMarkdownToLexical, editorConfigFactory } from '@payloadcms/richtext-lexical'
import config from '@/payload.config'
import { MAX_SUMMARY_LENGTH, STATUS_OPTION } from '@/collections/Articles/constants'
import { createMediaFromImageUrl } from '../lib/create-media-from-image-url'
import { slugify } from 'node_modules/zod/v4/core/util.cjs'

const ARTICLES_COUNT = 5

export async function seedArticle(payload: Payload) {
    let successCount = 0 
  for (let x = 0; x <= ARTICLES_COUNT; x++) {
    try {
      const imageUrl = faker.image.urlPicsumPhotos()
      const image = await createMediaFromImageUrl(payload, imageUrl)
      if (!image) {
        console.warn('Stopped seeding article because no image was creatd')
        return
      }

      const content = faker.lorem.paragraphs(3)
      const title = faker.lorem.sentence()
      const contentLexical = convertMarkdownToLexical({
        markdown: content,
        editorConfig: await editorConfigFactory.default({ config: await config }),
      })

      const status = faker.helpers.arrayElement(Object.values(STATUS_OPTION))

      await payload.create({
        collection: 'articles',
        data: {
          title: title,
          content: contentLexical,
          contentSummary: content.slice(0, MAX_SUMMARY_LENGTH),
          author: 1,
          coverImage: image.id,
          slug: slugify(title),
          status,
          ...(status === 'Published' && {
            publishedAt: faker.date.recent() as unknown as string,
          }),
        },
        draft: true,
      })
      successCount++
    } catch (error) {
      console.warn('Failed to Seed Article', error)
    }
  }
}
