<script>
	import Button from "./Button.svelte";
	import { notify } from "./Notifications.svelte";

  export let showQty = true;
  export let card = false;
  export let props = "";

  let value = 1;

  //events
  // @ts-ignore
  const modifyQty = (btn) => {
    switch (btn) {
      case 'plus':
          value++;
        break;
      case 'minus':
      if(value > 1) {
          value--;
        }
        break;
    }
  }

  const addToCart = () => {

    if(String(value) === '') {
      value = 1;
    }

    let strHa = value === 1 ? "ha" : "han";
    let strArticulo = value === 1 ? "articulo" : "articulos";
    let strCantidad = value === 1 ? "un" : String(value);

    // @ts-ignore
    notify({type: "alert-success", text: `Se ${strHa} agregado ${strCantidad} ${strArticulo} al carrito.`});
    showQty = false;
  }

  $: {
    let valueStr = String(value);
    let numbers = new RegExp('^[0-9]+$');
    let valueStrArray = [...valueStr];

    if(valueStr.length > 0 && isNaN(value)) {

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
  <Button type="btn-error  btn-sm absolute left-5 bottom-20 rounded w-[25%] active:transform-none" svg="shopping-cart-x" click={() => {showQty = false}}/>
  <Button type="btn-success btn-sm absolute right-5 bottom-20 rounded w-[25%] active:transform-none" svg="shopping-cart-plus" click={()=> {addToCart()}}/>
{/if}

<div class="flex flex-row justify-between {props}">
		<Button type="btn-primary rounded-none rounded-l w-[25%] active:transform-none" svg={{name: 'minus'}} click={()=> {modifyQty('minus')}}/>
		<input type="text" placeholder="1" class="input input-bordered text-center rounded-none w-[50%]"  bind:value="{value}"/>
		<Button type="btn-primary rounded-none rounded-r w-[25%] active:transform-none" svg={{name: 'plus'}} click={() => {modifyQty('plus')}}/>
</div>