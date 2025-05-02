'use client'

import { Gift } from '@prisma/client'
import { useCallback, useState } from 'react'
import { useRouter } from 'next/navigation'
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline'

interface AdminGiftListProps {
  gifts: Gift[]
}

export default function AdminGiftList({ gifts: initialGifts }: AdminGiftListProps) {
  const router = useRouter()
  const [gifts, setGifts] = useState<Gift[]>(initialGifts)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleDelete = useCallback(async (id: number) => {
    if (!confirm('Вы уверены, что хотите удалить этот подарок?')) {
      return
    }

    try {
      setIsLoading(true)
      setError(null)

      const response = await fetch(`/api/gifts/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Ошибка при удалении подарка')
      }

      setGifts(prev => prev.filter(gift => gift.id !== id))
    } catch (error) {
      console.error('Error deleting gift:', error)
      setError(error instanceof Error ? error.message : 'Произошла ошибка')
    } finally {
      setIsLoading(false)
    }
  }, [])

  const handleEdit = useCallback((id: number) => {
    router.push(`/admin/gifts/${id}/edit`)
  }, [router])

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600 mb-4">{error}</p>
        <button
          onClick={() => setError(null)}
          className="inline-flex items-center rounded-md bg-primary-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
        >
          Закрыть
        </button>
      </div>
    )
  }

  if (gifts.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">Подарки не найдены</p>
      </div>
    )
  }

  return (
    <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
      <table className="min-w-full divide-y divide-gray-300">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
              Название
            </th>
            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
              Описание
            </th>
            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
              Статус
            </th>
            <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
              <span className="sr-only">Действия</span>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {gifts.map((gift) => (
            <tr key={gift.id}>
              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                {gift.title}
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                {gift.description || '-'}
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                {gift.isReserved ? (
                  <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800">
                    Занято
                  </span>
                ) : (
                  <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                    Свободно
                  </span>
                )}
              </td>
              <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => handleEdit(gift.id)}
                    disabled={isLoading}
                    className="text-primary-600 hover:text-primary-900 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <PencilIcon className="h-5 w-5" />
                    <span className="sr-only">Редактировать</span>
                  </button>
                  <button
                    onClick={() => handleDelete(gift.id)}
                    disabled={isLoading}
                    className="text-red-600 hover:text-red-900 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <TrashIcon className="h-5 w-5" />
                    <span className="sr-only">Удалить</span>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
} 