<template>
    <div>
      <h1>Registrar supervisor a proyectos</h1>
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
                placeholder="Folio de la solicitud de proyecto"
                required
              />
            </div>
            
            <div class="field col-9 md-6">
              <label for="telefono_supervisor">Telefono Supervisor:</label>

              <Dropdown
                id="telefono_supervisor"
                v-model="formData.telefono_supervisor"
                :options="telefono_supervisorOptions"
                showClear
                placeholder="Telefono del supervisor"
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
  



<script>
  import axios from 'axios';

  export default {
    data() {
      return {
        formData: {
            folio_solicitud: null,
            telefono_supervisor: null
        },
        folio_solicitudOptions: [],
        telefono_supervisorOptions: []
      };
    },
    created() {
      // Obtener el token JWT al cargar el componente
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
        // aqui va el de cargar telefono y folio
        this.cargarFolio();
        this.cargarTelefonoSupervisor();
        
        // Después de obtener el token con éxito, realizar otras acciones si es necesario
      })
      .catch(error => {
        console.error('Error al obtener el token JWT', error);
        if (error.response) {
          console.error('Respuesta del servidor:', error.response.data);
        }
      });
  },
  
    // Función para cargar los folios
    cargarFolio() {
        if (this.authToken) {
          axios.get(`https://api-constructora.onrender.com/proyecto/ver-todos?jsonwebtoken=${this.authToken}`)
            .then(response => {
              // Extraer solo los nombres de la respuesta
              this.folio_solicitudOptions = response.data.map(item => item.folio_solicitud);
            })
            .catch(error => {
              console.error('Error al obtener los datos de la API', error);
            });
        }
    },

    // Función para cargar los telefonos
    cargarTelefonoSupervisor() {
        if (this.authToken) {
          axios.get(`https://api-constructora.onrender.com/supervisor/ver-todos/?jsonwebtoken=${this.authToken}`)
            .then(response => {
              // Extraer solo los nombres de la respuesta
              this.telefono_supervisorOptions = response.data.map(item => item.telefono);
            })
            .catch(error => {
              console.error('Error al obtener los datos de la API', error);
            });
        }
    },

    submitForm() {
    console.log('Submit button clicked');
    if (this.validateFields()) {

        const url = `https://api-constructora.onrender.com/proyecto_supervisor/create/?folio_solicitud=${this.formData.folio_solicitud}&telefono_supervisor=${this.formData.telefono_supervisor}&jsonwebtoken=${this.authToken}`;

        axios.post(url)
        .then(response => {
          if (response.status === 200) {
            this.showSuccessToast('¡Supervisor agregado a proyecto exitosamente!');
            this.limpiarCamposEntrada();
          }
        })
        .catch(error => {
          console.error('Error al agregar supervisor al proyecto', error);
          this.showApiErrorToast(error);
        });
        }
      },
  
      validateFields() {
        if (
          this.formData.folio_solicitud !== null &&
          this.formData.telefono_supervisor !== null
        ) {
          return true; // Todos los campos están llenos
        } else {
          this.showValidationError("Por favor, complete todos los campos.");
          return false;
        }
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

    limpiarCamposEntrada() {
      this.formData.telefono_supervisor = null;
      this.formData.folio_solicitud = null;
    },

    },
  };
  </script>