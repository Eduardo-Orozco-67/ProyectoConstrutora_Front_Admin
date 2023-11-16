<script setup>
// example components
import DefaultInfoCard from "@/examples/cards/infoCards/DefaultInfoCard.vue";
import CenteredBlogCard from "@/examples/cards/blogCards/CenteredBlogCard.vue";
</script>
<template>
  <section class="py-7">
    <div class="container">
      <div class="row align-items-center">
        <div class="col-lg-6">
          <div class="row justify-content-start">
            <DefaultInfoCard
              color="info"
              icon="public"
              title="Registro de empresa"
              description="Es posible registrar la empresa titular del proyecto."
            />
            <DefaultInfoCard
              color="info"
              icon="payments"
              title="Registro de solicitud"
              description="Sin salir de casa puedes realizar el registro de tu solicitud."
            />
          </div>
          <div class="row justify-content-start mt-4">
            <DefaultInfoCard
              color="info"
              icon="apps"
              title=" Servicios"
              description="Dentro de la solicitud puede especificar los servicios que desea incluir."
            />
            <DefaultInfoCard
              color="info"
              icon="3p"
              title="Estado de la solicitud"
              description="Posteriormente podrá saber el estado final de su solicitud."
            />
          </div>
        </div>
        <div class="col-lg-4 ms-auto mt-lg-0 mt-6">
          <CenteredBlogCard
            image="https://img.freepik.com/foto-gratis/crop-architect-opening-blueprint_23-2147710985.jpg?w=900&t=st=1699857754~exp=1699858354~hmac=5f42c6ef1e09cd9cd31cef52e56f62a718ce99a1c8e4ba2133bde29004a33f40"
            title="Registros"
            description="En esta sección puedes registrat tu empresa y realizar una solicitud de proyecto."/>
        </div>
      </div>
    </div>
  </section>
</template>
