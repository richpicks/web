import { Metadata } from 'next'
import styles from './page.module.scss'

export const metadata: Metadata = {
  title: 'Welcome to Rich Picks',
}

const Home = () => {
  return (
    <>
      <section className="section">
        <div className="container">
          <header className="header">
            <time className="eyebrow" dateTime="2023-01-29T09:00">
              Sunday the 29th of January 2023
            </time>
            <h1 className="heading">
              This week Rich picks
            </h1>
          </header>
          <ol className="games">
            <li className="game">
              <p className="pick">
                The <strong>San Francisco 49ers</strong> on the road against the <em>Philadelphia Eagles</em>.
              </p>
            </li>
            <li className="game">
              <p className="pick">
                The <strong>Cincinnati Bengals</strong> on the road against the <em>Kansas City Chiefs</em>.
              </p>
            </li>
            <li className="game">
              <p className="pick">
                The <strong>under</strong> for the <em>Philadelphia Eagles</em> against the <em>San Francisco 49ers</em>.
              </p>
            </li>
          </ol>
          <p className="graph">
            Check out the latest odds at <a href="https://sportsbook.draftkings.com/leagues/football/nfl">DraftKings</a>, <a href="https://www.espn.com/nfl/lines">ESPN</a>, or <a href="https://sportsbook.fanduel.com/navigation/nfl">FanDuel</a>.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <header className="header">
            <time className="eyebrow" dateTime="2023-01-21T09:30">
              Saturday the 21st of January 2023
            </time>
            <h1 className="heading">Last week Rich picked</h1>
            <p className="summary">1 out of 4</p>
          </header>
          <ol className="games">
            <li className="game">
              <p className="pick">
                The <strong>Kansas City Chiefs</strong> (-9) at home against the <em>Jacksonville Jaguars</em>.
              </p>
              <p className="result">
                <span aria-hidden="true">😢</span> Rich needed the <strong>Chiefs</strong> to win by more than 9 points. They won 27 to 20.
              </p>
            </li>
            <li className="game">
              <p className="pick">
                The <strong>New York Giants</strong> (+8.5) on the road against the <em>Philadelphia Eagles</em>.
              </p>
              <p className="result">
                <span aria-hidden="true">😢</span> Rich needed the <strong>Giants</strong> not to lose by more than 8.5 points. They lost 7 to 38.
              </p>
            </li>
            <li className="game">
              <p className="pick">
                The <strong>Buffalo Bills</strong> (-5.5) at home against the <em>Cincinnati Bengals</em>.
              </p>
              <p className="result">
                <span aria-hidden="true">😢</span> Rich needed the <strong>Bills</strong> to win by more than 5.5 points. They lost 10 to 27.
              </p>
            </li>
            <li className="game">
              <p className="pick">
              The <strong>San Francisco 49ers</strong> (-3.5) at home against the <em>Dallas Cowboys</em>.
              </p>
              <p className="result">
                <span aria-hidden="true">💰</span> Rich needed the <strong>49ers</strong> to win by more than 3.5 points. They won 19 to 12.
              </p>
            </li>
          </ol>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <header className="header">
            <time className="eyebrow" dateTime="2023-01-14T11:00">
              Saturday the 14th of January 2023
            </time>
            <h1 className="heading">
              Rich picked
            </h1>
            <p className="summary">
              1 out of 6
            </p>
          </header>
          <ol className="games">
            <li className="game">
              <p className="pick">
                The <strong>under</strong> (42.5) for the <em>San Francisco 49ers</em> against the <em>Seattle Seahawks</em>.
              </p>
              <p className="result">
                <span aria-hidden="true">😢</span> Rich needed the <em>49ers</em> and the <em>Seahawks</em> to score less than 42.5 points combined. The final score was 41 to 23.
              </p>
            </li>
            <li className="game">
              <p className="pick">
                The <strong>Los Angeles Chargers</strong> (-2) on the road against the <em>Jacksonville Jaguars</em>.
              </p>
              <p className="result">
                <span aria-hidden="true">😢</span> Rich needed the <strong>Chargers</strong> to win by more than 2 points. They lost 30 to 31.
              </p>
            </li>
            <li className="game">
              <p className="pick">
                The <strong>Buffalo Bills</strong> (-13.5) at home against the <em>Miami Dolphins</em>.
              </p>
              <p className="result">
                <span aria-hidden="true">😢</span> Rich needed the <strong>Bills</strong> to win by more than 13.5 points. They won 34 to 31.
              </p>
            </li>
            <li className="game">
              <p className="pick">
                The <strong>New York Giants</strong> (+2.5) on the road against the <em>Minnesota Vikings</em>.
              </p>
              <p className="result">
                <span aria-hidden="true">💰</span> Rich needed the <strong>Giants</strong> not to lose by more than 2.5 points. They won 31 to 24.
              </p>
            </li>
            <li className="game">
              <p className="pick">
                The <strong>Cincinnati Bengals</strong> (-7.5) at home against the <em>Baltimore Ravens</em>.
              </p>
              <p className="result">
                <span aria-hidden="true">😢</span> Rich needed the <strong>Bengals</strong> to win by more than 7.5 points. They won 24 - 17.
              </p>
            </li>
            <li className="game">
              <p className="pick">
                The <strong>Tampa Bay Buccaneers</strong> (+2.5) at home against the <em>Dallas Cowboys</em>.
              </p>
              <p className="result">
                <span aria-hidden="true">😢</span> Rich needed the <strong>Buccaneers</strong> not to lose by more than 2.5 points. They lost 14 to 31.
              </p>
            </li>
          </ol>
        </div>
      </section>
    </>
  )
}

export default Home
