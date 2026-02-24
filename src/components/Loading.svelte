<script>
    import { onMount } from 'svelte';

    let isLoading = true;

    onMount(() => {
        setTimeout(() => {
            isLoading = false;
        }, 2000);
        localStorage.clear(); // Chakra...
    });
</script>

<div class:visible={isLoading} class="justify-center hidden w-full h-1/2 my-auto items-end" id="loading-area">
    <img src="/loading.svg" alt="Loading icon" class="w-48" />
</div>
