import prisma from '#server/utils/prisma'
import { requireAuth } from '#server/utils/session'

export default defineEventHandler(async (event) => {
  requireAuth(event)

  const body = await readBody(event)

  // 根据分类名自动关联 categoryId
  let categoryId: number | null = null
  if (body.category) {
    const cat = await prisma.category.findUnique({ where: { name: body.category } })
    categoryId = cat?.id ?? null
  }

  const product = await prisma.product.create({
    data: {
      name: body.name,
      model: body.model,
      brand: body.brand || '',
      category: body.category || '',
      categoryId,
      dn: body.dn || '',
      pn: body.pn || '',
      material: body.material || '',
      connection: body.connection || '',
      media: body.media || '',
      temperature: body.temperature || '',
      dimensions: body.dimensions || null,
      image: body.image || null,
      description: body.description || null,
      manual: body.manual || null,
      productCatalog: body.productCatalog || null,
      properties: body.properties || null,
      generalApplications: body.generalApplications || null,
      applicationsWater: body.applicationsWater || null,
      applicationsIndustry: body.applicationsIndustry || null,
      manufacturingRange: body.manufacturingRange || null,
      distanceBetweenFlanges: body.distanceBetweenFlanges || null,
      installationBetweenFlanges: body.installationBetweenFlanges || null,
      flanged: body.flanged || null,
      upperFlangeConnection: body.upperFlangeConnection || null,
      tests: body.tests || null,
      coating: body.coating || null,
      workingPressure: body.workingPressure || null,
    },
  })

  return { data: product }
})
