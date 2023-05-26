<script>
	import Cart from '$lib/components/cart/Cart.svelte';
	import Header from '$lib/components/common/Header/Header.svelte';

    let items = [
        {name: 'Laptop xd fddsfdsfdsfdsfdsf', qty: 1, total: 10, sku: 'fdsfdsfs', image: ''},
        {name: 'Laptop xd fddsfdsfdsfdsfdsf', qty: 30, total: 10000, sku: 'fdsfdsfs', image: ''},
        {name: 'Cuadro de pintura', qty: 100, total: 120, sku: 'fdsfdsfs', image: ''},
        {name: 'Marco polo xd', qty: 21, total: 10, sku: 'fdsfdsfs', image: ''},
        {name: '', qty: 1, total: 8, sku: '', image: ''}
    ];
</script>

<Header/>
<Cart items={items}/>
