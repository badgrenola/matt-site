<script>
  export let title
  export let largeImage
  export let links
</script>

<div class="w-full">
  <div class="mb-4 sm:mb-6 flex w-full flex-col">
      <h1 class="text-3xl text-pink-600 font-semibold sm:leading-6 mb-1 sm:mb-3 flex-1">
        {title}
      </h1>
  </div>
  <div class="markdown w-full">
      <slot>No Content Found</slot>
  </div>
</div>