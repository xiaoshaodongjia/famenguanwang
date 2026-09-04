import prisma from '#server/utils/prisma'

export default defineEventHandler(async () => {
  const slides = await prisma.slide.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: 'asc' },
    select: {
      id: true,
      image: true,
      title: true,
      subtitle: true,
      link: true,
      buttonText: true,
    }
  })

  return { data: slides }
})
