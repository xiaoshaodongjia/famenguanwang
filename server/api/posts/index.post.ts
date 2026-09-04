import prisma from '#server/utils/prisma'
import { requireAuth } from '#server/utils/session'

export default defineEventHandler(async (event) => {
  requireAuth(event)

  const body = await readBody(event)

  if (!body.title) throw createError({ statusCode: 400, message: '标题不能为空' })

  const slug = body.slug || body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

  const post = await prisma.post.create({
    data: {
      title: body.title,
      slug,
      summary: body.summary || '',
      content: body.content || '',
      cover: body.cover || null,
      isActive: body.isActive !== undefined ? body.isActive : true,
    },
  })

  return { data: post }
})
