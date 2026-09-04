<template>
  <div v-if="totalPages > 1" class="flex items-center justify-center gap-2 mt-8">
    <button
      :disabled="currentPage === 1"
      class="px-3 py-2 text-sm rounded border disabled:text-gray-300 disabled:border-gray-200 disabled:cursor-not-allowed hover:bg-gray-50"
      @click="$emit('change', currentPage - 1)"
    >
      上一页
    </button>

    <template v-for="page in pages" :key="page">
      <button
        v-if="page !== '...'"
        :class="[
          'px-3 py-2 text-sm rounded border',
          page === currentPage
            ? 'bg-blue-600 text-white border-blue-600'
            : 'hover:bg-gray-50'
        ]"
        @click="$emit('change', page)"
      >
        {{ page }}
      </button>
      <span v-else class="px-2 text-gray-400">...</span>
    </template>

    <button
      :disabled="currentPage === totalPages"
      class="px-3 py-2 text-sm rounded border disabled:text-gray-300 disabled:border-gray-200 disabled:cursor-not-allowed hover:bg-gray-50"
      @click="$emit('change', currentPage + 1)"
    >
      下一页
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
