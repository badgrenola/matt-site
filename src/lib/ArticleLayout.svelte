<script>
    import { store } from './store'
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

    store.setToArticle({id, desc, keywords, largeImage, slug, smallImage, tags, title})

</script>

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