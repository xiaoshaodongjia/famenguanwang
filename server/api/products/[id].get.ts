import prisma from '#server/utils/prisma'

export default defineEventHandler(async (event) => {
  const id = parseInt(getRouterParam(event, 'id') as string)

  if (isNaN(id)) {
    throw createError({ statusCode: 400, message: '无效的产品ID' })
  }

  const product = await prisma.product.findUnique({ where: { id } })

  if (!product) {
    throw createError({ statusCode: 404, message: '产品不存在' })
  }

  return { data: product }
})
