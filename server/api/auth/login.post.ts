import prisma from '#server/utils/prisma'
import { createSession } from '#server/utils/session'
import bcrypt from 'bcryptjs'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { username, password } = body

  if (!username || !password) {
    throw createError({ statusCode: 400, message: '请输入用户名和密码' })
  }

  const admin = await prisma.admin.findUnique({ where: { username } })
  if (!admin) {
    throw createError({ statusCode: 401, message: '用户名或密码错误' })
  }

  const valid = await bcrypt.compare(password, admin.password)
  if (!valid) {
    throw createError({ statusCode: 401, message: '用户名或密码错误' })
  }

  const token = createSession(admin.id, admin.username)
  setCookie(event, 'session', token, {
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 7, // 7 days
    sameSite: 'lax',
  })

  return { success: true, username: admin.username }
})
