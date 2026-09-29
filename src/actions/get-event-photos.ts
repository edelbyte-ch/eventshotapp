'use server'

import prisma from '@/lib/prisma'

export async function getEventPhotos(eventId: string) {
  return prisma.photo.findMany({
    where: {
      eventId,
      status: 'ready',
      approved: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
    select: {
      id: true,
      url: true,
      displayUrl: true,
      width: true,
      height: true,
      blurHash: true,
      thumbUrl: true,
      createdAt: true,
    },
  })
}
