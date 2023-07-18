<script>
	import Header from './../common/Header/Header.svelte';
	import SVG from './../utils/SVG.svelte';
	export let email = "correo@ejemplo.com";
    
</script>

<div class="w-full p-8 bg-br-white flex justify-center h-fit ">   
    <div class="w-[0px] xl:w-full xl:max-w-[768px] invisible xl:visible mt-[120px]">
        <img src="https://firebasestorage.googleapis.com/v0/b/cuchos-55e24.appspot.com/o/supermarketRegistration.jpg?alt=media&token=a0a340a5-eb09-46f1-bea1-b33b64538447" alt="supermercado">
    </div>
    <div class="h-auto md:max-w-[768px] bg-white text-center mt-[100px] mb-[40px] border-x md:border-none border-primary">
        <div class="mt-[20px] w-[576px] sm:w-[614px] md:w-[768] my-[40px] rounded-xl ErrorContainer bg-white flex flex-col justify-center items-center">
            <img src="https://firebasestorage.googleapis.com/v0/b/cuchos-55e24.appspot.com/o/imagenLogoSVG.svg?alt=media&token=ae6fb50b-77e7-42ce-8179-03c209306453" alt="logoCuchos">
            <div class="flex flex-col py-8 justify-center h-auto">
                <h1 class ="text-primary  font-bold text-center">¡GRACIAS!</h1>
            </div>
            <div class="max-w-[600px] flex flex-col justify-center">
                <div class="sm:w-[416px] my-[40px] rounded-xl ErrorContainer bg-white flex flex-col justify-center items-center text-center">
                    <div>
                        
                    </div>
                    <div>
                        <h3 class ="text-primary py-4">En este momento estamos procesando tu orden.</h3>
                        <p>Recibiras un correo con la información de tu compra en:</p>
                        <p class ="text-primary py-4"><strong>{email}</strong></p>
                        <p>Mientras tanto, aprovecha y explora nuestras <a class ="underline underline-offset-2" href="/">ofertas</a> en Cucho's!</p>
                    </div>
                    <div class="my-[40px] text-primary text-sm w-[320px] md:w-full">
                        <p>Por dudas o consultas sobre tu compra, comunicate con Cucho's al: +598 788 452 132</p>
                    </div>
                </div>
            </div>
            <div class="flex flex-col py-8 justify-center h-auto">
                <p class ="text-primary text-7xl font-bold text-center"></p>
            </div>
        </div>

    </div>
</div>