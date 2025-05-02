import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const reserveSchema = z.object({
  isReserved: z.boolean(),
})

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id)
    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'Неверный ID подарка' },
        { status: 400 }
      )
    }

    const body = await request.json()

    // Валидация входных данных
    const validatedData = reserveSchema.parse(body)

    // Проверка существования подарка
    const gift = await prisma.gift.findUnique({
      where: { id },
    })

    if (!gift) {
      return NextResponse.json(
        { error: 'Подарок не найден' },
        { status: 404 }
      )
    }

    // Обновление статуса бронирования
    const updatedGift = await prisma.gift.update({
      where: { id },
      data: {
        isReserved: validatedData.isReserved,
      },
    })

    return NextResponse.json(updatedGift)
  } catch (error: unknown) {
    console.error('Error reserving gift:', error)

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Неверные входные данные', details: error.errors },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Внутренняя ошибка сервера' },
      { status: 500 }
    )
  }
} 