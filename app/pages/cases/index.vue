<template>
  <div>
    <PublicHeader />

    <main class="max-w-7xl mx-auto px-6 lg:px-8 py-14">
      <div class="text-center mb-12">
        <span class="mono-label">APPLICATION CASES</span>
        <h1 class="text-4xl md:text-5xl font-extralight tracking-tight text-snow mt-1">应用案例</h1>
        <div class="cyan-divider mt-4 mx-auto" style="max-width: 100%;"></div>
        <p class="mt-3 text-mist font-mono text-sm">探索阀门在各行业的成功应用方案</p>
      </div>

      <!-- 分类筛选 -->
      <div class="flex items-center justify-center gap-2 mb-10 flex-wrap">
        <button
          :class="[
            'px-3 py-1.5 text-xs font-mono uppercase tracking-wider transition border',
            !selectedCategory
              ? 'bg-cyan text-ink border-cyan'
              : 'bg-surface border-line text-mist hover:border-cyan-line hover:text-cyan'
          ]"
          @click="selectedCategory = ''"
        >
          全部
        </button>
        <button
          v-for="cat in categoryOptions"
          :key="cat"
          :class="[
            'px-3 py-1.5 text-xs font-mono uppercase tracking-wider transition border',
            selectedCategory === cat
              ? 'bg-cyan text-ink border-cyan'
              : 'bg-surface border-line text-mist hover:border-cyan-line hover:text-cyan'
          ]"
          @click="selectedCategory = cat"
        >
          {{ cat }}
        </button>
      </div>

      <!-- 案例列表 -->
      <div v-if="cases.length" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <NuxtLink
          v-for="item in cases"
          :key="item.id"
          :to="`/cases/${item.id}`"
          class="bg-surface border border-cyan-line overflow-hidden transition-all duration-300 hover:border-[rgba(0,212,255,0.4)] hover:shadow-[0_0_16px_rgba(0,212,255,0.1)] group"
        >
          <div class="aspect-video bg-surface-raised overflow-hidden">
            <img
              v-if="item.cover"
              :src="item.cover"
              :alt="item.title"
              class="w-full h-full object-cover group-hover:opacity-80 transition-opacity duration-300"
            />
            <div v-else class="w-full h-full flex items-center justify-center text-ash">
              <svg class="w-14 h-14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
          <div class="p-4">
            <div class="flex items-center gap-2 mb-2">
              <span v-if="item.category" class="text-xs font-mono text-cyan-dim px-2 py-0.5 bg-cyan/5 border border-cyan-line">{{ item.category }}</span>
              <span v-if="item.isFeatured" class="text-xs font-mono text-cyan bg-cyan/10 px-2 py-0.5">推荐</span>
            </div>
            <h3 class="font-normal text-snow text-sm group-hover:text-cyan transition-colors">{{ item.title }}</h3>
            <p class="text-xs text-fog mt-2 line-clamp-2 font-mono">{{ item.summary }}</p>
          </div>
        </NuxtLink>
      </div>

      <div v-else class="text-center py-16 text-fog font-mono text-sm">
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
