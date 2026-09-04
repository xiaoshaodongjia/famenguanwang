<template>
  <footer class="bg-ink text-mist mt-20 border-t border-line">
    <div class="max-w-7xl mx-auto px-6 lg:px-8 py-14">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-10">
        <!-- Company Info -->
        <div>
          <h3 class="text-xs font-mono uppercase tracking-wider text-cyan mb-4">PLOVER INDUSTRIAL CO.,LTD</h3>
          <div class="space-y-2 text-sm font-mono">
            <p><span class="text-fog">TEL:</span> <a href="tel:+8619816553848" class="text-mist hover:text-cyan transition">+86 19816553848</a></p>
            <p><span class="text-fog">EMAIL:</span> <a href="mailto:charles@ploverindustrial.com" class="text-mist hover:text-cyan transition">charles@ploverindustrial.com</a></p>
          </div>
        </div>

        <!-- Quick Links -->
        <div>
          <h3 class="text-xs font-mono uppercase tracking-wider text-cyan mb-4">Quick Links</h3>
          <ul class="space-y-2 text-sm font-mono">
            <li><NuxtLink to="/about" class="hover:text-cyan transition">About us</NuxtLink></li>
            <li><NuxtLink to="/products" class="hover:text-cyan transition">Products</NuxtLink></li>
            <li><NuxtLink to="/sectors" class="hover:text-cyan transition">Sectors</NuxtLink></li>
            <li><NuxtLink to="/quality" class="hover:text-cyan transition">Quality & Certs</NuxtLink></li>
            <li><NuxtLink to="/contact" class="hover:text-cyan transition">Contact</NuxtLink></li>
          </ul>
        </div>

        <!-- Products -->
        <div>
          <h3 class="text-xs font-mono uppercase tracking-wider text-cyan mb-4">Products</h3>
          <ul class="space-y-2 text-sm font-mono">
            <li><NuxtLink to="/products/Valve" class="hover:text-cyan transition">Valve</NuxtLink></li>
            <li><NuxtLink to="/products/Pipe%20Fitting" class="hover:text-cyan transition">Pipe Fitting</NuxtLink></li>
            <li><NuxtLink to="/downloads" class="hover:text-cyan transition">Downloads</NuxtLink></li>
            <li><NuxtLink to="/posts" class="hover:text-cyan transition">Posts</NuxtLink></li>
          </ul>
        </div>
      </div>

      <!-- Bottom bar -->
      <div class="border-t border-line mt-10 pt-6 text-center text-xs font-mono text-fog">
        <p>&copy; {{ new Date().getFullYear() }} PLOVER INDUSTRIAL CO.,LTD. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>
