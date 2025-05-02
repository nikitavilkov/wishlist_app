'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { HomeIcon, GiftIcon, PlusIcon } from '@heroicons/react/24/outline'

interface AdminLayoutProps {
  children: React.ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname()

  const navigation = [
    {
      name: 'Главная',
      href: '/admin',
      icon: HomeIcon,
      current: pathname === '/admin',
    },
    {
      name: 'Подарки',
      href: '/admin/gifts',
      icon: GiftIcon,
      current: pathname === '/admin/gifts',
    },
    {
      name: 'Новый подарок',
      href: '/admin/gifts/new',
      icon: PlusIcon,
      current: pathname === '/admin/gifts/new',
    },
  ]

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex h-screen">
        {/* Боковая панель */}
        <div className="hidden md:flex md:w-64 md:flex-col">
          <div className="flex min-h-0 flex-1 flex-col border-r border-gray-200 bg-white">
            <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
              <div className="flex flex-shrink-0 items-center px-4">
                <h1 className="text-xl font-bold text-gray-900">Админ-панель</h1>
              </div>
              <nav className="mt-5 flex-1 space-y-1 px-2">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`group flex items-center rounded-md px-2 py-2 text-sm font-medium ${
                      item.current
                        ? 'bg-gray-100 text-gray-900'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <item.icon
                      className={`mr-3 h-6 w-6 flex-shrink-0 ${
                        item.current ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500'
                      }`}
                      aria-hidden="true"
                    />
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </div>

        {/* Основной контент */}
        <div className="flex flex-1 flex-col overflow-hidden">
          <main className="flex-1 overflow-y-auto bg-gray-100 p-6">
            {children}
          </main>
        </div>
      </div>
    </div>
  )
} 