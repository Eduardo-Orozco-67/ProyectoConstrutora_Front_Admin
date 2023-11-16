<script setup>
import RotatingCard from "../../../examples/cards/rotatingCards/RotatingCard.vue";
import RotatingCardFront from "../../../examples/cards/rotatingCards/RotatingCardFront.vue";
import RotatingCardBack from "../../../examples/cards/rotatingCards/RotatingCardBack.vue";
import DefaultInfoCard from "../../../examples/cards/infoCards/DefaultInfoCard.vue";
</script>
<template>
  <section class="my-5 py-5">
    <div class="container">
      <div class="row align-items-center">
        <div class="col-lg-4 ms-auto me-auto p-lg-4 mt-lg-0 mt-4">
          <RotatingCard>
            <RotatingCardFront
              image="https://img.freepik.com/foto-gratis/ingeniero-civil-gerente-trabajadores-construccion-tableta-digital-planos-hablando-planeando-sobre-sitio-construccion-concepto-trabajo-equipo-cooperacion_640221-156.jpg?w=900&t=st=1698569438~exp=1698570038~hmac=d0cd178c3310c0329422772814779c640f1e2b183a208c5074b71ec53f1f4461"
              icon="touch_app"
              title="Contamos con <br /> los mejores servicios"
              description="Todos los servicios son pensados en la comodidad de selección."
            />

            <RotatingCardBack
              image="https://img.freepik.com/foto-gratis/trabajador-construccion-e-ingeniero-trabajando-juntos-sitio-construccion_640221-165.jpg?w=900&t=st=1698569506~exp=1698570106~hmac=79f4d2525443ca72bbb0ba052390a1e8662d4fad9fda38ce8846c2806b50a42e"
              title="Las mejor oportunidad"
              description="Estas son algunas de las ventajas que tenemos como empresa."
            />
          </RotatingCard>
        </div>
        <div class="col-lg-6 ms-auto">
          <div class="row justify-content-start">
            <DefaultInfoCard
              icon="content_copy"
              title="Colaboración"
              description="La comunicación con nuestro cliente es una parte fundamental de nuestra planeación."
            />
            <DefaultInfoCard
              icon="flip_to_front"
              title="Especialistas"
              description="El mejor personal para atender tus solicitudes y dar soporte en lo que necesites."
            />
          </div>
          <div class="row justify-content-start mt-5">
            <DefaultInfoCard
              class="mt-3"
              icon="price_change"
              title="Los mejores precios"
              description="Tenemos precios accesibles para todo tipo de cliente."
            />
            <DefaultInfoCard
              class="mt-3"
              icon="devices"
              title="Accesibilidad"
              description="No puedes encontrar a traves de cualquier medio de comunicación."
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
