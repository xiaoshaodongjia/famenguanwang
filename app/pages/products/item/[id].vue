<template>
  <div>
    <PublicHeader />

    <main class="max-w-7xl mx-auto px-6 lg:px-8 py-12">
      <!-- Breadcrumb -->
      <nav class="text-xs text-fog mb-6 font-mono uppercase tracking-wider">
        <NuxtLink to="/" class="hover:text-cyan transition">Home</NuxtLink>
        <span class="mx-2 text-line">/</span>
        <NuxtLink to="/products" class="hover:text-cyan transition">Products</NuxtLink>
        <span class="mx-2 text-line">/</span>
        <NuxtLink
          v-if="parentCategory"
          :to="`/products/${encodeURIComponent(parentCategory)}`"
          class="hover:text-cyan transition"
        >{{ parentCategory }}</NuxtLink>
        <span v-if="parentCategory" class="mx-2 text-line">/</span>
        <span class="text-cyan">{{ product?.name }}</span>
      </nav>

      <div v-if="product">
        <!-- Product Title -->
        <span class="mono-label">{{ product.category }}</span>
        <h1 class="text-4xl md:text-5xl font-extralight tracking-tight text-snow mt-1 mb-1">{{ product.name }}</h1>
        <p class="text-fog text-xs font-mono mb-3">{{ product.brand }} | {{ product.model }}</p>

        <!-- Category / Sub Category -->
        <div class="flex flex-wrap gap-3 mb-8 text-xs">
          <div v-if="parentCategory" class="flex items-center gap-2">
            <span class="text-fog font-mono">CATEGORY:</span>
            <span class="px-2 py-0.5 font-mono text-xs bg-surface-raised text-cyan border border-cyan-line">{{ parentCategory }}</span>
          </div>
          <div v-if="product?.category" class="flex items-center gap-2">
            <span class="text-fog font-mono">TYPE:</span>
            <span class="px-2 py-0.5 font-mono text-xs bg-cyan/10 text-cyan border border-cyan-line">{{ product.category }}</span>
          </div>
        </div>

        <!-- Technical Data Section -->
        <section class="mb-12">
          <div class="flex items-center gap-4 mb-6">
            <span class="mono-label">SPECIFICATIONS</span>
            <h2 class="text-xl font-light text-snow">Technical Data</h2>
            <div class="flex-1 h-px bg-gradient-to-r from-cyan-line to-transparent"></div>
          </div>

          <div class="grid lg:grid-cols-2 gap-8">
            <!-- Left: Technical Specs Table -->
            <div class="bg-surface border border-cyan-line p-6">
              <table class="w-full text-sm">
                <tbody>
                  <tr v-if="product.dn" class="border-b border-line">
                    <td class="py-2.5 pr-4 text-fog font-mono text-xs uppercase tracking-wider w-2/5">DN</td>
                    <td class="py-2.5 text-cyan font-mono">{{ product.dn }}</td>
                  </tr>
                  <tr v-if="product.pn" class="border-b border-line">
                    <td class="py-2.5 pr-4 text-fog font-mono text-xs uppercase tracking-wider">PN</td>
                    <td class="py-2.5 text-cyan font-mono">{{ product.pn }}</td>
                  </tr>
                  <tr v-if="product.material" class="border-b border-line">
                    <td class="py-2.5 pr-4 text-fog font-mono text-xs uppercase tracking-wider">Material</td>
                    <td class="py-2.5 text-snow font-mono">{{ product.material }}</td>
                  </tr>
                  <tr v-if="product.connection" class="border-b border-line">
                    <td class="py-2.5 pr-4 text-fog font-mono text-xs uppercase tracking-wider">Connection</td>
                    <td class="py-2.5 text-snow font-mono">{{ product.connection }}</td>
                  </tr>
                  <tr v-if="product.media" class="border-b border-line">
                    <td class="py-2.5 pr-4 text-fog font-mono text-xs uppercase tracking-wider">Media</td>
                    <td class="py-2.5 text-snow font-mono">{{ product.media }}</td>
                  </tr>
                  <tr v-if="product.temperature" class="border-b border-line">
                    <td class="py-2.5 pr-4 text-fog font-mono text-xs uppercase tracking-wider">Temperature</td>
                    <td class="py-2.5 text-snow font-mono">{{ product.temperature }}</td>
                  </tr>
                  <tr v-if="product.manufacturingRange" class="border-b border-line">
                    <td class="py-2.5 pr-4 text-fog font-mono text-xs uppercase tracking-wider">Mfg. Range</td>
                    <td class="py-2.5 text-snow font-mono">{{ product.manufacturingRange }}</td>
                  </tr>
                  <tr v-if="product.distanceBetweenFlanges" class="border-b border-line">
                    <td class="py-2.5 pr-4 text-fog font-mono text-xs uppercase tracking-wider">Flange Distance</td>
                    <td class="py-2.5 text-snow font-mono">{{ product.distanceBetweenFlanges }}</td>
                  </tr>
                  <tr v-if="product.tests" class="border-b border-line">
                    <td class="py-2.5 pr-4 text-fog font-mono text-xs uppercase tracking-wider">Tests</td>
                    <td class="py-2.5 text-snow font-mono">{{ product.tests }}</td>
                  </tr>
                  <tr v-if="product.coating">
                    <td class="py-2.5 pr-4 text-fog font-mono text-xs uppercase tracking-wider">Coating</td>
                    <td class="py-2.5 text-snow font-mono">{{ product.coating }}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Right: Image + Download Buttons -->
            <div>
              <div class="bg-surface border border-cyan-line overflow-hidden">
                <div v-if="product.image" class="aspect-[4/3] bg-surface-raised">
                  <img :src="product.image" :alt="product.name" class="w-full h-full object-contain p-4" />
                </div>
                <div v-else class="aspect-[4/3] bg-surface-raised flex items-center justify-center text-ash">
                  <svg class="w-20 h-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>

              <!-- PDF Download Buttons below image -->
              <div class="flex flex-wrap gap-2 mt-4">
                <a
                  v-if="product.manual"
                  :href="product.manual"
                  target="_blank"
                  class="inline-flex items-center gap-2 px-4 py-2 bg-cyan text-ink text-xs font-mono uppercase tracking-wider rounded hover:bg-snow transition"
                >
                  <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clip-rule="evenodd" />
                  </svg>
                  Manual
                </a>
                <a
                  v-if="product.productCatalog"
                  :href="product.productCatalog"
                  target="_blank"
                  class="inline-flex items-center gap-2 px-4 py-2 bg-cyan text-ink text-xs font-mono uppercase tracking-wider rounded hover:bg-snow transition"
                >
                  <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clip-rule="evenodd" />
                  </svg>
                  Catalog
                </a>
              </div>

              <!-- Contact CTA -->
              <div class="mt-4">
                <NuxtLink
                  to="/contact"
                  class="inline-flex items-center gap-2 px-4 py-2 border border-cyan-line text-cyan text-xs font-mono uppercase tracking-wider rounded hover:bg-cyan/10 hover:border-cyan transition"
                >
                  Contact Us
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </NuxtLink>
              </div>
            </div>
          </div>
        </section>

        <!-- Product Description Section -->
        <section v-if="product.description" class="mb-12">
          <button class="flex items-center gap-3 group w-full text-left" @click="descExpanded = !descExpanded">
            <span class="mono-label">DESCRIPTION</span>
            <h2 class="text-xl font-light text-snow">Product Description</h2>
            <div class="flex-1 h-px bg-gradient-to-r from-cyan-line to-transparent"></div>
            <svg class="w-4 h-4 text-cyan transition-transform duration-300" :class="descExpanded ? 'rotate-180' : ''" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <div v-show="descExpanded" class="bg-surface border border-cyan-line p-6 mt-4">
            <div class="prose-dark max-w-none text-sm leading-relaxed" v-html="product.description"></div>
          </div>
        </section>

        <!-- Properties Section -->
        <section v-if="product.properties" class="mb-12">
          <button class="flex items-center gap-3 group w-full text-left" @click="propsExpanded = !propsExpanded">
            <span class="mono-label">PROPERTIES</span>
            <h2 class="text-xl font-light text-snow">Properties</h2>
            <div class="flex-1 h-px bg-gradient-to-r from-cyan-line to-transparent"></div>
            <svg class="w-4 h-4 text-cyan transition-transform duration-300" :class="propsExpanded ? 'rotate-180' : ''" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <div v-show="propsExpanded" class="bg-surface border border-cyan-line p-6 mt-4">
            <div class="prose-dark prose-sm max-w-none" v-html="product.properties"></div>
          </div>
        </section>

        <!-- General Applications Section -->
        <section v-if="product.generalApplications || applicationsWater.length || applicationsIndustry.length" class="mb-12">
          <div class="flex items-center gap-4 mb-6">
            <span class="mono-label">APPLICATIONS</span>
            <h2 class="text-xl font-light text-snow">General Applications</h2>
            <div class="flex-1 h-px bg-gradient-to-r from-cyan-line to-transparent"></div>
          </div>
          <div class="bg-surface border border-cyan-line p-6">
            <!-- 富文本 General Applications -->
            <div v-if="product.generalApplications" class="prose-dark prose-sm max-w-none mb-6" v-html="product.generalApplications"></div>
            <div v-if="applicationsWater.length || applicationsIndustry.length" class="grid grid-cols-2 gap-8">
              <!-- Water Column -->
              <div v-if="applicationsWater.length">
                <h3 class="text-sm font-mono uppercase tracking-wider text-cyan mb-3">Water</h3>
                <ul class="space-y-2">
                  <li
                    v-for="(item, idx) in applicationsWater"
                    :key="idx"
                    class="flex items-start gap-2 text-mist text-sm"
                  >
                    <span class="w-1 h-1 bg-cyan mt-2 shrink-0"></span>
                    <span class="leading-relaxed font-mono text-xs">{{ item }}</span>
                  </li>
                </ul>
              </div>
              <!-- Industry Column -->
              <div v-if="applicationsIndustry.length">
                <h3 class="text-sm font-mono uppercase tracking-wider text-cyan mb-3">Industry</h3>
                <ul class="space-y-2">
                  <li
                    v-for="(item, idx) in applicationsIndustry"
                    :key="idx"
                    class="flex items-start gap-2 text-mist text-sm"
                  >
                    <span class="w-1 h-1 bg-cyan mt-2 shrink-0"></span>
                    <span class="leading-relaxed font-mono text-xs">{{ item }}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>

      <div v-else class="text-center py-20 text-fog font-mono text-sm">
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
