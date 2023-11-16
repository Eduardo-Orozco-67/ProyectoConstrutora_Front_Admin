<template>
  <div>
    <h1>Registro de Empresa</h1>
    <form @submit.prevent="submitForm" class="grid">
      <div class="col-6 md:6">
        <div class="card p-fluid">
          <div class="field col-9 md:6">
            <label for="nombre">Nombre de la empresa:</label>
            <InputText id="nombre" type="text" placeholder="Empresa" v-model="formData.nombre" required />
          </div>
          <div class="field col-9 md:6">
            <label for="direccion">Dirección:</label>
            <InputText id="direccion" type="text" placeholder="Calle Principal 123" v-model="formData.direccion" required />
          </div>
          <div class="field col-9 md:6">
            <label for="telefono">Teléfono:</label>
            <InputText id="telefono" type="tel" placeholder="9614567890" v-model="formData.telefono" required />
          </div>
          <div class="field col-9 md:6">
            <label for="correo">Correo electronico:</label>
            <InputText id="correo" type="email" placeholder="ejemplo@correo.com" v-model="formData.correo" required />
          </div>
          <div class="field col-3 md:3">
            <Button label="Success" class="p-button-success mr-2 mb-2" type="submit" />
            
          </div>
        </div>
      </div>

      <div class="col-6 md:6">
          <div class="card p-fluid">
              <div>
                <img 
                  src="dist/demo/images/galleria/Empresas.jpg" 
                  alt="Imagen de empresas"
                  style="max-width: 100%; height: auto;"
                   
                />
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
        nombre: '',
        direccion: '',
        telefono: '',
        correo: '',
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
    // Función para obtener el token JWT
    obtenerToken() {
      const credentials = {
        username: 'admin',  // Cambiar con las credenciales reales
        password: 'secretaacces123',  // Cambiar con las credenciales reales
      };

    // Enviar los datos en el cuerpo de la solicitud como JSON
    axios.post('http://localhost:8000/token', {
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
        axios.post(`http://localhost:8000/empresa/create?jsonwebtoken=${this.authToken}`, this.formData)
          .then(response => {
            if (response.status === 200) {
              this.showSuccessToast('¡Empresa creada exitosamente!');
              this.limpiarCamposEntrada();
            }
          })
          .catch(error => {
            console.error('Error al crear la empresa', error);
            this.showApiErrorToast(error);
          });
      }
    },

    validateFields() {
      if (
        this.formData.nombre &&
        this.formData.direccion &&
        this.formData.telefono &&
        this.formData.correo
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
      let errorMessage = 'Error al procesar la solicitud';

      if (error.response) {
        const statusCode = error.response.status;

        if (statusCode === 401) {
          errorMessage = 'La empresa con ese nombre ya existe';
        } else {
          // Puedes agregar más casos según los códigos de estado que desees manejar
          errorMessage = `Ya existe la empresa`;
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
      this.formData.nombre = '';
      this.formData.direccion = '';
      this.formData.telefono = '';
      this.formData.correo = '';
    },
  },
};
</script>

