import prisma from '#server/utils/prisma'
import { requireAuth } from '#server/utils/session'

export default defineEventHandler(async (event) => {
  requireAuth(event)

  const query = getQuery(event)
  const { status, page = '1', limit = '20' } = query

  const pageNum = Math.max(1, parseInt(page as string))
  const limitNum = Math.min(100, Math.max(1, parseInt(limit as string)))
  const skip = (pageNum - 1) * limitNum

  const where: any = {}
  if (status) where.status = status

  const [inquiries, total] = await Promise.all([
    prisma.inquiry.findMany({
      where,
      skip,
      take: limitNum,
      orderBy: { createdAt: 'desc' },
    }),
    prisma.inquiry.count({ where }),
  ])

  return {
    data: inquiries,
    pagination: {
      page: pageNum,
      limit: limitNum,
      total,
      totalPages: Math.ceil(total / limitNum),
    },
  }
})
