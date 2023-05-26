<script>
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
        <!-- side images -->
        <div class="flex flex-row sm:flex-col gap-4 ">
            {#each images as image}
                <div class='w-[50px] h-[50px] rounded-md selected:border-2'>
                    <img on:click={selectImg} on:keydown={selectImg} src={image.source} alt={image.altInf} class='w-full h-full object-cover border border-neutral-grey rounded-md h-inherit hover:border-primary'>
                </div>
            {/each}
        </div>
        <!-- Main image -->
        <div class="gap-2">
            <div class='w-full rounded-md selected:border-2'>
                <img id="mainImage" src="{mainImage}" alt="asd" class='border-neutral-grey border rounded-md h-inherit object-cover w-[450px] h-[385px]'>
            </div>
        </div>
    </div>
</div>
