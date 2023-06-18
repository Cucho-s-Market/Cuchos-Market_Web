<script>
	// @ts-nocheck
	import sessionAdminController from '../../../../logic/sessionAdminController';
	import StockUpdater from './table/StockUpdater.svelte';
	import TableButtons from './table/tableButtons.svelte';

	export let thead = [];
	export let tbody = [];
	export let buttons = {};

	let user = null;
	let getUser = async () => {
		user = await sessionAdminController.getUser();
	};
</script>

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

		{#await getUser()}
			<!-- promise is pending -->
		{:then}
			<tbody>
				{#each tbody as tbody_item, index}
					{#if index % 2 === 0}
						<tr>
							{#each tbody_item.row as item}
								<td>{item}</td>
							{/each}
							<td>
								{#if user.role === 'ADMIN'}
									<TableButtons bind:buttons itemId={tbody_item.id} />
								{:else}
									<StockUpdater />
								{/if}
							</td>
						</tr>
					{:else}
						<tr class="active">
							{#each tbody_item.row as item}
								<td>{item}</td>
							{/each}
							<td>
								{#if user.role === 'ADMIN'}
									<TableButtons bind:buttons itemId={tbody_item.id} />
								{:else}
									<StockUpdater />
								{/if}
							</td>
						</tr>
					{/if}
				{/each}
			</tbody>
		{/await}
	</table>
</div>
