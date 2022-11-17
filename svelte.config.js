import adapter from '@sveltejs/adapter-static';
import sveltePreprocess from 'svelte-preprocess';
import autoprefixer from 'autoprefixer';

const preprocess = sveltePreprocess({
	postcss: {
		plugins: [autoprefixer]
	}
});

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess,
	kit: {
		adapter: adapter()
	}
};

export default config;
