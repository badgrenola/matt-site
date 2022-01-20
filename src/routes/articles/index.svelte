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
	import PageLayout from '$lib/PageLayout.svelte'
	import Card from '$lib/Card.svelte'
	export let articles = null
</script>

<svelte:head>
  <title>Matt Brealey</title>
  <meta name="description" content="The portfolio site of a freelance creative problem solver." />
  <meta name="keywords" content="space, react, reactjs, threejs, sapper, svelte, sveltejs, ios, swift, 3d, ar, vfx, design"/>

  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://mattbrealey.com">
  <meta property="og:title" content="Matt Brealey">
  <meta property="og:description" content="The portfolio site of a freelance creative problem solver.">
  <meta property="og:image" content="https://mattbrealey.com/profile.jpg">

  <!-- Twitter -->
  <meta property="twitter:card" content="summary_large_image">
  <meta property="twitter:url" content="https://mattbrealey.com">
  <meta property="twitter:title" content="Matt Brealey">
  <meta property="twitter:description" content="The portfolio site of a freelance creative problem solver.">
  <meta property="twitter:image" content="https://mattbrealey.com/profile.jpg">
</svelte:head>

<PageLayout>
	<h1 slot="title">Articles</h1>
	<div slot="content" class="">
		{#if articles}
			<div class="flex flex-wrap -mx-2 overflow-hidden sm:-mx-4">
				{#each articles as article, articleIndex}
					<Card
						date={article.metadata.date}
						desc={article.metadata.desc}
						link={`/articles/${article.metadata.slug}`}
						smallImage={article.metadata.smallImage}
						title={article.metadata.title}
						timeToRead={article.metadata.timeToRead}
					/>

          {#if articleIndex !== articles.length - 1}
            <hr class="w-full mt-6 mb-9 mx-4 md:hidden" />
          {/if}
				{/each}
			</div>
		{/if}
	</div>
</PageLayout>
