<template>
  <div>
    <div class="p-grid">
      <div class="p-col-12">
        <div class="card">
          <Panel header="Proyectos registrados" style="height: 100%">
            <!-- Agrega los campos de búsqueda y filtros aquí si es necesario -->
            <div class="p-grid">
              <div class="p-col-12 p-md-8">
                <InputText type="text" placeholder="Folio de solicitud" v-model="folio_solicitud" />
                <Button label="Buscar" icon="pi pi-search" @click="buscarProyectoPorFolio" />
              </div>
            </div>
          </Panel>
          <DataTable :value="proyectos" :paginator="true" :rows="5" :rowsPerPageOptions="[5, 10, 25]" responsiveLayout="scroll">
            <Column field="id_proyecto" header="ID Proyecto" :sortable="true" style="width: 10%"></Column>
            <Column field="empresa" header="Empresa" :sortable="true" style="width: 10%"></Column>
            <Column field="folio_solicitud" header="Folio de Solicitud" :sortable="true" style="width: 10%"></Column>
            <Column field="fecha_inicio" header="Fecha Inicio" :sortable="true" style="width: 15%"></Column>
            <Column field="fecha_fin" header="Fecha Fin" :sortable="true" style="width: 15%"></Column>
            <Column field="monto" header="Monto" :sortable="true" style="width: 15%"></Column>
            <Column field="prioridad" header="Prioridad" :sortable="true" style="width: 10%"></Column>
            <Column field="porcentaje_avance" header="Porcentaje Avance" :sortable="true" style="width: 10%"></Column>
            <Column field="estado_proyecto" header="Estado Proyecto" :sortable="true" style="width: 15%"></Column>
            <Column style="width:150px">
              <template #header>
                Editar/Eliminar
              </template>
              <template #body="slotProps">
                <Button icon="pi pi-pencil" class="p-button-success p-mr-2" @click="editarProyecto(slotProps.data)"></Button>
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
      </div>
      <div class="p-d-flex p-jc-end">
        <Button label="Cancelar" class="p-button-text" @click="eliminarDialogVisible = false" />
        <Button label="Eliminar" class="p-button-danger" @click="eliminarProyecto" />
      </div>
    </Dialog>

    <!-- Panel de edición -->
    <Dialog header="Editar Proyecto" :visible="editarDialogVisible" @hide="editarDialogVisible = false">
      <div>
        <div class="p-grid">
          <div class="p-col-12">
            <div class="p-fluid">
              <div class="p-field">
                <label for="edit-id-proyecto">ID de Proyecto</label>
                <InputText id="edit-id-proyecto" v-model="proyectoEdit.id_proyecto" />
              </div>
              <br>
              <div class="p-field">
                <label for="edit-nombre-empresa">Nombre Empresa</label>
                <InputText id="edit-nombre-empresa" v-model="proyectoEdit.nombre_empresa" />
              </div>
              <br>
              <div class="p-field">
                <label for="edit-folio-solicitud">Folio de Solicitud</label>
                <InputText id="edit-folio-solicitud" v-model="proyectoEdit.folio_solicitud" />
              </div>
              <br>
              <div class="p-field">
                <label for="edit-fecha-inicio">Fecha Inicio</label>
                <InputText id="edit-fecha-inicio" v-model="proyectoEdit.fecha_inicio" />
              </div>
              <br>
              <!-- Agrega más campos según sea necesario -->
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
      proyectos: [],
      eliminarDialogVisible: false,
      editarDialogVisible: false,
      folio_solicitud: '',
      folioProyecto: '',
      confirmacionProyecto: null,
      proyectoEdit: {
        id_proyecto: null,
        nombre_empresa: '',
        folio_solicitud: '',
        fecha_inicio: null,
        fecha_fin: null,
        monto: null,
        prioridad: '',
        porcentaje_avance: null,
        estado_proyecto: '',
      },
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
        this.cargarProyectos();
      })
      .catch(error => {
        console.error('Error al obtener el token JWT', error);
        if (error.response) {
          console.error('Respuesta del servidor:', error.response.data);
        }
      });
    },

    cargarProyectos() {
     // Verificar que authToken no sea null antes de hacer la solicitud
    if (this.authToken) {
    // Modificar la URL para incluir el token JWT como parámetro de consulta
    axios.get(`http://localhost:8000/proyecto/ver-todos?jsonwebtoken=${this.authToken}`)
      .then(response => {
        this.proyectos = response.data;
      })
      .catch(error => {
        console.error('Error al obtener los datos de la API', error);
      });
      }
    },

    confirmarEliminacion(proyecto) {
      this.eliminarDialogVisible = true;
      this.confirmacionProyecto = proyecto;
    },

    eliminarProyecto() {
    if (this.confirmacionProyecto) {
    const url = `http://localhost:8000/proyecto/delete/${this.confirmacionProyecto.folio_solicitud}?jsonwebtoken=${this.authToken}`;

    axios.delete(url)
      .then(response => {
        if (response.status === 200) {
          this.cargarProyectos();
          this.mostrarNotificacion("Eliminación exitosa", "El proyecto ha sido eliminado con éxito.", "success");
        }
      })
      .catch(error => {
        console.error('Error al eliminar el proyecto', error);
        this.mostrarNotificacion("Error", "No se pudo eliminar el proyecto.", "error");
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

    buscarProyectoPorFolio() {
      if (this.folio_solicitud && this.authToken) {
        axios.get(`http://localhost:8000/proyecto/ver1/${this.folio_solicitud}?jsonwebtoken=${this.authToken}`)
        .then(response => {
          this.proyectos = [response.data];  // Asignar a proyectos en lugar de apiData
          this.mostrarNotificacion("Proyecto encontrado!", "Proyecto encontrada con éxito.", "success");
        })
        .catch(error => {
          console.error('Error al buscar Proyecto por folio', error);
          this.mostrarNotificacion("Error", "No se pudo encontrar el Proyecto.", "error");
        });
      } else {
        this.mostrarNotificacion("Advertencia", "Ingrese un folio de proyecto para buscar.", "warn");
      }
    },

    editarProyecto(proyecto) {
      this.proyectoEdit = { ...proyecto };
      this.editarDialogVisible = true;
    },

    cancelarEdicion() {
      this.editarDialogVisible = false;
      this.proyectoEdit = {
        id_proyecto: null,
        nombre_empresa: '',
        folio_solicitud: '',
        fecha_inicio: null,
        fecha_fin: null,
        monto: null,
        prioridad: '',
        porcentaje_avance: null,
        estado_proyecto: '',
      };
    },

    guardarEdicion() {
      if (this.proyectoEdit) {
        axios.put(`http://localhost:8000/proyecto/update/${this.proyectoEdit.id_proyecto}`, this.proyectoEdit)
        .then(response => {
          if (response.status === 200) {
            this.cargarProyectos();
            this.editarDialogVisible = false;
            this.mostrarNotificacion("Actualización exitosa", "El proyecto ha sido actualizado con éxito.", "success");
          }
        })
        .catch(error => {
          console.error('Error al actualizar el proyecto', error);
          this.mostrarNotificacion("Error", "No se pudo actualizar el proyecto.", "error");
        });
      }
    },

  },
};
</script>

  