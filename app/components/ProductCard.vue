<template>
  <div class="bg-surface rounded-lg border border-gold overflow-hidden group transition-all duration-400 hover:border-[rgba(200,169,110,0.2)] hover:shadow-[0_0_20px_rgba(200,169,110,0.08)]">
    <NuxtLink :to="`/products/item/${product.id}`">
      <div class="aspect-square bg-surface-raised overflow-hidden relative">
        <img
          v-if="product.image"
          :src="product.image"
          :alt="product.name"
          class="w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-80"
        />
        <div v-else class="w-full h-full flex items-center justify-center text-ash">
          <svg class="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <!-- Gold corner accent -->
        <div class="absolute top-0 right-0 w-8 h-8 border-t border-r border-gold/20 group-hover:border-gold/40 transition-colors"></div>
      </div>
      <div class="p-5">
        <div class="flex items-start justify-between gap-2">
          <h3 class="font-normal text-snow group-hover:text-gold transition-colors line-clamp-1">{{ product.name }}</h3>
          <span class="text-xs font-mono text-gold/70 px-2 py-0.5 bg-gold/5 rounded whitespace-nowrap">
            {{ product.category }}
          </span>
        </div>
        <p class="text-sm text-fog mt-1 font-mono">{{ product.model }}</p>
        <div class="mt-4 flex items-center gap-3 text-xs font-mono text-mist">
          <span class="text-gold">{{ product.dn }}</span>
          <span class="w-px h-3 bg-gold/20"></span>
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
