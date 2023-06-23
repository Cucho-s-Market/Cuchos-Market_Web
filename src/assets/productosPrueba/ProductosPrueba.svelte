<script>
	import { onMount } from "svelte";

    export let arrayProductos = [];
    
    onMount(async () => {
        arrayProductos = [
        {
            nombre: "Heladera GGWP33",
            descripcion: "refrigerador frio-seco inverter A+",
            precio: 44000,
            peso: 44,
            color: "plateada", 
            marca: "Samsung",
            imagenes: [ 
                {   src: "https://productos.misbeneficios.com.uy/media/catalog/product/cache/72d981025d8e9f090c932c53a35a6346/5/1/515641.jpg",
                    alt: "primer imagen"
                },
                {   src: "",
                    alt: "segunda imagen"
                },
            ]
        },
        {
            nombre: "Medias tejidas por la abuela",
            descripcion: "100% lana",
            precio: 300,
            peso: 0.2,
            color: "rosado", 
            marca: "N/N",
            imagenes: [ 
                {   src: "https://m.media-amazon.com/images/I/91mVIMVXU7L._AC_UL1500_.jpg",
                    alt: "primer imagen"
                },
                {   src: "",
                    alt: "segunda imagen"
                },
            ]
        },
        {
            nombre: "CBR1000RR-R",
            descripcion: "Race motorbike",
            precio: 244000,
            peso: 135,
            color: "Blanco", 
            marca: "Honda",
            imagenes: [ 
                {   src: "https://img.remediosdigitales.com/d76a47/cbr-3-2022/1024_2000.jpeg",
                    alt: "primer imagen"
                },
                {   src: "",
                    alt: "segunda imagen"
                },
            ]
        },
    ]
    })


</script>
