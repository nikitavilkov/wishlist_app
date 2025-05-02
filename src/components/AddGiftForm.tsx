'use client'

import { useState } from 'react'
import Image from 'next/image'
import { CheckCircleIcon } from '@heroicons/react/24/solid'

export default function AddGiftForm() {
  const [success, setSuccess] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    imageUrl: '',
    purchaseUrl: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/gifts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setFormData({
          title: '',
          description: '',
          imageUrl: '',
          purchaseUrl: '',
        })
        setSuccess(true)
        setTimeout(() => setSuccess(false), 3000)
      }
    } catch (error) {
      console.error('Error creating gift:', error)
    }
  }

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
      <div>
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-4">
            <label htmlFor="title" className="block text-lg font-medium text-gray-700">
              Название
            </label>
            <input
              type="text"
              id="title"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-lg p-3"
            />
          </div>

          <div className="space-y-4">
            <label htmlFor="description" className="block text-lg font-medium text-gray-700">
              Описание
            </label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
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
              value={formData.imageUrl}
              onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
              className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-lg p-3"
              placeholder="https://example.com/image.jpg"
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
              value={formData.purchaseUrl}
              onChange={(e) => setFormData({ ...formData, purchaseUrl: e.target.value })}
              className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-lg p-3"
            />
          </div>

          <div className="flex justify-start">
            <button
              type="submit"
              className="inline-flex justify-center rounded-md border border-transparent bg-primary-600 py-3 px-6 text-lg font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            >
              Добавить подарок
            </button>
          </div>
        </form>
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Превью подарка</h3>
        <div className="border rounded-lg p-4">
          {formData.imageUrl ? (
            <div className="relative aspect-square">
              <img
                src={formData.imageUrl}
                alt="Превью подарка"
                className="object-cover rounded-lg w-full h-full"
              />
            </div>
          ) : (
            <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
              Нет изображения
            </div>
          )}
          <div className="mt-4">
            <h4 className="text-lg font-medium text-gray-900">
              {formData.title || 'Название подарка'}
            </h4>
            <p className="mt-1 text-sm text-gray-500">
              {formData.description || 'Описание подарка'}
            </p>
          </div>
        </div>
      </div>

      {success && (
        <div className="fixed bottom-4 right-4 z-50">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 shadow-lg flex items-center gap-2">
            <CheckCircleIcon className="h-6 w-6 text-green-500" />
            <p className="text-green-800 font-medium">Подарок успешно добавлен</p>
          </div>
        </div>
      )}
    </div>
  )
} 