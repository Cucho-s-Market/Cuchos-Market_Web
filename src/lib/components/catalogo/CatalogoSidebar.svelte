<script>
	let categorias = [
		{ nombre: 'Alimentos', subcategorias: ['Bebida', 'Fruta', 'Verdura', 'Cocina'] },
		{ nombre: 'Tecnologia', subcategorias: ['Television', 'Videojuegos', 'Celulares', 'Laptops'] },
		{ nombre: 'Muebles', subcategorias: ['Mesa', 'Silla', 'Juegos de living', 'Sillones'] }
	];
</script>

<div class="sticky top-[120px] w-[130px]">
	<ul class="bg-base-100 w-full overflow-hidden whitespace-nowrap text-ellipsis">
		{#each categorias as categoria}
			<div class="w-full my-2">
				<li class="w-full mb-2">
					<span class="text-base-neutral text-center font-medium not-italic">{categoria.nombre}</span>
				</li>
				{#each categoria.subcategorias as subc}
					<li class="w-full py-[2px] max-w-[140px]">
						<a class="not-italic font-medium text-sm center text-neutral-grey hover:text-primary" href="./">{subc}</a>
					</li>
				{/each}
			</div>
		{/each}
	</ul>
</div>
