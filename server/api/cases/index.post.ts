import prisma from '#server/utils/prisma'
import { requireAuth } from '#server/utils/session'

export default defineEventHandler(async (event) => {
  requireAuth(event)

  const body = await readBody(event)

  if (!body.title) throw createError({ statusCode: 400, message: '标题不能为空' })

  const maxOrder = await prisma.case.aggregate({ _max: { sortOrder: true } })

  const caseItem = await prisma.case.create({
    data: {
      title: body.title,
      summary: body.summary || '',
      content: body.content || '',
      cover: body.cover || null,
      category: body.category || null,
      isActive: body.isActive !== undefined ? body.isActive : true,
      isFeatured: body.isFeatured || false,
      sortOrder: body.sortOrder ?? (maxOrder._max.sortOrder ?? -1) + 1,
    },
  })

  return { data: caseItem }
})
