<script>
    export let name = "";
    export let stroke = 1;
    export let size = 36;
    export let color = "#131515";
</script>

{#if name == "shopping-cart"}
    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-shopping-cart" width="{size}" height="{size}" viewBox="0 0 24 24" stroke-width="{stroke}" stroke="{color}" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M6 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
        <path d="M17 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
        <path d="M17 17h-11v-14h-2" />
        <path d="M6 5l14 1l-1 7h-13" />
    </svg>
{:else if name == "search"}
    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-search" width="{size}" height="{size}" viewBox="0 0 24 24" stroke-width="{stroke}" stroke="{color}" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
        <path d="M21 21l-6 -6" />
    </svg>
{:else if name == "trash"}
    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-trash" width="{size}" height="{size}" viewBox="0 0 24 24" stroke-width="{stroke}" stroke="{color}" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M4 7l16 0" />
        <path d="M10 11l0 6" />
        <path d="M14 11l0 6" />
        <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
        <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
    </svg>
{:else if name == "plus"}
    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-plus" width="{size}" height="{size}" viewBox="0 0 24 24" stroke-width="{stroke}" stroke="{color}" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M12 5l0 14" />
        <path d="M5 12l14 0" />
    </svg>
{:else if name == "minus"}
    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-minus" width="{size}" height="{size}" viewBox="0 0 24 24" stroke-width="{stroke}" stroke="{color}" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M5 12l14 0" />
    </svg>
{:else if name == "shopping-cart-plus"}
    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-shopping-cart-plus" width="{size}" height="{size}" viewBox="0 0 24 24" stroke-width="{stroke}" stroke="{color}" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M6 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
        <path d="M17 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
        <path d="M17 17h-11v-14h-2" />
        <path d="M6 5l6 .429m7.138 6.573l-.143 1h-13" />
        <path d="M15 6h6m-3 -3v6" />
    </svg>
{:else if name == "shopping-cart-x"}
    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-shopping-cart-x" width="{size}" height="{size}" viewBox="0 0 24 24" stroke-width="{stroke}" stroke="{color}" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M6 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
        <path d="M17 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
        <path d="M17 17h-11v-14h-2" />
        <path d="M6 5l8 .571m5.43 4.43l-.429 3h-13" />
        <path d="M17 3l4 4" />
        <path d="M21 3l-4 4" />
    </svg>
{/if}