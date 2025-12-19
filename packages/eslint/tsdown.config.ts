import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: ['./index.ts'],
  format: ['esm', 'cjs'],
  dts: true,

  platform: 'node',
  target: 'node18',

  outDir: 'dist',
  clean: true,

  external: [
    'eslint',
    '@typescript-eslint/eslint-plugin',
    '@typescript-eslint/parser',
    'eslint-config-standard',
    'eslint-flat-config-utils',
    'eslint-plugin-import',
    'eslint-plugin-n',
    'eslint-plugin-prettier',
    'eslint-plugin-promise',
    'globals',
  ],
})
