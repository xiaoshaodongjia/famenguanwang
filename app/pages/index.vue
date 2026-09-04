<template>
  <div>
    <PublicHeader />

    <!-- Hero Carousel -->
    <HeroCarousel :slides="heroSlides" />

    <!-- Spec Bar -->
    <section class="bg-surface border-y border-line">
      <div class="max-w-7xl mx-auto px-6 lg:px-8 py-8">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <p class="text-2xl md:text-3xl font-light text-cyan font-mono">15+</p>
            <p class="text-xs text-fog mt-1 font-mono uppercase tracking-wider">Years</p>
          </div>
          <div>
            <p class="text-2xl md:text-3xl font-light text-cyan font-mono">50+</p>
            <p class="text-xs text-fog mt-1 font-mono uppercase tracking-wider">Countries</p>
          </div>
          <div>
            <p class="text-xl md:text-2xl font-light text-cyan font-mono">API · CE · ISO</p>
            <p class="text-xs text-fog mt-1 font-mono uppercase tracking-wider">Certified</p>
          </div>
          <div>
            <p class="text-2xl md:text-3xl font-light text-cyan font-mono">24H</p>
            <p class="text-xs text-fog mt-1 font-mono uppercase tracking-wider">Response</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Product Categories -->
    <section class="max-w-7xl mx-auto px-6 lg:px-8 py-16">
      <div class="mb-10">
        <span class="mono-label">PRODUCT LINE</span>
        <h2 class="text-3xl md:text-4xl font-extralight tracking-tight text-snow mt-1">Product Categories</h2>
        <div class="cyan-divider mt-4"></div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <NuxtLink
          to="/products/Valve"
          class="bg-surface border border-cyan-line p-8 group transition-all duration-300 hover:border-[rgba(0,212,255,0.4)] hover:shadow-[0_0_16px_rgba(0,212,255,0.1)]"
        >
          <h3 class="text-lg font-light text-snow group-hover:text-cyan transition-colors">Valve</h3>
          <p class="mt-2 text-fog text-sm leading-relaxed">Gate Valve, Butterfly Valve, Check Valve, Y strainer, Air Valve, Ball Valve, Globe Valve</p>
          <div class="mt-4 text-xs text-cyan font-mono uppercase tracking-wider group-hover:translate-x-1 transition-transform">
            BROWSE →
          </div>
        </NuxtLink>
        <NuxtLink
          to="/products/Pipe%20Fitting"
          class="bg-surface border border-cyan-line p-8 group transition-all duration-300 hover:border-[rgba(0,212,255,0.4)] hover:shadow-[0_0_16px_rgba(0,212,255,0.1)]"
        >
          <h3 class="text-lg font-light text-snow group-hover:text-cyan transition-colors">Pipe Fitting</h3>
          <p class="mt-2 text-fog text-sm leading-relaxed">Dismantling joint, Coupling, Flange adaptor, Rubber joint</p>
          <div class="mt-4 text-xs text-cyan font-mono uppercase tracking-wider group-hover:translate-x-1 transition-transform">
            BROWSE →
          </div>
        </NuxtLink>
      </div>
    </section>

    <!-- Featured Products -->
    <section class="max-w-7xl mx-auto px-6 lg:px-8 pb-16">
      <div class="flex items-end justify-between mb-8">
        <div>
          <span class="mono-label">FEATURED</span>
          <h2 class="text-3xl md:text-4xl font-extralight tracking-tight text-snow mt-1">Featured Products</h2>
          <div class="cyan-divider mt-4"></div>
        </div>
        <NuxtLink to="/products" class="text-cyan hover:text-snow text-xs font-mono uppercase tracking-wider transition">
          View all →
        </NuxtLink>
      </div>
      <ProductGrid :products="featuredProducts" />
    </section>

    <!-- CTA Banner -->
    <section class="bg-ink border-y border-line">
      <div class="max-w-7xl mx-auto px-6 lg:px-8 py-14 text-center">
        <span class="mono-label">CUSTOM SOLUTIONS</span>
        <h2 class="text-2xl md:text-3xl font-extralight text-snow mt-2">Need a custom specification?</h2>
        <p class="mt-2 text-mist text-sm max-w-lg mx-auto font-mono">Our engineering team designs and manufactures valves to your exact parameters.</p>
        <NuxtLink
          to="/contact"
          class="inline-block mt-6 px-8 py-3 bg-cyan text-ink text-xs font-mono uppercase tracking-wider rounded hover:bg-snow transition"
        >
          Contact Engineering
        </NuxtLink>
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

// 获取轮播图数据
const { data: slidesData } = await useFetch('/api/slides')
const heroSlides = computed(() => slidesData.value?.data || [])

const { data } = await useFetch('/api/products', {
  query: { limit: '4' }
})

const featuredProducts = computed(() => data.value?.data || [])
</script>
