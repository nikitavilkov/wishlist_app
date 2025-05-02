'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { CheckCircleIcon } from '@heroicons/react/24/solid'

interface Gift {
  id: number
  title: string
  description: string
  imageUrl: string
  purchaseUrl: string
  isReserved: boolean
}

export default function EditGiftPage({ params }: { params: { id: string } }) {
  const [gift, setGift] = useState<Gift | null>(null)
  const [loading, setLoading] = useState(true)
  const [success, setSuccess] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const isAuth = localStorage.getItem('adminAuthenticated')
    if (isAuth !== 'true') {
      router.push('/admin')
    }
    fetchGift()
  }, [params.id, router])

  const fetchGift = async () => {
    try {
      const response = await fetch(`/api/gifts/${params.id}`)
      const data = await response.json()
      setGift(data)
    } catch (error) {
      console.error('Error fetching gift:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!gift) return

    try {
      const response = await fetch(`/api/gifts/${gift.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(gift),
      })

      if (response.ok) {
        setSuccess(true)
        setTimeout(() => {
          setSuccess(false)
          router.push('/admin/dashboard')
        }, 2000)
      }
    } catch (error) {
      console.error('Error updating gift:', error)
    }
  }

  if (loading) {
    return <div>Загрузка...</div>
  }

  if (!gift) {
    return <div>Подарок не найден</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div>
          <h1 className="text-2xl font-bold mb-6">Редактирование подарка</h1>
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-4">
              <label htmlFor="title" className="block text-lg font-medium text-gray-700">
                Название
              </label>
              <input
                type="text"
                id="title"
                required
                value={gift.title}
                onChange={(e) => setGift({ ...gift, title: e.target.value })}
                className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-lg p-3"
              />
            </div>

            <div className="space-y-4">
              <label htmlFor="description" className="block text-lg font-medium text-gray-700">
                Описание
              </label>
              <textarea
                id="description"
                value={gift.description}
                onChange={(e) => setGift({ ...gift, description: e.target.value })}
                className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-lg p-3 h-32"
              />
            </div>

            <div className="space-y-4">
              <label htmlFor="imageUrl" className="block text-lg font-medium text-gray-700">
                Ссылка на изображение
              </label>
              <input
                type="url"
                id="imageUrl"
                value={gift.imageUrl}
                onChange={(e) => setGift({ ...gift, imageUrl: e.target.value })}
                className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-lg p-3"
              />
            </div>

            <div className="space-y-4">
              <label htmlFor="purchaseUrl" className="block text-lg font-medium text-gray-700">
                Ссылка для покупки
              </label>
              <input
                type="url"
                id="purchaseUrl"
                required
                value={gift.purchaseUrl}
                onChange={(e) => setGift({ ...gift, purchaseUrl: e.target.value })}
                className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-lg p-3"
              />
            </div>

            <div className="flex justify-start space-x-4">
              <button
                type="submit"
                className="inline-flex justify-center rounded-md border border-transparent bg-primary-600 py-3 px-6 text-lg font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              >
                Сохранить
              </button>
              <button
                type="button"
                onClick={() => router.push('/admin/dashboard')}
                className="inline-flex justify-center rounded-md border border-gray-300 bg-white py-3 px-6 text-lg font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              >
                Отмена
              </button>
            </div>
          </form>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Превью подарка</h3>
          <div className="border rounded-lg p-4">
            {gift.imageUrl ? (
              <div className="relative aspect-square">
                <Image
                  src={gift.imageUrl}
                  alt="Превью подарка"
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
            ) : (
              <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
                Нет изображения
              </div>
            )}
            <div className="mt-4">
              <h4 className="text-lg font-medium text-gray-900">
                {gift.title}
              </h4>
              <p className="mt-1 text-sm text-gray-500">
                {gift.description}
              </p>
            </div>
          </div>
        </div>
      </div>

      {success && (
        <div className="fixed bottom-4 right-4 z-50">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 shadow-lg flex items-center gap-2">
            <CheckCircleIcon className="h-6 w-6 text-green-500" />
            <p className="text-green-800 font-medium">Подарок успешно обновлен</p>
          </div>
        </div>
      )}
    </div>
  )
} 