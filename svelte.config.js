import preprocess from "svelte-preprocess";
import vercel from '@sveltejs/adapter-vercel';
// import staticAdapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
    kit: {
		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte',
        adapter: vercel(),
        ssr: false,
	},

    preprocess: [preprocess({
        "postcss": true
    })]
};

export default config;
