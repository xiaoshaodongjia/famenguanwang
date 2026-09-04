<template>
  <div>
    <PublicHeader />

    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Breadcrumb -->
      <nav class="text-sm text-gray-500 mb-6">
        <NuxtLink to="/" class="hover:text-blue-600">Home</NuxtLink>
        <span class="mx-2">/</span>
        <NuxtLink to="/products" class="hover:text-blue-600">Products</NuxtLink>
        <span class="mx-2">/</span>
        <NuxtLink
          v-if="parentCategory"
          :to="`/products/${encodeURIComponent(parentCategory)}`"
          class="hover:text-blue-600"
        >{{ parentCategory }}</NuxtLink>
        <span v-if="parentCategory" class="mx-2">/</span>
        <span class="text-gray-900">{{ product?.name }}</span>
      </nav>

      <div v-if="product">
        <!-- Product Title -->
        <h1 class="text-3xl font-bold text-gray-900 mb-2">{{ product.name }}</h1>
        <p class="text-gray-500 text-sm mb-4">{{ product.brand }} | {{ product.model }}</p>

        <!-- Category / Sub Category -->
        <div class="flex flex-wrap gap-4 mb-8 text-sm">
          <div v-if="parentCategory" class="flex items-center gap-2">
            <span class="text-gray-400">Category:</span>
            <span class="px-3 py-1 rounded-md font-medium bg-gray-100 text-gray-700">{{ parentCategory }}</span>
          </div>
          <div v-if="product?.category" class="flex items-center gap-2">
            <span class="text-gray-400">Sub Category:</span>
            <span class="px-3 py-1 rounded-md font-medium bg-blue-50 text-blue-700">{{ product.category }}</span>
          </div>
        </div>

        <!-- Technical Data Section -->
        <section class="mb-10">
          <h2 class="text-2xl font-bold text-gray-900 mb-1">Technical Data</h2>
          <div class="w-16 h-0.5 bg-blue-600 mb-6"></div>

          <div class="grid lg:grid-cols-2 gap-8">
            <!-- Left: Technical Specs -->
            <div class="bg-white rounded-lg shadow-sm p-6">
              <dl class="space-y-3 text-sm">
                <div v-if="product.manufacturingRange" class="flex border-b border-gray-100 pb-3">
                  <dt class="font-semibold text-gray-700 w-2/5 shrink-0">Manufacturing range</dt>
                  <dd class="text-gray-600">{{ product.manufacturingRange }}</dd>
                </div>
                <div v-if="product.distanceBetweenFlanges" class="flex border-b border-gray-100 pb-3">
                  <dt class="font-semibold text-gray-700 w-2/5 shrink-0">Distance between flanges</dt>
                  <dd class="text-gray-600">{{ product.distanceBetweenFlanges }}</dd>
                </div>
                <div v-if="product.installationBetweenFlanges" class="flex border-b border-gray-100 pb-3">
                  <dt class="font-semibold text-gray-700 w-2/5 shrink-0">Installation between flanges</dt>
                  <dd class="text-gray-600">{{ product.installationBetweenFlanges }}</dd>
                </div>
                <div v-if="product.flanged" class="flex border-b border-gray-100 pb-3">
                  <dt class="font-semibold text-gray-700 w-2/5 shrink-0">Flanged</dt>
                  <dd class="text-gray-600">{{ product.flanged }}</dd>
                </div>
                <div v-if="product.upperFlangeConnection" class="flex border-b border-gray-100 pb-3">
                  <dt class="font-semibold text-gray-700 w-2/5 shrink-0">Upper flange connection</dt>
                  <dd class="text-gray-600">{{ product.upperFlangeConnection }}</dd>
                </div>
                <div v-if="product.tests" class="flex border-b border-gray-100 pb-3">
                  <dt class="font-semibold text-gray-700 w-2/5 shrink-0">Tests</dt>
                  <dd class="text-gray-600">{{ product.tests }}</dd>
                </div>
                <div v-if="product.coating" class="flex border-b border-gray-100 pb-3">
                  <dt class="font-semibold text-gray-700 w-2/5 shrink-0">Coating</dt>
                  <dd class="text-gray-600">{{ product.coating }}</dd>
                </div>
                <div v-if="product.workingPressure" class="flex">
                  <dt class="font-semibold text-gray-700 w-2/5 shrink-0">Working pressure</dt>
                  <dd class="text-gray-600">{{ product.workingPressure }}</dd>
                </div>
              </dl>
            </div>

            <!-- Right: Image + Download Buttons -->
            <div>
              <div class="bg-white rounded-lg shadow-sm overflow-hidden">
                <div v-if="product.image" class="aspect-[4/3]">
                  <img :src="product.image" :alt="product.name" class="w-full h-full object-contain p-4" />
                </div>
                <div v-else class="aspect-[4/3] bg-gray-100 flex items-center justify-center text-gray-400">
                  <svg class="w-24 h-24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>

              <!-- PDF Download Buttons below image -->
              <div class="flex flex-wrap gap-3 mt-4">
                <a
                  v-if="product.manual"
                  :href="product.manual"
                  target="_blank"
                  class="inline-flex items-center gap-2 px-4 py-2.5 bg-[#e8590c] text-white text-sm font-medium rounded-lg hover:bg-[#d9480f] transition"
                >
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clip-rule="evenodd" />
                  </svg>
                  Manual
                </a>
                <a
                  v-if="product.productCatalog"
                  :href="product.productCatalog"
                  target="_blank"
                  class="inline-flex items-center gap-2 px-4 py-2.5 bg-[#e8590c] text-white text-sm font-medium rounded-lg hover:bg-[#d9480f] transition"
                >
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clip-rule="evenodd" />
                  </svg>
                  Product Catalog
                </a>
              </div>

              <!-- Contact CTA -->
              <div class="mt-4">
                <NuxtLink
                  to="/contact"
                  class="inline-flex items-center gap-2 px-5 py-2.5 border-2 border-blue-600 text-blue-600 text-sm font-medium rounded-lg hover:bg-blue-50 transition"
                >
                  Contact Us
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </NuxtLink>
              </div>
            </div>
          </div>
        </section>

        <!-- Product Description Section -->
        <section v-if="product.description" class="mb-10">
          <button class="flex items-center gap-2 group w-full text-left" @click="descExpanded = !descExpanded">
            <h2 class="text-2xl font-bold text-gray-900">Product Description</h2>
            <svg class="w-5 h-5 text-gray-400 transition-transform" :class="descExpanded ? 'rotate-180' : ''" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <div class="w-16 h-0.5 bg-blue-600 mb-6"></div>
          <div v-show="descExpanded" class="bg-white rounded-lg shadow-sm p-6">
            <div class="prose max-w-none text-gray-700 text-sm leading-relaxed" v-html="product.description"></div>
          </div>
        </section>

        <!-- Properties Section -->
        <section v-if="product.properties" class="mb-10">
          <button class="flex items-center gap-2 group w-full text-left" @click="propsExpanded = !propsExpanded">
            <h2 class="text-2xl font-bold text-gray-900">Properties</h2>
            <svg class="w-5 h-5 text-gray-400 transition-transform" :class="propsExpanded ? 'rotate-180' : ''" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <div class="w-16 h-0.5 bg-blue-600 mb-6"></div>
          <div v-show="propsExpanded" class="bg-white rounded-lg shadow-sm p-6">
            <div class="prose prose-sm max-w-none text-gray-700" v-html="product.properties"></div>
          </div>
        </section>

        <!-- General Applications Section -->
        <section v-if="product.generalApplications || applicationsWater.length || applicationsIndustry.length" class="mb-10">
          <h2 class="text-2xl font-bold text-gray-900 mb-1">General Applications</h2>
          <div class="w-16 h-0.5 bg-blue-600 mb-6"></div>
          <div class="bg-white rounded-lg shadow-sm p-6">
            <!-- 富文本 General Applications -->
            <div v-if="product.generalApplications" class="prose prose-sm max-w-none text-gray-700 mb-6" v-html="product.generalApplications"></div>
            <div v-if="applicationsWater.length || applicationsIndustry.length" class="grid grid-cols-2 gap-8">
              <!-- Water Column -->
              <div v-if="applicationsWater.length">
                <h3 class="text-lg font-semibold text-gray-900 mb-4">Water</h3>
                <ul class="space-y-3">
                  <li
                    v-for="(item, idx) in applicationsWater"
                    :key="idx"
                    class="flex items-start gap-3 text-gray-700"
                  >
                    <span class="w-2 h-2 bg-blue-600 rounded-full mt-2 shrink-0"></span>
                    <span class="text-sm leading-relaxed">{{ item }}</span>
                  </li>
                </ul>
              </div>
              <!-- Industry Column -->
              <div v-if="applicationsIndustry.length">
                <h3 class="text-lg font-semibold text-gray-900 mb-4">Industry</h3>
                <ul class="space-y-3">
                  <li
                    v-for="(item, idx) in applicationsIndustry"
                    :key="idx"
                    class="flex items-start gap-3 text-gray-700"
                  >
                    <span class="w-2 h-2 bg-blue-600 rounded-full mt-2 shrink-0"></span>
                    <span class="text-sm leading-relaxed">{{ item }}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>

      <div v-else class="text-center py-20 text-gray-500">
        Product not found
      </div>
    </main>

    <PublicFooter />
  </div>
</template>

<script setup lang="ts">
const route = useRoute()

const { data } = await useFetch(`/api/products/${route.params.id}`)
const product = computed(() => data.value?.data)

// 写死的分类树
const categoryTree = [
  {
    name: 'Valve',
    children: ['Gate Valve', 'Butterfly Valve', 'Check Valve', 'Air Valve', 'Y strainer', 'Ball Valve', 'Globe Valve'],
  },
  {
    name: 'Pipe Fitting',
    children: ['Dismantling joint', 'Coupling', 'flange adaptor', 'rubber joint'],
  },
]

// 根据产品子分类名查找父分类
const parentCategory = computed(() => {
  if (!product.value?.category) return ''
  for (const parent of categoryTree) {
    if (parent.children.includes(product.value.category)) {
      return parent.name
    }
  }
  return ''
})

// Parse JSON string fields into arrays
const parseJsonArray = (text: string | null | undefined): string[] => {
  if (!text) return []
  try {
    const parsed = JSON.parse(text)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

const applicationsWater = computed(() => parseJsonArray(product.value?.applicationsWater))
const applicationsIndustry = computed(() => parseJsonArray(product.value?.applicationsIndustry))

// Progressive disclosure for long sections
const descExpanded = ref(false)
const propsExpanded = ref(false)

// Parse properties into list items (handles <p>, <div>, <li> tags or plain newlines)
const propertiesList = computed(() => {
  if (!product.value?.properties) return []
  const text = product.value.properties
  // If contains block-level HTML tags, split by closing tags then strip remaining HTML
  if (/<\/(p|div|li|h[1-6])>/i.test(text)) {
    const items = text.split(/<\/(?:p|div|li|h[1-6])>/gi)
    return items
      .map((s: string) => s.replace(/<[^>]*>/g, '').trim())
      .filter(Boolean)
  }
  // Otherwise split by newlines
  return text.split(/\n/).map(s => s.trim()).filter(Boolean)
})

// Dynamic SEO
const seoTitle = computed(() => {
  if (!product.value) return 'Product Details - PLOVER'
  const p = product.value
  return `${p.name} ${p.model} - ${p.category} - PLOVER`
})
const seoDescription = computed(() => {
  if (!product.value) return ''
  const p = product.value
  const params = [p.dn, p.pn, p.material, p.connection].filter(Boolean).join(' | ')
  return `${p.name} (${p.model}), ${params}. ${p.description?.slice(0, 80) || ''}`
})

useHead({
  title: seoTitle,
})

useSeoMeta({
  description: seoDescription,
  keywords: product.value ? `${product.value.name},${product.value.category},${product.value.model},${product.value.brand},valve,industrial valve` : 'valve,industrial valve',
  ogTitle: seoTitle,
  ogDescription: seoDescription,
  ogType: 'product',
  ogImage: product.value?.image || undefined,
})
</script>

<style scoped>
/* 富文本内容样式 */
.prose :deep(h2) { font-size: 1.25rem; font-weight: 700; margin: 1rem 0 0.5rem; color: #1f2937; }
.prose :deep(h3) { font-size: 1.1rem; font-weight: 600; margin: 0.75rem 0 0.5rem; color: #374151; }
.prose :deep(p) { margin: 0.5rem 0; }
.prose :deep(ul) { list-style: disc; padding-left: 1.5rem; margin: 0.5rem 0; }
.prose :deep(ol) { list-style: decimal; padding-left: 1.5rem; margin: 0.5rem 0; }
.prose :deep(li) { margin: 0.25rem 0; }
.prose :deep(img) { max-width: 100%; border-radius: 0.5rem; margin: 0.75rem 0; }
.prose :deep(video) { max-width: 100%; border-radius: 0.5rem; margin: 0.75rem 0; }
.prose :deep(iframe) { max-width: 100%; border-radius: 0.5rem; margin: 0.75rem 0; }
.prose :deep(table) { border-collapse: collapse; width: 100%; margin: 1rem 0; }
.prose :deep(th) { background: #f3f4f6; font-weight: 600; text-align: left; }
.prose :deep(td), .prose :deep(th) { border: 1px solid #d1d5db; padding: 0.5rem 0.75rem; }
.prose :deep(tr:hover) { background: #f9fafb; }
.prose :deep(strong) { font-weight: 600; }
.prose :deep(a) { color: #2563eb; text-decoration: underline; }
</style>
