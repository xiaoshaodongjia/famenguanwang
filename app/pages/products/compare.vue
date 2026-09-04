<template>
  <div>
    <PublicHeader />

    <main class="max-w-7xl mx-auto px-6 lg:px-8 py-14">
      <div class="flex items-center justify-between mb-6">
        <div>
          <span class="mono-label">COMPARISON</span>
          <h1 class="text-2xl font-light text-snow mt-1">产品对比</h1>
        </div>
        <NuxtLink to="/products" class="text-xs font-mono text-cyan hover:text-snow uppercase tracking-wider">
          ← BACK
        </NuxtLink>
      </div>

      <div v-if="loading" class="text-center py-16">
        <div class="inline-block w-6 h-6 border border-cyan-line border-t-cyan animate-spin"></div>
        <p class="mt-3 text-fog font-mono text-xs">LOADING...</p>
      </div>

      <div v-else-if="compareProducts.length < 2" class="text-center py-16 text-fog font-mono text-sm">
        SELECT AT LEAST 2 PRODUCTS
        <div class="mt-4">
          <NuxtLink to="/products" class="text-cyan hover:text-snow text-xs font-mono uppercase tracking-wider">BROWSE PRODUCTS →</NuxtLink>
        </div>
      </div>

      <div v-else class="overflow-x-auto">
        <table class="w-full border-collapse">
          <!-- 表头：产品名 -->
          <thead>
            <tr>
              <th class="p-3 text-left text-xs font-mono uppercase tracking-wider text-cyan bg-surface-raised border border-line w-28">参数</th>
              <th
                v-for="p in compareProducts"
                :key="p.id"
                class="p-3 text-center border border-line min-w-[160px] bg-surface"
              >
                <div class="flex flex-col items-center gap-2">
                  <div class="w-16 h-16 bg-surface-raised overflow-hidden border border-line">
                    <img v-if="p.image" :src="p.image" class="w-full h-full object-cover" />
                  </div>
                  <span class="font-normal text-snow text-xs">{{ p.name }}</span>
                  <span class="text-xs text-fog font-mono">{{ p.model }}</span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in compareRows" :key="row.label" class="hover:bg-cyan/5 transition">
              <td class="p-3 text-xs font-mono uppercase tracking-wider text-fog bg-surface border border-line">{{ row.label }}</td>
              <td
                v-for="p in compareProducts"
                :key="p.id"
                class="p-3 text-xs text-center border border-line text-mist font-mono"
              >
                <template v-if="row.key === 'category'">
                  <span class="text-xs font-mono text-cyan-dim px-2 py-0.5 bg-cyan/5 border border-cyan-line">{{ p.category }}</span>
                </template>
                <template v-else>
                  {{ p[row.key] || '—' }}
                </template>
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
useSeoMeta({
  title: '产品对比 - 阀门商城',
  description: '对比不同阀门产品的参数，选择最适合的工业阀门。',
})

const route = useRoute()
const loading = ref(true)
const compareProducts = ref<any[]>([])

const compareRows = [
  { label: '类别', key: 'category' },
  { label: '品牌', key: 'brand' },
  { label: '型号', key: 'model' },
  { label: '口径', key: 'dn' },
  { label: '压力等级', key: 'pn' },
  { label: '材质', key: 'material' },
  { label: '连接方式', key: 'connection' },
  { label: '适用介质', key: 'media' },
  { label: '温度范围', key: 'temperature' },
  { label: '外形尺寸', key: 'dimensions' },
]

onMounted(async () => {
  const ids = (route.query.ids as string || '').split(',').map(Number).filter(Boolean)
  if (ids.length >= 2) {
    const results = await Promise.all(
      ids.map(id => $fetch(`/api/products/${id}`).catch(() => null))
    )
    compareProducts.value = results.filter(Boolean).map(r => r.data)
  }
  loading.value = false
})
</script>
