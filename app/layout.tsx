import 'normalize.css'
import '@/styles/app.scss'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    template: '%s | Mundo',
    default: 'Mundo',
  },
}

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

export default RootLayout
