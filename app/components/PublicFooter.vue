<template>
  <footer class="bg-ink text-ink-tertiary mt-24">
    <div class="max-w-7xl mx-auto px-6 lg:px-8 py-16">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-10">
        <!-- Company Info -->
        <div>
          <h3 class="text-surface text-lg font-light tracking-wide mb-4">PLOVER INDUSTRIAL CO.,LTD</h3>
          <div class="space-y-2 text-sm">
            <p>Tel: <a href="tel:+8619816553848" class="text-accent hover:text-accent-light transition">+86 19816553848</a></p>
            <p>Email: <a href="mailto:charles@ploverindustrial.com" class="text-accent hover:text-accent-light transition">charles@ploverindustrial.com</a></p>
          </div>
        </div>

        <!-- Quick Links -->
        <div>
          <h3 class="text-surface text-lg font-light tracking-wide mb-4">Quick Links</h3>
          <ul class="space-y-2 text-sm">
            <li><NuxtLink to="/about" class="hover:text-accent transition">About us</NuxtLink></li>
            <li><NuxtLink to="/products" class="hover:text-accent transition">Products</NuxtLink></li>
            <li><NuxtLink to="/sectors" class="hover:text-accent transition">Sectors</NuxtLink></li>
            <li><NuxtLink to="/quality" class="hover:text-accent transition">Quality and Certificates</NuxtLink></li>
            <li><NuxtLink to="/contact" class="hover:text-accent transition">Contact</NuxtLink></li>
          </ul>
        </div>

        <!-- Products -->
        <div>
          <h3 class="text-surface text-lg font-light tracking-wide mb-4">Products</h3>
          <ul class="space-y-2 text-sm">
            <li><NuxtLink to="/products/Valve" class="hover:text-accent transition">Valve</NuxtLink></li>
            <li><NuxtLink to="/products/Pipe%20Fitting" class="hover:text-accent transition">Pipe Fitting</NuxtLink></li>
            <li><NuxtLink to="/downloads" class="hover:text-accent transition">Downloads</NuxtLink></li>
            <li><NuxtLink to="/posts" class="hover:text-accent transition">Posts</NuxtLink></li>
          </ul>
        </div>
      </div>

      <!-- Bottom bar -->
      <div class="border-t border-white/10 mt-12 pt-8 text-center text-sm text-ink-tertiary">
        <p>&copy; {{ new Date().getFullYear() }} PLOVER INDUSTRIAL CO.,LTD. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>
