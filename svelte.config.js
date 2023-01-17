import adapter from '@sveltejs/adapter-static';
import sveltePreprocess from 'svelte-preprocess';
import autoprefixer from 'autoprefixer';

const dev = process.env.NODE_ENV !== 'production';

const preprocess = sveltePreprocess({
	postcss: {
		plugins: [autoprefixer]
	}
});

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess,
	kit: {
		adapter: adapter({
			pages: 'docs',
			assets: 'docs'
		}),
		paths: {
			// change below to your repo name
			base: dev ? '' : '/features/which-states-prioritize-equity-school-renovation-funding'
		}
	}
};

export default config;
