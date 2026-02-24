<script>
    export let coords;
    export let size;

    const sparkleStyle = `
    left: ${coords.x}px;
    top: ${coords.y}px;
    width: ${coords.doubleSized ? size * 2 : size}px; 
    height: ${coords.doubleSized ? size * 2 : size}px;
    animation-delay: ${coords.delay}s;
    `;
</script>

<svg
    alt="Sparkle SVG"
    style={sparkleStyle}
    class="animated fill-purple-500 origin-center absolute"
    id="eq8CIJoQknA1"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 100 100"
    shape-rendering="geometricPrecision"
    text-rendering="geometricPrecision"
    ><g transform="matrix(.449903 0 0 0.449903-9.387205-29.806074)" clip-rule="evenodd"
        ><path
            d="M99,44c0,0-4,86.887416-15,98.000923-12,11.113507-60,13.134144-57,13.134144-3,0,45,3.030956,57,14.144463c11,11.113507,15,96.990604,15,96.990604s4-85.877097,15-96.990604s59-14.144463,56-14.144463c3,0-45-2.020638-56-13.134144C103,130.887416,99,44,99,44Z"
            transform="translate(33.5 22.25)"
            clip-rule="evenodd"
            fill-rule="evenodd"
        /></g
    ></svg
>

<style>
    .animated {
        transform-box: fill-box;
        animation: scale 2s infinite;
    }

    @keyframes scale {
        0% {
            transform: scale(1);
        }
        50% {
            transform: scale(0);
        }
        100% {
            transform: scale(1);
        }
    }
</style>
