<!-- Adapted from https://youtu.be/w1nhwUGsG6M by Kevin Powell -->

<script>
    export let text;
    $: document.querySelector(':root').style.setProperty('--typewriterCharacters', text.length);
</script>

<span>
    <h1 class="leading-normal relative w-max p-1 font-bold h-fit my-20 before:bg-zinc-900 after:w-3 after:bg-white">
        {text}
    </h1>
</span>

<style>
    :root {
        --typewriterSpeed: 6s;
        --typewriterCharacters: 13;
    }

    h1 {
        font-size: clamp(1rem, 6vw + 1rem, 6rem);
        font-family: 'Source Code Pro', monospace;
    }

    h1::before,
    h1::after {
        content: '';
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
    }

    h1::before {
        animation: typewriter var(--typewriterSpeed) steps(var(--typewriterCharacters)) 1s forwards;
    }

    h1::after {
        animation:
            typewriter var(--typewriterSpeed) steps(var(--typewriterCharacters)) 1s forwards,
            blink 750ms steps(var(--typewriterCharacters)) infinite;
    }

    @keyframes typewriter {
        to {
            left: 100%;
        }
    }

    @keyframes blink {
        to {
            background: transparent;
        }
    }
</style>
