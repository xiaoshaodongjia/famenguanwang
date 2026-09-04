<template>
  <div>
    <PublicHeader />
    <main class="max-w-7xl mx-auto px-6 lg:px-8 py-16">
      <div class="mb-14">
        <h1 class="text-4xl md:text-5xl font-extralight tracking-tight text-ink">Posts</h1>
        <div class="thin-divider mt-4"></div>
        <p class="mt-4 text-ink-secondary text-lg font-light">Latest news and articles from PLOVER.</p>
      </div>

      <div v-if="posts.length" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <NuxtLink v-for="post in posts" :key="post.id" :to="`/posts/${post.id}`" class="bg-surface rounded-lg overflow-hidden shadow-hover group">
          <div v-if="post.cover" class="aspect-video bg-canvas overflow-hidden"><img :src="post.cover" :alt="post.title" class="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700" /></div>
          <div class="p-5">
            <h2 class="font-normal text-ink group-hover:text-accent transition-colors line-clamp-2">{{ post.title }}</h2>
            <p v-if="post.summary" class="text-sm text-ink-tertiary mt-2 line-clamp-2">{{ post.summary }}</p>
            <p class="text-xs text-ink-tertiary mt-3 font-mono">{{ formatDate(post.createdAt) }}</p>
          </div>
        </NuxtLink>
      </div>
      <div v-else class="text-center py-16 text-ink-tertiary">No posts available yet.</div>

      <Pagination v-if="totalPages > 1" :current-page="currentPage" :total-pages="totalPages" @change="handlePageChange" />
    </main>
    <PublicFooter />
  </div>
</template>

<script setup lang="ts">
useSeoMeta({ title: 'Posts - PLOVER Industrial Valves & Pipe Fittings', description: 'Latest news and articles from PLOVER INDUSTRIAL CO.,LTD.', ogTitle: 'Posts - PLOVER', ogType: 'website' })
const route = useRoute()
const currentPage = ref(Number(route.query.page) || 1)
const { data } = await useFetch('/api/posts', { query: { page: currentPage }, watch: [currentPage] })
const posts = computed(() => data.value?.data || [])
const totalPages = computed(() => data.value?.pagination?.totalPages || 1)
const handlePageChange = (page: number) => { currentPage.value = page; window.scrollTo({ top: 0, behavior: 'smooth' }) }
const formatDate = (date: string) => new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
</script>
