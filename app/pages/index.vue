<template>
  <div>
    <PublicHeader />

    <!-- Hero Carousel -->
    <HeroCarousel :slides="heroSlides" />

    <!-- Trust Bar -->
    <section class="bg-surface border-y border-line-subtle">
      <div class="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <p class="text-2xl md:text-3xl font-extralight text-ink">15+</p>
            <p class="text-xs md:text-sm text-ink-tertiary mt-1 tracking-wide">Years of Experience</p>
          </div>
          <div>
            <p class="text-2xl md:text-3xl font-extralight text-ink">50+</p>
            <p class="text-xs md:text-sm text-ink-tertiary mt-1 tracking-wide">Countries Served</p>
          </div>
          <div>
            <p class="text-2xl md:text-3xl font-extralight text-ink font-mono">API / CE / ISO</p>
            <p class="text-xs md:text-sm text-ink-tertiary mt-1 tracking-wide">Certified Quality</p>
          </div>
          <div>
            <p class="text-2xl md:text-3xl font-extralight text-ink font-mono">24h</p>
            <p class="text-xs md:text-sm text-ink-tertiary mt-1 tracking-wide">Response Time</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Product Categories -->
    <section class="max-w-7xl mx-auto px-6 lg:px-8 py-20">
      <div class="mb-12">
        <h2 class="text-3xl md:text-4xl font-extralight tracking-tight text-ink">Product Categories</h2>
        <div class="thin-divider mt-4"></div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <NuxtLink to="/products/Valve" class="bg-surface rounded-lg p-10 shadow-hover group">
          <h3 class="text-xl font-light text-ink group-hover:text-accent transition-colors">Valve</h3>
          <p class="mt-3 text-ink-tertiary text-sm leading-relaxed">Gate Valve, Butterfly Valve, Check Valve, Y strainer, Air Valve, Ball Valve, Globe Valve</p>
          <div class="mt-6 text-sm text-accent font-medium group-hover:translate-x-1 transition-transform">Browse →</div>
        </NuxtLink>
        <NuxtLink to="/products/Pipe%20Fitting" class="bg-surface rounded-lg p-10 shadow-hover group">
          <h3 class="text-xl font-light text-ink group-hover:text-accent transition-colors">Pipe Fitting</h3>
          <p class="mt-3 text-ink-tertiary text-sm leading-relaxed">Dismantling joint, Coupling, Flange adaptor, Rubber joint</p>
          <div class="mt-6 text-sm text-accent font-medium group-hover:translate-x-1 transition-transform">Browse →</div>
        </NuxtLink>
      </div>
    </section>

    <!-- Featured Products -->
    <section class="max-w-7xl mx-auto px-6 lg:px-8 pb-20">
      <div class="flex items-center justify-between mb-12">
        <div>
          <h2 class="text-3xl md:text-4xl font-extralight tracking-tight text-ink">Featured Products</h2>
          <div class="thin-divider mt-4"></div>
        </div>
        <NuxtLink to="/products" class="text-accent hover:text-accent-dark text-sm font-medium transition">View all →</NuxtLink>
      </div>
      <ProductGrid :products="featuredProducts" />
    </section>

    <!-- CTA Banner -->
    <section class="bg-surface border-y border-line-subtle">
      <div class="max-w-7xl mx-auto px-6 lg:px-8 py-16 text-center">
        <h2 class="text-2xl md:text-3xl font-extralight text-ink">Need a custom solution?</h2>
        <p class="mt-3 text-ink-secondary text-sm max-w-xl mx-auto">Our engineering team can design and manufacture valves to your exact specifications.</p>
        <NuxtLink to="/contact" class="inline-block mt-8 px-8 py-3.5 bg-ink text-surface font-medium rounded-md hover:bg-ink/90 transition">Contact Our Engineers</NuxtLink>
      </div>
    </section>

    <PublicFooter />
  </div>
</template>

<script setup lang="ts">
import HeroCarousel from '~/components/HeroCarousel.vue'

useSeoMeta({
  title: 'PLOVER - Industrial Valves & Pipe Fittings',
  description: 'PLOVER INDUSTRIAL CO.,LTD - Professional manufacturer of industrial valves and pipe fittings including Gate Valve, Butterfly Valve, Check Valve, Ball Valve and more.',
  keywords: 'valve,gate valve,butterfly valve,check valve,ball valve,globe valve,pipe fitting,industrial valve',
  ogTitle: 'PLOVER - Industrial Valves & Pipe Fittings',
  ogDescription: 'Professional manufacturer of industrial valves and pipe fittings',
  ogType: 'website',
})

const { data: slidesData } = await useFetch('/api/slides')
const heroSlides = computed(() => slidesData.value?.data || [])

const { data } = await useFetch('/api/products', { query: { limit: '4' } })
const featuredProducts = computed(() => data.value?.data || [])
</script>
