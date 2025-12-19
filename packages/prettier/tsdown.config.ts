import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: ['./index.ts'],
  format: ['esm', 'cjs'],
  dts: true,

  platform: 'node',
  target: 'node18',

  outDir: 'dist',
  clean: true,

  external: ['@prettier/plugin-xml', 'prettier'],
})
