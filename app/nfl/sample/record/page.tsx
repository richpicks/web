import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Record } from '@/app/components/Record'
import { getLedger } from '@/app/lib/bankroll'
import { sampleBankroll, samplePosts } from '@/app/lib/sample'

export const metadata: Metadata = {
  title: 'Sample record',
  robots: { index: false },
}

// made-up picks, for checking the record page on preview deployments
const Page = () => {
  if (process.env.VERCEL_ENV === 'production') notFound()
  const ledger = getLedger(samplePosts, sampleBankroll)
  // JSX
  return (
    <article className="article">
      <header className="header">
        <div className="container">
          <h1 className="heading">Sample record (made-up picks)</h1>
        </div>
      </header>
      <Record ledger={ledger} />
    </article>
  )
}

export default Page
