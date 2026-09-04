import prisma from '#server/utils/prisma'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const name = (body.name || '').trim()
  const phone = (body.phone || '').trim()
  const message = (body.message || '').trim()

  if (!name) throw createError({ statusCode: 400, message: '请填写姓名' })
  if (!phone) throw createError({ statusCode: 400, message: '请填写联系电话' })
  if (!message) throw createError({ statusCode: 400, message: '请填写询价内容' })

  const inquiry = await prisma.inquiry.create({
    data: {
      name,
      phone,
      email: body.email || null,
      company: body.company || null,
      message,
      productId: body.productId ? Number(body.productId) : null,
    },
  })

  return { data: inquiry, message: '询价提交成功，我们会尽快与您联系！' }
})
