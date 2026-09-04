<template>
  <div>
    <PublicHeader />

    <main class="max-w-7xl mx-auto px-6 lg:px-8 py-14">
      <!-- Page Header -->
      <div class="mb-12">
        <span class="mono-label">DOCUMENTS</span>
        <h1 class="text-4xl md:text-5xl font-extralight tracking-tight text-snow mt-1">Downloads</h1>
        <div class="cyan-divider mt-4"></div>
        <p class="mt-3 text-mist font-mono text-sm">Product catalogs, manuals, and technical documents.</p>
      </div>

      <!-- Downloads List -->
      <div v-if="downloads.length" class="bg-surface border border-cyan-line overflow-hidden">
        <div class="divide-y divide-line">
          <div
            v-for="item in downloads"
            :key="item.id"
            class="flex items-center justify-between p-4 hover:bg-surface-raised transition"
          >
            <div class="flex items-center gap-4">
              <div class="w-9 h-9 bg-cyan/10 flex items-center justify-center shrink-0 border border-cyan-line">
                <svg class="w-4 h-4 text-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                </svg>
              </div>
              <div>
                <h3 class="font-normal text-snow text-sm">{{ item.title }}</h3>
                <p v-if="item.description" class="text-xs text-fog font-mono">{{ item.description }}</p>
              </div>
            </div>
            <div class="flex items-center gap-4">
              <span v-if="item.fileSize" class="text-xs text-fog font-mono">{{ item.fileSize }}</span>
              <a
                :href="item.fileUrl"
                target="_blank"
                class="inline-flex items-center gap-2 px-4 py-2 bg-cyan text-ink text-xs font-mono uppercase tracking-wider rounded hover:bg-snow transition"
              >
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
                </svg>
                Download
              </a>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="text-center py-16 text-fog font-mono text-sm">
        No downloads available yet.
      </div>
    </main>

    <PublicFooter />
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Downloads - PLOVER Industrial Valves & Pipe Fittings',
  description: 'Download product catalogs, manuals, and technical documents from PLOVER.',
  ogTitle: 'Downloads - PLOVER',
  ogType: 'website',
})

const { data } = await useFetch('/api/downloads')
const downloads = computed(() => data.value?.data || [])
</script>
