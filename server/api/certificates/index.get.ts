import prisma from '#server/utils/prisma'

export default defineEventHandler(async () => {
  const certificates = await prisma.certificate.findMany({
    where: { isActive: true },
    orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }],
  })

  return { data: certificates }
})
