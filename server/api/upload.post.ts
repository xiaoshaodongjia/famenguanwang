import { requireAuth } from '#server/utils/session'
import { writeFile } from 'fs/promises'
import { join } from 'path'

export default defineEventHandler(async (event) => {
  requireAuth(event)

  const formData = await readMultipartFormData(event)
  if (!formData) {
    throw createError({ statusCode: 400, message: '没有上传文件' })
  }

  const urls: string[] = []

  for (const item of formData) {
    if (item.type && item.filename) {
      const ext = item.filename.split('.').pop()
      const timestamp = Date.now()
      const filename = `${timestamp}-${Math.random().toString(36).slice(2, 8)}.${ext}`
      const filepath = join(process.cwd(), 'public/uploads', filename)
      await writeFile(filepath, item.data)
      urls.push(`/uploads/${filename}`)
    }
  }

  return { urls }
})
