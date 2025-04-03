import './globals.css'
import { Inter } from 'next/font/google'
import { Providers } from './providers'
import 'react-toastify/dist/ReactToastify.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'CryptoWeather Nexus',
  description: 'A modern dashboard combining weather data, cryptocurrency information, and real-time notifications',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
