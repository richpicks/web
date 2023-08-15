import { Metadata } from 'next'
import styles from './page.module.scss'

export const metadata: Metadata = {
  title: 'Welcome Home',
}

const Home = () => {
  return (
    <main>
      <section className={styles.section}>
        <div className={styles.container}>
          <h1 className={styles.heading}>Your dogs must be barking 🐶</h1>
          <p className={styles.graph}>Why don’t you come in and sit a spell?</p>
        </div>
      </section>
    </main>
  )
}

export default Home
