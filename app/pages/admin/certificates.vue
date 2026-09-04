<template>
  <div class="min-h-screen bg-gray-100">
    <header class="bg-white shadow-sm px-6 py-4 flex items-center justify-between">
      <div class="flex items-center gap-4">
        <NuxtLink to="/admin/products" class="text-gray-500 hover:text-gray-700 text-sm">← Back to Products</NuxtLink>
        <h1 class="text-lg font-bold text-gray-900">Certificates Management</h1>
        <button
          class="px-4 py-1.5 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition"
          @click="openForm()"
        >
          + Add Certificate
        </button>
      </div>
      <div class="flex items-center gap-4">
        <NuxtLink to="/admin/posts" class="text-sm text-blue-600 hover:text-blue-700">Posts</NuxtLink>
        <NuxtLink to="/admin/downloads" class="text-sm text-blue-600 hover:text-blue-700">Downloads</NuxtLink>
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

    <!-- Certificates List -->
    <main class="p-6 max-w-7xl mx-auto">
      <div class="bg-white rounded-lg shadow-sm overflow-hidden">
        <table class="w-full">
          <thead class="bg-gray-50 border-b">
            <tr>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Certificate</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase hidden md:table-cell">Description</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase hidden sm:table-cell">File</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th class="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
            <tr v-for="item in certificates" :key="item.id" :class="['hover:bg-gray-50', { 'opacity-60': !item.isActive }]">
              <td class="px-4 py-3">
                <div class="flex items-center gap-3">
                  <div v-if="item.imageUrl" class="w-12 h-12 rounded overflow-hidden bg-gray-100 shrink-0">
                    <img :src="item.imageUrl" class="w-full h-full object-cover" />
                  </div>
                  <p class="font-medium text-gray-900 text-sm">{{ item.title }}</p>
                </div>
              </td>
              <td class="px-4 py-3 text-sm text-gray-500 hidden md:table-cell max-w-xs truncate">{{ item.description || '—' }}</td>
              <td class="px-4 py-3 hidden sm:table-cell">
                <a v-if="item.fileUrl" :href="item.fileUrl" target="_blank" class="text-xs text-blue-600 hover:text-blue-700">
                  Download
                </a>
                <span v-else class="text-xs text-gray-400">—</span>
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
        <div v-if="!certificates.length" class="text-center py-12 text-gray-500">No certificates yet</div>
      </div>
    </main>

    <!-- Edit Modal -->
    <div v-if="showForm" class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div class="absolute inset-0 bg-black/50" @click="showForm = false"></div>
      <div class="relative bg-white rounded-xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-6">
        <h2 class="text-lg font-bold text-gray-900 mb-4">{{ editingItem ? 'Edit Certificate' : 'Add Certificate' }}</h2>
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
            <label class="block text-sm font-medium text-gray-700 mb-1">Cover Image</label>
            <input
              type="file"
              accept="image/*"
              class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100"
              @change="handleImageChange"
            />
            <p v-if="form.imageUrl" class="mt-1 text-xs text-gray-400">Current: {{ form.imageUrl }}</p>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Certificate File (PDF)</label>
            <input
              type="file"
              accept=".pdf,.jpg,.png"
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

// Certificates list (include inactive)
const { data: certificatesData, refresh: refreshCertificates } = await useFetch('/api/certificates')
const certificates = computed(() => certificatesData.value?.data || [])

// Form
const showForm = ref(false)
const editingItem = ref<any>(null)
const saving = ref(false)
const form = reactive({
  title: '',
  description: '',
  imageUrl: '',
  fileUrl: '',
  isActive: true,
})

const imageFile = ref<File | null>(null)
const certFile = ref<File | null>(null)

const openForm = (item?: any) => {
  if (item) {
    editingItem.value = item
    form.title = item.title
    form.description = item.description || ''
    form.imageUrl = item.imageUrl || ''
    form.fileUrl = item.fileUrl || ''
    form.isActive = item.isActive
  } else {
    editingItem.value = null
    form.title = ''
    form.description = ''
    form.imageUrl = ''
    form.fileUrl = ''
    form.isActive = true
  }
  imageFile.value = null
  certFile.value = null
  showForm.value = true
}

const handleImageChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  imageFile.value = target.files?.[0] || null
}

const handleFileChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  certFile.value = target.files?.[0] || null
}

const handleSubmit = async () => {
  saving.value = true
  try {
    let imageUrl = form.imageUrl
    let fileUrl = form.fileUrl

    // Upload new image if selected
    if (imageFile.value) {
      const formData = new FormData()
      formData.append('files', imageFile.value)
      const { urls } = await $fetch('/api/upload', { method: 'POST', body: formData })
      imageUrl = urls[0]
    }

    // Upload new certificate file if selected
    if (certFile.value) {
      const formData = new FormData()
      formData.append('files', certFile.value)
      const { urls } = await $fetch('/api/upload', { method: 'POST', body: formData })
      fileUrl = urls[0]
    }

    const body = {
      title: form.title,
      description: form.description,
      imageUrl: imageUrl || form.imageUrl,
      fileUrl: fileUrl || form.fileUrl,
      isActive: form.isActive,
    }

    if (editingItem.value) {
      await $fetch(`/api/certificates/${editingItem.value.id}`, { method: 'PUT', body })
    } else {
      await $fetch('/api/certificates', { method: 'POST', body })
    }
    showForm.value = false
    await refreshCertificates()
  } catch (e: any) {
    alert(e.data?.message || 'Save failed')
  } finally {
    saving.value = false
  }
}

const handleDelete = async (item: any) => {
  if (!confirm(`Delete "${item.title}"?`)) return
  try {
    await $fetch(`/api/certificates/${item.id}`, { method: 'DELETE' })
    await refreshCertificates()
  } catch {
    alert('Delete failed')
  }
}
</script>
