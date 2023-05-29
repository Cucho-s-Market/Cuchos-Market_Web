<script>
	import SVG from "$lib/components/utils/SVG.svelte";

    export let text = "";
    export let href = "#";
    export let svg = "";
</script>

<li><a class="text-neutral-grey focus:bg-br-orange focus:text-primary" href="{href}">
    <SVG name={svg}/>
    <p>{text}</p>
</a></li>
