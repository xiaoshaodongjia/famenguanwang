<template>
  <div class="min-h-screen bg-gray-100">
    <header class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <div class="flex items-center gap-4">
          <h1 class="text-xl font-bold text-gray-900">首页轮播图</h1>
        </div>
        <div class="flex items-center gap-4">
          <NuxtLink to="/admin/slides" class="text-sm text-gray-600 hover:text-blue-600">Slides</NuxtLink>
          <NuxtLink to="/admin/products" class="text-sm text-gray-600 hover:text-blue-600">Products</NuxtLink>
          <NuxtLink to="/admin/posts" class="text-sm text-gray-600 hover:text-blue-600">Posts</NuxtLink>
          <NuxtLink to="/admin/downloads" class="text-sm text-gray-600 hover:text-blue-600">Downloads</NuxtLink>
          <NuxtLink to="/admin/certificates" class="text-sm text-gray-600 hover:text-blue-600">Certificates</NuxtLink>
          <span class="text-gray-300">|</span>
          <NuxtLink to="/admin/about" class="text-sm text-gray-600 hover:text-blue-600">About</NuxtLink>
          <NuxtLink to="/admin/contact" class="text-sm text-gray-600 hover:text-blue-600">Contact</NuxtLink>
          <NuxtLink to="/admin/sectors" class="text-sm text-gray-600 hover:text-blue-600">Sectors</NuxtLink>
          <NuxtLink to="/admin/quality" class="text-sm text-gray-600 hover:text-blue-600">Quality</NuxtLink>
          <span class="text-gray-300">|</span>
          <span class="text-sm text-gray-500">{{ user?.username }}</span>
          <button @click="handleLogout" class="text-sm text-gray-500 hover:text-red-600">Logout</button>
        </div>
      </div>
    </header>

    <main class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <!-- 添加按钮 -->
      <div class="flex items-center justify-between mb-6">
        <p class="text-sm text-gray-500">共 {{ slides.length }} 张轮播图</p>
        <button
          class="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition"
          @click="startAdd"
        >
          + 添加轮播图
        </button>
      </div>

      <!-- 编辑/添加表单 -->
      <div v-if="editing" class="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">{{ form.id ? '编辑轮播图' : '添加轮播图' }}</h3>
        <div class="space-y-4">
          <!-- 图片上传 -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">轮播图片</label>
            <div class="flex items-start gap-4">
              <div class="w-48 h-28 bg-gray-100 rounded-lg overflow-hidden border-2 border-dashed border-gray-300 flex-shrink-0">
                <img v-if="form.image" :src="form.image" class="w-full h-full object-cover" />
              </div>
              <div class="flex-1">
                <input
                  type="file"
                  accept="image/*"
                  class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100"
                  @change="handleImageChange"
                />
                <p class="mt-1 text-xs text-gray-400">建议尺寸 1920x800px，支持 JPG、PNG 格式</p>
              </div>
            </div>
          </div>

          <!-- 标题 -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">主标题</label>
            <input
              v-model="form.title"
              type="text"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="输入轮播图标题"
            />
          </div>

          <!-- 副标题 -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">副标题</label>
            <input
              v-model="form.subtitle"
              type="text"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="输入副标题（可选）"
            />
          </div>

          <!-- 跳转链接 -->
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">跳转链接</label>
              <input
                v-model="form.link"
                type="text"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="/products 或 https://..."
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">按钮文字</label>
              <input
                v-model="form.buttonText"
                type="text"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Learn More"
              />
            </div>
          </div>

          <!-- 排序 -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">排序（数字越小越靠前）</label>
            <input
              v-model.number="form.sortOrder"
              type="number"
              class="w-32 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div class="flex justify-end gap-3 mt-6 pt-4 border-t">
          <button
            type="button"
            class="px-5 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition"
            @click="stopEditing"
          >
            取消
          </button>
          <button
            type="button"
            class="px-5 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            @click="handleSave"
          >
            保存
          </button>
        </div>
      </div>

      <!-- 轮播图列表 -->
      <div class="bg-white rounded-lg shadow-sm overflow-hidden">
        <div v-if="slides.length" class="divide-y divide-gray-100">
          <div
            v-for="slide in slides"
            :key="slide.id"
            class="flex items-center gap-4 p-4 hover:bg-gray-50 transition"
          >
            <!-- 缩略图 -->
            <div class="w-32 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
              <img :src="slide.image" class="w-full h-full object-cover" />
            </div>

            <!-- 信息 -->
            <div class="flex-1 min-w-0">
              <p class="font-medium text-gray-900 truncate">{{ slide.title }}</p>
              <p v-if="slide.subtitle" class="text-sm text-gray-500 truncate">{{ slide.subtitle }}</p>
              <div class="flex items-center gap-3 mt-1">
                <span class="text-xs text-gray-400">排序: {{ slide.sortOrder }}</span>
                <span
                  :class="[
                    'text-xs px-2 py-0.5 rounded',
                    slide.isActive ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-400'
                  ]"
                >
                  {{ slide.isActive ? '启用' : '禁用' }}
                </span>
              </div>
            </div>

            <!-- 操作 -->
            <div class="flex items-center gap-2 flex-shrink-0">
              <button
                class="text-sm text-blue-600 hover:text-blue-700"
                @click="startEdit(slide)"
              >
                编辑
              </button>
              <button
                class="text-sm"
                :class="slide.isActive ? 'text-yellow-600 hover:text-yellow-700' : 'text-green-600 hover:text-green-700'"
                @click="toggleActive(slide)"
              >
                {{ slide.isActive ? '禁用' : '启用' }}
              </button>
              <button
                class="text-sm text-red-600 hover:text-red-700"
                @click="handleDelete(slide)"
              >
                删除
              </button>
            </div>
          </div>
        </div>

        <div v-else class="text-center py-12 text-gray-500">
          暂无轮播图，点击"添加轮播图"开始添加
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
const { user, fetchUser, logout } = useAuth()
await fetchUser()
const handleLogout = async () => { await logout() }

// 轮播图列表
const slides = ref<any[]>([])

const loadSlides = async () => {
  try {
    const res = await $fetch('/api/slides/all')
    slides.value = res?.data || []
  } catch (e: any) {
    // 未登录时重定向到登录页
    if (e.statusCode === 401) {
      navigateTo('/admin/login')
    }
  }
}

// 客户端加载数据，避免 SSR 401
if (process.client) {
  await loadSlides()
} else {
  // SSR 时尝试加载，失败则静默处理
  loadSlides().catch(() => {})
}

// 编辑状态
const editing = ref(false)
const form = ref<any>({
  id: null,
  image: '',
  title: '',
  subtitle: '',
  link: '',
  buttonText: '',
  sortOrder: 0,
})

const startAdd = () => {
  form.value = { id: null, image: '', title: '', subtitle: '', link: '', buttonText: '', sortOrder: slides.value.length }
  editing.value = true
}

const stopEditing = async () => {
  editing.value = false
  await loadSlides()
}

const startEdit = (slide: any) => {
  form.value = { ...slide }
  editing.value = true
}

const handleImageChange = async (e: Event) => {
  const target = e.target as HTMLInputElement
  const file = target.files?.[0]
  if (!file) return

  const formData = new FormData()
  formData.append('files', file)

  try {
    const { urls } = await $fetch('/api/upload', { method: 'POST', body: formData })
    if (urls?.[0]) {
      form.value.image = urls[0]
    }
  } catch {
    alert('图片上传失败')
  }
}

const handleSave = async () => {
  if (!form.value.image || !form.value.title) {
    alert('请填写图片和标题')
    return
  }

  try {
    if (form.value.id) {
      await $fetch(`/api/slides/${form.value.id}`, { method: 'PUT', body: form.value })
    } else {
      await $fetch('/api/slides', { method: 'POST', body: form.value })
    }
    await stopEditing()
  } catch (e: any) {
    alert(e.data?.message || '保存失败')
  }
}

const toggleActive = async (slide: any) => {
  try {
    await $fetch(`/api/slides/${slide.id}`, {
      method: 'PUT',
      body: { ...slide, isActive: !slide.isActive }
    })
    await loadSlides()
  } catch {
    alert('操作失败')
  }
}

const handleDelete = async (slide: any) => {
  if (!confirm(`确定要删除轮播图「${slide.title}」吗？`)) return
  try {
    await $fetch(`/api/slides/${slide.id}`, { method: 'DELETE' })
    await loadSlides()
  } catch {
    alert('删除失败')
  }
}
</script>
