import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// Указываю, что этот маршрут должен обрабатываться динамически на сервере
export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { direction } = await request.json()
    const gift = await prisma.gift.findUnique({
      where: {
        id: parseInt(params.id),
      },
    })

    if (!gift) {
      return NextResponse.json(
        { error: 'Gift not found' },
        { status: 404 }
      )
    }

    const gifts = await prisma.gift.findMany({
      orderBy: {
        order: 'asc',
      },
    })

    const currentIndex = gifts.findIndex((g) => g.id === gift.id)
    const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1

    if (newIndex < 0 || newIndex >= gifts.length) {
      return NextResponse.json(
        { error: 'Cannot move gift further' },
        { status: 400 }
      )
    }

    const targetGift = gifts[newIndex]

    await prisma.$transaction([
      prisma.gift.update({
        where: { id: gift.id },
        data: { order: targetGift.order },
      }),
      prisma.gift.update({
        where: { id: targetGift.id },
        data: { order: gift.order },
      }),
    ])

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: 'Error moving gift' },
      { status: 500 }
    )
  }
}

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  return NextResponse.json({}, { status: 200 })
} 