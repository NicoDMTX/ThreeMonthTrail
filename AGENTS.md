# Agent Guide: three_month_running

This is a **Vue 3 + TypeScript + Vite** single-page application using Pinia for state management and Vue Router for routing.

---

## Essential Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Type-check and build for production (outputs to `dist/`) |
| `npm run preview` | Preview production build locally |
| `npm run type-check` | Run TypeScript type checking only (uses `vue-tsc`) |
| `npm run lint` | Run all linters (Oxlint + ESLint with auto-fix) |
| `npm run lint:oxlint` | Run Oxlint only (fast, Rust-based linter) |
| `npm run lint:eslint` | Run ESLint only (with caching) |
| `npm run format` | Format code with Prettier |

---

## Project Structure

```
src/
├── assets/          # Static assets (CSS, images, fonts)
│   ├── base.css     # CSS variables/reset
│   └── main.css     # Global styles
├── components/      # Vue components
│   ├── icons/       # SVG icon components
│   ├── HelloWorld.vue
│   ├── TheWelcome.vue
│   └── WelcomeItem.vue
├── router/          # Vue Router configuration
│   └── index.ts
├── stores/          # Pinia stores
│   └── counter.ts
├── views/           # Page-level view components
│   ├── HomeView.vue
│   └── AboutView.vue
├── App.vue          # Root component
└── main.ts          # Application entry point

public/              # Static files copied to dist root
index.html           # HTML entry point
```

---

## Code Patterns & Conventions

### Vue Components

- **Use `<script setup lang="ts">`** - Composition API with TypeScript
- Props defined with `defineProps<{ ... }>()` (no need to import)
- Emits defined with `defineEmits<{ ... }>()` when needed
- Components use PascalCase naming (e.g., `HelloWorld.vue`)

Example:
```vue
<script setup lang="ts">
defineProps<{
  msg: string
}>()
</script>

<template>
  <div>{{ msg }}</div>
</template>

<style scoped>
/* Component-scoped styles */
</style>
```

### Path Aliases

- `@/` maps to `src/` directory
- Use for all imports from source: `import Component from '@/components/Component.vue'`

### State Management (Pinia)

- Stores use the **Composition API style** (not Options API)
- Define stores in `src/stores/` with naming pattern `use{Feature}Store`
- Use `ref`, `computed`, and plain functions (no `state`, `getters`, `actions`)

Example from `src/stores/counter.ts`:
```typescript
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }
  return { count, doubleCount, increment }
})
```

### Routing

- Routes defined in `src/router/index.ts`
- Use lazy loading for route components: `component: () => import('../views/AboutView.vue')`
- Route names use lowercase (e.g., `name: 'about'`)

---

## Code Style & Linting

### Prettier Configuration (`.prettierrc.json`)

- **No semicolons** (`semi: false`)
- **Single quotes** (`singleQuote: true`)
- Print width: 100 characters
- Trailing commas: ES5 style

### ESLint + Oxlint

- **ESLint**: Configured via `eslint.config.ts` using flat config
  - Uses `@vue/eslint-config-typescript` for Vue + TS rules
  - Essential Vue rules enabled
  - Prettier integration (formatting handled by Prettier, not ESLint)
- **Oxlint**: Fast Rust-based linter (`.oxlintrc.json`)
  - Plugins: eslint, typescript, unicorn, oxc, vue
  - Only correctness category enabled (errors only)
- Running `npm run lint` executes both linters sequentially

### TypeScript Configuration

- Uses project references (`tsconfig.json` references `tsconfig.app.json` and `tsconfig.node.json`)
- **Strict mode enabled** with additional safety:
  - `noUncheckedIndexedAccess: true` (extra null checking on array/object lookups)
- Type checking runs via `vue-tsc` (not `tsc`) to handle `.vue` files

---

## Important Gotchas

1. **TypeScript and `.vue` files**: Always use `vue-tsc` for type checking, not plain `tsc`. The `env.d.ts` file includes Vite client types.

2. **Build process**: `npm run build` runs type-checking AND building via `run-p` (parallel). If type-check fails, build fails.

3. **Node version**: Requires Node.js `^20.19.0 || >=22.12.0` (specified in `engines`)

4. **ESM only**: `"type": "module"` in package.json - all files treated as ES modules

5. **Vue DevTools**: Enabled in development via `vite-plugin-vue-devtools`

---

## Adding New Features

### New Component
1. Create `.vue` file in `src/components/`
2. Use `<script setup lang="ts">` pattern
3. Export/import using `@/` alias
4. Run `npm run lint` to auto-fix any issues

### New Route
1. Create view component in `src/views/`
2. Add route to `src/router/index.ts`
3. Use lazy loading: `component: () => import('../views/NewView.vue')`

### New Store
1. Create in `src/stores/` with pattern `use{Feature}Store`
2. Use Composition API style with `ref`, `computed`, functions
3. Import via `import { useFeatureStore } from '@/stores/feature'`

---

## Dependencies Summary

| Category | Libraries |
|----------|-----------|
| Framework | Vue 3.5+, Vue Router 5.0+, Pinia 3.0+ |
| Build Tool | Vite 7.3+ |
| Type Checking | TypeScript 5.9+, vue-tsc |
| Linting | ESLint 10+, Oxlint 1.51+, eslint-plugin-vue |
| Formatting | Prettier 3.8+ |
| Utilities | npm-run-all2 (script parallelization) |
