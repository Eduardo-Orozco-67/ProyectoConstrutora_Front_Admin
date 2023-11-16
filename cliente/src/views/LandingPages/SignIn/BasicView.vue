<script setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import DefaultNavbar from "@/examples/navbars/NavbarDefault.vue";
import Header from "@/examples/Header.vue";
import MaterialInput from "@/components/MaterialInput.vue";
import setMaterialInput from "@/assets/js/material-input";

const router = useRouter();

const signIn = () => {
  router.push({ name: 'RegistroEmpresa' });
};

onMounted(() => {
  setMaterialInput();
});
</script>

<template>
  <DefaultNavbar transparent />
  <Header>
    <div
      class="page-header align-items-start min-vh-100"
      :style="{
        backgroundImage:
          'url(https://images.unsplash.com/photo-1497294815431-9365093b7331?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWgefHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80)'
      }"
      loading="lazy"
    >
      <span class="mask bg-gradient-dark opacity-6"></span>
      <div class="container my-auto">
        <div class="row">
          <div class="col-lg-4 col-md-8 col-12 mx-auto">
            <div class="card z-index-0 fadeIn3 fadeInBottom">
              <div
                class="card-header p-0 position-relative mt-n4 mx-3 z-index-2"
              >
                <div
                  class="bg-gradient-success shadow-success border-radius-lg py-3 pe-1"
                >
                  <h4
                    class="text-white font-weight-bolder text-center mt-2 mb-0"
                  >
                    Sign in
                  </h4>
                </div>
              </div>
              <div class="card-body">
                <form role="form" class="text-start" @submit.prevent="signIn">
                  <div class="text-center">
                    <button
                      class="btn btn-success my-4 mb-2"
                      type="submit"
                    >
                      Sign in
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Header>
  <footer class="footer position-absolute bottom-2 py-2 w-100">
    <div class="container">
      <div class="row align-items-center justify-content-lg-between">
        <div class="col-12 col-md-6 my-auto">
          <div
            class="copyright text-center text-sm text-white text-lg-start"
          >
            © {{ new Date().getFullYear() }}, hecho por RUBA derechos reservados.
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<!-- 

<script>
import axios from 'axios';
import MaterialInput from "@/components/MaterialInput.vue";
import MaterialButton from "@/components/MaterialButton.vue";
import { ElMessage } from 'element-plus';
import '@/assets/css/style-prop.css';

export default {
  data() {
    return {
      empleado: null,
      authToken: null,
      emailEmpleado: 'correo@empresa.com', // Reemplaza con el correo del empleado que desees consultar
    };
  },
  created() {
    this.obtenerToken();
  },
  methods: {
    obtenerToken() {
      const credentials = {
        username: 'admin',
        password: 'secretaacces123',
      };

      axios.post('http://localhost:8000/token', credentials, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(response => {
        this.authToken = response.data.access_token;
        // Corrige el uso del template string aquí
        axios.defaults.headers.common['Authorization'] = `Bearer ${this.authToken}`;
        this.obtenerEmpleadoPorEmail();
      })
      .catch(error => {
        console.error('Error al obtener el token JWT', error);
        if (error.response) {
          console.error('Respuesta del servidor:', error.response.data);
        }
      });
    },

    obtenerEmpleadoPorEmail() {
      if (this.emailEmpleado && this.authToken) {
        // Corrige el uso del template string aquí también
        axios.get(`http://localhost:8000/empleados/${this.emailEmpleado}`, {
          headers: {
            // Y aquí
            Authorization: `Bearer ${this.authToken}`,
          },
        })
        .then(response => {
          this.empleado = response.data;
          console.log('Empleado encontrado:', this.empleado);
        })
        .catch(error => {
          console.error('Error al obtener el empleado por email', error);
        });
      }
    },
  },
};
</script>

<template>
  <div class="form-container">
    <form @submit.prevent="obtenerToken" class="form-material">
      <div class="card-container">
        <div class="card p-fluid">
          <div class="row">
            <div class="col-md-12 form-group">
              <input id="email" type="email" placeholder=" " class="form-control" v-model="credentials.username" required />
              <label for="email" class="form-label">Email</label>
            </div>
          </div>
          
          <div class="row">
            <div class="col-md-12 form-group">
              <input id="password" type="password" placeholder=" " class="form-control" v-model="credentials.password" required />
              <label for="password" class="form-label">Contraseña</label>
            </div>
          </div>

          <div class="text-center">
            <button type="submit" class="btn btn-primary mt-3 mb-0">SIGN IN</button>
          </div>
        </div>
      </div>      
    </form>
  </div>
</template>

 -->
