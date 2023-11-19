<template>
    <div >
      <div class="p-grid">
        <div class="col-8 md:12">
          <div class="card">
            <Panel header="Proyectos con supervisores registrados" style="height: 100%">
              <!-- Agrega los campos de búsqueda y filtros aquí si es necesario -->
              <div class="p-grid">
                <div class="p-col-12 p-md-12">
                  <InputText type="text" placeholder="Telefono del supervisor" v-model="telefonoSupervisor" />
                  <Button label="Buscar" icon="pi pi-search" @click="buscarPorTelefonoSupervisor" />
                </div>
              </div>
              <!-- Aquí puedes agregar más filtros si es necesario -->
            </Panel>

            <DataTable :value="solicitudes" :paginator="true" :rows="5" :rowsPerPageOptions="[5, 10, 25]" responsiveLayout="scroll">
              <Column field="folio_proyecto" header="Folio del proyecto" :sortable="true"></Column>
              <Column field="nombre_supervisor" header="Nombre del supervisor" :sortable="true"></Column>
              <Column style="width:100px">
              </Column>
            </DataTable>

          </div>
        </div>
      </div>
      <Dialog header="Confirmar Eliminación" :visible="eliminarDialogVisible" @hide="eliminarDialogVisible = false">
        <div>
          ¿Estás seguro de que deseas eliminar esta solicitud?
          <br>
        </div>
        <br>
        <div class="p-d-flex p-jc-end">
          <Button label="Cancelar" class="p-button-text" @click="eliminarDialogVisible = false" />
          <Button label="Eliminar" class="p-button-danger" @click="eliminarSolicitud" />
        </div>
      </Dialog>

    <Toast ref="toast" />
  </div>
</template>



<script>
import axios from 'axios';

export default {
  data() {
    return {
      solicitudes: [],
      eliminarDialogVisible: false,
      telefonoSupervisor: '',
      confirmacionSolicitud: null,
      authToken: null, // Agregado para almacenar el token JWT
    };
  },
  created() {
    // Al crear el componente, obtener el token JWT y cargar las solicitudes
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
        this.cargarSolicitudes();
        // Después de obtener el token con éxito, realizar otras acciones si es necesario
      })
      .catch(error => {
        console.error('Error al obtener el token JWT', error);
        if (error.response) {
          console.error('Respuesta del servidor:', error.response.data);
        }
      });
    },

    cargarSolicitudes() {
        if (this.authToken) {
        // Modificar la URL para incluir el token JWT como parámetro de consulta
        axios.get(`https://api-constructora.onrender.com/proyecto_supervisor/ver-todos/?jsonwebtoken=${this.authToken}`)
        .then(response => {
        this.solicitudes = response.data;
        })
        .catch(error => {
            console.error('Error al obtener los datos de la API', error);
        });
      }
    },


    confirmarEliminacion(solicitud) {
      this.eliminarDialogVisible = true;
      this.confirmacionSolicitud = solicitud;
    },
    eliminarSolicitud() {
      if (this.confirmacionSolicitud) {
      const url = `https://api-constructora.onrender.com/solicitud_proyecto/delete/${this.confirmacionSolicitud.folio_solicitud}?jsonwebtoken=${this.authToken}`;

      axios.delete(url)
      .then(response => {
        if (response.status === 200) {
          this.cargarSolicitudes();
          this.mostrarNotificacion("Eliminación exitosa", "La solicitud ha sido eliminada con éxito.", "success");
        }
      })
      .catch(error => {
        console.error('Error al eliminar la solicitud', error);
        this.mostrarNotificacion("Error", "No se pudo eliminar la solicitud.", "error");
      });
      }
      this.eliminarDialogVisible = false;
    },

    mostrarNotificacion(summary, detail, severity) {
      this.$refs.toast.add({
        severity,
        summary,
        detail,
        life: 5000,
      });
    },

    buscarPorTelefonoSupervisor() {
  if (this.telefonoSupervisor) {
    const url = `https://api-constructora.onrender.com/proyecto_supervisor/ver/${this.telefonoSupervisor}?jsonwebtoken=${this.authToken}`;
    axios.get(url)
      .then(response => {
        this.solicitudes = response.data;
        this.mostrarNotificacion("proyecto encontrado!", "proyecto encontrada con éxito.", "success");
      })
      .catch(error => {
        console.error('Error al buscar proyecto por telefono del supervisor', error);
        this.mostrarNotificacion("Error", "No se encontraron proyectos relacionados con el supervisor.", "error");
      });
  } else {
    this.mostrarNotificacion("Advertencia", "Ingrese un telefono de supervisor valido para buscar.", "warn");
     }
    },

  },
};
</script>

  