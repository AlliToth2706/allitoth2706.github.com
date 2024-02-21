<script>
    import { onMount } from 'svelte';

    let isLoading = true;

    onMount(() => {
        setTimeout(() => {
            isLoading = false;
        }, 2000);
    });
</script>

<div
    style="margin-top: 30vh; justify-content:center; display:none; width: 100%;"
    class:visible={isLoading}
    id="loading-area"
>
    <img src="/loading.svg" alt="Loading icon" />
</div>
