<script context="module">
  /**
   * @type {import('@sveltejs/kit').Load}
   */
  export async function load({ fetch }) {
    const res = await fetch(`/articles.json`);
    const articles = await res.json();
    
    return {
      props: {
        articles,
      },
    };
  }
</script>

<script>
	import { SEOStore } from "$lib/SEOStore";
	import PageLayout from '$lib/PageLayout.svelte'
	import Card from '$lib/Card.svelte'
	export let articles = null
	SEOStore.setToIndex()
</script>

<!-- TODO: Head -->

<PageLayout>
	<h1 slot="title">Articles</h1>
	<div slot="content" class="">
		{#if articles}
			<div class="flex flex-wrap -mx-2 overflow-hidden sm:-mx-4">
				{#each articles as article}
					<Card
						date={article.metadata.date}
						desc={article.metadata.desc}
						link={`/articles/${article.metadata.slug}`}
						smallImage={article.metadata.smallImage}
						title={article.metadata.title}
						timeToRead={article.metadata.timeToRead}
					/>
				{/each}
			</div>
		{/if}
	</div>
</PageLayout>
