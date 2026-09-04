import prisma from '#server/utils/prisma'
import { requireAuth } from '#server/utils/session'

export default defineEventHandler(async (event) => {
  requireAuth(event)

  const body = await readBody(event)
  // body format: { sectors: [{ id?, name, sortOrder, items: [{ id?, name, sortOrder }] }] }
  const sectors = body.sectors as {
    id?: number
    name: string
    sortOrder?: number
    items: { id?: number; name: string; sortOrder?: number }[]
  }[]

  if (!Array.isArray(sectors)) {
    throw createError({ statusCode: 400, message: 'Invalid data format' })
  }

  // Delete sectors not in the list (if we're replacing all)
  const keepIds = sectors.filter(s => s.id).map(s => s.id as number)
  await prisma.sector.deleteMany({
    where: keepIds.length ? { id: { notIn: keepIds } } : {},
  })

  for (const s of sectors) {
    let sectorId: number

    if (s.id) {
      // Update existing sector
      const updated = await prisma.sector.update({
        where: { id: s.id },
        data: { name: s.name, sortOrder: s.sortOrder ?? 0 },
      })
      sectorId = updated.id

      // Delete items not in the list
      const keepItemIds = s.items.filter(i => i.id).map(i => i.id!)
      await prisma.sectorItem.deleteMany({
        where: { sectorId, id: keepItemIds.length ? { notIn: keepItemIds } : {} },
      })
    } else {
      // Create new sector
      const created = await prisma.sector.create({
        data: { name: s.name, sortOrder: s.sortOrder ?? 0 },
      })
      sectorId = created.id
    }

    // Upsert items
    for (const item of s.items) {
      if (item.id) {
        await prisma.sectorItem.update({
          where: { id: item.id },
          data: { name: item.name, sortOrder: item.sortOrder ?? 0 },
        })
      } else {
        await prisma.sectorItem.create({
          data: { name: item.name, sectorId, sortOrder: item.sortOrder ?? 0 },
        })
      }
    }
  }

  return { success: true }
})
