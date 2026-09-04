import prisma from '#server/utils/prisma'
import { requireAuth } from '#server/utils/session'

export default defineEventHandler(async (event) => {
  requireAuth(event)

  const [total, pending, contacted, completed] = await Promise.all([
    prisma.inquiry.count(),
    prisma.inquiry.count({ where: { status: 'pending' } }),
    prisma.inquiry.count({ where: { status: 'contacted' } }),
    prisma.inquiry.count({ where: { status: 'completed' } }),
  ])

  return { data: { total, pending, contacted, completed } }
})
