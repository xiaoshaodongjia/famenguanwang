<template>
  <div>
    <PublicHeader />

    <main class="max-w-7xl mx-auto px-6 lg:px-8 py-12">
      <!-- Breadcrumb -->
      <nav class="text-xs text-fog mb-6 font-mono uppercase tracking-wider">
        <NuxtLink to="/" class="hover:text-cyan transition">Home</NuxtLink>
        <span class="mx-2 text-line">/</span>
        <NuxtLink to="/products" class="hover:text-cyan transition">Products</NuxtLink>
        <span class="mx-2 text-line">/</span>
        <span class="text-cyan">{{ categoryName }}</span>
      </nav>

      <!-- Page Title -->
      <h1 class="text-4xl md:text-5xl font-extralight tracking-tight text-snow mb-1">{{ categoryName }}</h1>
      <div class="cyan-divider mt-3 mb-8"></div>

      <!-- Sub Categories -->
      <div class="mb-10">
        <h2 class="text-xs font-mono uppercase tracking-wider text-cyan mb-3">Sub Categories</h2>
        <div class="flex flex-wrap gap-2">
          <button
            :class="[
              'px-3 py-1.5 text-xs font-mono uppercase tracking-wider transition border',
              !selectedSub
                ? 'bg-cyan text-ink border-cyan'
                : 'bg-surface border-line text-mist hover:border-cyan-line hover:text-cyan'
            ]"
            @click="selectedSub = ''"
          >
            All
          </button>
          <button
            v-for="sub in subCategories"
            :key="sub.id"
            :class="[
              'px-3 py-1.5 text-xs font-mono uppercase tracking-wider transition border',
              selectedSub === sub.name
                ? 'bg-cyan text-ink border-cyan'
                : 'bg-surface border-line text-mist hover:border-cyan-line hover:text-cyan'
            ]"
            @click="selectedSub = sub.name"
          >
            {{ sub.name }}
          </button>
        </div>
      </div>

      <!-- Products -->
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-sm font-mono text-snow">
          {{ selectedSub || 'ALL PRODUCTS' }}
          <span class="text-xs text-fog ml-2">({{ products.length }} items)</span>
        </h2>
      </div>

      <!-- Products grid -->
      <div :class="['transition-opacity duration-200', pending ? 'opacity-40 pointer-events-none' : 'opacity-100']">
        <ProductGrid v-if="products.length" :products="products" />
        <div v-else-if="!pending" class="text-center py-16 text-fog font-mono text-sm">
          NO PRODUCTS FOUND
        </div>
      </div>

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
const route = useRoute()
const categoryName = computed(() => route.params.category)

// 获取分类树
const { data: categoriesData } = await useFetch('/api/products/categories')
const categories = computed<any[]>(() => categoriesData.value?.data || [])

// 当前分类的子分类
const subCategories = computed(() => {
  const parent = categories.value.find((p: any) => p.name === categoryName.value)
  return parent?.children || []
})

// 子分类筛选
const selectedSub = ref('')
const currentPage = ref(1)

// 当前父分类 ID
const parentId = computed(() => categories.value.find((p: any) => p.name === categoryName.value)?.id || null)

// 产品列表：选子分类时用 category，否则用 categoryId（自动展开所有子分类产品）
const query = computed(() => ({
  ...(selectedSub.value
    ? { category: selectedSub.value }
    : { categoryId: parentId.value }),
  page: currentPage.value,
  limit: 12
}))

const { data, pending } = await useFetch('/api/products', {
  query,
  watch: [query]
})

const products = computed(() => data.value?.data || [])
const totalPages = computed(() => data.value?.pagination?.totalPages || 1)

// 切换子分类时重置页码
watch(selectedSub, () => {
  currentPage.value = 1
})

const handlePageChange = (page: number) => {
  currentPage.value = page
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

// SEO
useSeoMeta({
  title: `${categoryName.value} - PLOVER Industrial Valves & Pipe Fittings`,
  description: `Browse our comprehensive range of ${categoryName.value.toLowerCase()} products.`,
  ogTitle: `${categoryName.value} - PLOVER`,
  ogType: 'website',
})
</script>
