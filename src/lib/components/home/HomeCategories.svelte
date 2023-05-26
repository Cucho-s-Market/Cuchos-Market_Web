<script>
	import { each } from "svelte/internal";

    //con alguna función o criterio debo elegir qué categorias selecionar y mostrar.
    let images = [
        {   imgCategoria: "https://a6p8a2b3.stackpathcdn.com/gKEgOJqsQRvm5zbo45ba7yTdaFM=/702x526/smart/rockol-img/img/foto/upload/beavis-and-butthead.jpg",
            nomCategoria: "byb en el sillon"
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
    //Una vez cargado el recuadro con las categorías (imagen - título), relleno un array para generar las categorías del home
    // * La idea es cargar solo las 4 primeras para que quede como en el mock, pero alternar los valores para que la disposición no sea siempre la misma.
    
</script>

<div class="homeCategories_container">
    <div class="homeCategories_row">
        <div class="homeCategories_col" style="">
            
        </div>
        <div class="homeCategories_col">
    
        </div>
    </div>
    <div class="homeCategories_row">
        <div class="homeCategories_col">
        
        </div>
        <div class="homeCategories_col">
    
        </div>
    </div>

</div>