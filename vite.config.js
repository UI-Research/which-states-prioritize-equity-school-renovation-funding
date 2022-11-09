import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import dsv from '@rollup/plugin-dsv';
import path from 'path';

export default defineConfig({
	plugins: [sveltekit(), dsv()],
	resolve: {
		alias: {
			$actions: path.resolve('./src/lib/actions'),
			$assets: path.resolve('./src/lib/assets'),
			$components: path.resolve('./src/lib/components'),
			$data: path.resolve('./src/lib/data'),
			$stores: path.resolve('./src/lib/stores'),
			$styles: path.resolve('./src/lib/styles'),
			$utils: path.resolve('./src/lib/utils')
		}
	}
});
