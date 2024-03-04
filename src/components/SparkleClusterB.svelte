<script>
    import Sparkle from './Sparkle.svelte';

    export let size;
    export let getRandomAnimationDelay;

    let sparkleCoordinates = [
        { x: 0, y: 0, delay: getRandomAnimationDelay() },
        { x: 25 / 2, y: 25 / 2, doubleSized: true, delay: getRandomAnimationDelay() },
        { x: 75, y: 75, delay: getRandomAnimationDelay() },
    ];
</script>

<div class="sparkle-cluster">
    {#each sparkleCoordinates as coords}
        <Sparkle {coords} {size} />
    {/each}
</div>
