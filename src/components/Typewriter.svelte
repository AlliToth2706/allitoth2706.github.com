<!-- Adapted from https://youtu.be/w1nhwUGsG6M by Kevin Powell -->

<script>
    import { onMount } from "svelte";

    export let text;
    export let devMode;

    let typingSpeed = 0.25;
    let typewriterSpeed = typingSpeed * text.length;

    // let indexes = [];
    // let stringToFind = ", ";
    // let testString = text;
    // while (testString !== "") {
    //     let t = testString.indexOf(stringToFind);
    //     if (t === -1) {
    //         testString = "";
    //     } else {
    //         indexes.push(t);
    //         testString = testString.slice(t + stringToFind.length);
    //     }
    // }
    // let percentages = indexes.map((e) => {
    //     let n = e / text.length;
    //     return n.toPrecision(3) * 100;
    // });
    // let pauseAnim = false;

    // onMount(() => {
    //     let typewriter = document.querySelector("#typewriter::before");
    //     // while (true) {
    //     //     console.log(left);
    //     // }
    //     (function move() {
    //         // var character=document.getElementById("character");
    //         let left = typewriter.style;
    //         console.log(left);
    //         setTimeout(move, 1e3);
    //     })();
    // });
    const toMakeVisible = ["navbar", "about", "skills", "projects", "contact"];

    if (devMode) {
        toMakeVisible.forEach((item) => {
            document.getElementById(item).removeAttribute("data-invisible");
        });
        document.getElementById("subheader").removeAttribute("data-hidden");
    } else {
        const onAnimationEnd = (e) => {
            toMakeVisible.forEach((item) => {
                document.getElementById(item).removeAttribute("data-invisible");
            });
            const subh = document.getElementById("subheader");
            subh.removeAttribute("data-hidden");
            subh.classList.add("animate__fadeInUp");
        };
        onMount(() => {
            const el = document.getElementById("typewriter");
            el.addEventListener("animationend", onAnimationEnd);
        });
    }
</script>

<span>
    <h1
        class="leading-normal relative w-max p-1 font-bold h-fit my-20 before:bg-zinc-900 after:w-3 after:bg-white"
        style="--typingSpeed: {typingSpeed}s; 
            --typewriterSpeed: {typewriterSpeed}s; 
            --typewriterCharacters: {text.length};
            --animps: running;"
        id="typewriter"
    >
        <!-- id="typewriter"  --animps: {pauseAnim ? 'paused' : 'running'};  -->
        {text}
    </h1>
</span>

<style>
    h1 {
        font-size: clamp(1rem, 6vw + 1rem, 6rem);
        font-family: "Source Code Pro", monospace;
    }

    h1::before,
    h1::after {
        content: "";
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
    }

    h1::before {
        animation: typewriter var(--typewriterSpeed)
            steps(var(--typewriterCharacters)) var(--typingSpeed) forwards
            var(--animps);
    }

    h1::after {
        animation:
            typewriter var(--typewriterSpeed) steps(var(--typewriterCharacters))
                var(--typingSpeed) forwards var(--animps),
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
