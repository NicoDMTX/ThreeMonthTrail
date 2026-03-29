<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="app-container">
    <main class="main-content">
      <RouterView />
    </main>

    <nav class="bottom-nav">
      <RouterLink to="/" class="nav-item" active-class="is-active" exact>
        <span class="nav-icon">📅</span>
        <span class="nav-label">Aujourd'hui</span>
      </RouterLink>
      <RouterLink to="/plan" class="nav-item" active-class="is-active">
        <span class="nav-icon">📋</span>
        <span class="nav-label">Plan</span>
      </RouterLink>
      <RouterLink to="/stats" class="nav-item" active-class="is-active">
        <span class="nav-icon">📊</span>
        <span class="nav-label">Stats</span>
      </RouterLink>
    </nav>
  </div>
</template>

<style>
/* Reset et base mobile */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: #000;
  color: #fff;
}

body {
  min-height: 100vh;
  overflow-x: hidden;
}

#app {
  min-height: 100vh;
}

.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #000;
}

.main-content {
  flex: 1;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}

.main-content::-webkit-scrollbar {
  display: none;
}

/* Bottom navigation */
.bottom-nav {
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: rgba(28, 28, 30, 0.95);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-top: 1px solid #2c2c2e;
  padding: 8px 0 calc(8px + env(safe-area-inset-bottom));
  position: sticky;
  bottom: 0;
}

.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 6px 20px;
  text-decoration: none;
  color: #8e8e93;
  transition: color 0.2s ease;
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
}

.nav-item.is-active {
  color: #0a84ff;
}

.nav-icon {
  font-size: 22px;
  line-height: 1;
}

.nav-label {
  font-size: 11px;
  font-weight: 500;
}
</style>
