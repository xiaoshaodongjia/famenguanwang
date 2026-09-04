<template>
  <div class="min-h-screen bg-gray-100 flex">
    <!-- 复用左侧分类栏改为询价筛选 -->
    <aside class="w-56 bg-white border-r border-gray-200 flex flex-col flex-shrink-0">
      <div class="p-4 border-b border-gray-200">
        <h2 class="text-sm font-semibold text-gray-900">询价管理</h2>
      </div>
      <nav class="flex-1 overflow-y-auto py-2">
        <button
          :class="[
            'w-full flex items-center justify-between px-4 py-2 text-sm transition',
            selectedStatus === ''
              ? 'bg-blue-50 text-blue-600 font-medium'
              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
          ]"
          @click="selectedStatus = ''"
        >
          <span>全部询价</span>
          <span class="text-xs text-gray-400">{{ stats.total || 0 }}</span>
        </button>
        <button
          :class="[
            'w-full flex items-center justify-between px-4 py-2 text-sm transition',
            selectedStatus === 'pending'
              ? 'bg-blue-50 text-blue-600 font-medium'
              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
          ]"
          @click="selectedStatus = 'pending'"
        >
          <span>待处理</span>
          <span class="text-xs text-gray-400">{{ stats.pending || 0 }}</span>
        </button>
        <button
          :class="[
            'w-full flex items-center justify-between px-4 py-2 text-sm transition',
            selectedStatus === 'contacted'
              ? 'bg-blue-50 text-blue-600 font-medium'
              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
          ]"
          @click="selectedStatus = 'contacted'"
        >
          <span>已联系</span>
          <span class="text-xs text-gray-400">{{ stats.contacted || 0 }}</span>
        </button>
        <button
          :class="[
            'w-full flex items-center justify-between px-4 py-2 text-sm transition',
            selectedStatus === 'completed'
              ? 'bg-blue-50 text-blue-600 font-medium'
              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
          ]"
          @click="selectedStatus = 'completed'"
        >
          <span>已完成</span>
          <span class="text-xs text-gray-400">{{ stats.completed || 0 }}</span>
        </button>
      </nav>
    </aside>

    <!-- 右侧内容 -->
    <div class="flex-1 flex flex-col min-w-0">
      <header class="bg-white shadow-sm px-6 py-4 flex items-center justify-between flex-shrink-0">
        <div class="flex items-center gap-4">
          <h1 class="text-lg font-bold text-gray-900">
            {{ statusLabel }}
          </h1>
          <span class="text-sm text-gray-400">共 {{ inquiries.length }} 条</span>
        </div>
        <div class="flex items-center gap-4">
          <span class="text-sm text-gray-500">{{ user?.username }}</span>
          <button @click="handleLogout" class="text-sm text-gray-500 hover:text-red-600">退出登录</button>
        </div>
      </header>

      <main class="flex-1 p-6 overflow-y-auto">
        <div v-if="inquiries.length" class="space-y-4">
          <div
            v-for="inq in inquiries"
            :key="inq.id"
            class="bg-white rounded-lg shadow-sm p-5"
          >
            <div class="flex items-start justify-between">
              <div class="flex-1">
                <div class="flex items-center gap-3 mb-2">
                  <h3 class="font-medium text-gray-900">{{ inq.name }}</h3>
                  <span
                    :class="[
                      'text-xs px-2 py-0.5 rounded',
                      inq.status === 'pending' ? 'bg-yellow-50 text-yellow-600' :
                      inq.status === 'contacted' ? 'bg-blue-50 text-blue-600' :
                      'bg-green-50 text-green-600'
                    ]"
                  >
                    {{ statusText(inq.status) }}
                  </span>
                  <span v-if="inq.productId" class="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded">
                    关联产品 #{{ inq.productId }}
                  </span>
                </div>

                <div class="grid grid-cols-2 gap-x-6 gap-y-1 text-sm text-gray-500 mb-3">
                  <span>电话：{{ inq.phone }}</span>
                  <span v-if="inq.email">邮箱：{{ inq.email }}</span>
                  <span v-if="inq.company">公司：{{ inq.company }}</span>
                  <span>时间：{{ formatDate(inq.createdAt) }}</span>
                </div>

                <div class="text-sm text-gray-700 bg-gray-50 rounded p-3">
                  <strong class="text-gray-500">询价内容：</strong>{{ inq.message }}
                </div>

                <div v-if="inq.remark" class="mt-2 text-sm text-blue-600 bg-blue-50 rounded p-3">
                  <strong>备注：</strong>{{ inq.remark }}
                </div>
              </div>

              <div class="flex flex-col gap-2 ml-4">
                <select
                  :value="inq.status"
                  class="text-xs border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  @change="updateStatus(inq.id, ($event.target as HTMLSelectElement).value)"
                >
                  <option value="pending">待处理</option>
                  <option value="contacted">已联系</option>
                  <option value="completed">已完成</option>
                </select>
                <button
                  class="text-xs text-blue-600 hover:text-blue-700"
                  @click="editRemark(inq)"
                >
                  添加备注
                </button>
              </div>
            </div>
          </div>
        </div>

        <div v-else class="text-center py-16 text-gray-500">
          暂无询价记录
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
const { user, fetchUser, logout } = useAuth()
await fetchUser()
const handleLogout = async () => { await logout() }

// 统计数据
const { data: statsData } = await useFetch('/api/inquiries/stats')
const stats = computed(() => statsData.value?.data || { total: 0, pending: 0, contacted: 0, completed: 0 })

// 状态筛选
const selectedStatus = ref('')
const statusLabel = computed(() => {
  const map: Record<string, string> = {
    '': '全部询价',
    pending: '待处理',
    contacted: '已联系',
    completed: '已完成',
  }
  return map[selectedStatus.value] || '询价列表'
})

// 询价列表
const { data: inquiriesData, refresh: refreshInquiries } = await useFetch('/api/inquiries', {
  query: { status: selectedStatus },
  watch: [selectedStatus],
})
const inquiries = computed(() => inquiriesData.value?.data || [])

const statusText = (s: string) => {
  const map: Record<string, string> = { pending: '待处理', contacted: '已联系', completed: '已完成' }
  return map[s] || s
}

const formatDate = (d: string) => {
  return new Date(d).toLocaleString('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' })
}

const updateStatus = async (id: number, status: string) => {
  try {
    await $fetch(`/api/inquiries/${id}`, {
      method: 'PATCH',
      body: { status },
    })
    await refreshInquiries()
  } catch {
    alert('操作失败')
  }
}

const editRemark = async (inq: any) => {
  const remark = prompt('请输入备注：', inq.remark || '')
  if (remark === null) return
  try {
    await $fetch(`/api/inquiries/${inq.id}`, {
      method: 'PATCH',
      body: { remark },
    })
    await refreshInquiries()
  } catch {
    alert('操作失败')
  }
}
</script>
