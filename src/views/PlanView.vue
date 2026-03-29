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
  <div class="plan-view">
    <header class="view-header">
      <h1 class="view-title">Plan 12 semaines</h1>
      <p class="view-subtitle">Trail 12km • 3 mois de préparation</p>
    </header>

    <div class="weeks-list">
      <RouterLink
        v-for="(week, index) in store.trainingPlan"
        :key="week.week"
        :to="`/week/${index}`"
        class="week-item"
      >
        <div
          class="week-indicator"
          :style="{ background: phaseColors[week.phase] }"
        />
        <div class="week-info">
          <span class="week-number">Semaine {{ week.week }}</span>
          <span class="week-theme">{{ week.theme }}</span>
        </div>
        <div class="week-progress">
          <span class="progress-count">{{ weekProgress[index]?.completed || 0 }}/{{ week.days.length }}</span>
          <span class="chevron">›</span>
        </div>
      </RouterLink>
    </div>
  </div>
</template>

<style scoped>
.plan-view {
  min-height: 100vh;
  background: #000;
  padding: 16px;
  padding-top: max(16px, env(safe-area-inset-top));
  padding-bottom: calc(16px + 80px);
}

.view-header {
  margin-bottom: 24px;
}

.view-title {
  font-size: 28px;
  font-weight: 700;
  color: #fff;
  margin: 0 0 4px 0;
}

.view-subtitle {
  font-size: 15px;
  color: #8e8e93;
  margin: 0;
}

.weeks-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.week-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background: #1c1c1e;
  border-radius: 14px;
  text-decoration: none;
  color: inherit;
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
  transition: background 0.15s ease;
}

.week-item:active {
  background: #2c2c2e;
}

.week-indicator {
  width: 4px;
  height: 40px;
  border-radius: 2px;
  flex-shrink: 0;
}

.week-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.week-number {
  font-size: 15px;
  font-weight: 600;
  color: #fff;
}

.week-theme {
  font-size: 13px;
  color: #8e8e93;
}

.week-progress {
  display: flex;
  align-items: center;
  gap: 8px;
}

.progress-count {
  font-size: 15px;
  font-weight: 500;
  color: #30d158;
}

.chevron {
  font-size: 18px;
  color: #8e8e93;
}
</style>
