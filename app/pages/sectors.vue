<template>
  <div>
    <PublicHeader />

    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <!-- Page Header -->
      <div class="mb-10">
        <h1 class="text-3xl font-bold text-gray-900">Sectors</h1>
        <p class="mt-2 text-gray-500">Our valves and pipe fittings serve a wide range of industries.</p>
      </div>

      <!-- Dynamic Sectors -->
      <section
        v-for="sector in sectors"
        :key="sector.id || sector.name"
        class="mb-10"
      >
        <h2 class="text-2xl font-bold text-gray-900 mb-4">{{ sector.name }}</h2>
        <div class="bg-white rounded-lg shadow-sm p-6">
          <div v-if="sector.items && sector.items.length" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            <div
              v-for="item in sector.items"
              :key="item.id || item.name"
              class="flex items-center gap-2 p-3 bg-blue-50 rounded-lg"
            >
              <svg class="w-5 h-5 text-blue-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
              </svg>
              <span class="text-sm font-medium text-gray-700">{{ item.name }}</span>
            </div>
          </div>
          <p v-else class="text-gray-400">No items yet.</p>
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
