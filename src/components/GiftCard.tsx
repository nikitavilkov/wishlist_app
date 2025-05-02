'use client'

import { Gift } from '@prisma/client'
import Image from 'next/image'
import { LockClosedIcon } from '@heroicons/react/24/solid'

interface GiftCardProps {
  gift: Gift
}

export default function GiftCard({ gift }: GiftCardProps) {
  const handleReserve = async () => {
    try {
      const response = await fetch(`/api/gifts/${gift.id}/reserve`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isReserved: !gift.isReserved }),
      })
      if (response.ok) {
        window.location.reload()
      }
    } catch (error) {
      console.error('Error reserving gift:', error)
    }
  }

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
              onClick={() => window.open(gift.purchaseUrl, '_blank')}
              className="inline-flex items-center rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
            >
              Где купить
            </button>
            <button
              onClick={handleReserve}
              className={`inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold shadow-sm ${
                gift.isReserved
                  ? 'bg-gray-200 text-gray-700 hover:bg-gray-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600'
              }`}
            >
              {gift.isReserved ? 'Отменить бронь' : 'Занять'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
} 