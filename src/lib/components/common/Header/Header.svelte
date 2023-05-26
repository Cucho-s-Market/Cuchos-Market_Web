<script>
	import Cart from "$lib/components/cart/Cart.svelte";
	import Login from "$lib/components/forms/login/Login.svelte";
    import Modal from "$lib/components/utils/Modal.svelte";
    import Svg from "../../utils/SVG.svelte";
	import BranchSelector from "../Branch/BranchSelector.svelte";
    export let location = "Central";
    export let cartQty = 0;
    let showModalBranch = false;
    let showModalLogin = false;
    let showCart = false;

    let branches = [
        {location: 'Central', address: 'Colonia 1815', schedule: 'Abierto de 10 a 20hs', selected: false},
        {location: 'Montevideo', address: 'La blanqueada 546', schedule: 'Abierto de 9 a 18hs', selected: true},
        {location: 'Central', address: 'Colonia 1815', schedule: 'Abierto de 10 a 20hs', selected: false},
    ]

</script>

<!-- ------------MODALS--------------- -->

<Cart bind:showCart={showCart}/>

<Modal bind:showModal={showModalBranch}>
    <BranchSelector branches={branches}/>
</Modal>

<Modal bind:showModal={showModalLogin}>
    <Login/>
</Modal>

<!-- ------------------------------------- -->

<div class="fixed w-full">
    <!-- Branch bar -->
    <div class="branch-bar w-full bg-primary">
        <div class="h-10 flex justify-end items-center gap-2 max-w-[1200px] m-auto">
            <div class="cursor-pointer" on:click={() => showModalBranch=!showModalBranch}>
                <Svg name={"config-store"} size={28}/>
            </div>
            <p class="text-base-100">{location}</p>
        </div>
    </div>
    <div class="w-full bg-white">
        <div class="navbar bg-base-100 max-w-[1200px] m-auto justify-between">
            <div class="">
                <a class="link" href="/"><Svg name={"cuchos-logo"}/></a>
                <div class="flex font-semibold ml-20">
                    <ul class="navbar gap-8">
                        <li><a class="hover:underline" href="/">Home</a></li>
                        <li><a class="hover:underline" href="/catalogo">Catalogo</a></li>
                        <li><a class="hover:underline" href="/about-us">Sobre Nosotros</a></li>
                    </ul>
                </div>
            </div>
            
            <div class="flex gap-6">
                <!-- Search -->
                <div class="dropdown dropdown-end">
                    <label class="cursor-pointer flex">
                        <div class="indicator">
                            <Svg name={"search"} size={30}/>
                        </div>
                    </label>
                </div>
                <!-- Cart -->
                <div class="dropdown dropdown-end">
                    <label class="cursor-pointer flex">
                        <div class="indicator" on:click={() => showCart=!showCart}>
                            <Svg name={"shopping-cart"} size={30}/>
                            <span class="badge badge-sm indicator-item w-5 h-5 top-1 right-1 bg-primary border-none">{cartQty}</span>
                        </div>
                    </label>
                </div>
                <!-- Profile -->
                <div class="dropdown dropdown-end">
                    <label tabindex="0" class="cursor-pointer flex">
                        <div class="w-10 rounded-full flex">
                            <Svg name="user-circle" size={36}/>
                        </div>
                    </label>
                    <ul tabindex="0" class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        <li>
                            <a class="justify-between" on:click={() => showModalLogin=!showModalLogin}>Iniciar sesion</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</div>