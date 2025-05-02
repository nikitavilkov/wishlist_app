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

export async function DELETE(
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

    // Проверка существования подарка
    const existingGift = await prisma.gift.findUnique({
      where: { id },
    })

    if (!existingGift) {
      return NextResponse.json(
        { error: 'Подарок не найден' },
        { status: 404 }
      )
    }

    await prisma.gift.delete({
      where: { id },
    })

    return new NextResponse(null, { status: 204 })
  } catch (error) {
    console.error('Error deleting gift:', error)
    return NextResponse.json(
      { error: 'Внутренняя ошибка сервера' },
      { status: 500 }
    )
  }
}

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const gift = await prisma.gift.findUnique({
      where: {
        id: parseInt(params.id),
      },
    })

    if (!gift) {
      return NextResponse.json(
        { error: 'Подарок не найден' },
        { status: 404 }
      )
    }

    return NextResponse.json(gift)
  } catch (error) {
    console.error('Error fetching gift:', error)
    return NextResponse.json(
      { error: 'Ошибка при получении подарка' },
      { status: 500 }
    )
  }
}

export async function PUT(
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
    const validatedData = giftSchema.parse(body)

    // Проверка существования подарка
    const existingGift = await prisma.gift.findUnique({
      where: { id },
    })

    if (!existingGift) {
      return NextResponse.json(
        { error: 'Подарок не найден' },
        { status: 404 }
      )
    }

    const gift = await prisma.gift.update({
      where: { id },
      data: {
        title: validatedData.title,
        description: validatedData.description || null,
        imageUrl: validatedData.imageUrl || null,
        purchaseUrl: validatedData.purchaseUrl,
      },
    })

    return NextResponse.json(gift)
  } catch (error) {
    console.error('Error updating gift:', error)

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