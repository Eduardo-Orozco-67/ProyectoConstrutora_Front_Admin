<script>
import axios from 'axios';

export default {
  data() {
    return {
      formData: {
        folio_solicitud: null,
        id_servicio: ''
      },
      folio_solicitudOptions: [],
      authToken: null
    };
  },
  created() {
    this.obtenerToken();
    this.cargarFolio();
  },
  methods: {
    obtenerToken() {
      const credentials = {
        username: 'admin',
        password: 'secretaacces123',
      };

      axios.post('https://api-constructora.onrender.com/token', {
        username: credentials.username,
        password: credentials.password,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(response => {
          this.authToken = response.data.access_token;
          axios.defaults.headers.common['Authorization'] = `Bearer ${this.authToken}`;
          this.cargarFolio();
          this.cargarServicio();
        })
        .catch(error => {
          console.error('Error al obtener el token JWT', error); 
          if (error.response) {
            console.error('Respuesta del servidor:', error.response.data);
          }
        });
    },

    cargarFolio() {
      if (this.authToken) {
        axios.get(`https://api-constructora.onrender.com/solicitud_proyecto/ver-todas?jsonwebtoken=${this.authToken}`)
          .then(response => {
            this.folio_solicitudOptions = response.data.map(item => item.folio_solicitud);

          })
          .catch(error => {
            console.error('Error al obtener los datos de la API', error);
          });
      }
    },

    submitForm() {
      console.log('Submit button clicked');
      if (this.validateFields()) {
        const url = `https://api-constructora.onrender.com/servicio_detalle_solicitud/create/?id_servicio=${this.formData.id_servicio}&folio_solicitud=${this.formData.folio_solicitud}&jsonwebtoken=${this.authToken}`;

        axios.post(url)
          .then(response => {
            if (response.status === 200) {
              this.showSuccessToast('¡Servicio anexado exitosamente!');
              this.limpiarCamposEntrada();
            }
          })
          .catch(error => {
            console.error('Error al anexar servicio a la solicitud', error);
            this.showApiErrorToast(error);
          });
      }
    },

    validateFields() {
      if (
        this.formData.folio_solicitud !== null &&
        this.formData.id_servicio !== "" 
      ) {
        return true; // Todos los campos están llenos
      } else {
        this.showValidationError("Por favor, complete todos los campos correctamente.");
        return false;
      }
    },

    // Funciones adicionales de manejo de Toast y limpieza de campos
    showSuccessToast(message) {
      // Implementar la lógica del Toast para el éxito
      this.$refs.toast.add({
        severity: 'success',
        summary: 'Éxito',
        detail: message,
        life: 3000,
      });
    },

    showApiErrorToast(error) {
      // Implementar la lógica del Toast para errores de la API
      if (error.response) {
        const statusCode = error.response.status;

        if (statusCode === 422) {
          error = 'Error de validacion';
        } else {
          // Puedes agregar más casos según los códigos de estado que desees manejar
          error = `Ya se ha agregado dicho servicio`;
        }
      }

      this.$refs.toast.add({
        severity: 'error',
        summary: 'Error',
        detail: error,
        life: 5000, // Duración en milisegundos
      });
    },

    showValidationError(message) {
      // Implementar la lógica del Toast para errores de validación
      this.$refs.toast.add({
        severity: 'error',
        summary: 'Error de validación',
        detail: message,
        life: 5000, // Duración en milisegundos
      });
    },

    limpiarCamposEntrada() {
      //Lógica para limpiar campos después de un registro exitoso
      this.formData.folio_solicitud = null;
      this.formData.id_servicio = '';
    },
  }
}
</script>



<template>
    <div>
      <h1>Anexar servicio a una solicitud</h1>
      <form @submit.prevent="submitForm" class="grid">
        <div class="col-6 md:6">
          <div class="card p-fluid">
             
            <div class="field col-9 md-6">
              <label for="id_servicio">ID de Servicio</label>
                <InputText id="id_servicio" type="text" v-model="formData.id_servicio" placeholder="Identificador de servicio" required />
            </div>

            <div class="field col-9 md-6">
            <label for="folio_solicitud">Folio de solicitud:</label>
            <Dropdown
              id="folio_solicitud"
                v-model="formData.folio_solicitud"
                :options="folio_solicitudOptions"
                showClear
                placeholder="Folio de la solicitud"
                required
              />
            </div>

            <div class="field col-4 md-3">
              <Button label="Registrar" class="p-button-success mr-2 mb-2" type="submit"  />
            </div>
          </div>
        </div>
  
      </form>

      <Toast ref="toast" />

    </div>
  </template>


