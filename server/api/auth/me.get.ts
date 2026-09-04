import { getSessionFromEvent } from '#server/utils/session'

export default defineEventHandler(async (event) => {
  const session = getSessionFromEvent(event)
  if (!session) {
    return { authenticated: false }
  }
  return { authenticated: true, username: session.username }
})
