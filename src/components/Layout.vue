<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { RouterView } from 'vue-router'
import AppHeader from '@/components/AppHeader.vue'
import FooterNav from '@/components/FooterNav.vue'

const route = useRoute()

const isAuthPage = computed(() => {
  return route.name === 'login' || route.name === 'register'
})
</script>

<template>
  <div class="h-dvh bg-gray-950 flex justify-center ">
    <!-- Container: 100% sur mobile, 30% sur desktop -->
    <div class="w-full md:w-[30%] h-dvh flex flex-col bg-bg-primary relative ">
      <!-- Fixed header with week progress and timeline - hidden on auth pages -->
      <AppHeader v-if="!isAuthPage" />

      <!-- Main content area with scroll -->
      <main class="flex-1 overflow-y-auto scrollbar-hide px-[20px]">
        <RouterView />
      </main>

      <!-- Floating navigation overlay - hidden on auth pages -->
      <FooterNav v-if="!isAuthPage" />
    </div>
  </div>
</template>
