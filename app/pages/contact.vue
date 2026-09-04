<template>
  <div>
    <PublicHeader />

    <main class="max-w-7xl mx-auto px-6 lg:px-8 py-16">
      <div class="mb-14">
        <h1 class="text-4xl md:text-5xl font-extralight tracking-tight text-ink">PLOVER INDUSTRIAL CO.,LTD</h1>
        <div class="thin-divider mt-4"></div>
        <p class="mt-4 text-xl text-ink-secondary font-light">We're here to help.</p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div class="bg-surface rounded-lg p-10">
          <h2 class="text-xl font-light text-ink mb-8">Contact Information</h2>
          <div class="space-y-6 text-ink-secondary">
            <div>
              <p class="font-medium text-ink mb-1">Tel:</p>
              <a href="tel:+8619816553848" class="text-accent hover:text-accent-dark transition text-lg font-mono">+86 19816553848</a>
            </div>
            <div>
              <p class="font-medium text-ink mb-1">Email:</p>
              <a href="mailto:charles@ploverindustrial.com" class="text-accent hover:text-accent-dark transition">charles@ploverindustrial.com</a>
            </div>
          </div>

          <div class="flex items-center gap-4 mt-10">
            <a href="https://www.instagram.com/ploverindustrial79/" target="_blank" class="w-11 h-11 bg-canvas rounded-full flex items-center justify-center text-ink-secondary hover:bg-ink hover:text-surface transition" aria-label="Instagram">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            </a>
            <a href="https://www.facebook.com/profile.php?id=61573017871719" target="_blank" class="w-11 h-11 bg-canvas rounded-full flex items-center justify-center text-ink-secondary hover:bg-ink hover:text-surface transition" aria-label="Facebook">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </a>
          </div>
        </div>

        <div class="bg-surface rounded-lg p-10">
          <div v-if="submitted" class="text-center py-12">
            <div class="w-16 h-16 mx-auto mb-6 bg-signal/10 rounded-full flex items-center justify-center">
              <svg class="w-8 h-8 text-signal" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
            </div>
            <p class="text-ink font-light text-lg">Thank you for your message!</p>
            <p class="text-sm text-ink-tertiary mt-2">We will get back to you within 24 hours.</p>
            <button type="button" class="mt-8 px-6 py-2.5 bg-ink text-surface text-sm font-medium rounded-md hover:bg-ink/90 transition" @click="resetForm">Send Another</button>
          </div>

          <form v-else @submit.prevent="handleSubmit" class="space-y-6">
            <div>
              <label class="block text-sm font-medium text-ink-secondary mb-2">Name *</label>
              <input v-model="form.name" type="text" required class="w-full px-4 py-2.5 bg-canvas border border-line-subtle rounded-md text-ink placeholder-ink-tertiary focus:outline-none focus:border-ink/20 focus:shadow-[0_0_0_3px_rgba(0,0,0,0.03)] transition" />
            </div>
            <div>
              <label class="block text-sm font-medium text-ink-secondary mb-2">E-mail *</label>
              <input v-model="form.email" type="email" required class="w-full px-4 py-2.5 bg-canvas border border-line-subtle rounded-md text-ink placeholder-ink-tertiary focus:outline-none focus:border-ink/20 focus:shadow-[0_0_0_3px_rgba(0,0,0,0.03)] transition" />
            </div>
            <div>
              <label class="block text-sm font-medium text-ink-secondary mb-2">Company</label>
              <input v-model="form.company" type="text" class="w-full px-4 py-2.5 bg-canvas border border-line-subtle rounded-md text-ink placeholder-ink-tertiary focus:outline-none focus:border-ink/20 focus:shadow-[0_0_0_3px_rgba(0,0,0,0.03)] transition" />
            </div>
            <div>
              <label class="block text-sm font-medium text-ink-secondary mb-2">Country</label>
              <input v-model="form.country" type="text" class="w-full px-4 py-2.5 bg-canvas border border-line-subtle rounded-md text-ink placeholder-ink-tertiary focus:outline-none focus:border-ink/20 focus:shadow-[0_0_0_3px_rgba(0,0,0,0.03)] transition" />
            </div>
            <div>
              <label class="block text-sm font-medium text-ink-secondary mb-2">Message *</label>
              <textarea v-model="form.message" rows="5" required class="w-full px-4 py-2.5 bg-canvas border border-line-subtle rounded-md text-ink placeholder-ink-tertiary focus:outline-none focus:border-ink/20 focus:shadow-[0_0_0_3px_rgba(0,0,0,0.03)] transition resize-none"></textarea>
            </div>
            <div>
              <label class="flex items-start gap-3">
                <input v-model="form.privacy" type="checkbox" required class="mt-1 w-4 h-4 rounded border-line text-accent focus:ring-accent/30" />
                <span class="text-sm text-ink-secondary">I have read and agree to the <a href="#" class="text-accent hover:text-accent-dark">privacy policy</a></span>
              </label>
            </div>
            <div><p class="text-xs text-ink-tertiary">*Required fields</p></div>
            <div v-if="submitError" class="text-sm text-alert bg-alert/10 px-4 py-3 rounded-md">{{ submitError }}</div>
            <button type="submit" :disabled="submitting" class="px-8 py-3 bg-ink text-surface font-medium rounded-md hover:bg-ink/90 disabled:opacity-40 transition">{{ submitting ? 'Sending...' : 'Send' }}</button>
          </form>
        </div>
      </div>
    </main>

    <PublicFooter />
  </div>
</template>

<script setup lang="ts">
useSeoMeta({ title: 'Contact - PLOVER Industrial Valves & Pipe Fittings', description: 'Contact PLOVER INDUSTRIAL CO.,LTD for inquiries about industrial valves and pipe fittings.', ogTitle: 'Contact - PLOVER', ogType: 'website' })

const form = ref({ name: '', email: '', company: '', country: '', message: '', privacy: false })
const submitting = ref(false)
const submitted = ref(false)
const submitError = ref('')

const handleSubmit = async () => {
  submitError.value = ''
  submitting.value = true
  try {
    await $fetch('/api/inquiries', { method: 'POST', body: { name: form.value.name, email: form.value.email, company: form.value.company, message: form.value.message } })
    submitted.value = true
  } catch (e: any) {
    submitError.value = e.data?.message || 'Failed to send message. Please try again.'
  } finally {
    submitting.value = false
  }
}

const resetForm = () => { submitted.value = false; submitError.value = ''; form.value = { name: '', email: '', company: '', country: '', message: '', privacy: false } }
</script>
