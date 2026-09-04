<template>
  <div>
    <PublicHeader />

    <main class="max-w-7xl mx-auto px-6 lg:px-8 py-16">
      <div class="text-center mb-14">
        <h1 class="text-4xl md:text-5xl font-extralight tracking-tight text-snow">应用案例</h1>
        <div class="gold-divider mt-4 mx-auto"></div>
        <p class="mt-4 text-mist text-lg font-light">探索阀门在各行业的成功应用方案</p>
      </div>

      <!-- 分类筛选 -->
      <div class="flex items-center justify-center gap-3 mb-12 flex-wrap">
        <button
          :class="[
            'px-4 py-2 text-sm rounded-full transition border',
            !selectedCategory
              ? 'bg-gold text-void border-gold'
              : 'bg-surface border-gold/10 text-mist hover:border-gold/30 hover:text-gold'
          ]"
          @click="selectedCategory = ''"
        >
          全部
        </button>
        <button
          v-for="cat in categoryOptions"
          :key="cat"
          :class="[
            'px-4 py-2 text-sm rounded-full transition border',
            selectedCategory === cat
              ? 'bg-gold text-void border-gold'
              : 'bg-surface border-gold/10 text-mist hover:border-gold/30 hover:text-gold'
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
          class="bg-surface rounded-lg border border-gold overflow-hidden transition-all duration-400 hover:border-[rgba(200,169,110,0.2)] hover:shadow-[0_0_20px_rgba(200,169,110,0.08)] group"
        >
          <div class="aspect-video bg-surface-raised overflow-hidden">
            <img
              v-if="item.cover"
              :src="item.cover"
              :alt="item.title"
              class="w-full h-full object-cover group-hover:opacity-80 transition-opacity duration-500"
            />
            <div v-else class="w-full h-full flex items-center justify-center text-ash">
              <svg class="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
          <div class="p-5">
            <div class="flex items-center gap-2 mb-2">
              <span v-if="item.category" class="text-xs font-mono text-gold/70 px-2 py-0.5 bg-gold/5 rounded">{{ item.category }}</span>
              <span v-if="item.isFeatured" class="text-xs bg-gold/10 text-gold px-2 py-0.5 rounded">推荐</span>
            </div>
            <h3 class="font-normal text-snow group-hover:text-gold transition-colors">{{ item.title }}</h3>
            <p class="text-sm text-fog mt-2 line-clamp-2">{{ item.summary }}</p>
          </div>
        </NuxtLink>
      </div>

      <div v-else class="text-center py-16 text-fog">
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
