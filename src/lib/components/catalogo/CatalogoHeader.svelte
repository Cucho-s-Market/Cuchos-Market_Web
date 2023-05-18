<script>
  let cantidad = 10;
</script>

  <div class= "grow max-w-5xl mx-auto shadow bg-base h-screen">
    <div class="navbar bg-base border-2">
      <div class="flex-1">
        <a class="btn btn-ghost normal-case text-xl">PRODUCTOS</a>
      </div>
      <div class="flex space-x-0 pr-2 mr-2">
        <p class=" border-r-2 border-neutral mr-2 pr-2">{cantidad} Productos</p>
        <p class="justify-normal grow-0 ">Ordenado por:</p>
      </div>
      <div class="flex-none">
<select class="select select-primary bg-primary text-base-100 w-full max-w-xs">
  <option selected>Todos</option>
  <option>Precio</option>
  <option>Marca</option>
  <option>A-Z</option>
  <option>Z-A</option>
</select>
      </div>
    </div>

  </div>
