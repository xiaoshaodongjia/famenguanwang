import { requireAuth } from '#server/utils/session'
import prisma from '#server/utils/prisma'

export default defineEventHandler(async (event) => {
  requireAuth(event)

  const slides = await prisma.slide.findMany({
    orderBy: { sortOrder: 'asc' },
  })

  return { data: slides }
})
