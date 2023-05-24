<script>
  let categorias=[
    {nombre: 'Alimentos', subcategorias: ['Bebida', 'Fruta', 'Verdura', 'Cocina']},
    {nombre: 'Tecnologia', subcategorias: ['Television', 'Videojuegos', 'Celulares', 'Laptops']},
    {nombre: 'Muebles', subcategorias: ['Mesa', 'Silla', 'Juegos de living', 'Sillones']}
  ]
</script>
<div class="w-[115px] h-[437px] top-[268px] left-[368px] absolute">

  <ul class="bg-base-100 w-[115px] h-[437px] top-[268px] left-[368px]">

    {#each categorias as categoria}
    <div>
      <li class="w-[90px] h-[24px] left-[368] top-[418] ">
        <span class="text-base-neutral text-center font-medium not-italic">{categoria.nombre}</span>
      </li>
      {#each categoria.subcategorias as subc}
      <li class="w-[90px] h-[24px] top-[480px] left-[370px]"><a class="not-italic font-medium text-sm center text-[#764F72]" href="./">{subc}</a></li>
      {/each}
    </div>
      {/each}
    </ul>
</div>
  
  