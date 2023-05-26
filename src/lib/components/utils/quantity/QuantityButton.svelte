<script>
    import Button from "$lib/components/utils/Button.svelte";

    export let type = 'plus';
    export let btnProps = "";
    export let value = 0;

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


</script>

<Button type="btn-primary rounded-none {type === 'plus' ? 'rounded-r' : 'rounded-l'} min-w-[30px] w-[25%] active:transform-none p-0 min-h-0 {btnProps !== "" ? btnProps : "h-8"}" svg={{name: type}} click={()=> {modifyQty(type)}}/>
