<template>
  <div>
    <div class="p-grid">
      <div class="p-col-12">
        <div class="card">
          <Panel header="Servicios Registrados" style="height: 100%">
            <!-- Agrega los campos de búsqueda y filtros aquí si es necesario -->
            <div class="p-grid">
              <div class="p-col-12 p-md-8">
                <InputText type="text" placeholder="Nombre del Servicio" v-model="nombreServicio" />
                <Button label="Buscar" icon="pi pi-search" @click="buscarServicioPorNombre" />
              </div>
            </div>
            <!-- Aquí puedes agregar más filtros si es necesario -->
          </Panel>
          <DataTable :value="servicios" :paginator="true" :rows="5" :rowsPerPageOptions="[5, 10, 25]" responsiveLayout="scroll">
            <Column field="servicio" header="Servicio" :sortable="true"></Column>
            <Column field="descripcion" header="Descripción" :sortable="true"></Column>
            <Column style="width:150px">
              <template #header>
                Editar/Eliminar Registro
              </template>
              <template #body="slotProps">
                <Button icon="pi pi-pencil" class="p-button-success p-mr-2" @click="editarServicio(slotProps.data)"></Button>
                <Button icon="pi pi-trash" class="p-button-danger" @click="confirmarEliminacion(slotProps.data)"></Button>
              </template>
            </Column>
          </DataTable>
        </div>
      </div>
    </div>
    <Dialog header="Confirmar Eliminación" :visible="eliminarDialogVisible" @hide="eliminarDialogVisible = false">
      <div>
        ¿Estás seguro de que deseas eliminar este servicio?
        <br>
      </div>
      <br>
      <div class="p-d-flex p-jc-end">
        <Button label="Cancelar" class="p-button-text" @click="eliminarDialogVisible = false" />
        <Button label="Eliminar" class="p-button-danger" @click="eliminarServicio" />
      </div>
    </Dialog>

    <!-- Panel de edición -->
    <Dialog header="Editar Servicio" :visible="editarDialogVisible" @hide="editarDialogVisible = false">
      <div>
        <div class="p-grid">
          <div class="p-col-12">
            <div class="p-fluid">
              <div class="p-field">
                <label for="edit-servicio">Servicio</label>
                <InputText id="edit-servicio" v-model="servicioEdit.servicio" readonly/>
              </div>
              <br>
              <div class="p-field">
                <label for="edit-descripcion">Descripción</label>
                <InputText id="edit-descripcion" v-model="servicioEdit.descripcion" />
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
      servicios: [],
      eliminarDialogVisible: false,
      editarDialogVisible: false,
      nombreServicio: '',
      confirmacionServicio: null,
      servicioEdit: {
        servicio: '',
        descripcion: '',
      },
      authToken: null, // Nuevo estado para almacenar el token JWT
    };
  },
  created() {
  // Obtener el token JWT al cargar el componente
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
        this.cargarServicios();
        // Después de obtener el token con éxito, realizar otras acciones si es necesario
      })
      .catch(error => {
        console.error('Error al obtener el token JWT', error);
        if (error.response) {
          console.error('Respuesta del servidor:', error.response.data);
        }
      });
    },

    cargarServicios() {
      axios.get(`https://api-constructora.onrender.com/servicio/ver-todos?jsonwebtoken=${this.authToken}`)
      .then(response => {
        this.servicios = response.data;
      })
      .catch(error => {
        console.error('Error al obtener los datos de la API', error);
      });
    },

    confirmarEliminacion(servicio) {
      this.eliminarDialogVisible = true;
      this.confirmacionServicio = servicio;
    },

    eliminarServicio() {
    if (this.confirmacionServicio) {
    const url = `https://api-constructora.onrender.com/servicio/delete/${this.confirmacionServicio.servicio}?jsonwebtoken=${this.authToken}`;

    axios.delete(url)
      .then(response => {
        if (response.status === 200) {
          this.cargarServicios();
          this.mostrarNotificacion("Eliminación exitosa", "El servicio ha sido eliminado con éxito.", "success");
        }
      })
      .catch(error => {
        console.error('Error al eliminar el servicio', error);
        this.mostrarNotificacion("Error", "No se pudo eliminar el servicio.", "error");
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

    buscarServicioPorNombre() {
      if (this.nombreServicio) {
        const url = `https://api-constructora.onrender.com/servicio/ver1/${this.nombreServicio}?jsonwebtoken=${this.authToken}`;

      axios.get(url)
      .then(response => {
        this.servicios = [response.data];
        this.mostrarNotificacion("Servicio encontrado!", "Servicio encontrado con éxito.", "success");
      })
      .catch(error => {
        console.error('Error al buscar servicio por nombre', error);
        this.mostrarNotificacion("Error", "No se pudo encontrar el servicio.", "error");
      });
      } else {
        this.mostrarNotificacion("Advertencia", "Ingrese un nombre de servicio para buscar.", "warn");
      }
    },

    editarServicio(servicio) {
      this.servicioEdit = { ...servicio };
      this.editarDialogVisible = true;
    },
    cancelarEdicion() {
      this.editarDialogVisible = false;
      this.servicioEdit = {
        servicio: '',
        descripcion: '',
      };
    },

    guardarEdicion() {
      if (this.servicioEdit) {
      const { servicio, descripcion } = this.servicioEdit;
      const url = `https://api-constructora.onrender.com/servicio/update/${servicio}?nueva_descripcion=${descripcion}&jsonwebtoken=${this.authToken}`;

      axios.patch(url)
      .then(response => {
        if (response.status === 200) {
          this.cargarServicios();
          this.editarDialogVisible = false;
          this.mostrarNotificacion("Actualización exitosa", "El servicio ha sido actualizado con éxito.", "success");
        }
      })
      .catch(error => {
        console.error('Error al actualizar el servicio', error);
        this.mostrarNotificacion("Error", "No se pudo actualizar el servicio.", "error");
      });
    }
  },
    
  },
};
</script>

  