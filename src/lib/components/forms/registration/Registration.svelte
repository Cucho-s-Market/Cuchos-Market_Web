<script>

	import Button from "$lib/components/utils/Button.svelte";
	import Link from "$lib/components/utils/Link.svelte";
	import Input from "$lib/components/utils/Input.svelte";
	import Breadcrumbs from "$lib/components/utils/Breadcrumbs.svelte";
	import CatalogoHeader from "$lib/components/catalogo/CatalogoHeader.svelte";
	import CatalogoSidebar from "$lib/components/catalogo/CatalogoSidebar.svelte";

</script>
<CatalogoSidebar/>
<Breadcrumbs/>
<div class="container mx flex items-stretch flex-wrap bg-light-grey h-auto">
    <div class="self-auto sm:self-start md:self-end lg:self-center xl:self-stretch w-2/3 p-4">
      <div>
        <img src="" alt="logo Cucho's">
      </div>
      <div class="flex content-center flex-wrap">
        <p class="font-bold w-full text-xl">Bienvenidos a Cucho's Market!</p>
        <p class="w-full">Crea una cuenta o <Link text="inicia sesión" href="./"/></p>
        <br>
        <div class="grid grid-cols-4 gap-4">
  
          <div class="m-2 col-span-2">
            <label for="name" class="label">
              <span class="label-text">Nombre </span>
            </label>
            <Input/>
          </div>
  
          <div class="m-2 col-span-2">
            <label for="lastName" class="label">
              <span class="label-text">Apellido </span>
            </label>
            <Input/>
          </div>
  
          <div class="form-control col-span-4 max-w-xs m-2">
            <label class="label" for="email">
              <span class="label-text">Email</span>
            </label>
            <Input/>
          </div>
          <div class="form-control col-span-4 max-w-xs m-2">
            <label class="label" for="password">
              <span class="label-text">Contraseña</span>
            </label>
            <Input/>
            </div>
            <div class="form-control col-span-4 max-w-xs m-2">
                <label class="label" for="passwordR">
                <span class="label-text">Repetir contraseña</span>
                </label>
                <Input/>
            </div>
            <div class="form-control col-span-4 max-w-xs m-2">
                <label class="label" for="phone">
                <span class="label-text">Celular</span>
                <span class="label-text-alt">(Recomendado)</span>
                </label>
                <Input value={"hola"}/>
            </div>
            <div class="py-8">
              <p>Al hacer clic en "Crear cuenta", estarás creando una cuenta en <br>Cucho´s Market y aceptando sus <Link text="politicas de privacidad"/> y <Link text="términos de uso"/></p>
            </div>
            <Button>Crear cuenta</Button>
        </div>
      </div>
    </div>
    <div class="object- sm:object-cover md:object-fill lg:object-none xl:object-scale-down w-1/3 pt-16">
      <img src="../../../../assets/supermarketRegistration.jpg" alt="super">
    </div>
  </div>