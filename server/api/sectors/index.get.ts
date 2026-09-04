import prisma from '#server/utils/prisma'

export default defineEventHandler(async () => {
  const sectors = await prisma.sector.findMany({
    include: {
      items: {
        orderBy: [{ sortOrder: 'asc' }],
      },
    },
    orderBy: [{ sortOrder: 'asc' }],
  })

  return { data: sectors }
})
