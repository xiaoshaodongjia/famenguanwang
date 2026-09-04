import prisma from '#server/utils/prisma'
import { requireAuth } from '#server/utils/session'

export default defineEventHandler(async (event) => {
  requireAuth(event)

  const id = parseInt(getRouterParam(event, 'id') as string)
  if (isNaN(id)) throw createError({ statusCode: 400, message: '无效的文章ID' })

  const body = await readBody(event)

  const post = await prisma.post.update({
    where: { id },
    data: {
      ...(body.title !== undefined ? { title: body.title } : {}),
      ...(body.slug !== undefined ? { slug: body.slug } : {}),
      ...(body.summary !== undefined ? { summary: body.summary } : {}),
      ...(body.content !== undefined ? { content: body.content } : {}),
      ...(body.cover !== undefined ? { cover: body.cover } : {}),
      ...(body.isActive !== undefined ? { isActive: body.isActive } : {}),
    },
  })

  return { data: post }
})
