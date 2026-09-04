<template>
  <div class="min-h-screen bg-gray-100">
    <header class="bg-white shadow-sm px-6 py-4 flex items-center justify-between">
      <div class="flex items-center gap-4">
        <NuxtLink to="/admin/products" class="text-gray-500 hover:text-gray-700 text-sm">← Back to Products</NuxtLink>
        <h1 class="text-lg font-bold text-gray-900">Quality & Certificates - Content</h1>
      </div>
      <div class="flex items-center gap-4">
        <NuxtLink to="/admin/about" class="text-sm text-blue-600 hover:text-blue-700">About</NuxtLink>
        <NuxtLink to="/admin/contact" class="text-sm text-blue-600 hover:text-blue-700">Contact</NuxtLink>
        <NuxtLink to="/admin/sectors" class="text-sm text-blue-600 hover:text-blue-700">Sectors</NuxtLink>
        <NuxtLink to="/admin/certificates" class="text-sm text-blue-600 hover:text-blue-700">Certificates</NuxtLink>
        <span class="text-sm text-gray-500">{{ user?.username }}</span>
        <button @click="handleLogout" class="text-sm text-gray-500 hover:text-red-600">Logout</button>
      </div>
    </header>

    <main class="p-6 max-w-4xl mx-auto">
      <div class="bg-white rounded-lg shadow-sm p-6">
        <h2 class="text-sm font-semibold text-gray-900 mb-4">Quality Commitment Content</h2>
        <RichTextEditor v-model="content" />
      </div>

      <div class="flex justify-end mt-6">
        <button
          @click="handleSave"
          :disabled="saving"
          class="px-6 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 transition"
        >
          {{ saving ? 'Saving...' : 'Save Changes' }}
        </button>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import RichTextEditor from '~/components/RichTextEditor.vue'

const { user, fetchUser, logout } = useAuth()
await fetchUser()
const handleLogout = async () => { await logout() }

// Fetch current content
const { data: qualityData, refresh } = await useFetch('/api/quality')
const content = ref('')

watchEffect(() => {
  const apiData = qualityData.value?.data
  if (apiData) {
    content.value = apiData.content || ''
  }
})

const saving = ref(false)

const handleSave = async () => {
  saving.value = true
  try {
    await $fetch('/api/quality', {
      method: 'PUT',
      body: { content: content.value },
    })
    alert('Saved successfully!')
    await refresh()
  } catch (e: any) {
    alert(e.data?.message || 'Save failed')
  } finally {
    saving.value = false
  }
}
</script>
