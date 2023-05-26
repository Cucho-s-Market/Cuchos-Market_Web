<script>
  export let cantidad = 10;
</script>

<div class="navbar w-full h-[40px]">
  <div class="flex-1 w-[124px] h-[24px]">
    <p class="normal-case text-base-[#FFFFFF] font-semibold text-xl leading-6 w-[600px]">PRODUCTOS</p>
  </div>
  <div class="flex space-x-0 pr-2 mr-2">
    <p class=" border-r-2 border-neutral mr-2 pr-2">{cantidad} Productos</p>
    <p class="justify-normal grow-0 ">Ordenado por:</p>
  </div>
  <div>
    <select class="select text-center text-base font-medium not-italic leading-6 text-primary-content h-[40px] w-[140px] min-h-[0px] rounded-[10px] bg-primary">
      <option selected>Todos</option>
      <option>Precio</option>
      <option>Marca</option>
      <option>A-Z</option>
      <option>Z-A</option>
    </select>
  </div>
</div>

<!-- Dejo otro codigo aqui comentado, me parece q va acorde  con lo q debe hacer, 
no pude acoplar el dropdown a la funcionalidad del "FILTRO" 
No queda seleccionada el filtro seleccionado, tampoco uno por defecto y ademas al ser un link
espera un enlace. 
El select me parece ser la mejor opcion, al menos cumple con las propiedades necesarias para lo q requiere -->

<!-- OPCION1: DROPDOWN
<div class="dropdown dropdown-end ">
    <label tabindex="-1" for="dropdown-control" class="btn m-1 h-[40px] w-[140px] top-[140px] left-[1482px] bg-primary">Filtrar</label>
    <ul tabindex="-1" class="dropdown-content menu p-2 shadow rounded-box w-52">
        <li><a href="localhost:5173/registrarse">Todos</a></li>
        <li><a href="/">Precio</a></li>
        <li><a href="/">Marca</a></li>
        <li><a href="/">A-Z</a></li>
        <li><a href="/">Z-A</a></li>
    </ul>
  </div>

-->

<!--OPCION2:SELECT 
    <div class="flex-none">
      <select class="select select-primary bg-primary text-base-100 w-full max-w-xs">
        <option selected>Todos</option>
        <option>Precio</option>
        <option>Marca</option>
        <option>A-Z</option>
        <option>Z-A</option>
      </select>
      </div>
-->
