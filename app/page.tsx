import { Metadata } from 'next'
import { PostType } from '@/app/lib/types'
import { Post } from '@/app/components/Post'
import { getItGirl } from '@/app/lib/api'

export const metadata: Metadata = {
  title: 'Welcome to Rich Picks',
}

const Home = async () => {
  // fetch data
  const posts = (await getItGirl(false)) ?? []
  // JSX
  return posts.length === 0 ? (
    <section className="section">
      <div className="container">
        <header className="header">
          <h1 className="heading">
            Welcome to Rich Picks
          </h1>
        </header>
      </div>
    </section>
  ) : posts.map((post: PostType) => <Post key={post.sys.id} data={post} />)
}

export default Home
