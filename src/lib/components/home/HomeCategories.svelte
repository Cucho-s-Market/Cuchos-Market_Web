<script>
    // @ts-nocheck
	import { onMount } from "svelte";
	import categoryController from "../../../logic/categoryController";

    let sharedStyles = "h-[52px] border border-orange-600 rounded-md hover:cursor-pointer flex flex-row items-end mx-2 my-2 border-none bg-fit bg-cover bg-center" ;
    let spanStyles = "text-white mx-2 my-1 bg-neutral-950 bg-opacity-50 sm:mx-4 sm:my-4 sm:font-semibold";
    let sm_styles = " sm:h-[414px]"
    let a_styles = " sm:w-[40%]";
    let b_styles = " sm:w-[57%]";

    let categories = [];

    onMount(async () => {
        categories = await categoryController.getCategories();
        categories = categories.slice(0, 4);
    });

</script>

{#if categories && categories?.length > 0}
    <div class="homeCategories_container w-full my-4 sm:flex sm:flex-wrap">
        <div class={sharedStyles}{a_styles}{sm_styles} style="background-image: url({categories[0]?.image})">
            <span class={spanStyles}>{categories[0]?.name}</span>
        </div> 
        <div class={sharedStyles}{b_styles}{sm_styles} style="background-image: url({categories[1]?.image})">
            <span class={spanStyles}>{categories[1]?.name}</span>
        </div> 
        <div class={sharedStyles}{b_styles}{sm_styles} style="background-image: url({categories[2]?.image})">
            <span class={spanStyles}>{categories[2]?.name}</span>
        </div> 

        <div class={sharedStyles}{a_styles}{sm_styles} style="background-image: url({categories[3]?.image})">
            <span class={spanStyles} >{categories[3]?.name}</span>
        </div> 
    </div>
{/if}