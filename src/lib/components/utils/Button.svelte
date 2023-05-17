<script>
    export let condition = "arrow";
</script>

{#if condition == "arrow"}
<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-arrow-bar-left" width="16" height="16" viewBox="0 0 24 24" stroke-width="1.5" stroke="#131515" fill="none" stroke-linecap="round" stroke-linejoin="round">
    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
    <path d="M4 12l10 0" />
    <path d="M4 12l4 4" />
    <path d="M4 12l4 -4" />
    <path d="M20 4l0 16" />
</svg>
{:else}
    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-abacus" width="16" height="16" viewBox="0 0 24 24" stroke-width="1.5" stroke="#131515" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M5 3v18" />
        <path d="M19 21v-18" />
        <path d="M5 7h14" />
        <path d="M5 15h14" />
        <path d="M8 13v4" />
        <path d="M11 13v4" />
        <path d="M16 13v4" />
        <path d="M14 5v4" />
        <path d="M11 5v4" />
        <path d="M8 5v4" />
        <path d="M3 21h18" />
    </svg>
{/if}