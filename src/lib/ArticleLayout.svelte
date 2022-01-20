<script>
    export let id
    export let date
    export let timeToRead
    export let desc
    export let keywords
    export let largeImage
    export let slug
    export let smallImage
    export let tags
    export let title
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content={desc} />
  <meta name="keywords" content={keywords}/>

  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website">
  <meta property="og:url" content={`https://mattbrealey.com/articles/${slug}`}>
  <meta property="og:title" content={`${title} // Matt Brealey`}>
  <meta property="og:description" content={desc}>
  <meta property="og:image" content={`https://mattbrealey.com${smallImage}`}>

  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:url" content={`https://mattbrealey.com/articles/${slug}`}>
  <meta name="twitter:title" content={`${title} // Matt Brealey`}>
  <meta name="twitter:description" content={desc}>
  <meta name="twitter:image" content={`https://mattbrealey.com${smallImage}`}>
</svelte:head>

<div class="w-full">
    <div class="mb-4 sm:mb-6 flex w-full flex-col">
        <h1 class="text-3xl text-pink-600 font-semibold sm:leading-6 mb-1 sm:mb-3 flex-1">
            {title}
        </h1>
        <div class="font-light text-xs text-gray-500">{date} - {timeToRead} mins to read</div>
    </div>
    <img class="rounded-md object-cover" src={largeImage} alt={title} />
    <div class="markdown w-full mt-4">
        <slot>No Content Found</slot>
    </div>
</div>