import prisma from '#server/utils/prisma'

export default defineEventHandler(async (event) => {
  const id = parseInt(getRouterParam(event, 'id') as string)

  if (isNaN(id)) {
    throw createError({ statusCode: 400, message: '无效的文章ID' })
  }

  const post = await prisma.post.findFirst({
    where: { id, isActive: true },
  })

  if (!post) {
    throw createError({ statusCode: 404, message: '文章不存在' })
  }

  // 增加浏览量
  await prisma.post.update({
    where: { id },
    data: { viewCount: { increment: 1 } },
  })

  return { data: post }
})
