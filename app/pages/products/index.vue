<template>
  <div>
    <PublicHeader />

    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Page Title -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900">Products</h1>
        <p class="mt-2 text-gray-500">Our comprehensive range of industrial valves and pipe fittings.</p>
      </div>

      <!-- Parent Categories -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <NuxtLink
          v-for="parent in parentCategories"
          :key="parent.id"
          :to="`/products/${encodeURIComponent(parent.name)}`"
          class="group border border-gray-200 rounded-xl p-8 hover:border-blue-300 hover:shadow-lg transition-all"
        >
          <h2 class="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-3">
            {{ parent.name }}
          </h2>
          <p class="text-sm text-gray-500 mb-4">
            {{ parent.children?.length || 0 }} sub categories
          </p>
          <div class="flex flex-wrap gap-2">
            <span
              v-for="sub in parent.children"
              :key="sub.id"
              class="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full"
            >
              {{ sub.name }}
            </span>
          </div>
          <div class="mt-5 text-sm text-blue-600 font-medium group-hover:translate-x-1 transition-transform">
            Browse products →
          </div>
        </NuxtLink>
      </div>
    </main>

    <PublicFooter />
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Products - PLOVER Industrial Valves & Pipe Fittings',
  description: 'Browse our comprehensive range of industrial valves and pipe fittings including Gate Valve, Butterfly Valve, Check Valve, Ball Valve and more.',
  ogTitle: 'Products - PLOVER',
  ogDescription: 'Industrial valves and pipe fittings',
  ogType: 'website',
})

// 从数据库动态加载分类层级
const { data: categoriesData } = await useFetch('/api/products/categories')
const parentCategories = computed<any[]>(() => categoriesData.value?.data || [])
</script>
