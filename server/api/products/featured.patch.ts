import prisma from '#server/utils/prisma'
import { requireAuth } from '#server/utils/session'

export default defineEventHandler(async (event) => {
  requireAuth(event)

  const body = await readBody(event)
  const { id, isFeatured } = body

  if (!id || typeof isFeatured !== 'boolean') {
    throw createError({ statusCode: 400, message: '参数无效' })
  }

  const product = await prisma.product.update({
    where: { id: Number(id) },
    data: { isFeatured },
  })

  return { data: product }
})
