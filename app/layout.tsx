import 'normalize.css'
import '@/styles/app.scss'
import { Metadata } from 'next'
import { Scoreboard } from '@/app/components/Scoreboard'
import { GoogleAnalytics } from '@/components/GoogleAnalytics'
import { CookieBanner } from '@/components/CookieBanner'
import styles from './layout.module.scss'

export const metadata: Metadata = {
  title: {
    template: '%s | Rich Picks',
    default: 'Rich Picks',
  },
}

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <GoogleAnalytics GA_MEASUREMENT_ID="G-7Q2YJNTGBS" />
      <body className={styles.body}>
        <header>
          <CookieBanner />
          <Scoreboard />
        </header>
        <main className={styles.main}>{children}</main>
        <footer className={styles.footer}>
          <div className="container">
            <p className={styles.graph}>
              Please <a href="https://responsibleplay.org">play responsibily</a>
              .
            </p>
            <p className={styles.graph}>
              If you or someone you know has a gambling problem, call{' '}
              <a href="tel:+1(800)426-2537">1-800-GAMBLER</a>, or visit the{' '}
              <a href="https://www.ncpgambling.org">
                National Council on Problem Gambling
              </a>
              .
            </p>
          </div>
        </footer>
      </body>
    </html>
  )
}

export default RootLayout
