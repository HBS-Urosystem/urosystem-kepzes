import { defineConfig } from 'astro/config'
import tailwind from '@astrojs/tailwind'
import svelte from '@astrojs/svelte'
//import netlify from '@astrojs/netlify/functions'

// https://astro.build/config
export default /** @type {import('astro').AstroUserConfig} */ defineConfig({
	integrations: [
    tailwind(),
    svelte(),
  ],
  /*adapter: netlify({
    dist: new URL('./dist/b2b/', import.meta.url)
  }),*/
  site: 'https://www.urosystem.com',
  //base: '/',
  //outDir: './dist',
  trailingSlash: 'ignore'
});

