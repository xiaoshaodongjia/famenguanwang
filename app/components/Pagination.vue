<template>
  <div v-if="totalPages > 1" class="flex items-center justify-center gap-1 mt-8">
    <button
      :disabled="currentPage === 1"
      class="px-3 py-1.5 text-xs font-mono uppercase tracking-wider rounded border border-line disabled:text-ash disabled:border-line disabled:cursor-not-allowed text-mist hover:border-cyan-line hover:text-cyan transition"
      @click="$emit('change', currentPage - 1)"
    >
      PREV
    </button>

    <template v-for="page in pages" :key="page">
      <button
        v-if="page !== '...'"
        :class="[
          'px-3 py-1.5 text-xs font-mono rounded border transition',
          page === currentPage
            ? 'bg-cyan text-ink border-cyan'
            : 'border-line text-mist hover:border-cyan-line hover:text-cyan'
        ]"
        @click="$emit('change', page)"
      >
        {{ page }}
      </button>
      <span v-else class="px-2 text-fog text-xs">···</span>
    </template>

    <button
      :disabled="currentPage === totalPages"
      class="px-3 py-1.5 text-xs font-mono uppercase tracking-wider rounded border border-line disabled:text-ash disabled:border-line disabled:cursor-not-allowed text-mist hover:border-cyan-line hover:text-cyan transition"
      @click="$emit('change', currentPage + 1)"
    >
      NEXT
    </button>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  currentPage: number
  totalPages: number
}>()

defineEmits<{
  change: [page: number]
}>()

const pages = computed(() => {
  const { currentPage, totalPages } = props
  const result: (number | string)[] = []

  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) result.push(i)
    return result
  }

  result.push(1)
  if (currentPage > 3) result.push('...')

  const start = Math.max(2, currentPage - 1)
  const end = Math.min(totalPages - 1, currentPage + 1)
  for (let i = start; i <= end; i++) result.push(i)

  if (currentPage < totalPages - 2) result.push('...')
  result.push(totalPages)

  return result
})
</script>
