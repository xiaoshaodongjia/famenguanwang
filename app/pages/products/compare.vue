<template>
  <div>
    <PublicHeader />
    <main class="max-w-7xl mx-auto px-6 lg:px-8 py-16">
      <div class="flex items-center justify-between mb-8">
        <h1 class="text-2xl font-light text-ink">产品对比</h1>
        <NuxtLink to="/products" class="text-sm text-accent hover:text-accent-dark">← 返回产品列表</NuxtLink>
      </div>

      <div v-if="loading" class="text-center py-16">
        <div class="inline-block w-8 h-8 border-2 border-line border-t-accent rounded-full animate-spin"></div>
        <p class="mt-3 text-ink-tertiary">加载中...</p>
      </div>

      <div v-else-if="compareProducts.length < 2" class="text-center py-16 text-ink-tertiary">
        请至少选择 2 个产品进行对比
        <div class="mt-4"><NuxtLink to="/products" class="text-accent hover:text-accent-dark">去选择产品 →</NuxtLink></div>
      </div>

      <div v-else class="overflow-x-auto">
        <table class="w-full border-collapse">
          <thead>
            <tr>
              <th class="p-4 text-left text-sm font-medium text-ink-tertiary bg-canvas border border-line-subtle w-32">参数</th>
              <th v-for="p in compareProducts" :key="p.id" class="p-4 text-center border border-line-subtle min-w-[180px] bg-surface">
                <div class="flex flex-col items-center gap-2">
                  <div class="w-20 h-20 bg-canvas rounded-md overflow-hidden"><img v-if="p.image" :src="p.image" class="w-full h-full object-cover" /></div>
                  <span class="font-normal text-ink text-sm">{{ p.name }}</span>
                  <span class="text-xs text-ink-tertiary font-mono">{{ p.model }}</span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in compareRows" :key="row.label" class="hover:bg-canvas/50 transition">
              <td class="p-4 text-sm font-medium text-ink-tertiary bg-canvas border border-line-subtle">{{ row.label }}</td>
              <td v-for="p in compareProducts" :key="p.id" class="p-4 text-sm text-center border border-line-subtle text-ink-secondary font-mono">
                <template v-if="row.key === 'category'"><span class="text-xs font-mono text-accent px-2 py-0.5 bg-accent-subtle rounded">{{ p.category }}</span></template>
                <template v-else>{{ p[row.key] || '—' }}</template>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
    <PublicFooter />
  </div>
</template>

<script setup lang="ts">
useSeoMeta({ title: '产品对比 - 阀门商城', description: '对比不同阀门产品的参数，选择最适合的工业阀门。' })
const route = useRoute()
const loading = ref(true)
const compareProducts = ref<any[]>([])

const compareRows = [
  { label: '类别', key: 'category' }, { label: '品牌', key: 'brand' }, { label: '型号', key: 'model' },
  { label: '口径', key: 'dn' }, { label: '压力等级', key: 'pn' }, { label: '材质', key: 'material' },
  { label: '连接方式', key: 'connection' }, { label: '适用介质', key: 'media' }, { label: '温度范围', key: 'temperature' },
  { label: '外形尺寸', key: 'dimensions' },
]

onMounted(async () => {
  const ids = (route.query.ids as string || '').split(',').map(Number).filter(Boolean)
  if (ids.length >= 2) {
    const results = await Promise.all(ids.map(id => $fetch(`/api/products/${id}`).catch(() => null)))
    compareProducts.value = results.filter(Boolean).map(r => r.data)
  }
  loading.value = false
})
</script>
