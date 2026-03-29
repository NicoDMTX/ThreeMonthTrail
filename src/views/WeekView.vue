<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { useTrainingStore } from '@/stores/training'
import DayCard from '@/components/DayCard.vue'

const route = useRoute()
const store = useTrainingStore()

const weekIndex = computed(() => parseInt(route.params.weekIndex as string) || 0)
const week = computed(() => store.trainingPlan[weekIndex.value])

const phaseLabel = computed(() => {
  const labels: Record<string, string> = {
    'reprise': 'Reprise intelligente',
    'construction': 'Construction',
    'specifique': 'Spécifique trail',
    'allegement': 'Allègement'
  }
  return week.value ? labels[week.value.phase] : ''
})
</script>

<template>
  <div class="min-h-screen bg-bg-primary p-4 pt-[max(16px,env(safe-area-inset-top))] pb-[calc(16px+80px)]">
    <header class="mb-5">
      <RouterLink
        to="/plan"
        class="inline-block text-accent-blue no-underline text-[17px] font-medium mb-3"
      >
        ‹ Plan
      </RouterLink>
      <h1 class="text-[28px] font-bold text-text-primary m-0 mb-1">
        Semaine {{ week?.week }}
      </h1>
      <span class="text-[15px] text-text-tertiary capitalize">
        {{ phaseLabel }}
      </span>
    </header>

    <div
      v-if="week"
      class="flex flex-col gap-2.5 mb-5"
    >
      <DayCard
        v-for="(day, index) in week.days"
        :key="index"
        :day="day"
        :week="week"
        :compact="true"
        :completed="store.progress.get(`${weekIndex}-${index}`)?.completed"
        class="cursor-pointer"
        @click="store.selectDay(weekIndex * 7 + index)"
      />
    </div>

    <div class="bg-bg-secondary rounded-2xl p-5">
      <h3 class="text-[13px] font-semibold text-text-tertiary uppercase tracking-wide m-0 mb-2">
        Objectif
      </h3>
      <p class="text-[17px] text-text-primary leading-snug m-0">
        {{ week?.theme }}
      </p>
    </div>
  </div>
</template>
