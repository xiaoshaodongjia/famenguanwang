import prisma from "#server/utils/prisma"
import { requireAuth } from "#server/utils/session"

export default defineEventHandler(async (event) => {
  requireAuth(event)

  const body = await readBody(event)
  const name = (body.name || "").trim()
  let parentId = null
  if (body.parentId) {
    parentId = parseInt(body.parentId)
  }
  const sortOrder = body.sortOrder || 0

  if (!name) {
    throw createError({ statusCode: 400, message: "请输入分类名称" })
  }

  const existing = await prisma.category.findFirst({ where: { name } })
  if (existing) {
    throw createError({ statusCode: 400, message: "该分类名称已被使用" })
  }

  if (parentId) {
    const parent = await prisma.category.findUnique({ where: { id: parentId } })
    if (!parent) {
      throw createError({ statusCode: 400, message: "父分类不存在" })
    }
  }

  const category = await prisma.category.create({
    data: { name, parentId, sortOrder },
  })

  return { data: category }
})
