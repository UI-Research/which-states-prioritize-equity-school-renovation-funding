import { readFileSync } from 'fs';
import adapter from '@sveltejs/adapter-static';
import sveltePreprocess from 'svelte-preprocess';
import autoprefixer from 'autoprefixer';

const { subdirectory } = JSON.parse(readFileSync('package.json', 'utf8'));
const dev = process.env.NODE_ENV !== 'production';
const dir = subdirectory || '';
const prefix = dir.startsWith('/') ? '' : '/';
const base = dev || !dir ? '' : `${prefix}${dir}`;

const preprocess = sveltePreprocess({
	postcss: {
		plugins: [autoprefixer]
	}
});

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess,
	kit: {
		adapter: adapter(),
		paths: {
			base
		}
	}
};

export default config;
