<template>
    <div>
      <div class="p-grid">
        <div class="p-col-12">
          <div class="card">
            <Panel header="Solicitudes de Proyecto Registradas" style="height: 100%">
              <!-- Agrega los campos de búsqueda y filtros aquí si es necesario -->
              <div class="p-grid">
                <div class="p-col-12 p-md-8">
                  <InputText type="text" placeholder="Folio de Solicitud" v-model="folioSolicitud" />
                  <Button label="Buscar" icon="pi pi-search" @click="buscarSolicitudPorFolio" />
                </div>
              </div>
              <!-- Aquí puedes agregar más filtros si es necesario -->
            </Panel>

            <DataTable :value="solicitudes" :paginator="true" :rows="5" :rowsPerPageOptions="[5, 10, 25]" responsiveLayout="scroll">
              <Column field="id_solicitud" header="ID Solicitud" :sortable="true"></Column>
              <Column field="nombre_empresa" header="Nombre de empresa" :sortable="true"></Column>
              <Column field="fecha" header="Fecha" :sortable="true"></Column>
              <Column field="monto_presupuesto" header="Monto de Presupuesto" :sortable="true"></Column>

              <Column field="monto_anticipo" header="Monto de Anticipo" :sortable="true"></Column>
              <Column field="folio_solicitud" header="Folio de Solicitud" :sortable="true"></Column>
              <Column field="estado" header="Estado" :sortable="true"></Column>
              <Column style="width:150px">
                <template #header>
                  Editar/Eliminar Registro
                </template>
                <template #body="slotProps">
                  <Button icon="pi pi-pencil" class="p-button-success p-mr-2" @click="editarSolicitud(slotProps.data)"></Button>
                  <Button icon="pi pi-trash" class="p-button-danger" @click="confirmarEliminacion(slotProps.data)"></Button>
                </template>
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
  
      <!-- Panel de edición -->
      <Dialog header="Editar Solicitud" :visible="editarDialogVisible" @hide="editarDialogVisible = false">
        <div>
          <div class="p-grid">
            <div class="p-col-12">
              <div class="p-fluid">

                <div class="p-field">
                  <label for="edit-folio">Folio de solicitud</label>
                  <InputText id="edit-folio" v-model="solicitudEdit.folio_solicitud" readonly/>
                </div>
                <br>
                <div class="p-field">
                  <label for="fecha">Fecha:</label>
                  <InputText
                  id="edit-fecha"
                  type="date"
                  v-model="solicitudEdit.fecha"
                  :max="getCurrentDate()"
                  required
                  />
                </div>
                <br>
                <div class="p-field">
                  <label for="edit-monto-presupuesto">Monto de Presupuesto</label>
                  <InputText id="edit-monto-presupuesto" v-model="solicitudEdit.monto_presupuesto" />
                </div>
                <br>
                <div class="p-field">
                  <label for="edit-monto-anticipo">Monto de Anticipo</label>
                  <InputText id="edit-monto-anticipo" v-model="solicitudEdit.monto_anticipo" />
                </div>
                <br>
            </div>
          </div>
        </div>
        <div class="p-d-flex p-jc-end">
          <Button label="Cancelar" class="p-button-text" @click="cancelarEdicion" />
          <Button label="Guardar" class="p-button-success" @click="guardarEdicion" />
        </div>
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
      editarDialogVisible: false,
      folioSolicitud: '',
      confirmacionSolicitud: null,
      solicitudEdit: {
        folio_solicitud: '',
        fecha: null,
        monto_presupuesto: null,
        monto_anticipo: null,
      },
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
      axios.get(`https://api-constructora.onrender.com/solicitud_proyecto/ver-todas?jsonwebtoken=${this.authToken}`)
      .then(response => {
        // Filtrar las solicitudes por estado "Aceptado" o "Rechazado"
        this.solicitudes = response.data.filter(solicitud => {
          return solicitud.estado === "aceptado" || solicitud.estado === "Rechazado";
        });
      })
      .catch(error => {
        console.error('Error al obtener los datos de la API', error);
      });
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

    buscarSolicitudPorFolio() {
  if (this.folioSolicitud) {
    const url = `https://api-constructora.onrender.com/solicitud_proyecto/ver1/${this.folioSolicitud}?jsonwebtoken=${this.authToken}`;
    axios.get(url)
      .then(response => {
        this.solicitudes = [response.data];
        this.mostrarNotificacion("Solicitud encontrada!", "Solicitud encontrada con éxito.", "success");
      })
      .catch(error => {
        console.error('Error al buscar solicitud por folio', error);
        this.mostrarNotificacion("Error", "No se pudo encontrar la solicitud.", "error");
      });
  } else {
    this.mostrarNotificacion("Advertencia", "Ingrese un folio de solicitud para buscar.", "warn");
     }
    },

    validateAmount(value) {
    // Verificar si el valor es negativo o contiene la letra "e"
    if (value < 0 || String(value).toLowerCase().includes('e')) {
      return false;
    }
    return true;
    },

    getCurrentDate() {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, "0");
        const day = String(currentDate.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
      },

    editarSolicitud(solicitud) {
      this.solicitudEdit = { ...solicitud };
      this.editarDialogVisible = true;
    },
    cancelarEdicion() {
      this.editarDialogVisible = false;
      this.solicitudEdit = {
        folio_solicitud: '',
        fecha: null,
        monto_presupuesto: null,
        monto_anticipo: null,
      };
    },
    //pendiente el editar
    guardarEdicion() {
      if (this.solicitudEdit) {
        // Validar monto_presupuesto y monto_anticipo antes de enviar la solicitud
      if (!this.validateAmount(this.solicitudEdit.monto_presupuesto) || !this.validateAmount(this.solicitudEdit.monto_anticipo)) {
        this.showValidationError("Los montos no pueden ser negativos.");
        return;
      }

        axios.put(`https://api-constructora.onrender.com/solicitud_proyecto/update/${this.solicitudEdit.folio_solicitud}`, this.solicitudEdit)
          .then(response => {
            if (response.status === 200) {
              this.cargarSolicitudes();
              this.editarDialogVisible = false;
              this.mostrarNotificacion("Actualización exitosa", "La solicitud ha sido actualizada con éxito.", "success");
            }
          })
          .catch(error => {
            console.error('Error al actualizar la solicitud', error);
            this.mostrarNotificacion("Error", "No se pudo actualizar la solicitud.", "error");
          });
      }
    },



  },
};
</script>

  