import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { trainingPlan, getTotalDays, getDayByIndex, type WeekPlan, type DayPlan } from '@/data/trainingPlan'

export interface DayProgress {
  weekIndex: number
  dayIndex: number
  completed: boolean
  feeling?: 1 | 2 | 3 | 4 | 5
  notes: string
  actualDuration?: string
  painNotes?: string
}

export const useTrainingStore = defineStore('training', () => {
  // Date de début de la prépa (par défaut : aujourd'hui)
  const startDate = ref<Date>(new Date())

  // Progression des séances (clé: "weekIndex-dayIndex")
  const progress = ref<Map<string, DayProgress>>(new Map())

  // Jour actuellement sélectionné (par défaut: aujourd'hui)
  const selectedDayIndex = ref<number>(0)

  // Getters
  const totalDays = computed(() => getTotalDays())

  const currentDayIndex = computed(() => {
    const now = new Date()
    const start = startDate.value
    const diffTime = now.getTime() - start.getTime()
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
    return Math.max(0, Math.min(diffDays, totalDays.value - 1))
  })

  const selectedDay = computed(() => {
    return getDayByIndex(selectedDayIndex.value)
  })

  const selectedDayProgress = computed(() => {
    const s = selectedDay.value
    if (!s) return null
    const key = `${s.weekIndex}-${s.dayIndex}`
    return progress.value.get(key) || {
      weekIndex: s.weekIndex,
      dayIndex: s.dayIndex,
      completed: false,
      notes: ''
    }
  })

  const daysAroundSelected = computed(() => {
    const days = []
    const current = selectedDayIndex.value

    // 3 jours avant
    for (let i = 3; i >= 1; i--) {
      const idx = current - i
      if (idx >= 0) {
        const dayInfo = getDayByIndex(idx)
        if (dayInfo) {
          days.push({
            ...dayInfo,
            isPast: true,
            isToday: false,
            isFuture: false,
            globalIndex: idx
          })
        }
      }
    }

    // Aujourd'hui
    const todayInfo = getDayByIndex(current)
    if (todayInfo) {
      days.push({
        ...todayInfo,
        isPast: false,
        isToday: true,
        isFuture: false,
        globalIndex: current
      })
    }

    // 3 jours après
    for (let i = 1; i <= 3; i++) {
      const idx = current + i
      if (idx < totalDays.value) {
        const dayInfo = getDayByIndex(idx)
        if (dayInfo) {
          days.push({
            ...dayInfo,
            isPast: false,
            isToday: false,
            isFuture: true,
            globalIndex: idx
          })
        }
      }
    }

    return days
  })

  const globalProgress = computed(() => {
    let completed = 0
    for (let i = 0; i <= currentDayIndex.value; i++) {
      const day = getDayByIndex(i)
      if (day) {
        const key = `${day.weekIndex}-${day.dayIndex}`
        const p = progress.value.get(key)
        if (p?.completed) completed++
      }
    }
    return {
      completed,
      total: currentDayIndex.value + 1,
      percentage: Math.round((completed / (currentDayIndex.value + 1)) * 100)
    }
  })

  const weekProgress = computed(() => {
    const result: { weekIndex: number; completed: number; total: number }[] = []

    trainingPlan.forEach((week, weekIndex) => {
      let completed = 0
      week.days.forEach((_, dayIndex) => {
        const key = `${weekIndex}-${dayIndex}`
        const p = progress.value.get(key)
        if (p?.completed) completed++
      })
      result.push({
        weekIndex,
        completed,
        total: week.days.length
      })
    })

    return result
  })

  // Actions
  function setStartDate(date: Date) {
    startDate.value = date
  }

  function selectDay(globalIndex: number) {
    selectedDayIndex.value = Math.max(0, Math.min(globalIndex, totalDays.value - 1))
  }

  function goToToday() {
    selectedDayIndex.value = currentDayIndex.value
  }

  function toggleDayComplete(weekIndex: number, dayIndex: number, completed?: boolean) {
    const key = `${weekIndex}-${dayIndex}`
    const existing = progress.value.get(key)
    const newCompleted = completed !== undefined ? completed : !(existing?.completed ?? false)

    progress.value.set(key, {
      weekIndex,
      dayIndex,
      completed: newCompleted,
      notes: existing?.notes || '',
      feeling: existing?.feeling,
      actualDuration: existing?.actualDuration,
      painNotes: existing?.painNotes
    })
  }

  function updateDayNotes(weekIndex: number, dayIndex: number, notes: string) {
    const key = `${weekIndex}-${dayIndex}`
    const existing = progress.value.get(key)
    if (existing) {
      existing.notes = notes
    } else {
      progress.value.set(key, {
        weekIndex,
        dayIndex,
        completed: false,
        notes
      })
    }
  }

  function updateDayFeeling(weekIndex: number, dayIndex: number, feeling: 1 | 2 | 3 | 4 | 5) {
    const key = `${weekIndex}-${dayIndex}`
    const existing = progress.value.get(key)
    if (existing) {
      existing.feeling = feeling
    } else {
      progress.value.set(key, {
        weekIndex,
        dayIndex,
        completed: false,
        notes: '',
        feeling
      })
    }
  }

  function updatePainNotes(weekIndex: number, dayIndex: number, painNotes: string) {
    const key = `${weekIndex}-${dayIndex}`
    const existing = progress.value.get(key)
    if (existing) {
      existing.painNotes = painNotes
    } else {
      progress.value.set(key, {
        weekIndex,
        dayIndex,
        completed: false,
        notes: '',
        painNotes
      })
    }
  }

  function updateActualDuration(weekIndex: number, dayIndex: number, duration: string) {
    const key = `${weekIndex}-${dayIndex}`
    const existing = progress.value.get(key)
    if (existing) {
      existing.actualDuration = duration
    } else {
      progress.value.set(key, {
        weekIndex,
        dayIndex,
        completed: false,
        notes: '',
        actualDuration: duration
      })
    }
  }

  // Navigation
  function goToNextDay() {
    if (selectedDayIndex.value < totalDays.value - 1) {
      selectedDayIndex.value++
    }
  }

  function goToPreviousDay() {
    if (selectedDayIndex.value > 0) {
      selectedDayIndex.value--
    }
  }

  return {
    // State
    startDate,
    progress,
    selectedDayIndex,
    trainingPlan,

    // Getters
    totalDays,
    currentDayIndex,
    selectedDay,
    selectedDayProgress,
    daysAroundSelected,
    globalProgress,
    weekProgress,

    // Actions
    setStartDate,
    selectDay,
    goToToday,
    toggleDayComplete,
    updateDayNotes,
    updateDayFeeling,
    updatePainNotes,
    updateActualDuration,
    goToNextDay,
    goToPreviousDay
  }
})
