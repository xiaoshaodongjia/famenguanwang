import prisma from '#server/utils/prisma'
import { requireAuth } from '#server/utils/session'

export default defineEventHandler(async (event) => {
  requireAuth(event)

  const id = parseInt(getRouterParam(event, 'id') as string)
  if (isNaN(id)) throw createError({ statusCode: 400, message: '无效的案例ID' })

  const body = await readBody(event)

  const caseItem = await prisma.case.update({
    where: { id },
    data: {
      ...(body.title !== undefined ? { title: body.title } : {}),
      ...(body.summary !== undefined ? { summary: body.summary } : {}),
      ...(body.content !== undefined ? { content: body.content } : {}),
      ...(body.cover !== undefined ? { cover: body.cover } : {}),
      ...(body.category !== undefined ? { category: body.category } : {}),
      ...(body.isActive !== undefined ? { isActive: body.isActive } : {}),
      ...(body.isFeatured !== undefined ? { isFeatured: body.isFeatured } : {}),
      ...(body.sortOrder !== undefined ? { sortOrder: body.sortOrder } : {}),
    },
  })

  return { data: caseItem }
})
