<script>
	// @ts-nocheck
	import { onMount } from 'svelte';
	import sessionAdminController from '../../../../logic/sessionAdminController';

	import TableStock from '../products/TableStock.svelte';
	import TableButtons from './table/tableButtons.svelte';

	export let thead = [];
	export let tbody = [];
	export let buttons = {};

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
					{#each tbody as tbody_item, index}
						{#if index % 2 === 0}
							<tr>
								{#each tbody_item.row as item}
									<td>{item}</td>
								{/each}

								{#if user.role === 'EMPLOYEE'}
									<td><TableStock qty={tbody_item.stock} productId={tbody_item.id} /></td>
								{/if}

								{#if user.role === 'ADMIN'}
									<td>
										<TableButtons bind:buttons itemId={tbody_item.id} />
									</td>
								{/if}
							</tr>
						{:else}
							<tr class="active">
								{#each tbody_item.row as item}
									<td>{item}</td>
								{/each}

								{#if user.role === 'EMPLOYEE'}
									<td><TableStock qty={tbody_item.stock} productId={tbody_item.id} /></td>
								{/if}

								{#if user.role === 'ADMIN'}
									<td>
										<TableButtons bind:buttons itemId={tbody_item.id} />
									</td>
								{/if}
							</tr>
						{/if}
					{/each}
				</tbody>
			</table>
		</div>
	{/if}
{/await}
