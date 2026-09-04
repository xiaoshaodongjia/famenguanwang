<template>
  <div class="rich-text-editor border border-gray-300 rounded-lg overflow-hidden">
    <!-- 工具栏 -->
    <div class="flex flex-wrap items-center gap-1 px-3 py-2 bg-gray-50 border-b">
      <button
        v-for="tool in tools"
        :key="tool.action"
        :title="tool.title"
        :class="[
          'p-1.5 rounded text-sm transition',
          isActive(tool.action) ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-200'
        ]"
        type="button"
        @click="runAction(tool.action)"
      >
        <span v-html="tool.icon"></span>
      </button>

      <span class="w-px h-5 bg-gray-300 mx-1"></span>

      <!-- 图片上传 -->
      <button title="上传图片" class="p-1.5 rounded text-sm text-gray-600 hover:bg-gray-200 transition" type="button" @click="triggerImageUpload">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
      </button>

      <!-- 插入视频 -->
      <button title="插入视频" class="p-1.5 rounded text-sm text-gray-600 hover:bg-gray-200 transition" type="button" @click="showVideoDialog = true">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
      </button>

      <input ref="imageInput" type="file" accept="image/*" class="hidden" @change="handleImageUpload" />
    </div>

    <!-- 编辑区 -->
    <EditorContent :editor="editor" class="prose max-w-none p-4 min-h-[150px] focus:outline-none" />

    <!-- 视频对话框 -->
    <div v-if="showVideoDialog" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50" @click.self="showVideoDialog = false">
      <div class="bg-white rounded-lg shadow-xl p-6 w-full max-w-md mx-4">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">插入视频</h3>
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-2">上传视频文件</label>
          <input type="file" accept="video/*" class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100" @change="handleVideoUpload" />
          <p class="mt-1 text-xs text-gray-400">支持 MP4、MOV 格式</p>
        </div>
        <div class="flex items-center gap-3 my-4">
          <span class="flex-1 h-px bg-gray-200"></span>
          <span class="text-xs text-gray-400">或</span>
          <span class="flex-1 h-px bg-gray-200"></span>
        </div>
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-2">视频链接 / iframe 代码</label>
          <textarea v-model="videoUrl" rows="3" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" placeholder="粘贴视频 URL 或 iframe 嵌入代码"></textarea>
        </div>
        <div class="flex justify-end gap-3">
          <button type="button" class="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition" @click="showVideoDialog = false">取消</button>
          <button type="button" class="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition" @click="insertVideo">插入</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, shallowRef } from 'vue'
import { EditorContent, Node } from '@tiptap/vue-3'
import { Editor } from '@tiptap/core'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import { Table } from '@tiptap/extension-table'
import { TableRow } from '@tiptap/extension-table-row'
import { TableHeader } from '@tiptap/extension-table-header'
import { TableCell } from '@tiptap/extension-table-cell'

const props = defineProps<{ modelValue?: string }>()
const emit = defineEmits<{ 'update:modelValue': [value: string] }>()

const tools = [
  { action: 'bold', title: '粗体', icon: '<b>B</b>' },
  { action: 'italic', title: '斜体', icon: '<i>I</i>' },
  { action: 'underline', title: '下划线', icon: '<u>U</u>' },
  { action: 'heading2', title: '标题', icon: '<b>H</b>' },
  { action: 'bulletList', title: '无序列表', icon: '&#8226;-' },
  { action: 'orderedList', title: '有序列表', icon: '1.-' },
  { action: 'blockquote', title: '引用', icon: '&#8220;' },
  { action: 'table', title: '插入表格', icon: '&#9776;&#9776;' },
  { action: 'addColumnBefore', title: '左侧插入列', icon: '&#8592;|' },
  { action: 'addColumnAfter', title: '右侧插入列', icon: '|&#8594;' },
  { action: 'addRowBefore', title: '上方插入行', icon: '&#8593;|' },
  { action: 'addRowAfter', title: '下方插入行', icon: '|&#8595;' },
  { action: 'deleteColumn', title: '删除列', icon: '&#10005;|' },
  { action: 'deleteRow', title: '删除行', icon: '|&#10005;' },
  { action: 'deleteTable', title: '删除表格', icon: '&#10005;&#9776;' },
]

// 自定义视频节点
const Video = Node.create({
  name: 'video',
  group: 'block',
  selectable: true,
  draggable: true,
  addAttributes() {
    return { src: { default: null }, controls: { default: true }, style: { default: 'max-width:100%;border-radius:0.5rem;' } }
  },
  parseHTML() { return [{ tag: 'video' }] },
  renderHTML({ HTMLAttributes }) { return ['video', HTMLAttributes] },
})

// 自定义 iframe 节点
const Iframe = Node.create({
  name: 'iframe',
  group: 'block',
  selectable: true,
  draggable: true,
  addAttributes() {
    return { src: { default: null }, style: { default: 'max-width:100%;border-radius:0.5rem;' }, frameborder: { default: '0' }, allowfullscreen: { default: true } }
  },
  parseHTML() { return [{ tag: 'iframe' }] },
  renderHTML({ HTMLAttributes }) { return ['iframe', HTMLAttributes] },
})

// 使用 shallowRef 避免 SSR 问题
const editor = shallowRef<any>(null)

onMounted(() => {
  editor.value = new Editor({
    content: props.modelValue || '',
    extensions: [
      StarterKit,
      Image,
      Video,
      Iframe,
      Table.configure({ resizable: true }),
      TableRow,
      TableHeader,
      TableCell,
    ],
    onUpdate: ({ editor: ed }) => {
      emit('update:modelValue', ed.getHTML())
    },
  })
})

const isActive = (action: string) => {
  if (!editor.value) return false
  switch (action) {
    case 'bold': return editor.value.isActive('bold')
    case 'italic': return editor.value.isActive('italic')
    case 'underline': return editor.value.isActive('underline')
    case 'heading2': return editor.value.isActive('heading', { level: 2 })
    case 'bulletList': return editor.value.isActive('bulletList')
    case 'orderedList': return editor.value.isActive('orderedList')
    case 'blockquote': return editor.value.isActive('blockquote')
    case 'table': return editor.value.isActive('table')
    default: return false
  }
}

const runAction = (action: string) => {
  if (!editor.value) return
  const chain = editor.value.chain().focus()
  switch (action) {
    case 'bold': chain.toggleBold().run(); break
    case 'italic': chain.toggleItalic().run(); break
    case 'underline': chain.toggleUnderline().run(); break
    case 'heading2': chain.toggleHeading({ level: 2 }).run(); break
    case 'bulletList': chain.toggleBulletList().run(); break
    case 'orderedList': chain.toggleOrderedList().run(); break
    case 'blockquote': chain.toggleBlockquote().run(); break
    case 'table': chain.insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run(); break
    case 'addColumnBefore': chain.addColumnBefore().run(); break
    case 'addColumnAfter': chain.addColumnAfter().run(); break
    case 'addRowBefore': chain.addRowBefore().run(); break
    case 'addRowAfter': chain.addRowAfter().run(); break
    case 'deleteColumn': chain.deleteColumn().run(); break
    case 'deleteRow': chain.deleteRow().run(); break
    case 'deleteTable': chain.deleteTable().run(); break
  }
}

// 图片上传
const imageInput = ref<HTMLInputElement | null>(null)
const triggerImageUpload = () => { imageInput.value?.click() }

const handleImageUpload = async (e: Event) => {
  const target = e.target as HTMLInputElement
  const file = target.files?.[0]
  if (!file || !editor.value) return
  const formData = new FormData()
  formData.append('files', file)
  try {
    const { urls } = await $fetch('/api/upload', { method: 'POST', body: formData })
    if (urls?.[0]) editor.value.chain().focus().setImage({ src: urls[0] }).run()
  } catch { alert('图片上传失败') }
  target.value = ''
}

// 视频插入
const showVideoDialog = ref(false)
const videoUrl = ref('')

const handleVideoUpload = async (e: Event) => {
  const target = e.target as HTMLInputElement
  const file = target.files?.[0]
  if (!file) return
  const formData = new FormData()
  formData.append('files', file)
  try {
    const { urls } = await $fetch('/api/upload', { method: 'POST', body: formData })
    if (urls?.[0]) videoUrl.value = urls[0]
  } catch { alert('视频上传失败') }
}

const insertVideo = () => {
  if (!editor.value || !videoUrl.value.trim()) return
  const url = videoUrl.value.trim()
  if (url.startsWith('<iframe')) {
    const srcMatch = url.match(/src="([^"]*)"/)
    const src = srcMatch ? srcMatch[1] : url
    editor.value.chain().focus().insertContent({
      type: 'iframe',
      attrs: { src, style: 'max-width:100%;border-radius:0.5rem;', frameborder: '0', allowfullscreen: true },
    }).run()
  } else {
    editor.value.chain().focus().insertContent({
      type: 'video',
      attrs: { src: url, controls: true, style: 'max-width:100%;border-radius:0.5rem;' },
    }).run()
  }
  showVideoDialog.value = false
  videoUrl.value = ''
}

onBeforeUnmount(() => {
  editor.value?.destroy()
})
</script>

<style scoped>
.rich-text-editor :deep(h2) { font-size: 1.25rem; font-weight: 700; margin: 0.75rem 0 0.5rem; }
.rich-text-editor :deep(ul) { list-style: disc; padding-left: 1.5rem; margin: 0.5rem 0; }
.rich-text-editor :deep(ol) { list-style: decimal; padding-left: 1.5rem; margin: 0.5rem 0; }
.rich-text-editor :deep(blockquote) { border-left: 3px solid #ddd; padding-left: 1rem; color: #666; margin: 0.5rem 0; }
.rich-text-editor :deep(p) { margin: 0.25rem 0; }
.rich-text-editor :deep(img) { max-width: 100%; border-radius: 0.5rem; }
.rich-text-editor :deep(video) { max-width: 100%; border-radius: 0.5rem; display: block; }
.rich-text-editor :deep(iframe) { max-width: 100%; border-radius: 0.5rem; display: block; }
.rich-text-editor :deep(table) { border-collapse: collapse; width: 100%; margin: 1rem 0; }
.rich-text-editor :deep(th) { background: #f3f4f6; font-weight: 600; text-align: left; }
.rich-text-editor :deep(td), .rich-text-editor :deep(th) { border: 1px solid #d1d5db; padding: 0.5rem 0.75rem; min-width: 80px; }
.rich-text-editor :deep(tr:hover) { background: #f9fafb; }
</style>
