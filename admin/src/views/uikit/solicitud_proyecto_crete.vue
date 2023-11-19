<template>
    <div>
      <h1>Registro de Solicitud de Proyecto</h1>
      <form @submit.prevent="submitForm" class="grid">
        <div class="col-6 md:6">
          <div class="card p-fluid">

            <div class="field col-9 md-6">
            <label for="nombre_empresa">Nombre de la empresa:</label>
            <Dropdown
              id="nombre_empresa"
                v-model="formData.id_empresa"
                :options="nombreEmpresaOptions"
                showClear
                required
              />
            </div>
            
            <div class="field col-9 md-6">
              <label for="fecha">Fecha:</label>
              <InputText
              id="fecha"
              type="date"
              v-model="formData.fecha"
              :max="getCurrentDate()"
              required
            />
            </div>
            <div class="field col-9 md-6">
              <label for="monto_presupuesto">Monto de Presupuesto:</label>
              <InputText id="monto_presupuesto" type="number" v-model="formData.monto_presupuesto" placeholder="Ejemplo: $50000.00" required />
              
            </div>

            <div class="field col-9 md-6">
              <label for="monto_anticipo">Monto de Anticipo:</label>
              <InputText id="monto_anticipo" type="number" v-model="formData.monto_anticipo" placeholder="Ejemplo: $10000.00" required />
            </div>

            <div class="field col-9 md-6">
              <label for="folio_solicitud">Folio de Solicitud:</label>
              <InputText id="folio_solicitud" type="text" v-model="formData.folio_solicitud" placeholder="Ejemplo: SOL-2023-001" required />
            </div>

            <div class="field col-9 md-6">
              <label for="estado">Estado:</label>

              <Dropdown
                id="estado"
                v-model="formData.estado"
                :options="estadoOptions"
                optionLabel="label"
                optionValue="value"
                placeholder="Estado del proyecto"
                required
              />

            </div>
            <div class="field col-4 md-3">
              <Button label="Registrar" class="p-button-success mr-2 mb-2" type="submit"  />
            </div>
          </div>
        </div>
  
        <div class="col-6 md:6">
          <div class="card p-fluid">
            <img src="dist\demo\images\galleria\herramientas.jpg"
            alt="Logo representativo 2"
            style="max-width: 100%; height: auto;"/>
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
          id_empresa: null,
          fecha: "",
          monto_presupuesto: null,
          monto_anticipo: null,
          folio_solicitud: "",
          estado: null,
        },
        estadoOptions: [
          { label: "Aceptado", value: "aceptado" },
          { label: "Rechazado", value: "rechazado" },
          { label: "En espera", value: "en espera" },
        ],
        nombreEmpresaOptions: [],
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
        this.cargarEmpresas();
        
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
      cargarEmpresas() {
        if (this.authToken) {
          axios.get(`https://api-constructora.onrender.com/empresa/ver-todas?jsonwebtoken=${this.authToken}`)
            .then(response => {
              // Extraer solo los nombres de la respuesta
              this.nombreEmpresaOptions = response.data.map(item => item.nombre);
            })
            .catch(error => {
              console.error('Error al obtener los datos de la API', error);
            });
        }
      },
  
      validateAmount(value) {
    // Verificar si el valor es negativo o contiene la letra "e"
    if (value < 0 || String(value).toLowerCase().includes('e')) {
      return false;
    }
    return true;
  },

      submitForm() {
    console.log('Submit button clicked');
    if (this.validateFields()) {
      // Validar monto_presupuesto y monto_anticipo antes de enviar la solicitud
      if (!this.validateAmount(this.formData.monto_presupuesto) || !this.validateAmount(this.formData.monto_anticipo)) {
        this.showValidationError("Los montos no pueden ser negativos.");
        return;
      }

      const url = `https://api-constructora.onrender.com/solicitud_proyecto/create/?jsonwebtoken=${this.authToken}&nombre_empresa=${this.formData.id_empresa}&fecha=${this.formData.fecha}&monto_presupuesto=${this.formData.monto_presupuesto}&monto_anticipo=${this.formData.monto_anticipo}&folio_solicitud=${this.formData.folio_solicitud}&estado=${this.formData.estado}`;

      axios.post(url)
        .then(response => {
          if (response.status === 200) {
            this.showSuccessToast('¡Solicitud creada exitosamente!');
            this.limpiarCamposEntrada();
          }
        })
        .catch(error => {
          console.error('Error al crear la Solicitud', error);
          this.showApiErrorToast(error);
        });
        }
      },
  
      validateFields() {
        if (
          this.formData.id_empresa !== null &&
          this.formData.fecha &&
          this.formData.monto_presupuesto !== null &&
          this.formData.monto_anticipo !== null &&
          this.formData.folio_solicitud &&
          this.formData.estado !== null &&
          this.formData.estado !== ""
        ) {
          return true; // Todos los campos están llenos
        } else {
          this.showValidationError("Por favor, complete todos los campos, incluyendo el campo Estado y nombre de empresa.");
          return false;
        }
      },
  
      getCurrentDate() {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, "0");
        const day = String(currentDate.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
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
      this.formData.id_empresa = null;
      this.formData.fecha = "";
      this.formData.monto_presupuesto = null; 
      this.formData.monto_anticipo = null; 
      this.formData.folio_solicitud = "";
      this.formData.estado = null; 
      this.formData.estado = "";
    },

    },
  };
  </script>