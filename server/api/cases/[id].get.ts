import prisma from '#server/utils/prisma'

export default defineEventHandler(async (event) => {
  const id = parseInt(getRouterParam(event, 'id') as string)

  if (isNaN(id)) {
    throw createError({ statusCode: 400, message: '无效的案例ID' })
  }

  const caseItem = await prisma.case.findFirst({
    where: { id, isActive: true },
  })

  if (!caseItem) {
    throw createError({ statusCode: 404, message: '案例不存在' })
  }

  return { data: caseItem }
})
