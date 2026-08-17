import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  resolve: {
    // Тот же псевдоним, что в tsconfig.json. Без него тесты не смогут
    // ввозить модули так же, как это делают компоненты, и пути в тестах
    // разойдутся с путями в коде.
    alias: { '@': fileURLToPath(new URL('./', import.meta.url)) },
  },
  test: {
    // Окружение Node, а не браузера: тестируются только чистые функции.
    // Браузерное окружение здесь стоило бы секунд запуска и ничего не дало.
    environment: 'node',
    include: ['tests/**/*.test.ts'],
  },
})
