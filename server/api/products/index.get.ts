import prisma from '#server/utils/prisma'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const { category, categoryId, search, featured, page = '1', limit = '12', includeInactive } = query

  const pageNum = Math.max(1, parseInt(page as string))
  const limitNum = Math.min(100, Math.max(1, parseInt(limit as string)))
  const skip = (pageNum - 1) * limitNum

  const where: any = {}
  // 前台默认只显示上架的，后台可传 includeInactive=true
  if (includeInactive !== 'true') {
    where.isActive = true
  }
  if (featured === 'true') {
    where.isFeatured = true
  }
  if (categoryId) {
    const catId = parseInt(categoryId as string)
    // 检查是否是父分类，如果是则查询所有子分类的产品
    const parent = await prisma.category.findUnique({
      where: { id: catId },
      include: { children: true },
    })
    if (parent && parent.children && parent.children.length > 0) {
      where.categoryId = { in: parent.children.map((c) => c.id) }
    } else {
      where.categoryId = catId
    }
  } else if (category) {
    where.category = category
  }
  if (search) {
    where.OR = [
      { name: { contains: search as string } },
      { model: { contains: search as string } },
      { brand: { contains: search as string } },
    ]
  }

  const orderBy: any[] = [
    { isFeatured: 'desc' },
    { createdAt: 'desc' },
  ]

  const [products, total] = await Promise.all([
    prisma.product.findMany({
      where,
      skip,
      take: limitNum,
      orderBy,
    }),
    prisma.product.count({ where }),
  ])

  return {
    data: products,
    pagination: {
      page: pageNum,
      limit: limitNum,
      total,
      totalPages: Math.ceil(total / limitNum),
    },
  }
})
