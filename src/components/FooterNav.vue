<script setup lang="ts">
import { CalendarDays, ClipboardList, BarChart3 } from 'lucide-vue-next'
</script>

<template>
  <nav
    class="h-[64px] flex-shrink-0 flex justify-around items-center bg-bg-surface/95 backdrop-blur-xl border-t border-border-soft pt-3 pb-3 shadow-lg pb-[max(16px,env(safe-area-inset-bottom))] sticky bottom-0"
  >
    <RouterLink
      to="/"
      class="flex flex-col items-center gap-1.5 py-2 px-6 no-underline text-text-muted transition-all duration-200 [touch-action:manipulation] rounded-xl hover:text-accent-pink"
      active-class="text-cta-gold"
      exact
    >
      <CalendarDays :size="22" :stroke-width="1.5" />
      <span class="text-[11px] font-medium tracking-wide">Aujourd'hui</span>
    </RouterLink>
    <RouterLink
      to="/plan"
      class="flex flex-col items-center gap-1.5 py-2 px-6 no-underline text-text-muted transition-all duration-200 [touch-action:manipulation] rounded-xl hover:text-accent-pink"
      active-class="text-cta-gold"
    >
      <ClipboardList :size="22" :stroke-width="1.5" />
      <span class="text-[11px] font-medium tracking-wide">Plan</span>
    </RouterLink>
    <RouterLink
      to="/stats"
      class="flex flex-col items-center gap-1.5 py-2 px-6 no-underline text-text-muted transition-all duration-200 [touch-action:manipulation] rounded-xl hover:text-accent-pink"
      active-class="text-cta-gold"
    >
      <BarChart3 :size="22" :stroke-width="1.5" />
      <span class="text-[11px] font-medium tracking-wide">Stats</span>
    </RouterLink>
  </nav>
</template>
