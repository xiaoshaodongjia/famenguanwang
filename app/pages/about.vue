<template>
  <div>
    <PublicHeader />

    <main class="max-w-7xl mx-auto px-6 lg:px-8 py-16">
      <!-- Page Header -->
      <div class="mb-14">
        <h1 class="text-4xl md:text-5xl font-extralight tracking-tight text-snow">About us</h1>
        <div class="gold-divider mt-4"></div>
      </div>

      <!-- Dynamic Sections -->
      <section
        v-for="section in sections"
        :key="section.section"
        :id="section.section"
        class="mb-14 scroll-mt-24"
      >
        <h2 class="text-2xl font-light text-snow mb-5">{{ section.title }}</h2>
        <div class="bg-surface rounded-lg border border-gold p-8">
          <div v-if="section.content" class="prose-dark leading-relaxed max-w-none" v-html="section.content"></div>
          <p v-else class="text-fog">Content coming soon...</p>
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
