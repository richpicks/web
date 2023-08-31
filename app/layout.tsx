import 'normalize.css'
import '@/styles/app.scss'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    template: '%s | Rich Picks',
    default: 'Rich Picks',
  },
}

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body>
        <header></header>
        <main>
          {children}
        </main>
        <footer className="footer">
          <div className="container">
            <p className="graph">
              Please <a href="https://responsibleplay.org">play responsibily</a>. If you or someone you know has a gambling problem, call <a href="tel:+1(800)426-2537">1-800-GAMBLER</a>, or visit the <a href="https://www.ncpgambling.org">National Council on Problem Gambling</a> website.
            </p>
          </div>
        </footer>
      </body>
    </html>
  )
}

export default RootLayout
