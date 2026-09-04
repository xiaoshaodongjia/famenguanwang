import { requireAuth } from '#server/utils/session'
import prisma from '#server/utils/prisma'

export default defineEventHandler(async (event) => {
  requireAuth(event)

  const id = Number(getRouterParam(event, 'id'))
  const body = await readBody(event)

  const slide = await prisma.slide.update({
    where: { id },
    data: {
      image: body.image,
      title: body.title,
      subtitle: body.subtitle || null,
      link: body.link || null,
      buttonText: body.buttonText || null,
      sortOrder: body.sortOrder || 0,
      isActive: body.isActive ?? true,
    }
  })

  return { data: slide }
})
