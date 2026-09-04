import prisma from '#server/utils/prisma'
import { requireAuth } from '#server/utils/session'

export default defineEventHandler(async (event) => {
  requireAuth(event)

  const body = await readBody(event)
  // body format: { sections: [{ section, title, content, sortOrder }, ...] }
  const sections = body.sections as { section: string; title: string; content: string; sortOrder?: number }[]

  if (!Array.isArray(sections)) {
    throw createError({ statusCode: 400, message: 'Invalid data format' })
  }

  // Upsert each section
  for (const s of sections) {
    await prisma.aboutSection.upsert({
      where: { section: s.section },
      update: { title: s.title, content: s.content, sortOrder: s.sortOrder ?? 0 },
      create: { section: s.section, title: s.title, content: s.content, sortOrder: s.sortOrder ?? 0 },
    })
  }

  return { success: true }
})
