<script>
  import store from "$lib/store";
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