import { getPayloadClient } from "@/lib/payload/client"
import { CACHE_TAG_ARTICLES, STATUS_OPTION } from "./constants"
import { unstable_cache } from "next/cache"


async function _getPublishedArticles() {
    const payload = await getPayloadClient()

    try {
        const { docs: articles } = await payload.find({
            // depth: 0, --> used to show id of object depth: 0, depth: 1 used ot show they whole object
            collection:'articles',
            where: { status: { equals: STATUS_OPTION.PUBLISHED}},
            select: {
                slug: true,
                title: true,
                contentSummary: true,
                author: true,
                coverImage: true,
                status: true,
                readTimeInMins: true,
                publishedAt: true,
            }
        })

        return articles ?? []

    } catch(error) {
        console.error('Failed to fetch Articles', error)
        return []
    }
}



export function getPublishedArticles() {
    return unstable_cache(_getPublishedArticles, [], {
        tags: [CACHE_TAG_ARTICLES],
    })()
}

export async function getArticleBySlug(slug: string) {
    const payload = await getPayloadClient()

    try {
        const { docs: articles} = await payload.find({
            collection: 'articles',
            limit: 1,
            where: { slug: { equals: slug }}
        })
        const [firstArticle] = articles ?? []
        return firstArticle ?? []
    } catch (error){
        console.error('Failed to fetch articles', error)
        return null
    }
}