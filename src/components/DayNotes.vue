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
  <div class="day-notes">
    <div class="actions-row">
      <button
        class="complete-btn"
        :class="{ 'is-completed': completed }"
        @click="emit('toggleComplete')"
      >
        <span class="check-icon">{{ completed ? '✓' : '○' }}</span>
        <span>{{ completed ? 'Séance terminée' : 'Marquer comme fait' }}</span>
      </button>
    </div>

    <div v-if="completed" class="feeling-section">
      <h4>Ressenti</h4>
      <div class="feeling-options">
        <button
          v-for="f in feelings"
          :key="f.value"
          class="feeling-btn"
          :class="{ 'is-selected': feeling === f.value }"
          @click="emit('updateFeeling', f.value)"
          :title="f.label"
        >
          <span class="feeling-emoji">{{ f.emoji }}</span>
          <span class="feeling-label">{{ f.label }}</span>
        </button>
      </div>
    </div>

    <div class="form-section">
      <label for="actual-duration">Durée réelle</label>
      <input
        id="actual-duration"
        v-model="localDuration"
        type="text"
        placeholder="ex: 35 min"
        @blur="saveDuration"
        @keyup.enter="saveDuration"
      />
    </div>

    <div class="form-section">
      <label for="session-notes">Notes</label>
      <textarea
        id="session-notes"
        v-model="localNotes"
        rows="3"
        placeholder="Ressenti, allure, difficultés..."
        @blur="saveNotes"
      />
    </div>

    <div class="form-section">
      <label for="pain-notes">Douleurs / Points de vigilance</label>
      <textarea
        id="pain-notes"
        v-model="localPainNotes"
        rows="2"
        placeholder="Tendon d'Achille, genou, tibia..."
        @blur="savePainNotes"
      />
      <p class="hint">Note ici toute douleur pour suivre l'évolution</p>
    </div>
  </div>
</template>

<style scoped>
.day-notes {
  background: #2c2c2e;
  border-radius: 16px;
  padding: 20px;
  margin-top: 16px;
}

.actions-row {
  margin-bottom: 20px;
}

.complete-btn {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 16px 20px;
  border: 2px solid #3a3a3c;
  border-radius: 14px;
  background: transparent;
  color: #aeaeb2;
  font-size: 17px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
  min-height: 56px;
}

.complete-btn:active {
  transform: scale(0.98);
}

.complete-btn.is-completed {
  background: #30d158;
  border-color: #30d158;
  color: #000;
}

.check-icon {
  font-size: 20px;
  line-height: 1;
}

/* Feeling section */
.feeling-section {
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #3a3a3c;
}

.feeling-section h4 {
  margin: 0 0 12px 0;
  font-size: 15px;
  font-weight: 600;
  color: #fff;
}

.feeling-options {
  display: flex;
  gap: 8px;
  overflow-x: auto;
  padding-bottom: 4px;
  -webkit-overflow-scrolling: touch;
}

.feeling-options::-webkit-scrollbar {
  display: none;
}

.feeling-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 12px 14px;
  border: 2px solid #3a3a3c;
  border-radius: 12px;
  background: transparent;
  cursor: pointer;
  transition: all 0.15s ease;
  min-width: 64px;
  min-height: 72px;
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
  flex-shrink: 0;
}

.feeling-btn:active {
  transform: scale(0.95);
}

.feeling-btn.is-selected {
  border-color: #0a84ff;
  background: rgba(10, 132, 255, 0.15);
}

.feeling-emoji {
  font-size: 24px;
  line-height: 1;
}

.feeling-label {
  font-size: 11px;
  color: #8e8e93;
  font-weight: 500;
}

.feeling-btn.is-selected .feeling-label {
  color: #0a84ff;
}

/* Form sections */
.form-section {
  margin-bottom: 16px;
}

.form-section:last-child {
  margin-bottom: 0;
}

.form-section label {
  display: block;
  font-size: 15px;
  font-weight: 600;
  color: #fff;
  margin-bottom: 8px;
}

.form-section input,
.form-section textarea {
  width: 100%;
  padding: 14px 16px;
  border: 1px solid #3a3a3c;
  border-radius: 12px;
  background: #1c1c1e;
  color: #fff;
  font-size: 17px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  resize: vertical;
  transition: border-color 0.2s ease;
  -webkit-appearance: none;
}

.form-section input:focus,
.form-section textarea:focus {
  outline: none;
  border-color: #0a84ff;
}

.form-section input::placeholder,
.form-section textarea::placeholder {
  color: #636366;
}

.hint {
  margin: 8px 0 0 0;
  font-size: 13px;
  color: #ff9f0a;
  line-height: 1.3;
}
</style>
