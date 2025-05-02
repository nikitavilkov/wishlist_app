import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { isReserved } = await request.json()
    const gift = await prisma.gift.update({
      where: { id: parseInt(params.id) },
      data: { isReserved },
    })
    return NextResponse.json(gift)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update gift' },
      { status: 500 }
    )
  }
} 