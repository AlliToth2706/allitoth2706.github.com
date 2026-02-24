<script>
    import Sparkle from './Sparkle.svelte';

    export let size;
    export let getRandomAnimationDelay;

    let sparkleCoordinates = [
        { x: 0, y: 0, delay: getRandomAnimationDelay() },
        { x: 50, y: 0, delay: getRandomAnimationDelay() },
        { x: 25, y: 25, delay: getRandomAnimationDelay() },
        { x: 0, y: 50, delay: getRandomAnimationDelay() },
        { x: 50, y: 50, delay: getRandomAnimationDelay() },
    ];
</script>

<div class="sparkle-cluster">
    {#each sparkleCoordinates as coords}
        <Sparkle {coords} {size} />
    {/each}
</div>
