<script>
  export let todos = []
</script>

{#if todos.length}
    <h2 id="todo-list" class="mt-6 text-xl text-pink-600 font-light">Todo List</h2>
    <ul class="list-disc">
        {#each todos as todo}
            <li class="ml-6">{todo}</li>
        {/each}
    </ul>
{/if}