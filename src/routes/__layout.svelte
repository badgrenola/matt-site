<!-- https://github.com/sveltejs/sapper-template/issues/188 -->
<!-- https://github.com/sveltejs/sapper/issues/703 -->

<script context="module">
	export async function preload({ params, query }, session) {
		return this.fetch(`articles.json`)
			.then(r => r.json())
			.then(articles => {

        console.log(articles)

				//Populate projects from backend
				const projects = Object.keys(session.projects).map(projectSlug => session.projects[projectSlug])
				return { 
					articles,
					projects
				};
		});
	}
</script>


<script>
  import "../app.postcss"
	// import Header from '../components/header.svelte';
	import Sidebar from '../components/sidebar.svelte';
	import Footer from '../components/footer.svelte';
	export var projects;
	export var articles;
	export var segment;
</script>

<div class="container mx-auto flex flex-col min-h-full">
	<!-- <Header /> -->

	<main class="flex-grow pb-6">
		<div class="font-normal text-gray-900 text-base sm:text-base p-6 flex lg:p-8">
			<Sidebar articles={articles} projects={projects} />
			<div class="w-full sm:w-4/5 font-light">
				<slot></slot>
			</div>
		</div>
	</main>

	<Footer />
</div>