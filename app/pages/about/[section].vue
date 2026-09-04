<template>
  <div>
    <PublicHeader />

    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <!-- Page Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900">About us</h1>
      </div>

      <!-- Sub Navigation -->
      <nav class="mb-10 border-b border-gray-200">
        <div class="flex gap-8">
          <button
            v-for="section in sections"
            :key="section.section"
            class="pb-4 text-sm font-medium border-b-2 transition-colors"
            :class="activeSection === section.section ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-900'"
            @click="activeSection = section.section"
          >
            {{ section.title }}
          </button>
        </div>
      </nav>

      <!-- Active Section Content -->
      <section
        v-for="section in sections"
        v-show="activeSection === section.section"
        :key="section.section"
        class="mb-12"
      >
        <h2 class="text-2xl font-bold text-gray-900 mb-4">{{ section.title }}</h2>
        <div class="bg-white rounded-lg shadow-sm p-6">
          <div v-if="section.content" class="text-gray-700 leading-relaxed prose max-w-none" v-html="section.content"></div>
          <p v-else class="text-gray-400">Content coming soon...</p>
        </div>
      </section>
    </main>

    <PublicFooter />
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'About us - PLOVER Industrial Valves & Pipe Fittings',
  description: 'Learn about PLOVER INDUSTRIAL CO.,LTD - our company, management policy, and services.',
  ogTitle: 'About us - PLOVER',
  ogType: 'website',
})

const { data } = await useFetch('/api/about')

const activeSection = ref('')

const sections = computed(() => {
  const apiData = data.value?.data
  if (!apiData) return []

  const sectionOrder = ['company', 'management_policy', 'services']
  const result = []

  for (const key of sectionOrder) {
    if (apiData[key]) {
      result.push({
        section: key,
        title: apiData[key].title,
        content: apiData[key].content,
      })
    }
  }

  return result
})

// 默认选中第一个
watch(sections, (val) => {
  if (val.length && !activeSection.value) {
    activeSection.value = val[0].section
  }
}, { immediate: true })
</script>
