<script setup lang="ts">
import { computed } from 'vue'
import type { DayPlan, WeekPlan } from '@/data/trainingPlan'
import { Trophy, Clock, Dumbbell, Footprints, Flower2, Leaf } from 'lucide-vue-next'

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
  const icons: Record<string, { icon: any; color: string; bgColor: string }> = {
    'run-easy': { icon: Footprints, color: 'text-accent-pink', bgColor: 'bg-accent-pink/10' },
    'run-quality': { icon: Trophy, color: 'text-cta-gold', bgColor: 'bg-cta-gold/10' },
    'run-long': { icon: Footprints, color: 'text-accent-pink', bgColor: 'bg-accent-pink/20' },
    'strength-a': { icon: Dumbbell, color: 'text-accent-sage', bgColor: 'bg-accent-sage/20' },
    'strength-b': { icon: Dumbbell, color: 'text-accent-sage', bgColor: 'bg-accent-sage/20' },
    'rest': { icon: Flower2, color: 'text-text-muted', bgColor: 'bg-border-soft' },
    'mobility': { icon: Leaf, color: 'text-cta-gold', bgColor: 'bg-cta-gold/10' }
  }
  return icons[props.day.session.type] || { icon: Clock, color: 'text-text-muted', bgColor: 'bg-border-soft' }
})

const sessionColor = computed(() => {
  const colors: Record<string, string> = {
    'run-easy': '#E8B4B8',
    'run-quality': '#D4AF37',
    'run-long': '#E8B4B8',
    'strength-a': '#A8D5BA',
    'strength-b': '#A8D5BA',
    'rest': '#95A5A6',
    'mobility': '#D4AF37'
  }
  return colors[props.day.session.type] || '#636E72'
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
  const days = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche']
  const shortDays = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim']
  return props.compact ? shortDays[props.day.day - 1] : days[props.day.day - 1]
})
</script>

<template>
  <div
    class="relative overflow-hidden touch-manipulation transition-all duration-300 bg-bg-surface"
    :class="[
      compact
        ? 'p-4 rounded-2xl'
        : 'p-6 rounded-3xl',
      'border-2',
      isToday
        ? 'border-cta-gold shadow-gold'
        : completed
          ? 'border-accent-sage shadow-md'
          : 'border-transparent shadow-md',
      'hover:shadow-lg hover:-translate-y-0.5'
    ]"
  >
    <!-- Completed badge -->
    <div
      v-if="completed && !compact"
      class="absolute top-5 right-5 w-8 h-8 bg-accent-sage rounded-full flex items-center justify-center shadow-sm"
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    </div>

    <!-- Header -->
    <div
      class="flex items-center gap-4"
      :class="compact ? 'mb-0' : 'mb-5'"
    >
      <div
        class="rounded-2xl flex items-center justify-center"
        :class="[
          compact ? 'w-10 h-10' : 'w-14 h-14',
          sessionIcon.bgColor
        ]"
      >
        <component
          :is="sessionIcon.icon"
          :size="compact ? 18 : 24"
          :stroke-width="1.5"
          :class="sessionIcon.color"
        />
      </div>

      <div class="flex flex-col gap-1">
        <span class="font-heading text-sm text-text-muted tracking-wide">
          {{ dayLabel }}
        </span>
        <span
          v-if="isToday"
          class="text-[10px] px-2 py-0.5 rounded-full font-semibold text-white bg-cta-gold w-fit"
        >
          Aujourd'hui
        </span>
        <span
          v-else-if="isPast"
          class="text-[10px] px-2 py-0.5 rounded-full font-semibold text-white bg-accent-sage w-fit"
        >
          Fait
        </span>
        <span
          v-else-if="isFuture"
          class="text-[10px] px-2 py-0.5 rounded-full font-semibold text-text-muted bg-bg-primary w-fit"
        >
          À venir
        </span>
      </div>
    </div>

    <!-- Content -->
    <div v-if="!compact" class="mb-5">
      <h3 class="font-heading text-2xl font-semibold text-text-primary leading-tight mb-2">
        {{ day.session.title }}
      </h3>
      <p class="text-sm text-text-secondary leading-relaxed mb-4">
        {{ day.session.description }}
      </p>

      <div
        v-if="day.session.duration"
        class="flex items-center gap-2 text-sm text-text-muted mb-5"
      >
        <Clock :size="16" :stroke-width="1.5" />
        <span class="font-medium">{{ day.session.duration }}</span>
      </div>

      <div
        v-if="day.session.details && day.session.details.length"
        class="bg-bg-primary rounded-2xl p-5"
      >
        <h4 class="text-xs font-semibold text-text-primary uppercase tracking-wider mb-3">
          Détails
        </h4>
        <ul class="space-y-2">
          <li
            v-for="(detail, index) in day.session.details"
            :key="index"
            class="text-sm text-text-secondary leading-relaxed flex items-start gap-2"
          >
            <span class="w-1.5 h-1.5 rounded-full bg-accent-pink mt-2 flex-shrink-0" />
            {{ detail }}
          </li>
        </ul>
      </div>
    </div>

    <!-- Compact content -->
    <div v-else class="flex flex-col gap-1">
      <span class="text-sm font-semibold text-text-primary font-heading">
        {{ day.session.title }}
      </span>
      <span
        v-if="day.session.duration"
        class="text-xs text-text-muted"
      >
        {{ day.session.duration }}
      </span>
    </div>

    <!-- Footer -->
    <div
      v-if="!compact"
      class="flex gap-2 mt-5 pt-5 border-t border-border-soft"
    >
      <span class="text-[11px] px-3 py-1.5 rounded-lg font-semibold uppercase tracking-wide bg-accent-pink/10 text-accent-pink">
        {{ phaseLabel }}
      </span>
      <span class="text-[11px] px-3 py-1.5 rounded-lg font-semibold uppercase tracking-wide bg-bg-primary text-text-muted">
        S{{ week.week }}
      </span>
    </div>
  </div>
</template>
