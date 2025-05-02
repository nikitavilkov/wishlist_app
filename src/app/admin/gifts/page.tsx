'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import AdminLayout from '@/components/AdminLayout'
import AdminGiftList from '@/components/AdminGiftList'
import { Gift } from '@prisma/client'

export default function AdminGiftsPage() {
  const router = useRouter()
  const [gifts, setGifts] = useState<Gift[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Проверяем авторизацию при монтировании компонента
    const isAdmin = localStorage.getItem('isAdmin') === 'true'
    if (!isAdmin) {
      router.push('/admin/login')
      return
    }

    // Загружаем список подарков
    const fetchGifts = async () => {
      try {
        setIsLoading(true)
        setError(null)

        const response = await fetch('/api/gifts')
        if (!response.ok) {
          throw new Error('Ошибка при загрузке подарков')
        }

        const data = await response.json()
        setGifts(data)
      } catch (error) {
        console.error('Error fetching gifts:', error)
        setError(error instanceof Error ? error.message : 'Произошла ошибка')
      } finally {
        setIsLoading(false)
      }
    }

    fetchGifts()
  }, [router])

  return (
    <AdminLayout>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-xl font-semibold text-gray-900">Подарки</h1>
            <p className="mt-2 text-sm text-gray-700">
              Список всех подарков. Вы можете добавлять, редактировать и удалять подарки.
            </p>
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            <a
              href="/admin/gifts/new"
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-primary-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 sm:w-auto"
            >
              Добавить подарок
            </a>
          </div>
        </div>

        {isLoading ? (
          <div className="mt-8 text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary-600 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" />
            <p className="mt-4 text-gray-600">Загрузка подарков...</p>
          </div>
        ) : error ? (
          <div className="mt-8 text-center">
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="inline-flex items-center rounded-md bg-primary-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
            >
              Повторить попытку
            </button>
          </div>
        ) : (
          <div className="mt-8">
            <AdminGiftList gifts={gifts} />
          </div>
        )}
      </div>
    </AdminLayout>
  )
} 