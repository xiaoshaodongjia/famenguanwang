import prisma from '#server/utils/prisma'
import { requireAuth } from '#server/utils/session'

export default defineEventHandler(async (event) => {
  requireAuth(event)

  const id = parseInt(getRouterParam(event, 'id') as string)
  if (isNaN(id)) throw createError({ statusCode: 400, message: '无效的ID' })

  const body = await readBody(event)

  const inquiry = await prisma.inquiry.update({
    where: { id },
    data: {
      ...(body.status ? { status: body.status } : {}),
      ...(body.remark !== undefined ? { remark: body.remark } : {}),
    },
  })

  return { data: inquiry }
})
