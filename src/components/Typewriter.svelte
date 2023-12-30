<!-- Adapted from https://youtu.be/w1nhwUGsG6M by Kevin Powell -->

<script>
    export let text;
    $: document.querySelector(':root').style.setProperty('--typewriterCharacters', text.length);
</script>

<span class="typewriter">
    <h1>{text}</h1>
</span>

<style>
    :root {
        --typewriterSpeed: 6s;
        --typewriterCharacters: 13;
        --bg: #13151a;
    }

    h1 {
        font-size: clamp(1rem, 3vw + 1rem, 4rem);
        position: relative;
        font-family: 'Source Code Pro', monospace;
        position: relative;
        width: max-content;
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
        background: var(--bg);
        animation: typewriter var(--typewriterSpeed) steps(var(--typewriterCharacters)) 1s forwards;
    }

    h1::after {
        width: 0.125em;
        background: black;
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
