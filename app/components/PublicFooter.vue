<template>
  <footer class="bg-gray-800 text-gray-300 mt-16">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- Company Info -->
        <div>
          <h3 class="text-white text-lg font-semibold mb-4">PLOVER INDUSTRIAL CO.,LTD</h3>
          <div class="space-y-2 text-sm">
            <p>Address: xxxx</p>
            <p>Tel: +86 19816553848</p>
            <p>Email: <a href="mailto:charles@ploverindustrial.com" class="hover:text-white transition">charles@ploverindustrial.com</a></p>
          </div>
        </div>

        <!-- Quick Links -->
        <div>
          <h3 class="text-white text-lg font-semibold mb-4">Quick Links</h3>
          <ul class="space-y-2 text-sm">
            <li><NuxtLink to="/about" class="hover:text-white transition">About us</NuxtLink></li>
            <li><NuxtLink to="/products" class="hover:text-white transition">Products</NuxtLink></li>
            <li><NuxtLink to="/sectors" class="hover:text-white transition">Sectors</NuxtLink></li>
            <li><NuxtLink to="/quality" class="hover:text-white transition">Quality and Certificates</NuxtLink></li>
            <li><NuxtLink to="/contact" class="hover:text-white transition">Contact</NuxtLink></li>
          </ul>
        </div>

        <!-- Products -->
        <div>
          <h3 class="text-white text-lg font-semibold mb-4">Products</h3>
          <ul class="space-y-2 text-sm">
            <li><NuxtLink to="/products/Valve" class="hover:text-white transition">Valve</NuxtLink></li>
            <li><NuxtLink to="/products/Pipe%20Fitting" class="hover:text-white transition">Pipe Fitting</NuxtLink></li>
            <li><NuxtLink to="/downloads" class="hover:text-white transition">Downloads</NuxtLink></li>
            <li><NuxtLink to="/posts" class="hover:text-white transition">Posts</NuxtLink></li>
          </ul>
        </div>
      </div>

      <!-- Bottom bar -->
      <div class="border-t border-gray-700 mt-8 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
        <p>&copy; {{ new Date().getFullYear() }} PLOVER INDUSTRIAL CO.,LTD. All rights reserved.</p>
        <div class="flex items-center gap-4">
          <a href="#" class="hover:text-white transition">Legal Notice</a>
          <span class="text-gray-600">|</span>
          <a href="#" class="hover:text-white transition">Privacy Policy</a>
          <span class="text-gray-600">|</span>
          <a href="#" class="hover:text-white transition">Cookie Policy</a>
        </div>
      </div>
    </div>
  </footer>
</template>
