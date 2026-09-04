<template>
  <!-- 遮罩层 -->
  <Teleport to="body">
    <div v-if="visible" class="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <!-- 背景 -->
      <div class="absolute inset-0 bg-ink/85 backdrop-blur-sm" @click="close"></div>

      <!-- 弹窗 -->
      <div class="relative bg-surface border border-cyan-line w-full max-w-md p-6">
        <button
          aria-label="Close"
          class="absolute top-3 right-3 w-8 h-8 flex items-center justify-center text-fog hover:text-snow hover:bg-surface-raised transition"
          @click="close"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <span class="mono-label">INQUIRY FORM</span>
        <h2 class="text-lg font-light text-snow mt-1 mb-1">在线询价</h2>
        <p v-if="productName" class="text-xs text-fog mb-5 font-mono">PRODUCT: {{ productName }}</p>

        <!-- 提交成功 -->
        <div v-if="submitted" class="text-center py-8">
          <div class="w-14 h-14 mx-auto mb-5 bg-signal/10 flex items-center justify-center border border-signal/30">
            <svg class="w-7 h-7 text-signal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <p class="text-snow font-light">提交成功</p>
          <p class="text-xs text-fog mt-1 font-mono">WE WILL CONTACT YOU SOON</p>
          <button
            class="mt-6 px-6 py-2.5 bg-cyan text-ink text-xs font-mono uppercase tracking-wider rounded hover:bg-snow transition"
            @click="close"
          >
            关闭
          </button>
        </div>

        <!-- 表单 -->
        <form v-else @submit.prevent="handleSubmit" class="space-y-4">
          <div>
            <label class="block text-xs font-mono uppercase tracking-wider text-cyan mb-1.5">姓名 *</label>
            <input
              v-model="form.name"
              type="text"
              required
              class="w-full px-3 py-2 bg-surface-raised border border-line rounded text-snow placeholder-fog focus:outline-none focus:border-cyan-line focus:shadow-[0_0_0_2px_rgba(0,212,255,0.1)] transition text-sm"
              placeholder="请输入姓名"
            />
          </div>
          <div>
            <label class="block text-xs font-mono uppercase tracking-wider text-cyan mb-1.5">电话 *</label>
            <input
              v-model="form.phone"
              type="tel"
              required
              class="w-full px-3 py-2 bg-surface-raised border border-line rounded text-snow placeholder-fog focus:outline-none focus:border-cyan-line focus:shadow-[0_0_0_2px_rgba(0,212,255,0.1)] transition text-sm"
              placeholder="请输入手机号"
            />
          </div>
          <div>
            <label class="block text-xs font-mono uppercase tracking-wider text-cyan mb-1.5">公司</label>
            <input
              v-model="form.company"
              type="text"
              class="w-full px-3 py-2 bg-surface-raised border border-line rounded text-snow placeholder-fog focus:outline-none focus:border-cyan-line focus:shadow-[0_0_0_2px_rgba(0,212,255,0.1)] transition text-sm"
              placeholder="选填"
            />
          </div>
          <div>
            <label class="block text-xs font-mono uppercase tracking-wider text-cyan mb-1.5">邮箱</label>
            <input
              v-model="form.email"
              type="email"
              class="w-full px-3 py-2 bg-surface-raised border border-line rounded text-snow placeholder-fog focus:outline-none focus:border-cyan-line focus:shadow-[0_0_0_2px_rgba(0,212,255,0.1)] transition text-sm"
              placeholder="选填"
            />
          </div>
          <div>
            <label class="block text-xs font-mono uppercase tracking-wider text-cyan mb-1.5">询价内容 *</label>
            <textarea
              v-model="form.message"
              required
              rows="3"
              class="w-full px-3 py-2 bg-surface-raised border border-line rounded text-snow placeholder-fog focus:outline-none focus:border-cyan-line focus:shadow-[0_0_0_2px_rgba(0,212,255,0.1)] transition resize-none text-sm"
              placeholder="口径、压力、材质、数量等"
            ></textarea>
          </div>

          <div v-if="error" class="text-xs text-alert bg-alert/10 px-3 py-2 border border-alert/20 font-mono">
            {{ error }}
          </div>

          <button
            type="submit"
            :disabled="loading"
            class="w-full py-2.5 bg-cyan text-ink text-xs font-mono uppercase tracking-wider rounded hover:bg-snow disabled:opacity-35 transition"
          >
            {{ loading ? 'SUBMITTING...' : '提交询价' }}
          </button>
        </form>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
const props = defineProps<{
  visible: boolean
  productId?: number
  productName?: string
}>()

const emit = defineEmits<{
  close: []
}>()

const loading = ref(false)
const error = ref('')
const submitted = ref(false)

const form = reactive({
  name: '',
  phone: '',
  email: '',
  company: '',
  message: '',
})

const close = () => {
  if (submitted.value) {
    submitted.value = false
    form.name = ''
    form.phone = ''
    form.email = ''
    form.company = ''
    form.message = ''
  }
  emit('close')
}

const handleSubmit = async () => {
  error.value = ''
  loading.value = true

  try {
    await $fetch('/api/inquiries', {
      method: 'POST',
      body: {
        ...form,
        productId: props.productId,
      },
    })
    submitted.value = true
  } catch (e: any) {
    error.value = e.data?.message || '提交失败，请重试'
  } finally {
    loading.value = false
  }
}

// ESC 关闭
if (process.client) {
  const handleKey = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && props.visible) close()
  }
  onMounted(() => document.addEventListener('keydown', handleKey))
  onUnmounted(() => document.removeEventListener('keydown', handleKey))
}
</script>
