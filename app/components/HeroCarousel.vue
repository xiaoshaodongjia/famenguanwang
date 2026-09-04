<template>
  <section class="relative bg-canvas overflow-hidden">
    <!-- 轮播图 -->
    <div class="relative h-[60vh] md:h-[75vh] min-h-[480px]">
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
          <!-- Subtle overlay for text readability -->
          <div class="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
          <!-- 文字内容 -->
          <div class="absolute inset-0 flex items-end pb-24 md:pb-32">
            <div class="max-w-7xl mx-auto px-6 lg:px-8 w-full">
              <div class="max-w-2xl">
                <h1 class="text-4xl md:text-6xl font-extralight leading-[1.05] tracking-tight text-surface animate-fade-in">
                  {{ slides[currentIndex].title }}
                </h1>
                <p v-if="slides[currentIndex].subtitle" class="mt-6 text-lg text-surface/80 font-light animate-fade-in-delay">
                  {{ slides[currentIndex].subtitle }}
                </p>
                <a
                  v-if="slides[currentIndex].link"
                  :href="slides[currentIndex].link"
                  class="inline-block mt-10 px-8 py-3.5 bg-surface text-ink font-medium rounded-md hover:bg-surface-hover transition animate-fade-in-delay-2"
                >
                  {{ slides[currentIndex].buttonText || 'Learn More' }}
                </a>
              </div>
            </div>
          </div>
        </div>
      </transition>

      <!-- 无轮播图时的默认内容 -->
      <div v-if="!slides.length" class="absolute inset-0 flex items-end pb-24 md:pb-32">
        <div class="max-w-7xl mx-auto px-6 lg:px-8 w-full">
          <div class="max-w-2xl">
            <h1 class="text-4xl md:text-6xl font-extralight leading-[1.05] tracking-tight text-ink">
              Industrial Valves & Pipe Fittings
            </h1>
            <p class="mt-6 text-lg text-ink-secondary font-light">
              PLOVER INDUSTRIAL CO.,LTD - Professional manufacturer with years of experience in valve technology, providing exceptional products for various industries.
            </p>
            <NuxtLink
              to="/products"
              class="inline-block mt-10 px-8 py-3.5 bg-ink text-surface font-medium rounded-md hover:bg-ink/90 transition"
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
      class="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-surface/80 hover:bg-surface backdrop-blur-sm shadow-sm border border-line-subtle transition"
      @click="prev"
    >
      <svg class="w-5 h-5 text-ink" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
      </svg>
    </button>
    <button
      v-if="slides.length > 1"
      aria-label="Next slide"
      class="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-surface/80 hover:bg-surface backdrop-blur-sm shadow-sm border border-line-subtle transition"
      @click="next"
    >
      <svg class="w-5 h-5 text-ink" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
      </svg>
    </button>

    <!-- 暂停/播放 + 指示点 -->
    <div v-if="slides.length > 1" class="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4">
      <button
        :aria-label="isPaused ? 'Play slideshow' : 'Pause slideshow'"
        class="w-10 h-10 flex items-center justify-center rounded-full bg-surface/80 hover:bg-surface backdrop-blur-sm shadow-sm border border-line-subtle transition"
        @click="togglePause"
      >
        <svg v-if="isPaused" class="w-4 h-4 text-ink" fill="currentColor" viewBox="0 0 24 24">
          <path d="M8 5v14l11-7z" />
        </svg>
        <svg v-else class="w-4 h-4 text-ink" fill="currentColor" viewBox="0 0 24 24">
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
            'h-1 rounded-full transition-all duration-500',
            idx === currentIndex ? 'bg-ink w-8' : 'bg-ink/30 hover:bg-ink/50 w-4'
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
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1);
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
  animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
.animate-fade-in-delay {
  opacity: 0;
  animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s forwards;
}
.animate-fade-in-delay-2 {
  opacity: 0;
  animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.4s forwards;
}
</style>
