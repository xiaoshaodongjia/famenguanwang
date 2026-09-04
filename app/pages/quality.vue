<template>
  <div>
    <PublicHeader />

    <main class="max-w-7xl mx-auto px-6 lg:px-8 py-14">
      <!-- Page Header -->
      <div class="mb-12">
        <span class="mono-label">QUALITY ASSURANCE</span>
        <h1 class="text-4xl md:text-5xl font-extralight tracking-tight text-snow mt-1">Quality and Certificates</h1>
        <div class="cyan-divider mt-4"></div>
        <p class="mt-3 text-mist font-mono text-sm">Our commitment to quality and our certifications.</p>
      </div>

      <!-- Quality Statement -->
      <section class="mb-12">
        <div class="bg-surface border border-cyan-line p-6">
          <h2 class="text-xs font-mono uppercase tracking-wider text-cyan mb-4">Quality Commitment</h2>
          <div v-if="qualityContent" class="prose-dark leading-relaxed max-w-none" v-html="qualityContent"></div>
          <p v-else class="text-fog font-mono text-sm">Content coming soon...</p>
        </div>
      </section>

      <!-- Certificates -->
      <section>
        <h2 class="text-xs font-mono uppercase tracking-wider text-cyan mb-4">Our Certificates</h2>
        <div v-if="certificates.length" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div
            v-for="cert in certificates"
            :key="cert.id"
            class="bg-surface border border-cyan-line overflow-hidden group transition-all duration-300 hover:border-[rgba(0,212,255,0.4)] hover:shadow-[0_0_16px_rgba(0,212,255,0.1)]"
          >
            <div v-if="cert.imageUrl" class="aspect-video bg-surface-raised">
              <img :src="cert.imageUrl" :alt="cert.title" class="w-full h-full object-cover" />
            </div>
            <div class="p-4">
              <h3 class="font-normal text-snow text-sm">{{ cert.title }}</h3>
              <p v-if="cert.description" class="text-xs text-fog mt-1 font-mono">{{ cert.description }}</p>
              <a
                v-if="cert.fileUrl"
                :href="cert.fileUrl"
                target="_blank"
                class="inline-flex items-center gap-1 mt-3 text-xs text-cyan hover:text-snow font-mono uppercase tracking-wider"
              >
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                </svg>
                Download
              </a>
            </div>
          </div>
        </div>
        <div v-else class="text-center py-16 text-fog font-mono text-sm">
          No certificates available yet.
        </div>
      </section>
    </main>

    <PublicFooter />
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Quality and Certificates - PLOVER Industrial Valves & Pipe Fittings',
  description: 'Our quality commitment and certifications for industrial valves and pipe fittings.',
  ogTitle: 'Quality and Certificates - PLOVER',
  ogType: 'website',
})

const { data: qualityData } = await useFetch('/api/quality')
const { data: certificatesData } = await useFetch('/api/certificates')

const qualityContent = computed(() => qualityData.value?.data?.content || '')
const certificates = computed(() => certificatesData.value?.data || [])
</script>
