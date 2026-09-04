<template>
  <div class="min-h-screen bg-gray-100">
    <header class="bg-white shadow-sm px-6 py-4 flex items-center justify-between">
      <div class="flex items-center gap-4">
        <NuxtLink to="/admin/products" class="text-gray-500 hover:text-gray-700 text-sm">← 返回产品管理</NuxtLink>
        <!-- <h1 class="text-lg font-bold text-gray-900">数据看板</h1> -->
      </div>
      <div class="flex items-center gap-4">
        <NuxtLink to="/admin/slides" class="text-sm text-gray-600 hover:text-blue-600">Slides</NuxtLink>
        <!-- <NuxtLink to="/admin/inquiries" class="text-sm text-blue-600 hover:text-blue-700">询价管理</NuxtLink> -->
        <span class="text-sm text-gray-500">{{ user?.username }}</span>
        <button @click="handleLogout" class="text-sm text-gray-500 hover:text-red-600">退出登录</button>
      </div>
    </header>

    <main class="p-6 max-w-7xl mx-auto">
      <!-- 概览卡片 -->
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        <div class="bg-white rounded-lg shadow-sm p-4">
          <p class="text-xs text-gray-500">产品总数</p>
          <p class="text-2xl font-bold text-gray-900 mt-1">{{ stats.overview?.totalProducts || 0 }}</p>
        </div>
        <div class="bg-white rounded-lg shadow-sm p-4">
          <p class="text-xs text-gray-500">上架中</p>
          <p class="text-2xl font-bold text-green-600 mt-1">{{ stats.overview?.activeProducts || 0 }}</p>
        </div>
        <div class="bg-white rounded-lg shadow-sm p-4">
          <p class="text-xs text-gray-500">推荐产品</p>
          <p class="text-2xl font-bold text-yellow-600 mt-1">{{ stats.overview?.featuredProducts || 0 }}</p>
        </div>
        <div class="bg-white rounded-lg shadow-sm p-4">
          <p class="text-xs text-gray-500">产品分类</p>
          <p class="text-2xl font-bold text-gray-900 mt-1">{{ stats.overview?.totalCategories || 0 }}</p>
        </div>
        <div class="bg-white rounded-lg shadow-sm p-4">
          <p class="text-xs text-gray-500">询价总数</p>
          <p class="text-2xl font-bold text-gray-900 mt-1">{{ stats.overview?.totalInquiries || 0 }}</p>
        </div>
        <div class="bg-white rounded-lg shadow-sm p-4">
          <p class="text-xs text-gray-500">待处理询价</p>
          <p class="text-2xl font-bold text-red-600 mt-1">{{ stats.overview?.pendingInquiries || 0 }}</p>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- 分类统计 -->
        <div class="bg-white rounded-lg shadow-sm p-6">
          <h2 class="text-sm font-semibold text-gray-900 mb-4">各分类产品数量</h2>
          <div v-if="stats.categoryStats?.length" class="space-y-3">
            <div v-for="cat in stats.categoryStats" :key="cat.name" class="flex items-center gap-3">
              <span class="text-sm text-gray-600 w-16 shrink-0">{{ cat.name }}</span>
              <div class="flex-1 bg-gray-100 rounded-full h-5 overflow-hidden">
                <div
                  class="bg-blue-500 h-full rounded-full transition-all duration-500"
                  :style="{ width: getBarWidth(cat.count) }"
                ></div>
              </div>
              <span class="text-sm font-medium text-gray-700 w-8 text-right">{{ cat.count }}</span>
            </div>
          </div>
          <div v-else class="text-center py-8 text-gray-400 text-sm">暂无数据</div>
        </div>

        <!-- 最新询价 -->
        <div class="bg-white rounded-lg shadow-sm p-6">
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-sm font-semibold text-gray-900">最新询价</h2>
            <NuxtLink to="/admin/inquiries" class="text-xs text-blue-600 hover:text-blue-700">查看全部 →</NuxtLink>
          </div>
          <div v-if="stats.recentInquiries?.length" class="space-y-3">
            <div
              v-for="inq in stats.recentInquiries"
              :key="inq.id"
              class="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <div>
                <span class="text-sm font-medium text-gray-900">{{ inq.name }}</span>
                <span class="text-xs text-gray-400 ml-2">{{ inq.phone }}</span>
                <p class="text-xs text-gray-500 mt-0.5 line-clamp-1">{{ inq.message }}</p>
              </div>
              <span
                :class="[
                  'text-xs px-2 py-0.5 rounded shrink-0 ml-3',
                  inq.status === 'pending' ? 'bg-yellow-50 text-yellow-600' :
                  inq.status === 'contacted' ? 'bg-blue-50 text-blue-600' :
                  'bg-green-50 text-green-600'
                ]"
              >
                {{ statusText(inq.status) }}
              </span>
            </div>
          </div>
          <div v-else class="text-center py-8 text-gray-400 text-sm">暂无询价</div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
const { user, fetchUser, logout } = useAuth()
await fetchUser()
const handleLogout = async () => { await logout() }

const { data } = await useFetch('/api/admin/dashboard')
const stats = computed(() => data.value?.data || {})

const maxCount = computed(() => {
  const cats = stats.value.categoryStats || []
  return Math.max(...cats.map((c: any) => c.count), 1)
})

const getBarWidth = (count: number) => {
  return `${(count / maxCount.value) * 100}%`
}

const statusText = (s: string) => {
  const map: Record<string, string> = { pending: '待处理', contacted: '已联系', completed: '已完成' }
  return map[s] || s
}
</script>
