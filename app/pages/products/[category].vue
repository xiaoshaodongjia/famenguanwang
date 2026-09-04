<template>
  <div>
    <PublicHeader />

    <main class="max-w-7xl mx-auto px-6 lg:px-8 py-12">
      <!-- Breadcrumb -->
      <nav class="text-sm text-fog mb-8 font-mono">
        <NuxtLink to="/" class="hover:text-gold transition">Home</NuxtLink>
        <span class="mx-2 text-gold/30">/</span>
        <NuxtLink to="/products" class="hover:text-gold transition">Products</NuxtLink>
        <span class="mx-2 text-gold/30">/</span>
        <span class="text-gold">{{ categoryName }}</span>
      </nav>

      <!-- Page Title -->
      <h1 class="text-4xl md:text-5xl font-extralight tracking-tight text-snow mb-2">{{ categoryName }}</h1>
      <div class="gold-divider mt-4 mb-10"></div>

      <!-- Sub Categories -->
      <div class="mb-12">
        <h2 class="text-lg font-light text-mist mb-4">Sub Categories</h2>
        <div class="flex flex-wrap gap-3">
          <button
            :class="[
              'px-4 py-2 rounded-md text-sm font-medium transition border',
              !selectedSub
                ? 'bg-gold text-void border-gold'
                : 'bg-surface border-gold/10 text-mist hover:border-gold/30 hover:text-gold'
            ]"
            @click="selectedSub = ''"
          >
            All
          </button>
          <button
            v-for="sub in subCategories"
            :key="sub.id"
            :class="[
              'px-4 py-2 rounded-md text-sm font-medium transition border',
              selectedSub === sub.name
                ? 'bg-gold text-void border-gold'
                : 'bg-surface border-gold/10 text-mist hover:border-gold/30 hover:text-gold'
            ]"
            @click="selectedSub = sub.name"
          >
            {{ sub.name }}
          </button>
        </div>
      </div>

      <!-- Products -->
      <div class="flex items-center justify-between mb-8">
        <h2 class="text-lg font-light text-snow">
          {{ selectedSub || 'All Products' }}
          <span class="text-sm font-normal text-fog ml-2 font-mono">({{ products.length }} products)</span>
        </h2>
      </div>

      <!-- Products grid -->
      <div :class="['transition-opacity duration-200', pending ? 'opacity-40 pointer-events-none' : 'opacity-100']">
        <ProductGrid v-if="products.length" :products="products" />
        <div v-else-if="!pending" class="text-center py-16 text-fog">
          No products found
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
