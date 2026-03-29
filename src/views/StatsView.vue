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
  <div class="stats-view">
    <header class="view-header">
      <h1 class="view-title">Statistiques</h1>
    </header>

    <div class="stats-grid">
      <div class="stat-card primary">
        <span class="stat-value">{{ stats.completionRate }}%</span>
        <span class="stat-label">Progression</span>
      </div>

      <div class="stat-card">
        <span class="stat-value">{{ streak }}</span>
        <span class="stat-label">Jours d'affilée</span>
      </div>

      <div class="stat-card">
        <span class="stat-value">{{ stats.runsCompleted }}</span>
        <span class="stat-label">Courses</span>
      </div>

      <div class="stat-card">
        <span class="stat-value">{{ stats.strengthCompleted }}</span>
        <span class="stat-label">Renfo</span>
      </div>

      <div class="stat-card wide">
        <span class="stat-value">~{{ stats.totalDistance }} km</span>
        <span class="stat-label">Distance estimée</span>
      </div>
    </div>

    <div class="motivation-card">
      <span class="motivation-icon">🏃</span>
      <p class="motivation-text">
        Régularité avant intensité. Chaque séance compte !
      </p>
    </div>
  </div>
</template>

<style scoped>
.stats-view {
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
  margin: 0;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  margin-bottom: 20px;
}

.stat-card {
  background: #1c1c1e;
  border-radius: 16px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.stat-card.primary {
  background: linear-gradient(135deg, #0a84ff, #0077e6);
  grid-column: span 2;
}

.stat-card.wide {
  grid-column: span 2;
}

.stat-value {
  font-size: 32px;
  font-weight: 700;
  color: #fff;
}

.stat-card.primary .stat-value {
  font-size: 48px;
}

.stat-label {
  font-size: 14px;
  color: #8e8e93;
  font-weight: 500;
}

.stat-card.primary .stat-label {
  color: rgba(255, 255, 255, 0.8);
}

.motivation-card {
  background: #1c1c1e;
  border-radius: 16px;
  padding: 24px;
  display: flex;
  align-items: center;
  gap: 16px;
}

.motivation-icon {
  font-size: 40px;
  line-height: 1;
}

.motivation-text {
  font-size: 16px;
  color: #aeaeb2;
  line-height: 1.4;
  margin: 0;
}
</style>
