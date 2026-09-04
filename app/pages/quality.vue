<template>
  <div>
    <PublicHeader />
    <main class="max-w-7xl mx-auto px-6 lg:px-8 py-16">
      <div class="mb-14">
        <h1 class="text-4xl md:text-5xl font-extralight tracking-tight text-ink">Quality and Certificates</h1>
        <div class="thin-divider mt-4"></div>
        <p class="mt-4 text-ink-secondary text-lg font-light">Our commitment to quality and our certifications.</p>
      </div>

      <section class="mb-14">
        <div class="bg-surface rounded-lg p-8">
          <h2 class="text-xl font-light text-ink mb-5">Quality Commitment</h2>
          <div v-if="qualityContent" class="prose-clean leading-relaxed max-w-none" v-html="qualityContent"></div>
          <p v-else class="text-ink-tertiary">Content coming soon...</p>
        </div>
      </section>

      <section>
        <h2 class="text-xl font-light text-ink mb-5">Our Certificates</h2>
        <div v-if="certificates.length" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="cert in certificates" :key="cert.id" class="bg-surface rounded-lg overflow-hidden shadow-hover">
            <div v-if="cert.imageUrl" class="aspect-video bg-canvas"><img :src="cert.imageUrl" :alt="cert.title" class="w-full h-full object-cover" /></div>
            <div class="p-5">
              <h3 class="font-normal text-ink">{{ cert.title }}</h3>
              <p v-if="cert.description" class="text-sm text-ink-tertiary mt-1">{{ cert.description }}</p>
              <a v-if="cert.fileUrl" :href="cert.fileUrl" target="_blank" class="inline-flex items-center gap-1 mt-3 text-sm text-accent hover:text-accent-dark">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
                Download
              </a>
            </div>
          </div>
        </div>
        <div v-else class="text-center py-16 text-ink-tertiary">No certificates available yet.</div>
      </section>
    </main>
    <PublicFooter />
  </div>
</template>

<script setup lang="ts">
useSeoMeta({ title: 'Quality and Certificates - PLOVER Industrial Valves & Pipe Fittings', description: 'Our quality commitment and certifications for industrial valves and pipe fittings.', ogTitle: 'Quality and Certificates - PLOVER', ogType: 'website' })
const { data: qualityData } = await useFetch('/api/quality')
const { data: certificatesData } = await useFetch('/api/certificates')
const qualityContent = computed(() => qualityData.value?.data?.content || '')
const certificates = computed(() => certificatesData.value?.data || [])
</script>
