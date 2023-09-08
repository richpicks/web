import { Metadata } from 'next'
import { PostType } from '@/app/lib/types'
import { Post } from '@/app/components/Post'
import { getItGirl } from '@/app/lib/api'
import styles from './page.module.scss'

export const metadata: Metadata = {
  title: 'Welcome to Rich Picks',
}

const Home = async ({ preview=false }) => {
  const posts = (await getItGirl(preview)) ?? []
  // const posts: any[] = []
  const heroPost = posts[0]
  const morePosts = posts.slice(1)
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
  ) : (
    <>
      <Post data={heroPost} heading="This week Rich picks" />
      {morePosts.length > 0 && (
        <>
          {morePosts.map((post: PostType, index: number) => (
            <Post
              key={post.sys.id}
              data={post}
              heading={index === 0 ? 'Last week Rich picked' : post.title}
            />
          ))}
        </>
      )}
    </>
  )
}

export default Home
