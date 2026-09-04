import prisma from '#server/utils/prisma'
import { requireAuth } from '#server/utils/session'

export default defineEventHandler(async (event) => {
  requireAuth(event)

  const body = await readBody(event)

  if (!body.title) throw createError({ statusCode: 400, message: '标题不能为空' })
  if (!body.fileUrl) throw createError({ statusCode: 400, message: '文件不能为空' })

  const maxOrder = await prisma.download.aggregate({ _max: { sortOrder: true } })

  const download = await prisma.download.create({
    data: {
      title: body.title,
      description: body.description || '',
      fileUrl: body.fileUrl,
      fileSize: body.fileSize || null,
      sortOrder: body.sortOrder ?? (maxOrder._max.sortOrder ?? -1) + 1,
      isActive: body.isActive !== undefined ? body.isActive : true,
    },
  })

  return { data: download }
})
