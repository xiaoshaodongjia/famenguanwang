<template>
  <!-- 遮罩层 -->
  <Teleport to="body">
    <div v-if="visible" class="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <!-- 背景 -->
      <div class="absolute inset-0 bg-abyss/80 backdrop-blur-sm" @click="close"></div>

      <!-- 弹窗 -->
      <div class="relative bg-surface rounded-lg border border-gold w-full max-w-md p-8">
        <button
          aria-label="Close"
          class="absolute top-4 right-4 w-9 h-9 flex items-center justify-center text-fog hover:text-snow rounded-lg hover:bg-surface-raised transition"
          @click="close"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h2 class="text-xl font-light text-snow mb-1">在线询价</h2>
        <p v-if="productName" class="text-sm text-fog mb-6 font-mono">产品：{{ productName }}</p>

        <!-- 提交成功 -->
        <div v-if="submitted" class="text-center py-8">
          <div class="w-16 h-16 mx-auto mb-6 bg-signal/10 rounded-full flex items-center justify-center border border-signal/20">
            <svg class="w-8 h-8 text-signal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <p class="text-snow font-light">询价提交成功！</p>
          <p class="text-sm text-fog mt-1">我们会尽快与您联系</p>
          <button
            class="mt-8 px-6 py-2.5 bg-gold text-void text-sm font-medium rounded-md hover:bg-gold-light transition"
            @click="close"
          >
            关闭
          </button>
        </div>

        <!-- 表单 -->
        <form v-else @submit.prevent="handleSubmit" class="space-y-5">
          <div>
            <label class="block text-sm font-medium text-mist mb-2">您的姓名 *</label>
            <input
              v-model="form.name"
              type="text"
              required
              class="w-full px-4 py-2.5 bg-surface-raised border border-gold/10 rounded-md text-snow placeholder-fog focus:outline-none focus:border-gold/40 focus:shadow-[0_0_0_3px_rgba(200,169,110,0.1)] transition"
              placeholder="请输入姓名"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-mist mb-2">联系电话 *</label>
            <input
              v-model="form.phone"
              type="tel"
              required
              class="w-full px-4 py-2.5 bg-surface-raised border border-gold/10 rounded-md text-snow placeholder-fog focus:outline-none focus:border-gold/40 focus:shadow-[0_0_0_3px_rgba(200,169,110,0.1)] transition"
              placeholder="请输入手机号"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-mist mb-2">公司名称</label>
            <input
              v-model="form.company"
              type="text"
              class="w-full px-4 py-2.5 bg-surface-raised border border-gold/10 rounded-md text-snow placeholder-fog focus:outline-none focus:border-gold/40 focus:shadow-[0_0_0_3px_rgba(200,169,110,0.1)] transition"
              placeholder="选填"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-mist mb-2">邮箱</label>
            <input
              v-model="form.email"
              type="email"
              class="w-full px-4 py-2.5 bg-surface-raised border border-gold/10 rounded-md text-snow placeholder-fog focus:outline-none focus:border-gold/40 focus:shadow-[0_0_0_3px_rgba(200,169,110,0.1)] transition"
              placeholder="选填"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-mist mb-2">询价内容 *</label>
            <textarea
              v-model="form.message"
              required
              rows="3"
              class="w-full px-4 py-2.5 bg-surface-raised border border-gold/10 rounded-md text-snow placeholder-fog focus:outline-none focus:border-gold/40 focus:shadow-[0_0_0_3px_rgba(200,169,110,0.1)] transition resize-none"
              placeholder="请描述您的需求，如口径、压力、材质、数量等"
            ></textarea>
          </div>

          <div v-if="error" class="text-sm text-alert bg-alert/10 px-4 py-3 rounded-md border border-alert/20">
            {{ error }}
          </div>

          <button
            type="submit"
            :disabled="loading"
            class="w-full py-3 bg-gold text-void font-medium rounded-md hover:bg-gold-light disabled:opacity-40 transition"
          >
            {{ loading ? '提交中...' : '提交询价' }}
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
    // 提交成功后关闭时重置
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
