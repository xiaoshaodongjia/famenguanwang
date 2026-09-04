<template>
  <div>
    <PublicHeader />

    <main class="max-w-7xl mx-auto px-6 lg:px-8 py-14">
      <!-- Page Header -->
      <div class="mb-12">
        <span class="mono-label">CONTACT</span>
        <h1 class="text-4xl md:text-5xl font-extralight tracking-tight text-snow mt-1">PLOVER INDUSTRIAL CO.,LTD</h1>
        <div class="cyan-divider mt-4"></div>
        <p class="mt-3 text-mist font-mono text-sm">Technical inquiries welcome.</p>
      </div>

      <!-- Two columns -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Left: Company Info -->
        <div class="bg-surface border border-cyan-line p-8">
          <h2 class="text-xs font-mono uppercase tracking-wider text-cyan mb-6">Contact Information</h2>
          <div class="space-y-5 text-mist">
            <div>
              <p class="text-xs font-mono uppercase tracking-wider text-fog mb-1">Tel</p>
              <a href="tel:+8619816553848" class="text-cyan hover:text-snow transition font-mono text-lg">+86 19816553848</a>
            </div>
            <div>
              <p class="text-xs font-mono uppercase tracking-wider text-fog mb-1">Email</p>
              <a href="mailto:charles@ploverindustrial.com" class="text-cyan hover:text-snow transition font-mono">charles@ploverindustrial.com</a>
            </div>
          </div>

          <!-- Social Icons -->
          <div class="flex items-center gap-3 mt-8">
            <a
              href="https://www.instagram.com/ploverindustrial79/"
              target="_blank"
              class="w-9 h-9 bg-surface-raised border border-line flex items-center justify-center text-mist hover:bg-cyan hover:text-ink transition"
              aria-label="Instagram"
            >
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=61573017871719"
              target="_blank"
              class="w-9 h-9 bg-surface-raised border border-line flex items-center justify-center text-mist hover:bg-cyan hover:text-ink transition"
              aria-label="Facebook"
            >
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
          </div>
        </div>

        <!-- Right: Contact Form -->
        <div class="bg-surface border border-cyan-line p-8">
          <!-- Success State -->
          <div v-if="submitted" class="text-center py-10">
            <div class="w-14 h-14 mx-auto mb-5 bg-signal/10 flex items-center justify-center border border-signal/30">
              <svg class="w-7 h-7 text-signal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p class="text-snow font-light">Message sent</p>
            <p class="text-xs text-fog mt-1 font-mono">WE WILL RESPOND WITHIN 24H</p>
            <button
              type="button"
              class="mt-6 px-6 py-2.5 bg-cyan text-ink text-xs font-mono uppercase tracking-wider rounded hover:bg-snow transition"
              @click="resetForm"
            >
              Send Another
            </button>
          </div>

          <form v-else @submit.prevent="handleSubmit" class="space-y-5">
            <div>
              <label class="block text-xs font-mono uppercase tracking-wider text-cyan mb-1.5">Name *</label>
              <input
                v-model="form.name"
                type="text"
                required
                class="w-full px-3 py-2 bg-surface-raised border border-line rounded text-snow placeholder-fog focus:outline-none focus:border-cyan-line focus:shadow-[0_0_0_2px_rgba(0,212,255,0.1)] transition text-sm"
              />
            </div>
            <div>
              <label class="block text-xs font-mono uppercase tracking-wider text-cyan mb-1.5">E-mail *</label>
              <input
                v-model="form.email"
                type="email"
                required
                class="w-full px-3 py-2 bg-surface-raised border border-line rounded text-snow placeholder-fog focus:outline-none focus:border-cyan-line focus:shadow-[0_0_0_2px_rgba(0,212,255,0.1)] transition text-sm"
              />
            </div>
            <div>
              <label class="block text-xs font-mono uppercase tracking-wider text-cyan mb-1.5">Company</label>
              <input
                v-model="form.company"
                type="text"
                class="w-full px-3 py-2 bg-surface-raised border border-line rounded text-snow placeholder-fog focus:outline-none focus:border-cyan-line focus:shadow-[0_0_0_2px_rgba(0,212,255,0.1)] transition text-sm"
              />
            </div>
            <div>
              <label class="block text-xs font-mono uppercase tracking-wider text-cyan mb-1.5">Country</label>
              <input
                v-model="form.country"
                type="text"
                class="w-full px-3 py-2 bg-surface-raised border border-line rounded text-snow placeholder-fog focus:outline-none focus:border-cyan-line focus:shadow-[0_0_0_2px_rgba(0,212,255,0.1)] transition text-sm"
              />
            </div>
            <div>
              <label class="block text-xs font-mono uppercase tracking-wider text-cyan mb-1.5">Message *</label>
              <textarea
                v-model="form.message"
                rows="4"
                required
                class="w-full px-3 py-2 bg-surface-raised border border-line rounded text-snow placeholder-fog focus:outline-none focus:border-cyan-line focus:shadow-[0_0_0_2px_rgba(0,212,255,0.1)] transition resize-none text-sm"
              ></textarea>
            </div>
            <div>
              <label class="flex items-start gap-3">
                <input
                  v-model="form.privacy"
                  type="checkbox"
                  required
                  class="mt-1 w-3.5 h-3.5 rounded border-line bg-surface-raised text-cyan focus:ring-cyan-line"
                />
                <span class="text-xs text-mist font-mono">I agree to the <a href="#" class="text-cyan hover:text-snow">privacy policy</a></span>
              </label>
            </div>
            <div>
              <p class="text-xs text-fog font-mono">* REQUIRED FIELDS</p>
            </div>
            <div v-if="submitError" class="text-xs text-alert bg-alert/10 px-3 py-2 border border-alert/20 font-mono">
              {{ submitError }}
            </div>
            <button
              type="submit"
              :disabled="submitting"
              class="px-8 py-2.5 bg-cyan text-ink text-xs font-mono uppercase tracking-wider rounded hover:bg-snow disabled:opacity-35 transition"
            >
              {{ submitting ? 'SENDING...' : 'SEND' }}
            </button>
          </form>
        </div>
      </div>
    </main>

    <PublicFooter />
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Contact - PLOVER Industrial Valves & Pipe Fittings',
  description: 'Contact PLOVER INDUSTRIAL CO.,LTD for inquiries about industrial valves and pipe fittings.',
  ogTitle: 'Contact - PLOVER',
  ogType: 'website',
})

const form = ref({
  name: '',
  email: '',
  company: '',
  country: '',
  message: '',
  privacy: false,
})

const submitting = ref(false)
const submitted = ref(false)
const submitError = ref('')

const handleSubmit = async () => {
  submitError.value = ''
  submitting.value = true
  try {
    await $fetch('/api/inquiries', {
      method: 'POST',
      body: {
        name: form.value.name,
        email: form.value.email,
        company: form.value.company,
        message: form.value.message,
      },
    })
    submitted.value = true
  } catch (e: any) {
    submitError.value = e.data?.message || 'Failed to send message. Please try again.'
  } finally {
    submitting.value = false
  }
}

const resetForm = () => {
  submitted.value = false
  submitError.value = ''
  form.value = { name: '', email: '', company: '', country: '', message: '', privacy: false }
}
</script>
