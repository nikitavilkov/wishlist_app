'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import AdminLayout from '@/components/AdminLayout'
import AdminGiftForm from '@/components/AdminGiftForm'

export default function AdminGiftNewPage() {
  const router = useRouter()

  useEffect(() => {
    // Проверяем авторизацию при монтировании компонента
    const isAdmin = localStorage.getItem('isAdmin') === 'true'
    if (!isAdmin) {
      router.push('/admin/login')
    }
  }, [router])

  return (
    <AdminLayout>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-xl font-semibold text-gray-900">Новый подарок</h1>
            <p className="mt-2 text-sm text-gray-700">
              Добавьте новый подарок в список. Укажите название, описание и ссылки на изображение и покупку.
            </p>
          </div>
        </div>

        <div className="mt-8">
          <AdminGiftForm
            onSuccess={() => router.push('/admin/gifts')}
          />
        </div>
      </div>
    </AdminLayout>
  )
} 