<template>
  <div class="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden group relative">
    <NuxtLink :to="`/products/item/${product.id}`">
      <div class="aspect-square bg-gray-100 overflow-hidden">
        <img
          v-if="product.image"
          :src="product.image"
          :alt="product.name"
          class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div v-else class="w-full h-full flex items-center justify-center text-gray-400">
          <svg class="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
      </div>
      <div class="p-4">
        <div class="flex items-start justify-between gap-2">
          <h3 class="font-medium text-gray-900 line-clamp-1">{{ product.name }}</h3>
          <span class="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded whitespace-nowrap">
            {{ product.category }}
          </span>
        </div>
        <p class="text-sm text-gray-500 mt-1">{{ product.model }}</p>
        <div class="mt-3 flex items-center gap-3 text-xs text-gray-500">
          <span>{{ product.dn }}</span>
          <span class="w-px h-3 bg-gray-300"></span>
          <span>{{ product.pn }}</span>
        </div>
      </div>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  product: {
    id: number
    name: string
    model: string
    category: string
    dn: string
    pn: string
    image: string | null
  }
}>()

</script>
