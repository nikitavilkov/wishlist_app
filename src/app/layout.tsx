import type { Metadata } from 'next'
import { Onest } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/Navigation'

const onest = Onest({ subsets: ['latin', 'cyrillic'] })

export const metadata: Metadata = {
  title: 'Wishlist',
  description: 'Список желаемых подарков',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru" className="h-full bg-gray-50">
      <body className={`${onest.className} h-full`}>
        <div className="min-h-full">
          <Navigation />
          <main className="py-10">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  )
} 