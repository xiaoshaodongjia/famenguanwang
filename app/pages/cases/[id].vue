<template>
  <div>
    <PublicHeader />
    <main class="max-w-4xl mx-auto px-6 lg:px-8 py-16">
      <nav class="text-sm text-ink-tertiary mb-8 font-mono">
        <NuxtLink to="/" class="hover:text-accent transition">首页</NuxtLink>
        <span class="mx-2 text-line">/</span>
        <NuxtLink to="/cases" class="hover:text-accent transition">应用案例</NuxtLink>
        <span class="mx-2 text-line">/</span>
        <span class="text-accent">{{ caseItem?.title }}</span>
      </nav>

      <article v-if="caseItem" class="bg-surface rounded-lg overflow-hidden">
        <img v-if="caseItem.cover" :src="caseItem.cover" :alt="caseItem.title" class="w-full aspect-video object-cover" />
        <div class="p-8 md:p-12">
          <div class="flex items-center gap-2 mb-4">
            <span v-if="caseItem.category" class="text-xs font-mono text-accent px-2.5 py-1 bg-accent-subtle rounded">{{ caseItem.category }}</span>
            <span v-if="caseItem.isFeatured" class="text-xs bg-accent-subtle text-accent px-2.5 py-1 rounded">推荐</span>
          </div>
          <h1 class="text-2xl md:text-3xl font-light text-ink mb-4">{{ caseItem.title }}</h1>
          <p v-if="caseItem.summary" class="text-ink-secondary text-lg mb-8 pb-8 border-b border-line-subtle">{{ caseItem.summary }}</p>
          <div class="prose-clean prose-lg max-w-none" v-html="caseItem.content"></div>
        </div>
      </article>
      <div v-else class="text-center py-20 text-ink-tertiary">案例不存在或已下架</div>

      <div class="mt-10 text-center">
        <NuxtLink to="/cases" class="text-accent hover:text-accent-dark">← 返回案例列表</NuxtLink>
      </div>
    </main>
    <PublicFooter />
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const { data } = await useFetch(`/api/cases/${route.params.id}`)
const caseItem = computed(() => data.value?.data)
useHead({ title: computed(() => caseItem.value ? `${caseItem.value.title} - 应用案例 - 阀门商城` : '案例详情 - 阀门商城') })
useSeoMeta({ description: computed(() => caseItem.value?.summary || ''), ogTitle: computed(() => caseItem.value?.title || ''), ogDescription: computed(() => caseItem.value?.summary || ''), ogType: 'article', ogImage: computed(() => caseItem.value?.image || undefined) })
</script>
