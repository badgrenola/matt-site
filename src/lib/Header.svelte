
<script>
  import Social from './Social.svelte'

  //Grab the active route
  import { getStores } from '$app/stores'
  const { page } = getStores()

  //Match the current route to the available options
  // TODO : svelte should declare these vars for us in the $: statement, but I'm getting undeclared errors
  let isIndex;
  let isProjects;
  let isArticles;
  $: {
      //Dynamically update the vars to match the current route
      isIndex = $page.url.pathname === "/"
      isProjects = $page.url.pathname === "/projects"
      isArticles = $page.url.pathname === "/articles"
  }

  //Store the mobile menu open state
  var isOpen = false;

  //Close the menu on route change
  let oldRoute = $page.url.pathname
  $: {
      //If the route has changed
      if (oldRoute !== $page.url.pathname) { 
          //Store the new route, and close the menu
          oldRoute = $page.url.pathname
          isOpen = false
      }
  }

</script>

<header class="sm:flex sm:justify-between sm:items-center sm:p-4 lg:p-8">
  <div class="flex items-center justify-between px-4 py-4 sm:p-0">
      <div class="">
          <a href="/" alt="Home">
              <img class="h-12 sm:h-16 lg:h-24 rounded-full" src="/profile.jpg" alt="Matt Brealey's head" />
          </a>
      </div>
      <div class="sm:hidden">
          <button type="button" id="menuButton" class="block text-black hover:text-gray-800 focus:text-gray-800 focus:outline-none pr-2" on:click={() => {isOpen = !isOpen}}>
              <svg class="h-8 w-8 fill-current {isOpen ? 'text-pink-600' : 'text-black'}" viewBox="0 0 100 70">
                  <rect width="100" height="10"></rect>
                  <rect y="30" width="100" height="10"></rect>
                  <rect y="60" width="100" height="10"></rect>
              </svg>
          </button>
      </div>
  </div>
  <div class="px-2 pt-2 {isOpen ? 'block' : 'hidden'} sm:flex sm:p-0">
      <a href="/" class="headerLink colorLink {isIndex && "headerLinkActive"}">Hello</a>
      <a href="/projects" id="projectsMenuItem" class="headerLink colorLink {isProjects && "headerLinkActive"}">Projects</a>
      <a href="/articles" class="headerLink colorLink {isArticles && "headerLinkActive"}">Articles</a>
      <div class="headerLink h-16 sm:hidden">
          <Social />
      </div>
  </div>
</header>