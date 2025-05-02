import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const giftSchema = z.object({
  title: z.string().min(1, 'Название обязательно'),
  description: z.string().optional(),
  imageUrl: z.string().url('Неверный URL изображения').optional(),
  purchaseUrl: z.string().url('Неверный URL для покупки'),
})

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET() {
  try {
    const gifts = await prisma.gift.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        id: true,
        title: true,
        description: true,
        imageUrl: true,
        purchaseUrl: true,
        isReserved: true,
        createdAt: true,
      },
    })

    return NextResponse.json(gifts)
  } catch (error) {
    console.error('Error fetching gifts:', error)
    return NextResponse.json(
      { error: 'Внутренняя ошибка сервера' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const validatedData = giftSchema.parse(body)

    const gift = await prisma.gift.create({
      data: {
        title: validatedData.title,
        description: validatedData.description || null,
        imageUrl: validatedData.imageUrl || null,
        purchaseUrl: validatedData.purchaseUrl,
      },
    })

    return NextResponse.json(gift)
  } catch (error) {
    console.error('Error creating gift:', error)

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