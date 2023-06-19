<script>
	// @ts-nocheck
	import TableButtons from './table/tableButtons.svelte';

	export let thead = [];
	export let tbody = [];
	export let buttons = {};

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

		<tbody>
			{#each tbody as tbody_item, index}
				{#if index % 2 === 0}
					<tr>
						{#each tbody_item.row as item}
							<td>{item}</td>
						{/each}
						<td>
							<TableButtons bind:buttons itemId={tbody_item.id} />
						</td>
					</tr>
				{:else}
					<tr class="active">
						{#each tbody_item.row as item}
							<td>{item}</td>
						{/each}
						<td>
							<TableButtons bind:buttons itemId={tbody_item.id} />
						</td>
					</tr>
				{/if}
			{/each}
		</tbody>
	</table>
</div>
