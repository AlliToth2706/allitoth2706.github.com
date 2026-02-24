<script>
    import Sparkle from './Sparkle.svelte';

    export let size;
    export let getRandomAnimationDelay;

    let sparkleCoordinates = [
        { x: 0, y: 0, doubleSized: true, delay: getRandomAnimationDelay() },
        { x: 66, y: 0, delay: getRandomAnimationDelay() },
        { x: 75, y: 50, delay: getRandomAnimationDelay() },
    ];
</script>

<div class="sparkle-cluster">
    {#each sparkleCoordinates as coords}
        <Sparkle {coords} {size} />
    {/each}
</div>
