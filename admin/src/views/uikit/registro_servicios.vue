<template>
    <div>
      <h1>Registro de Servicios</h1>
      <form @submit.prevent="submitForm" class="grid">
        <div class="col-6 md:6">
          <div class="card p-fluid">
            <div class="field col-9 md:6">
              <label for="servicio">Nombre del Servicio:</label>
              <InputText
                id="servicio"
                type="text"
                v-model="formData.servicio"
                placeholder="Ejemplo: Servicio de Reparación"
                required
              />
            </div>
            <div class="field col-9 md:6">
              <label for="descripcion">Descripción del Servicio:</label>
              <InputText
                id="descripcion"
                v-model="formData.descripcion"
                placeholder="Ejemplo: Descripción detallada del servicio"
                rows="4"
                required
              />
            </div>

            <div class="field col-3 md-3">
              <Button label="Success" class="p-button-success mr-2 mb-2" type="submit" />
          </div>

          </div>
        </div>
      </form>
      <Toast ref="toast"></Toast>
    </div>
  </template>
  
  
  <script>
import axios from 'axios';

export default {
  data() {
    return {
      formData: {
        servicio: '',
        descripcion: '',
      },
      // Nuevo estado para almacenar el token JWT
      authToken: null,
    };
  },
  created() {
    // Obtener el token JWT al cargar el componente
    this.obtenerToken();
  },
  methods: {
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
        // Después de obtener el token con éxito, realizar otras acciones si es necesario
      })
      .catch(error => {
        console.error('Error al obtener el token JWT', error);
        if (error.response) {
          console.error('Respuesta del servidor:', error.response.data);
        }
      });
    },

    submitForm() {
      console.log('Submit button clicked'); // Agrega esta línea
      if (this.validateFields()) {
        const url = `https://api-constructora.onrender.com/servicio/create/?jsonwebtoken=${this.authToken}`;
        axios.post(url, this.formData)
          .then(response => {
            if (response.status === 200) {
              this.showSuccessToast('¡Servicio creado exitosamente!');
              this.limpiarCamposEntrada();
            }
          })
          .catch(error => {
            console.error('Error al crear el servicio', error);
            this.showApiErrorToast(error);
          });
      }
    },

    validateFields() {
      if (this.formData.servicio && this.formData.descripcion) {
        return true; // Todos los campos están llenos
      } else {
        this.showValidationError('Por favor, complete todos los campos.');
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
      let errorMessage = 'Error al procesar la solicitud';

      if (error.response) {
        const statusCode = error.response.status;

        if (statusCode === 401) {
          errorMessage = 'La empresa con ese nombre ya existe';
        } else {
          // Puedes agregar más casos según los códigos de estado que desees manejar
          errorMessage = 'Ya existe la empresa';
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
      this.formData.servicio = '';
      this.formData.descripcion = '';
    },
  },
};
</script>





  