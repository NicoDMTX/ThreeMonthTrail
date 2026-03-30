<script setup lang="ts">
import { ref } from 'vue'
import { Plus, CalendarDays, ClipboardList, BarChart3 } from 'lucide-vue-next'

const isOpen = ref(false)

function toggleMenu() {
  console.log('Toggling menu, current state:', isOpen.value)
  isOpen.value = !isOpen.value
}

function closeMenu() {
  isOpen.value = false
}
</script>

<template>
  <div class="absolute inset-0 pointer-events-none">
    <!-- Floating Action Button -->
    <button
      class="absolute bottom-5 right-5 z-50 w-14 h-14 rounded-full bg-cta-gold text-white shadow-gold flex items-center justify-center transition-all duration-300 hover:bg-cta-gold-hover hover:scale-105 active:scale-95 pointer-events-auto"
      @click="toggleMenu"
    >
      <Plus
        :size="28"
        :stroke-width="2"
        class="transition-transform duration-300"
        :class="{ 'rotate-45': isOpen }"
      />
    </button>

    <!-- Overlay backdrop -->
    <Transition
      enter-active-class="transition-opacity duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-200"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-show="isOpen"
        class="absolute inset-0 z-40 bg-black/40 backdrop-blur-sm"
        @click="closeMenu"
      />
    </Transition>

    <!-- Centered bubble menu -->
    <Transition
      appear
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 scale-90"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-90"
    >
      <nav
        v-show="isOpen"
        class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-bg-surface rounded-2xl shadow-lg p-2 min-w-[220px] pointer-events-auto"
      >
        <RouterLink
          to="/home"
          class="flex items-center gap-4 px-5 py-4 rounded-xl text-text-primary transition-all duration-200 hover:bg-bg-primary"
          active-class="bg-bg-primary text-cta-gold"
          exact
          @click="closeMenu"
        >
          <CalendarDays :size="22" :stroke-width="1.5" />
          <span class="text-base font-medium">Aujourd'hui</span>
        </RouterLink>

        <RouterLink
          to="/plan"
          class="flex items-center gap-4 px-5 py-4 rounded-xl text-text-primary transition-all duration-200 hover:bg-bg-primary"
          active-class="bg-bg-primary text-cta-gold"
          @click="closeMenu"
        >
          <ClipboardList :size="22" :stroke-width="1.5" />
          <span class="text-base font-medium">Plan</span>
        </RouterLink>

        <RouterLink
          to="/stats"
          class="flex items-center gap-4 px-5 py-4 rounded-xl text-text-primary transition-all duration-200 hover:bg-bg-primary"
          active-class="bg-bg-primary text-cta-gold"
          @click="closeMenu"
        >
          <BarChart3 :size="22" :stroke-width="1.5" />
          <span class="text-base font-medium">Statistiques</span>
        </RouterLink>
      </nav>
    </Transition>
  </div>
</template>
