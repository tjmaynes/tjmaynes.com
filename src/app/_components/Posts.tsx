import Link from 'next/link'

import { getFormattedDate } from '@/lib/date'
import { getSortedPosts } from '@/lib/posts'

const Post = ({ slug, date, title, description }: BlogPost) => (
  <>
    <Link href={`/posts/${slug}`} className="underline hover:text-black/70">
      {title}
    </Link>
    <p className="text-sm">{getFormattedDate(date)}</p>
    <p className="prose mt-1 text-justify">{description}</p>
  </>
)

const Posts = async () => {
  const posts = await getSortedPosts()

  return (
    <section className="mx-auto px-4 mt-6 max-w-2xl">
      <ul className="w-full">
        {posts.map((post: BlogPost) => (
          <li key={post.id} className="mt-4 text-2xl">
            <Post {...post} />
          </li>
        ))}
      </ul>
    </section>
  )
}

export default Posts
