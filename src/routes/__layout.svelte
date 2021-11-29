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
  import Header from "$lib/Header.svelte"
  import Footer from "$lib/Footer.svelte"
  import SideBar from "$lib/SideBar.svelte"
  import "../app.postcss"

  export let articles = []
  export let projects = []
</script>

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