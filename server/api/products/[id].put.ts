import prisma from '#server/utils/prisma'
import { requireAuth } from '#server/utils/session'

export default defineEventHandler(async (event) => {
  requireAuth(event)

  const id = parseInt(getRouterParam(event, 'id') as string)
  if (isNaN(id)) {
    throw createError({ statusCode: 400, message: '无效的产品ID' })
  }

  const body = await readBody(event)

  // 根据分类名自动关联 categoryId
  let categoryId: number | undefined
  if (body.category !== undefined) {
    if (body.category) {
      const cat = await prisma.category.findUnique({ where: { name: body.category } })
      categoryId = cat?.id ?? null
    } else {
      categoryId = null
    }
  }

  const product = await prisma.product.update({
    where: { id },
    data: {
      name: body.name,
      model: body.model,
      brand: body.brand || '',
      category: body.category || '',
      ...(categoryId !== undefined ? { categoryId } : {}),
      dn: body.dn || '',
      pn: body.pn || '',
      material: body.material || '',
      connection: body.connection || '',
      media: body.media || '',
      temperature: body.temperature || '',
      dimensions: body.dimensions || null,
      image: body.image || null,
      description: body.description || null,
      manual: body.manual !== undefined ? body.manual : undefined,
      productCatalog: body.productCatalog !== undefined ? body.productCatalog : undefined,
      properties: body.properties !== undefined ? body.properties : undefined,
      generalApplications: body.generalApplications !== undefined ? body.generalApplications : undefined,
      applicationsWater: body.applicationsWater !== undefined ? body.applicationsWater : undefined,
      applicationsIndustry: body.applicationsIndustry !== undefined ? body.applicationsIndustry : undefined,
      isActive: body.isActive !== undefined ? body.isActive : true,
      manufacturingRange: body.manufacturingRange !== undefined ? body.manufacturingRange : undefined,
      distanceBetweenFlanges: body.distanceBetweenFlanges !== undefined ? body.distanceBetweenFlanges : undefined,
      installationBetweenFlanges: body.installationBetweenFlanges !== undefined ? body.installationBetweenFlanges : undefined,
      flanged: body.flanged !== undefined ? body.flanged : undefined,
      upperFlangeConnection: body.upperFlangeConnection !== undefined ? body.upperFlangeConnection : undefined,
      tests: body.tests !== undefined ? body.tests : undefined,
      coating: body.coating !== undefined ? body.coating : undefined,
      workingPressure: body.workingPressure !== undefined ? body.workingPressure : undefined,
    },
  })

  return { data: product }
})
