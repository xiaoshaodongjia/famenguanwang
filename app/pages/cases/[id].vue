<template>
  <div>
    <PublicHeader />

    <main class="max-w-4xl mx-auto px-6 lg:px-8 py-14">
      <nav class="text-xs text-fog mb-6 font-mono uppercase tracking-wider">
        <NuxtLink to="/" class="hover:text-cyan transition">首页</NuxtLink>
        <span class="mx-2 text-line">/</span>
        <NuxtLink to="/cases" class="hover:text-cyan transition">应用案例</NuxtLink>
        <span class="mx-2 text-line">/</span>
        <span class="text-cyan">{{ caseItem?.title }}</span>
      </nav>

      <article v-if="caseItem" class="bg-surface border border-cyan-line overflow-hidden">
        <img
          v-if="caseItem.cover"
          :src="caseItem.cover"
          :alt="caseItem.title"
          class="w-full aspect-video object-cover"
        />
        <div class="p-6 md:p-10">
          <div class="flex items-center gap-2 mb-4">
            <span v-if="caseItem.category" class="text-xs font-mono text-cyan-dim px-2 py-0.5 bg-cyan/5 border border-cyan-line">{{ caseItem.category }}</span>
            <span v-if="caseItem.isFeatured" class="text-xs font-mono text-cyan bg-cyan/10 px-2 py-0.5">推荐</span>
          </div>
          <h1 class="text-2xl md:text-3xl font-light text-snow mb-4">{{ caseItem.title }}</h1>
          <p v-if="caseItem.summary" class="text-mist text-lg mb-6 pb-6 border-b border-line">{{ caseItem.summary }}</p>
          <div class="prose-dark prose-lg max-w-none" v-html="caseItem.content"></div>
        </div>
      </article>

      <div v-else class="text-center py-20 text-fog font-mono text-sm">
        案例不存在或已下架
      </div>

      <div class="mt-8 text-center">
        <NuxtLink to="/cases" class="text-cyan hover:text-snow text-xs font-mono uppercase tracking-wider">← 返回案例列表</NuxtLink>
      </div>
    </main>

    <PublicFooter />
  </div>
</template>

<script setup lang="ts">
const route = useRoute()

const { data } = await useFetch(`/api/cases/${route.params.id}`)
const caseItem = computed(() => data.value?.data)

useHead({
  title: computed(() => caseItem.value ? `${caseItem.value.title} - 应用案例 - 阀门商城` : '案例详情 - 阀门商城'),
})
useSeoMeta({
  description: computed(() => caseItem.value?.summary || ''),
  ogTitle: computed(() => caseItem.value?.title || ''),
  ogDescription: computed(() => caseItem.value?.summary || ''),
  ogType: 'article',
  ogImage: computed(() => caseItem.value?.image || undefined),
})
</script>
