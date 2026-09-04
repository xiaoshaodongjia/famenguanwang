import prisma from "#server/utils/prisma"
import { requireAuth } from "#server/utils/session"

export default defineEventHandler(async (event) => {
  requireAuth(event)

  const id = parseInt(getRouterParam(event, "id") as string)
  if (isNaN(id)) {
    throw createError({ statusCode: 400, message: "无效的分类ID" })
  }

  const body = await readBody(event)
  const name = (body.name || "").trim()
  let parentId = undefined
  if (body.parentId !== undefined) {
    if (body.parentId) {
      parentId = parseInt(body.parentId)
    } else {
      parentId = null
    }
  }

  if (name) {
    const existing = await prisma.category.findFirst({
      where: { name, NOT: { id } },
    })
    if (existing) {
      throw createError({ statusCode: 400, message: "该分类名称已被使用" })
    }
  }

  if (parentId) {
    if (parentId === id) {
      throw createError({ statusCode: 400, message: "不能将自身设为父分类" })
    }
    const parent = await prisma.category.findUnique({ where: { id: parentId } })
    if (!parent) {
      throw createError({ statusCode: 400, message: "父分类不存在" })
    }
  }

  const data: any = {}
  if (name) data.name = name
  if (parentId !== undefined) data.parentId = parentId
  if (body.sortOrder !== undefined) data.sortOrder = body.sortOrder

  const category = await prisma.category.update({
    where: { id },
    data,
  })

  return { data: category }
})
