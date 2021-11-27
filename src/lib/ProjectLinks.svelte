<script> 
  export let links
</script>

<h2 id="links" class="mt-6 text-xl text-pink-600 font-light">{links.length > 1 ? "Links" : "Link"}</h2>
<ul>
  {#each links as link}
      <li>
          {link.title} : <a class="pl-2 colorLink" href={link.url} target="_blank" rel="noopener noreferrer">{link.url.split("//")[1]}</a>
      </li>
  {/each}
</ul>