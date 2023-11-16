<script setup>
import DefaultReviewCard from "@/examples/cards/reviewCards/DefaultReviewCard.vue";
</script>
<template>
  <section class="py-7">
    <div class="container">
      <div class="row">
        <div class="col-lg-6 mx-auto text-center">
          <h2 class="mb-0">La roca bonita</h2>
          <h2 class="text-gradient text-warning mb-3">
            320 colaboradores
          </h2>
          <p class="lead">
            Contamos con personal calificado capaz de hacer realidad
            cualquier proyecto.
          </p>
        </div>
      </div>
      <div class="row mt-6">
        <DefaultReviewCard
          name="Martín Gomez"
          date="3 días"
          review='"Estoy particularmente agradecido por cómo se anticiparon y atendieron nuestras necesidades específicas, 
          asegurando que el resultado final no solo cumpliera, sino que superara nuestras expectativas. La Roca Bonita 
          ahora es mi primera recomendación para cualquier proyecto de construcción."'
          :rating="5.0"
        />
        <DefaultReviewCard
          class="ms-md-auto"
          color="bg-gradient-warning"
          name="Mariana Salazar"
          date="Una semana"
          review='"Su atención al detalle y el compromiso con la calidad superaron todas mis expectativas. El proyecto se entregó a tiempo, 
          y el equipo estuvo siempre disponible para responder a mis preguntas.¡Definitivamente recomendaría a La Roca Bonita 
          a cualquiera que busque confiabilidad y excelencia en la construcción!""'
          :rating="5.0"
        />

        <DefaultReviewCard
          name="Gonzalo Medina"
          date="Tres semanas"
          review='"Estoy profundamente impresionado por la profesionalidad y la habilidad del equipo. 
          Han transformado nuestra visión en realidad con una ejecución impecable y un servicio al cliente que realmente se preocupa. 
          El respeto por el medio ambiente y la seguridad durante todo el proyecto ha sido admirable. ¡Gracias, La Roca Bonita, 
          por hacer de la construcción de nuestro hogar una experiencia tan positiva!"'
          :rating="5.0"
        />
      </div>
      <hr class="horizontal dark my-5" />
      <div class="row">
        <div class="col-lg-2 col-md-4 col-6 ms-auto">
          <img
            class="w-100 opacity-6"
            src="@/assets/img/logos/logos-const/logo-caterpillar.png"
            alt="Logo"
          />
        </div>
        <div class="col-lg-2 col-md-4 col-6">
          <img
            class="w-100 opacity-6"
            src="@/assets/img/logos/logos-const/ceramat.png"
            alt="Logo"
          />
        </div>
        <div class="col-lg-2 col-md-4 col-6">
          <img
            class="w-100 opacity-6"
            src="@/assets/img/logos/logos-const/truper-logo.png"
            alt="Logo"
          />
        </div>
        <div class="col-lg-2 col-md-4 col-6 ms-lg-0 ms-md-auto">
          <img
            class="w-100 opacity-6"
            src="@/assets/img/logos/logos-const/logo-cruzazul3.png"
            alt="Logo"
          />
        </div>
        <div class="col-lg-2 col-md-4 col-6 me-md-auto mx-md-0 mx-auto">
          <img
            class="w-100 opacity-6"
            src="@/assets/img/logos/logos-const/cemex3.png"
            alt="Logo"
          />
        </div>
      </div>
    </div>
  </section>
</template>
