<template>
  <div>
    <PublicHeader />

    <main class="max-w-7xl mx-auto px-6 lg:px-8 py-16">
      <!-- Page Title -->
      <div class="mb-14">
        <h1 class="text-4xl md:text-5xl font-extralight tracking-tight text-snow">Products</h1>
        <div class="gold-divider mt-4"></div>
        <p class="mt-4 text-mist text-lg font-light">Our comprehensive range of industrial valves and pipe fittings.</p>
      </div>

      <!-- Parent Categories -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <NuxtLink
          v-for="parent in parentCategories"
          :key="parent.id"
          :to="`/products/${encodeURIComponent(parent.name)}`"
          class="group bg-surface rounded-lg border border-gold p-10 transition-all duration-400 hover:border-[rgba(200,169,110,0.2)] hover:shadow-[0_0_20px_rgba(200,169,110,0.08)]"
        >
          <h2 class="text-2xl font-light text-snow group-hover:text-gold transition-colors mb-3">
            {{ parent.name }}
          </h2>
          <p class="text-sm text-fog mb-6">
            {{ parent.children?.length || 0 }} sub categories
          </p>
          <div class="flex flex-wrap gap-2">
            <span
              v-for="sub in parent.children"
              :key="sub.id"
              class="text-xs font-mono text-gold/60 px-2.5 py-1 bg-gold/5 rounded"
            >
              {{ sub.name }}
            </span>
          </div>
          <div class="mt-6 text-sm text-gold font-medium group-hover:translate-x-1 transition-transform">
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
