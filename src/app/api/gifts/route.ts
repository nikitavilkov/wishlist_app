import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const gifts = await prisma.gift.findMany({
      orderBy: {
        order: 'asc',
      },
    })
    return NextResponse.json(gifts)
  } catch (error) {
    return NextResponse.json(
      { error: 'Error fetching gifts' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const { title, description, imageUrl, purchaseUrl } = await request.json()

    const lastGift = await prisma.gift.findFirst({
      orderBy: {
        order: 'desc',
      },
    })

    const gift = await prisma.gift.create({
      data: {
        title,
        description,
        imageUrl,
        purchaseUrl,
        order: (lastGift?.order ?? 0) + 1,
      },
    })

    return NextResponse.json(gift)
  } catch (error) {
    return NextResponse.json(
      { error: 'Error creating gift' },
      { status: 500 }
    )
  }
} 