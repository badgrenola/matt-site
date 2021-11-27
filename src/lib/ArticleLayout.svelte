<script>
    export let title
    export let date
    export let timeToRead
</script>

<div class="w-full">
    <div class="mb-4 sm:mb-6 flex w-full flex-col">
        <h1 class="text-3xl text-pink-600 font-semibold sm:leading-6 mb-1 sm:mb-3 flex-1">
            {title}
        </h1>
        <div class="font-light text-xs text-gray-500">{date} - {timeToRead} mins to read</div>
    </div>
    <div class="markdown w-full">
        <slot>No Content Found</slot>
    </div>
</div>