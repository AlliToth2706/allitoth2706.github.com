<script>
    import { library } from "@fortawesome/fontawesome-svg-core";
    import { fab } from "@fortawesome/free-brands-svg-icons";
    import { FontAwesomeIcon } from "@fortawesome/svelte-fontawesome";
    import "@fortawesome/fontawesome-free/css/all.min.css";

    export let icon;

    library.add(fab);
</script>

<!-- <i
    class={`fa-brands fa-${icon}`}
    data-popover-target="popover-bottom"
    data-popover-placement="bottom"
    size="sm"
></i> -->
<!-- <FontAwesomeIcon
    icon={["fa-brands", icon]}
    size="sm"
    data-popover-target="popover-bottom"
    data-popover-placement="bottom"
    type="button"
/> -->
<button
    type="button"
    data-popover-target="popover-bottom"
    data-popover-placement="bottom">test</button
>
<div
    data-popover
    id="popover-bottom"
    role="tooltip"
    class="absolute z-10 invisible inline-block w-64 text-sm text-body transition-opacity duration-300 bg-neutral-primary-soft border border-default rounded-base shadow-xs opacity-0"
>
    <div
        class="px-3 py-2 bg-neutral-tertiary border-b border-default rounded-t-base"
    >
        <h3 class="font-medium text-heading">Popover bottom</h3>
    </div>
    <div class="px-3 py-2">
        <p>And here's some amazing content. It's very engaging. Right?</p>
    </div>
    <div data-popper-arrow></div>
</div>
