<script>
	// @ts-nocheck
	import { onMount } from 'svelte';
	import sessionAdminController from '../../../../logic/sessionAdminController';

	import TableStock from '../products/TableStock.svelte';
	import TableButtons from './table/tableButtons.svelte';
	import Svg from '$lib/components/utils/SVG.svelte';

	export let thead = [];
	export let tbody = [];
	export let buttons = {};
	export let click = () => {};

	let user = null;

	onMount(async () => {
		user = await sessionAdminController.getUser();
	});
</script>

{#await user then}
	{#if user}
		<div class="w-full overflow-x-auto mt-10 shadow">
			<table class="table w-full">
				<thead>
					<tr>
						{#each thead as item}
							<th>{item}</th>
						{/each}
						<th />
					</tr>
				</thead>

				<tbody>
					{#each tbody as tbody_item, index (tbody_item.id)}
							<tr class="{index % 2 === 0 ? 'active': ''}">
								{#each tbody_item.row as item}
									<td>{item}</td>
								{/each}

								{#if tbody_item.stock >= 0 && user.role === 'EMPLOYEE'}
									<td><TableStock stock={tbody_item.stock} productId={tbody_item.id} /></td>
								{/if}
								
								{#if buttons.editOrder && user.role === 'EMPLOYEE'}
									<td><a href="/admin/ventas/{tbody_item.id}"><Svg name="edit-circle" color={'#F5793B'} /></a></td>
								{/if}

								{#if user.role === 'ADMIN'}
									<td>
										<TableButtons bind:buttons itemId={tbody_item.id} userIsEnabled={tbody_item?.disabled} role={tbody_item?.row[3]} email={tbody_item?.row[0]}/>
									</td>
								{/if}

								{#if buttons.showInfo && user.role === 'EMPLOYEE'}
									<td><a href="#" class="cursor-pointer" issue-id={tbody_item.id} on:click={click} ><Svg name="eye" color={'#F5793B'} /></a></td>
								{/if}
							</tr>
					{/each}
				</tbody>
			</table>
		</div>
	{/if}
{/await}
