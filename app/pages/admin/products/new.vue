<template>
  <div class="min-h-screen bg-gray-100">
    <header class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <div class="flex items-center gap-4">
          <NuxtLink to="/admin/products" class="text-gray-500 hover:text-gray-700">← 返回</NuxtLink>
          <h1 class="text-xl font-bold text-gray-900">添加产品</h1>
        </div>
        <div class="flex items-center gap-4">
          <span class="text-sm text-gray-500">{{ user?.username }}</span>
          <button @click="handleLogout" class="text-sm text-gray-500 hover:text-red-600">退出登录</button>
        </div>
      </div>
    </header>

    <main class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <ProductForm
        :loading="loading"
        @submit="handleSubmit"
        @cancel="navigateTo('/admin/products')"
      />
    </main>
  </div>
</template>

<script setup lang="ts">
const loading = ref(false)
const { user, fetchUser, logout } = useAuth()
await fetchUser()
const handleLogout = async () => { await logout() }

const handleSubmit = async (formData: any) => {
  loading.value = true
  try {
    await $fetch('/api/products', {
      method: 'POST',
      body: formData
    })
    navigateTo('/admin/products')
  } catch (e: any) {
    alert(e.data?.message || '添加失败')
  } finally {
    loading.value = false
  }
}
</script>
