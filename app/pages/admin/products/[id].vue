<template>
  <div class="min-h-screen bg-gray-100">
    <header class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <div class="flex items-center gap-4">
          <NuxtLink to="/admin/products" class="text-gray-500 hover:text-gray-700">← 返回</NuxtLink>
          <h1 class="text-xl font-bold text-gray-900">编辑产品</h1>
        </div>
        <div class="flex items-center gap-4">
          <span class="text-sm text-gray-500">{{ user?.username }}</span>
          <button @click="handleLogout" class="text-sm text-gray-500 hover:text-red-600">退出登录</button>
        </div>
      </div>
    </header>

    <main class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <ProductForm
        v-if="product"
        :initial-data="product"
        :loading="loading"
        @submit="handleSubmit"
        @cancel="navigateTo('/admin/products')"
      />
      <div v-else class="text-center py-12 text-gray-500">加载中...</div>
    </main>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const loading = ref(false)

const { data } = await useFetch(`/api/products/${route.params.id}`)
const product = computed(() => data.value?.data)

const { user, fetchUser, logout } = useAuth()
await fetchUser()
const handleLogout = async () => { await logout() }

const handleSubmit = async (formData: any) => {
  loading.value = true
  try {
    await $fetch(`/api/products/${route.params.id}`, {
      method: 'PUT',
      body: formData
    })
    navigateTo('/admin/products')
  } catch (e: any) {
    alert(e.data?.message || '保存失败')
  } finally {
    loading.value = false
  }
}
</script>
