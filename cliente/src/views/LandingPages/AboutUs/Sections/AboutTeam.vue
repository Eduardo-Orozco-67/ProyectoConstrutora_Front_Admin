<script setup>
// example component
import HorizontalTeamCard from "@/examples/cards/teamCards/HorizontalTeamCard.vue";

// images
import emma from "@/assets/img/team-5.jpg";
import william from "@/assets/img/bruce-mars.jpg";
import ivana from "@/assets/img/ivana-squares.jpg";
import marquez from "@/assets/img/ivana-square.jpg";
</script>

<template>
  <section class="pb-5 position-relative bg-gradient-dark mx-n3">
    <div class="container">
      <div class="row">
        <div class="col-md-8 text-start mb-5 mt-5">
          <h3 class="text-white z-index-1 position-relative">
            Expertos en construcción
          </h3>
          <p class="text-white opacity-8 mb-0">
            Contamos con el mejor equipo especializado para atender tus proyectos.
          </p>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-6 col-12">
          <HorizontalTeamCard
            class="mt-4"
            :image="emma"
            :profile="{ name: 'Emma Robles', link: 'javascript:;' }"
            :position="{ label: 'Contratista', color: 'warning' }"
            description="Experta en contrataciones con diversos proyectos certificados."
          />
        </div>
        <div class="col-lg-6 col-12">
          <HorizontalTeamCard
            class="mt-lg-4 mt-5"
            :image="william"
            :profile="{ name: 'William Ponce', link: 'javascript:;' }"
            :position="{ label: 'Arquitecto', color: 'warning' }"
            description="Con sus excelentes diseños expouestos en diferentes proyectos."
          />
        </div>
      </div>
      <div class="row mt-4">
        <div class="col-lg-6 col-12">
          <HorizontalTeamCard
            class="mt-4 z-index-2"
            :image="ivana"
            :profile="{ name: 'Ivana Flores', link: 'javascript:;' }"
            :position="{ label: 'Ingeniero civil', color: 'warning' }"
            description="Forma parte de los mejores ingenieros de la ciudad, con proyectos que la respaldan."
          />
        </div>
        <div class="col-lg-6 col-12">
          <HorizontalTeamCard
            class="mt-lg-4 mt-5 z-index-2"
            :image="marquez"
            :profile="{ name: 'Marquez Garcia', link: 'javascript:;' }"
            :position="{ label: 'Ingeniero civil', color: 'warning' }"
            description="Cuenta con experiencia en empresas nacionales que certifican su trabajo."
          />
        </div>
      </div>
    </div>
  </section>
</template>
