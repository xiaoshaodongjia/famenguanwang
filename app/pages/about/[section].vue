<template>
  <div>
    <PublicHeader />
    <main class="max-w-7xl mx-auto px-6 lg:px-8 py-16">
      <div class="mb-10">
        <h1 class="text-4xl md:text-5xl font-extralight tracking-tight text-ink">About us</h1>
        <div class="thin-divider mt-4"></div>
      </div>

      <nav class="mb-12 border-b border-line-subtle">
        <div class="flex gap-8">
          <button v-for="section in sections" :key="section.section" class="pb-4 text-sm font-medium border-b-2 transition-colors" :class="activeSection === section.section ? 'border-accent text-accent' : 'border-transparent text-ink-tertiary hover:text-ink-secondary'" @click="activeSection = section.section">{{ section.title }}</button>
        </div>
      </nav>

      <section v-for="section in sections" v-show="activeSection === section.section" :key="section.section" class="mb-12">
        <h2 class="text-2xl font-light text-ink mb-5">{{ section.title }}</h2>
        <div class="bg-surface rounded-lg p-8">
          <div v-if="section.content" class="prose-clean leading-relaxed max-w-none" v-html="section.content"></div>
          <p v-else class="text-ink-tertiary">Content coming soon...</p>
        </div>
      </section>
    </main>
    <PublicFooter />
  </div>
</template>

<script setup lang="ts">
useSeoMeta({ title: 'About us - PLOVER Industrial Valves & Pipe Fittings', description: 'Learn about PLOVER INDUSTRIAL CO.,LTD - our company, management policy, and services.', ogTitle: 'About us - PLOVER', ogType: 'website' })
const { data } = await useFetch('/api/about')
const activeSection = ref('')
const sections = computed(() => {
  const apiData = data.value?.data; if (!apiData) return []
  const sectionOrder = ['company', 'management_policy', 'services']; const result: any[] = []
  for (const key of sectionOrder) { if (apiData[key]) result.push({ section: key, title: apiData[key].title, content: apiData[key].content }) }
  return result
})
watch(sections, (val) => { if (val.length && !activeSection.value) activeSection.value = val[0].section }, { immediate: true })
</script>
