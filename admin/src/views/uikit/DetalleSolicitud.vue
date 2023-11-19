<template>
    <div>
      <h1>Registrar detalle de solicitud</h1>
      <form @submit.prevent="submitForm" class="grid">
        <div class="col-6 md:6">
          <div class="card p-fluid">

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
            
            <div class="field col-9 md-6">
              <label for="id_solicitud">ID Solicitud:</label>
              <Dropdown
              id="id_solicitud"
                v-model="formData.id_solicitud"
                :options="id_solicitudOptions"
                showClear
                placeholder="Identificador de la solicitud"
                required
              />
            </div>

            <div class="field col-9 md-6">
              <label for="descripcion">Descripcion:</label>
              <InputText id="descripcion" type="Text" v-model="formData.descripcion" placeholder="Descripcion del detalle" required />
              
            </div>

            <div class="field col-9 md-6">
              <label for="costo">Costo:</label>
              <InputText id="costo" type="number" v-model="formData.costo" placeholder="Costo de la solicitud" required />
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



<script>
import axios from 'axios';

export default {
  data() {
    return {
      formData: {
        folio_solicitud: null,
        id_solicitud: null,
        descripcion: "",
        costo: 0
      },
      folio_solicitudOptions: [],
      id_solicitudOptions: [], // Asegúrate de tener datos para esta opción
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

            this.id_solicitudOptions = response.data.map(item => item.id_solicitud);
          })
          .catch(error => {
            console.error('Error al obtener los datos de la API', error);
          });
      }
    },

    submitForm() {
      console.log('Submit button clicked');
      if (this.validateFields()) {
        const url = `https://api-constructora.onrender.com/detalle_solicitud/create/?folio_solicitud=${this.formData.folio_solicitud}&jsonwebtoken=${this.authToken}`;

        axios.post(url, {
          id_solicitud: this.formData.id_solicitud,
          descripcion: this.formData.descripcion,
          costo: this.formData.costo
        })
          .then(response => {
            if (response.status === 200) {
              this.showSuccessToast('¡Detalle de solicitud registrado exitosamente!');
              this.limpiarCamposEntrada();
            }
          })
          .catch(error => {
            console.error('Error al registrar detalle de solicitud', error);
            this.showApiErrorToast(error);
          });
      }
    },

    validateFields() {
      if (
        this.formData.folio_solicitud !== null &&
        this.formData.id_solicitud !== null &&
        this.formData.descripcion.trim() !== "" &&
        this.formData.costo >= 0
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
          errorMessage = 'Error de validacion';
        } else {
          // Puedes agregar más casos según los códigos de estado que desees manejar
          errorMessage = `Ya existe la solicitud`;
        }
      }

      this.$refs.toast.add({
        severity: 'error',
        summary: 'Error',
        detail: errorMessage,
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
      // Implementar la lógica para limpiar campos después de un registro exitoso
      this.formData.costo = '';
      this.formData.descripcion= '';
      this.formData.folio_solicitud = null;
      this.formData.id_solicitud = null;
    },
  }
}
</script>