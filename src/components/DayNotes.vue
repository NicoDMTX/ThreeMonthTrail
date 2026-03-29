<script setup lang="ts">
import { ref, watch } from 'vue'

interface Props {
  completed: boolean
  feeling?: 1 | 2 | 3 | 4 | 5
  notes: string
  painNotes?: string
  actualDuration?: string
}

const props = defineProps<Props>()

const emit = defineEmits<{
  toggleComplete: []
  updateFeeling: [feeling: 1 | 2 | 3 | 4 | 5]
  updateNotes: [notes: string]
  updatePainNotes: [notes: string]
  updateDuration: [duration: string]
}>()

const localNotes = ref(props.notes)
const localPainNotes = ref(props.painNotes || '')
const localDuration = ref(props.actualDuration || '')

watch(() => props.notes, (newVal) => {
  localNotes.value = newVal
})

watch(() => props.painNotes, (newVal) => {
  localPainNotes.value = newVal || ''
})

watch(() => props.actualDuration, (newVal) => {
  localDuration.value = newVal || ''
})

function saveNotes() {
  emit('updateNotes', localNotes.value)
}

function savePainNotes() {
  emit('updatePainNotes', localPainNotes.value)
}

function saveDuration() {
  emit('updateDuration', localDuration.value)
}

const feelings = [
  { value: 1 as const, label: 'Dur', emoji: '😫' },
  { value: 2 as const, label: 'Moyen', emoji: '😓' },
  { value: 3 as const, label: 'OK', emoji: '😐' },
  { value: 4 as const, label: 'Bien', emoji: '🙂' },
  { value: 5 as const, label: 'Top', emoji: '🤩' }
]
</script>

<template>
  <div class="bg-bg-tertiary rounded-2xl p-5 mt-4">
    <!-- Complete button -->
    <div class="mb-5">
      <button
        class="w-full flex items-center justify-center gap-2.5 px-5 py-4 border-2 rounded-xl text-[17px] font-semibold cursor-pointer transition-all duration-200 [touch-action:manipulation] min-h-14 active:scale-[0.98]"
        :class="completed
          ? 'bg-accent-green border-accent-green text-black'
          : 'bg-transparent border-bg-quaternary text-text-secondary'"
        @click="emit('toggleComplete')"
      >
        <span class="text-xl leading-none">{{ completed ? '✓' : '○' }}</span>
        <span>{{ completed ? 'Séance terminée' : 'Marquer comme fait' }}</span>
      </button>
    </div>

    <!-- Feeling section -->
    <div
      v-if="completed"
      class="mb-5 pb-5 border-b border-bg-quaternary"
    >
      <h4 class="m-0 mb-3 text-[15px] font-semibold text-text-primary">
        Ressenti
      </h4>
      <div class="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
        <button
          v-for="f in feelings"
          :key="f.value"
          class="flex flex-col items-center gap-1 px-3.5 py-3 border-2 rounded-xl bg-transparent cursor-pointer transition-all duration-150 [touch-action:manipulation] min-w-16 min-h-[72px] flex-shrink-0 active:scale-95"
          :class="feeling === f.value
            ? 'border-accent-blue bg-accent-blue-soft'
            : 'border-bg-quaternary'"
          :title="f.label"
          @click="emit('updateFeeling', f.value)"
        >
          <span class="text-2xl leading-none">{{ f.emoji }}</span>
          <span
            class="text-[11px] font-medium"
            :class="feeling === f.value ? 'text-accent-blue' : 'text-text-tertiary'"
          >
            {{ f.label }}
          </span>
        </button>
      </div>
    </div>

    <!-- Duration input -->
    <div class="mb-4">
      <label
        for="actual-duration"
        class="block text-[15px] font-semibold text-text-primary mb-2"
      >
        Durée réelle
      </label>
      <input
        id="actual-duration"
        v-model="localDuration"
        type="text"
        placeholder="ex: 35 min"
        class="w-full px-4 py-3.5 border border-bg-quaternary rounded-xl bg-bg-secondary text-text-primary text-[17px] transition-colors duration-200 focus:outline-none focus:border-accent-blue placeholder:text-text-tertiary/50"
        @blur="saveDuration"
        @keyup.enter="saveDuration"
      />
    </div>

    <!-- Notes textarea -->
    <div class="mb-4">
      <label
        for="session-notes"
        class="block text-[15px] font-semibold text-text-primary mb-2"
      >
        Notes
      </label>
      <textarea
        id="session-notes"
        v-model="localNotes"
        rows="3"
        placeholder="Ressenti, allure, difficultés..."
        class="w-full px-4 py-3.5 border border-bg-quaternary rounded-xl bg-bg-secondary text-text-primary text-[17px] transition-colors duration-200 resize-y focus:outline-none focus:border-accent-blue placeholder:text-text-tertiary/50"
        @blur="saveNotes"
      />
    </div>

    <!-- Pain notes textarea -->
    <div>
      <label
        for="pain-notes"
        class="block text-[15px] font-semibold text-text-primary mb-2"
      >
        Douleurs / Points de vigilance
      </label>
      <textarea
        id="pain-notes"
        v-model="localPainNotes"
        rows="2"
        placeholder="Tendon d'Achille, genou, tibia..."
        class="w-full px-4 py-3.5 border border-bg-quaternary rounded-xl bg-bg-secondary text-text-primary text-[17px] transition-colors duration-200 resize-y focus:outline-none focus:border-accent-blue placeholder:text-text-tertiary/50"
        @blur="savePainNotes"
      />
      <p class="mt-2 text-[13px] text-accent-orange leading-snug">
        Note ici toute douleur pour suivre l'évolution
      </p>
    </div>
  </div>
</template>
