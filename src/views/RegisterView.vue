<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const auth = useAuthStore()

const username = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const error = ref('')

async function register() {
  error.value = ''

  if (!username.value || !email.value || !password.value) {
    error.value = 'Veuillez remplir tous les champs'
    return
  }

  if (password.value.length < 6) {
    error.value = 'Le mot de passe doit contenir au moins 6 caractères'
    return
  }

  if (password.value !== confirmPassword.value) {
    error.value = 'Les mots de passe ne correspondent pas'
    return
  }

  const success = await auth.register(username.value, email.value, password.value)

  if (success) {
    // router.push('/home')
  } else {
    error.value = auth.error || 'Erreur lors de l\'inscription'
  }
}

function goToLogin() {
  router.push('/')
}
</script>

<template>
  <div class="h-full flex flex-col items-center justify-center px-6">
    <div class="w-full max-w-xs">
      <h1 class="text-2xl font-bold text-text-primary text-center mb-2">
        Trail 12km
      </h1>
      <p class="text-sm text-text-secondary text-center mb-8">
        Créez votre compte
      </p>

      <form @submit.prevent="register" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-text-primary mb-1">
            Nom d'utilisateur
          </label>
          <input
            v-model="username"
            type="text"
            class="w-full px-4 py-3 rounded-xl bg-bg-surface border border-border-muted text-text-primary placeholder-text-muted focus:outline-none focus:border-cta-gold"
            placeholder="Entrez votre nom"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-text-primary mb-1">
            Email
          </label>
          <input
            v-model="email"
            type="email"
            class="w-full px-4 py-3 rounded-xl bg-bg-surface border border-border-muted text-text-primary placeholder-text-muted focus:outline-none focus:border-cta-gold"
            placeholder="votre@email.com"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-text-primary mb-1">
            Mot de passe
          </label>
          <input
            v-model="password"
            type="password"
            class="w-full px-4 py-3 rounded-xl bg-bg-surface border border-border-muted text-text-primary placeholder-text-muted focus:outline-none focus:border-cta-gold"
            placeholder="••••••••"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-text-primary mb-1">
            Confirmer le mot de passe
          </label>
          <input
            v-model="confirmPassword"
            type="password"
            class="w-full px-4 py-3 rounded-xl bg-bg-surface border border-border-muted text-text-primary placeholder-text-muted focus:outline-none focus:border-cta-gold"
            placeholder="••••••••"
          />
        </div>

        <div
          v-if="error"
          class="text-sm text-red-500 text-center py-2 px-3 bg-red-500/10 rounded-lg"
        >
          {{ error }}
        </div>

        <button
          type="submit"
          :disabled="auth.isLoading"
          class="w-full py-3.5 rounded-xl bg-cta-gold text-white font-medium shadow-gold transition-all duration-200 hover:bg-cta-gold-hover hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {{ auth.isLoading ? 'Création...' : 'Créer un compte' }}
        </button>
      </form>

      <div class="mt-6 text-center">
        <p class="text-sm text-text-secondary">
          Déjà un compte ?
          <button
            @click="goToLogin"
            class="text-cta-gold font-medium hover:underline"
          >
            Se connecter
          </button>
        </p>
      </div>

      <p class="text-xs text-text-secondary text-center mt-6">
        Connexion sécurisée
      </p>
    </div>
  </div>
</template>
