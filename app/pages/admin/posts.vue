<template>
  <div class="min-h-screen bg-gray-100">
    <header class="bg-white shadow-sm px-6 py-4 flex items-center justify-between">
      <div class="flex items-center gap-4">
        <NuxtLink to="/admin/products" class="text-gray-500 hover:text-gray-700 text-sm">← Back to Products</NuxtLink>
        <h1 class="text-lg font-bold text-gray-900">Posts Management</h1>
        <button
          class="px-4 py-1.5 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition"
          @click="openForm()"
        >
          + Add Post
        </button>
      </div>
      <div class="flex items-center gap-4">
        <NuxtLink to="/admin/downloads" class="text-sm text-blue-600 hover:text-blue-700">Downloads</NuxtLink>
        <NuxtLink to="/admin/certificates" class="text-sm text-blue-600 hover:text-blue-700">Certificates</NuxtLink>
        <span class="text-gray-300">|</span>
        <NuxtLink to="/admin/about" class="text-sm text-gray-600 hover:text-blue-700">About</NuxtLink>
        <NuxtLink to="/admin/contact" class="text-sm text-gray-600 hover:text-blue-700">Contact</NuxtLink>
        <NuxtLink to="/admin/sectors" class="text-sm text-gray-600 hover:text-blue-700">Sectors</NuxtLink>
        <NuxtLink to="/admin/quality" class="text-sm text-gray-600 hover:text-blue-700">Quality</NuxtLink>
        <span class="text-gray-300">|</span>
        <span class="text-sm text-gray-500">{{ user?.username }}</span>
        <button @click="handleLogout" class="text-sm text-gray-500 hover:text-red-600">Logout</button>
      </div>
    </header>

    <!-- Posts List -->
    <main class="p-6 max-w-7xl mx-auto">
      <div class="bg-white rounded-lg shadow-sm overflow-hidden">
        <table class="w-full">
          <thead class="bg-gray-50 border-b">
            <tr>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase hidden md:table-cell">Summary</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase hidden sm:table-cell">Date</th>
              <th class="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
            <tr v-for="item in posts" :key="item.id" :class="['hover:bg-gray-50', { 'opacity-60': !item.isActive }]">
              <td class="px-4 py-3">
                <div class="flex items-center gap-3">
                  <div v-if="item.cover" class="w-12 h-12 rounded overflow-hidden bg-gray-100 shrink-0">
                    <img :src="item.cover" class="w-full h-full object-cover" />
                  </div>
                  <p class="font-medium text-gray-900 text-sm">{{ item.title }}</p>
                </div>
              </td>
              <td class="px-4 py-3 text-sm text-gray-500 hidden md:table-cell max-w-xs truncate">{{ item.summary || '—' }}</td>
              <td class="px-4 py-3">
                <span :class="['text-xs px-2 py-0.5 rounded', item.isActive ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-400']">
                  {{ item.isActive ? 'Active' : 'Hidden' }}
                </span>
              </td>
              <td class="px-4 py-3 text-sm text-gray-500 hidden sm:table-cell">
                {{ formatDate(item.createdAt) }}
              </td>
              <td class="px-4 py-3 text-right">
                <div class="flex items-center justify-end gap-2">
                  <button class="text-sm text-blue-600 hover:text-blue-700" @click="openForm(item)">Edit</button>
                  <button class="text-sm text-red-600 hover:text-red-700" @click="handleDelete(item)">Delete</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div v-if="!posts.length" class="text-center py-12 text-gray-500">No posts yet</div>
      </div>
    </main>

    <!-- Edit Modal -->
    <div v-if="showForm" class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div class="absolute inset-0 bg-black/50" @click="showForm = false"></div>
      <div class="relative bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6">
        <h2 class="text-lg font-bold text-gray-900 mb-4">{{ editingPost ? 'Edit Post' : 'Add Post' }}</h2>
        <form @submit.prevent="handleSubmit" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Title *</label>
            <input v-model="form.title" type="text" required class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Slug</label>
            <input v-model="form.slug" type="text" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="auto-generated-from-title" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Summary</label>
            <input v-model="form.summary" type="text" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Brief description" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Cover Image</label>
            <div class="flex items-start gap-4">
              <div class="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0 border-2 border-dashed border-gray-300">
                <img v-if="coverPreview" :src="coverPreview" class="w-full h-full object-cover" />
              </div>
              <div class="flex-1">
                <input
                  type="file"
                  accept="image/*"
                  class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100"
                  @change="handleCoverChange"
                />
                <p class="mt-1 text-xs text-gray-400">支持 JPG、PNG 格式</p>
              </div>
            </div>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Content</label>
            <RichTextEditor v-model="form.content" />
          </div>
          <div class="flex items-center gap-4">
            <label class="flex items-center gap-2 text-sm">
              <input type="checkbox" v-model="form.isActive" class="w-4 h-4 text-blue-600 rounded" />
              Active
            </label>
          </div>
          <div class="flex justify-end gap-3 pt-4 border-t">
            <button type="button" @click="showForm = false" class="px-5 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">Cancel</button>
            <button type="submit" :disabled="saving" class="px-5 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50">
              {{ saving ? 'Saving...' : 'Save' }}
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

// Posts list
const { data: postsData, refresh: refreshPosts } = await useFetch('/api/posts', { query: { limit: '100' } })
const posts = computed(() => postsData.value?.data || [])

// Form
const showForm = ref(false)
const editingPost = ref<any>(null)
const saving = ref(false)
const coverPreview = ref('')
const coverFile = ref<File | null>(null)
const form = reactive({
  title: '',
  slug: '',
  summary: '',
  cover: '',
  content: '',
  isActive: true,
})

const openForm = (item?: any) => {
  coverFile.value = null
  coverPreview.value = ''
  if (item) {
    editingPost.value = item
    form.title = item.title
    form.slug = item.slug || ''
    form.summary = item.summary || ''
    form.cover = item.cover || ''
    form.content = item.content || ''
    form.isActive = item.isActive
    if (item.cover) coverPreview.value = item.cover
  } else {
    editingPost.value = null
    form.title = ''
    form.slug = ''
    form.summary = ''
    form.cover = ''
    form.content = ''
    form.isActive = true
  }
  showForm.value = true
}

const handleCoverChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  const file = target.files?.[0]
  if (file) {
    coverFile.value = file
    coverPreview.value = URL.createObjectURL(file)
  }
}

const handleSubmit = async () => {
  saving.value = true
  try {
    let coverUrl = form.cover
    // Upload cover image if new file selected
    if (coverFile.value) {
      const formData = new FormData()
      formData.append('files', coverFile.value)
      const { urls } = await $fetch('/api/upload', { method: 'POST', body: formData })
      coverUrl = urls[0]
    }
    const body = { ...form, cover: coverUrl }
    if (editingPost.value) {
      await $fetch(`/api/posts/${editingPost.value.id}`, { method: 'PUT', body })
    } else {
      await $fetch('/api/posts', { method: 'POST', body })
    }
    showForm.value = false
    await refreshPosts()
  } catch (e: any) {
    alert(e.data?.message || 'Save failed')
  } finally {
    saving.value = false
  }
}

const handleDelete = async (item: any) => {
  if (!confirm(`Delete "${item.title}"?`)) return
  try {
    await $fetch(`/api/posts/${item.id}`, { method: 'DELETE' })
    await refreshPosts()
  } catch {
    alert('Delete failed')
  }
}

const formatDate = (d: string) => new Date(d).toLocaleDateString('en-US')
</script>
