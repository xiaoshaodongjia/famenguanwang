<template>
  <div>
    <PublicHeader />
    <main class="max-w-7xl mx-auto px-6 lg:px-8 py-16">
      <div class="mb-14">
        <h1 class="text-4xl md:text-5xl font-extralight tracking-tight text-ink">Downloads</h1>
        <div class="thin-divider mt-4"></div>
        <p class="mt-4 text-ink-secondary text-lg font-light">Download product catalogs, manuals, and technical documents.</p>
      </div>

      <div v-if="downloads.length" class="bg-surface rounded-lg overflow-hidden">
        <div class="divide-y divide-line-subtle">
          <div v-for="item in downloads" :key="item.id" class="flex items-center justify-between p-6 hover:bg-canvas transition">
            <div class="flex items-center gap-4">
              <div class="w-10 h-10 bg-accent-subtle rounded-lg flex items-center justify-center shrink-0">
                <svg class="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
              </div>
              <div>
                <h3 class="font-normal text-ink">{{ item.title }}</h3>
                <p v-if="item.description" class="text-sm text-ink-tertiary">{{ item.description }}</p>
              </div>
            </div>
            <div class="flex items-center gap-4">
              <span v-if="item.fileSize" class="text-xs text-ink-tertiary font-mono">{{ item.fileSize }}</span>
              <a :href="item.fileUrl" target="_blank" class="inline-flex items-center gap-2 px-5 py-2.5 bg-ink text-surface text-sm font-medium rounded-md hover:bg-ink/90 transition">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
                Download
              </a>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="text-center py-16 text-ink-tertiary">No downloads available yet.</div>
    </main>
    <PublicFooter />
  </div>
</template>

<script setup lang="ts">
useSeoMeta({ title: 'Downloads - PLOVER Industrial Valves & Pipe Fittings', description: 'Download product catalogs, manuals, and technical documents from PLOVER.', ogTitle: 'Downloads - PLOVER', ogType: 'website' })
const { data } = await useFetch('/api/downloads')
const downloads = computed(() => data.value?.data || [])
</script>
