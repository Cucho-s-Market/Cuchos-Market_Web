<script>
	export let qtyItems = 0;
</script>

<div class="navbar w-full h-[40px] p-[0px]">
	<div class="flex-1 w-[124px] h-[24px]">
		<p class="normal-case text-base-[#FFFFFF] font-semibold text-xl leading-6 w-[600px]">
			PRODUCTOS
		</p>
	</div>
	<div class="flex space-x-0 pr-2 mr-2">
		<p class=" border-r-2 border-neutral mr-2 pr-2">{qtyItems} Productos</p>
		<p class="justify-normal grow-0">Ordenado por:</p>
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
