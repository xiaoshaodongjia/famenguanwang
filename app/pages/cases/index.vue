<template>
  <div>
    <PublicHeader />

    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="text-center mb-10">
        <h1 class="text-3xl font-bold text-gray-900">应用案例</h1>
        <p class="mt-3 text-gray-500">探索阀门在各行业的成功应用方案</p>
      </div>

      <!-- 分类筛选 -->
      <div class="flex items-center justify-center gap-3 mb-8">
        <button
          :class="[
            'px-4 py-2 text-sm rounded-full transition',
            !selectedCategory ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          ]"
          @click="selectedCategory = ''"
        >
          全部
        </button>
        <button
          v-for="cat in categoryOptions"
          :key="cat"
          :class="[
            'px-4 py-2 text-sm rounded-full transition',
            selectedCategory === cat ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          ]"
          @click="selectedCategory = cat"
        >
          {{ cat }}
        </button>
      </div>

      <!-- 案例列表 -->
      <div v-if="cases.length" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <NuxtLink
          v-for="item in cases"
          :key="item.id"
          :to="`/cases/${item.id}`"
          class="bg-white rounded-lg shadow-sm hover:shadow-md transition overflow-hidden group"
        >
          <div class="aspect-video bg-gray-100 overflow-hidden">
            <img
              v-if="item.cover"
              :src="item.cover"
              :alt="item.title"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div v-else class="w-full h-full flex items-center justify-center text-gray-300">
              <svg class="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
          <div class="p-5">
            <div class="flex items-center gap-2 mb-2">
              <span v-if="item.category" class="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded">{{ item.category }}</span>
              <span v-if="item.isFeatured" class="text-xs bg-yellow-50 text-yellow-600 px-2 py-0.5 rounded">推荐</span>
            </div>
            <h3 class="font-semibold text-gray-900 group-hover:text-blue-600 transition">{{ item.title }}</h3>
            <p class="text-sm text-gray-500 mt-2 line-clamp-2">{{ item.summary }}</p>
          </div>
        </NuxtLink>
      </div>

      <div v-else class="text-center py-16 text-gray-500">
        暂无案例
      </div>

      <!-- 分页 -->
      <Pagination
        v-if="totalPages > 1"
        :current-page="currentPage"
        :total-pages="totalPages"
        @change="handlePageChange"
      />
    </main>

    <PublicFooter />
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: '应用案例 - 阀门商城 | 工业阀门解决方案',
  description: '浏览阀门在化工、石油、电力、水处理等行业的应用案例和解决方案。',
})

const categoryOptions = ['化工', '石油', '电力', '水处理', '暖通', '冶金']

const selectedCategory = ref('')
const currentPage = ref(1)

const { data, pending } = await useFetch('/api/cases', {
  query: {
    category: selectedCategory,
    page: currentPage,
    limit: 12,
  },
  watch: [selectedCategory, currentPage],
})

const cases = computed(() => data.value?.data || [])
const totalPages = computed(() => data.value?.pagination?.totalPages || 1)

const handlePageChange = (page: number) => {
  currentPage.value = page
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>
