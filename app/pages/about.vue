<template>
  <div>
    <PublicHeader />

    <main class="max-w-7xl mx-auto px-6 lg:px-8 py-14">
      <!-- Page Header -->
      <div class="mb-12">
        <span class="mono-label">COMPANY</span>
        <h1 class="text-4xl md:text-5xl font-extralight tracking-tight text-snow mt-1">About us</h1>
        <div class="cyan-divider mt-4"></div>
      </div>

      <!-- Dynamic Sections -->
      <section
        v-for="section in sections"
        :key="section.section"
        :id="section.section"
        class="mb-10 scroll-mt-24"
      >
        <h2 class="text-xl font-light text-snow mb-4">{{ section.title }}</h2>
        <div class="bg-surface border border-cyan-line p-6">
          <div v-if="section.content" class="prose-dark leading-relaxed max-w-none" v-html="section.content"></div>
          <p v-else class="text-fog font-mono text-sm">Content coming soon...</p>
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
</script>
