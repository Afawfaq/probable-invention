import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const config = {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter({
      fallback: null,
    }),
    prerender: {
      handleHttpError: ({ path, referrer, message }) => {
        // Ignore 404s for favicon and any .md file links within markdown content
        if (path === '/favicon.png' || path.endsWith('.md')) {
          return;
        }
        throw new Error(message);
      },
    },
  },
};

export default config;
