<script setup>
// example components
import DefaultInfoCard from "../../../../examples/cards/infoCards/DefaultInfoCard.vue";
import CenteredBlogCard from "../../../../examples/cards/blogCards/CenteredBlogCard.vue";
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
              title="Servicios de ingeniería"
              description="Tales como estudio topográfico y de suelos, diseño estructural e ingeniería hidráulica."
            />
            <DefaultInfoCard
              color="info"
              icon="payments"
              title="Servicios Ambientales"
              description="Es importante considerar el aspecto natural, paa ello tenemos evaluaciones de impacto ambiental, gestión de residuos, construcción sostenible y certificaciones verdes."
            />
          </div>
          <div class="row justify-content-start mt-4">
            <DefaultInfoCard
              color="info"
              icon="apps"
              title=" Servicios de arquitectura"
              description="Los mejores diseños y servivios como diseño arquitectónico, planificación urbanista, diseño de interiores y paisajístico"
            />
            <DefaultInfoCard
              color="info"
              icon="3p"
              title="Servicios de consultoría y gestión"
              description="Puedes encontrar gestión de proyectos, consultoría técnica y estudios de viabilidad e impacto"
            />
          </div>
        </div>
        <div class="col-lg-4 ms-auto mt-lg-0 mt-6">
          <CenteredBlogCard
            image="https://img.freepik.com/foto-gratis/ingeniero-civil-trabajador-construccion-arquitectos-que-usan-cascos-chalecos-seguridad-estan-trabajando-juntos-sitio-construccion-construyendo-casa-concepto-trabajo-equipo-cooperacion_640221-172.jpg?w=900&t=st=1698564792~exp=1698565392~hmac=292b498f3ece70b7cf1e4382f31eb6ecb92bf35bd786e0fa0ff28d7bf8ffa739"
            title="Servicios"
            description="Estos son algunos de los servicios que podemos ofrecerte."/>
        </div>
      </div>
    </div>
  </section>
</template>
