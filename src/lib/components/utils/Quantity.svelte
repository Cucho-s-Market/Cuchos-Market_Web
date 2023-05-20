<script>
	import Button from "./Button.svelte";

  export let showQty = true;

  let value = 1;

  let showPlus = false;
  let showMinus = false;


  //events
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
    if(value < 0) {
      value = 1;
    }

    alert(value);
    showQty = false;
  }

</script>


<Button type="btn-error  btn-sm absolute left-5 bottom-20 rounded w-[25%] active:transform-none" svg="shopping-cart-x" click={() => {showQty = false}}/>
<Button type="btn-success btn-sm absolute right-5 bottom-20 rounded w-[25%] active:transform-none" svg="shopping-cart-plus" click={()=> {addToCart()}}/>

<div class="flex flex-row justify-between w-full">
		<Button type="btn-primary rounded-none rounded-l w-[25%] active:transform-none" svg="minus" click={()=> {modifyQty('minus')}}/>
		<input type="number" class="input input-bordered text-center rounded-none w-[50%]"  bind:value="{value}"/>
		<Button type="btn-primary rounded-none rounded-r w-[25%] active:transform-none" svg="plus" click={() => {modifyQty('plus')}}/>
</div>