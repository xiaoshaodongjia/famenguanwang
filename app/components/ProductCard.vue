<template>
  <div class="bg-surface rounded-lg overflow-hidden group shadow-hover">
    <NuxtLink :to="`/products/item/${product.id}`">
      <div class="aspect-square bg-canvas overflow-hidden">
        <img
          v-if="product.image"
          :src="product.image"
          :alt="product.name"
          class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
        />
        <div v-else class="w-full h-full flex items-center justify-center text-ink-tertiary">
          <svg class="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
      </div>
      <div class="p-5">
        <div class="flex items-start justify-between gap-2">
          <h3 class="font-normal text-ink group-hover:text-accent transition-colors line-clamp-1">{{ product.name }}</h3>
          <span class="text-xs text-accent px-2 py-0.5 bg-accent-subtle rounded whitespace-nowrap">
            {{ product.category }}
          </span>
        </div>
        <p class="text-sm text-ink-tertiary mt-1 font-mono">{{ product.model }}</p>
        <div class="mt-4 flex items-center gap-3 text-xs text-ink-secondary font-mono">
          <span>{{ product.dn }}</span>
          <span class="w-px h-3 bg-line"></span>
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
