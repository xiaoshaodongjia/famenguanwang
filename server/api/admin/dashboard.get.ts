import prisma from '#server/utils/prisma'
import { requireAuth } from '#server/utils/session'

export default defineEventHandler(async (event) => {
  requireAuth(event)

  const [
    totalProducts,
    activeProducts,
    featuredProducts,
    totalCategories,
    totalInquiries,
    pendingInquiries,
    categoryStats,
    recentInquiries,
  ] = await Promise.all([
    prisma.product.count(),
    prisma.product.count({ where: { isActive: true } }),
    prisma.product.count({ where: { isFeatured: true } }),
    prisma.category.count(),
    prisma.inquiry.count(),
    prisma.inquiry.count({ where: { status: 'pending' } }),
    prisma.category.findMany({
      orderBy: { sortOrder: 'asc' },
      include: { _count: { select: { products: true } } },
    }),
    prisma.inquiry.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
    }),
  ])

  return {
    data: {
      overview: {
        totalProducts,
        activeProducts,
        featuredProducts,
        totalCategories,
        totalInquiries,
        pendingInquiries,
      },
      categoryStats: categoryStats.map((c) => ({
        name: c.name,
        count: c._count.products,
      })),
      recentInquiries,
    },
  }
})
