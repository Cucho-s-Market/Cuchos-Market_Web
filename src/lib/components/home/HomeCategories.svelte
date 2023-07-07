<script>
	import { each } from "svelte/internal";
    //con alguna función o criterio debo elegir qué categorias selecionar y mostrar.
    //Images es el objeto que entra, el cual se itera y del cual se almacena en un segundo objeto las propiedades de interés
    let images = [
        {   imgCategoria: "src/assets/test_images/clothes-categories.jpg",
            nomCategoria: "byb en el sillon",
            url: "google.com"
        },
        {   imgCategoria: "src/assets/test_images/tech-categories.jpg",
            nomCategoria: "pegandose conitos",
            url: "google.com"
        },
        {   imgCategoria: "src/assets/test_images/food-categories.jpg",
            nomCategoria: "calzoncillo",
            url: "google.com"
        },
        {   imgCategoria: "src/assets/test_images/furniture-categories.jpg",
            nomCategoria: "cleaning",
            url: "google.com"
        }
    ]
    
    let sharedStyles = "h-[52px] border border-orange-600 rounded-md hover:cursor-pointer flex flex-row items-end mx-2 my-2 border-none bg-fit bg-cover bg-center" ;

 
    let spanStyles = "text-white mx-2 my-1 bg-neutral-950 bg-opacity-50 sm:mx-4 sm:my-4 sm:font-semibold";
    let sharedStylesSM = {};
    let selectedImage = "";
    let background = "";

    //Puede suceder que hayan más categorías que las renderizables. En este caso, se elige tomar 4 fotos, por tanto, seleccionar solo 4 del total.
    var arrayCategorias= []
    function llenarArray(){
        let i = 0;
        images.forEach(image => {
            let categoria = {

                nombre: image.nomCategoria, 
                imagen: image.nomCategoria,
                url: image.url
            }
            arrayCategorias.push(categoria)
            i++;
        });
    }
    {llenarArray}
    let sm_styles = " sm:h-[414px]"
    let a_styles = " sm:w-[40%]";
    let b_styles = " sm:w-[57%]";
</script>

<div class="homeCategories_container w-full my-4 sm:flex sm:flex-wrap">
        <div class={sharedStyles}{a_styles}{sm_styles} style="background-image: url({images[0].imgCategoria})">
            <span class={spanStyles} >Ropa</span>
        </div> 
        <div class={sharedStyles}{b_styles}{sm_styles} style="background-image: url({images[1].imgCategoria})">
            <span class={spanStyles}>Tecnología</span>
        </div>
        <div class={sharedStyles}{b_styles}{sm_styles} style="background-image: url({images[2].imgCategoria})">
            <span class={spanStyles}>Alimentos</span>
        </div>
        <div class={sharedStyles}{a_styles}{sm_styles} style="background-image: url({images[3].imgCategoria})">
            <span class={spanStyles}>Muebles</span>
        </div>
</div>