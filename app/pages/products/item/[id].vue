<template>
  <div>
    <PublicHeader />

    <main class="max-w-7xl mx-auto px-6 lg:px-8 py-12">
      <!-- Breadcrumb -->
      <nav class="text-sm text-ink-tertiary mb-8 font-mono">
        <NuxtLink to="/" class="hover:text-accent transition">Home</NuxtLink>
        <span class="mx-2 text-line">/</span>
        <NuxtLink to="/products" class="hover:text-accent transition">Products</NuxtLink>
        <span class="mx-2 text-line">/</span>
        <NuxtLink v-if="parentCategory" :to="`/products/${encodeURIComponent(parentCategory)}`" class="hover:text-accent transition">{{ parentCategory }}</NuxtLink>
        <span v-if="parentCategory" class="mx-2 text-line">/</span>
        <span class="text-accent">{{ product?.name }}</span>
      </nav>

      <div v-if="product">
        <!-- Product Title -->
        <h1 class="text-4xl md:text-5xl font-extralight tracking-tight text-ink mb-2">{{ product.name }}</h1>
        <p class="text-ink-tertiary text-sm font-mono mb-4">{{ product.brand }} | {{ product.model }}</p>

        <!-- Category / Sub Category -->
        <div class="flex flex-wrap gap-4 mb-10 text-sm">
          <div v-if="parentCategory" class="flex items-center gap-2">
            <span class="text-ink-tertiary">Category:</span>
            <span class="px-3 py-1 rounded-md font-mono text-sm bg-canvas text-ink border border-line-subtle">{{ parentCategory }}</span>
          </div>
          <div v-if="product?.category" class="flex items-center gap-2">
            <span class="text-ink-tertiary">Sub Category:</span>
            <span class="px-3 py-1 rounded-md font-mono text-sm bg-accent-subtle text-accent border border-accent/20">{{ product.category }}</span>
          </div>
        </div>

        <!-- Technical Data Section -->
        <section class="mb-14">
          <div class="flex items-center gap-4 mb-8">
            <h2 class="text-2xl font-light text-ink">Technical Data</h2>
            <div class="flex-1 h-px bg-line"></div>
          </div>

          <div class="grid lg:grid-cols-2 gap-10">
            <!-- Left: Technical Specs -->
            <div class="bg-surface rounded-lg p-8">
              <dl class="space-y-0 text-sm divide-y divide-line-subtle">
                <div v-if="product.manufacturingRange" class="flex py-4">
                  <dt class="font-medium text-ink-secondary w-2/5 shrink-0">Manufacturing range</dt>
                  <dd class="text-ink font-mono">{{ product.manufacturingRange }}</dd>
                </div>
                <div v-if="product.distanceBetweenFlanges" class="flex py-4">
                  <dt class="font-medium text-ink-secondary w-2/5 shrink-0">Distance between flanges</dt>
                  <dd class="text-ink font-mono">{{ product.distanceBetweenFlanges }}</dd>
                </div>
                <div v-if="product.installationBetweenFlanges" class="flex py-4">
                  <dt class="font-medium text-ink-secondary w-2/5 shrink-0">Installation between flanges</dt>
                  <dd class="text-ink font-mono">{{ product.installationBetweenFlanges }}</dd>
                </div>
                <div v-if="product.flanged" class="flex py-4">
                  <dt class="font-medium text-ink-secondary w-2/5 shrink-0">Flanged</dt>
                  <dd class="text-ink font-mono">{{ product.flanged }}</dd>
                </div>
                <div v-if="product.upperFlangeConnection" class="flex py-4">
                  <dt class="font-medium text-ink-secondary w-2/5 shrink-0">Upper flange connection</dt>
                  <dd class="text-ink font-mono">{{ product.upperFlangeConnection }}</dd>
                </div>
                <div v-if="product.tests" class="flex py-4">
                  <dt class="font-medium text-ink-secondary w-2/5 shrink-0">Tests</dt>
                  <dd class="text-ink font-mono">{{ product.tests }}</dd>
                </div>
                <div v-if="product.coating" class="flex py-4">
                  <dt class="font-medium text-ink-secondary w-2/5 shrink-0">Coating</dt>
                  <dd class="text-ink font-mono">{{ product.coating }}</dd>
                </div>
                <div v-if="product.workingPressure" class="flex py-4">
                  <dt class="font-medium text-ink-secondary w-2/5 shrink-0">Working pressure</dt>
                  <dd class="text-ink font-mono">{{ product.workingPressure }}</dd>
                </div>
              </dl>
            </div>

            <!-- Right: Image + Download Buttons -->
            <div>
              <div class="bg-surface rounded-lg overflow-hidden">
                <div v-if="product.image" class="aspect-[4/3] bg-canvas">
                  <img :src="product.image" :alt="product.name" class="w-full h-full object-contain p-6" />
                </div>
                <div v-else class="aspect-[4/3] bg-canvas flex items-center justify-center text-ink-tertiary">
                  <svg class="w-24 h-24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>

              <div class="flex flex-wrap gap-3 mt-6">
                <a v-if="product.manual" :href="product.manual" target="_blank" class="inline-flex items-center gap-2 px-5 py-2.5 bg-ink text-surface text-sm font-medium rounded-md hover:bg-ink/90 transition">
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clip-rule="evenodd" /></svg>
                  Manual
                </a>
                <a v-if="product.productCatalog" :href="product.productCatalog" target="_blank" class="inline-flex items-center gap-2 px-5 py-2.5 bg-ink text-surface text-sm font-medium rounded-md hover:bg-ink/90 transition">
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clip-rule="evenodd" /></svg>
                  Product Catalog
                </a>
              </div>

              <div class="mt-6">
                <NuxtLink to="/contact" class="inline-flex items-center gap-2 px-5 py-2.5 border border-ink/20 text-ink text-sm font-medium rounded-md hover:bg-canvas transition">
                  Contact Us
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </NuxtLink>
              </div>
            </div>
          </div>
        </section>

        <!-- Product Description Section -->
        <section v-if="product.description" class="mb-14">
          <button class="flex items-center gap-3 group w-full text-left" @click="descExpanded = !descExpanded">
            <h2 class="text-2xl font-light text-ink">Product Description</h2>
            <div class="flex-1 h-px bg-line"></div>
            <svg class="w-5 h-5 text-ink-tertiary transition-transform duration-300" :class="descExpanded ? 'rotate-180' : ''" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg>
          </button>
          <div v-show="descExpanded" class="bg-surface rounded-lg p-8 mt-6">
            <div class="prose-clean max-w-none text-sm leading-relaxed" v-html="product.description"></div>
          </div>
        </section>

        <!-- Properties Section -->
        <section v-if="product.properties" class="mb-14">
          <button class="flex items-center gap-3 group w-full text-left" @click="propsExpanded = !propsExpanded">
            <h2 class="text-2xl font-light text-ink">Properties</h2>
            <div class="flex-1 h-px bg-line"></div>
            <svg class="w-5 h-5 text-ink-tertiary transition-transform duration-300" :class="propsExpanded ? 'rotate-180' : ''" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg>
          </button>
          <div v-show="propsExpanded" class="bg-surface rounded-lg p-8 mt-6">
            <div class="prose-clean prose-sm max-w-none" v-html="product.properties"></div>
          </div>
        </section>

        <!-- General Applications Section -->
        <section v-if="product.generalApplications || applicationsWater.length || applicationsIndustry.length" class="mb-14">
          <div class="flex items-center gap-4 mb-8">
            <h2 class="text-2xl font-light text-ink">General Applications</h2>
            <div class="flex-1 h-px bg-line"></div>
          </div>
          <div class="bg-surface rounded-lg p-8">
            <div v-if="product.generalApplications" class="prose-clean prose-sm max-w-none mb-8" v-html="product.generalApplications"></div>
            <div v-if="applicationsWater.length || applicationsIndustry.length" class="grid grid-cols-2 gap-10">
              <div v-if="applicationsWater.length">
                <h3 class="text-lg font-light text-ink mb-4">Water</h3>
                <ul class="space-y-3">
                  <li v-for="(item, idx) in applicationsWater" :key="idx" class="flex items-start gap-3 text-ink-secondary">
                    <span class="w-1.5 h-1.5 bg-accent rounded-full mt-2 shrink-0"></span>
                    <span class="text-sm leading-relaxed">{{ item }}</span>
                  </li>
                </ul>
              </div>
              <div v-if="applicationsIndustry.length">
                <h3 class="text-lg font-light text-ink mb-4">Industry</h3>
                <ul class="space-y-3">
                  <li v-for="(item, idx) in applicationsIndustry" :key="idx" class="flex items-start gap-3 text-ink-secondary">
                    <span class="w-1.5 h-1.5 bg-accent rounded-full mt-2 shrink-0"></span>
                    <span class="text-sm leading-relaxed">{{ item }}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>

      <div v-else class="text-center py-20 text-ink-tertiary">Product not found</div>
    </main>

    <PublicFooter />
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const { data } = await useFetch(`/api/products/${route.params.id}`)
const product = computed(() => data.value?.data)

const categoryTree = [
  { name: 'Valve', children: ['Gate Valve', 'Butterfly Valve', 'Check Valve', 'Air Valve', 'Y strainer', 'Ball Valve', 'Globe Valve'] },
  { name: 'Pipe Fitting', children: ['Dismantling joint', 'Coupling', 'flange adaptor', 'rubber joint'] },
]

const parentCategory = computed(() => {
  if (!product.value?.category) return ''
  for (const parent of categoryTree) { if (parent.children.includes(product.value.category)) return parent.name }
  return ''
})

const parseJsonArray = (text: string | null | undefined): string[] => {
  if (!text) return []
  try { const parsed = JSON.parse(text); return Array.isArray(parsed) ? parsed : [] } catch { return [] }
}

const applicationsWater = computed(() => parseJsonArray(product.value?.applicationsWater))
const applicationsIndustry = computed(() => parseJsonArray(product.value?.applicationsIndustry))
const descExpanded = ref(false)
const propsExpanded = ref(false)

const propertiesList = computed(() => {
  if (!product.value?.properties) return []
  const text = product.value.properties
  if (/<\/(p|div|li|h[1-6])>/i.test(text)) {
    const items = text.split(/<\/(?:p|div|li|h[1-6])>/gi)
    return items.map((s: string) => s.replace(/<[^>]*>/g, '').trim()).filter(Boolean)
  }
  return text.split(/\n/).map(s => s.trim()).filter(Boolean)
})

const seoTitle = computed(() => { if (!product.value) return 'Product Details - PLOVER'; const p = product.value; return `${p.name} ${p.model} - ${p.category} - PLOVER` })
const seoDescription = computed(() => { if (!product.value) return ''; const p = product.value; const params = [p.dn, p.pn, p.material, p.connection].filter(Boolean).join(' | '); return `${p.name} (${p.model}), ${params}. ${p.description?.slice(0, 80) || ''}` })

useHead({ title: seoTitle })
useSeoMeta({
  description: seoDescription,
  keywords: product.value ? `${product.value.name},${product.value.category},${product.value.model},${product.value.brand},valve,industrial valve` : 'valve,industrial valve',
  ogTitle: seoTitle, ogDescription: seoDescription, ogType: 'product', ogImage: product.value?.image || undefined,
})
</script>
