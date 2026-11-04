import { Ledger, formatMoney } from '@/app/lib/bankroll'
import styles from './Charts.module.scss'

const width = 720
const height = 280
const margin = { top: 16, right: 16, bottom: 32, left: 56 }
const gap = 2

const series = [
  { key: 'kept', name: 'Kept in the bankroll', className: styles.bankroll },
  { key: 'indexFund', name: 'Pretend index fund', className: styles.indexFund },
  { key: 'savings', name: 'Savings', className: styles.savings },
] as const

const WinningsChart = ({ ledger }: { ledger: Ledger }) => {
  const { bankrollPercent, indexFundPercent, savingsPercent } =
    ledger.settings.splitRule
  const setAsidePercent = indexFundPercent + savingsPercent
  let kept = 0
  const weeks = ledger.weeks.map((week) => {
    // the bankroll's share of the winnings, worked out from what was set aside
    const setAside = week.toIndexFund + week.toSavings
    if (setAsidePercent > 0)
      kept += (setAside * bankrollPercent) / setAsidePercent
    return {
      label: week.label.replace('Week ', 'Wk '),
      kept: Math.round(kept * 100) / 100,
      indexFund: week.indexFund,
      savings: week.savings,
    }
  })
  const totals = weeks.map((w) => w.kept + w.indexFund + w.savings)
  const top = Math.max(...totals, 10)
  const step = [5, 10, 25, 50, 100, 250, 500].find((s) => top / s <= 5) ?? 1000
  const max = Math.ceil(top / step) * step
  const ticks = Array.from({ length: max / step + 1 }, (_, i) => i * step)
  const plotWidth = width - margin.left - margin.right
  const plotHeight = height - margin.top - margin.bottom
  const band = plotWidth / Math.max(weeks.length, 1)
  const barWidth = Math.min(24, band * 0.6)
  const y = (v: number) => margin.top + plotHeight - (v / max) * plotHeight
  const last = weeks[weeks.length - 1]
  return (
    <figure className={styles.figure}>
      <h2 className={styles.heading}>Where the winnings go</h2>
      <p className={styles.caption}>
        After each winning week, {bankrollPercent}% of the profit stays in the
        bankroll, {indexFundPercent}% goes to a pretend index fund and{' '}
        {savingsPercent}% goes to savings. Money set aside is never bet again,
        so losing weeks can&apos;t take it back.
      </p>
      <svg
        className={styles.svg}
        viewBox={`0 0 ${width} ${height}`}
        role="img"
        aria-label={
          last
            ? `${formatMoney(last.indexFund + last.savings)} set aside so far`
            : 'Nothing set aside yet'
        }
      >
        {ticks.map((tick) => (
          <g key={tick}>
            <line
              className={styles.grid}
              x1={margin.left}
              x2={width - margin.right}
              y1={y(tick)}
              y2={y(tick)}
            />
            <text
              className={styles.axis}
              x={margin.left - 8}
              y={y(tick)}
              dy="0.32em"
              textAnchor="end"
            >
              ${tick.toLocaleString('en-US')}
            </text>
          </g>
        ))}
        {weeks.map((week, i) => {
          const x = margin.left + band * i + (band - barWidth) / 2
          let base = 0
          const segments = series
            .map((s) => {
              const value = week[s.key]
              const segment = { ...s, value, from: base }
              base += value
              return segment
            })
            .filter((s) => s.value > 0)
          return (
            <g key={week.label}>
              <title>
                {`${week.label}: ${series
                  .map((s) => `${s.name} ${formatMoney(week[s.key])}`)
                  .join(', ')}`}
              </title>
              <rect
                className={styles.hit}
                x={margin.left + band * i}
                y={margin.top}
                width={band}
                height={plotHeight}
              />
              {segments.map((s, j) => {
                const isTop = j === segments.length - 1
                const y0 = y(s.from)
                const y1 = y(s.from + s.value) + (isTop ? 0 : gap)
                const h = Math.max(0, y0 - y1)
                const r = isTop ? Math.min(4, h, barWidth / 2) : 0
                // square at the bottom, rounded on top of the stack
                const d = `M${x},${y0} V${y1 + r} Q${x},${y1} ${x + r},${y1} H${
                  x + barWidth - r
                } Q${x + barWidth},${y1} ${x + barWidth},${y1 + r} V${y0} Z`
                return <path key={s.key} className={s.className} d={d} />
              })}
              <text
                className={styles.axis}
                x={margin.left + band * i + band / 2}
                y={height - 8}
                textAnchor="middle"
              >
                {week.label}
              </text>
            </g>
          )
        })}
      </svg>
      <ul className={styles.legend}>
        {series.map((s) => (
          <li key={s.key}>
            <span className={`${styles.swatch} ${s.className}`} />
            {s.name}
            {last && `: ${formatMoney(last[s.key])}`}
          </li>
        ))}
      </ul>
      <details className={styles.details}>
        <summary>See the numbers</summary>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Week</th>
              <th>Result</th>
              <th>Bankroll</th>
              <th>Index fund</th>
              <th>Savings</th>
            </tr>
          </thead>
          <tbody>
            {ledger.weeks.map((week) => (
              <tr key={week.id}>
                <td>{week.label}</td>
                <td>
                  {week.net >= 0 ? '+' : ''}
                  {formatMoney(week.net)}
                  {!week.settled && ' so far'}
                </td>
                <td>{formatMoney(week.bankroll)}</td>
                <td>{formatMoney(week.indexFund)}</td>
                <td>{formatMoney(week.savings)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </details>
    </figure>
  )
}

export { WinningsChart }
