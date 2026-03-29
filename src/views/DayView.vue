<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useTrainingStore } from '@/stores/training'
import DayCard from '@/components/DayCard.vue'
import DayNotes from '@/components/DayNotes.vue'

const store = useTrainingStore()

const selectedDayInfo = computed(() => store.selectedDay)
const selectedProgress = computed(() => store.selectedDayProgress)
const daysAround = computed(() => store.daysAroundSelected)
const globalProgress = computed(() => store.globalProgress)

const isTodaySelected = computed(() => {
  return store.selectedDayIndex === store.currentDayIndex
})

function selectDay(index: number) {
  store.selectDay(index)
}

function toggleComplete() {
  const day = selectedDayInfo.value
  if (day) {
    store.toggleDayComplete(day.weekIndex, day.dayIndex)
  }
}

function updateFeeling(feeling: 1 | 2 | 3 | 4 | 5) {
  const day = selectedDayInfo.value
  if (day) {
    store.updateDayFeeling(day.weekIndex, day.dayIndex, feeling)
  }
}

function updateNotes(notes: string) {
  const day = selectedDayInfo.value
  if (day) {
    store.updateDayNotes(day.weekIndex, day.dayIndex, notes)
  }
}

function updatePainNotes(notes: string) {
  const day = selectedDayInfo.value
  if (day) {
    store.updatePainNotes(day.weekIndex, day.dayIndex, notes)
  }
}

function updateDuration(duration: string) {
  const day = selectedDayInfo.value
  if (day) {
    store.updateActualDuration(day.weekIndex, day.dayIndex, duration)
  }
}

function goToToday() {
  store.goToToday()
}

function goToNext() {
  store.goToNextDay()
}

function goToPrevious() {
  store.goToPreviousDay()
}

onMounted(() => {
  store.goToToday()
})
</script>

<template>
  <div class="day-view">
    <!-- Header avec progression -->
    <header class="view-header">
      <div class="progress-info">
        <span class="progress-text">Semaine {{ selectedDayInfo?.week.week || 1 }}/12</span>
        <div class="progress-bar">
          <div
            class="progress-fill"
            :style="{ width: `${globalProgress.percentage}%` }"
          />
        </div>
      </div>
      <button
        v-if="!isTodaySelected"
        class="today-btn"
        @click="goToToday"
      >
        Aujourd'hui
      </button>
    </header>

    <!-- Timeline des jours -->
    <div class="timeline-strip">
      <button
        v-for="dayInfo in daysAround"
        :key="dayInfo.globalIndex"
        class="timeline-item"
        :class="{
          'is-today': dayInfo.isToday,
          'is-completed': store.progress.get(`${dayInfo.weekIndex}-${dayInfo.dayIndex}`)?.completed
        }"
        @click="selectDay(dayInfo.globalIndex)"
      >
        <span class="timeline-day">{{ ['L', 'M', 'M', 'J', 'V', 'S', 'D'][dayInfo.day.day - 1] }}</span>
        <span class="timeline-icon">{{ dayInfo.day.session.type.startsWith('run') ? '🏃' : dayInfo.day.session.type.startsWith('strength') ? '💪' : dayInfo.day.session.type === 'rest' ? '😴' : '🧘' }}</span>
        <span class="timeline-dot" />
      </button>
    </div>

    <!-- Navigation principale -->
    <div class="main-nav">
      <button
        class="nav-btn"
        :disabled="store.selectedDayIndex === 0"
        @click="goToPrevious"
      >
        ‹
      </button>

      <div class="day-container" v-if="selectedDayInfo">
        <DayCard
          :day="selectedDayInfo.day"
          :week="selectedDayInfo.week"
          :is-today="isTodaySelected"
          :is-past="store.selectedDayIndex < store.currentDayIndex"
          :is-future="store.selectedDayIndex > store.currentDayIndex"
          :completed="selectedProgress?.completed"
        />

        <DayNotes
          :completed="selectedProgress?.completed || false"
          :feeling="selectedProgress?.feeling"
          :notes="selectedProgress?.notes || ''"
          :pain-notes="selectedProgress?.painNotes"
          :actual-duration="selectedProgress?.actualDuration"
          @toggle-complete="toggleComplete"
          @update-feeling="updateFeeling"
          @update-notes="updateNotes"
          @update-pain-notes="updatePainNotes"
          @update-duration="updateDuration"
        />
      </div>

      <button
        class="nav-btn"
        :disabled="store.selectedDayIndex >= store.totalDays - 1"
        @click="goToNext"
      >
        ›
      </button>
    </div>
  </div>
</template>

<style scoped>
.day-view {
  min-height: 100vh;
  background: #000;
  padding: 16px;
  padding-top: max(16px, env(safe-area-inset-top));
  padding-bottom: max(16px, env(safe-area-inset-bottom));
  display: flex;
  flex-direction: column;
  gap: 16px;
}

/* Header */
.view-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.progress-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.progress-text {
  font-size: 15px;
  font-weight: 600;
  color: #fff;
}

.progress-bar {
  height: 6px;
  background: #3a3a3c;
  border-radius: 3px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #30d158, #34c759);
  border-radius: 3px;
  transition: width 0.3s ease;
}

.today-btn {
  padding: 10px 16px;
  background: #0a84ff;
  color: #fff;
  border: none;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
  transition: all 0.15s ease;
}

.today-btn:active {
  transform: scale(0.96);
  opacity: 0.9;
}

/* Timeline */
.timeline-strip {
  display: flex;
  justify-content: center;
  gap: 8px;
  padding: 8px 0;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}

.timeline-strip::-webkit-scrollbar {
  display: none;
}

.timeline-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  padding: 10px 12px;
  background: #1c1c1e;
  border: 2px solid transparent;
  border-radius: 12px;
  cursor: pointer;
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
  transition: all 0.15s ease;
  min-width: 52px;
}

.timeline-item:active {
  transform: scale(0.95);
}

.timeline-item.is-today {
  border-color: #0a84ff;
  background: rgba(10, 132, 255, 0.15);
}

.timeline-item.is-completed {
  background: rgba(48, 209, 88, 0.15);
}

.timeline-item.is-completed .timeline-dot {
  background: #30d158;
}

.timeline-day {
  font-size: 13px;
  font-weight: 600;
  color: #8e8e93;
}

.timeline-item.is-today .timeline-day {
  color: #0a84ff;
}

.timeline-icon {
  font-size: 18px;
  line-height: 1;
}

.timeline-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #3a3a3c;
}

.timeline-item.is-today .timeline-dot {
  background: #0a84ff;
}

/* Main navigation */
.main-nav {
  flex: 1;
  display: flex;
  align-items: stretch;
  gap: 8px;
  min-height: 0;
}

.nav-btn {
  width: 44px;
  min-width: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #1c1c1e;
  border: none;
  border-radius: 14px;
  color: #fff;
  font-size: 28px;
  font-weight: 300;
  cursor: pointer;
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
  transition: all 0.15s ease;
}

.nav-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.nav-btn:not(:disabled):active {
  background: #2c2c2e;
  transform: scale(0.96);
}

.day-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}

.day-container::-webkit-scrollbar {
  display: none;
}

.day-container > :deep(*) {
  flex-shrink: 0;
}

.day-container :deep(.day-card) {
  margin-bottom: 12px;
}
</style>
