<script>

    // @ts-nocheck
    import Search from './../../forms/search/Search.svelte';
	import Cart from "$lib/components/cart/Cart.svelte";
	import Login from "$lib/components/forms/login/Login.svelte";
    import Modal from "$lib/components/utils/Modal.svelte";
	import { onMount } from "svelte";
    import Svg from "../../utils/SVG.svelte";
	import BranchSelector from "../Branch/BranchSelector.svelte";
	import sessionController from "../../../../logic/sessionController";
	import { cartStore } from "../../../../logic/Stores/CartStore";
	import branchController from "../../../../logic/branchController";
	import { branchStore } from "../../../../logic/Stores/BranchStore";

    let showModalBranch = false;
    let showModalLogin = false;
    let showSearch = false;
    let showCart = false;

    let userIsloggedIn = false;
    let branches = [];

    onMount(async () => {
     
        // Check if user is logged in
        userIsloggedIn = await sessionController.isUserLoggedIn();

        // Get branches from backend
        branches = await branchController.getBranches();
    });

</script>

<!-- ------------MODALS--------------- -->

<Cart bind:showCart={showCart}/>

<Modal bind:showModal={showModalBranch}>
    <BranchSelector branches={branches?.branches}/>
</Modal>

<Modal bind:showModal={showModalLogin}>
    <Login/>
</Modal>

<Modal bind:showSearch={showSearch}>
    <Search/>
</Modal>


<!-- --------------------------------------->
<header class="fixed w-full z-50">
    <!-- Branch bar -->
    <div class="branch-bar w-full bg-primary">
        <div class="h-10 flex justify-end items-center gap-2 max-w-[1200px] m-auto">
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <div class="cursor-pointer" on:click={() => showModalBranch=!showModalBranch}>
                <Svg name={"config-store"} size={28}/>
            </div>
            <p class="text-base-100">{$branchStore?.selected?.name || ''}</p>
        </div>
    </div>
    <nav class="w-full bg-white">
        <div class="navbar bg-base-100 max-w-[1200px] m-auto justify-between">
            <div class="">
                <a class="link" href="/"><Svg name={"cuchos-logo"} size={100}/></a>
                <div class="flex font-normal ml-20">
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
                    <!-- svelte-ignore a11y-label-has-associated-control -->
                    <label class="cursor-pointer flex">
                        <!-- svelte-ignore a11y-click-events-have-key-events -->
                        <div class="indicator" on:click={() => showSearch=!showSearch}>
                            <Svg name={"search"} size={30}/>
                        </div>
                    </label>
                </div>
                {#if userIsloggedIn}
                    <!-- Cart -->
                    <div class="dropdown dropdown-end">
                        <!-- svelte-ignore a11y-label-has-associated-control -->
                        <label class="cursor-pointer flex">
                            <!-- svelte-ignore a11y-click-events-have-key-events -->
                            <div class="indicator" on:click={() => showCart=!showCart}>
                                <Svg name={"shopping-cart"} size={30}/>
                                <span class="badge badge-sm indicator-item w-5 h-5 top-1 right-1 bg-primary border-none">{$cartStore?.totalQty || 0}</span>
                            </div>
                        </label>
                    </div>
                {/if}
                <!-- Profile -->
                <div class="dropdown dropdown-end">
                    <!-- svelte-ignore a11y-label-has-associated-control -->
                    <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
                    <label tabindex="0" class="cursor-pointer flex">
                        <div class="w-10 rounded-full flex">
                            <Svg name="user-circle" size={36}/>
                        </div>
                    </label>
                    <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
                    <ul tabindex="0" class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        {#if !userIsloggedIn}
                        <!-- svelte-ignore a11y-missing-attribute -->
                        <li>
                            <!-- svelte-ignore a11y-click-events-have-key-events -->
                            <!-- svelte-ignore a11y-missing-attribute -->
                            <a class="justify-between" on:click={() => showModalLogin=!showModalLogin}>Iniciar sesion</a>
                        </li>
                        <li>
                            <a href="/registrarse" class="justify-between">Registrarse</a>
                        </li>
                        {:else}
                            <li>
                                <!-- svelte-ignore a11y-invalid-attribute -->
                                <a href="#" class="justify-between">Perfil</a>
                            </li>
                            <li>
                                <!-- svelte-ignore a11y-invalid-attribute -->
                                <a href="#" class="justify-between" on:click={() => sessionController.logout()}>Salir</a>
                            </li>
                        {/if}
                    </ul>
                </div>
            </div>
        </div>
    </nav>
</header>