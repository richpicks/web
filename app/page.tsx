import { Metadata } from 'next'
import { PostType } from '@/app/lib/types'
import { Post } from '@/app/components/Post'
import { getSeasonPosts } from '@/app/lib/api'
import { Scoreboard } from '@/app/components/Scoreboard'

export const metadata: Metadata = {
  title: 'Welcome to Rich Picks',
}

const Home = async () => {
  // page data
  const postSeasonID = '2fFNefMY9NL4NJAvuTvbKB'
  const regularSeasonID = 'Gk280DXUgVsMda9OsJy2p'
  const postSeasonPosts = (await getSeasonPosts(postSeasonID)) ?? []
  const regularSeasonPosts = (await getSeasonPosts(regularSeasonID)) ?? []
  // JSX
  return (
    <>
      {postSeasonPosts.length > 0 ? (
        <article className="article">
          <header className="header">
            <div className="container">
              <h1 className="heading">NFL Post Season</h1>
            </div>
          </header>
          <Scoreboard seasonID={postSeasonID} />
          {postSeasonPosts.map((post: PostType) => (
            <Post key={post.sys.id} data={post} />
          ))}
        </article>
      ) : null}

      <article className="article">
        <header className="header">
          <div className="container">
            <h1 className="heading">NFL Regular Season</h1>
          </div>
        </header>
        <Scoreboard seasonID={regularSeasonID} />
        {regularSeasonPosts.map((post: PostType) => (
          <Post key={post.sys.id} data={post} />
        ))}
      </article>
    </>
  )
}

export default Home
