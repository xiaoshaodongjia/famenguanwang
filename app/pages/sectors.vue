<template>
  <div>
    <PublicHeader />

    <main class="max-w-7xl mx-auto px-6 lg:px-8 py-14">
      <!-- Page Header -->
      <div class="mb-12">
        <span class="mono-label">INDUSTRIES</span>
        <h1 class="text-4xl md:text-5xl font-extralight tracking-tight text-snow mt-1">Sectors</h1>
        <div class="cyan-divider mt-4"></div>
        <p class="mt-3 text-mist font-mono text-sm">Our valves and pipe fittings serve a wide range of industries.</p>
      </div>

      <!-- Dynamic Sectors -->
      <section
        v-for="sector in sectors"
        :key="sector.id || sector.name"
        class="mb-10"
      >
        <h2 class="text-xl font-light text-snow mb-4">{{ sector.name }}</h2>
        <div class="bg-surface border border-cyan-line p-6">
          <div v-if="sector.items && sector.items.length" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
            <div
              v-for="item in sector.items"
              :key="item.id || item.name"
              class="flex items-center gap-2 p-2 bg-cyan/5 border border-cyan-line"
            >
              <svg class="w-4 h-4 text-cyan shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
              </svg>
              <span class="text-xs text-mist font-mono">{{ item.name }}</span>
            </div>
          </div>
          <p v-else class="text-fog font-mono text-sm">No items yet.</p>
        </div>
      </section>
    </main>

    <PublicFooter />
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Sectors - PLOVER Industrial Valves & Pipe Fittings',
  description: 'Our valves and pipe fittings serve industries including Water, Petrol, Food, Paper, Chemicals, Petrochemicals, and more.',
  ogTitle: 'Sectors - PLOVER',
  ogType: 'website',
})

const { data } = await useFetch('/api/sectors')

const sectors = computed(() => {
  return data.value?.data || []
})
</script>
