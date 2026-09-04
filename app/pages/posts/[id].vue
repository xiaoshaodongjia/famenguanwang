<template>
  <div>
    <PublicHeader />

    <main class="max-w-4xl mx-auto px-6 lg:px-8 py-14">
      <!-- Breadcrumb -->
      <nav class="text-xs text-fog mb-6 font-mono uppercase tracking-wider">
        <NuxtLink to="/" class="hover:text-cyan transition">Home</NuxtLink>
        <span class="mx-2 text-line">/</span>
        <NuxtLink to="/posts" class="hover:text-cyan transition">Posts</NuxtLink>
        <span class="mx-2 text-line">/</span>
        <span class="text-cyan">{{ post?.title }}</span>
      </nav>

      <article v-if="post" class="bg-surface border border-cyan-line p-6 md:p-10">
        <span class="mono-label">ARTICLE</span>
        <h1 class="text-3xl md:text-4xl font-extralight tracking-tight text-snow mt-2">{{ post.title }}</h1>
        <p class="text-xs text-fog mt-3 font-mono">{{ formatDate(post.createdAt) }}</p>
        <div v-if="post.cover" class="mt-6">
          <img :src="post.cover" :alt="post.title" class="w-full border border-line" />
        </div>
        <div class="mt-8 prose-dark prose-lg max-w-none" v-html="post.content"></div>
      </article>

      <div v-else class="text-center py-20 text-fog font-mono text-sm">
        Post not found
      </div>

      <!-- Back link -->
      <div class="mt-8">
        <NuxtLink to="/posts" class="text-cyan hover:text-snow text-xs font-mono uppercase tracking-wider">
          ← BACK TO POSTS
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
