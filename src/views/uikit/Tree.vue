<template>
  <div>
    <h1>Registro de Supervisor y Colaborador</h1>
    <form class="grid">
      <!-- Formulario Supervisor -->
      <div class="col-6 md:6">
        <div class="card p-fluid">
          <div class="field col-9 md-6">
            <label for="nombreSupervisor">Nombre del Supervisor:</label>
            <InputText id="nombreSupervisor" type="text" v-model="supervisorFormData.nombre" placeholder="Ejemplo: Juan Pérez" required />
          </div>
          <div class="field col-9 md-6">
            <label for="cargoSupervisor">Cargo del Supervisor:</label>
            <InputText id="cargoSupervisor" type="text" v-model="supervisorFormData.cargo" placeholder="Ejemplo: Gerente de Proyectos" required />
          </div>
          <div class="field col-9 md-6">
            <label for="telefonoSupervisor">Teléfono del Supervisor:</label>
            <InputText id="telefonoSupervisor" type="tel" v-model="supervisorFormData.telefono" placeholder="Ejemplo: 9614567890" required />
          </div>
          <div class="field col-9 md-6">
            <label for="correoSupervisor">Correo del Supervisor:</label>
            <InputText id="correoSupervisor" type="email" v-model="supervisorFormData.correo" placeholder="Ejemplo: juan.perez@empresa.com" required />
          </div>

          <div class="col-3 md-3">
            <Button label="Registrar" id="btnSupervisor" class="p-button-success mr-2 mb-2" @click="submitFormSupervisor" />
          </div>
        </div>
      </div>

      <!-- Formulario Colaborador -->
      <div class="col-6 md:6">
        <div class="card p-fluid">
          <div class="field col-9 md-6">
            <label for="telefono_supervisor">Telefono del Supervisor:</label>
            <Dropdown
              id="telefono_supervisor"
                v-model="colaboradorFormData.telefono_supervisor"
                :options="telefonoSupervisorOptions"
                showClear
                required
              />
          </div>
          <div class="field col-9 md-6">
            <label for="nombreColaborador">Nombre del Colaborador:</label>
            <InputText id="nombreColaborador" type="text" v-model="colaboradorFormData.nombre" placeholder="Ejemplo: María García" required />
          </div>
          <div class="field col-9 md-6">
            <label for="cargoColaborador">Cargo del Colaborador:</label>
            <InputText id="cargoColaborador" type="text" v-model="colaboradorFormData.cargo" placeholder="Ejemplo: Diseñador Gráfico" required />
          </div>
          <div class="field col-9 md-6">
            <label for="telefonoColaborador">Teléfono del Colaborador:</label>
            <InputText id="telefonoColaborador" type="tel" v-model="colaboradorFormData.telefono" placeholder="Ejemplo: 9621234567" required />
          </div>
          <div class="field col-9 md-6">
            <label for="correoColaborador">Correo del Colaborador:</label>
            <InputText id="correoColaborador" type="email" v-model="colaboradorFormData.correo" placeholder="Ejemplo: maria.garcia@empresa.com" required />
          </div>

          <div class="col-3 md-3">
            <Button label="Registrar" id="btnColaborador" class="p-button-success mr-2 mb-2" @click="submitFormColaborador" />
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
      supervisorFormData: {
        nombre: '',
        cargo: '',
        telefono: '',
        correo: '',
      },
      colaboradorFormData: {
        telefono_supervisor: null,
        nombre: '',
        cargo: '',
        telefono: '',
        correo: '',
      },
      telefonoSupervisorOptions: [],
      authToken: null,
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
        this.cargarSupervisor();
      })
      .catch(error => {
        console.error('Error al obtener el token JWT', error);
        if (error.response) {
          console.error('Respuesta del servidor:', error.response.data);
        }
      });
    },

          // Función para cargar las empresas
      cargarSupervisor() {
        if (this.authToken) {
          axios.get(`http://localhost:8000/supervisor/ver-todos/?jsonwebtoken=${this.authToken}`)
            .then(response => {
              // Extraer solo los nombres de la respuesta
              this.telefonoSupervisorOptions = response.data.map(item => item.telefono);
            })
            .catch(error => {
              console.error('Error al obtener los datos de la API', error);
            });
        }
      },

    submitFormSupervisor() {
      console.log('Submit button clicked');
      if (this.validateFields()) {
        axios.post(`http://localhost:8000/supervisor/create/?jsonwebtoken=${this.authToken}`, this.supervisorFormData)
          .then(response => {
            if (response.status === 200) {
              this.showSuccessToast('¡Supervisor creado exitosamente!');
              this.limpiarCamposEntrada();
            }
          })
          .catch(error => {
            console.error('Error al crear el supervisor', error);
            this.showApiErrorToast(error);
          });
      }
    },

    submitFormColaborador() {
      console.log('Submit button clicked');
      if (this.validateFieldsColaborador()) {
        // Lógica para el formulario del Colaborador
        axios.post(`http://localhost:8000/colaborador/create/?telefono_supervisor=${this.colaboradorFormData.telefono_supervisor}&jsonwebtoken=${this.authToken}`, this.colaboradorFormData)
        .then(response => {
        if (response.status === 200) {
          this.showSuccessToast('¡Colaborador creado exitosamente!');
          this.limpiarCamposEntradaColaborador();
        }
      })
      .catch(error => {
        console.error('Error al crear el colaborador', error);
        this.showApiErrorToastColaborador(error);
      });
      }
    },

    showValidationErrorColaborador(message) {
      this.showToastColaborador('error', 'Error de validación', message);
    },

    showApiErrorToastColaborador(error) {
      let errorMessage = 'Error al procesar el colaborador';

    if (error.response) {
      const statusCode = error.response.status;

      if (statusCode === 401) {
        errorMessage = 'El colaborador con ese nombre ya existe';
      } else {
        errorMessage = `Ya existe el colaborador`;
      }
    }
      this.showToastColaborador('error', 'Error', errorMessage);
    },

    validateFields() {
      if (
        this.supervisorFormData.nombre &&
        this.supervisorFormData.cargo &&
        this.supervisorFormData.telefono &&
        this.supervisorFormData.correo
      ) {
        return true;
      } else {
        this.showValidationError('Por favor, complete todos los campos del Supervisor.');
        return false;
      }
    },

    validateFieldsColaborador() {
      if (
        this.colaboradorFormData.telefono_supervisor &&
        this.colaboradorFormData.nombre &&
        this.colaboradorFormData.cargo &&
        this.colaboradorFormData.telefono &&
        this.colaboradorFormData.correo
      ) {
        return true;
      } else {
        this.showValidationError('Por favor, complete todos los campos del Colaborador.');
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
        life: 5000,
      });
    },

    showApiErrorToast(error) {
      let errorMessage = 'Error al procesar el supervisor';

      if (error.response) {
        const statusCode = error.response.status;

        if (statusCode === 401) {
          errorMessage = 'El supervisor con ese nombre ya existe';
        } else {
          errorMessage = `Ya existe el supervisor`;
        }
      }

      this.$refs.toast.add({
        severity: 'error',
        summary: 'Error',
        detail: errorMessage,
        life: 5000,
      });
    },

    limpiarCamposEntrada() {
      this.supervisorFormData.nombre = '';
      this.supervisorFormData.cargo = '';
      this.supervisorFormData.telefono = '';
      this.supervisorFormData.correo = '';
    },

    limpiarCamposEntradaColaborador() {
      this.colaboradorFormData.telefono_supervisor = null;
      this.colaboradorFormData.nombre = '';
      this.colaboradorFormData.cargo = '';
      this.colaboradorFormData.telefono = '';
      this.colaboradorFormData.correo = '';
    },
  },
};
</script>

