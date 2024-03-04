<script>
    import SparkleClusterA from './SparkleClusterA.svelte';
    import SparkleClusterB from './SparkleClusterB.svelte';
    import SparkleClusterC from './SparkleClusterC.svelte';

    const animationDuration = 2;
    const numberToDivideBy = 5;

    const size = 50;

    const getRandomInt = (max) => Math.floor(Math.random() * max);
    const getRandomAnimationDelay = () => (-1 * getRandomInt(numberToDivideBy * animationDuration)) / numberToDivideBy;

    let components = [];
    let componentCoordinates = [];

    const clusters = [SparkleClusterA, SparkleClusterB, SparkleClusterC];

    let maxWidth = window.innerWidth;
    const minSparkleWidth = 1280;

    // Make sure not to render if screen is too small
    if (maxWidth >= minSparkleWidth) {
        // Get a random number of elements between 4 and 8

        for (let i = 0; i < getRandomInt(5) + 4; ++i) {
            // For each, get a random cluster type and add it to the components array
            components.push(clusters[getRandomInt(3)]);
        }

        // Give it a random position
        let maxHeight = window.innerHeight;
        let minWidth = 0;
        let center = (maxWidth >= '1536' ? 1 / 2 : 2 / 3) * maxWidth;
        let area = (maxWidth - center) / 2; // Divided by 2 due to being split on the sides of the screen
        let minRightArea = maxWidth - area;
        let maxSparkleArea = 120;
        let screenPadding = 30;

        console.log(maxWidth, maxHeight);

        components.map((_, i) => {
            // Get coordinates for each of the components
            const coorsLength = componentCoordinates.length;
            do {
                let currentCoords = {
                    x:
                        getRandomInt(area - maxSparkleArea - screenPadding) +
                        screenPadding +
                        (i % 2 === 0 ? minWidth : minRightArea), // Differentiate between sides here
                    y:
                        getRandomInt(Math.floor(maxHeight / 2)) +
                        (getRandomInt(2) === 0 ? Math.floor(maxHeight / 2 - maxSparkleArea) : 0), // Evenly-ish split between top and bottom half
                };

                // Check if any previously saved coordinates are within 100px of current
                // Performance issues
                let shouldAdd = true;
                componentCoordinates.forEach((e) => {
                    if (
                        Math.abs(e.x - currentCoords.x) <= maxSparkleArea &&
                        Math.abs(e.y - currentCoords.y) <= maxSparkleArea
                    ) {
                        shouldAdd = false;
                    }
                });

                // Add the coordinates if should add
                shouldAdd && componentCoordinates.push(currentCoords);

                // shouldAdd ? console.log(true) : console.log(false);
                // console.log(currentCoords);
            } while (coorsLength === componentCoordinates.length);
        });
    }
</script>

{#if maxWidth >= minSparkleWidth}
    {#each components as component, index}
        <div
            style={`
    left: ${componentCoordinates[index].x}px;
    top: ${componentCoordinates[index].y}px;
    `}
            class="fixed"
        >
            <svelte:component this={component} {size} {getRandomAnimationDelay} />
        </div>
    {/each}
{/if}
