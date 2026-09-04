<template>
  <div class="bg-white rounded-lg shadow-sm overflow-hidden">
    <h3 class="text-lg font-semibold px-6 py-4 border-b bg-gray-50">技术参数</h3>
    <table class="w-full">
      <tbody class="divide-y divide-gray-100">
        <tr v-for="param in params" :key="param.label" class="hover:bg-gray-50">
          <td class="px-6 py-3 text-sm text-gray-500 w-32 bg-gray-50/50">{{ param.label }}</td>
          <td class="px-6 py-3 text-sm text-gray-900">{{ param.value || '-' }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  product: {
    model: string
    brand: string
    category: string
    dn: string
    pn: string
    material: string
    connection: string
    media: string
    temperature: string
    dimensions: string | null
    description: string | null
  }
}>()

const params = computed(() => [
  { label: '型号', value: props.product.model },
  { label: '品牌', value: props.product.brand },
  { label: '类别', value: props.product.category },
  { label: '口径', value: props.product.dn },
  { label: '压力等级', value: props.product.pn },
  { label: '材质', value: props.product.material },
  { label: '连接方式', value: props.product.connection },
  { label: '适用介质', value: props.product.media },
  { label: '温度范围', value: props.product.temperature },
  { label: '外形尺寸', value: props.product.dimensions },
])
</script>
