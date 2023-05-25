'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
/// <reference types="vitest"/>
const config_1 = require('vitest/config')
exports.default = (0, config_1.defineConfig)({
  test: {
    globals: true,
    coverage: {
      src: ['test/'],
      all: true,
      include: [
        '**/*.ts'
      ],
      exclude: [
        '**/*.generated.ts'
      ]
    }
  }
})
