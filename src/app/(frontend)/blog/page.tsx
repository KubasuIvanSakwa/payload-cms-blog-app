import { getPublishedArticles } from "@/collections/Articles/fetchers";
import { ArticleCard } from "./_components/article-card";
import { realtionIsObject } from "@/lib/payload/helpers/relation-is-object";

export default async function BlogIndexPage() {
    const articles = await getPublishedArticles()

    if(!articles.length) {
        return <p>No Articles Found</p>
    }

    return (
        <div className="grid grid-cols-3 gap-4 w-full">
            {articles.map(({ id, title, slug, contentSummary, coverImage, publishedAt, readTimeInMins, author }) => {

                if(!realtionIsObject(coverImage)) return null
                if(!realtionIsObject(author) || !realtionIsObject(author.avatar)) return null

                return (
                    <ArticleCard
                        key={id}
                        href={`/blog/${slug}`}
                        title={title}
                        summary={contentSummary}
                        readTimesMins={readTimeInMins ?? 0}
                        publishedAt={new Date(publishedAt ?? new Date())}
                        blurDataURL={coverImage.blurDataUrl}
                        coverImage={coverImage}
                        author={{
                                avatar: author.avatar,
                                name: author.name,
                                role: author.role,
                            }
                        }
                    />
                )
            })}
        </div>
    )
}