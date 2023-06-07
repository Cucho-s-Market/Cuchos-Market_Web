<script>
	import ProductStock from '$lib/components/admin/products/ProductStock.svelte';
	import SectionHeader from '$lib/components/admin/utils/SectionHeader.svelte';
	import ProductForm from '$lib/components/forms/admin/ProductForm.svelte';
</script>

<SectionHeader title={'Agregar Producto'} back={true} />

<div class="flex justify-around">
	<ProductForm />
	<ProductStock />
</div>
