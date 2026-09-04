<template>
  <div>
    <PublicHeader />
    <main class="max-w-7xl mx-auto px-6 lg:px-8 py-16">
      <div class="mb-14">
        <h1 class="text-4xl md:text-5xl font-extralight tracking-tight text-ink">Sectors</h1>
        <div class="thin-divider mt-4"></div>
        <p class="mt-4 text-ink-secondary text-lg font-light">Our valves and pipe fittings serve a wide range of industries.</p>
      </div>

      <section v-for="sector in sectors" :key="sector.id || sector.name" class="mb-12">
        <h2 class="text-2xl font-light text-ink mb-5">{{ sector.name }}</h2>
        <div class="bg-surface rounded-lg p-8">
          <div v-if="sector.items && sector.items.length" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            <div v-for="item in sector.items" :key="item.id || item.name" class="flex items-center gap-3 p-3 bg-canvas rounded-md">
              <svg class="w-5 h-5 text-accent shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>
              <span class="text-sm text-ink-secondary">{{ item.name }}</span>
            </div>
          </div>
          <p v-else class="text-ink-tertiary">No items yet.</p>
        </div>
      </section>
    </main>
    <PublicFooter />
  </div>
</template>

<script setup lang="ts">
useSeoMeta({ title: 'Sectors - PLOVER Industrial Valves & Pipe Fittings', description: 'Our valves and pipe fittings serve industries including Water, Petrol, Food, Paper, Chemicals, Petrochemicals, and more.', ogTitle: 'Sectors - PLOVER', ogType: 'website' })
const { data } = await useFetch('/api/sectors')
const sectors = computed(() => data.value?.data || [])
</script>
