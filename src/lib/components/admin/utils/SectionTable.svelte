<script>
	// @ts-nocheck
	import Svg from '$lib/components/utils/SVG.svelte';

	export let thead = [];
	export let tbody = [];
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
						{#each tbody_item as item}
							<td>{item}</td>
						{/each}
						<td><a href="#"><Svg name="info-circle-filled" /></a></td>
					</tr>
				{:else}
					<tr class="active">
						{#each tbody_item as item}
							<td>{item}</td>
						{/each}
						<td><a href="#"><Svg name="info-circle-filled" /></a></td>
					</tr>
				{/if}
			{/each}
		</tbody>
	</table>
</div>
