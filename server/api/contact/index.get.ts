import prisma from '#server/utils/prisma'

export default defineEventHandler(async () => {
  const items = await prisma.contactInfo.findMany()

  const result: Record<string, { label: string; value: string }> = {}
  for (const item of items) {
    result[item.key] = { label: item.label, value: item.value }
  }

  return { data: result }
})
