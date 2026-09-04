<template>
  <div class="bg-surface border border-cyan-line overflow-hidden group transition-all duration-300 hover:border-[rgba(0,212,255,0.4)] hover:shadow-[0_0_16px_rgba(0,212,255,0.1)]">
    <NuxtLink :to="`/products/item/${product.id}`">
      <div class="aspect-square bg-surface-raised overflow-hidden relative">
        <img
          v-if="product.image"
          :src="product.image"
          :alt="product.name"
          class="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-80"
        />
        <div v-else class="w-full h-full flex items-center justify-center text-ash">
          <svg class="w-14 h-14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <!-- Cyan corner accent -->
        <div class="absolute top-0 right-0 w-6 h-6 border-t border-r border-cyan/20 group-hover:border-cyan/50 transition-colors"></div>
      </div>
      <div class="p-4">
        <span class="mono-label">{{ product.category }}</span>
        <h3 class="font-normal text-snow text-sm mt-1 group-hover:text-cyan transition-colors line-clamp-1">{{ product.name }}</h3>
        <p class="text-xs text-fog mt-1 font-mono">{{ product.model }}</p>
        <div class="mt-3 flex items-center gap-3 text-xs font-mono">
          <span class="text-cyan">{{ product.dn }}</span>
          <span class="w-px h-3 bg-line"></span>
          <span class="text-mist">{{ product.pn }}</span>
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
