'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Tab } from '@headlessui/react'
import AddGiftForm from '@/components/AddGiftForm'
import GiftManagement from '@/components/GiftManagement'

export default function AdminDashboard() {
  const router = useRouter()

  useEffect(() => {
    const isAuth = localStorage.getItem('adminAuthenticated')
    if (isAuth !== 'true') {
      router.push('/admin')
    }
  }, [router])

  return (
    <div className="container mx-auto px-4 py-8">
      <Tab.Group>
        <Tab.List className="flex space-x-1 rounded-xl bg-white p-1 shadow">
          <Tab
            className={({ selected }) =>
              `w-full rounded-lg py-2.5 text-sm font-medium leading-5
              ${selected
                ? 'bg-primary-600 text-white shadow'
                : 'text-gray-700 hover:bg-gray-100'
              }`
            }
          >
            Добавление подарка
          </Tab>
          <Tab
            className={({ selected }) =>
              `w-full rounded-lg py-2.5 text-sm font-medium leading-5
              ${selected
                ? 'bg-primary-600 text-white shadow'
                : 'text-gray-700 hover:bg-gray-100'
              }`
            }
          >
            Управление подарками
          </Tab>
        </Tab.List>
        <Tab.Panels className="mt-4">
          <Tab.Panel className="rounded-xl bg-white p-6 shadow">
            <AddGiftForm />
          </Tab.Panel>
          <Tab.Panel className="rounded-xl bg-white p-6 shadow">
            <GiftManagement />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  )
} 