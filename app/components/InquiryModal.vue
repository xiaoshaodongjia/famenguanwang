<template>
  <!-- 遮罩层 -->
  <Teleport to="body">
    <div v-if="visible" class="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <!-- 背景 -->
      <div class="absolute inset-0 bg-black/50" @click="close"></div>

      <!-- 弹窗 -->
      <div class="relative bg-white rounded-xl shadow-xl w-full max-w-md p-6">
        <button
          class="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          @click="close"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h2 class="text-xl font-bold text-gray-900 mb-1">在线询价</h2>
        <p v-if="productName" class="text-sm text-gray-500 mb-4">产品：{{ productName }}</p>

        <!-- 提交成功 -->
        <div v-if="submitted" class="text-center py-8">
          <div class="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
            <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <p class="text-gray-900 font-medium">询价提交成功！</p>
          <p class="text-sm text-gray-500 mt-1">我们会尽快与您联系</p>
          <button
            class="mt-6 px-6 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700"
            @click="close"
          >
            关闭
          </button>
        </div>

        <!-- 表单 -->
        <form v-else @submit.prevent="handleSubmit" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">您的姓名 *</label>
            <input
              v-model="form.name"
              type="text"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="请输入姓名"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">联系电话 *</label>
            <input
              v-model="form.phone"
              type="tel"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="请输入手机号"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">公司名称</label>
            <input
              v-model="form.company"
              type="text"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="选填"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">邮箱</label>
            <input
              v-model="form.email"
              type="email"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="选填"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">询价内容 *</label>
            <textarea
              v-model="form.message"
              required
              rows="3"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="请描述您的需求，如口径、压力、材质、数量等"
            ></textarea>
          </div>

          <div v-if="error" class="text-sm text-red-600 bg-red-50 px-3 py-2 rounded">
            {{ error }}
          </div>

          <button
            type="submit"
            :disabled="loading"
            class="w-full py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 transition"
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
