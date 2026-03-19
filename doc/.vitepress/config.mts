import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Braum',
  description: 'Frontend configuration toolkit monorepo',
  lang: 'en-US',
  base: '/braum/',


  vite: {
    server: {
      port: 3000,
      host: true,
      open: true,
    },
  },

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/getting-started' },
      { text: 'Packages', link: '/packages/eslint' },
      { text: 'Examples', link: '/examples/overview' },
    ],

    sidebar: {
      '/guide/': [
        {
          text: 'Getting Started',
          items: [
            { text: 'Introduction', link: '/guide/getting-started' },
            { text: 'Installation', link: '/guide/installation' },
          ],
        },
        {
          text: 'Development',
          items: [
            { text: 'Development Guide', link: '/guide/development' },
            { text: 'Contributing', link: '/guide/contributing' },
          ],
        },
      ],
      '/packages/': [
        {
          text: 'Packages',
          items: [
            { text: 'ESLint', link: '/packages/eslint' },
            { text: 'Prettier', link: '/packages/prettier' },
            { text: 'Stylelint', link: '/packages/stylelint' },
            { text: 'Commitlint', link: '/packages/commitlint' },
            { text: 'CZ (Commitizen)', link: '/packages/cz' },
            { text: 'TypeScript Config', link: '/packages/typescript-config' },
          ],
        },
      ],
      '/examples/': [
        {
          text: 'Examples',
          items: [
            { text: 'Overview', link: '/examples/overview' },
            { text: 'ESLint Example', link: '/examples/eslint' },
            { text: 'React Example', link: '/examples/react' },
            { text: 'Vue Example', link: '/examples/vue' },
            { text: 'TypeScript Example', link: '/examples/typescript' },
            { text: 'Stylelint Example', link: '/examples/stylelint' },
          ],
        },
      ],
    },

    socialLinks: [{ icon: 'github', link: 'https://github.com/BowenTew/Braum' }],

    footer: {
      message: 'Released under the Apache License 2.0.',
      copyright: 'Copyright © 2024-present Bowen Tew',
    },
  },
})
