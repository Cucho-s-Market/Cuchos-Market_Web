<script>
	// @ts-nocheck
	import Search from '$lib/components/forms/search/Search.svelte';
	import ProductList from '$lib/components/products/ProductList.svelte';
	import Input from '$lib/components/utils/Input.svelte';
	import Svg from '$lib/components/utils/SVG.svelte';
	import { onMount } from 'svelte';
	import orderController from '../../logic/orderController';
	import sessionController from '../../logic/sessionController';

	let search;

	let orders = [];
	let isUserLogged;
	const STATUS = {"PENDING":"Pendiente","IN_PROGRESS":"En progreso","READY":"Listo","DELIVERED":"Entregado","CANCELLED":"Cancelado"};
	const STATUS_COLOR = {"PENDING":"text-[#131515]","IN_PROGRESS":"text-[#F5793B]","READY":"text-[#60D394]","DELIVERED":"text-[#60D394]","CANCELLED":"text-[#F03A47]"};

	onMount(async () => {

		isUserLogged = await sessionController.isUserLoggedIn();
		if (!isUserLogged) {
			window.location.href = '/';
			return;
		}

		orders = await orderController.getUserOrders();
	});

</script>
	
{#if isUserLogged}
	<div class="w-[1200px] m-auto pt-[160px]">
		<h1 class="normal-case text-base-[#FFFFFF] font-semibold text-xl leading-6 mb-12">Mis Compras</h1>

		<!-- Header -->
		<div class="w-full flex justify-between items-center">
			<div class="w-[200px]">
				<Input
					bind:value={search}
					isSearch={true}
					props={'w-[300px] h-[40px]'}
					placeholder="Buscar ordenes"
				/>
			</div>
			<div class="items-center flex gap-4">
				<!-- Show qty orders -->
				<div class="flex space-x-0 pr-2 mr-2">
					<p class=" border-r-2 border-neutral mr-2 pr-2">{orders?.length || 0} {orders?.length > 1 ? "Compras" : "Compra"}</p>
					<p class="justify-normal grow-0">Ordenado por:</p>
				</div>

				<select
					class="select text-center text-base font-medium not-italic leading-6 text-primary-content h-[40px] min-h-[0px] rounded-[10px] bg-primary"
				>
					<option value="1">Todos</option>
					<option value="2">Precio</option>
					<option value="3">Nombre</option>
				</select>
			</div>
		</div>

		<!-- Orders -->
		<div class="my-4 overflow-scroll overflow-x-hidden {orders?.length < 8 ? "overflow-y-hidden" : ""} max-h-[600px] h-[600px]">
			<table class="w-full table text-left">
				<!-- head -->
				<thead>
					<tr>
						<th>Nro de orden</th>
						<th>Estado</th>
						<th>Tipo</th>
						<th>Fecha</th>
						<th>Monto total</th>
						<th></th>
					</tr>
				</thead>
				{#if orders && orders?.length > 0}
					<tbody>
						{#each orders as order}
							<tr>
								<th>{order?.id}</th>
								<th class="{STATUS_COLOR[order?.status]}">{STATUS[order?.status]}</th>
								<td>{order?.type == "PICK_UP" ? "Retiro en sucursal" : "Domicilio"}</td>
								<td>{order?.creationDate}</td>
								<td>UYU {order?.totalPrice}</td>
								<td>
									<a href="/mis-compras/{order?.id}"><Svg name="edit-circle" color={'#F5793B'} /></a>
								</td>
							</tr>
						{/each}
						
					</tbody>
				{/if}
			</table>
		</div>
	</div>
{/if}