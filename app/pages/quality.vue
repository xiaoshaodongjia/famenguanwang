<template>
  <div>
    <PublicHeader />

    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <!-- Page Header -->
      <div class="mb-10">
        <h1 class="text-3xl font-bold text-gray-900">Quality and Certificates</h1>
        <p class="mt-2 text-gray-500">Our commitment to quality and our certifications.</p>
      </div>

      <!-- Quality Statement -->
      <section class="mb-10">
        <div class="bg-white rounded-lg shadow-sm p-6">
          <h2 class="text-xl font-bold text-gray-900 mb-4">Quality Commitment</h2>
          <div v-if="qualityContent" class="text-gray-700 leading-relaxed prose max-w-none" v-html="qualityContent"></div>
          <p v-else class="text-gray-400">Content coming soon...</p>
        </div>
      </section>

      <!-- Certificates -->
      <section>
        <h2 class="text-xl font-bold text-gray-900 mb-4">Our Certificates</h2>
        <div v-if="certificates.length" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="cert in certificates"
            :key="cert.id"
            class="bg-white rounded-lg shadow-sm overflow-hidden"
          >
            <div v-if="cert.imageUrl" class="aspect-video bg-gray-100">
              <img :src="cert.imageUrl" :alt="cert.title" class="w-full h-full object-cover" />
            </div>
            <div class="p-4">
              <h3 class="font-semibold text-gray-900">{{ cert.title }}</h3>
              <p v-if="cert.description" class="text-sm text-gray-500 mt-1">{{ cert.description }}</p>
              <a
                v-if="cert.fileUrl"
                :href="cert.fileUrl"
                target="_blank"
                class="inline-flex items-center gap-1 mt-3 text-sm text-blue-600 hover:text-blue-700"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                </svg>
                Download
              </a>
            </div>
          </div>
        </div>
        <div v-else class="text-center py-12 text-gray-500">
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
