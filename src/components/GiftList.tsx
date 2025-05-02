'use client'

import { Gift } from '@prisma/client'
import { useCallback, useEffect, useState } from 'react'
import GiftCard from './GiftCard'

interface GiftListProps {
  initialGifts: Gift[]
}

export default function GiftList({ initialGifts }: GiftListProps) {
  const [gifts, setGifts] = useState<Gift[]>(initialGifts)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchGifts = useCallback(async () => {
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
      setError(error instanceof Error ? error.message : 'Произошла ошибка при загрузке подарков')
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchGifts()
  }, [fetchGifts])

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600 mb-4">{error}</p>
        <button
          onClick={fetchGifts}
          className="inline-flex items-center rounded-md bg-primary-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
        >
          Повторить попытку
        </button>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="text-center py-8">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary-600 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" />
        <p className="mt-4 text-gray-600">Загрузка подарков...</p>
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
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {gifts.map((gift) => (
        <GiftCard key={gift.id} gift={gift} />
      ))}
    </div>
  )
} 