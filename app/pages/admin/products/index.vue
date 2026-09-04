<template>
  <div class="min-h-screen bg-gray-100 flex">
    <!-- Sidebar: 分类树 -->
    <aside class="w-56 bg-white border-r border-gray-200 flex flex-col flex-shrink-0">
      <div class="p-4 border-b border-gray-200">
        <h2 class="text-sm font-semibold text-gray-900">产品分类</h2>
      </div>

      <nav class="flex-1 overflow-y-auto py-2">
        <button
          :class="[
            'w-full flex items-center justify-between px-4 py-2 text-sm transition',
            selectedCategoryId === null
              ? 'bg-blue-50 text-blue-600 font-medium'
              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
          ]"
          @click="selectCategory(null)"
        >
          <span>全部产品</span>
          <span class="text-xs text-gray-400">{{ totalProductCount }}</span>
        </button>

        <!-- 层级分类：父分类 + 子分类 -->
        <div v-for="parent in categories" :key="parent.id">
          <!-- 父分类标题 -->
          <div class="group relative">
            <div
              :class="[
                'flex items-center justify-between px-4 py-2 text-sm font-medium transition',
                selectedCategoryId === parent.id
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-700 hover:bg-gray-50'
              ]"
            >
              <button class="flex-1 text-left truncate flex items-center gap-1" @click="selectCategory(parent.id)">
                <svg class="w-3 h-3 transition-transform" :class="expandedParents.includes(parent.id) ? 'rotate-90' : ''" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
                {{ parent.name }}
              </button>
              <span class="text-xs text-gray-400 mr-1">{{ parent.children?.reduce((s: number, c: any) => s + c.productCount, 0) || 0 }}</span>
              <span class="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition">
                <button class="p-0.5 text-gray-400 hover:text-blue-600 rounded" title="添加子分类" @click.stop="startAddChild(parent.id)">
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                  </svg>
                </button>
                <button class="p-0.5 text-gray-400 hover:text-red-600 rounded" title="删除" @click.stop="handleDeleteCategory(parent)">
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </span>
            </div>
          </div>

          <!-- 子分类列表 -->
          <div v-if="expandedParents.includes(parent.id)" v-for="child in parent.children" :key="child.id" class="ml-4 group relative">
            <!-- 编辑模式 -->
            <div v-if="editingCategoryId === child.id" class="px-3 py-1.5">
              <input
                v-model="editingCategoryName"
                type="text"
                class="w-full px-2 py-1 text-xs border border-blue-400 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                @keyup.enter="handleEditCategory(child.id)"
                @keyup.escape="editingCategoryId = null"
                autofocus
              />
              <div class="flex gap-1 mt-1.5">
                <button class="flex-1 px-2 py-0.5 text-xs bg-blue-600 text-white rounded hover:bg-blue-700" @click="handleEditCategory(child.id)">确定</button>
                <button class="flex-1 px-2 py-0.5 text-xs border border-gray-300 rounded hover:bg-gray-50" @click="editingCategoryId = null">取消</button>
              </div>
            </div>

            <!-- 正常显示模式 -->
            <div
              v-else
              :class="[
                'flex items-center justify-between px-3 py-1.5 text-sm transition',
                selectedCategoryId === child.id
                  ? 'bg-blue-50 text-blue-600 font-medium'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              ]"
            >
              <button class="flex-1 text-left truncate" @click="selectCategory(child.id)">
                {{ child.name }}
              </button>
              <span :class="['text-xs mr-1', selectedCategoryId === child.id ? 'text-blue-400' : 'text-gray-400']">
                {{ child.productCount }}
              </span>
              <span class="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition">
                <button class="p-0.5 text-gray-400 hover:text-blue-600 rounded" title="编辑" @click.stop="startEditCategory(child)">
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
                <button class="p-0.5 text-gray-400 hover:text-red-600 rounded" title="删除" @click.stop="handleDeleteCategory(child)">
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </span>
            </div>
          </div>

          <!-- 添加子分类输入框 -->
          <div v-if="addingChildParentId === parent.id" class="ml-4 px-3 py-1.5">
            <input
              v-model="newCategoryName"
              type="text"
              placeholder="子分类名称"
              class="w-full px-2 py-1 text-xs border border-blue-400 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
              @keyup.enter="handleAddChild"
              @keyup.escape="addingChildParentId = null; newCategoryName = ''"
              autofocus
            />
            <div class="flex gap-1 mt-1.5">
              <button class="flex-1 px-2 py-0.5 text-xs bg-blue-600 text-white rounded hover:bg-blue-700" @click="handleAddChild">确定</button>
              <button class="flex-1 px-2 py-0.5 text-xs border border-gray-300 rounded hover:bg-gray-50" @click="addingChildParentId = null; newCategoryName = ''">取消</button>
            </div>
          </div>
        </div>

        <div v-if="!categories.length" class="px-4 py-6 text-center text-xs text-gray-400">
          暂无分类
        </div>
      </nav>

      <!-- 添加父分类 -->
      <div class="p-3 border-t border-gray-200">
        <button
          v-if="!showAddCategory"
          class="w-full flex items-center justify-center gap-1 px-3 py-1.5 text-xs text-blue-600 border border-dashed border-blue-300 rounded-lg hover:bg-blue-50 transition"
          @click="showAddCategory = true"
        >
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          添加父分类
        </button>
        <div v-else class="space-y-2">
          <input
            v-model="newCategoryName"
            type="text"
            placeholder="父分类名称"
            class="w-full px-2 py-1.5 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
            @keyup.enter="handleAddParentCategory"
            @keyup.escape="showAddCategory = false"
          />
          <div class="flex gap-1">
            <button class="flex-1 px-2 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700" @click="handleAddParentCategory">确定</button>
            <button class="flex-1 px-2 py-1 text-xs border border-gray-300 rounded hover:bg-gray-50" @click="showAddCategory = false; newCategoryName = ''">取消</button>
          </div>
        </div>
      </div>
    </aside>

    <!-- 右侧内容区 -->
    <div class="flex-1 flex flex-col min-w-0">
      <!-- Admin Header -->
      <header class="bg-white shadow-sm px-6 py-4 flex items-center justify-between flex-shrink-0">
        <div class="flex items-center gap-4">
          <h1 class="text-lg font-bold text-gray-900">
            {{ selectedCategoryId ? selectedCategoryDisplay : '全部产品' }}
          </h1>
          <span class="text-sm text-gray-400">共 {{ filteredProductCount }} 个</span>
          <NuxtLink
            :to="`/admin/products/new${selectedCategoryId ? '?categoryId=' + selectedCategoryId : ''}`"
            class="px-4 py-1.5 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition"
          >
            + 添加产品
          </NuxtLink>
        </div>
        <div class="flex items-center gap-4">
          <NuxtLink to="/admin/slides" class="text-sm text-blue-600 hover:text-blue-700">
            Slides
          </NuxtLink>
          <NuxtLink to="/admin/posts" class="text-sm text-blue-600 hover:text-blue-700">
            Posts
          </NuxtLink>
          <NuxtLink to="/admin/downloads" class="text-sm text-blue-600 hover:text-blue-700">
            Downloads
          </NuxtLink>
          <NuxtLink to="/admin/certificates" class="text-sm text-blue-600 hover:text-blue-700">
            Certificates
          </NuxtLink>
          <span class="text-gray-300">|</span>
          <NuxtLink to="/admin/about" class="text-sm text-gray-600 hover:text-blue-700">
            About
          </NuxtLink>
          <NuxtLink to="/admin/contact" class="text-sm text-gray-600 hover:text-blue-700">
            Contact
          </NuxtLink>
          <NuxtLink to="/admin/sectors" class="text-sm text-gray-600 hover:text-blue-700">
            Sectors
          </NuxtLink>
          <NuxtLink to="/admin/quality" class="text-sm text-gray-600 hover:text-blue-700">
            Quality
          </NuxtLink>
          <span class="text-gray-300">|</span>
          <span class="text-sm text-gray-500">{{ user?.username }}</span>
          <button
            @click="handleLogout"
            class="text-sm text-gray-500 hover:text-red-600 transition"
          >
            Logout
          </button>
        </div>
      </header>

      <!-- 批量操作栏 -->
      <div v-if="selectedIds.length > 0" class="bg-blue-50 border-b px-6 py-3 flex items-center justify-between flex-shrink-0">
        <span class="text-sm text-blue-700">已选中 <strong>{{ selectedIds.length }}</strong> 个产品</span>
        <div class="flex items-center gap-2">
          <select
            v-model="batchCategoryId"
            class="text-xs border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="">移动到子分类...</option>
            <optgroup v-for="parent in categories" :key="parent.id" :label="parent.name">
              <option v-for="child in parent.children" :key="child.id" :value="child.id">
                {{ child.name }}
              </option>
            </optgroup>
          </select>
          <button class="text-xs px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700" @click="handleBatch('activate')">上架</button>
          <button class="text-xs px-3 py-1 bg-yellow-600 text-white rounded hover:bg-yellow-700" @click="handleBatch('deactivate')">下架</button>
          <button class="text-xs px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700" @click="handleBatch('delete')">删除</button>
          <button class="text-xs px-3 py-1 border border-gray-300 rounded hover:bg-gray-50" @click="selectedIds = []">取消选择</button>
        </div>
      </div>

      <!-- 产品列表 -->
      <main class="flex-1 p-6 overflow-y-auto">
        <div class="bg-white rounded-lg shadow-sm overflow-hidden">
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead class="bg-gray-50 border-b">
                <tr>
                  <th class="px-3 py-3 w-10">
                    <input
                      type="checkbox"
                      :checked="allSelected"
                      class="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                      @change="toggleSelectAll"
                    />
                  </th>
                  <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">产品</th>
                  <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase hidden sm:table-cell">型号</th>
                  <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase hidden md:table-cell">类别</th>
                  <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase hidden md:table-cell">口径</th>
                  <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">状态</th>
                  <th class="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">操作</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-100">
                <tr
                  v-for="product in products"
                  :key="product.id"
                  :class="['hover:bg-gray-50', { 'opacity-60': !product.isActive }]"
                >
                  <td class="px-3 py-3">
                    <input
                      type="checkbox"
                      :checked="selectedIds.includes(product.id)"
                      class="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                      @change="toggleSelect(product.id)"
                    />
                  </td>
                  <td class="px-4 py-3">
                    <div class="flex items-center gap-3">
                      <div class="w-10 h-10 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                        <img v-if="product.image" :src="product.image" class="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p class="font-medium text-gray-900 text-sm">{{ product.name }}</p>
                        <p class="text-xs text-gray-500">{{ product.brand }}</p>
                      </div>
                    </div>
                  </td>
                  <td class="px-4 py-3 text-sm text-gray-600 hidden sm:table-cell">{{ product.model }}</td>
                  <td class="px-4 py-3 hidden md:table-cell">
                    <span class="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded">{{ product.category }}</span>
                  </td>
                  <td class="px-4 py-3 text-sm text-gray-600 hidden md:table-cell">{{ product.dn }}</td>
                  <td class="px-4 py-3">
                    <div class="flex items-center gap-2">
                      <span
                        :class="[
                          'text-xs px-2 py-0.5 rounded',
                          product.isActive ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-400'
                        ]"
                      >
                        {{ product.isActive ? '上架' : '下架' }}
                      </span>
                      <button
                        :title="product.isFeatured ? '取消推荐' : '设为推荐'"
                        class="text-gray-300 hover:text-yellow-500 transition"
                        @click="toggleFeatured(product)"
                      >
                        <svg class="w-4 h-4" :class="product.isFeatured ? 'text-yellow-500 fill-yellow-500' : ''" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                        </svg>
                      </button>
                    </div>
                  </td>
                  <td class="px-4 py-3 text-right">
                    <div class="flex items-center justify-end gap-2">
                      <NuxtLink
                        :to="`/admin/products/${product.id}`"
                        class="text-sm text-blue-600 hover:text-blue-700"
                      >
                        编辑
                      </NuxtLink>
                      <button
                        @click="confirmDelete(product)"
                        class="text-sm text-red-600 hover:text-red-700"
                      >
                        删除
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div v-if="!products.length" class="text-center py-12 text-gray-500">
            {{ selectedCategoryId ? '该分类下暂无产品' : '暂无产品' }}，点击"添加产品"开始添加
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
// 分类数据
const { data: categoriesData, refresh: refreshCategories } = await useFetch('/api/products/categories')
const categories = computed<any[]>(() => categoriesData.value?.data || [])

// 计算所有产品总数（所有子分类产品数之和）
const totalProductCount = computed(() => {
  return categories.value.reduce((sum, p) => {
    return sum + (p.children?.reduce((s: number, c: any) => s + c.productCount, 0) || 0)
  }, 0)
})

// 当前选中的分类
const selectedCategoryId = ref<number | null>(null)
const selectCategory = (id: number | null) => {
  selectedCategoryId.value = id
}

// 展开的父分类
const expandedParents = ref<number[]>([])
// 默认展开所有父分类
watch(categories, (val) => {
  if (val.length && expandedParents.value.length === 0) {
    expandedParents.value = val.map((p: any) => p.id)
  }
}, { immediate: true })

// 产品列表（后台包含已下架产品）
const { data: productsData, refresh: refreshProducts } = await useFetch('/api/products', {
  query: {
    limit: '100',
    categoryId: selectedCategoryId,
    includeInactive: 'true',
  },
  watch: [selectedCategoryId],
})
const products = computed(() => productsData.value?.data || [])
const filteredProductCount = computed(() => products.value.length)

// 获取当前选中分类的名称（显示父 > 子）
const selectedCategoryDisplay = computed(() => {
  if (!selectedCategoryId.value) return ''
  for (const parent of categories.value) {
    if (parent.id === selectedCategoryId.value) return parent.name
    for (const child of parent.children || []) {
      if (child.id === selectedCategoryId.value) {
        return `${parent.name} > ${child.name}`
      }
    }
  }
  return ''
})

// 添加父分类
const showAddCategory = ref(false)
const newCategoryName = ref('')
const handleAddParentCategory = async () => {
  const name = newCategoryName.value.trim()
  if (!name) return
  try {
    await $fetch('/api/products/categories', {
      method: 'POST',
      body: { name },
    })
    newCategoryName.value = ''
    showAddCategory.value = false
    await refreshCategories()
  } catch (e: any) {
    alert(e.data?.message || '添加失败')
  }
}

// 添加子分类
const addingChildParentId = ref<number | null>(null)
const startAddChild = (parentId: number) => {
  addingChildParentId.value = parentId
  newCategoryName.value = ''
}
const handleAddChild = async () => {
  const name = newCategoryName.value.trim()
  if (!name || !addingChildParentId.value) return
  try {
    await $fetch('/api/products/categories', {
      method: 'POST',
      body: { name, parentId: addingChildParentId.value },
    })
    newCategoryName.value = ''
    addingChildParentId.value = null
    await refreshCategories()
  } catch (e: any) {
    alert(e.data?.message || '添加失败')
  }
}

// 编辑分类
const editingCategoryId = ref<number | null>(null)
const editingCategoryName = ref('')
const startEditCategory = (cat: any) => {
  editingCategoryId.value = cat.id
  editingCategoryName.value = cat.name
}
const handleEditCategory = async (id: number) => {
  const name = editingCategoryName.value.trim()
  if (!name) return
  try {
    await $fetch(`/api/products/categories/${id}`, {
      method: 'PUT',
      body: { name },
    })
    editingCategoryId.value = null
    await refreshCategories()
  } catch (e: any) {
    alert(e.data?.message || '修改失败')
  }
}

// 删除分类
const handleDeleteCategory = async (cat: any) => {
  if (cat.productCount > 0) {
    if (!confirm(`「${cat.name}」下有 ${cat.productCount} 个产品，删除后这些产品将变为未分类。确定删除吗？`)) return
  } else {
    if (!confirm(`确定要删除分类「${cat.name}」吗？`)) return
  }
  try {
    await $fetch(`/api/products/categories/${cat.id}`, { method: 'DELETE' })
    // 如果删除的是当前选中的分类，回到全部
    if (selectedCategoryId.value === cat.id) {
      selectedCategoryId.value = null
    }
    await refreshCategories()
    await refreshProducts()
  } catch (e: any) {
    alert(e.data?.message || '删除失败')
  }
}

// 退出登录
const { user, fetchUser, logout } = useAuth()
await fetchUser()
const handleLogout = async () => {
  await logout()
}

// 删除产品
const confirmDelete = async (product: any) => {
  if (!confirm(`确定要删除「${product.name}」吗？`)) return
  try {
    await $fetch(`/api/products/${product.id}`, { method: 'DELETE' })
    await refreshProducts()
    await refreshCategories()
  } catch {
    alert('删除失败，请重试')
  }
}

// 推荐切换
const toggleFeatured = async (product: any) => {
  try {
    await $fetch('/api/products/featured', {
      method: 'PATCH',
      body: { id: product.id, isFeatured: !product.isFeatured },
    })
    await refreshProducts()
  } catch {
    alert('操作失败')
  }
}

// 批量选择
const selectedIds = ref<number[]>([])
const batchCategoryId = ref<string>('')
const allSelected = computed(() => products.value.length > 0 && selectedIds.value.length === products.value.length)
const toggleSelect = (id: number) => {
  const idx = selectedIds.value.indexOf(id)
  if (idx > -1) selectedIds.value.splice(idx, 1)
  else selectedIds.value.push(id)
}
const toggleSelectAll = () => {
  if (allSelected.value) {
    selectedIds.value = []
  } else {
    selectedIds.value = products.value.map((p: any) => p.id)
  }
}

// 批量操作
const handleBatch = async (action: string) => {
  if (selectedIds.value.length === 0) return

  if (action === 'delete') {
    if (!confirm(`确定要删除选中的 ${selectedIds.value.length} 个产品吗？`)) return
  }
  if (action === 'setCategory') {
    if (!batchCategoryId.value) return
  }

  try {
    const body: any = { ids: selectedIds.value, action }
    if (action === 'setCategory') {
      body.categoryId = Number(batchCategoryId.value)
    }
    await $fetch('/api/products/batch', { method: 'PATCH', body })
    selectedIds.value = []
    batchCategoryId.value = ''
    await refreshProducts()
    await refreshCategories()
  } catch (e: any) {
    alert(e.data?.message || '操作失败')
  }
}

// 监听分类变化时清空选择
watch(selectedCategoryId, () => {
  selectedIds.value = []
})
</script>
