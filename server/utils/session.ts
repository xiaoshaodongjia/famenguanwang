import { randomBytes } from 'crypto'
import { H3Event } from 'h3'

const sessions = new Map<string, { userId: number; username: string }>()

export function createSession(userId: number, username: string): string {
  const token = randomBytes(32).toString('hex')
  sessions.set(token, { userId, username })
  return token
}

export function findSession(token: string) {
  return sessions.get(token)
}

export function destroySession(token: string) {
  sessions.delete(token)
}

export function getSessionFromEvent(event: H3Event) {
  const cookie = getCookie(event, 'session')
  if (!cookie) return null
  return findSession(cookie)
}

export function requireAuth(event: H3Event) {
  const session = getSessionFromEvent(event)
  if (!session) {
    throw createError({ statusCode: 401, message: '未登录' })
  }
  return session
}
