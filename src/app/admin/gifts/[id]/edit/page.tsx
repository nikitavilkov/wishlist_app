'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import AdminLayout from '@/components/AdminLayout'
import AdminGiftForm from '@/components/AdminGiftForm'
import { Gift } from '@prisma/client'

interface AdminGiftEditPageProps {
  params: {
    id: string
  }
}

export default function AdminGiftEditPage({ params }: AdminGiftEditPageProps) {
  const router = useRouter()
  const [gift, setGift] = useState<Gift | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Проверяем авторизацию при монтировании компонента
    const isAdmin = localStorage.getItem('isAdmin') === 'true'
    if (!isAdmin) {
      router.push('/admin/login')
      return
    }

    // Загружаем данные подарка
    const fetchGift = async () => {
      try {
        setIsLoading(true)
        setError(null)

        const id = parseInt(params.id)
        if (isNaN(id)) {
          throw new Error('Неверный ID подарка')
        }

        const response = await fetch(`/api/gifts/${id}`)
        if (!response.ok) {
          throw new Error('Ошибка при загрузке подарка')
        }

        const data = await response.json()
        setGift(data)
      } catch (error) {
        console.error('Error fetching gift:', error)
        setError(error instanceof Error ? error.message : 'Произошла ошибка')
      } finally {
        setIsLoading(false)
      }
    }

    fetchGift()
  }, [params.id, router])

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary-600 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" />
            <p className="mt-4 text-gray-600">Загрузка подарка...</p>
          </div>
        </div>
      </AdminLayout>
    )
  }

  if (error) {
    return (
      <AdminLayout>
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={() => router.push('/admin/gifts')}
              className="inline-flex items-center rounded-md bg-primary-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
            >
              Вернуться к списку
            </button>
          </div>
        </div>
      </AdminLayout>
    )
  }

  if (!gift) {
    return (
      <AdminLayout>
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-gray-600">Подарок не найден</p>
            <button
              onClick={() => router.push('/admin/gifts')}
              className="mt-4 inline-flex items-center rounded-md bg-primary-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
            >
              Вернуться к списку
            </button>
          </div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-xl font-semibold text-gray-900">Редактирование подарка</h1>
            <p className="mt-2 text-sm text-gray-700">
              Измените информацию о подарке и сохраните изменения.
            </p>
          </div>
        </div>

        <div className="mt-8">
          <AdminGiftForm
            gift={gift}
            onSuccess={() => router.push('/admin/gifts')}
          />
        </div>
      </div>
    </AdminLayout>
  )
} 