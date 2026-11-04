import { Ledger, formatMoney } from '@/app/lib/bankroll'
import styles from './Charts.module.scss'

const width = 720
const height = 280
const margin = { top: 16, right: 72, bottom: 32, left: 56 }

// round tick steps: 25, 50, 100, 250...
const getStep = (range: number) => {
  const steps = [10, 25, 50, 100, 250, 500, 1000]
  return steps.find((step) => range / step <= 6) ?? 1000
}

const BankrollChart = ({ ledger }: { ledger: Ledger }) => {
  const start = ledger.settings.startingBankroll
  const points = [
    { label: 'Start', value: start, note: 'Starting bankroll' },
    ...ledger.weeks.map((week) => ({
      label: week.label.replace('Week ', 'Wk '),
      value: week.bankroll,
      note: `${week.label}: ${week.net >= 0 ? '+' : ''}${formatMoney(
        week.net
      )}${week.settled ? '' : ' so far'}`,
    })),
  ]
  const values = points.map((p) => p.value)
  const step = getStep(Math.max(...values) - Math.min(...values) || 100)
  const min = Math.floor(Math.min(...values) / step) * step
  const max = Math.ceil(Math.max(...values) / step) * step + step
  const ticks = Array.from(
    { length: Math.round((max - min) / step) + 1 },
    (_, i) => min + i * step
  )
  const plotWidth = width - margin.left - margin.right
  const plotHeight = height - margin.top - margin.bottom
  const x = (i: number) =>
    margin.left +
    (points.length > 1 ? (i / (points.length - 1)) * plotWidth : 0)
  const y = (v: number) =>
    margin.top + plotHeight - ((v - min) / (max - min)) * plotHeight
  const path = points
    .map((p, i) => `${i === 0 ? 'M' : 'L'}${x(i)},${y(p.value)}`)
    .join(' ')
  const area = `${path} L${x(points.length - 1)},${y(min)} L${x(0)},${y(min)} Z`
  const last = points[points.length - 1]
  const slot = points.length > 1 ? plotWidth / (points.length - 1) : plotWidth
  return (
    <figure className={styles.figure}>
      <h2 className={styles.heading}>Bankroll over the season</h2>
      <p className={styles.caption}>
        The play-money bankroll after each week. The gray line is where it
        started, {formatMoney(start)}.
      </p>
      <svg
        className={styles.svg}
        viewBox={`0 0 ${width} ${height}`}
        role="img"
        aria-label={`Bankroll went from ${formatMoney(start)} to ${formatMoney(
          last.value
        )}`}
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
        <line
          className={styles.start}
          x1={margin.left}
          x2={width - margin.right}
          y1={y(start)}
          y2={y(start)}
        />
        <path className={styles.area} d={area} />
        <path className={styles.line} d={path} />
        {points.map((p, i) => (
          <g key={i}>
            <rect
              className={styles.hit}
              x={x(i) - slot / 2}
              y={margin.top}
              width={slot}
              height={plotHeight}
            >
              <title>{`${p.note}. Bankroll ${formatMoney(p.value)}`}</title>
            </rect>
            {(i === points.length - 1 || points.length <= 10) && (
              <circle className={styles.dot} cx={x(i)} cy={y(p.value)} r={4} />
            )}
            {(points.length <= 10 || i % 2 === 0) && (
              <text
                className={styles.axis}
                x={x(i)}
                y={height - 8}
                textAnchor="middle"
              >
                {p.label}
              </text>
            )}
          </g>
        ))}
        <text
          className={styles.label}
          x={x(points.length - 1) + 10}
          y={y(last.value)}
          dy="0.32em"
        >
          {formatMoney(last.value).replace(/\.\d\d$/, '')}
        </text>
      </svg>
    </figure>
  )
}

export { BankrollChart }
