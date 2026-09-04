import prisma from '#server/utils/prisma'

export default defineEventHandler(async () => {
  const downloads = await prisma.download.findMany({
    where: { isActive: true },
    orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }],
  })

  return { data: downloads }
})
