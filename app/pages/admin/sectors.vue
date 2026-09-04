<template>
  <div class="min-h-screen bg-gray-100">
    <header class="bg-white shadow-sm px-6 py-4 flex items-center justify-between">
      <div class="flex items-center gap-4">
        <NuxtLink to="/admin/products" class="text-gray-500 hover:text-gray-700 text-sm">← Back to Products</NuxtLink>
        <h1 class="text-lg font-bold text-gray-900">Sectors Management</h1>
      </div>
      <div class="flex items-center gap-4">
        <NuxtLink to="/admin/about" class="text-sm text-blue-600 hover:text-blue-700">About</NuxtLink>
        <NuxtLink to="/admin/contact" class="text-sm text-blue-600 hover:text-blue-700">Contact</NuxtLink>
        <NuxtLink to="/admin/quality" class="text-sm text-blue-600 hover:text-blue-700">Quality</NuxtLink>
        <span class="text-sm text-gray-500">{{ user?.username }}</span>
        <button @click="handleLogout" class="text-sm text-gray-500 hover:text-red-600">Logout</button>
      </div>
    </header>

    <main class="p-6 max-w-4xl mx-auto">
      <div class="space-y-6">
        <div v-for="(sector, sIdx) in sectors" :key="sIdx" class="bg-white rounded-lg shadow-sm p-6">
          <!-- Sector Name -->
          <div class="flex items-center gap-3 mb-4">
            <input
              v-model="sector.name"
              class="text-lg font-semibold text-gray-900 border-b border-transparent hover:border-gray-300 focus:border-blue-500 focus:outline-none bg-transparent"
              placeholder="Sector Name"
            />
            <button
              @click="removeSector(sIdx)"
              class="text-red-500 hover:text-red-700 text-sm"
              title="Delete sector"
            >
              ✕
            </button>
          </div>

          <!-- Items -->
          <div class="space-y-2 ml-4">
            <div v-for="(item, iIdx) in sector.items" :key="iIdx" class="flex items-center gap-2">
              <span class="w-2 h-2 bg-blue-500 rounded-full shrink-0"></span>
              <input
                v-model="item.name"
                class="flex-1 px-3 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Item name"
              />
              <button
                @click="sector.items.splice(iIdx, 1)"
                class="text-gray-400 hover:text-red-500 text-sm"
              >
                ✕
              </button>
            </div>
            <button
              @click="sector.items.push({ name: '' })"
              class="text-sm text-blue-600 hover:text-blue-700 ml-4"
            >
              + Add Item
            </button>
          </div>
        </div>
      </div>

      <!-- Add Sector -->
      <button
        @click="addSector"
        class="mt-4 px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-blue-400 hover:text-blue-600 transition text-sm"
      >
        + Add Sector
      </button>

      <!-- Save -->
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

// Fetch current sectors
const { data: sectorsData, refresh } = await useFetch('/api/sectors')
const sectors = ref<{ id?: number; name: string; sortOrder: number; items: { id?: number; name: string; sortOrder: number }[] }[]>([])

watchEffect(() => {
  const apiData = sectorsData.value?.data
  if (apiData && Array.isArray(apiData)) {
    sectors.value = apiData.map((s: any) => ({
      id: s.id,
      name: s.name,
      sortOrder: s.sortOrder || 0,
      items: (s.items || []).map((i: any) => ({
        id: i.id,
        name: i.name,
        sortOrder: i.sortOrder || 0,
      })),
    }))
  }
})

const addSector = () => {
  sectors.value.push({ name: '', sortOrder: sectors.value.length, items: [] })
}

const removeSector = (idx: number) => {
  if (confirm('Delete this sector?')) {
    sectors.value.splice(idx, 1)
  }
}

const saving = ref(false)

const handleSave = async () => {
  saving.value = true
  try {
    await $fetch('/api/sectors', {
      method: 'PUT',
      body: {
        sectors: sectors.value.map((s, sIdx) => ({
          ...s,
          sortOrder: sIdx,
          items: s.items.map((item, iIdx) => ({ ...item, sortOrder: iIdx })),
        })),
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
