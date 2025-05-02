'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navigation() {
  const pathname = usePathname()
  const isAdminPage = pathname?.startsWith('/admin')

  return (
    <nav className="bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between">
          <div className="flex">
            <div className="flex flex-shrink-0 items-center">
              <Link href="/" className="text-2xl font-bold text-gray-900 hover:text-gray-700">
                Wishlist
              </Link>
            </div>
          </div>
          <div className="flex items-center">
            {!isAdminPage && (
              <Link
                href="/admin"
                className="inline-flex items-center rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 hover:text-white"
              >
                Войти в админку
              </Link>
            )}
            {isAdminPage && (
              <Link
                href="/"
                className="inline-flex items-center rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 hover:text-white"
              >
                Вернуться на главную
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
} 