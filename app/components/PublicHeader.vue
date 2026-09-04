<template>
  <header class="sticky top-0 z-50">
    <!-- Top info bar -->
    <div class="bg-ink text-ink-tertiary text-sm hidden md:block">
      <div class="max-w-7xl mx-auto px-6 lg:px-8">
        <div class="flex items-center justify-between h-8">
          <div class="flex items-center gap-4 text-xs">
            <span>Tel: <a href="tel:+8619816553848" class="text-surface hover:text-accent transition">+86 19816553848</a></span>
            <a href="mailto:charles@ploverindustrial.com" class="hover:text-surface transition">charles@ploverindustrial.com</a>
          </div>
          <div class="flex items-center gap-3">
            <a href="https://www.instagram.com/ploverindustrial79/" target="_blank" class="hover:text-surface transition" aria-label="Instagram">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            <a href="https://www.facebook.com/profile.php?id=61573017871719" target="_blank" class="hover:text-surface transition" aria-label="Facebook">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Main navigation -->
    <nav class="bg-surface/95 backdrop-blur-md border-b border-line-subtle">
      <div class="max-w-7xl mx-auto px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <!-- Logo -->
          <NuxtLink to="/" class="flex items-center">
            <span class="text-2xl font-extralight tracking-widest text-ink">PLOVER</span>
          </NuxtLink>

          <!-- Desktop nav -->
          <div class="hidden lg:flex items-center gap-1">
            <!-- About us dropdown -->
            <div class="relative group">
              <button class="px-3 py-2 text-sm text-ink-secondary hover:text-ink transition rounded flex items-center gap-1">
                About us
                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                </svg>
              </button>
              <div class="absolute top-full left-0 mt-1 w-56 bg-surface rounded-lg shadow-lg border border-line-subtle opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div class="py-2">
                  <NuxtLink to="/about#company" class="block px-4 py-2 text-sm text-ink-secondary hover:bg-canvas hover:text-accent">Company</NuxtLink>
                  <NuxtLink to="/about#management_policy" class="block px-4 py-2 text-sm text-ink-secondary hover:bg-canvas hover:text-accent">Management policy</NuxtLink>
                  <NuxtLink to="/about#services" class="block px-4 py-2 text-sm text-ink-secondary hover:bg-canvas hover:text-accent">Services</NuxtLink>
                  <NuxtLink to="/quality" class="block px-4 py-2 text-sm text-ink-secondary hover:bg-canvas hover:text-accent">Quality and Certificates</NuxtLink>
                </div>
              </div>
            </div>

            <!-- Products dropdown -->
            <div class="relative group">
              <button class="px-3 py-2 text-sm text-ink-secondary hover:text-ink transition rounded flex items-center gap-1">
                Products
                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                </svg>
              </button>
              <div class="absolute top-full left-0 mt-1 w-48 bg-surface rounded-lg shadow-lg border border-line-subtle opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div class="py-2">
                  <NuxtLink to="/products/Valve" class="block px-4 py-2 text-sm text-ink-secondary hover:bg-canvas hover:text-accent">Valve</NuxtLink>
                  <NuxtLink to="/products/Pipe%20Fitting" class="block px-4 py-2 text-sm text-ink-secondary hover:bg-canvas hover:text-accent">Pipe Fitting</NuxtLink>
                </div>
              </div>
            </div>

            <NuxtLink to="/sectors" class="px-3 py-2 text-sm text-ink-secondary hover:text-ink transition rounded">
              Sectors
            </NuxtLink>

            <!-- Resources dropdown -->
            <div class="relative group">
              <button class="px-3 py-2 text-sm text-ink-secondary hover:text-ink transition rounded flex items-center gap-1">
                Resources
                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                </svg>
              </button>
              <div class="absolute top-full left-0 mt-1 w-40 bg-surface rounded-lg shadow-lg border border-line-subtle opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div class="py-2">
                  <NuxtLink to="/posts" class="block px-4 py-2 text-sm text-ink-secondary hover:bg-canvas hover:text-accent">Posts</NuxtLink>
                  <NuxtLink to="/downloads" class="block px-4 py-2 text-sm text-ink-secondary hover:bg-canvas hover:text-accent">Downloads</NuxtLink>
                </div>
              </div>
            </div>

            <NuxtLink to="/contact" class="ml-2 px-5 py-2 text-sm font-medium bg-ink text-surface rounded-md hover:bg-ink/90 transition">
              Contact
            </NuxtLink>
          </div>

          <!-- Search + Mobile toggle -->
          <div class="flex items-center gap-3">
            <!-- Search -->
            <div class="relative hidden md:block">
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Search..."
                aria-label="Search products"
                class="w-40 px-3 py-1.5 text-sm bg-canvas border border-line-subtle rounded-md text-ink placeholder-ink-tertiary focus:outline-none focus:border-ink/20 focus:shadow-[0_0_0_3px_rgba(0,0,0,0.03)] transition"
                @keyup.enter="handleSearch"
              />
              <svg class="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-tertiary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
            </div>

            <!-- Mobile menu button -->
            <button :aria-label="mobileMenuOpen ? 'Close menu' : 'Open menu'" class="lg:hidden p-2 text-ink-secondary" @click="mobileMenuOpen = !mobileMenuOpen">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path v-if="!mobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
                <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>
        </div>

        <!-- Mobile menu -->
        <div v-if="mobileMenuOpen" class="lg:hidden pb-4 space-y-1">
          <div class="mb-3">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search..."
              aria-label="Search products"
              class="w-full px-3 py-2 text-sm bg-canvas border border-line-subtle rounded-md text-ink placeholder-ink-tertiary focus:outline-none focus:border-ink/20"
              @keyup.enter="handleSearch"
            />
          </div>
          <div class="py-2">
            <span class="block text-ink font-medium mb-1">About us</span>
            <NuxtLink to="/about#company" class="block py-1 pl-4 text-sm text-ink-secondary" @click="mobileMenuOpen = false">Company</NuxtLink>
            <NuxtLink to="/about#management_policy" class="block py-1 pl-4 text-sm text-ink-secondary" @click="mobileMenuOpen = false">Management policy</NuxtLink>
            <NuxtLink to="/about#services" class="block py-1 pl-4 text-sm text-ink-secondary" @click="mobileMenuOpen = false">Services</NuxtLink>
            <NuxtLink to="/quality" class="block py-1 pl-4 text-sm text-ink-secondary" @click="mobileMenuOpen = false">Quality and Certificates</NuxtLink>
          </div>
          <NuxtLink to="/products" class="block py-2 text-ink" @click="mobileMenuOpen = false">Products</NuxtLink>
          <NuxtLink to="/sectors" class="block py-2 text-ink" @click="mobileMenuOpen = false">Sectors</NuxtLink>
          <div class="py-2">
            <span class="block text-ink font-medium mb-1">Resources</span>
            <NuxtLink to="/posts" class="block py-1 pl-4 text-sm text-ink-secondary" @click="mobileMenuOpen = false">Posts</NuxtLink>
            <NuxtLink to="/downloads" class="block py-1 pl-4 text-sm text-ink-secondary" @click="mobileMenuOpen = false">Downloads</NuxtLink>
          </div>
          <NuxtLink to="/contact" class="block py-2.5 mt-2 text-center text-sm font-medium bg-ink text-surface rounded-md hover:bg-ink/90" @click="mobileMenuOpen = false">Contact</NuxtLink>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
const mobileMenuOpen = ref(false)
const searchQuery = ref('')

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    navigateTo(`/products?search=${encodeURIComponent(searchQuery.value.trim())}`)
  }
}
</script>
