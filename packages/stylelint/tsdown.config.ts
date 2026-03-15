// eslint-disable-next-line import/no-extraneous-dependencies -- Tsdown was installed as a dev dependency in the root package.json
import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: ['./src/index.ts', './src/extend.ts'],
  format: ['esm', 'cjs'],
  dts: true,

  platform: 'node',
  target: 'node18',

  outDir: 'dist',
  clean: true,
})
