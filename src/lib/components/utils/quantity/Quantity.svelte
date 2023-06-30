<script>
  // @ts-nocheck
	import cartController from "../../../../logic/cartController";
	import Button from "../Button.svelte";
	import { notify } from "../Notifications.svelte";
	import QuantityButton from "./QuantityButton.svelte";

  export let item = {};
  export let showQty = true;
  export let card = false;
  export let containerProps = "";
  export let btnProps = "";
  export let inputProps = "";
  export let inCart = false;

  export let value = 1;

  // ----------------- METHODS -----------------

	const handleItemCart = (type) => {
		
		// This will only work inside cart module
		if(!inCart) return;

    cartController.updateQuantity(item, value);
	}

  //events
  const addToCart = async () => {
    if(String(value) === '') {
      value = 1;
    }

    let strHa = value === 1 ? "ha" : "han";
    let strArticulo = value === 1 ? "articulo" : "articulos";
    let strCantidad = value === 1 ? "un" : String(value);

    // Add item to cart
    item.quantity = parseInt(value);
    const isAdded = await cartController.addItem(item);
    if(isAdded?.error) {
      notify({type: "alert-error", text: isAdded?.message});
      return;
    }

    notify({type: "alert-success", text: `Se ${strHa} agregado ${strCantidad} ${strArticulo} al carrito.`});
    showQty = false;
  }

 // @ts-ignore
   $: {
    debugger;
    let valueStr = String(value);
    let numbers = new RegExp('^[0-9]+$');
    let valueStrArray = [...valueStr];

    if(valueStr.length > 0 && isNaN(value) || valueStr == "0") {
      value = 1;
      valueStr = String(value);
      valueStrArray = [...valueStr];
    } else if(valueStr.length > 0 && !valueStr.match(numbers)) {
      valueStrArray = valueStrArray.filter(elem => elem.match(numbers));
      valueStr = valueStrArray.join('');
      value = parseInt(valueStr);

    } else if(value > 100) {

      value = 100;

    }

  };

</script>

{#if card}
  <Button type="btn-error  btn-sm absolute left-5 bottom-20 rounded w-[25%] active:transform-none" svg={{name: "shopping-cart-x"}} click={() => {showQty = false}}/>
  <Button type="btn-success btn-sm absolute right-5 bottom-20 rounded w-[25%] active:transform-none" svg={{name: "shopping-cart-plus"}} click={()=> {addToCart()}}/>
{/if}

<!-- Cart quantity or checkout -->
<div class="flex flex-row justify-between {containerProps}">
    <QuantityButton type='minus' bind:value bind:btnProps/>
		<input type="text" placeholder="1" class="input input-bordered text-center rounded-none min-w-[80px] w-[50%] min-h-0 h-8 {inputProps !== "" ? inputProps : "h-8"}" bind:value="{value}" on:blur={handleItemCart}/>
	<QuantityButton type='plus' bind:value bind:btnProps/>
</div>