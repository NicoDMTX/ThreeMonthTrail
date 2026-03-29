<script setup lang="ts">
import { useTrainingStore } from '@/stores/training'
import { RouterLink } from 'vue-router'

const store = useTrainingStore()
const weekProgress = store.weekProgress

const phaseColors: Record<string, string> = {
  'reprise': '#30d158',
  'construction': '#0a84ff',
  'specifique': '#ff9f0a',
  'allegement': '#ff453a'
}

function getPhaseLabel(phase: string): string {
  const labels: Record<string, string> = {
    'reprise': 'Reprise',
    'construction': 'Construction',
    'specifique': 'Spécifique',
    'allegement': 'Allègement'
  }
  return labels[phase] || phase
}
</script>

<template>
  <div class="h-full pt-[max(16px,env(safe-area-inset-top))] pb-[calc(16px+80px)]">
    <header class="mb-6">
      <h1 class="text-[28px] font-bold text-text-primary m-0 mb-1">
        Plan 12 semaines
      </h1>
      <p class="text-[15px] text-text-tertiary m-0">
        Trail 12km • 3 mois de préparation
      </p>
    </header>

    <div class="flex flex-col gap-2">
      <RouterLink
        v-for="(week, index) in store.trainingPlan"
        :key="week.week"
        :to="`/week/${index}`"
        class="flex items-center gap-3 p-4 bg-bg-secondary rounded-xl no-underline text-inherit [touch-action:manipulation] transition-colors duration-150 active:bg-bg-tertiary"
      >
        <div
          class="w-1 h-10 rounded-sm flex-shrink-0"
          :style="{ background: phaseColors[week.phase] }"
        />
        <div class="flex-1 flex flex-col gap-0.5">
          <span class="text-[15px] font-semibold text-text-primary">
            Semaine {{ week.week }}
          </span>
          <span class="text-[13px] text-text-tertiary">
            {{ week.theme }}
          </span>
        </div>
        <div class="flex items-center gap-2">
          <span class="text-[15px] font-medium text-accent-green">
            {{ weekProgress[index]?.completed || 0 }}/{{ week.days.length }}
          </span>
          <span class="text-lg text-text-tertiary">›</span>
        </div>
      </RouterLink>
    </div>
  </div>
</template>
