<script context="module">
  /**
   * @type {import('@sveltejs/kit').Load}
   */
  export async function load({ fetch }) {
    const articleRes = await fetch(`/articles.json`);
    const articles = await articleRes.json();

    const projectRes = await fetch(`/projects.json`);
    const projects = await projectRes.json();
    
    return {
      props: {
        articles,
        projects
      },
    };
  }
</script>

<script>
  import store from "$lib/store"
  import Header from "$lib/Header.svelte"
  import Footer from "$lib/Footer.svelte"
  import SideBar from "$lib/SideBar.svelte"
  import "../app.postcss"

  export let articles = []
  export let projects = []
</script>

<svelte:head>
  <title>{$store.title}</title>
  <meta name="description" content={$store.description} />
  <meta name="keywords" content={$store.keywords}/>

  <!-- Open Graph / Facebook -->
  <meta property="og:type" content={$store.openGraph.type}>
  <meta property="og:url" content={$store.openGraph.url}>
  <meta property="og:title" content={$store.openGraph.title}>
  <meta property="og:description" content={$store.openGraph.description}>
  <meta property="og:image" content={$store.openGraph.image}>

  <!-- Twitter -->
  <meta property="twitter:card" content={$store.twitter.card}>
  <meta property="twitter:url" content={$store.twitter.url}>
  <meta property="twitter:title" content={$store.twitter.title}>
  <meta property="twitter:description" content={$store.twitter.description}>
  <meta property="twitter:image" content={$store.twitter.image}>
</svelte:head>

<div class="container mx-auto flex flex-col min-h-full max-w-5xl">
	<Header />
	<main class="flex-grow pb-6">
		<div class="font-normal text-gray-900 text-base sm:text-base p-6 flex lg:p-8 w-full">
			<SideBar {articles} {projects} />
			<div class="w-full sm:w-4/5 font-light">
				<slot></slot>
			</div>
		</div>
	</main>

	<Footer />
</div>