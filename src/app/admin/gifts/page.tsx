'use client'

import { useState, useEffect } from 'react'
import { Gift } from '@prisma/client'
import Link from 'next/link'

export default function AdminGiftsPage() {
  const [gifts, setGifts] = useState<Gift[]>([])
  const [loading, setLoading] = useState(true)

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
    if (confirm('Вы уверены, что хотите удалить этот подарок?')) {
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

  if (loading) {
    return <div>Загрузка...</div>
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Управление подарками
        </h1>
        <p className="mt-2 text-lg leading-8 text-gray-600">
          Здесь вы можете управлять списком подарков
        </p>
      </div>

      <div className="space-y-4">
        {gifts.map((gift, index) => (
          <div
            key={gift.id}
            className="flex items-center justify-between rounded-lg border border-gray-200 bg-white p-4"
          >
            <div className="flex items-center space-x-4">
              <div className="flex flex-col space-y-1">
                <button
                  onClick={() => handleMove(gift.id, 'up')}
                  disabled={index === 0}
                  className="text-gray-400 hover:text-gray-600 disabled:opacity-50"
                >
                  ↑
                </button>
                <button
                  onClick={() => handleMove(gift.id, 'down')}
                  disabled={index === gifts.length - 1}
                  className="text-gray-400 hover:text-gray-600 disabled:opacity-50"
                >
                  ↓
                </button>
              </div>
              <div className="relative h-16 w-16 flex-shrink-0">
                {gift.imageUrl ? (
                  <img
                    src={gift.imageUrl}
                    alt={gift.title}
                    className="h-full w-full rounded-md object-cover"
                  />
                ) : (
                  <div className="h-full w-full rounded-md bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center text-gray-400 text-xs">
                    Нет фото
                  </div>
                )}
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-900">{gift.title}</h3>
                {gift.description && (
                  <p className="text-sm text-gray-500 line-clamp-1">{gift.description}</p>
                )}
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Link
                href={`/admin/gifts/${gift.id}/edit`}
                className="inline-flex items-center rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
              >
                Редактировать
              </Link>
              <button
                onClick={() => handleDelete(gift.id)}
                className="inline-flex items-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
              >
                Удалить
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 