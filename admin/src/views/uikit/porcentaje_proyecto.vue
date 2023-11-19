<template>
    <div>
      <h1>Modificar porcentaje y/o estado de avance de un prouecto</h1>
  
      <!-- Contenedor de cuadrícula para los formularios -->
      <div class="grid">
        
        <!-- Formulario para Porcentaje de Avance -->
        <form @submit.prevent="submitFormPorcentaje" class="col-6 md:6">
          <div class="card p-fluid">
            <div class="field col-9 md-6">
              <label for="folio_solicitud">Folio de Solicitud:</label>
              <Dropdown id="folio_solicitud" v-model="formDataPorcentaje.folio_solicitud" :options="folioSolicitudOptions" showClear required />
            </div>
            <div class="field col-9 md-6">
              <label for="porcentaje_avance">Porcentaje de avance(%):</label>
              <InputText id="porcentaje_avance" type="number" v-model="formDataPorcentaje.porcentaje_avance" placeholder="Ejemplo: 50" required />
            </div>
            <div class="field col-4 md-3">
              <Button label="Actualizar Porcentaje" class="p-button-success mr-2 mb-2" type="submit" />
            </div>
          </div>
        </form>
  
        <!-- Formulario para Estado -->
        <form @submit.prevent="submitFormEstado" class="col-6 md:6">
          <div class="card p-fluid">
            <div class="field col-9 md-6">
              <label for="folio_solicitud_estado">Folio de Solicitud:</label>
              <Dropdown id="folio_solicitud_estado" v-model="formDataEstado.folio_solicitud" :options="folioSolicitudOptions" showClear required />
            </div>
            <div class="field col-9 md-6">
              <label for="estado">Estado:</label>
              <Dropdown id="estado" v-model="formDataEstado.estado" :options="estadoOptions" optionLabel="label" optionValue="value" placeholder="Estado del proyecto" required />
            </div>
            <div class="field col-4 md-3">
              <Button label="Actualizar Estado" class="p-button-success mr-2 mb-2" type="submit" />
            </div>
          </div>
        </form>
  
      </div>
  
      <Toast ref="toast" />
    </div>
  </template>
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        formDataPorcentaje: {
          folio_solicitud: null,
          porcentaje_avance: "",
        },
        formDataEstado: {
          folio_solicitud: null,
          estado: null,
        },
        estadoOptions: [
          { label: "En proceso", value: "en proceso" },
          { label: "Terminado", value: "terminado" },
        ],
        folioSolicitudOptions: [],
        authToken: null,
      };
    },
    created() {
      this.obtenerToken();
    },
    methods: {
       // Función para obtener el token JWT
  obtenerToken() {
    const credentials = {
      username: 'admin',  // Cambiar con las credenciales reales
      password: 'secretaacces123',  // Cambiar con las credenciales reales
    };

    // Enviar los datos en el cuerpo de la solicitud como JSON
    axios.post('https://api-constructora.onrender.com/token', {
      username: credentials.username,
      password: credentials.password,
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        console.log(response)
        this.authToken = response.data.access_token;
        axios.defaults.headers.common['Authorization'] = `Bearer ${this.authToken}`;
        this.cargarFolios();
        
        // Después de obtener el token con éxito, realizar otras acciones si es necesario
      })
      .catch(error => {
        console.error('Error al obtener el token JWT', error);
        if (error.response) {
          console.error('Respuesta del servidor:', error.response.data);
        }
      });
  },
  
      // Función para cargar las empresas
      cargarFolios() {
        if (this.authToken) {
          axios.get(`https://api-constructora.onrender.com/proyecto/ver-todos?jsonwebtoken=${this.authToken}`)
            .then(response => {
              // Extraer solo los nombres de la respuesta
              this.folioSolicitudOptions = response.data.map(item => item.folio_solicitud);
            })
            .catch(error => {
              console.error('Error al obtener los datos de la API', error);
            });
        }
      },
  
      validateAmount(value) {
    // Verificar si el valor es negativo o contiene la letra "e"
    if (value < 0 || value > 100 || String(value).toLowerCase().includes('e')) {
      return false;
    }
    return true;
  },

  submitFormPorcentaje() {
  console.log('Submit button clicked para Porcentaje');
  if (this.validateFieldsPorcentaje()) {
    // Validar porcentaje de avance antes de enviar la solicitud
    if (!this.validateAmount(this.formDataPorcentaje.porcentaje_avance)) {
      this.showValidationError("El porcentaje no puede ser negativo ni sobrepasar el 100%.");
      return;
    }

    const url = `https://api-constructora.onrender.com/proyecto/update-porcentaje/${this.formDataPorcentaje.folio_solicitud}?porcentaje_avance=${this.formDataPorcentaje.porcentaje_avance}&jsonwebtoken=${this.authToken}`;

    axios.patch(url)
      .then(response => {
        if (response.status === 200) {
          this.showSuccessToast('¡Porcentaje de avance modificado exitosamente!');
          this.limpiarCamposEntrada();
        }
      })
      .catch(error => {
        console.error('Error al modificar el Porcentaje de avance', error);
        this.showApiErrorToast(error);
      });
  }
},

submitFormEstado() {
  console.log('Submit button clicked para Estado');
  if (this.validateFieldsEstado()) {
    const url = `https://api-constructora.onrender.com/proyecto/update-estado/${this.formDataEstado.folio_solicitud}?estado_proyecto=${this.formDataEstado.estado}&jsonwebtoken=${this.authToken}`;

    axios.patch(url)
      .then(response => {
        if (response.status === 200) {
          this.showSuccessToast('¡Estado del proyecto modificado exitosamente!');
          this.limpiarCamposEntrada();
        }
      })
      .catch(error => {
        console.error('Error al modificar el Estado del proyecto', error);
        this.showApiErrorToast(error);
      });
  }
},

validateFieldsPorcentaje() {
  if (this.formDataPorcentaje.folio_solicitud === null || this.formDataPorcentaje.porcentaje_avance.trim() === "") {
    this.showValidationError("Por favor, complete todos los campos del formulario de porcentaje.");
    return false;
  }
  return true;
},

validateFieldsEstado() {
  if (this.formDataEstado.folio_solicitud === null || this.formDataEstado.estado === null) {
    this.showValidationError("Por favor, complete todos los campos del formulario de estado.");
    return false;
  }
  return true;
},


  
      showSuccessToast(message) {
      this.$refs.toast.add({
        severity: 'success',
        summary: 'Éxito',
        detail: message,
        life: 3000,
      });
    },

    showValidationError(message) {
      this.$refs.toast.add({
        severity: 'error',
        summary: 'Error de validación',
        detail: message,
        life: 5000, // Duración en milisegundos
      });
    },

    showApiErrorToast(error) {
      let errorMessage = 'Error al modificar atributos la solicitud';

      if (error.response) {
        const statusCode = error.response.status;

        if (statusCode === 422) {
          errorMessage = 'Error de validacion';
        } else {
          // Puedes agregar más casos según los códigos de estado que desees manejar
          errorMessage = `Ya se modifico dicha solicitud`;
        }
      }

      this.$refs.toast.add({
        severity: 'error',
        summary: 'Error',
        detail: errorMessage,
        life: 5000, // Duración en milisegundos
      });
    },

    limpiarCamposEntrada() {
  // Limpiar el formulario de porcentaje de avance
  this.formDataPorcentaje.folio_solicitud = null;
  this.formDataPorcentaje.porcentaje_avance = "";

  // Limpiar el formulario de estado
  this.formDataEstado.folio_solicitud = null;
  this.formDataEstado.estado = null;
},

    },
  };
  </script>