<template>
  <div>
    <PublicHeader />

    <main class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <!-- Breadcrumb -->
      <nav class="text-sm text-gray-500 mb-6">
        <NuxtLink to="/" class="hover:text-blue-600">Home</NuxtLink>
        <span class="mx-2">/</span>
        <NuxtLink to="/posts" class="hover:text-blue-600">Posts</NuxtLink>
        <span class="mx-2">/</span>
        <span class="text-gray-900">{{ post?.title }}</span>
      </nav>

      <article v-if="post" class="bg-white rounded-lg shadow-sm p-8">
        <h1 class="text-3xl font-bold text-gray-900">{{ post.title }}</h1>
        <p class="text-sm text-gray-400 mt-2">{{ formatDate(post.createdAt) }}</p>
        <div v-if="post.cover" class="mt-6">
          <img :src="post.cover" :alt="post.title" class="w-full rounded-lg" />
        </div>
        <div class="mt-6 prose prose-lg max-w-none text-gray-700" v-html="post.content"></div>
      </article>

      <div v-else class="text-center py-20 text-gray-500">
        Post not found
      </div>

      <!-- Back link -->
      <div class="mt-8">
        <NuxtLink to="/posts" class="text-blue-600 hover:text-blue-700 text-sm font-medium">
          ← Back to Posts
        </NuxtLink>
      </div>
    </main>

    <PublicFooter />
  </div>
</template>

<script setup lang="ts">
const route = useRoute()

const { data } = await useFetch(`/api/posts/${route.params.id}`)
const post = computed(() => data.value?.data)

const seoTitle = computed(() => post.value ? `${post.value.title} - PLOVER` : 'Post - PLOVER')

useHead({ title: seoTitle })
useSeoMeta({
  description: post.value?.summary || '',
  ogTitle: seoTitle,
  ogDescription: post.value?.summary || '',
  ogType: 'article',
  ogImage: post.value?.cover || undefined,
})

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}
</script>
