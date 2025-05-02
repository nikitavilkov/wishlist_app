import { prisma } from '@/lib/prisma'
import GiftCard from '@/components/GiftCard'

export default async function Home() {
  const gifts = await prisma.gift.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  })

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {gifts.map((gift) => (
          <GiftCard key={gift.id} gift={gift} />
        ))}
      </div>
    </div>
  )
} 