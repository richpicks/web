import { Metadata } from 'next'
import Link from 'next/link'
// import { PostType } from '@/app/lib/types'
// import { Post } from '@/app/components/Post'
// import { getSeasonPosts } from '@/app/lib/api'
// import { Scoreboard } from '@/app/components/Scoreboard'
import styles from './page.module.scss'

export const metadata: Metadata = {
  title: 'Rich Picks the National Football League',
}

const NFL = async () => {
  // page data
  // const regularSeasonID = '2cOksvEfEZ6p3w4zIDPyft'
  // const regularSeasonPosts = (await getSeasonPosts(regularSeasonID)) ?? []
  // JSX
  return (
    <article className="article">
      <header className="header">
        <div className="container">
          <h1 className="heading">National Football League</h1>
        </div>
      </header>
      <div className={styles.body}>
        <div className="container">
          <ul className={styles.list}>
            <li>
              <Link href="/nfl/2024-post-season">2024 Post Season</Link>
            </li>
            <li>
              <Link href="/nfl/2024-regular-season">2024 Regular Season</Link>
            </li>
            <li>
              <Link href="/nfl/2023-post-season">2023 Post Season</Link>
            </li>
            <li>
              <Link href="/nfl/2023-regular-season">2023 Regular Season</Link>
            </li>
          </ul>
        </div>
      </div>
    </article>
  )
}

export default NFL
