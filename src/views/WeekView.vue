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
  <div class="week-view">
    <header class="view-header">
      <RouterLink to="/plan" class="back-btn">‹ Plan</RouterLink>
      <h1 class="view-title">Semaine {{ week?.week }}</h1>
      <span class="phase-label">{{ phaseLabel }}</span>
    </header>

    <div v-if="week" class="week-days">
      <DayCard
        v-for="(day, index) in week.days"
        :key="index"
        :day="day"
        :week="week"
        :compact="true"
        :completed="store.progress.get(`${weekIndex}-${index}`)?.completed"
        @click="store.selectDay(weekIndex * 7 + index)"
      />
    </div>

    <div class="week-theme">
      <h3>Objectif</h3>
      <p>{{ week?.theme }}</p>
    </div>
  </div>
</template>

<style scoped>
.week-view {
  min-height: 100vh;
  background: #000;
  padding: 16px;
  padding-top: max(16px, env(safe-area-inset-top));
  padding-bottom: calc(16px + 80px);
}

.view-header {
  margin-bottom: 20px;
}

.back-btn {
  display: inline-block;
  color: #0a84ff;
  text-decoration: none;
  font-size: 17px;
  font-weight: 500;
  margin-bottom: 12px;
}

.view-title {
  font-size: 28px;
  font-weight: 700;
  color: #fff;
  margin: 0 0 4px 0;
}

.phase-label {
  font-size: 15px;
  color: #8e8e93;
  text-transform: capitalize;
}

.week-days {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
}

.week-days > :deep(*) {
  cursor: pointer;
}

.week-theme {
  background: #1c1c1e;
  border-radius: 16px;
  padding: 20px;
}

.week-theme h3 {
  font-size: 13px;
  font-weight: 600;
  color: #8e8e93;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  margin: 0 0 8px 0;
}

.week-theme p {
  font-size: 17px;
  color: #fff;
  line-height: 1.4;
  margin: 0;
}
</style>
