import { notFound } from 'next/navigation'
import { getFormattedDate } from '@/lib/date'
import { findPostBySlug, getSortedPosts } from '@/lib/posts'
import PostMarkdown from './_components/PostMarkdown'

type PostMetadata = { slug: string }

export const generateStaticParams = async (): Promise<PostMetadata[]> => {
  const posts = await getSortedPosts()

  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export const generateMetadata = async ({
  params,
}: {
  params: PostMetadata
}) => {
  const { slug } = params

  const postData = await findPostBySlug(slug)

  return postData !== undefined
    ? {
        title: postData.title,
      }
    : {
        title: 'Post not found',
      }
}

const Post = async ({ params }: { params: PostMetadata }) => {
  const { slug } = params
  const postData = await findPostBySlug(slug)

  if (postData === undefined) return notFound()

  const { title, date, contentHtml } = postData

  return (
    <section className="mx-auto mt-6 max-w-2xl px-4">
      <h2 className="text-4xl font-bold">{title}</h2>
      <p className="text-xl pt-2 pb-4">
        Written by TJ Maynes on {getFormattedDate(date)}
      </p>
      <PostMarkdown markdownContent={contentHtml} />
    </section>
  )
}

export default Post
