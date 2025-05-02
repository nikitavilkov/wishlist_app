import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import { Gift } from '@prisma/client'

const giftSchema = z.object({
  title: z.string().min(1, 'Название обязательно'),
  description: z.string().min(1, 'Описание обязательно'),
  imageUrl: z.string().url('Неверный URL изображения'),
  purchaseUrl: z.string().url('Неверный URL покупки'),
})

type GiftInput = z.infer<typeof giftSchema>

export async function GET() {
  try {
    const gifts = await prisma.gift.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    })
    return NextResponse.json(gifts)
  } catch (error) {
    console.error('Error fetching gifts:', error)
    return NextResponse.json(
      { error: 'Ошибка при получении списка подарков' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const validatedData = giftSchema.parse(body)

    const gift = await prisma.gift.create({
      data: validatedData,
    })

    return NextResponse.json(gift, { status: 201 })
  } catch (error) {
    console.error('Error creating gift:', error)
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      )
    }
    return NextResponse.json(
      { error: 'Ошибка при создании подарка' },
      { status: 500 }
    )
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json()
    const { id, ...data } = body
    const validatedData = giftSchema.parse(data)

    const gift = await prisma.gift.update({
      where: { id: Number(id) },
      data: validatedData,
    })

    return NextResponse.json(gift)
  } catch (error) {
    console.error('Error updating gift:', error)
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      )
    }
    return NextResponse.json(
      { error: 'Ошибка при обновлении подарка' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { error: 'ID подарка не указан' },
        { status: 400 }
      )
    }

    await prisma.gift.delete({
      where: { id: Number(id) },
    })

    return new NextResponse(null, { status: 204 })
  } catch (error) {
    console.error('Error deleting gift:', error)
    return NextResponse.json(
      { error: 'Ошибка при удалении подарка' },
      { status: 500 }
    )
  }
} 