import { ArticleCard } from "./_components/article-card";

export default async function BlogIndexPage() {
    return (
        <div className="grid grid-cols-3 gap-4 w-full">
            <ArticleCard
                href="/blog/how-to-create-a-blog-tutorial-no-one-asked-for"
                title="How to create a Blog Tutorial No one Asked For"
                summary="lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur, hic."
                coverImage="http://via.assets.so/img.jpg?w=600&h=300&bg=6b7280&f=png"
                publishedAt={new Date('2025-11-13T20:45:00')}
                readTimesMins={42}
                author={{
                    avatar: "http://via.assets.so/img.jpg?w=600&h=300&bg=6b7280&f=png",
                    name: 'John Doe',
                    role: 'Staff Writter',
                }}
                
            />
        </div>
    )
}