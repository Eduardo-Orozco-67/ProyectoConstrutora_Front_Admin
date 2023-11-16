<script setup>
import { ref, onMounted } from 'vue';
import { ElMessage } from 'element-plus';
import DefaultNavbar from "@/examples/navbars/NavbarDefault.vue";
import DefaultFooter from "@/examples/footers/FooterDefault.vue";
import MaterialButton from "@/components/MaterialButton.vue";
import setMaterialInput from "@/assets/js/material-input";
import '@/assets/css/style-prop.css';
import image from "@/assets/img/illustrations/registrousuario.jpg";
import axios from 'axios';

const firstName = ref('');
const lastName = ref('');
const email = ref('');
const password = ref('');
const errorToast = ref('');

onMounted(() => {
  setMaterialInput();
});

const updateRef = (refName, event) => {
  const value = event.target.value.trim(); 
  if (refName === 'firstName') {
    firstName.value = value;
  } else if (refName === 'lastName') {
    lastName.value = value;
  } else if (refName === 'email') {
    email.value = value;
  } else if (refName === 'password') {
    password.value = value;
  }
};


const validateFields = () => {
  // Verifica si alguno de los campos está vacío o solo contiene espacios en blanco
  if (!firstName.value.trim() || !lastName.value.trim() || !email.value.trim() || !password.value.trim()) {
    ElMessage({
      showClose: true,
      message: 'Todos los campos son obligatorios y no pueden estar vacíos.',
      type: 'error',
    });
    return false; // Retorna falso si alguno de los campos no pasa la validación
  }
  return true; // Retorna verdadero si todos los campos pasan la validación
};

const registerClient = async () => {
  if (!validateFields()) {
    return; // Detiene la ejecución si la validación falla
  }
  
  const clientData = {
    nombre: firstName.value,
    apellido: lastName.value,
    email: email.value,
    password: password.value,
  };

  try {
    const response = await axios.post('http://localhost:8000/usuarios/clientes/', clientData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    // Muestra un mensaje de éxito
    ElMessage({
      showClose: true,
      message: 'Registro exitoso.',
      type: 'success',
    });
    // Restablece los campos después de un registro exitoso
    firstName.value = '';
    lastName.value = '';
    email.value = '';
    password.value = '';
  } catch (error) {
    // Si hay un error en la respuesta y el estado es 500, asumimos que es un email duplicado
    if (error.response && error.response.status === 500) {
      ElMessage({
        showClose: true,
        message: 'Este email ya ha sido registrado',
        type: 'error',
      });
    } else {
      // Maneja otros errores no relacionados con el email duplicado
      const message = error.response
        ? `Error ${error.response.status}: ${error.response.statusText}`
        : 'Ha ocurrido un error inesperado.';
      ElMessage({
        showClose: true,
        message: message,
        type: 'error',
      });
    }
  }
};
</script>

<template>
  <ElMessage
    v-if="errorToast"
    type="error"
    :message="errorToast"
    showClose
  />
  
  <div class="container position-sticky z-index-sticky top-0">
    <DefaultNavbar
      :sticky="true"
      :action="{
        route: 'https://www.creative-tim.com/product/vue-material-kit-pro',
        label: 'Buy Now',
      }"
    />
  </div>
  
  <section>
    <div class="page-header min-vh-100">
      <div class="container">
        <div
          class="col-6 d-lg-flex d-none h-100 my-auto pe-0 position-absolute top-0 start-0 text-center justify-content-center flex-column">
          <div
            class="position-relative h-100 m-3 px-7 border-radius-lg d-flex flex-column justify-content-center"
            :style="{
              backgroundImage: `url(${image})`,
              backgroundSize: 'cover',
            }"
            loading="lazy"
          ></div>
        </div>
        <div class="col-xl-5 col-lg-6 col-md-7 d-flex flex-column ms-auto me-auto ms-lg-auto me-lg-5">
          <div class="card d-flex blur justify-content-center shadow-lg my-sm-0 my-sm-6 mt-8 mb-5">
            <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2 bg-transparent">
              <div class="bg-gradient-success shadow-success border-radius-lg p-3">
                <h3 class="text-white text-success mb-0">Crear Cuenta</h3>
              </div>
            </div>
            <div class="card-body">
              <p class="pb-3">Bienvenido a La roca bonita, tenemos las mejores opciones para ti. ¡Regístrate ahora!</p>
              
              <form @submit.prevent="registerClient" class="form-material">
                <div class="row">
                  <div class="col-md-6 form-group">
                    <input v-model="firstName" @input="updateRef('firstName', $event)" placeholder=" " type="text" class="form-control"/>
                    <label for="firstName" class="form-label">First Name</label>
                  </div>
                  <div class="col-md-6 form-group">
                    <input v-model="lastName" @input="updateRef('lastName', $event)" placeholder=" " type="text" class="form-control"/>
                    <label for="lastName" class="form-label">Last Name</label>
                  </div>
                </div>
                <div class="form-group">
                  <input v-model="email" @input="updateRef('email', $event)" placeholder=" " type="email" class="form-control"/>
                  <label for="email" class="form-label">Email Address</label>
                </div>
                <div class="form-group">
                  <input v-model="password" @input="updateRef('password', $event)" placeholder=" " type="password" class="form-control"/>
                  <label for="password" class="form-label">Password</label>
                </div>
                <div class="text-center">
                  <MaterialButton variant="gradient" color="success" class="mt-3 mb-0" type="submit">
                    Crear Cuenta
                  </MaterialButton>
                </div>
              </form>

            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  
  <DefaultFooter />
</template>
