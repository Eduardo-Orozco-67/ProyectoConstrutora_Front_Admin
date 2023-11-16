<script setup>
//Vue Material Kit 2 components
import MaterialButton from "@/components/MaterialButton.vue";
import DefaultNavbar from "@/examples/navbars/NavbarDefault.vue";
import DefaultFooter from "@/examples/footers/FooterDefault.vue";
import Information from "./InicioView.vue";
import GuardarEmpresa from "./GuardarEmpresa.vue";
import SolicitudProyecto from "./SolicitudProyecto.vue";

// nav-pill
import setNavPills from "@/assets/js/nav-pills.js";
import { onMounted } from 'vue';


onMounted(() => {
  setNavPills();
});
</script>

<template>
  <DefaultNavbar transparent />
  <header>
    <div class="page-header min-vh-100"
      :style="{
        backgroundImage: 'url(https://img.freepik.com/foto-gratis/imagen-objetos-ingenieria-punto-vista-top-construction-trabajo-herramientas-ingenieria-vintage-efecto-filtro-retro-tono-enfoque-suave-enfoque-selectivo_1418-474.jpg?w=900&t=st=1699765055~exp=1699765655~hmac=fd68bb1d3d2d2395e3ff78cec9cd144e21d2c166fd3eb1988b92254cfdd875f8)',
      }"
      loading="lazy">
      <span class="mask bg-gradient-dark opacity-5"></span>
      <div class="container">
        <div class="row">
          <div class="col-lg-6 col-md-7 d-flex justify-content-center flex-column">
            <h1 class="text-white mb-4">La roca Bonita</h1>
            <p class="text-white opacity-8 lead pe-5 me-5">
              Contamos con este apartado para nuestros usuarios donde pueden realizar sus solicitudes de proyectos 
              para que sean valoradas por el equipo.
            </p>
          </div>
        </div>
      </div>
    </div>
  </header>

  <div class="card card-body shadow-xl mx-3 mx-md-4 mt-n6">
    <section class="py-7">
      <div class="container">
        <div class="row">
          <div class="col-lg-12 mx-auto">
            <div class="nav-wrapper position-relative end-0">
              <ul class="nav nav-pills nav-fill p-1" role="tablist">
                <li class="nav-item">
                  <a class="nav-link mb-0 px-0 py-1 active" data-bs-toggle="tab" href="#inicio-tabs-simple" role="tab" aria-controls="inicio" aria-selected="true">
                    Inicio
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link mb-0 px-0 py-1" data-bs-toggle="tab" href="#register-company-tabs-simple" role="tab" aria-controls="register-company" aria-selected="false">
                    Registrar empresa
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link mb-0 px-0 py-1" data-bs-toggle="tab" href="#dashboard-tabs-simple" role="tab" aria-controls="dashboard" aria-selected="false">
                    Realizar solicitud
                  </a>
                </li>
              </ul>
            </div>

            <div class="tab-content">
              <div class="tab-pane fade show active" id="inicio-tabs-simple" role="tabpanel" aria-labelledby="inicio-tab">
                <Information />
              </div>

              <div class="tab-pane fade" id="register-company-tabs-simple" role="tabpanel" aria-labelledby="register-company-tab">
                <GuardarEmpresa/>
              </div>

              <div class="tab-pane fade" id="dashboard-tabs-simple" role="tabpanel" aria-labelledby="dashboard-tab">
                  <SolicitudProyecto/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>

  <DefaultFooter />
</template>
