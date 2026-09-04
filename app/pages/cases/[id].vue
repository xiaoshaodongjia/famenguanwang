<template>
  <div>
    <PublicHeader />

    <main class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <nav class="text-sm text-gray-500 mb-6">
        <NuxtLink to="/" class="hover:text-blue-600">首页</NuxtLink>
        <span class="mx-2">/</span>
        <NuxtLink to="/cases" class="hover:text-blue-600">应用案例</NuxtLink>
        <span class="mx-2">/</span>
        <span class="text-gray-900">{{ caseItem?.title }}</span>
      </nav>

      <article v-if="caseItem" class="bg-white rounded-lg shadow-sm overflow-hidden">
        <img
          v-if="caseItem.cover"
          :src="caseItem.cover"
          :alt="caseItem.title"
          class="w-full aspect-video object-cover"
        />
        <div class="p-6 md:p-10">
          <div class="flex items-center gap-2 mb-4">
            <span v-if="caseItem.category" class="text-xs bg-blue-50 text-blue-600 px-2.5 py-1 rounded">{{ caseItem.category }}</span>
            <span v-if="caseItem.isFeatured" class="text-xs bg-yellow-50 text-yellow-600 px-2.5 py-1 rounded">推荐</span>
          </div>
          <h1 class="text-2xl md:text-3xl font-bold text-gray-900 mb-4">{{ caseItem.title }}</h1>
          <p v-if="caseItem.summary" class="text-gray-500 text-lg mb-6 pb-6 border-b">{{ caseItem.summary }}</p>
          <div class="prose prose-lg max-w-none text-gray-700" v-html="caseItem.content"></div>
        </div>
      </article>

      <div v-else class="text-center py-20 text-gray-500">
        案例不存在或已下架
      </div>

      <div class="mt-8 text-center">
        <NuxtLink to="/cases" class="text-blue-600 hover:text-blue-700">← 返回案例列表</NuxtLink>
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
