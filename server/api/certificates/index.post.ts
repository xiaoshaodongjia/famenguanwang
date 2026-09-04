import prisma from '#server/utils/prisma'
import { requireAuth } from '#server/utils/session'

export default defineEventHandler(async (event) => {
  requireAuth(event)

  const body = await readBody(event)

  if (!body.title) throw createError({ statusCode: 400, message: '标题不能为空' })

  const maxOrder = await prisma.certificate.aggregate({ _max: { sortOrder: true } })

  const certificate = await prisma.certificate.create({
    data: {
      title: body.title,
      description: body.description || '',
      imageUrl: body.imageUrl || null,
      fileUrl: body.fileUrl || null,
      sortOrder: body.sortOrder ?? (maxOrder._max.sortOrder ?? -1) + 1,
      isActive: body.isActive !== undefined ? body.isActive : true,
    },
  })

  return { data: certificate }
})
