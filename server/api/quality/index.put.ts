import prisma from '#server/utils/prisma'
import { requireAuth } from '#server/utils/session'

export default defineEventHandler(async (event) => {
  requireAuth(event)

  const body = await readBody(event)
  const content = body.content as string

  const existing = await prisma.qualityContent.findFirst()

  if (existing) {
    await prisma.qualityContent.update({
      where: { id: existing.id },
      data: { content },
    })
  } else {
    await prisma.qualityContent.create({
      data: { content },
    })
  }

  return { success: true }
})
