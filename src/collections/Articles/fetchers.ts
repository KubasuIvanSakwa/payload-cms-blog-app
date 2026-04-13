import { getPayloadClient } from "@/lib/payload/client"
import { STATUS_OPTION } from "./constants"


export async function getPublishedArticles() {
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