<script>
    // @ts-nocheck
	import Button from "$lib/components/utils/Button.svelte";
	import Input from "$lib/components/utils/Input.svelte";
	import { notify } from "$lib/components/utils/Notifications.svelte";
	import sessionController from "../../../../logic/sessionController";

    export let token;

    let customerDetails = {
        password: '',
        confirmPassword: ''
    };

    let message = "";
    let waiting = false;

    async function changePassword(){
        
        if(!token) window.location.href = '/';

        // Validate fields
        if(customerDetails.password == "" || customerDetails.confirmPassword == ""){
            notify({ text: "Por favor llene todos los campos.", type: "alert-error" });
            return;
        }

        if(customerDetails.password != customerDetails.confirmPassword){
            notify({ text: "Las contraseñas no coinciden.", type: "alert-error" });
            return;
        }

        waiting = true;

        // Send request to change password
        const res = await sessionController.changePasswordUser(token, customerDetails.password);
        if(!res || res.error){
            notify({ text: res?.message || "Error al cambiar la contraseña.", type: "alert-error" });
            waiting = false;
            return;
        }

        waiting = false;
        customerDetails = {
            password: '',
            confirmPassword: ''
        };
        notify({ text: "Contraseña cambiada con éxito.", type: "alert-success" });

        setTimeout(() => {
            window.location.href = '/';
        }, 2000);
    }

</script>

<div class="w-[800px] m-auto pt-[120px]">
    <!-- Info login and google -->
    <div class="flex flex-col items-center gap-10 border-b border-b-neutral-grey pb-12">
        <h1 class="font-semibold text-[32px]">Cambiar contraseña</h1>
    </div>

    <!-- Login info and register -->
    <div class="px-4 mt-8 flex flex-col gap-6">
        <div class="flex flex-col gap-4">
            <Input bind:value={customerDetails.password} label={"Password"} props={"h-10"} type={"password"} mandatory={true}/>
        </div>

        <div class="flex flex-col gap-4">
            <Input bind:value={customerDetails.confirmPassword} label={"Confirm password"} props={"h-10"} type={"password"} mandatory={true}/>
        </div>

        <div class="flex flex-col items-center">
            {#if message}
                <p class="text-center text-[#409740] text-[14px]">{message}</p>
            {/if}
        </div>

        <div class="flex flex-col items-center">
            {#if waiting}
                <Button text={"Cambiar contraseña"} type={"btn-primary loading loading-spinner"} props={"w-[300px] max-w-0 min-w-0 h-10 mt-4"}/>
            {:else}
                <Button text={"Cambiar contraseña"} type={"btn-primary"} props={"w-full h-10 mt-4"} click={changePassword}/>
            {/if}
        </div>
    </div>
</div>