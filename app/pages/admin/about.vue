<template>
  <div class="min-h-screen bg-gray-100">
    <header class="bg-white shadow-sm px-6 py-4 flex items-center justify-between">
      <div class="flex items-center gap-4">
        <NuxtLink to="/admin/products" class="text-gray-500 hover:text-gray-700 text-sm">← Back to Products</NuxtLink>
        <h1 class="text-lg font-bold text-gray-900">About Us Management</h1>
      </div>
      <div class="flex items-center gap-4">
        <NuxtLink to="/admin/contact" class="text-sm text-blue-600 hover:text-blue-700">Contact</NuxtLink>
        <NuxtLink to="/admin/sectors" class="text-sm text-blue-600 hover:text-blue-700">Sectors</NuxtLink>
        <NuxtLink to="/admin/quality" class="text-sm text-blue-600 hover:text-blue-700">Quality</NuxtLink>
        <span class="text-sm text-gray-500">{{ user?.username }}</span>
        <button @click="handleLogout" class="text-sm text-gray-500 hover:text-red-600">Logout</button>
      </div>
    </header>

    <main class="p-6 max-w-4xl mx-auto">
      <div class="space-y-6">
        <div v-for="(section, idx) in sections" :key="idx" class="bg-white rounded-lg shadow-sm p-6">
          <div class="flex items-center justify-between mb-4">
            <input
              v-model="section.title"
              class="text-lg font-semibold text-gray-900 border-b border-transparent hover:border-gray-300 focus:border-blue-500 focus:outline-none bg-transparent"
              placeholder="Section Title"
            />
          </div>
          <RichTextEditor v-model="section.content" />
        </div>
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
const { data: aboutData, refresh } = await useFetch('/api/about')
const sections = ref<{ section: string; title: string; content: string; sortOrder: number }[]>([])

// Initialize sections from API or defaults
const defaultSections = [
  { section: 'company', title: 'Company', content: '' },
  { section: 'management_policy', title: 'Management Policy', content: '' },
  { section: 'services', title: 'Services', content: '' },
]

watchEffect(() => {
  const apiData = aboutData.value?.data
  if (apiData) {
    sections.value = defaultSections.map(def => {
      const existing = apiData[def.section]
      return {
        section: def.section,
        title: existing?.title || def.title,
        content: existing?.content || '',
        sortOrder: 0,
      }
    })
  }
})

const saving = ref(false)

const handleSave = async () => {
  saving.value = true
  try {
    await $fetch('/api/about', {
      method: 'PUT',
      body: {
        sections: sections.value.map((s, idx) => ({ ...s, sortOrder: idx })),
      },
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
