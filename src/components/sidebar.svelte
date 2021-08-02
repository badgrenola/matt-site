<script>
  import Social from './social.svelte'

  //Projects are populated by the layout
  export let projects = []

  //Post basic details are loaded by the layout on startup and passed here
  export let articles = []

  //Get the 5 latest projects
  let maxProjects = 5
  let latestProjects = projects.sort((a, b) => {
    if (a.id > b.id) return 1
    return -1
  }).slice(Math.max(projects.length - maxProjects, 0)).reverse()

  //Get the 5 latest articles - articles are automatically sorted by date
  let maxArticles = 5
  let latestArticles = []
  $: latestArticles = articles.slice(Math.max(projects.length - maxProjects, 0))

</script>

<sidebar class="w-1/5 mr-6 text-sm hidden sm:block">
  <div class="flex flex-col">
    <h2 class="text-pink-600 font-semibold leading-none">Latest Projects</h2>
    <ul class="mt-2">
      {#each latestProjects as project}
        <li class="mb-1">
          <a href="./projects/{project.slug}" >{project.name}</a>
        </li>
      {/each}
    </ul>
  </div>
  <div class="flex flex-col mt-8">
    <h2 class="text-pink-600 font-semibold leading-none">Latest Articles</h2>
    <ul class="mt-2">
      {#each latestArticles as article}
        <li class="mb-1">
          <a href="./articles/{article.slug}">{article.title}</a>
        </li>
      {/each}
    </ul>
  </div>
  <div class="mt-16 -ml-1">
    <Social />
  </div>
</sidebar>