<script>
  let categorias=[
    {nombre: 'Alimentos', subcategorias: ['Bebida', 'Fruta', 'Verdura', 'Cocina']},
    {nombre: 'Tecnologia', subcategorias: ['Television', 'Videojuegos', 'Celulares', 'Laptops']},
    {nombre: 'Muebles', subcategorias: ['Mesa', 'Silla', 'Juegos de living', 'Sillones']}
  ]
</script>

<ul class="menu bg-base-100 w-56 p-2 rounded-box">
  {#each categorias as categoria}
    <li class="text-slate-500">
      <span>{categoria.nombre}</span>
    </li>
    {#each categoria.subcategorias as subc}
    <li><a class="" href="./">{subc}</a></li>
    {/each}
  {/each}
</ul>