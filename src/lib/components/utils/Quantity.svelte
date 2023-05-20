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
    console.log(value);
    if(value < 0 || String(value) === '') {
      value = 1;
    }

    if(value >= 100) {
      value = 100;
    }
    alert(value);
    showQty = false;
  }

  $: {
    let valueStr = String(value);
    let numbers = new RegExp('^[0-9]+$');
    let valueStrArray = [...valueStr];

    if(valueStr.length === 1 && isNaN(value)) {
      value = 1;
      valueStr = String(value);
      valueStrArray = [...valueStr];
    }


    if(valueStr !== '' && !valueStr.match(numbers)) {

      valueStrArray = valueStrArray.filter(elem => elem.match(numbers));
      valueStr = valueStrArray.join('');
      value = parseInt(valueStr);
    }
  };

</script>


<Button type="btn-error  btn-sm absolute left-5 bottom-20 rounded w-[25%] active:transform-none" svg="shopping-cart-x" click={() => {showQty = false}}/>
<Button type="btn-success btn-sm absolute right-5 bottom-20 rounded w-[25%] active:transform-none" svg="shopping-cart-plus" click={()=> {addToCart()}}/>

<div class="flex flex-row justify-between w-full">
		<Button type="btn-primary rounded-none rounded-l w-[25%] active:transform-none" svg="minus" click={()=> {modifyQty('minus')}}/>
		<input type="text" placeholder="1" class="input input-bordered text-center rounded-none w-[50%]"  bind:value="{value}"/>
		<Button type="btn-primary rounded-none rounded-r w-[25%] active:transform-none" svg="plus" click={() => {modifyQty('plus')}}/>
</div>