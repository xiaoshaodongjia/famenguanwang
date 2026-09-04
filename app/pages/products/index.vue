<template>
  <div>
    <PublicHeader />

    <main class="max-w-7xl mx-auto px-6 lg:px-8 py-14">
      <!-- Page Title -->
      <div class="mb-10">
        <span class="mono-label">PRODUCT CATALOG</span>
        <h1 class="text-4xl md:text-5xl font-extralight tracking-tight text-snow mt-1">Products</h1>
        <div class="cyan-divider mt-4"></div>
        <p class="mt-3 text-mist font-mono text-sm">Complete range of industrial valves and pipe fittings.</p>
      </div>

      <!-- Parent Categories -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <NuxtLink
          v-for="parent in parentCategories"
          :key="parent.id"
          :to="`/products/${encodeURIComponent(parent.name)}`"
          class="group bg-surface border border-cyan-line p-8 transition-all duration-300 hover:border-[rgba(0,212,255,0.4)] hover:shadow-[0_0_16px_rgba(0,212,255,0.1)]"
        >
          <h2 class="text-lg font-light text-snow group-hover:text-cyan transition-colors mb-2">
            {{ parent.name }}
          </h2>
          <p class="text-xs text-fog mb-4 font-mono">
            {{ parent.children?.length || 0 }} SUB CATEGORIES
          </p>
          <div class="flex flex-wrap gap-2">
            <span
              v-for="sub in parent.children"
              :key="sub.id"
              class="text-xs font-mono text-cyan-dim px-2 py-0.5 bg-cyan/5 border border-cyan-line"
            >
              {{ sub.name }}
            </span>
          </div>
          <div class="mt-4 text-xs text-cyan font-mono uppercase tracking-wider group-hover:translate-x-1 transition-transform">
            BROWSE →
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
