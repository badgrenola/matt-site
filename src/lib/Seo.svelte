<script>
  import { SEOStore } from "./SEOStore";
</script>

<svelte:head>
  <title>{$SEOStore.title}</title>
  <meta name="description" content={$SEOStore.description} />
  <meta name="keywords" content={$SEOStore.keywords}/>

  <!-- Open Graph / Facebook -->
  <meta property="og:type" content={$SEOStore.openGraph.type}>
  <meta property="og:url" content={$SEOStore.openGraph.url}>
  <meta property="og:title" content={$SEOStore.openGraph.title}>
  <meta property="og:description" content={$SEOStore.openGraph.description}>
  <meta property="og:image" content={$SEOStore.openGraph.image}>

  <!-- Twitter -->
  <meta property="twitter:card" content={$SEOStore.twitter.card}>
  <meta property="twitter:url" content={$SEOStore.twitter.url}>
  <meta property="twitter:title" content={$SEOStore.twitter.title}>
  <meta property="twitter:description" content={$SEOStore.twitter.description}>
  <meta property="twitter:image" content={$SEOStore.twitter.image}>
</svelte:head>