<template>
  <div class="min-h-screen bg-gray-100">
    <header class="bg-white shadow-sm px-6 py-4 flex items-center justify-between">
      <div class="flex items-center gap-4">
        <NuxtLink to="/admin/products" class="text-gray-500 hover:text-gray-700 text-sm">← Back to Products</NuxtLink>
        <h1 class="text-lg font-bold text-gray-900">Contact Info Management</h1>
      </div>
      <div class="flex items-center gap-4">
        <NuxtLink to="/admin/about" class="text-sm text-blue-600 hover:text-blue-700">About</NuxtLink>
        <NuxtLink to="/admin/sectors" class="text-sm text-blue-600 hover:text-blue-700">Sectors</NuxtLink>
        <NuxtLink to="/admin/quality" class="text-sm text-blue-600 hover:text-blue-700">Quality</NuxtLink>
        <span class="text-sm text-gray-500">{{ user?.username }}</span>
        <button @click="handleLogout" class="text-sm text-gray-500 hover:text-red-600">Logout</button>
      </div>
    </header>

    <main class="p-6 max-w-2xl mx-auto">
      <div class="bg-white rounded-lg shadow-sm p-6 space-y-4">
        <div v-for="(item, idx) in items" :key="idx" class="grid grid-cols-3 gap-4 items-center">
          <div>
            <label class="block text-xs text-gray-500 mb-1">Label</label>
            <input
              v-model="item.label"
              class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. Address"
            />
          </div>
          <div class="col-span-2">
            <label class="block text-xs text-gray-500 mb-1">Value</label>
            <input
              v-model="item.value"
              class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. xxxx"
            />
          </div>
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
const { user, fetchUser, logout } = useAuth()
await fetchUser()
const handleLogout = async () => { await logout() }

// Fetch current contact info
const { data: contactData, refresh } = await useFetch('/api/contact')
const items = ref<{ key: string; label: string; value: string }[]>([])

const defaultItems = [
  { key: 'company_name', label: 'Company Name', value: 'PLOVER INDUSTRIAL CO.,LTD' },
  { key: 'address', label: 'Address', value: 'xxxx' },
  { key: 'tel', label: 'Tel', value: '+86 19816553848' },
  { key: 'email', label: 'Email', value: 'charles@ploverindustrial.com' },
]

watchEffect(() => {
  const apiData = contactData.value?.data
  if (apiData) {
    items.value = defaultItems.map(def => {
      const existing = apiData[def.key]
      return {
        key: def.key,
        label: existing?.label || def.label,
        value: existing?.value || def.value,
      }
    })
  }
})

const saving = ref(false)

const handleSave = async () => {
  saving.value = true
  try {
    await $fetch('/api/contact', {
      method: 'PUT',
      body: { items: items.value },
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
