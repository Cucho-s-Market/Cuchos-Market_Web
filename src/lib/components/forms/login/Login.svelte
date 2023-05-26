<script>
	import Button from '$lib/components/utils/Button.svelte';
	import Input from '$lib/components/utils/Input.svelte';
	import Link from '$lib/components/utils/Link.svelte';
	import Svg from '$lib/components/utils/SVG.svelte';
</script>

<div class="w-full">
    <!-- Info login and google -->
    <div class="flex flex-col items-center gap-10 border-b border-b-neutral-grey pb-12">
        <h1 class="font-semibold text-[32px]">Iniciar sesion</h1>
        <div class="flex items-center justify-center gap-2 font-medium border border-neutral-grey w-[160px] h-[32px] rounded-[6px] cursor-pointer">
            <Svg name={"google-icon"} size={20}/>
            <p>Google</p>
        </div>
    </div>
    <!-- Login info and register -->
    <div class="px-4">
        <div class="flex flex-col gap-4">
            <Input label={"Email"} props={"h-10"} mandatory={false}/>
            <Input label={"Contraseña"} props={"h-10"} type={"password"} mandatory={false}/>
        </div>
        <div class="flex w-full justify-end mt-2">
            <Link text={"¿Olvidaste la contraseña?"} type={"text-black"}/>
        </div>
        <div class="flex flex-col items-center">
            <Button text={"Entrar"} type={"w-full btn-primary min-h-0 h-10 text-medium mt-8 mb-4"}/>
            <p><span class="text-neutral-grey">¿No tienes una cuenta? </span><Link text={"Crear cuenta"} type={"text-black font-semibold cursor-pointer"}/></p>
        </div>
        
    </div>
</div>

