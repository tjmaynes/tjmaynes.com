import { Metadata } from 'next'
import Posts from './_components/Posts'

export const metadata: Metadata = {
  title: 'TJ Maynes',
  description: 'A blog dedicated to my ramblings, learnings and other things.',
}

const Home = () => {
  return (
    <main className="px-6 mx-auto">
      <Posts />
    </main>
  )
}

export default Home
