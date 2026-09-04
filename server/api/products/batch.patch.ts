import prisma from '#server/utils/prisma'
import { requireAuth } from '#server/utils/session'

export default defineEventHandler(async (event) => {
  requireAuth(event)

  const body = await readBody(event)
  const { ids, action } = body

  if (!Array.isArray(ids) || !ids.length) {
    throw createError({ statusCode: 400, message: '未选择产品' })
  }

  const numIds = ids.map(Number).filter(n => !isNaN(n))

  switch (action) {
    case 'activate':
      await prisma.product.updateMany({ where: { id: { in: numIds } }, data: { isActive: true } })
      break
    case 'deactivate':
      await prisma.product.updateMany({ where: { id: { in: numIds } }, data: { isActive: false } })
      break
    case 'delete':
      await prisma.product.deleteMany({ where: { id: { in: numIds } } })
      break
    case 'setCategory': {
      const categoryId = body.categoryId ? Number(body.categoryId) : null
      let categoryName = ''
      if (categoryId) {
        const cat = await prisma.category.findUnique({ where: { id: categoryId } })
        categoryName = cat?.name || ''
      }
      await prisma.product.updateMany({
        where: { id: { in: numIds } },
        data: { categoryId, category: categoryName },
      })
      break
    }
    default:
      throw createError({ statusCode: 400, message: '无效的操作类型' })
  }

  return { success: true, count: numIds.length }
})
