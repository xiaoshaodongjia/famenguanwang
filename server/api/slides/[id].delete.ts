import { requireAuth } from '#server/utils/session'
import prisma from '#server/utils/prisma'

export default defineEventHandler(async (event) => {
  requireAuth(event)

  const id = Number(getRouterParam(event, 'id'))

  await prisma.slide.delete({ where: { id } })

  return { success: true }
})
