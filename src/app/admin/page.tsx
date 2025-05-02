'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import AdminLayout from '@/components/AdminLayout'

export default function AdminPage() {
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
            <h1 className="text-xl font-semibold text-gray-900">Добро пожаловать в админ-панель</h1>
            <p className="mt-2 text-sm text-gray-700">
              Здесь вы можете управлять списком подарков и их статусами.
            </p>
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            <a
              href="/admin/gifts/new"
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-primary-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 sm:w-auto"
            >
              Добавить подарок
            </a>
          </div>
        </div>

        <div className="mt-8">
          <div className="rounded-lg bg-white shadow">
            <div className="px-4 py-5 sm:p-6">
              <h2 className="text-base font-semibold leading-6 text-gray-900">
                Статистика
              </h2>
              <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
                <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
                  <dt className="truncate text-sm font-medium text-gray-500">
                    Всего подарков
                  </dt>
                  <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
                    0
                  </dd>
                </div>
                <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
                  <dt className="truncate text-sm font-medium text-gray-500">
                    Свободных подарков
                  </dt>
                  <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
                    0
                  </dd>
                </div>
                <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
                  <dt className="truncate text-sm font-medium text-gray-500">
                    Занятых подарков
                  </dt>
                  <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
                    0
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
} 