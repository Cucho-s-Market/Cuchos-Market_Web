<script>

	import Button from "$lib/components/utils/Button.svelte";
	import Link from "$lib/components/utils/Link.svelte";
	import Input from "$lib/components/utils/Input.svelte";

</script>
<!-- div father  container mx flex items-stretch flex-wrap bg-light-grey h-auto -->
<div class="w-[1920px] h-[1080px] bg-primary-content">
  
  <!--rectangle div1 bro-->
  <div class="bg-primary w-[29px] h-[1030px] left-0 top-0 absolute"></div>
  <!--end rectangle-->

  <!--div2 bro-->
  <div class="absolute w-[1231px] h-[1030px] left-[29px] top-0 right-[660px] bottom-[50px]">
    <!--logo-->
    <div class="absolute w-[111px] h-[29px] top-[35px] left-[83px]">
      <img src="" alt="logo Cucho's">
    </div>
    
    <!--form
    self-auto sm:self-start md:self-end lg:self-center xl:self-stretch w-2/3 p-4
    -->
    <div class="absolute w-[413px] h-[800px] top-[158px] bottom-[190px] left-[300px] right-[1121px]">

      <div class="h-[48px] w-[400px]">
        <p class="top-0 absolute text-[#000000] not-italic font-semibold text-[24px] leading-[18px]">Bienvenidos a Cucho's Market!</p>
        <p class="top-[29px] t absolute text-[#000000] not-italic font-normal text-[14px] leading-[18px]">Crea una cuenta o <Link text="inicia sesión" href="./"/></p>
      </div>

      <div class="absolute top-[116px] w-[400px] h-[70px] ">
        <div class="absolute w-[180px] top-0 left-0">
          <Input label="Nombre"/>
        </div>
        <div class="absolute w-[180px] top-0 right-0">
          <Input label="Apellido"/>
        </div>
      </div>

        <div class="absolute w-[400px] top-[215px]">
          <Input type="email" label="Email" />
        </div>
        <div class="absolute w-[400px] top-[323px]">
          <Input type="password" label="Contraseña"/>
        </div>
        <div class="absolute w-[400px] top-[422px]">
            <Input type="password" label="Repetir contraseña"/>
        </div>
        <div class="absolute w-[400px] top-[521px]">
            <Input type="tel" label="Celular"/>
        </div>
        <div class="absolute w-[400px] top-[635px]">
          <p>Al hacer clic en "Crear cuenta", estarás creando una cuenta en <br>Cucho´s Market y aceptando sus <Link text="politicas de privacidad"/> y <Link text="términos de uso"/></p>
        </div>
        <div class="flex flex-row absolute w-[400px] h-[36px] top-[736px]">
            <Button text="Crear cuenta"/>
        </div>
        <!--end form-->
    </div>
        <!--end div2-->
  </div>
  <!--div3 bro img-->
  <div class="h-[1030px] w-[1000px] left-[920px] top-0 bg-grey absolute p-0" style="background-size: cover; background-image: url(https://images.unsplash.com/photo-1604719312566-8912e9227c6a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80);">
    <img src="$lib/../assets/supermarketRegistration.jpg" alt="super">
  </div>

  <!--footer-->
  <div class="w-[1920px] h-[50px] top-[1030px] left-0 right-0 bottom-0 bg-neutral absolute">
    <div class="w-[349.33px] h-[33px] top-[9px] left-[785.33px] right-[785.33px] ">
      <p class="text-[#FFFFFF] font-normal text-[16px] leading-[33.35px] text-center p-">@ 2023 Cucho´s Market</p>
    </div>
  </div>
</div>
  <!--object- sm:object-cover md:object-fill lg:object-none xl:object-scale-down pt-16 -->