<script setup lang="ts">
import { computed } from 'vue'
import type { DayPlan, WeekPlan } from '@/data/trainingPlan'

interface Props {
  day: DayPlan
  week: WeekPlan
  isToday?: boolean
  isPast?: boolean
  isFuture?: boolean
  completed?: boolean
  compact?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  isToday: false,
  isPast: false,
  isFuture: false,
  completed: false,
  compact: false
})

const sessionIcon = computed(() => {
  const icons: Record<string, string> = {
    'run-easy': '🏃',
    'run-quality': '⚡',
    'run-long': '🏔️',
    'strength-a': '💪',
    'strength-b': '🔥',
    'rest': '😴',
    'mobility': '🧘'
  }
  return icons[props.day.session.type] || '📋'
})

const sessionColor = computed(() => {
  const colors: Record<string, string> = {
    'run-easy': '#4ade80',
    'run-quality': '#fbbf24',
    'run-long': '#f97316',
    'strength-a': '#3b82f6',
    'strength-b': '#3b82f6',
    'rest': '#9ca3af',
    'mobility': '#8b5cf6'
  }
  return colors[props.day.session.type] || '#6b7280'
})

const phaseLabel = computed(() => {
  const labels: Record<string, string> = {
    'reprise': 'Reprise',
    'construction': 'Construction',
    'specifique': 'Spécifique',
    'allegement': 'Allègement'
  }
  return labels[props.week.phase] || props.week.phase
})

const dayLabel = computed(() => {
  const days = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim']
  return days[props.day.day - 1] || `J${props.day.day}`
})
</script>

<template>
  <div
    class="day-card"
    :class="{
      'is-today': isToday,
      'is-past': isPast,
      'is-future': isFuture,
      'is-completed': completed,
      'is-compact': compact
    }"
    :style="{ '--session-color': sessionColor }"
  >
    <div class="day-header">
      <span class="day-icon">{{ sessionIcon }}</span>
      <div class="day-meta">
        <span class="day-label">{{ dayLabel }}</span>
        <span v-if="isToday" class="today-badge">Aujourd'hui</span>
        <span v-else-if="isPast" class="past-badge">Fait</span>
        <span v-else-if="isFuture" class="future-badge">À venir</span>
      </div>
    </div>

    <div v-if="!compact" class="day-content">
      <h3 class="session-title">{{ day.session.title }}</h3>
      <p class="session-description">{{ day.session.description }}</p>

      <div v-if="day.session.duration" class="session-duration">
        <span class="duration-icon">⏱️</span>
        <span>{{ day.session.duration }}</span>
      </div>

      <div v-if="day.session.details && day.session.details.length" class="session-details">
        <h4>Détails</h4>
        <ul>
          <li v-for="(detail, index) in day.session.details" :key="index">
            {{ detail }}
          </li>
        </ul>
      </div>
    </div>

    <div v-else class="day-content compact">
      <span class="session-title">{{ day.session.title }}</span>
      <span v-if="day.session.duration" class="session-duration">{{ day.session.duration }}</span>
    </div>

    <div v-if="!compact" class="day-footer">
      <span class="phase-badge">{{ phaseLabel }}</span>
      <span class="week-badge">S{{ week.week }}</span>
    </div>
  </div>
</template>

<style scoped>
.day-card {
  background: #1c1c1e;
  border-radius: 16px;
  padding: 20px;
  border: 2px solid transparent;
  transition: all 0.2s ease;
  position: relative;
  overflow: hidden;
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
}

.day-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: var(--session-color);
}

.day-card.is-today {
  border-color: var(--session-color);
  box-shadow: 0 0 0 2px var(--session-color), 0 8px 24px rgba(0, 0, 0, 0.3);
}

.day-card.is-completed {
  opacity: 0.85;
}

.day-card.is-completed::after {
  content: '✓';
  position: absolute;
  top: 16px;
  right: 16px;
  width: 28px;
  height: 28px;
  background: #30d158;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: white;
  font-weight: 700;
}

.day-card.is-compact {
  padding: 12px 16px;
  min-width: 100px;
  border-radius: 12px;
}

.day-card.is-compact::before {
  height: 3px;
}

/* Header */
.day-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.day-icon {
  font-size: 28px;
  line-height: 1;
}

.day-card.is-compact .day-icon {
  font-size: 20px;
}

.day-meta {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.day-label {
  font-weight: 600;
  font-size: 13px;
  color: #8e8e93;
  text-transform: uppercase;
  letter-spacing: 0.03em;
}

.today-badge,
.past-badge,
.future-badge {
  font-size: 11px;
  padding: 3px 8px;
  border-radius: 10px;
  font-weight: 600;
}

.today-badge {
  background: var(--session-color);
  color: #000;
}

.past-badge {
  background: #30d158;
  color: #000;
}

.future-badge {
  background: #3a3a3c;
  color: #8e8e93;
}

/* Content */
.day-content {
  margin-bottom: 16px;
}

.day-content.compact {
  display: flex;
  flex-direction: column;
  gap: 2px;
  margin-bottom: 0;
}

.session-title {
  font-size: 22px;
  font-weight: 700;
  margin: 0 0 8px 0;
  color: #fff;
  line-height: 1.2;
}

.day-content.compact .session-title {
  font-size: 13px;
  margin: 0;
  font-weight: 600;
}

.session-description {
  font-size: 15px;
  color: #aeaeb2;
  margin: 0 0 12px 0;
  line-height: 1.4;
}

.session-duration {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 15px;
  color: #8e8e93;
  margin-bottom: 16px;
  font-weight: 500;
}

.day-content.compact .session-duration {
  font-size: 11px;
  margin-bottom: 0;
}

.duration-icon {
  font-size: 14px;
}

/* Details */
.session-details {
  background: #2c2c2e;
  border-radius: 12px;
  padding: 14px;
}

.session-details h4 {
  font-size: 13px;
  font-weight: 600;
  margin: 0 0 10px 0;
  color: #fff;
  text-transform: uppercase;
  letter-spacing: 0.02em;
}

.session-details ul {
  margin: 0;
  padding-left: 18px;
  font-size: 14px;
  color: #aeaeb2;
}

.session-details li {
  margin-bottom: 6px;
  line-height: 1.4;
}

.session-details li:last-child {
  margin-bottom: 0;
}

/* Footer */
.day-footer {
  display: flex;
  gap: 8px;
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid #2c2c2e;
}

.phase-badge,
.week-badge {
  font-size: 11px;
  padding: 5px 10px;
  border-radius: 6px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.02em;
}

.phase-badge {
  background: rgba(10, 132, 255, 0.15);
  color: #0a84ff;
}

.week-badge {
  background: #3a3a3c;
  color: #8e8e93;
}
</style>
