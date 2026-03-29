<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppHeader from '@/components/AppHeader.vue'
import FooterNav from '@/components/FooterNav.vue'
</script>

<template>
  <div class="h-dvh bg-gray-950 flex justify-center ">
    <!-- Container: 100% sur mobile, 30% sur desktop -->
    <div class="w-full md:w-[30%] h-dvh flex flex-col bg-bg-primary relative ">
      <!-- Fixed header with week progress and timeline -->
      <AppHeader />

      <!-- Main content area with scroll -->
      <main class="flex-1 overflow-y-auto scrollbar-hide px-[20px]">
        <RouterView />
      </main>

      <!-- Bottom navigation fixed -->
      <FooterNav />
    </div>
  </div>
</template>
