import { requireAuth } from '#server/utils/session'
import prisma from '#server/utils/prisma'

export default defineEventHandler(async (event) => {
  requireAuth(event)

  const body = await readBody(event)
  const { image, title, subtitle, link, buttonText, sortOrder } = body

  if (!image || !title) {
    throw createError({ statusCode: 400, message: '图片和标题不能为空' })
  }

  const slide = await prisma.slide.create({
    data: {
      image,
      title,
      subtitle: subtitle || null,
      link: link || null,
      buttonText: buttonText || null,
      sortOrder: sortOrder || 0,
    }
  })

  return { data: slide }
})
