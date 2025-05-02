import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import Navigation from '@/components/Navigation'

const onest = localFont({
  src: [
    {
      path: '../fonts/Onest-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../fonts/Onest-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../fonts/Onest-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
})

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