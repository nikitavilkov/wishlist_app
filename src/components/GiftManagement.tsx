'use client'

import { useState, useEffect } from 'react'
import { Gift } from '@prisma/client'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function GiftManagement() {
  const [gifts, setGifts] = useState<Gift[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    fetchGifts()
  }, [])

  const fetchGifts = async () => {
    try {
      const response = await fetch('/api/gifts')
      const data = await response.json()
      setGifts(data)
    } catch (error) {
      console.error('Error fetching gifts:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (window.confirm('Вы уверены, что хотите удалить этот подарок?')) {
      try {
        await fetch(`/api/gifts/${id}`, {
          method: 'DELETE',
        })
        fetchGifts()
      } catch (error) {
        console.error('Error deleting gift:', error)
      }
    }
  }

  const handleMove = async (id: number, direction: 'up' | 'down') => {
    try {
      await fetch(`/api/gifts/${id}/move`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ direction }),
      })
      fetchGifts()
    } catch (error) {
      console.error('Error moving gift:', error)
    }
  }

  const handleEdit = (id: number) => {
    router.push(`/admin/edit/${id}`)
  }

  if (loading) {
    return <div>Загрузка...</div>
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Изображение
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Название
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Описание
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Действия
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {gifts.map((gift, index) => (
            <tr key={gift.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                {gift.imageUrl && (
                  <div className="relative h-16 w-16">
                    <Image
                      src={gift.imageUrl}
                      alt={gift.title}
                      fill
                      className="object-cover rounded"
                    />
                  </div>
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">{gift.title}</div>
              </td>
              <td className="px-6 py-4">
                <div className="text-sm text-gray-500">{gift.description}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleMove(gift.id, 'up')}
                    disabled={index === 0}
                    className="text-gray-400 hover:text-gray-500 disabled:opacity-50"
                  >
                    ↑
                  </button>
                  <button
                    onClick={() => handleMove(gift.id, 'down')}
                    disabled={index === gifts.length - 1}
                    className="text-gray-400 hover:text-gray-500 disabled:opacity-50"
                  >
                    ↓
                  </button>
                  <button
                    onClick={() => handleEdit(gift.id)}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    Редактировать
                  </button>
                  <button
                    onClick={() => handleDelete(gift.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Удалить
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