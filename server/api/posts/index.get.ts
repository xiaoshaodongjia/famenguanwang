import prisma from '#server/utils/prisma'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const { page = '1', limit = '12' } = query

  const pageNum = Math.max(1, parseInt(page as string))
  const limitNum = Math.min(50, Math.max(1, parseInt(limit as string)))
  const skip = (pageNum - 1) * limitNum

  const where: any = { isActive: true }

  const [posts, total] = await Promise.all([
    prisma.post.findMany({
      where,
      skip,
      take: limitNum,
      orderBy: [{ createdAt: 'desc' }],
    }),
    prisma.post.count({ where }),
  ])

  return {
    data: posts,
    pagination: {
      page: pageNum,
      limit: limitNum,
      total,
      totalPages: Math.ceil(total / limitNum),
    },
  }
})
