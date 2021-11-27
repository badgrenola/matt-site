<script context="module">
  /**
   * @type {import('@sveltejs/kit').Load}
   */
  export async function load({ fetch }) {
    const res = await fetch(`/projects.json`);
    const projects = await res.json();
    
    return {
      props: {
        projects,
      },
    };
  }
</script>

<script>
	import PageLayout from '$lib/PageLayout.svelte'
	import Card from '$lib/Card.svelte'
	export let projects = null
  console.log(projects)
</script>

<PageLayout>
	<h1 slot="title">Projects</h1>
	<div slot="content" class="">
		{#if projects}
			<div class="flex flex-wrap -mx-2 overflow-hidden sm:-mx-4">
				{#each projects as project}
					<Card
						desc={project.metadata.desc}
						link={`/projects/${project.metadata.slug}`}
						smallImage={project.metadata.smallImage}
						title={project.metadata.title}
					/>
				{/each}
			</div>
		{/if}
	</div>
</PageLayout>
