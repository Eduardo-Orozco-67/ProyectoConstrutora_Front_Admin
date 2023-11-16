<script>
import { ref, onMounted } from 'vue';
import MaterialInput from "@/components/MaterialInput.vue";
import MaterialButton from "@/components/MaterialButton.vue";
import { ElMessage } from 'element-plus';
import '@/assets/css/style-prop.css';

import axios from 'axios';

onMounted(() => {
  setMaterialInput();
});

export default {
  components: {
    MaterialInput,
    MaterialButton
  },
  data() {
    return {
      formData: {
        nombre: '',
        direccion: '',
        telefono: '',
        correo: '',
      },
      authToken: null,
    };
  },
  created() {
    this.obtenerToken();
  },
  methods: {
    obtenerToken() {
    const credentials = {
      username: 'admin',  // Cambiar con las credenciales reales
      password: 'secretaacces123',  // Cambiar con las credenciales reales
    };

    // Haciendo la petición POST con las credenciales en el cuerpo de la solicitud
    axios.post('http://localhost:8000/token', credentials, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(response => {
      this.authToken = response.data.access_token;
      // Configurar el token JWT como predeterminado en todas las solicitudes de axios
      axios.defaults.headers.common['Authorization'] = `Bearer ${this.authToken}`;
    })
    .catch(error => {
      console.error('Error al obtener el token JWT', error);
      // Manejo de errores si la respuesta contiene información
      if (error.response) {
        console.error('Respuesta del servidor:', error.response.data);
      } else if (error.request) {
        console.error('No se recibió respuesta:', error.request);
      } else {
        console.error('Error al configurar la petición:', error.message);
      }
      this.showErrorMessage('Error al obtener el token JWT');
    });
  },
    submitForm() {
      if (this.validateFields()) {
        axios.post(`http://localhost:8000/empresa/create?jsonwebtoken=${this.authToken}`, this.formData)
          .then(response => {
            if (response.status === 200) {
              this.showSuccessMessage('¡Empresa creada exitosamente!');
              this.limpiarCamposEntrada();
            }
          })
          .catch(error => {
            this.showApiErrorMessage(error);
          });
      }
    },
    validateFields() {
      if (this.formData.nombre && this.formData.direccion && this.formData.telefono && this.formData.correo) {
        return true;
      } else {
        this.showErrorMessage("Por favor, complete todos los campos.");
        return false;
      }
    },
    showSuccessMessage(message) {
      ElMessage({
        showClose: true,
        message: message,
        type: 'success',
      });
    },
    showErrorMessage(message) {
      ElMessage({
        showClose: true,
        message: message,
        type: 'error',
      });
    },
    showApiErrorMessage(error) {
      let errorMessage = 'Error al procesar la solicitud';
      if (error.response) {
        const statusCode = error.response.status;
        errorMessage = statusCode === 400
          ? 'La empresa con ese nombre ya existe'
          : `Error: ${error.response.data}`;
      }
      ElMessage({
        showClose: true,
        message: errorMessage,
        type: 'error',
      });
    },
    limpiarCamposEntrada() {
      this.formData.nombre = '';
      this.formData.direccion = '';
      this.formData.telefono = '';
      this.formData.correo = '';
    },
  },
};
</script>

<template>
  <div class="form-container">
    <form @submit.prevent="submitForm" class="form-material">
      <div class="card-container">
        <div class="card p-fluid">

          <div class="row">
            <div class="col-md-6 form-group">
              <input id="nombre" type="text" placeholder=" " class="form-control" v-model="formData.nombre" required />
              <label for="nombre" class="form-label">Nombre de la empresa</label>
            </div>
            
            <div class="col-md-6 form-group">
              <input id="direccion" type="text" placeholder=" " class="form-control" v-model="formData.direccion" required />
              <label for="direccion" class="form-label">Dirección</label>
            </div>
          </div>

          <div class="row">
            <div class="col-md-6 form-group">
              <input id="telefono" type="tel" placeholder=" " class="form-control" v-model="formData.telefono" required />
              <label for="telefono" class="form-label">Teléfono</label>
            </div>
            <div class="col-md-6 form-group">
              <input id="correo" type="email" placeholder=" " class="form-control" v-model="formData.correo" required />
              <label for="correo" class="form-label">Correo electrónico</label>
            </div>
          </div>

          <div class="text-center">
            <material-button type="submit" variant="gradient" color="success" class="mt-3 mb-0">Registrar</material-button>
          </div>
          
        </div>
      </div>      
    </form>
    
  </div>
</template>

