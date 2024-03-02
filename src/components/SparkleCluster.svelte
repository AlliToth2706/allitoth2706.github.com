<script>
    import SparkleClusterA from './SparkleClusterA.svelte';
    import SparkleClusterB from './SparkleClusterB.svelte';
    import SparkleClusterC from './SparkleClusterC.svelte';
    // import { onMount } from 'svelte';

    const getRandomInt = (max) => Math.floor(Math.random() * max);

    const animationDuration = 2;
    const numberToDivideBy = 5;

    const getRandomAnimationDelay = () => (-1 * getRandomInt(numberToDivideBy * animationDuration)) / numberToDivideBy;

    const size = 50;

    let components = [];
    let componentCoordinates = [];

    const clusters = [SparkleClusterA, SparkleClusterB, SparkleClusterC];
    // Get a random number of elements between 4 and 8

    for (let i = 0; i < getRandomInt(5) + 4; ++i) {
        // For each, get a random cluster type and add it to the components array
        components.push(clusters[getRandomInt(3)]);
    }

    // Give it a random position
    let maxWidth = window.innerWidth;
    let maxHeight = window.innerHeight;
    let minWidth = 0;
    let center = 800;
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
            // componentCoordinates.forEach((e) => {
            //     if (
            //         Math.abs(e.x - currentCoords.x) <= maxSparkleArea / 2 ||
            //         Math.abs(e.y - currentCoords.y) <= maxSparkleArea / 2
            //     ) {
            //         shouldAdd = false;
            //     }
            // });

            // Add the coordinates if should add
            shouldAdd && componentCoordinates.push(currentCoords);

            // shouldAdd ? console.log(true) : console.log(false);
            // console.log(currentCoords);
        } while (coorsLength === componentCoordinates.length);
    });
</script>

{#each components as component, index}
    <div
        style={`
left: ${componentCoordinates[index].x}px;
top: ${componentCoordinates[index].y}px;
position: fixed;
`}
    >
        <svelte:component this={component} {size} {getRandomAnimationDelay} />
    </div>
{/each}
