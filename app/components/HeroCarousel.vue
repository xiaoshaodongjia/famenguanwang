<template>
  <section class="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white overflow-hidden">
    <!-- 轮播图 -->
    <div class="relative h-[400px] md:h-[500px]">
      <transition name="fade" mode="out-in">
        <div
          v-if="slides.length"
          :key="currentIndex"
          class="absolute inset-0"
        >
          <!-- 背景图片 -->
          <img
            :src="slides[currentIndex].image"
            :alt="slides[currentIndex].title"
            class="w-full h-full object-cover"
          />
          <!-- 遮罩层 -->
          <div class="absolute inset-0 bg-gradient-to-r from-blue-900/70 to-blue-800/40"></div>
          <!-- 文字内容 -->
          <div class="absolute inset-0 flex items-center">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <div class="max-w-2xl">
                <h1 class="text-3xl md:text-5xl font-bold leading-tight animate-fade-in">
                  {{ slides[currentIndex].title }}
                </h1>
                <p v-if="slides[currentIndex].subtitle" class="mt-4 text-lg text-white/90 animate-fade-in-delay">
                  {{ slides[currentIndex].subtitle }}
                </p>
                <a
                  v-if="slides[currentIndex].link"
                  :href="slides[currentIndex].link"
                  class="inline-block mt-8 px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition animate-fade-in-delay-2"
                >
                  {{ slides[currentIndex].buttonText || 'Learn More' }}
                </a>
              </div>
            </div>
          </div>
        </div>
      </transition>

      <!-- 无轮播图时的默认内容 -->
      <div v-if="!slides.length" class="absolute inset-0 flex items-center">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div class="max-w-2xl">
            <h1 class="text-3xl md:text-5xl font-bold leading-tight">
              Industrial Valves & Pipe Fittings
            </h1>
            <p class="mt-4 text-lg text-blue-100">
              PLOVER INDUSTRIAL CO.,LTD - Professional manufacturer with years of experience in valve technology, providing exceptional products for various industries.
            </p>
            <NuxtLink
              to="/products"
              class="inline-block mt-8 px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition"
            >
              Browse Products
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>

    <!-- 左右切换按钮 -->
    <button
      v-if="slides.length > 1"
      aria-label="Previous slide"
      class="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-sm transition"
      @click="prev"
    >
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
      </svg>
    </button>
    <button
      v-if="slides.length > 1"
      aria-label="Next slide"
      class="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-sm transition"
      @click="next"
    >
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
      </svg>
    </button>

    <!-- 暂停/播放 + 指示点 -->
    <div v-if="slides.length > 1" class="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4">
      <button
        :aria-label="isPaused ? 'Play slideshow' : 'Pause slideshow'"
        class="w-9 h-9 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-sm transition"
        @click="togglePause"
      >
        <svg v-if="isPaused" class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M8 5v14l11-7z" />
        </svg>
        <svg v-else class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M6 4h4v16H6zM14 4h4v16h-4z" />
        </svg>
      </button>
      <div class="flex gap-2">
        <button
          v-for="(_, idx) in slides"
          :key="idx"
          :aria-label="`Go to slide ${idx + 1}`"
          :aria-current="idx === currentIndex"
          :class="[
            'h-2.5 rounded-full transition-all duration-300',
            idx === currentIndex ? 'bg-white w-8' : 'bg-white/50 hover:bg-white/70 w-2.5'
          ]"
          @click="goTo(idx)"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface Slide {
  id?: number
  image: string
  title: string
  subtitle?: string
  link?: string
  buttonText?: string
}

const props = defineProps<{
  slides: Slide[]
}>()

const currentIndex = ref(0)
const isPaused = ref(false)
let timer: ReturnType<typeof setInterval> | null = null

const next = () => {
  if (!props.slides.length) return
  currentIndex.value = (currentIndex.value + 1) % props.slides.length
}

const prev = () => {
  if (!props.slides.length) return
  currentIndex.value = (currentIndex.value - 1 + props.slides.length) % props.slides.length
}

const goTo = (idx: number) => {
  currentIndex.value = idx
  if (!isPaused.value) startAutoplay()
}

const startAutoplay = () => {
  stopAutoplay()
  if (props.slides.length > 1 && !isPaused.value) {
    timer = setInterval(next, 5000)
  }
}

const stopAutoplay = () => {
  if (timer) {
    clearInterval(timer)
    timer = null
  }
}

const togglePause = () => {
  isPaused.value = !isPaused.value
  if (isPaused.value) {
    stopAutoplay()
  } else {
    startAutoplay()
  }
}

const prefersReducedMotion = process.client
  ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
  : false

onMounted(() => {
  if (!prefersReducedMotion) startAutoplay()
  else isPaused.value = true
})

onUnmounted(() => {
  stopAutoplay()
})

// 鼠标悬停时暂停
const handleMouseEnter = () => stopAutoplay()
const handleMouseLeave = () => startAutoplay()
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.6s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fadeInUp 0.6s ease forwards;
}
.animate-fade-in-delay {
  opacity: 0;
  animation: fadeInUp 0.6s ease 0.2s forwards;
}
.animate-fade-in-delay-2 {
  opacity: 0;
  animation: fadeInUp 0.6s ease 0.4s forwards;
}
</style>
