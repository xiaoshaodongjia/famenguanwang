import prisma from '#server/utils/prisma'
import { requireAuth } from '#server/utils/session'

export default defineEventHandler(async (event) => {
  requireAuth(event)

  const id = parseInt(getRouterParam(event, 'id') as string)
  if (isNaN(id)) {
    throw createError({ statusCode: 400, message: '无效的分类ID' })
  }

  // 将该产品分类下的产品 categoryId 置空
  await prisma.product.updateMany({
    where: { categoryId: id },
    data: { categoryId: null },
  })

  await prisma.category.delete({ where: { id } })

  return { success: true }
})
