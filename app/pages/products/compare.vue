<template>
  <div>
    <PublicHeader />

    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="flex items-center justify-between mb-6">
        <h1 class="text-2xl font-bold text-gray-900">产品对比</h1>
        <NuxtLink to="/products" class="text-sm text-blue-600 hover:text-blue-700">
          ← 返回产品列表
        </NuxtLink>
      </div>

      <div v-if="loading" class="text-center py-12">
        <div class="inline-block w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
        <p class="mt-3 text-gray-500">加载中...</p>
      </div>

      <div v-else-if="compareProducts.length < 2" class="text-center py-12 text-gray-500">
        请至少选择 2 个产品进行对比
        <div class="mt-4">
          <NuxtLink to="/products" class="text-blue-600 hover:text-blue-700">去选择产品 →</NuxtLink>
        </div>
      </div>

      <div v-else class="overflow-x-auto">
        <table class="w-full border-collapse">
          <!-- 表头：产品名 -->
          <thead>
            <tr>
              <th class="p-3 text-left text-sm font-medium text-gray-500 bg-gray-50 border w-32">参数</th>
              <th
                v-for="p in compareProducts"
                :key="p.id"
                class="p-3 text-center border min-w-[180px]"
              >
                <div class="flex flex-col items-center gap-2">
                  <div class="w-20 h-20 bg-gray-100 rounded overflow-hidden">
                    <img v-if="p.image" :src="p.image" class="w-full h-full object-cover" />
                  </div>
                  <span class="font-medium text-gray-900 text-sm">{{ p.name }}</span>
                  <span class="text-xs text-gray-500">{{ p.model }}</span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in compareRows" :key="row.label" class="hover:bg-gray-50">
              <td class="p-3 text-sm font-medium text-gray-500 bg-gray-50 border">{{ row.label }}</td>
              <td
                v-for="p in compareProducts"
                :key="p.id"
                class="p-3 text-sm text-center border text-gray-700"
              >
                <template v-if="row.key === 'category'">
                  <span class="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded">{{ p.category }}</span>
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
