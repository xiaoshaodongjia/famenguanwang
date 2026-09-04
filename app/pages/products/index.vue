<template>
  <div>
    <PublicHeader />

    <main class="max-w-7xl mx-auto px-6 lg:px-8 py-16">
      <div class="mb-14">
        <h1 class="text-4xl md:text-5xl font-extralight tracking-tight text-ink">Products</h1>
        <div class="thin-divider mt-4"></div>
        <p class="mt-4 text-ink-secondary text-lg font-light">Our comprehensive range of industrial valves and pipe fittings.</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <NuxtLink v-for="parent in parentCategories" :key="parent.id" :to="`/products/${encodeURIComponent(parent.name)}`" class="group bg-surface rounded-lg p-10 shadow-hover">
          <h2 class="text-2xl font-light text-ink group-hover:text-accent transition-colors mb-3">{{ parent.name }}</h2>
          <p class="text-sm text-ink-tertiary mb-6">{{ parent.children?.length || 0 }} sub categories</p>
          <div class="flex flex-wrap gap-2">
            <span v-for="sub in parent.children" :key="sub.id" class="text-xs font-mono text-accent px-2.5 py-1 bg-accent-subtle rounded">{{ sub.name }}</span>
          </div>
          <div class="mt-6 text-sm text-accent font-medium group-hover:translate-x-1 transition-transform">Browse products →</div>
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
  ogTitle: 'Products - PLOVER', ogDescription: 'Industrial valves and pipe fittings', ogType: 'website',
})

const { data: categoriesData } = await useFetch('/api/products/categories')
const parentCategories = computed<any[]>(() => categoriesData.value?.data || [])
</script>
