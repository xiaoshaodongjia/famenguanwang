<template>
  <div class="min-h-screen bg-gray-100">
    <header class="bg-white shadow-sm px-6 py-4 flex items-center justify-between">
      <div class="flex items-center gap-4">
        <NuxtLink to="/admin/products" class="text-gray-500 hover:text-gray-700 text-sm">← Back to Products</NuxtLink>
        <h1 class="text-lg font-bold text-gray-900">Downloads Management</h1>
        <button
          class="px-4 py-1.5 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition"
          @click="openForm()"
        >
          + Add Download
        </button>
      </div>
      <div class="flex items-center gap-4">
        <NuxtLink to="/admin/posts" class="text-sm text-blue-600 hover:text-blue-700">Posts</NuxtLink>
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

    <!-- Downloads List -->
    <main class="p-6 max-w-7xl mx-auto">
      <div class="bg-white rounded-lg shadow-sm overflow-hidden">
        <table class="w-full">
          <thead class="bg-gray-50 border-b">
            <tr>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase hidden md:table-cell">Description</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase hidden sm:table-cell">File</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th class="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
            <tr v-for="item in downloads" :key="item.id" :class="['hover:bg-gray-50', { 'opacity-60': !item.isActive }]">
              <td class="px-4 py-3">
                <p class="font-medium text-gray-900 text-sm">{{ item.title }}</p>
              </td>
              <td class="px-4 py-3 text-sm text-gray-500 hidden md:table-cell max-w-xs truncate">{{ item.description || '—' }}</td>
              <td class="px-4 py-3 hidden sm:table-cell">
                <a :href="item.fileUrl" target="_blank" class="text-xs text-blue-600 hover:text-blue-700 flex items-center gap-1">
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                  </svg>
                  {{ item.fileSize || 'View' }}
                </a>
              </td>
              <td class="px-4 py-3">
                <span :class="['text-xs px-2 py-0.5 rounded', item.isActive ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-400']">
                  {{ item.isActive ? 'Active' : 'Hidden' }}
                </span>
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
        <div v-if="!downloads.length" class="text-center py-12 text-gray-500">No downloads yet</div>
      </div>
    </main>

    <!-- Edit Modal -->
    <div v-if="showForm" class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div class="absolute inset-0 bg-black/50" @click="showForm = false"></div>
      <div class="relative bg-white rounded-xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-6">
        <h2 class="text-lg font-bold text-gray-900 mb-4">{{ editingItem ? 'Edit Download' : 'Add Download' }}</h2>
        <form @submit.prevent="handleSubmit" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Title *</label>
            <input v-model="form.title" type="text" required class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <input v-model="form.description" type="text" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Upload File (PDF)</label>
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100"
              @change="handleFileChange"
            />
            <p v-if="form.fileUrl" class="mt-1 text-xs text-gray-400">Current: {{ form.fileUrl }}</p>
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
const { user, fetchUser, logout } = useAuth()
await fetchUser()
const handleLogout = async () => { await logout() }

// Downloads list (include inactive)
const { data: downloadsData, refresh: refreshDownloads } = await useFetch('/api/downloads')
const downloads = computed(() => downloadsData.value?.data || [])

// Form
const showForm = ref(false)
const editingItem = ref<any>(null)
const saving = ref(false)
const uploading = ref(false)
const form = reactive({
  title: '',
  description: '',
  fileUrl: '',
  fileSize: '',
  isActive: true,
})

const file = ref<File | null>(null)

const openForm = (item?: any) => {
  if (item) {
    editingItem.value = item
    form.title = item.title
    form.description = item.description || ''
    form.fileUrl = item.fileUrl || ''
    form.fileSize = item.fileSize || ''
    form.isActive = item.isActive
  } else {
    editingItem.value = null
    form.title = ''
    form.description = ''
    form.fileUrl = ''
    form.fileSize = ''
    form.isActive = true
  }
  file.value = null
  showForm.value = true
}

const handleFileChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  file.value = target.files?.[0] || null
}

const handleSubmit = async () => {
  saving.value = true
  try {
    let fileUrl = form.fileUrl
    let fileSize = form.fileSize

    // Upload new file if selected
    if (file.value) {
      uploading.value = true
      const formData = new FormData()
      formData.append('files', file.value)
      const { urls } = await $fetch('/api/upload', { method: 'POST', body: formData })
      fileUrl = urls[0]
      fileSize = `${(file.value.size / 1024).toFixed(1)} KB`
    }

    const body = {
      title: form.title,
      description: form.description,
      fileUrl: fileUrl || form.fileUrl,
      fileSize: fileSize || form.fileSize,
      isActive: form.isActive,
    }

    if (editingItem.value) {
      await $fetch(`/api/downloads/${editingItem.value.id}`, { method: 'PUT', body })
    } else {
      await $fetch('/api/downloads', { method: 'POST', body })
    }
    showForm.value = false
    await refreshDownloads()
  } catch (e: any) {
    alert(e.data?.message || 'Save failed')
  } finally {
    saving.value = false
    uploading.value = false
  }
}

const handleDelete = async (item: any) => {
  if (!confirm(`Delete "${item.title}"?`)) return
  try {
    await $fetch(`/api/downloads/${item.id}`, { method: 'DELETE' })
    await refreshDownloads()
  } catch {
    alert('Delete failed')
  }
}
</script>
