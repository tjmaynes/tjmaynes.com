import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import getConfig from 'next/config'

const postsDirectory = path.join(process.cwd(), 'posts')
const publicDirectory = path.join(process.cwd(), 'public')
const postDirectoryDateRegex = /^(\d+)-(\d+)-(\d+)-/

export const getSortedPosts = async () => {
  const { serverRuntimeConfig } = getConfig()
  const { isDevMode } = serverRuntimeConfig

  const allPosts = await getAllPosts()

  const posts = isDevMode ? allPosts : allPosts.filter((post) => !post.draft)

  return sortByLatest(posts)
}

export const findPostBySlug = async (
  slug: string
): Promise<BlogPost | undefined> => {
  const allPosts = await getAllPosts()

  return Promise.resolve(allPosts.find(({ id }: BlogPost) => id.includes(slug)))
}

const getAllPosts = async (): Promise<BlogPost[]> => {
  const postDirectories = filterDirectoryFilesByTypes(postsDirectory, ['md'])

  return await Promise.all(
    postDirectories.map(
      async (postDirectory: string) => await getPostData(postDirectory)
    )
  )
}

const getPostData = async (postName: string): Promise<BlogPost> => {
  const fullPath = path.join(postsDirectory, postName)
  const fileContents = fs.readFileSync(fullPath, 'utf-8')
  const matterResult = matter(fileContents)

  const id = postName.replace('.md', '')

  const slug = id.replace(postDirectoryDateRegex, '')
  const { title, date, description } = matterResult.data

  const imageFiles = filterDirectoryFilesByTypes(
    path.join(publicDirectory, 'images', 'posts', id),
    ['jpg', 'gif', 'png']
  )

  let cleanContentHtml = matterResult.content
  for (const imageFile of imageFiles) {
    cleanContentHtml = cleanContentHtml.replace(
      imageFile,
      `/images/posts/${id}/${imageFile}`
    )
  }

  return {
    id,
    slug,
    title,
    date,
    description,
    contentHtml: cleanContentHtml,
    categories: matterResult.data.categories ?? [],
    draft: matterResult.data.draft ?? false,
  }
}

const filterDirectoryFilesByTypes = (
  sourceDirectory: string,
  types: string[]
): string[] => {
  if (!fs.existsSync(sourceDirectory)) return []

  return fs
    .readdirSync(sourceDirectory, { withFileTypes: true })
    .filter(
      (dirent) =>
        dirent.isFile() &&
        types.filter((type) => dirent.name.includes(type)).length > 0
    )
    .map((dirent) => dirent.name)
}

const sortByLatest = (posts: BlogPost[]) =>
  posts.sort((a: BlogPost, b: BlogPost) => (a.date < b.date ? 1 : -1))
