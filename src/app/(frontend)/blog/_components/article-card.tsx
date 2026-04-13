import Image from 'next/image'
import Link from 'next/link'
import { ArticleMetadata } from './article-metadata'
import { Media } from '@/payload-types'

type ArticleCardProps = {
    href: string
    title: string
    summary: string
    coverImage: Media
    publishedAt: Date
    readTimesMins: number
    author: {
        avatar: Media
        name: string
        role: string
    }
}


export function ArticleCard({
    href,
    title,
    summary,
    coverImage,
    publishedAt,
    readTimesMins,
    author,
}: ArticleCardProps ) {
     return (
        <Link href={href} aria-label={`Read article: "${title}"`} className="block">
            <article className="rounded-md border border-gray-700 overflow-hidden h-full flex flex-col">
                {/* cover image */}
                <Image
                    src={coverImage.url ?? ''}
                    alt={`Cover image for "${title}"`}
                    width={600}
                    height={300}
                    className="h-[200px] object-cover object-center w-full"
                    placeholder="blur"
                    blurDataURL='http://via.assets.so/img.jpg?w=600&h=300&bg=6b7280&f=png'
                />

                {/* content */}
                <div className="p-3 flex-1 flex flex-col gap-5">
                    <header>
                        {/* title */}
                        <h2 className="font-bold text-lg">{title}</h2>
                        {/* summary */}
                        <p className="mt-2">{summary}</p>
                    </header>

                    <ArticleMetadata
                        intent="card"
                        data={{ author, publishedAt, readTimesMins }}
                        className="mt-auto"
                    />
                </div>
            </article>
        </Link>
    )
}

export function ArticleCardSkeleton() {
    return <div className="rounded-md h-[350px] animate-pulse bg-gray-700" />
}