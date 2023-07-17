<script>
    // @ts-nocheck
    
	import SectionHeader from '$lib/components/admin/utils/SectionHeader.svelte';
    import Button from '$lib/components/utils/Button.svelte';
	import { onMount } from 'svelte';
	import orderController from '../../../../logic/orderController.js';
    import { notify } from '$lib/components/utils/Notifications.svelte';
	import Utils from '../../../../logic/helpers/Utils.js';

    export let data;

    let showUpdate = false;
    let showSelectStatus = false;

	const STATUS = {"PENDING":"Pendiente","PREPARING":"Preparando","READY":"Listo","DELIVERED":"Entregado","CANCELLED":"Cancelado"};

    const orderStatus = [
        'Cancelado',
        'Pendiente',
        'Preparando',
        'Entregado'
    ];
    let order = null;
    
    onMount(async () => {
        order = data.order.order;
        order.status = STATUS[order.status];
        showSelectStatus = order.status === 'Cancelado' || order.status === 'Entregado' ? true : false;
    });

    function findKeyByValue(obj, value) {
        const keys = Object.keys(obj);
        let i = 0;

        while (i < keys.length) {
            const key = keys[i];
            if (obj.hasOwnProperty(key) && obj[key] === value) {
            return key;
            }
            i++;
        }

        return null;
    }
    const updateOrder = async () => {
        Utils.showLoading();
        order.status = findKeyByValue(STATUS, order.status);
        order.type = order.type === 'Retiro en sucursal' ? 'PICK_UP' : 'DELIVERY';
        const res = await orderController.updateOrder(order);

        if (!res) {
            Utils.removeLoading();
			notify({ text: 'Ha ocurrido un error en el servidor', type: 'alert-error' });
			return;
		}

		if (res.error) {
            Utils.removeLoading();
			notify({ type: 'alert-error', text: res.message });
			return;
		}

        Utils.removeLoading();
		notify({ type: 'alert-success', text: res.message });

		setTimeout(() => {
			window.location.href = '/admin/ventas';
		}, 2000);
    }


</script>

{#if order}
    <SectionHeader
        title={'Ventas'}
        href="/admin/ventas"
    />

    <div class="flex justify-between">
        <div class="flex flex-col">
            <div class="flex flex-col mt-10">
                <h2 class="font-semibold text-md mb-5">Informacion</h2>
                <div class="gap-5 flex flex-col w-[700px] shadow rounded-lg p-5 bg-base-100">
                    <div class="flex">
                        <div class="flex flex-col justify-end mr-2">
                            <p class="font-semibold text-md mb-2">Estado: </p>
                        </div>
                        <select
                            bind:value={order.status}
                            name="branch"
                            class="select select-primary w-[150px] focus:border-none mr-10"
                            disabled={showSelectStatus}
                            on:change={() => {showUpdate = true}}
                        >
                            <option disabled selected>ESTADO</option>
                            {#each orderStatus as item (item)}
                                <option value="{item}">{item}</option>
                            {/each}
                        </select>

                        <div class="flex gap-10 w-[200px]">
                            <div class="flex flex-col justify-end {showUpdate ? 'visible' : 'hidden'}">
                                <div class="tooltip tooltip-primary" data-tip="Actualizar Estado">
                                    <Button
                                        svg={{ name: 'reload' }}
                                        type={'btn-primary h-[36px] min-h-0 w-[50px]'}
                                        click={() => {updateOrder()}}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="flex">
                        <p class="font-semibold text-md mb-2">Tipo: </p>
                        <p class="text-md mb-2 ml-2">{order.type}</p>
                    </div>
                    <div class="flex">
                        <p class="font-semibold text-md mb-2">ID: </p>
                        <p class="text-md mb-2 ml-2">{order.id}</p>
                    </div>
                    <div class="flex">
                        <p class="font-semibold text-md mb-2">Fecha: </p>
                        <p class="text-md mb-2 ml-2">{order.creationDate}</p>
                    </div>
                </div>
            </div>
        
            {#if order.customer}
                <div class="flex flex-col mt-10 ">
                    <h2 class="font-semibold text-md mb-5">Informacion del Cliente</h2>
                    <div class="gap-5 flex flex-col max-w-[700px] shadow rounded-lg p-5 bg-base-100">
                        <div class="flex">
                            <p class="font-semibold text-md mb-2">Nombre: </p>
                            <p class="text-md mb-2 ml-2">{order.customer.firstName}</p>
                        </div>
                        <div class="flex">
                            <p class="font-semibold text-md mb-2">Apellido: </p>
                            <p class="text-md mb-2 ml-2">{order.customer.lastName}</p>
                        </div>
                        <div class="flex">
                            <p class="font-semibold text-md mb-2">Email: </p>
                            <p class="text-md mb-2 ml-2">{order.customer.email}</p>
                        </div>
                        <div class="flex">
                            <p class="font-semibold text-md mb-2">Cedula: </p>
                            <p class="text-md mb-2 ml-2">{order.customer.dni}</p>
                        </div>
                        <div class="flex">
                            <p class="font-semibold text-md mb-2">Telefono: </p>
                            <p class="text-md mb-2 ml-2">{order.customer.telephone}</p>
                        </div>
                        <div class="flex">
                            <p class="font-semibold text-md mb-2">Direccion: </p>
                            <p class="text-md mb-2 ml-2">{order.clientAddress}</p>
                        </div>
                    </div>
                </div>
            {/if}
        </div>

        <div class="flex flex-col">
            <h2 class="font-semibold text-md mb-5">Productos</h2>
            <div class="gap-5 flex flex-col max-w-[700px] shadow rounded-lg p-5 bg-base-100">
                {#each order.products as item}
                    <div class="w-[650px] flex items-center w-full border border-br-grey bg-bg-product-list rounded-md max-h-20">
                        <!-- Product Image -->
                        <div class="w-[80px] h-[80px] aspect-square border border-br-grey">
                            <img class="h-full w-full object-scale-down" src="{item?.product?.images[0]}" alt="">
                        </div>
                        <!-- Product description -->
                        <div class="m-4 min-w-[10rem] max-w-[12rem]">
                            <a href="/catalogo/">
                                <p class="text-[0.75rem] overflow-hidden whitespace-nowrap text-ellipsis">{item.name}</p>
                            </a>
                            
                            <p class=" text-sku-grey text-[0.5rem] pt-2">SKU: {item.sku ? item.sku : 'N/A'}</p>
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
{/if}

