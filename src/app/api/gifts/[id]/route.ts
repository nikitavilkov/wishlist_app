import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.gift.delete({
      where: {
        id: parseInt(params.id),
      },
    })
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: 'Error deleting gift' },
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
    const body = await request.json()
    const { title, description, imageUrl, purchaseUrl } = body

    const gift = await prisma.gift.update({
      where: {
        id: parseInt(params.id),
      },
      data: {
        title,
        description,
        imageUrl,
        purchaseUrl,
      },
    })

    return NextResponse.json(gift)
  } catch (error) {
    console.error('Error updating gift:', error)
    return NextResponse.json(
      { error: 'Ошибка при обновлении подарка' },
      { status: 500 }
    )
  }
} 