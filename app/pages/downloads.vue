<template>
  <div>
    <PublicHeader />

    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <!-- Page Header -->
      <div class="mb-10">
        <h1 class="text-3xl font-bold text-gray-900">Downloads</h1>
        <p class="mt-2 text-gray-500">Download product catalogs, manuals, and technical documents.</p>
      </div>

      <!-- Downloads List -->
      <div v-if="downloads.length" class="bg-white rounded-lg shadow-sm overflow-hidden">
        <div class="divide-y divide-gray-100">
          <div
            v-for="item in downloads"
            :key="item.id"
            class="flex items-center justify-between p-4 hover:bg-gray-50 transition"
          >
            <div class="flex items-center gap-4">
              <div class="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center shrink-0">
                <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                </svg>
              </div>
              <div>
                <h3 class="font-medium text-gray-900">{{ item.title }}</h3>
                <p v-if="item.description" class="text-sm text-gray-500">{{ item.description }}</p>
              </div>
            </div>
            <div class="flex items-center gap-3">
              <span v-if="item.fileSize" class="text-xs text-gray-400">{{ item.fileSize }}</span>
              <a
                :href="item.fileUrl"
                target="_blank"
                class="inline-flex items-center gap-1 px-4 py-2 bg-[#e8590c] text-white text-sm font-medium rounded-lg hover:bg-[#d9480f] transition"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
                </svg>
                Download
              </a>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="text-center py-12 text-gray-500">
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
