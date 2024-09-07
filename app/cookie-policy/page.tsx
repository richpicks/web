import { Metadata } from 'next'
import { CookieChoice } from '@/components/CookieChoice'
import styles from './page.module.scss'

export const metadata: Metadata = {
  title: 'Cookie Policy',
}

const CookiePolicy = async () => {
  // JSX
  return (
    <article className="article">
      <header className="header">
        <div className="container">
          <h1 className="heading">Cookie Policy</h1>
        </div>
      </header>
      <div className={styles.body}>
        <div className="container">
          <h2 className={styles.heading}>What are Cookies?</h2>
          <p className={styles.graph}>
            Cookies are small pieces of data that websites save on a user’s
            device to collect information about the user’s browsing history.
          </p>
          <h2 className={styles.heading}>Analytics Cookies</h2>
          <p className={styles.graph}>
            Rich Picks uses{' '}
            <a href="https://marketingplatform.google.com/about/analytics/">
              Google Analytics
            </a>{' '}
            to analyze our website traffic and improve our website performance.
          </p>
          <p className={styles.graph}>
            <CookieChoice /> Opt in or out.
          </p>
        </div>
      </div>
    </article>
  )
}

export default CookiePolicy
