<script>
	// @ts-nocheck
	import Button from '$lib/components/utils/Button.svelte';
	import { onMount } from 'svelte';
	import Utils from '../../../logic/helpers/Utils.js';
	import { notify } from '$lib/components/utils/Notifications.svelte';
	import orderController from '../../../logic/orderController.js';
	import sessionController from '../../../logic/sessionController.js';
	import branchController from '../../../logic/branchController.js';
	import SectionHeader from '$lib/components/admin/utils/SectionHeader.svelte';

	export let data;

	let showUpdate = false;
	let showSelectStatus = false;

	const STATUS = {
		PENDING: 'Pendiente',
		IN_PROGRESS: 'En progreso',
		READY: 'Listo',
		DELIVERED: 'Entregado',
		CANCELLED: 'Cancelado'
	};
	const STATUS_COLOR = {
		PENDING: 'text-[#131515]',
		IN_PROGRESS: 'text-[#F5793B]',
		READY: 'text-[#60D394]',
		DELIVERED: 'text-[#60D394]',
		CANCELLED: 'text-[#F03A47]'
	};

	let order = null;
	let user;
	let branch;

	onMount(async () => {
		const isUserLogged = await sessionController.isUserLoggedIn();
		if (!isUserLogged) {
			window.location.href = '/';
			return;
		}

		order = data?.order?.order;

		if (!order) {
			window.location.href = '/mis-compras';
			return;
		}

		showSelectStatus = order.status === 'CANCELLED' || order.status === 'DELIVERED' ? true : false;
		user = await sessionController.getUser();
		branch = await branchController.getSelectedBranch();
	});

	async function cancelOrder(order_id) {
		const orderCancelled = orderController.cancelCustomerOrder(order_id);
		if (!orderCancelled || orderCancelled?.error) {
			notify({ text: 'No se pudo cancelar la orden', type: 'alert-error' });
			return;
		}

		notify({ text: 'Orden cancelada correctamente', type: 'alert-success' });

		setTimeout(() => {
			window.location.reload();
		}, 1000);
	}
</script>

{#if order}
	<div class="pt-[180px] w-[1200px] m-auto">
		<div class="flex justify-between">
			<SectionHeader title={`Nro de orden #${order?.id}`} href="/mis-compras" />
			<div class="flex flex-col gap-4 w-[220px]">
				{#if order?.status == 'PENDING'}
					<Button type={"btn-error"} text={'Cancelar orden'} click={() => cancelOrder(order?.id)}/>
				{/if}
				<Button text={'Realizar reclamo'} />
			</div>
		</div>

		<div class="flex justify-between">
			<div class="flex flex-col">
				<div class="flex flex-col mt-10">
					<h2 class="font-semibold text-md mb-5">Informacion</h2>
					<div class="gap-5 flex flex-col w-[500px] shadow rounded-lg p-5 bg-base-100">
						<div class="flex">
							<div class="flex flex-col justify-end mr-2">
								<p class="font-semibold text-md mb-2">Estado:</p>
							</div>

							<p class={STATUS_COLOR[order?.status]}>{STATUS[order?.status]}</p>
						</div>
						<div class="flex">
							<p class="font-semibold text-md mb-2">Tipo:</p>
							<p class="text-md mb-2 ml-2">
								{order?.type == 'PICK_UP' ? 'Retiro en sucursal' : 'Domicilio'}
							</p>
						</div>
						<div class="flex">
							<p class="font-semibold text-md mb-2">Fecha:</p>
							<p class="text-md mb-2 ml-2">{order.creationDate}</p>
						</div>
					</div>
				</div>

				{#if order.customer}
					<div class="flex flex-col mt-10">
						<h2 class="font-semibold text-md mb-5">Informacion de envío</h2>
						<div class="gap-5 flex flex-col max-w-[500px] shadow rounded-lg p-5 bg-base-100">
							<div class="flex">
								<p class="font-semibold text-md mb-2">Nombre:</p>
								<p class="text-md mb-2 ml-2">{order.customer.firstName}</p>
							</div>
							<div class="flex">
								<p class="font-semibold text-md mb-2">Apellido:</p>
								<p class="text-md mb-2 ml-2">{order.customer.lastName}</p>
							</div>
							<div class="flex">
								<p class="font-semibold text-md mb-2">Email:</p>
								<p class="text-md mb-2 ml-2">{order.customer.email}</p>
							</div>
							<div class="flex">
								<p class="font-semibold text-md mb-2">Cedula:</p>
								<p class="text-md mb-2 ml-2">{order.customer.dni}</p>
							</div>
							<div class="flex">
								<p class="font-semibold text-md mb-2">Telefono:</p>
								<p class="text-md mb-2 ml-2">{order.customer.telephone}</p>
							</div>
							<div class="flex">
								<p class="font-semibold text-md mb-2">Direccion:</p>
								<p class="text-md mb-2 ml-2">
									{order?.type == 'PICK_UP' ? branch?.address : order?.clientAddress}
								</p>
							</div>
						</div>
					</div>
				{/if}
			</div>

			<div class="flex flex-col mt-10">
				<h2 class="font-semibold text-md mb-5">Productos</h2>
				<div class="gap-5 flex flex-col max-w-[500px] shadow rounded-lg p-5 bg-base-100">
					{#each order.products as item}
						<div
							class="w-[650px] flex items-center w-full border border-br-grey bg-bg-product-list rounded-md max-h-20"
						>
							<!-- Product Image -->
							<div class="w-[80px] h-[80px] aspect-square border border-br-grey">
								<img
									class="h-full w-full object-scale-down"
									src={item?.product?.images[0]}
									alt=""
								/>
							</div>
							<!-- Product description -->
							<div class="m-4 min-w-[10rem] max-w-[12rem]">
								<a href="/catalogo/">
									<p class="text-[0.75rem] overflow-hidden whitespace-nowrap text-ellipsis">
										{item.name}
									</p>
								</a>

								<p class=" text-sku-grey text-[0.5rem] pt-2">
									SKU: {item?.product?.code ? item?.product?.code : 'N/A'}
								</p>
							</div>
							<!-- Product qty -->
							<div class="min-w-[4.5rem] mx-4">
								<p class="text-[0.75rem] font-semibold">{item.quantity}</p>
							</div>
							<!-- Product total -->
							<div class="min-w-[4.5rem] mx-4">
								<p class="text-[0.75rem] font-semibold">UYU {item.finalPrice}</p>
							</div>
						</div>
					{/each}

					<div class="flex justify-end font-medium">
						<p>UYU {order.totalPrice}</p>
					</div>
				</div>
			</div>
		</div>
	</div>
{/if}
