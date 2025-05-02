'use client'

import { Gift } from '@prisma/client'
import Image from 'next/image'
import { LockClosedIcon } from '@heroicons/react/24/solid'
import { useCallback, useState } from 'react'

interface GiftCardProps {
  gift: Gift
}

export default function GiftCard({ gift }: GiftCardProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleReserve = useCallback(async () => {
    try {
      setIsLoading(true)
      setError(null)
      
      const response = await fetch(`/api/gifts/${gift.id}/reserve`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isReserved: !gift.isReserved }),
      })

      if (!response.ok) {
        throw new Error('Ошибка при бронировании подарка')
      }

      window.location.reload()
    } catch (error) {
      console.error('Error reserving gift:', error)
      setError(error instanceof Error ? error.message : 'Произошла ошибка')
    } finally {
      setIsLoading(false)
    }
  }, [gift.id, gift.isReserved])

  const handlePurchase = useCallback(() => {
    if (gift.purchaseUrl) {
      window.open(gift.purchaseUrl, '_blank', 'noopener,noreferrer')
    }
  }, [gift.purchaseUrl])

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white">
      <div className="relative aspect-square">
        <div className={`relative h-full w-full ${gift.isReserved ? 'opacity-50' : ''}`}>
          {gift.imageUrl ? (
            <Image
              src={gift.imageUrl}
              alt={gift.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={false}
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100 text-gray-400">
              Нет фото
            </div>
          )}
          {gift.isReserved && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-red-500 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2">
                <LockClosedIcon className="h-5 w-5" />
                Занято
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-1 flex-col space-y-2 p-4">
        <h3 className="text-sm font-medium text-gray-900">
          {gift.title}
        </h3>
        {gift.description && (
          <p className="text-sm text-gray-500 line-clamp-2">{gift.description}</p>
        )}
        <div className="flex flex-1 flex-col justify-end">
          <div className="mt-4 flex items-center justify-between">
            <button
              onClick={handlePurchase}
              disabled={!gift.purchaseUrl}
              className="inline-flex items-center rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Где купить
            </button>
            <button
              onClick={handleReserve}
              disabled={isLoading}
              className={`inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold shadow-sm ${
                gift.isReserved
                  ? 'bg-gray-200 text-gray-700 hover:bg-gray-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {isLoading ? 'Загрузка...' : gift.isReserved ? 'Отменить бронь' : 'Занять'}
            </button>
          </div>
          {error && (
            <p className="mt-2 text-sm text-red-600">{error}</p>
          )}
        </div>
      </div>
    </div>
  )
} 