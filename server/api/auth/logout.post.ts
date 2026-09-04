import { getSessionFromEvent, destroySession } from '#server/utils/session'

export default defineEventHandler(async (event) => {
  const cookie = getCookie(event, 'session')
  if (cookie) {
    destroySession(cookie)
  }
  deleteCookie(event, 'session')
  return { success: true }
})
