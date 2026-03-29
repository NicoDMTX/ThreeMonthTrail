import { ref } from 'vue'
import { defineStore } from 'pinia'

// Example store - replace with app-specific stores
export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)

  function increment() {
    count.value++
  }

  return { count, increment }
})
