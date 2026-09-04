<template>
  <div>
    <PublicHeader />

    <main class="max-w-7xl mx-auto px-6 lg:px-8 py-14">
      <!-- Page Header -->
      <div class="mb-12">
        <span class="mono-label">NEWS & ARTICLES</span>
        <h1 class="text-4xl md:text-5xl font-extralight tracking-tight text-snow mt-1">Posts</h1>
        <div class="cyan-divider mt-4"></div>
        <p class="mt-3 text-mist font-mono text-sm">Latest news and articles from PLOVER.</p>
      </div>

      <!-- Posts List -->
      <div v-if="posts.length" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <NuxtLink
          v-for="post in posts"
          :key="post.id"
          :to="`/posts/${post.id}`"
          class="bg-surface border border-cyan-line overflow-hidden transition-all duration-300 hover:border-[rgba(0,212,255,0.4)] hover:shadow-[0_0_16px_rgba(0,212,255,0.1)] group"
        >
          <div v-if="post.cover" class="aspect-video bg-surface-raised overflow-hidden">
            <img :src="post.cover" :alt="post.title" class="w-full h-full object-cover group-hover:opacity-80 transition-opacity duration-300" />
          </div>
          <div class="p-4">
            <h2 class="font-normal text-snow text-sm group-hover:text-cyan transition-colors line-clamp-2">{{ post.title }}</h2>
            <p v-if="post.summary" class="text-xs text-fog mt-2 line-clamp-2 font-mono">{{ post.summary }}</p>
            <p class="text-xs text-ash mt-3 font-mono">{{ formatDate(post.createdAt) }}</p>
          </div>
        </NuxtLink>
      </div>

      <div v-else class="text-center py-16 text-fog font-mono text-sm">
        No posts available yet.
      </div>

      <!-- Pagination -->
      <Pagination
        v-if="totalPages > 1"
        :current-page="currentPage"
        :total-pages="totalPages"
        @change="handlePageChange"
      />
    </main>

    <PublicFooter />
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Posts - PLOVER Industrial Valves & Pipe Fittings',
  description: 'Latest news and articles from PLOVER INDUSTRIAL CO.,LTD.',
  ogTitle: 'Posts - PLOVER',
  ogType: 'website',
})

const route = useRoute()
const currentPage = ref(Number(route.query.page) || 1)

const { data } = await useFetch('/api/posts', {
  query: { page: currentPage },
  watch: [currentPage]
})

const posts = computed(() => data.value?.data || [])
const totalPages = computed(() => data.value?.pagination?.totalPages || 1)

const handlePageChange = (page: number) => {
  currentPage.value = page
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}
</script>
