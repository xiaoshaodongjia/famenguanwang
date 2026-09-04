<template>
  <div>
    <PublicHeader />

    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <!-- Page Header -->
      <div class="mb-10">
        <h1 class="text-3xl font-bold text-gray-900">Posts</h1>
        <p class="mt-2 text-gray-500">Latest news and articles from PLOVER.</p>
      </div>

      <!-- Posts List -->
      <div v-if="posts.length" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <NuxtLink
          v-for="post in posts"
          :key="post.id"
          :to="`/posts/${post.id}`"
          class="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition group"
        >
          <div v-if="post.cover" class="aspect-video bg-gray-100">
            <img :src="post.cover" :alt="post.title" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
          </div>
          <div class="p-5">
            <h2 class="font-semibold text-gray-900 group-hover:text-blue-600 transition line-clamp-2">{{ post.title }}</h2>
            <p v-if="post.summary" class="text-sm text-gray-500 mt-2 line-clamp-2">{{ post.summary }}</p>
            <p class="text-xs text-gray-400 mt-3">{{ formatDate(post.createdAt) }}</p>
          </div>
        </NuxtLink>
      </div>

      <div v-else class="text-center py-12 text-gray-500">
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
