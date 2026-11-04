import { notFound } from 'next/navigation'
import { BankrollType } from '@/app/lib/types'
import { Record } from '@/app/components/Record'
import { getBankrollBySeasonSlug, getSeasonPostsBySlug } from '@/app/lib/api'
import { getLedger } from '@/app/lib/bankroll'

const Page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params
  const settings: BankrollType | undefined = await getBankrollBySeasonSlug(slug)
  if (!settings) notFound()
  const { items, label } = (await getSeasonPostsBySlug(slug)) ?? {}
  const ledger = getLedger(items ?? [], settings)
  // JSX
  return (
    <article className="article">
      <header className="header">
        <div className="container">
          <h1 className="heading">{label} record</h1>
        </div>
      </header>
      <Record ledger={ledger} />
    </article>
  )
}

export default Page
