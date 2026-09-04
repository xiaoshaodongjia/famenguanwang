import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // 创建管理员账号
  const hashedPassword = await bcrypt.hash('admin123', 10)
  await prisma.admin.upsert({
    where: { username: 'admin' },
    update: {},
    create: { username: 'admin', password: hashedPassword },
  })

  // 创建分类
  const categoryNames = ['球阀', '闸阀', '截止阀', '蝶阀', '止回阀', '柱塞阀']
  const categoryMap: Record<string, number> = {}

  for (let i = 0; i < categoryNames.length; i++) {
    const cat = await prisma.category.upsert({
      where: { name: categoryNames[i] },
      update: { sortOrder: i },
      create: { name: categoryNames[i], sortOrder: i },
    })
    categoryMap[categoryNames[i]] = cat.id
  }

  // 示例阀门产品数据
  const products = [
    {
      name: '法兰球阀',
      model: 'Q41F-16C',
      brand: '上海良工',
      category: '球阀',
      dn: 'DN50',
      pn: 'PN16',
      material: 'WCB碳钢',
      connection: '法兰连接',
      media: '水、蒸汽、油',
      temperature: '-20℃~200℃',
      dimensions: 'L=200mm, H=150mm, W=180mm',
      description: '法兰连接球阀，适用于水、蒸汽、油品等介质，密封性好，操作灵活。',
      applicationsWater: JSON.stringify(['城市供水', '污水处理', '农业灌溉', '消防系统']),
      applicationsIndustry: JSON.stringify(['石油化工', '电力能源', '制药食品', '造纸行业']),
    },
    {
      name: '内螺纹球阀',
      model: 'Q11F-16',
      brand: '江苏阀门',
      category: '球阀',
      dn: 'DN15',
      pn: 'PN16',
      material: '黄铜',
      connection: '内螺纹',
      media: '水、空气',
      temperature: '0℃~100℃',
      dimensions: 'L=68mm, H=42mm',
      description: '小型内螺纹球阀，适用于家庭和小型管路系统。',
    },
    {
      name: '法兰闸阀',
      model: 'Z41H-16C',
      brand: '上海良工',
      category: '闸阀',
      dn: 'DN100',
      pn: 'PN16',
      material: 'WCB碳钢',
      connection: '法兰连接',
      media: '水、蒸汽',
      temperature: '-20℃~300℃',
      dimensions: 'L=300mm, H=450mm, W=280mm',
      description: '楔式闸阀，适用于水蒸汽管路，全开时流阻小。',
    },
    {
      name: '截止阀',
      model: 'J41H-25',
      brand: '北方阀门',
      category: '截止阀',
      dn: 'DN65',
      pn: 'PN25',
      material: 'WCB碳钢',
      connection: '法兰连接',
      media: '蒸汽、水、油',
      temperature: '-20℃~350℃',
      dimensions: 'L=260mm, H=320mm',
      description: '截止阀，密封面堆焊硬质合金，耐高温高压。',
    },
    {
      name: '不锈钢法兰蝶阀',
      model: 'D341F-16P',
      brand: '浙江中控',
      category: '蝶阀',
      dn: 'DN150',
      pn: 'PN16',
      material: '304不锈钢',
      connection: '法兰连接',
      media: '水、酸、碱',
      temperature: '-40℃~200℃',
      dimensions: 'L=350mm, H=380mm, W=300mm',
      description: '三偏心金属密封蝶阀，304不锈钢阀体，耐腐蚀。',
      applicationsWater: JSON.stringify(['自来水厂', '海水淡化', '循环冷却水']),
      applicationsIndustry: JSON.stringify(['化工管道', '污水处理', '食品制药', '冶金矿山']),
    },
    {
      name: '消声止回阀',
      model: 'HC41H-16C',
      brand: '上海良工',
      category: '止回阀',
      dn: 'DN80',
      pn: 'PN16',
      material: 'WCB碳钢',
      connection: '法兰连接',
      media: '水、油',
      temperature: '-20℃~200℃',
      dimensions: 'L=240mm, H=160mm',
      description: '消声止回阀，有效防止水锤，自动防止介质倒流。',
    },
    {
      name: '法兰柱塞阀',
      model: 'U41F-16C',
      brand: '北京阀门',
      category: '柱塞阀',
      dn: 'DN50',
      pn: 'PN16',
      material: 'WCB碳钢',
      connection: '法兰连接',
      media: '水、蒸汽',
      temperature: '-20℃~250℃',
      dimensions: 'L=210mm, H=280mm',
      description: '柱塞阀，密封可靠，维修方便，使用寿命长。',
    },
    {
      name: '电动球阀',
      model: 'Q941F-25',
      brand: '浙江中控',
      category: '球阀',
      dn: 'DN100',
      pn: 'PN25',
      material: 'WCB碳钢',
      connection: '法兰连接',
      media: '水、蒸汽、油',
      temperature: '-20℃~200℃',
      dimensions: 'L=350mm, H=420mm, W=320mm',
      description: '电动法兰球阀，可远程控制，适用于自动化管路系统。',
    },
  ]

  for (const product of products) {
    const existing = await prisma.product.findFirst({ where: { name: product.name } })
    if (existing) continue
    await prisma.product.create({
      data: {
        ...product,
        categoryId: categoryMap[product.category] || null,
      },
    })
  }

  // 创建示例案例
  const cases = [
    {
      title: '某化工厂管道系统阀门解决方案',
      summary: '为某大型化工厂提供全套管道阀门解决方案，涵盖球阀、截止阀、止回阀等产品。',
      content: '<h2>项目背景</h2><p>某大型化工厂需要对老旧管道系统进行升级改造，涉及多种腐蚀性介质的输送控制。</p><h2>解决方案</h2><p>我们根据介质特性，选用了以下阀门产品：</p><ul><li>304不锈钢球阀 — 用于水系统控制</li><li>衬氟截止阀 — 用于腐蚀性介质管路</li><li>消声止回阀 — 防止介质倒流</li></ul><h2>项目成果</h2><p>系统运行稳定，密封性能优良，维护成本降低40%。</p>',
      category: '化工',
      isFeatured: true,
      isActive: true,
    },
    {
      title: '城市供水管网改造项目',
      summary: '参与城市供水管网改造，提供大口径蝶阀和闸阀产品。',
      content: '<h2>项目概述</h2><p>城市供水管网老化严重，需要更换大量阀门设备。</p><h2>产品选型</h2><p>根据管网特点，选用以下产品：</p><ul><li>DN300-DN600 法兰蝶阀 — 主干管控制</li><li>DN50-DN150 闸阀 — 分支管路</li><li>DN50 消声止回阀 — 泵出口保护</li></ul><h2>实施效果</h2><p>改造后管网漏损率降低15%，供水稳定性显著提升。</p>',
      category: '水处理',
      isFeatured: true,
      isActive: true,
    },
    {
      title: '热电厂蒸汽系统阀门配套',
      summary: '为热电厂高温高压蒸汽系统提供专业的阀门选型和技术支持。',
      content: '<h2>项目挑战</h2><p>蒸汽系统工况严苛，要求阀门耐高温高压、密封可靠。</p><h2>技术方案</h2><p>针对450℃、4.0MPa的蒸汽工况，我们推荐：</p><ul><li>J41H-25 楔式闸阀 — 主蒸汽管道</li><li>J41H-25 截止阀 — 旁路系统</li></ul><h2>运行反馈</h2><p>阀门运行稳定，密封面采用硬质合金堆焊，使用寿命超过5年。</p>',
      category: '电力',
      isFeatured: false,
      isActive: true,
    },
  ]

  for (const c of cases) {
    const existing = await prisma.case.findFirst({ where: { title: c.title } })
    if (existing) continue
    await prisma.case.create({ data: c })
  }

  console.log(`已创建 ${categoryNames.length} 个分类，${products.length} 个产品，${cases.length} 个案例`)
  console.log('管理员账号: admin / admin123')
}

  // 创建联系信息
  const contactInfos = [
    { key: 'company_name', label: 'Company', value: 'PLOVER INDUSTRIAL CO.,LTD' },
    { key: 'address', label: 'Address', value: 'xxxx' },
    { key: 'tel', label: 'Tel', value: '+86 19816553848' },
    { key: 'email', label: 'Email', value: 'charles@ploverindustrial.com' },
  ]

  for (const info of contactInfos) {
    await prisma.contactInfo.upsert({
      where: { key: info.key },
      update: { label: info.label, value: info.value },
      create: info,
    })
  }

  // 创建默认轮播图
  const slides = [
    {
      image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1920&q=80',
      title: 'Industrial Valves & Pipe Fittings',
      subtitle: 'PLOVER INDUSTRIAL CO.,LTD - Professional manufacturer with years of experience in valve technology',
      link: '/products',
      buttonText: 'Browse Products',
      sortOrder: 0,
      isActive: true,
    },
    {
      image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1920&q=80',
      title: 'High Quality Valve Solutions',
      subtitle: 'Providing exceptional products for water, oil, and gas industries',
      link: '/about',
      buttonText: 'Learn More',
      sortOrder: 1,
      isActive: true,
    },
    {
      image: 'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=1920&q=80',
      title: 'Global Service, Local Support',
      subtitle: 'Serving customers worldwide with professional technical support',
      link: '/contact',
      buttonText: 'Contact Us',
      sortOrder: 2,
      isActive: true,
    },
  ]

  for (const slide of slides) {
    const existing = await prisma.slide.findFirst({ where: { title: slide.title } })
    if (existing) continue
    await prisma.slide.create({ data: slide })
  }

  console.log(`已创建 ${slides.length} 张轮播图`)

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
