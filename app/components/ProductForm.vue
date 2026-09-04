<template>
  <form @submit.prevent="handleSubmit" class="bg-white rounded-lg shadow-sm p-6 space-y-5">
    <!-- Image Upload -->
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-2">Product Image</label>
      <div class="flex items-start gap-4">
        <div class="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0 border-2 border-dashed border-gray-300">
          <img v-if="imagePreview" :src="imagePreview" class="w-full h-full object-cover" />
        </div>
        <div class="flex-1">
          <input
            type="file"
            accept="image/*"
            class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100"
            @change="handleImageChange"
          />
          <p class="mt-1 text-xs text-gray-400">支持 JPG、PNG 格式，建议尺寸 800x800px</p>
        </div>
      </div>
    </div>

    <!-- Basic Info -->
    <div>
      <h3 class="text-sm font-medium text-gray-900 mb-4">Basic Info</h3>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
          <input
            v-model="form.name"
            type="text"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g. Wafer Butterfly Valve"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Model</label>
          <input
            v-model="form.model"
            type="text"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g. D71X-16"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Brand</label>
          <input
            v-model="form.brand"
            type="text"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g. PLOVER"
          />
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <el-select
              v-model="selectedParent"
              placeholder="Select category"
              :clearable="false"
              class="!w-full"
            >
              <el-option
                v-for="parent in categories"
                :key="parent.id"
                :label="parent.name"
                :value="parent.name"
              />
            </el-select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Sub Category</label>
            <el-select
              v-model="form.category"
              placeholder="Select sub category"
              :disabled="!selectedParent"
              :clearable="false"
              class="!w-full"
            >
              <el-option
                v-for="child in subCategories"
                :key="child.id"
                :label="child.name"
                :value="child.name"
              />
            </el-select>
          </div>
        </div>
      </div>
    </div>

    <!-- Valve Parameters (hidden) -->
    <div class="hidden">
      <input v-model="form.dn" type="hidden" />
      <input v-model="form.pn" type="hidden" />
      <input v-model="form.material" type="hidden" />
      <input v-model="form.connection" type="hidden" />
      <input v-model="form.media" type="hidden" />
      <input v-model="form.temperature" type="hidden" />
    </div>

    <!-- Technical Data -->
    <div class="border-t pt-5">
      <h3 class="text-sm font-medium text-gray-900 mb-4">Technical Data</h3>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Manufacturing Range</label>
          <input
            v-model="form.manufacturingRange"
            type="text"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g. DN32 - DN2000"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Distance Between Flanges</label>
          <input
            v-model="form.distanceBetweenFlanges"
            type="text"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g. EN 558 Series 20"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Installation Between Flanges</label>
          <input
            v-model="form.installationBetweenFlanges"
            type="text"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g. PN10/16-ANSI150 Lbs."
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Flanged</label>
          <input
            v-model="form.flanged"
            type="text"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g. ISO 7005, DIN 2501"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Upper Flange Connection</label>
          <input
            v-model="form.upperFlangeConnection"
            type="text"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g. ISO 5211"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Tests</label>
          <input
            v-model="form.tests"
            type="text"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g. ISO 5208, zero leakage"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Coating</label>
          <input
            v-model="form.coating"
            type="text"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g. Rilsan®"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Working Pressure</label>
          <input
            v-model="form.workingPressure"
            type="text"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g. PN16"
          />
        </div>
      </div>
    </div>

    <!-- Other Info -->
    <div class="border-t pt-5">
      <h3 class="text-sm font-medium text-gray-900 mb-4">Other Info</h3>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Dimensions</label>
          <input
            v-model="form.dimensions"
            type="text"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g. L=200mm, H=150mm"
          />
        </div>
      </div>
      <div class="mt-4">
        <label class="block text-sm font-medium text-gray-700 mb-1">Product Description</label>
        <RichTextEditor v-model="form.description" />
      </div>
    </div>

    <!-- Download Files (Manual & Product Catalog) -->
    <div class="border-t pt-5">
      <h3 class="text-sm font-medium text-gray-900 mb-4">Download Files</h3>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Manual (PDF)</label>
          <input
            type="file"
            accept=".pdf"
            class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100"
            @change="handleManualChange"
          />
          <p v-if="form.manual" class="mt-1 text-xs text-gray-400">Current: {{ form.manual }}</p>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Product Catalog (PDF)</label>
          <input
            type="file"
            accept=".pdf"
            class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100"
            @change="handleCatalogChange"
          />
          <p v-if="form.productCatalog" class="mt-1 text-xs text-gray-400">Current: {{ form.productCatalog }}</p>
        </div>
      </div>
    </div>

    <!-- Properties -->
    <div class="border-t pt-5">
      <h3 class="text-sm font-medium text-gray-900 mb-4">Properties</h3>
      <RichTextEditor v-model="form.properties" />
    </div>

    <!-- General Applications -->
    <div class="border-t pt-5">
      <h3 class="text-sm font-medium text-gray-900 mb-4">General Applications</h3>
      <RichTextEditor v-model="form.generalApplications" />
    </div>

    <!-- Applications Water & Industry -->
    <div class="border-t pt-5">
      <h3 class="text-sm font-medium text-gray-900 mb-4">Applications (Water / Industry)</h3>
      <div class="grid grid-cols-2 gap-6">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Water</label>
          <textarea
            v-model="form.applicationsWater"
            rows="6"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            placeholder="每行一项，如：&#10;城市供水&#10;污水处理&#10;农业灌溉"
          ></textarea>
          <p class="mt-1 text-xs text-gray-400">每行一项</p>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Industry</label>
          <textarea
            v-model="form.applicationsIndustry"
            rows="6"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            placeholder="每行一项，如：&#10;石油化工&#10;电力能源&#10;制药食品"
          ></textarea>
          <p class="mt-1 text-xs text-gray-400">每行一项</p>
        </div>
      </div>
    </div>

    <!-- Actions -->
    <div class="flex items-center justify-end gap-3 pt-4 border-t">
      <button
        type="button"
        @click="$emit('cancel')"
        class="px-5 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition"
      >
        Cancel
      </button>
      <button
        type="submit"
        :disabled="loading"
        class="px-5 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition"
      >
        {{ loading ? 'Saving...' : 'Save' }}
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import RichTextEditor from './RichTextEditor.vue'

const props = defineProps<{
  initialData?: any
  loading?: boolean
}>()

const emit = defineEmits<{
  submit: [data: any]
  cancel: []
}>()

const { data: categoriesData } = await useFetch('/api/products/categories')
const categories = computed<any[]>(() => categoriesData.value?.data || [])

// 父分类选择
const selectedParent = ref('')
const subCategories = computed(() => {
  const parent = categories.value.find((p: any) => p.name === selectedParent.value)
  return parent?.children || []
})

// 当父分类变化时，清空子分类选择
watch(selectedParent, () => {
  form.value.category = ''
})

const defaultForm = {
  name: '',
  model: '',
  brand: '',
  category: '',
  dn: '',
  pn: '',
  material: '',
  connection: '',
  media: '',
  temperature: '',
  dimensions: '',
  description: '',
  manual: '',
  productCatalog: '',
  properties: '',
  generalApplications: '',
  applicationsWater: '',
  applicationsIndustry: '',
  // Technical Data
  manufacturingRange: '',
  distanceBetweenFlanges: '',
  installationBetweenFlanges: '',
  flanged: '',
  upperFlangeConnection: '',
  tests: '',
  coating: '',
  workingPressure: '',
}

const form = ref({ ...defaultForm })
const imagePreview = ref('')
const imageFile = ref<File | null>(null)
const manualFile = ref<File | null>(null)
const catalogFile = ref<File | null>(null)

if (props.initialData) {
  // Parse JSON array to newline-separated text for editing
  const jsonToText = (json: string | null | undefined) => {
    if (!json) return ''
    try {
      const arr = JSON.parse(json)
      return Array.isArray(arr) ? arr.join('\n') : ''
    } catch {
      return ''
    }
  }

  form.value = {
    name: props.initialData.name || '',
    model: props.initialData.model || '',
    brand: props.initialData.brand || '',
    category: props.initialData.category || '',
    dn: props.initialData.dn || '',
    pn: props.initialData.pn || '',
    material: props.initialData.material || '',
    connection: props.initialData.connection || '',
    media: props.initialData.media || '',
    temperature: props.initialData.temperature || '',
    dimensions: props.initialData.dimensions || '',
    description: props.initialData.description || '',
    manual: props.initialData.manual || '',
    productCatalog: props.initialData.productCatalog || '',
    properties: props.initialData.properties || '',
    generalApplications: props.initialData.generalApplications || '',
    applicationsWater: jsonToText(props.initialData.applicationsWater),
    applicationsIndustry: jsonToText(props.initialData.applicationsIndustry),
    manufacturingRange: props.initialData.manufacturingRange || '',
    distanceBetweenFlanges: props.initialData.distanceBetweenFlanges || '',
    installationBetweenFlanges: props.initialData.installationBetweenFlanges || '',
    flanged: props.initialData.flanged || '',
    upperFlangeConnection: props.initialData.upperFlangeConnection || '',
    tests: props.initialData.tests || '',
    coating: props.initialData.coating || '',
    workingPressure: props.initialData.workingPressure || '',
  }
  if (props.initialData.image) {
    imagePreview.value = props.initialData.image
  }
}

// 根据已有子分类自动选中父分类（等 categories 加载后）
watch(categories, (val) => {
  if (props.initialData?.category && val.length) {
    const parent = val.find((p: any) =>
      p.children?.some((c: any) => c.name === props.initialData.category)
    )
    if (parent) selectedParent.value = parent.name
  }
})

const handleImageChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  const file = target.files?.[0]
  if (file) {
    imageFile.value = file
    imagePreview.value = URL.createObjectURL(file)
  }
}

const handleManualChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  manualFile.value = target.files?.[0] || null
}

const handleCatalogChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  catalogFile.value = target.files?.[0] || null
}

const handleSubmit = async () => {
  let imageUrl = props.initialData?.image || null
  let manualUrl = form.value.manual
  let catalogUrl = form.value.productCatalog

  // Upload image if new file selected
  if (imageFile.value) {
    const formData = new FormData()
    formData.append('files', imageFile.value)
    const { urls } = await $fetch('/api/upload', { method: 'POST', body: formData })
    imageUrl = urls[0]
  }

  // Upload manual if new file selected
  if (manualFile.value) {
    const formData = new FormData()
    formData.append('files', manualFile.value)
    const { urls } = await $fetch('/api/upload', { method: 'POST', body: formData })
    manualUrl = urls[0]
  }

  // Upload catalog if new file selected
  if (catalogFile.value) {
    const formData = new FormData()
    formData.append('files', catalogFile.value)
    const { urls } = await $fetch('/api/upload', { method: 'POST', body: formData })
    catalogUrl = urls[0]
  }

  // Convert newline-separated text to JSON arrays
  const textToJson = (text: string) => {
    const arr = text.split('\n').map(s => s.trim()).filter(Boolean)
    return arr.length ? JSON.stringify(arr) : null
  }

  emit('submit', {
    ...form.value,
    image: imageUrl,
    manual: manualUrl,
    productCatalog: catalogUrl,
    applicationsWater: textToJson(form.value.applicationsWater),
    applicationsIndustry: textToJson(form.value.applicationsIndustry),
  })
}
</script>

