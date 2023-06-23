<script>
    // @ts-nocheck
	import Button from "$lib/components/utils/Button.svelte";
	import Input from "$lib/components/utils/Input.svelte";
	import Link from "$lib/components/utils/Link.svelte";
	import { notify } from "$lib/components/utils/Notifications.svelte";
	import sessionController from "../../../../logic/sessionController";

    let customerDetails = {
        email: '',
    };

    let waiting = false;
    let message = "";

    async function sendForgotPassword(){
        waiting = true;
        message = "";

        // Validate all fields are filled
        if (customerDetails.email === '') {
            notify({ text: 'Por favor, llene todos los campos', type: 'alert-error'});
            waiting = false;
            return;
        }

        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(customerDetails.email)) {
            notify({ text: 'Por favor, ingrese un mail valido', type: 'alert-error'});
            waiting = false;
            return;
        }

        // Send email
        const emailSent = await sessionController.sentForgotPassword(customerDetails.email);
        waiting = false;

        if(!emailSent || emailSent?.error){
            notify({ text: 'Hubo un error al enviar el mail', type: 'alert-error'});
            return;
        }

        customerDetails.email = '';
        message = emailSent?.message;
    }

</script>

<div class="w-[800px] m-auto pt-[120px]">
        <!-- Info login and google -->
        <div class="flex flex-col items-center gap-10 border-b border-b-neutral-grey pb-12">
            <h1 class="font-semibold text-[32px]">Recuperar contraseña</h1>
        </div>
    
        <!-- Login info and register -->
        <div class="px-4 mt-8 flex flex-col gap-6">
            <div class="flex flex-col gap-4">
                <Input bind:value={customerDetails.email} label={"Email"} props={"h-10"} type={"email"} mandatory={false}/>
            </div>

            <div class="flex flex-col items-center">
                {#if message}
                    <p class="text-center text-[#409740] text-[14px]">{message}</p>
                {/if}
            </div>

            <div class="flex flex-col items-center">
                {#if waiting}
                    <Button text={"Recuperar contraseña"} type={"btn-primary loading loading-spinner"} props={"w-[300px] max-w-0 min-w-0 h-10 mt-4"}/>
                {:else}
                    <Button text={"Recuperar contraseña"} type={"btn-primary"} props={"w-full h-10 mt-4"} click={sendForgotPassword}/>
                {/if}
            </div>
        </div>
</div>
