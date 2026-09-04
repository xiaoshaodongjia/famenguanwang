import prisma from '#server/utils/prisma'

export default defineEventHandler(async () => {
  const content = await prisma.qualityContent.findFirst()

  return { data: { content: content?.content || '' } }
})
