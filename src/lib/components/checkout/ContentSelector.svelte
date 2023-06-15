<script>
    //@ts-nocheck
    export let takeAway = false;
</script>

<div class="flex items-center gap-6 p-2 my-4 max-w-[400px] overflow-hidden whitespace-nowrap rounded-[2px] border border-primary border-opacity-50 bg-bg-product-list">
    <!-- Radio button -->
    <input type="radio" name="radio-2" class="radio radio-primary" disabled={takeAway} checked={!takeAway} on:click|stopPropagation={() => takeAway = false}/>

    <!-- Content -->
    <div class="w-full">
        <slot></slot>
    </div>
</div>



