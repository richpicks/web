import Link from 'next/link'
import {
  Ledger,
  formatMoney,
  formatPercent,
  getRecord,
} from '@/app/lib/bankroll'
import { BankrollChart } from '@/app/components/BankrollChart'
import { WinningsChart } from '@/app/components/WinningsChart'
import styles from './Record.module.scss'

const Record = ({ ledger }: { ledger: Ledger }) => {
  const record = getRecord(ledger)
  const { startingBankroll } = ledger.settings
  const change = ledger.total - startingBankroll
  return (
    <>
      <section className={styles.section}>
        <div className="container">
          <ul className={styles.stats}>
            <li>
              <span className={styles.value}>
                {formatPercent(record.winRate)}
              </span>
              <span className={styles.name}>Win rate</span>
              <span className={styles.note}>
                {record.wins}–{record.losses}
                {record.pushes > 0 && `–${record.pushes}`}. Break-even is{' '}
                {formatPercent(record.breakEvenRate)}
              </span>
            </li>
            <li>
              <span className={styles.value}>
                {formatPercent(record.returnOnStakes)}
              </span>
              <span className={styles.name}>Return on bets</span>
              <span className={styles.note}>
                {record.profit >= 0 ? '+' : ''}
                {formatMoney(record.profit)} on {formatMoney(record.staked)} bet
              </span>
            </li>
            <li>
              <span className={styles.value}>
                {formatMoney(ledger.bankroll)}
              </span>
              <span className={styles.name}>Current bankroll</span>
              <span className={styles.note}>
                Started at {formatMoney(startingBankroll)}
              </span>
            </li>
            <li>
              <span className={styles.value}>
                {formatMoney(ledger.indexFund + ledger.savings)}
              </span>
              <span className={styles.name}>Set aside</span>
              <span className={styles.note}>
                Index fund and savings. Total {change >= 0 ? 'up' : 'down'}{' '}
                {formatMoney(Math.abs(change))}
              </span>
            </li>
            <li>
              <span className={styles.value}>{record.longestLosingStreak}</span>
              <span className={styles.name}>Longest losing streak</span>
              <span className={styles.note}>Picks lost in a row</span>
            </li>
          </ul>
        </div>
      </section>
      <section className={styles.section}>
        <div className="container">
          <BankrollChart ledger={ledger} />
        </div>
      </section>
      <section className={styles.section}>
        <div className="container">
          <WinningsChart ledger={ledger} />
        </div>
      </section>
      <section className={styles.section}>
        <div className="container">
          <p className={styles.graph}>
            Play money only, for entertainment and education. No real bets are
            placed, and none of this is financial advice. The index fund and
            savings growth rates are made-up assumptions. Read the{' '}
            <Link href="/responsible-play">rules and responsible play</Link>{' '}
            page.
          </p>
        </div>
      </section>
    </>
  )
}

export { Record }
