/// <reference types="vitest"/>
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    coverage: {
      src:['test/'],
      all: true,
      include : [
        "**/*.ts"
      ],
      exclude : [
        "**/*.generated.ts"
      ]
    }
  },
})