<script>
	import Button from "$lib/components/utils/Button.svelte";
import Input from "$lib/components/utils/Input.svelte";
	import Link from "$lib/components/utils/Link.svelte";
import Svg from "$lib/components/utils/SVG.svelte";
</script>

<main class="w-[400px] h-[415px]">
    <!-- Logo -->
    <div class="flex flex-col justify-center items-center">
        <Svg name={"cuchos-logo"} size={200}/>
        <p class="text-neutral-grey text-[12px]">Acceso a gestion de Cucho's Market</p>
    </div>
    <!-- Inputs and login -->
    <div class="mt-4">
        <div class="flex flex-col gap-2">
            <Input label={"Email"} mandatory={false} props={"h-10"}/>
            <Input label={"Contraseña"} type={"password"} mandatory={false} props={"h-10"}/>
        </div>  
        <Button text={"Entrar"} type={"w-full min-h-0 h-10 mt-10 btn-primary text-[16px]"}/>
    </div>
    <!-- Links -->
    <div class="flex flex-col items-center mt-4 gap-2 text-xs">
        <Link text={"¿Olvidaste la contraseña?"} type={"link-black font-semibold"}/>
        <p class="text-neutral-grey text-xs">@ 2023 Cucho's Market</p>
    </div>
</main>