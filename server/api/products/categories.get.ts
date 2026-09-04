import prisma from "#server/utils/prisma"

export default defineEventHandler(async () => {
  const categories = await prisma.category.findMany({
    orderBy: { sortOrder: "asc" },
    include: {
      children: {
        orderBy: { sortOrder: "asc" },
        include: {
          _count: { select: { products: true } },
        },
      },
      _count: { select: { products: true } },
    },
  })

  const parents = categories.filter((c) => c.parentId === null)

  const result = parents.map((p) => {
    const item = {
      id: p.id,
      name: p.name,
      sortOrder: p.sortOrder,
      productCount: p._count.products,
      children: [] as any[],
    }
    if (p.children) {
      item.children = p.children.map((c: any) => ({
        id: c.id,
        name: c.name,
        sortOrder: c.sortOrder,
        productCount: c._count ? c._count.products : 0,
      }))
    }
    return item
  })

  return { data: result }
})
