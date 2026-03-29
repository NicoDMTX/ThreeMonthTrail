<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useTrainingStore } from '@/stores/training'
import DayCard from '@/components/DayCard.vue'
import DayNotes from '@/components/DayNotes.vue'

const store = useTrainingStore()

const selectedDayInfo = computed(() => store.selectedDay)
const selectedProgress = computed(() => store.selectedDayProgress)

const isTodaySelected = computed(() => {
  return store.selectedDayIndex === store.currentDayIndex
})

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

onMounted(() => {
  store.goToToday()
})
</script>

<template>
  <div class="h-full pt-[max(16px,env(safe-area-inset-top))] pt-6 pb-[calc(16px+80px)]">
    <DayCard
      v-if="selectedDayInfo"
      :day="selectedDayInfo.day"
      :week="selectedDayInfo.week"
      :is-today="isTodaySelected"
      :is-past="store.selectedDayIndex < store.currentDayIndex"
      :is-future="store.selectedDayIndex > store.currentDayIndex"
      :completed="selectedProgress?.completed"
      class="mb-3"
    />

    <DayNotes
      v-if="selectedDayInfo"
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
</template>
