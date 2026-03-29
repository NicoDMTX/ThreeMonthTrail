<script setup lang="ts">
import { computed } from 'vue'
import { useTrainingStore } from '@/stores/training'
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-vue-next'

const store = useTrainingStore()

const selectedDayInfo = computed(() => store.selectedDay)
const daysAround = computed(() => store.daysAroundSelected)
const globalProgress = computed(() => store.globalProgress)

const isTodaySelected = computed(() => {
  return store.selectedDayIndex === store.currentDayIndex
})

function selectDay(index: number) {
  store.selectDay(index)
}

function goToToday() {
  store.goToToday()
}

function goToPrevious() {
  store.goToPreviousDay()
}

function goToNext() {
  store.goToNextDay()
}

function getDayIcon(type: string): string {
  if (type.startsWith('run')) return 'Run'
  if (type.startsWith('strength')) return 'Force'
  if (type === 'rest') return 'Repos'
  return 'Mobilité'
}

function getSessionIcon(type: string) {
  // Using text labels instead of emojis per design system
  if (type.startsWith('run')) return { color: '#E8B4B8', label: 'R' }
  if (type.startsWith('strength')) return { color: '#A8D5BA', label: 'F' }
  if (type === 'rest') return { color: '#95A5A6', label: 'Z' }
  return { color: '#D4AF37', label: 'M' }
}
</script>

<template>
  <header class="sticky top-0 z-50 bg-bg-surface/95 backdrop-blur-xl border-b border-border-soft shadow-sm">
    <div class="p-5 pt-[max(20px,env(safe-area-inset-top))]">
      <!-- Title row with navigation -->
      <div class="flex items-center justify-between gap-4 mb-5">
        <div class="flex items-center gap-3">
          <button
            class="w-10 h-10 flex items-center justify-center rounded-full bg-bg-primary border border-border-soft text-text-secondary transition-all duration-200 hover:bg-accent-pink-soft hover:text-accent-pink hover:border-accent-pink disabled:opacity-40 disabled:cursor-not-allowed [touch-action:manipulation]"
            :disabled="store.selectedDayIndex === 0"
            @click="goToPrevious"
          >
            <ChevronLeft :size="20" :stroke-width="1.5" />
          </button>

          <div class="mr-2">
            <h1 class="font-heading text-2xl font-semibold text-text-primary leading-tight">
              Semaine {{ selectedDayInfo?.week.week || 1 }}
            </h1>
            <p class="text-xs text-text-muted font-medium tracking-wide uppercase mt-0.5">
              {{ globalProgress.percentage }}% complété
            </p>
          </div>
        </div>

        <div class="flex items-center gap-3">
          <button
            v-if="!isTodaySelected"
            class="px-2 py-2 bg-cta-gold text-white rounded-xl text-sm font-semibold shadow-gold transition-all duration-200 hover:bg-cta-gold-hover hover:-translate-y-0.5 active:translate-y-0 [touch-action:manipulation]"
            @click="goToToday"
          >
            Aujourd'hui
          </button>

          <button
            class="w-10 h-10 flex items-center justify-center rounded-full bg-bg-primary border border-border-soft text-text-secondary transition-all duration-200 hover:bg-accent-pink-soft hover:text-accent-pink hover:border-accent-pink disabled:opacity-40 disabled:cursor-not-allowed [touch-action:manipulation]"
            :disabled="store.selectedDayIndex >= store.totalDays - 1"
            @click="goToNext"
          >
            <ChevronRight :size="20" :stroke-width="1.5" />
          </button>
        </div>
      </div>

      <!-- Progress bar -->
      <div class="h-2 bg-bg-primary rounded-full overflow-hidden mb-5">
        <div
          class="h-full bg-gradient-to-r from-accent-pink to-accent-sage rounded-full transition-all duration-500 ease-out"
          :style="{ width: `${globalProgress.percentage}%` }"
        />
      </div>

      <!-- Timeline strip -->
      <div class="flex justify-center gap-3 overflow-x-auto scrollbar-hide px-2">
        <button
          v-for="dayInfo in daysAround"
          :key="dayInfo.globalIndex"
          class="flex flex-col items-center gap-1.5 px-4 py-2.5 bg-bg-primary border-2 rounded-xl cursor-pointer [touch-action:manipulation] transition-all duration-200 min-w-[60px] hover:shadow-md"
          :class="{
            'border-cta-gold bg-cta-gold-soft shadow-gold': dayInfo.isToday,
            'border-accent-pink bg-accent-pink-soft': !dayInfo.isToday && store.progress.get(`${dayInfo.weekIndex}-${dayInfo.dayIndex}`)?.completed,
            'border-transparent': !dayInfo.isToday && !store.progress.get(`${dayInfo.weekIndex}-${dayInfo.dayIndex}`)?.completed
          }"
          @click="selectDay(dayInfo.globalIndex)"
        >
          <span
            class="text-xs font-semibold tracking-wide"
            :class="dayInfo.isToday ? 'text-cta-gold' : 'text-text-muted'"
          >
            {{ ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'][dayInfo.day.day - 1] }}
          </span>

          <div
            class="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
            :style="{ backgroundColor: getSessionIcon(dayInfo.day.session.type).color + '20', color: getSessionIcon(dayInfo.day.session.type).color }"
          >
            {{ getSessionIcon(dayInfo.day.session.type).label }}
          </div>

          <span
            class="w-1.5 h-1.5 rounded-full"
            :class="dayInfo.isToday ? 'bg-cta-gold' : store.progress.get(`${dayInfo.weekIndex}-${dayInfo.dayIndex}`)?.completed ? 'bg-accent-sage' : 'bg-border-soft'"
          />
        </button>
      </div>
    </div>
  </header>
</template>
