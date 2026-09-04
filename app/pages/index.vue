<template>
  <div>
    <PublicHeader />

    <!-- Hero Carousel -->
    <HeroCarousel :slides="heroSlides" />

    <!-- Trust Bar -->
    <section class="bg-white border-y border-gray-100">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <p class="text-2xl md:text-3xl font-bold text-[#e8590c]">15+</p>
            <p class="text-xs md:text-sm text-gray-500 mt-1">Years of Experience</p>
          </div>
          <div>
            <p class="text-2xl md:text-3xl font-bold text-[#e8590c]">50+</p>
            <p class="text-xs md:text-sm text-gray-500 mt-1">Countries Served</p>
          </div>
          <div>
            <p class="text-2xl md:text-3xl font-bold text-[#e8590c]">API / CE / ISO</p>
            <p class="text-xs md:text-sm text-gray-500 mt-1">Certified Quality</p>
          </div>
          <div>
            <p class="text-2xl md:text-3xl font-bold text-[#e8590c]">24h</p>
            <p class="text-xs md:text-sm text-gray-500 mt-1">Response Time</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Product Categories -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 class="text-2xl font-bold text-gray-900 mb-6">Product Categories</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <NuxtLink
          to="/products/Valve"
          class="bg-white rounded-lg shadow-sm p-8 hover:shadow-md transition group"
        >
          <h3 class="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition">Valve</h3>
          <p class="mt-2 text-gray-500 text-sm">Gate Valve, Butterfly Valve, Check Valve, Y strainer, Air Valve, Ball Valve, Globe Valve</p>
        </NuxtLink>
        <NuxtLink
          to="/products/Pipe%20Fitting"
          class="bg-white rounded-lg shadow-sm p-8 hover:shadow-md transition group"
        >
          <h3 class="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition">Pipe Fitting</h3>
          <p class="mt-2 text-gray-500 text-sm">Dismantling joint, Coupling, Flange adaptor, Rubber joint</p>
        </NuxtLink>
      </div>
    </section>

    <!-- Featured Products -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-2xl font-bold text-gray-900">Featured Products</h2>
        <NuxtLink to="/products" class="text-blue-600 hover:text-blue-700 text-sm font-medium">
          View all →
        </NuxtLink>
      </div>
      <ProductGrid :products="featuredProducts" />
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
