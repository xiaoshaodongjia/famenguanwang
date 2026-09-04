import prisma from '#server/utils/prisma'
import { requireAuth } from '#server/utils/session'

export default defineEventHandler(async (event) => {
  requireAuth(event)

  const body = await readBody(event)
  // body format: { items: [{ key, label, value }] }
  const items = body.items as { key: string; label: string; value: string }[]

  if (!Array.isArray(items)) {
    throw createError({ statusCode: 400, message: 'Invalid data format' })
  }

  for (const item of items) {
    await prisma.contactInfo.upsert({
      where: { key: item.key },
      update: { label: item.label, value: item.value },
      create: { key: item.key, label: item.label, value: item.value },
    })
  }

  return { success: true }
})
