<template>
  <div>
    <PublicHeader />

    <main class="max-w-7xl mx-auto px-6 lg:px-8 py-12">
      <!-- Breadcrumb -->
      <nav class="text-sm text-fog mb-8 font-mono">
        <NuxtLink to="/" class="hover:text-gold transition">Home</NuxtLink>
        <span class="mx-2 text-gold/30">/</span>
        <NuxtLink to="/products" class="hover:text-gold transition">Products</NuxtLink>
        <span class="mx-2 text-gold/30">/</span>
        <NuxtLink
          v-if="parentCategory"
          :to="`/products/${encodeURIComponent(parentCategory)}`"
          class="hover:text-gold transition"
        >{{ parentCategory }}</NuxtLink>
        <span v-if="parentCategory" class="mx-2 text-gold/30">/</span>
        <span class="text-gold">{{ product?.name }}</span>
      </nav>

      <div v-if="product">
        <!-- Product Title -->
        <h1 class="text-4xl md:text-5xl font-extralight tracking-tight text-snow mb-2">{{ product.name }}</h1>
        <p class="text-fog text-sm font-mono mb-4">{{ product.brand }} | {{ product.model }}</p>

        <!-- Category / Sub Category -->
        <div class="flex flex-wrap gap-4 mb-10 text-sm">
          <div v-if="parentCategory" class="flex items-center gap-2">
            <span class="text-fog">Category:</span>
            <span class="px-3 py-1 rounded-md font-mono text-sm bg-surface-raised text-gold border border-gold/10">{{ parentCategory }}</span>
          </div>
          <div v-if="product?.category" class="flex items-center gap-2">
            <span class="text-fog">Sub Category:</span>
            <span class="px-3 py-1 rounded-md font-mono text-sm bg-gold/10 text-gold border border-gold/20">{{ product.category }}</span>
          </div>
        </div>

        <!-- Technical Data Section -->
        <section class="mb-14">
          <div class="flex items-center gap-4 mb-8">
            <h2 class="text-2xl font-light text-snow">Technical Data</h2>
            <div class="flex-1 h-px bg-gradient-to-r from-gold/30 to-transparent"></div>
          </div>

          <div class="grid lg:grid-cols-2 gap-10">
            <!-- Left: Technical Specs -->
            <div class="bg-surface rounded-lg border border-gold p-8">
              <dl class="space-y-0 text-sm divide-y divide-gold/5">
                <div v-if="product.manufacturingRange" class="flex py-4">
                  <dt class="font-medium text-mist w-2/5 shrink-0">Manufacturing range</dt>
                  <dd class="text-snow font-mono">{{ product.manufacturingRange }}</dd>
                </div>
                <div v-if="product.distanceBetweenFlanges" class="flex py-4">
                  <dt class="font-medium text-mist w-2/5 shrink-0">Distance between flanges</dt>
                  <dd class="text-snow font-mono">{{ product.distanceBetweenFlanges }}</dd>
                </div>
                <div v-if="product.installationBetweenFlanges" class="flex py-4">
                  <dt class="font-medium text-mist w-2/5 shrink-0">Installation between flanges</dt>
                  <dd class="text-snow font-mono">{{ product.installationBetweenFlanges }}</dd>
                </div>
                <div v-if="product.flanged" class="flex py-4">
                  <dt class="font-medium text-mist w-2/5 shrink-0">Flanged</dt>
                  <dd class="text-snow font-mono">{{ product.flanged }}</dd>
                </div>
                <div v-if="product.upperFlangeConnection" class="flex py-4">
                  <dt class="font-medium text-mist w-2/5 shrink-0">Upper flange connection</dt>
                  <dd class="text-snow font-mono">{{ product.upperFlangeConnection }}</dd>
                </div>
                <div v-if="product.tests" class="flex py-4">
                  <dt class="font-medium text-mist w-2/5 shrink-0">Tests</dt>
                  <dd class="text-snow font-mono">{{ product.tests }}</dd>
                </div>
                <div v-if="product.coating" class="flex py-4">
                  <dt class="font-medium text-mist w-2/5 shrink-0">Coating</dt>
                  <dd class="text-snow font-mono">{{ product.coating }}</dd>
                </div>
                <div v-if="product.workingPressure" class="flex py-4">
                  <dt class="font-medium text-mist w-2/5 shrink-0">Working pressure</dt>
                  <dd class="text-snow font-mono">{{ product.workingPressure }}</dd>
                </div>
              </dl>
            </div>

            <!-- Right: Image + Download Buttons -->
            <div>
              <div class="bg-surface rounded-lg border border-gold overflow-hidden">
                <div v-if="product.image" class="aspect-[4/3] bg-surface-raised">
                  <img :src="product.image" :alt="product.name" class="w-full h-full object-contain p-6" />
                </div>
                <div v-else class="aspect-[4/3] bg-surface-raised flex items-center justify-center text-ash">
                  <svg class="w-24 h-24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>

              <!-- PDF Download Buttons below image -->
              <div class="flex flex-wrap gap-3 mt-6">
                <a
                  v-if="product.manual"
                  :href="product.manual"
                  target="_blank"
                  class="inline-flex items-center gap-2 px-5 py-2.5 bg-gold text-void text-sm font-medium rounded-md hover:bg-gold-light transition"
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
                  class="inline-flex items-center gap-2 px-5 py-2.5 bg-gold text-void text-sm font-medium rounded-md hover:bg-gold-light transition"
                >
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clip-rule="evenodd" />
                  </svg>
                  Product Catalog
                </a>
              </div>

              <!-- Contact CTA -->
              <div class="mt-6">
                <NuxtLink
                  to="/contact"
                  class="inline-flex items-center gap-2 px-5 py-2.5 border border-gold/30 text-gold text-sm font-medium rounded-md hover:bg-gold/10 hover:border-gold/50 transition"
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
        <section v-if="product.description" class="mb-14">
          <button class="flex items-center gap-3 group w-full text-left" @click="descExpanded = !descExpanded">
            <h2 class="text-2xl font-light text-snow">Product Description</h2>
            <div class="flex-1 h-px bg-gradient-to-r from-gold/30 to-transparent"></div>
            <svg class="w-5 h-5 text-gold transition-transform duration-300" :class="descExpanded ? 'rotate-180' : ''" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <div v-show="descExpanded" class="bg-surface rounded-lg border border-gold p-8 mt-6">
            <div class="prose-dark max-w-none text-sm leading-relaxed" v-html="product.description"></div>
          </div>
        </section>

        <!-- Properties Section -->
        <section v-if="product.properties" class="mb-14">
          <button class="flex items-center gap-3 group w-full text-left" @click="propsExpanded = !propsExpanded">
            <h2 class="text-2xl font-light text-snow">Properties</h2>
            <div class="flex-1 h-px bg-gradient-to-r from-gold/30 to-transparent"></div>
            <svg class="w-5 h-5 text-gold transition-transform duration-300" :class="propsExpanded ? 'rotate-180' : ''" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <div v-show="propsExpanded" class="bg-surface rounded-lg border border-gold p-8 mt-6">
            <div class="prose-dark prose-sm max-w-none" v-html="product.properties"></div>
          </div>
        </section>

        <!-- General Applications Section -->
        <section v-if="product.generalApplications || applicationsWater.length || applicationsIndustry.length" class="mb-14">
          <div class="flex items-center gap-4 mb-8">
            <h2 class="text-2xl font-light text-snow">General Applications</h2>
            <div class="flex-1 h-px bg-gradient-to-r from-gold/30 to-transparent"></div>
          </div>
          <div class="bg-surface rounded-lg border border-gold p-8">
            <!-- 富文本 General Applications -->
            <div v-if="product.generalApplications" class="prose-dark prose-sm max-w-none mb-8" v-html="product.generalApplications"></div>
            <div v-if="applicationsWater.length || applicationsIndustry.length" class="grid grid-cols-2 gap-10">
              <!-- Water Column -->
              <div v-if="applicationsWater.length">
                <h3 class="text-lg font-light text-snow mb-4">Water</h3>
                <ul class="space-y-3">
                  <li
                    v-for="(item, idx) in applicationsWater"
                    :key="idx"
                    class="flex items-start gap-3 text-mist"
                  >
                    <span class="w-1.5 h-1.5 bg-gold rounded-full mt-2 shrink-0"></span>
                    <span class="text-sm leading-relaxed">{{ item }}</span>
                  </li>
                </ul>
              </div>
              <!-- Industry Column -->
              <div v-if="applicationsIndustry.length">
                <h3 class="text-lg font-light text-snow mb-4">Industry</h3>
                <ul class="space-y-3">
                  <li
                    v-for="(item, idx) in applicationsIndustry"
                    :key="idx"
                    class="flex items-start gap-3 text-mist"
                  >
                    <span class="w-1.5 h-1.5 bg-gold rounded-full mt-2 shrink-0"></span>
                    <span class="text-sm leading-relaxed">{{ item }}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>

      <div v-else class="text-center py-20 text-fog">
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
