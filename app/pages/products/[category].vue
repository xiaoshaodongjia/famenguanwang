<template>
  <div>
    <PublicHeader />
    <main class="max-w-7xl mx-auto px-6 lg:px-8 py-12">
      <nav class="text-sm text-ink-tertiary mb-8 font-mono">
        <NuxtLink to="/" class="hover:text-accent transition">Home</NuxtLink>
        <span class="mx-2 text-line">/</span>
        <NuxtLink to="/products" class="hover:text-accent transition">Products</NuxtLink>
        <span class="mx-2 text-line">/</span>
        <span class="text-accent">{{ categoryName }}</span>
      </nav>

      <h1 class="text-4xl md:text-5xl font-extralight tracking-tight text-ink mb-2">{{ categoryName }}</h1>
      <div class="thin-divider mt-4 mb-10"></div>

      <div class="mb-12">
        <h2 class="text-lg font-light text-ink-secondary mb-4">Sub Categories</h2>
        <div class="flex flex-wrap gap-3">
          <button :class="['px-4 py-2 rounded-md text-sm font-medium transition border', !selectedSub ? 'bg-ink text-surface border-ink' : 'bg-surface border-line-subtle text-ink-secondary hover:border-ink/20 hover:text-ink']" @click="selectedSub = ''">All</button>
          <button v-for="sub in subCategories" :key="sub.id" :class="['px-4 py-2 rounded-md text-sm font-medium transition border', selectedSub === sub.name ? 'bg-ink text-surface border-ink' : 'bg-surface border-line-subtle text-ink-secondary hover:border-ink/20 hover:text-ink']" @click="selectedSub = sub.name">{{ sub.name }}</button>
        </div>
      </div>

      <div class="flex items-center justify-between mb-8">
        <h2 class="text-lg font-light text-ink">{{ selectedSub || 'All Products' }} <span class="text-sm font-normal text-ink-tertiary ml-2 font-mono">({{ products.length }} products)</span></h2>
      </div>

      <div :class="['transition-opacity duration-200', pending ? 'opacity-40 pointer-events-none' : 'opacity-100']">
        <ProductGrid v-if="products.length" :products="products" />
        <div v-else-if="!pending" class="text-center py-16 text-ink-tertiary">No products found</div>
      </div>

      <Pagination v-if="totalPages > 1" :current-page="currentPage" :total-pages="totalPages" @change="handlePageChange" />
    </main>
    <PublicFooter />
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const categoryName = computed(() => route.params.category)
const { data: categoriesData } = await useFetch('/api/products/categories')
const categories = computed<any[]>(() => categoriesData.value?.data || [])
const subCategories = computed(() => { const parent = categories.value.find((p: any) => p.name === categoryName.value); return parent?.children || [] })
const selectedSub = ref('')
const currentPage = ref(1)
const parentId = computed(() => categories.value.find((p: any) => p.name === categoryName.value)?.id || null)
const query = computed(() => ({ ...(selectedSub.value ? { category: selectedSub.value } : { categoryId: parentId.value }), page: currentPage.value, limit: 12 }))
const { data, pending } = await useFetch('/api/products', { query, watch: [query] })
const products = computed(() => data.value?.data || [])
const totalPages = computed(() => data.value?.pagination?.totalPages || 1)
watch(selectedSub, () => { currentPage.value = 1 })
const handlePageChange = (page: number) => { currentPage.value = page; window.scrollTo({ top: 0, behavior: 'smooth' }) }
useSeoMeta({ title: `${categoryName.value} - PLOVER Industrial Valves & Pipe Fittings`, description: `Browse our comprehensive range of ${categoryName.value.toLowerCase()} products.`, ogTitle: `${categoryName.value} - PLOVER`, ogType: 'website' })
</script>
