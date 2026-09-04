import prisma from '#server/utils/prisma'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const { featured, category, page = '1', limit = '12' } = query

  const pageNum = Math.max(1, parseInt(page as string))
  const limitNum = Math.min(50, Math.max(1, parseInt(limit as string)))
  const skip = (pageNum - 1) * limitNum

  const where: any = { isActive: true }
  if (featured === 'true') where.isFeatured = true
  if (category) where.category = category

  const [cases, total] = await Promise.all([
    prisma.case.findMany({
      where,
      skip,
      take: limitNum,
      orderBy: [{ isFeatured: 'desc' }, { sortOrder: 'asc' }, { createdAt: 'desc' }],
    }),
    prisma.case.count({ where }),
  ])

  return {
    data: cases,
    pagination: {
      page: pageNum,
      limit: limitNum,
      total,
      totalPages: Math.ceil(total / limitNum),
    },
  }
})
