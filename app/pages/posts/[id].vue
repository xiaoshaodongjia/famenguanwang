<template>
  <div>
    <PublicHeader />
    <main class="max-w-4xl mx-auto px-6 lg:px-8 py-16">
      <nav class="text-sm text-ink-tertiary mb-8 font-mono">
        <NuxtLink to="/" class="hover:text-accent transition">Home</NuxtLink>
        <span class="mx-2 text-line">/</span>
        <NuxtLink to="/posts" class="hover:text-accent transition">Posts</NuxtLink>
        <span class="mx-2 text-line">/</span>
        <span class="text-accent">{{ post?.title }}</span>
      </nav>

      <article v-if="post" class="bg-surface rounded-lg p-8 md:p-12">
        <h1 class="text-3xl md:text-4xl font-extralight tracking-tight text-ink">{{ post.title }}</h1>
        <p class="text-sm text-ink-tertiary mt-3 font-mono">{{ formatDate(post.createdAt) }}</p>
        <div v-if="post.cover" class="mt-8"><img :src="post.cover" :alt="post.title" class="w-full rounded-lg" /></div>
        <div class="mt-8 prose-clean prose-lg max-w-none" v-html="post.content"></div>
      </article>
      <div v-else class="text-center py-20 text-ink-tertiary">Post not found</div>

      <div class="mt-10">
        <NuxtLink to="/posts" class="text-accent hover:text-accent-dark text-sm font-medium">← Back to Posts</NuxtLink>
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
useSeoMeta({ description: post.value?.summary || '', ogTitle: seoTitle, ogDescription: post.value?.summary || '', ogType: 'article', ogImage: post.value?.cover || undefined })
const formatDate = (date: string) => new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
</script>
