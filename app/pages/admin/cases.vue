<template>
  <div class="min-h-screen bg-gray-100">
    <header class="bg-white shadow-sm px-6 py-4 flex items-center justify-between">
      <div class="flex items-center gap-4">
        <NuxtLink to="/admin/products" class="text-gray-500 hover:text-gray-700 text-sm">← 返回产品管理</NuxtLink>
        <h1 class="text-lg font-bold text-gray-900">案例管理</h1>
        <button
          class="px-4 py-1.5 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition"
          @click="openForm()"
        >
          + 添加案例
        </button>
      </div>
      <div class="flex items-center gap-4">
        <NuxtLink to="/admin/dashboard" class="text-sm text-blue-600 hover:text-blue-700">数据看板</NuxtLink>
        <span class="text-sm text-gray-500">{{ user?.username }}</span>
        <button @click="handleLogout" class="text-sm text-gray-500 hover:text-red-600">退出登录</button>
      </div>
    </header>

    <!-- 案例列表 -->
    <main class="p-6 max-w-7xl mx-auto">
      <div class="bg-white rounded-lg shadow-sm overflow-hidden">
        <table class="w-full">
          <thead class="bg-gray-50 border-b">
            <tr>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">案例</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase hidden md:table-cell">分类</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">状态</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase hidden sm:table-cell">时间</th>
              <th class="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">操作</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
            <tr v-for="item in cases" :key="item.id" :class="['hover:bg-gray-50', { 'opacity-60': !item.isActive }]">
              <td class="px-4 py-3">
                <div class="flex items-center gap-3">
                  <div v-if="item.cover" class="w-12 h-12 rounded overflow-hidden bg-gray-100 shrink-0">
                    <img :src="item.cover" class="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p class="font-medium text-gray-900 text-sm">{{ item.title }}</p>
                    <p class="text-xs text-gray-500 line-clamp-1">{{ item.summary }}</p>
                  </div>
                </div>
              </td>
              <td class="px-4 py-3 text-sm text-gray-600 hidden md:table-cell">{{ item.category || '—' }}</td>
              <td class="px-4 py-3">
                <div class="flex items-center gap-2">
                  <span :class="['text-xs px-2 py-0.5 rounded', item.isActive ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-400']">
                    {{ item.isActive ? '显示' : '隐藏' }}
                  </span>
                  <span v-if="item.isFeatured" class="text-xs px-2 py-0.5 rounded bg-yellow-50 text-yellow-600">推荐</span>
                </div>
              </td>
              <td class="px-4 py-3 text-sm text-gray-500 hidden sm:table-cell">
                {{ formatDate(item.createdAt) }}
              </td>
              <td class="px-4 py-3 text-right">
                <div class="flex items-center justify-end gap-2">
                  <button class="text-xs text-gray-500 hover:text-yellow-600" @click="toggleFeatured(item)">
                    {{ item.isFeatured ? '取消推荐' : '推荐' }}
                  </button>
                  <button class="text-sm text-blue-600 hover:text-blue-700" @click="openForm(item)">编辑</button>
                  <button class="text-sm text-red-600 hover:text-red-700" @click="handleDelete(item)">删除</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div v-if="!cases.length" class="text-center py-12 text-gray-500">暂无案例</div>
      </div>
    </main>

    <!-- 编辑弹窗 -->
    <div v-if="showForm" class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div class="absolute inset-0 bg-black/50" @click="showForm = false"></div>
      <div class="relative bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6">
        <h2 class="text-lg font-bold text-gray-900 mb-4">{{ editingCase ? '编辑案例' : '添加案例' }}</h2>
        <form @submit.prevent="handleSubmit" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">标题 *</label>
            <input v-model="form.title" type="text" required class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">摘要</label>
            <input v-model="form.summary" type="text" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="简短描述案例" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">分类</label>
            <input v-model="form.category" type="text" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="如：化工、电力、水处理" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">封面图 URL</label>
            <input v-model="form.cover" type="text" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="/uploads/xxx.jpg" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">正文内容</label>
            <RichTextEditor v-model="form.content" />
          </div>
          <div class="flex items-center gap-4">
            <label class="flex items-center gap-2 text-sm">
              <input type="checkbox" v-model="form.isActive" class="w-4 h-4 text-blue-600 rounded" />
              显示
            </label>
            <label class="flex items-center gap-2 text-sm">
              <input type="checkbox" v-model="form.isFeatured" class="w-4 h-4 text-yellow-600 rounded" />
              推荐
            </label>
          </div>
          <div class="flex justify-end gap-3 pt-4 border-t">
            <button type="button" @click="showForm = false" class="px-5 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">取消</button>
            <button type="submit" :disabled="saving" class="px-5 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50">
              {{ saving ? '保存中...' : '保存' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import RichTextEditor from '~/components/RichTextEditor.vue'

const { user, fetchUser, logout } = useAuth()
await fetchUser()
const handleLogout = async () => { await logout() }

// 案例列表
const { data: casesData, refresh: refreshCases } = await useFetch('/api/cases', { query: { limit: '100' } })
const cases = computed(() => casesData.value?.data || [])

// 表单
const showForm = ref(false)
const editingCase = ref<any>(null)
const saving = ref(false)
const form = reactive({
  title: '',
  summary: '',
  category: '',
  cover: '',
  content: '',
  isActive: true,
  isFeatured: false,
})

const openForm = (item?: any) => {
  if (item) {
    editingCase.value = item
    form.title = item.title
    form.summary = item.summary || ''
    form.category = item.category || ''
    form.cover = item.cover || ''
    form.content = item.content || ''
    form.isActive = item.isActive
    form.isFeatured = item.isFeatured
  } else {
    editingCase.value = null
    form.title = ''
    form.summary = ''
    form.category = ''
    form.cover = ''
    form.content = ''
    form.isActive = true
    form.isFeatured = false
  }
  showForm.value = true
}

const handleSubmit = async () => {
  saving.value = true
  try {
    if (editingCase.value) {
      await $fetch(`/api/cases/${editingCase.value.id}`, { method: 'PUT', body: { ...form } })
    } else {
      await $fetch('/api/cases', { method: 'POST', body: { ...form } })
    }
    showForm.value = false
    await refreshCases()
  } catch (e: any) {
    alert(e.data?.message || '保存失败')
  } finally {
    saving.value = false
  }
}

const toggleFeatured = async (item: any) => {
  await $fetch(`/api/cases/${item.id}`, { method: 'PUT', body: { isFeatured: !item.isFeatured } })
  await refreshCases()
}

const handleDelete = async (item: any) => {
  if (!confirm(`确定删除「${item.title}」吗？`)) return
  try {
    await $fetch(`/api/cases/${item.id}`, { method: 'DELETE' })
    await refreshCases()
  } catch {
    alert('删除失败')
  }
}

const formatDate = (d: string) => new Date(d).toLocaleDateString('zh-CN')
</script>
