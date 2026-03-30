import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { API_URL } from '@/config/api'

interface User {
  id: string
  username: string
  email: string
}

export const useAuthStore = defineStore('auth', () => {
  // State
  const token = ref<string | null>(localStorage.getItem('token'))
  const user = ref<User | null>(null)
  const isLoading = ref(false)
  const isInitializing = ref(true)
  const error = ref<string | null>(null)

  // Getters
  const isAuthenticated = computed(() => !!token.value)

  // Actions
  async function login(email: string, password: string): Promise<boolean> {
    isLoading.value = true
    error.value = null

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        error.value = data.error || 'Erreur de connexion'
        return false
      }

      token.value = data.token
      user.value = data.user
      localStorage.setItem('token', data.token)
      return true
    } catch (err) {
      error.value = 'Erreur réseau'
      return false
    } finally {
      isLoading.value = false
    }
  }

  async function register(username: string, email: string, password: string): Promise<boolean> {
    isLoading.value = true
    error.value = null

    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        error.value = data.error || 'Erreur d\'inscription'
        return false
      }

      token.value = data.token
      user.value = data.user
      localStorage.setItem('token', data.token)
      return true
    } catch (err) {
      error.value = 'Erreur réseau'
      return false
    } finally {
      isLoading.value = false
    }
  }

  async function fetchProfile(): Promise<boolean> {
    if (!token.value) return false

    try {
      const response = await fetch(`${API_URL}/auth/profile`, {
        headers: {
          'Authorization': `Bearer ${token.value}`,
        },
      })

      const data = await response.json()

      if (!response.ok) {
        logout()
        return false
      }

      user.value = data.user
      return true
    } catch (err) {
      return false
    }
  }

  function logout() {
    token.value = null
    user.value = null
    localStorage.removeItem('token')
  }

  async function init() {
    if (token.value) {
      const valid = await fetchProfile()
      if (!valid) {
        logout()
      }
    }
    isInitializing.value = false
  }

  return {
    token,
    user,
    isLoading,
    isInitializing,
    error,
    isAuthenticated,
    login,
    register,
    logout,
    fetchProfile,
    init,
  }
})
