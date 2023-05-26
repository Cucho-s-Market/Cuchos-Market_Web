<script>
	import { each } from "svelte/internal";

    let sharedStyles ="rounded-md selected:border-2"
    let sideStyles = "w-[50px] h-[50px]"
    let mainStyles = "w-full "
    let imgStyles = "border-2 rounded-md h-inherit object-cover border-orange-400 drop-shadow hover:drop-shadow-lg" 

    let dummyImage = "https://dummyimage.com/100/09f.png/fff"

    //dpe: prototipos de imagenes (remplazar por f que trae objeto por parámetros)
    let images = [
        {   source: "https://a6p8a2b3.stackpathcdn.com/gKEgOJqsQRvm5zbo45ba7yTdaFM=/702x526/smart/rockol-img/img/foto/upload/beavis-and-butthead.jpg",
            altInf: "byb en el sillon"
        },
        {   source: "https://cdn.shopify.com/s/files/1/0009/5879/1732/products/beavisdesksmel_2048x.jpg?v=1670004186",
            altInf: "pegandose conitos"
        },
        {   source: "https://cdn.shopify.com/s/files/1/0009/5879/1732/files/STHECRICKE23042615000_2048x.jpg?v=1682570766",
            altInf: "calzoncillo"
        },
        {   source: "https://e1.pxfuel.com/desktop-wallpaper/682/121/desktop-wallpaper-beavis-and-butthead-rq-beavis-and-butt-head.jpg",
            altInf: "cleaning"
        }
    ]

    let activarImg = true;
    //@ts-ignore
    var selectImg = (event) =>{ event.target.src != null ? mainImage = event.target.src : mainImage = dummyImage}
    let mainImage = images[0].source;
</script>



<div class="w-full gap-4">
    <div class="block sm:flex gap-4"> 
        <div class="flex flex-row sm:flex-col gap-4 ">
            {#each images as image}
                <div class='{sideStyles} {sharedStyles}'>
                    <img on:click={selectImg} on:keydown={selectImg} src={image.source} alt={image.altInf} class='{imgStyles}'>
                </div>
            {/each}
        </div>
        <div class="gap-2">
            <div class='{mainStyles} {sharedStyles}'>
                <img id="mainImage" src="{mainImage}" alt="asd" class='{imgStyles} w-[450px] h-[385px]'>
            </div>
        </div>
    </div>
</div>
