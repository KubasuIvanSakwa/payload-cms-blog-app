import { getPayloadClient } from "@/lib/payload/client";
import { seedAdmin } from "./admin.seeder";
import { seedArticleAuthor } from "./article-author.seeder";
import { seedArticle } from "./article.seerder";

async function main() {
    const payload = await getPayloadClient()
    try {
        await seedAdmin(payload)
        await seedArticleAuthor(payload)
        await seedArticle(payload)
        process.exit(0)
    } catch (error) {
        console.error(error)
        process.exit(1)
    }
}

void main()