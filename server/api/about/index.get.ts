import prisma from '#server/utils/prisma'

export default defineEventHandler(async () => {
  const sections = await prisma.aboutSection.findMany({
    orderBy: [{ sortOrder: 'asc' }],
  })

  // Return as a map for easy frontend consumption
  const result: Record<string, { title: string; content: string }> = {}
  for (const s of sections) {
    result[s.section] = { title: s.title, content: s.content }
  }

  return { data: result }
})
