<template>
  <div>
    <h1>Registrar nuevo Proyecto</h1>
    <form @submit.prevent="submitForm" class="grid">
      <div class="col-6 md:6">
        <div class="card p-fluid">
          <div class="field col-9 md-6">
            <label for="fecha_inicio">Fecha de Inicio:</label>
            <InputText id="fecha_inicio" type="date" v-model="formData.fecha_inicio" :min="getMinFechaInicio()" :max="getMaxFechaFin()" required/>
          </div>
          <div class="field col-9 md-6">
            <label for="fecha_fin">Fecha de Fin:</label>
            <InputText id="fecha_fin" type="date" v-model="formData.fecha_fin" :min="formData.fecha_inicio" :max="getMaxFechaFin()" required :disabled="!formData.fecha_inicio"/>
          </div>
          <div class="field col-9 md-6">
            <label for="prioridad">Prioridad:</label>
            <Dropdown
              id="prioridad"
              v-model="formData.prioridad"
              :options="prioridadOptions"
              optionLabel="label"
              optionValue="value"
              placeholder="Seleccionar prioridad"
              required
            />
          </div>
          <div class="field col-9 md-6">
            <label for="estado_proyecto">Folio de solicitud</label>
              <Dropdown
              id="folio_solicitud"
              v-model="formData.folio_solicitud"
              :options="folio_Options"
              optionLabel="label"
              optionValue="value"
              placeholder="Folio de solicitud"
              required
              v-if="folio_Options.length > 0"
              />
            </div>
          <div class="field col-5 md-3">
            <Button type="submit" label="Registrar" class="p-button-success mr-2 mb-2" />
          </div>
        </div>
      </div>
      <div class="col-6 md:6">
        <div class="card p-fluid">
          <img
            src="../../assets/servicio.jpeg"
            alt="Logo representativo"
            style="max-width: 100%; height: auto;"
          />
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
      authToken: null,
      formData: {
        fecha_inicio: "",
        fecha_fin: "",
        prioridad: "",
        folio_solicitud: null,
      },
      prioridadOptions: [
        { label: "Alta", value: "alta" },
        { label: "Media", value: "media" },
        { label: "Baja", value: "baja" },
      ],
      folio_Options: [],
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

      axios.post('https://api-constructora.onrender.com/token', {
        username: credentials.username,
        password: credentials.password,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(response => {
          console.log(response);
          this.authToken = response.data.access_token;
          axios.defaults.headers.common['Authorization'] = `Bearer ${this.authToken}`;
          this.cargarFolios();
        })
        .catch(error => {
          console.error('Error al obtener el token JWT', error);
          if (error.response) {
            console.error('Respuesta del servidor:', error.response.data);
          }
        });
    },

    cargarFolios() {
      if (this.authToken) {
        axios.get(`https://api-constructora.onrender.com/solicitud_proyecto/ver-todas?jsonwebtoken=${this.authToken}`)
          .then(response => {
            // Extraer solo los folios de la respuesta
            this.folio_Options = response.data.map(item => ({ label: item.folio_solicitud, value: item.folio_solicitud }));
            console.log(this.folio_Options); // Usa "this" para acceder a la propiedad correctamente
          })
          .catch(error => {
            console.error('Error al obtener los datos de la API', error);
          });
      }
    },

    getMinFechaInicio() {
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = String(currentDate.getMonth() + 1).padStart(2, "0");
      const day = String(currentDate.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    },
    getMaxFechaFin() {
      if (this.formData.fecha_inicio) {
        const startDate = new Date(this.formData.fecha_inicio);
        startDate.setDate(startDate.getDate() + 1800); // Suma 360 días a la fecha de inicio
        const year = startDate.getFullYear();
        const month = String(startDate.getMonth() + 1).padStart(2, "0");
        const day = String(startDate.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
      }
      return "";
    },
    getCurrentDate() {
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = String(currentDate.getMonth() + 1).padStart(2, "0");
      const day = String(currentDate.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    },
    submitForm() {
      console.log('Submit button clicked');

        const formattedStartDate = this.formatDate(this.formData.fecha_inicio);
        const formattedEndDate = this.formatDate(this.formData.fecha_fin);

        const url = `https://api-constructora.onrender.com/proyecto/create/?fecha_inicio=${formattedStartDate}&fecha_fin=${formattedEndDate}&prioridad=${this.formData.prioridad}&folio_solicitud=${this.formData.folio_solicitud}&jsonwebtoken=${this.authToken}`;

        axios.post(url)
          .then(response => {
            if (response.status === 200) {
              this.showSuccessToast('¡Proyecto creado exitosamente!');
              this.limpiarCamposEntrada();
            }
          })
          .catch(error => {
            console.error('Error al crear el Proyecto', error);
            this.showApiErrorToast(error);
          });
      
    },
    
    formatDate(date) {
      const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
      return new Date(date).toLocaleDateString(undefined, options);
    },
    
    validateFields() {
      if (
        this.formData.fecha_inicio &&
        this.formData.fecha_fin &&
        this.formData.prioridad &&
        this.formData.folio_solicitud
      ) {
        return true; // Todos los campos están llenos
      } else {
        this.showValidationError("Por favor, complete todos los campos obligatorios.");
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
    console.error('Error en la API:', error);
    this.$refs.toast.add({
      severity: 'error',
      summary: 'Error al crear el proyecto',
      detail: 'Fechas erroneas, folio incorrecto, la solicitud esta rechazada/en espera o el folio ya fue regsitrado.',
      life: 5000,
    });
    },
    limpiarCamposEntrada() {
      this.formData.fecha_inicio = "";
      this.formData.fecha_fin = "";
      this.formData.prioridad = "";
      this.formData.folio_solicitud = null;
    },
  },
};
</script>





