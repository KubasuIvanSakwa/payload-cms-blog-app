import Image from 'next/image'
import { ArticleMetadata } from '../_components/article-metadata'

const publishedAt = new Date('2025-11-13T20:45:00')

export default async function BlogPostPage() {
  return (
    <div className="prose lg:prose-lg dark:prose-invert">
      {/* title */}
      <h1>How To Create a Blog Tutorial No One Asked For</h1>

      {/* metadata */}
      <ArticleMetadata 
        intent='post'
        data={{
            author: {
                avatar: 'http://via.assets.so/img.jpg?w=600&h=300&bg=6b7280&f=png',
                name: 'John Doe',
                role: 'Staff Writer'
            },
            publishedAt,
            readTimeMins: 42
        }}
        className='not-prose'
      />

      {/* cover image */}
      <Image
        src="http://via.assets.so/img.jpg?w=600&h=300&bg=6b7280&f=png"
        alt="Cover image"
        width={600}
        height={300}
        className="w-full rounded-md object-center object-cover"
        placeholder="blur"
        blurDataURL='http://via.assets.so/img.jpg?w=600&h=300&bg=6b7280&f=png'
      />

      {/* content */}
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
        laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
        voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
        cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
        laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
        voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
        cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
        laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
        voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
        cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </p>
    </div>
  )
}
