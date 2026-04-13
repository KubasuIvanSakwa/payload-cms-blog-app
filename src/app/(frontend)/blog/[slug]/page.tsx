import Image from 'next/image'
import { ArticleMetadata } from '../_components/article-metadata'
import { getArticleBySlug } from '@/collections/Articles/fetchers'
import { RichText } from '@/lib/payload/helpers/components/rich-text'
import { notFound } from 'next/navigation'
import { realtionIsObject } from '@/lib/payload/helpers/relation-is-object'

const publishedAt = new Date('2025-11-13T20:45:00')

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = await getArticleBySlug(slug)

  if (!article) notFound()

  if (!realtionIsObject(article.coverImage)) return null
  if (!realtionIsObject(article.author) || !realtionIsObject(article.author.avatar)) return null

    return (
      <div className="prose lg:prose-lg dark:prose-invert">
        {/* title */}
        <h1>{article.title}</h1>

        {/* metadata */}
        <ArticleMetadata
          intent="post"
          data={{
            author: {
              avatar: article.author.avatar,
              name: article.author.name,
              role: article.author.role,
            },
            publishedAt,
            readTimeMins: article.readTimeInMins ?? 0,
          }}
          className="not-prose"
        />

        {/* cover image */}
        <Image
          src={article.coverImage.url ?? ''}
          alt={article.coverImage.alt}
          width={600}
          height={300}
          className="w-full rounded-md object-center object-cover"
          placeholder="blur"
          blurDataURL={article.coverImage.blurDataUrl}
        />

        {/* content */}
        <RichText lexicalData={article.content} />
      </div>
    )
}
