import { Metadata } from 'next'
import styles from './page.module.scss'

export const metadata: Metadata = {
  title: 'Rules and responsible play',
}

const ResponsiblePlay = () => {
  return (
    <article className="article">
      <header className="header">
        <div className="container">
          <h1 className="heading">Rules and responsible play</h1>
        </div>
      </header>
      <div className={styles.body}>
        <div className="container">
          <p className={styles.graph}>
            Rich Picks is for entertainment and education. Rich makes NFL picks
            against a pretend bankroll so we can all watch how money management
            plays out over a season. No real money is bet, and sports betting is
            not legal in California.
          </p>
          <h2 className={styles.subheading}>The rules</h2>
          <ul className={styles.list}>
            <li>
              The bankroll starts at $1,000 of play money on November 12, 2026.
              The playoffs start again with a fresh $1,000.
            </li>
            <li>
              One unit is 2% of the bankroll at the start of each week, rounded
              to the nearest dollar. If the bankroll shrinks, the bets shrink
              with it.
            </li>
            <li>
              Each pick is 1 unit, or 2 at most, and no more than 10 units a
              week. No raising bets to win back a loss.
            </li>
            <li>
              Every pick is posted before kickoff and never deleted, wins and
              losses alike.
            </li>
            <li>
              After a winning week, 50% of the profit stays in the bankroll, 30%
              goes to a pretend index fund and 20% goes to savings. A losing
              week comes out of the bankroll only. Money set aside is never bet
              again.
            </li>
          </ul>
          <h2 className={styles.subheading}>What we hope it shows</h2>
          <p className={styles.graph}>
            At standard odds of -110, a bet has to win about 52.4% of the time
            just to break even, so even a good picker can lose money. Setting
            part of every winning week aside means a bad streak can&apos;t take
            it back. Steady saving beats chasing the big win.
          </p>
          <p className={styles.graph}>
            The index fund and savings growth rates (7% and 4% a year) are
            made-up assumptions for illustration. Nothing here is financial or
            investment advice.
          </p>
          <h2 className={styles.subheading}>Getting help</h2>
          <p className={styles.graph}>
            If you or someone you know has a gambling problem, call{' '}
            <a href="tel:+1(800)426-2537">1-800-GAMBLER</a> (1-800-426-2537),
            free and confidential, any time. You can also visit the{' '}
            <a href="https://www.ncpgambling.org">
              National Council on Problem Gambling
            </a>
            .
          </p>
        </div>
      </div>
    </article>
  )
}

export default ResponsiblePlay
