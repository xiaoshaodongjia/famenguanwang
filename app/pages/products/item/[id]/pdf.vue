<template>
  <div class="pdf-page" v-if="product">
    <!-- 头部 -->
    <div class="pdf-header">
      <div class="logo">阀门商城</div>
      <div class="meta">
        <span>产品详情单</span>
        <span>日期：{{ today }}</span>
      </div>
    </div>

    <!-- 产品信息 -->
    <h1 class="product-name">{{ product.name }}</h1>
    <p class="product-sub">{{ product.brand }} | {{ product.model }} | {{ product.category }}</p>

    <div class="main-content">
      <!-- 图片 -->
      <div class="image-box">
        <img v-if="product.image" :src="product.image" />
        <div v-else class="no-image">暂无图片</div>
      </div>
    </div>

    <!-- 参数表 -->
    <table class="params-table">
      <tbody>
        <tr><th>型号</th><td>{{ product.model }}</td><th>品牌</th><td>{{ product.brand }}</td></tr>
        <tr><th>类别</th><td>{{ product.category }}</td><th>口径 (DN)</th><td>{{ product.dn || '—' }}</td></tr>
        <tr><th>压力等级 (PN)</th><td>{{ product.pn || '—' }}</td><th>材质</th><td>{{ product.material || '—' }}</td></tr>
        <tr><th>连接方式</th><td>{{ product.connection || '—' }}</td><th>适用介质</th><td>{{ product.media || '—' }}</td></tr>
        <tr><th>温度范围</th><td>{{ product.temperature || '—' }}</td><th>外形尺寸</th><td>{{ product.dimensions || '—' }}</td></tr>
      </tbody>
    </table>

    <!-- 描述 -->
    <div v-if="product.description" class="description">
      <h3>产品描述</h3>
      <div v-html="product.description"></div>
    </div>

    <!-- 底部 -->
    <div class="pdf-footer">
      <p>阀门商城 | 专业工业阀门供应商</p>
      <p>电话：400-XXX-XXXX | 邮箱：info@valve-shop.com</p>
    </div>

    <!-- 打印按钮 -->
    <button class="print-btn no-print" @click="handlePrint">打印 / 导出 PDF</button>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()

const { data } = await useFetch(`/api/products/${route.params.id}`)
const product = computed(() => data.value?.data)

const today = new Date().toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' })

const handlePrint = () => {
  window.print()
}
</script>

<style scoped>
.pdf-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 40px;
  font-family: 'SimSun', 'Noto Serif SC', serif;
  color: #333;
}

.pdf-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid #2563eb;
  padding-bottom: 16px;
  margin-bottom: 24px;
}

.logo {
  font-size: 28px;
  font-weight: 700;
  color: #2563eb;
}

.meta {
  text-align: right;
  font-size: 14px;
  color: #666;
}

.meta span {
  display: block;
}

.product-name {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 4px;
}

.product-sub {
  color: #666;
  font-size: 14px;
  margin-bottom: 24px;
}

.main-content {
  display: flex;
  gap: 24px;
  margin-bottom: 24px;
}

.image-box {
  width: 240px;
  height: 240px;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  flex-shrink: 0;
}

.image-box img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.no-image {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
  background: #f9fafb;
}

.params-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 24px;
  font-size: 14px;
}

.params-table th,
.params-table td {
  border: 1px solid #ddd;
  padding: 10px 14px;
  text-align: left;
}

.params-table th {
  background: #f3f4f6;
  font-weight: 600;
  width: 120px;
}

.description {
  margin-bottom: 32px;
}

.description h3 {
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 8px;
  padding-bottom: 8px;
  border-bottom: 1px solid #eee;
}

.description :deep(p) {
  font-size: 14px;
  line-height: 1.7;
  margin-bottom: 8px;
}

.description :deep(ul) {
  padding-left: 20px;
  margin: 8px 0;
}

.description :deep(li) {
  font-size: 14px;
  line-height: 1.7;
}

.pdf-footer {
  border-top: 1px solid #ddd;
  padding-top: 16px;
  text-align: center;
  color: #999;
  font-size: 12px;
}

.print-btn {
  display: block;
  margin: 24px auto 0;
  padding: 12px 32px;
  background: #2563eb;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
}

.print-btn:hover {
  background: #1d4ed8;
}

/* 打印样式 */
@media print {
  .no-print {
    display: none !important;
  }

  .pdf-page {
    padding: 20px;
  }

  .image-box {
    width: 200px;
    height: 200px;
  }
}
</style>
