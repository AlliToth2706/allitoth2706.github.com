<script>
    import { library } from "@fortawesome/fontawesome-svg-core";
    import { fab } from "@fortawesome/free-brands-svg-icons";
    import { FontAwesomeIcon } from "@fortawesome/svelte-fontawesome";
    import { config } from "@fortawesome/fontawesome-svg-core";

    import "@fortawesome/fontawesome-free/css/all.min.css";
    import "@fortawesome/fontawesome-svg-core/styles.css";

    config.autoAddCss = false;

    export let icon, info;

    library.add(fab);
</script>

<div class="tooltip" data-tip={info}>
    <FontAwesomeIcon {icon} size="lg" type="button" />
</div>
