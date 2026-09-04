<template>
  <div>
    <PublicHeader />

    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Breadcrumb -->
      <nav class="text-sm text-gray-500 mb-6">
        <NuxtLink to="/" class="hover:text-blue-600">Home</NuxtLink>
        <span class="mx-2">/</span>
        <NuxtLink to="/products" class="hover:text-blue-600">Products</NuxtLink>
        <span class="mx-2">/</span>
        <span class="text-gray-900">{{ categoryName }}</span>
      </nav>

      <!-- Page Title -->
      <h1 class="text-3xl font-bold text-gray-900 mb-2">{{ categoryName }}</h1>
      <p class="text-gray-500 mb-8">Browse our range of {{ categoryName.toLowerCase() }} products.</p>

      <!-- Sub Categories -->
      <div class="mb-10">
        <h2 class="text-lg font-semibold text-gray-900 mb-4">Sub Categories</h2>
        <div class="flex flex-wrap gap-3">
          <button
            :class="[
              'px-4 py-2 rounded-lg text-sm font-medium transition',
              !selectedSub
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-blue-50 hover:text-blue-600'
            ]"
            @click="selectedSub = ''"
          >
            All
          </button>
          <button
            v-for="sub in subCategories"
            :key="sub.id"
            :class="[
              'px-4 py-2 rounded-lg text-sm font-medium transition',
              selectedSub === sub.name
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-blue-50 hover:text-blue-600'
            ]"
            @click="selectedSub = sub.name"
          >
            {{ sub.name }}
          </button>
        </div>
      </div>

      <!-- Products -->
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-lg font-semibold text-gray-900">
          {{ selectedSub || 'All Products' }}
          <span class="text-sm font-normal text-gray-500 ml-2">({{ products.length }} products)</span>
        </h2>
      </div>

      <!-- Products grid -->
      <div :class="['transition-opacity duration-200', pending ? 'opacity-40 pointer-events-none' : 'opacity-100']">
        <ProductGrid v-if="products.length" :products="products" />
        <div v-else-if="!pending" class="text-center py-12 text-gray-500">
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
