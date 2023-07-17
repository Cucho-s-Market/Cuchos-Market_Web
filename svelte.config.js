import node from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/kit/vite';
/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),

	kit: {
		adapter: node(),
		paths: {
			base: process.env.NODE_ENV === 'production' ? '/sveltekit-github-pages' : '',
		}
	}
};

export default config;
