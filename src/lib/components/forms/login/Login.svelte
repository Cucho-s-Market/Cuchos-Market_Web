<script>
    // @ts-nocheck
	import Button from '$lib/components/utils/Button.svelte';
	import Input from '$lib/components/utils/Input.svelte';
	import Link from '$lib/components/utils/Link.svelte';
	import Notification from '$lib/components/utils/Notification.svelte';
	import sessionController from '../../../../logic/sessionController';

    let customerDetails = {
        email: '',
        password: '',
    };

    let errorMessage = '';

    const loginCustomer = async () => {
        debugger;
        // Validate all fields are filled
        if (customerDetails.email === '' || customerDetails.password === '') {
            alert('Por favor, llene todos los campos');
            return;
        }

        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(customerDetails.email)) {
            alert('Por favor, ingrese un email válido');
            return;
        }

        // Send data to backend
        const result = await sessionController.login(customerDetails);
        if(result == null || result.error) {errorMessage = result?.message; throw new Error(result?.message);}
        
        // Ask if user is logged in
        if(sessionController.isUserLoggedIn()) window.location.href = '/';
    }

</script>

<div class="w-full">
    <!-- Info login and google -->
    <div class="flex flex-col items-center gap-10 border-b border-b-neutral-grey pb-12">
        <h1 class="font-semibold text-[32px]">Iniciar sesion</h1>
    </div>

    {#if errorMessage != ''}
        <Notification text="{errorMessage}" type={"alert-error"} props={"h-auto w-full"}/>
    {/if}

    <!-- Login info and register -->
    <div class="px-4 mt-8">
        <div class="flex flex-col gap-4">
            <Input bind:value={customerDetails.email} label={"Email"} props={"h-10"} type={"email"} mandatory={false}/>
            <Input bind:value={customerDetails.password} label={"Contraseña"} props={"h-10"} type={"password"} mandatory={false}/>
        </div>
        <div class="flex w-full justify-end mt-2">
            <Link text={"¿Olvidaste la contraseña?"} target={false} href={"/forgot-password"} type={"text-black"}/>
        </div>
        <div class="flex flex-col items-center">
            <Button text={"Entrar"} type={"w-full btn-primary min-h-0 h-10 text-medium mt-8 mb-4"} click={loginCustomer}/>
            <p><span class="text-neutral-grey">¿No tienes una cuenta? </span><Link text={"Crear cuenta"} target={false} type={"text-black font-semibold cursor-pointer"} href={"/registrarse"}/></p>
        </div>
        
        
    </div>
</div>

