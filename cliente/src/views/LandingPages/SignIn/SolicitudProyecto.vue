<script>
import axios from 'axios';
import { ElMessage } from 'element-plus';
import '@/assets/css/style-prop.css';

export default {
  data() {
    return {
      formData: {
        nombre_empresa: '',
        fecha: '',
        monto_presupuesto: 0,
        monto_anticipo: 0,
        folio_solicitud: '',
        estado: 'En espera',
      },
      empresa_id_or_nombre : '',
      authToken: null,
    };
  },
  watch: {
    'formData.nombre_empresa'(newVal) {
      this.empresa_id_or_nombre  = newVal;
    },
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
      this.validarEmpresa(this.formData.nombre_empresa)
        .then(empresaExiste => {
          if (empresaExiste) {
            this.crearSolicitudProyecto();
          } else {
            ElMessage({
              message: 'Primero debe registrar la empresa antes de hacer un registro de solicitud',
              type: 'error',
            });
          }
        })
        .catch(error => {
          console.error('Hubo un error al validar la empresa:', error);
        });
    },
    // validarEmpresa(nombreEmpresa) {
    //   return axios.get(`/empresa/ver1/${nombreEmpresa}`, {
    //     headers: {
    //       Authorization: `Bearer ${this.authToken}`,
    //     },
    //   })
    //   .then(response => {
    //     // Suponemos que si la empresa existe, la API devolverá datos de la empresa.
    //     return !!response.data;
    //   })
    //   .catch(error => {
    //     // Si la empresa no existe, suponemos que la API devuelve un error 404.
    //     if (error.response && error.response.status === 404) {
    //       return false;
    //     }
    //     // Para otros errores, los propagamos.
    //     throw error;
    //   });
    // },
    validarEmpresa(empresa_id_or_nombre ) {
  // Codificar el nombre de la empresa para la URL
  const empresaEncoded = encodeURIComponent(empresa_id_or_nombre );
  
  return axios.get(`/empresa/ver1/${empresaEncoded}`, {
    headers: {
      Authorization: `Bearer ${this.authToken}`,
    },
  })
  .then(response => {
    // Verificar si la empresa existe comprobando si la respuesta tiene contenido
    return response.data && response.data.nombre; // Asegúrate de que esta línea coincida con cómo tu API responde
  })
  .catch(error => {
    // Manejar específicamente el error 404
    if (error.response && error.response.status === 404) {
      return false;
    }
    // Propagar otros errores
    throw error;
  });
},

    crearSolicitudProyecto() {
      axios.post('/solicitud_proyecto/create', this.formData, {
        headers: {
          Authorization: `Bearer ${this.authToken}`,
        },
      })
      .then(response => {
        ElMessage({
          message: 'Solicitud de proyecto creada con éxito',
          type: 'success',
        });
      })
      .catch(error => {
        console.error('Error al crear la solicitud de proyecto:', error);
        ElMessage({
          message: 'Error al crear la solicitud de proyecto',
          type: 'error',
        });
      });
    },
    getCurrentDate() {
      const today = new Date();
      const yyyy = today.getFullYear();
      let mm = today.getMonth() + 1; // Months start at 0!
      let dd = today.getDate();

      if (dd < 10) dd = '0' + dd;
      if (mm < 10) mm = '0' + mm;

      return `${yyyy}-${mm}-${dd}`;
    },
  },
};
</script>


<template>
    <div class="form-container">
      <form @submit.prevent="submitForm" class="form-material">
        <div class="card-container">
          <div class="card p-fluid">
            <!-- Fila 1 -->
            <div class="row">
              <div class="col-md-6 form-group">
                <input id="nombre_empresa" type="text" placeholder=" " class="form-control" v-model="formData.nombre_empresa" required />
                <label for="nombre_empresa" class="form-label">Nombre de la empresa</label>
              </div>
              <div class="col-md-6 form-group">
                <input id="fecha" type="date" placeholder=" " class="form-control" v-model="formData.fecha" :max="getCurrentDate()" required />
                <label for="fecha" class="form-label">Fecha</label>
              </div>
            </div>
            <!-- Fila 2 -->
            <div class="row">
              <div class="col-md-6 form-group">
                <input id="monto_presupuesto" type="number" placeholder=" " class="form-control" v-model="formData.monto_presupuesto" required />
                <label for="monto_presupuesto" class="form-label">Monto de Presupuesto</label>
              </div>
              <div class="col-md-6 form-group">
                <input id="monto_anticipo" type="number" placeholder=" " class="form-control" v-model="formData.monto_anticipo" required />
                <label for="monto_anticipo" class="form-label">Monto de Anticipo</label>
              </div>
            </div>
            <!-- Fila 3 -->
            <div class="row">
              <div class="col-md-6 form-group">
                <input id="folio_solicitud" type="text" placeholder=" " class="form-control" v-model="formData.folio_solicitud" required />
                <label for="folio_solicitud" class="form-label">Folio de Solicitud</label>
              </div>
              <div class="col-md-6 form-group">
                <!-- Aquí deberías reemplazar el Dropdown por un InputText si es necesario -->
                <input id="estado" type="text" placeholder=" " class="form-control" v-model="formData.estado" required />
                <label for="estado" class="form-label">Estado</label>
              </div>
            </div>
            <!-- Botón -->
            <div class="text-center">
              <button type="submit" class="btn btn-success">Registrar</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  </template>