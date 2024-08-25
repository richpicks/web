import { PostType } from '@/app/lib/types'
import { Post } from '@/app/components/Post'
import { Scoreboard } from '@/app/components/Scoreboard'
import { getSeasonPostsBySlug } from '@/app/lib/api'

const Page = async ({ params }: { params: { slug: string } }) => {
  const { slug } = params
  const { id, items, label } = (await getSeasonPostsBySlug(slug)) ?? {}
  // JSX
  return items.length > 0 ? (
    <article className="article">
      <header className="header">
        <div className="container">
          <h1 className="heading">{label}</h1>
        </div>
      </header>
      <Scoreboard seasonID={id} />
      {items.map((post: PostType) => (
        <Post key={post.sys.id} data={post} />
      ))}
    </article>
  ) : null
}

export default Page
