<script>
  import Social from './Social.svelte'

  export let articles = []
  export let projects = []

  let latestArticles = articles.sort((a, b) => a.metadata.id - b.metadata.id).slice(0, 5).reverse()
  let latestProjects = projects.sort((a, b) => a.metadata.id - b.metadata.id).slice(0, 5).reverse()
</script>

<sidebar class="w-1/5 mr-6 text-sm hidden sm:block">
  <div class="flex flex-col">
    <h2 class="text-pink-600 font-semibold leading-none tracking-wide">Latest Projects</h2>
    <ul class="mt-2">
      {#each latestProjects as project}
        <li class="mb-1">
          <a href="/projects/{project.metadata.slug}" >{project.metadata.title}</a>
        </li>
      {/each}
    </ul>
  </div>
  <div class="flex flex-col mt-8">
    <h2 class="text-pink-600 font-semibold leading-none tracking-wide">Latest Articles</h2>
    <ul class="mt-2">
      {#each latestArticles as article}
        <li class="mb-1">
          <a href="/articles/{article.metadata.slug}">{article.metadata.title}</a>
        </li>
      {/each}
    </ul>
  </div>
  <div class="mt-16 -ml-1">
    <Social />
  </div>
</sidebar>