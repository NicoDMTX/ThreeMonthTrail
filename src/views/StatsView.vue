<script setup lang="ts">
import { computed } from 'vue'
import { useTrainingStore } from '@/stores/training'

const store = useTrainingStore()

const stats = computed(() => {
  let runsCompleted = 0
  let strengthCompleted = 0
  let totalDistance = 0

  store.trainingPlan.forEach((week, wIndex) => {
    week.days.forEach((day, dIndex) => {
      const progress = store.progress.get(`${wIndex}-${dIndex}`)
      if (progress?.completed) {
        if (day.session.type.startsWith('run')) {
          runsCompleted++
          // Estimation distance approximative
          if (day.session.type === 'run-long') {
            totalDistance += 8
          } else if (day.session.type === 'run-quality') {
            totalDistance += 5
          } else {
            totalDistance += 4
          }
        } else if (day.session.type.startsWith('strength')) {
          strengthCompleted++
        }
      }
    })
  })

  return {
    runsCompleted,
    strengthCompleted,
    totalDistance,
    completionRate: store.globalProgress.percentage
  }
})

const streak = computed(() => {
  let currentStreak = 0
  const today = store.currentDayIndex

  for (let i = today; i >= 0; i--) {
    const day = store.trainingPlan.flatMap(w => w.days)[i]
    if (!day) break

    const weekIndex = Math.floor(i / 7)
    const dayIndex = i % 7
    const progress = store.progress.get(`${weekIndex}-${dayIndex}`)

    if (progress?.completed) {
      currentStreak++
    } else if (i !== today) {
      break
    }
  }

  return currentStreak
})
</script>

<template>
  <div class="h-full pt-[max(16px,env(safe-area-inset-top))] pb-[calc(16px+80px)]">
    <header class="mb-6">
      <h1 class="text-[28px] font-bold text-text-primary m-0">
        Statistiques
      </h1>
    </header>

    <div class="grid grid-cols-2 gap-3 mb-5">
      <div class="col-span-2 bg-gradient-to-br from-accent-blue to-[#0077e6] rounded-2xl p-5 flex flex-col gap-1">
        <span class="text-5xl font-bold text-white">
          {{ stats.completionRate }}%
        </span>
        <span class="text-sm text-white/80 font-medium">
          Progression
        </span>
      </div>

      <div class="bg-bg-secondary rounded-2xl p-5 flex flex-col gap-1">
        <span class="text-[32px] font-bold text-text-primary">
          {{ streak }}
        </span>
        <span class="text-sm text-text-tertiary font-medium">
          Jours d'affilée
        </span>
      </div>

      <div class="bg-bg-secondary rounded-2xl p-5 flex flex-col gap-1">
        <span class="text-[32px] font-bold text-text-primary">
          {{ stats.runsCompleted }}
        </span>
        <span class="text-sm text-text-tertiary font-medium">
          Courses
        </span>
      </div>

      <div class="bg-bg-secondary rounded-2xl p-5 flex flex-col gap-1">
        <span class="text-[32px] font-bold text-text-primary">
          {{ stats.strengthCompleted }}
        </span>
        <span class="text-sm text-text-tertiary font-medium">
          Renfo
        </span>
      </div>

      <div class="col-span-2 bg-bg-secondary rounded-2xl p-5 flex flex-col gap-1">
        <span class="text-[32px] font-bold text-text-primary">
          ~{{ stats.totalDistance }} km
        </span>
        <span class="text-sm text-text-tertiary font-medium">
          Distance estimée
        </span>
      </div>
    </div>

    <div class="bg-bg-secondary rounded-2xl p-6 flex items-center gap-4">
      <span class="text-[40px] leading-none">🏃</span>
      <p class="text-base text-text-secondary leading-snug m-0">
        Régularité avant intensité. Chaque séance compte !
      </p>
    </div>
  </div>
</template>
