<template>
    <div>
      <div class="p-grid">
        <div class="p-col-12">
          <div class="card">
            <Panel header="Supervisores registrados" style="height: 100%">
              <!-- Agrega los campos de búsqueda y filtros aquí si es necesario -->
              <div class="p-grid">
                <div class="p-col-12 p-md-8">
                  <!-- Agrega los campos de búsqueda y filtros aquí si es necesario -->
                  <InputText type="text" placeholder="Teléfono del Supervisor" v-model="telefono_supervisor" />
                  <InputText type="text" placeholder="Correo del Supervisor" v-model="correo_supervisor" />
                  <Button label="Buscar" icon="pi pi-search" @click="buscarSupervisorPorTelefonoYCorreo" />
                </div>
              </div>
            </Panel>
            <DataTable :value="supervisores" :paginator="true" :rows="5" :rowsPerPageOptions="[5, 10, 25]" responsiveLayout="scroll">
              <Column field="nombre" header="Nombre" :sortable="true" style="width: 25%"></Column>
              <Column field="cargo" header="Cargo" :sortable="true" style="width: 25%"></Column>
              <Column field="telefono" header="Teléfono" :sortable="true" style="width: 25%"></Column>
              <Column field="correo" header="Correo" :sortable="true" style="width: 25%"></Column>
              <Column style="width:150px">
                <template #header>
                  Editar/Eliminar
                </template>
                <template #body="slotProps">
                  <Button icon="pi pi-pencil" class="p-button-success p-mr-2" @click="editarSupervisor(slotProps.data)"></Button>
                  <Button icon="pi pi-trash" class="p-button-danger" @click="confirmarEliminacionSupervisor(slotProps.data)"></Button>
                </template>
              </Column>
            </DataTable>
          </div>
        </div>
      </div>
  
      <!-- Panel de edición -->
      <Dialog header="Editar Supervisor" :visible="editarDialogVisible" @hide="editarDialogVisible = false">
        <div>
          <div class="p-grid">
            <div class="p-col-12">
              <div class="p-fluid">
                <div class="p-field">
                  <label for="edit-nombre">Nombre</label>
                  <InputText id="edit-nombre" v-model="supervisorEdit.nombre" />
                </div>
                <br>
                <div class="p-field">
                  <label for="edit-cargo">Cargo</label>
                  <InputText id="edit-cargo" v-model="supervisorEdit.cargo" />
                </div>
                <br>
                <div class="p-field">
                  <label for="edit-telefono">Teléfono</label>
                  <InputText id="edit-telefono" v-model="supervisorEdit.telefono" readonly/>
                </div>
                <br>
                <div class="p-field">
                  <label for="edit-correo">Correo</label>
                  <InputText id="edit-correo" v-model="supervisorEdit.correo" readonly/>
                </div>
                <br>
                <!-- Agrega más campos según sea necesario -->
              </div>
            </div>
          </div>
          <div class="p-d-flex p-jc-end">
            <Button label="Cancelar" class="p-button-text" @click="cancelarEdicionSupervisor" />
            <Button label="Guardar" class="p-button-success" @click="guardarEdicionSupervisor" />
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
        supervisores: [],
        eliminarDialogVisible: false,
        editarDialogVisible: false,
        telefono_supervisor: '',
        correo_supervisor: '',
        confirmacionSupervisor: null,
        supervisorEdit: {
          nombre: '',
          cargo: '',
          telefono: '',
          correo: '',
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
          this.cargarSupervisores();
        })
        .catch(error => {
          console.error('Error al obtener el token JWT', error);
          if (error.response) {
            console.error('Respuesta del servidor:', error.response.data);
          }
        });
      },
  
      cargarSupervisores() {
        // Verificar que authToken no sea null antes de hacer la solicitud
        if (this.authToken) {
          // Modificar la URL para incluir el token JWT como parámetro de consulta
          axios.get(`http://localhost:8000/supervisor/ver-todos/?jsonwebtoken=${this.authToken}`)
            .then(response => {
              this.supervisores = response.data;
            })
            .catch(error => {
              console.error('Error al obtener los datos de la API', error);
            });
        }
      },
  
      confirmarEliminacionSupervisor(supervisor) {
        this.eliminarDialogVisible = true;
        this.confirmacionSupervisor = supervisor;
      },
  
      eliminarSupervisor() {
        if (this.confirmacionSupervisor) {
          const url = `http://localhost:8000/supervisor/delete/${this.confirmacionSupervisor.telefono}/${this.confirmacionSupervisor.correo}?jsonwebtoken=${this.authToken}`;
  
          axios.delete(url)
            .then(response => {
              if (response.status === 200) {
                this.cargarSupervisores();
                this.mostrarNotificacion("Eliminación exitosa", "El supervisor ha sido eliminado con éxito.", "success");
              }
            })
            .catch(error => {
              console.error('Error al eliminar el supervisor', error);
              this.mostrarNotificacion("Error", "No se pudo eliminar el supervisor.", "error");
            });
        }
        this.eliminarDialogVisible = false;
    },
    
    // Método para buscar supervisor por teléfono y correo
    buscarSupervisorPorTelefonoYCorreo() {
      if (this.telefono_supervisor || this.correo_supervisor) {
        const url = `http://localhost:8000/supervisor/ver1/${this.telefono_supervisor}/${this.correo_supervisor}?jsonwebtoken=${this.authToken}`;

      axios.get(url)
      .then(response => {
        this.supervisores = [response.data];
        this.showSuccessToastSupervisor("Supervisor encontrado!", "Supervisor encontrado con éxito.", "success");
      })
      .catch(error => {
        console.error('Error al buscar Supervisor', error);
        this.showValidationErrorSupervisor("Error", "No se pudo encontrar el Supervisor.", "error");
      });
      } else {
        this.showWarnToastSupervisor("Complete los campos de busqueda", "verifique los campos de entrada.", "warn");
      }
    },

    //Metodos para editar supervisor
    editarSupervisor(supervisor) {
      this.supervisorEdit = { ...supervisor };
      this.editarDialogVisible = true;
    },

    guardarEdicionSupervisor() {
    const url = `http://localhost:8000/supervisor/update/${this.supervisorEdit.telefono}/${this.supervisorEdit.correo}?jsonwebtoken=${this.authToken}`;

    axios.put(url, this.supervisorEdit)
    .then(response => {
      if (response.status === 200) {
        this.cargarSupervisores();
        this.showSuccessEditSupervisor(); // Mostrar mensaje de éxito
      }
    })
    .catch(error => {
      console.error('Error al editar el supervisor', error);
      this.showErrorEditSupervisor(); // Mostrar mensaje de error
    });

      this.editarDialogVisible = false;
    },

    cancelarEdicionSupervisor() {
      this.editarDialogVisible = false;
      this.supervisorEdit = {
      nombre: '',
      cargo: '',
      telefono: '',
      correo: '',
      };
    },

    showSuccessEditSupervisor() {
      this.showSuccessToastSupervisor("El supervisor ha sido editado con éxito.");
    },

    // Método para mostrar mensajes de error al editar supervisor
    showErrorEditSupervisor() {
      this.showErrorToastSupervisor("No se pudo editar el supervisor.");
    },


    showSuccessToastSupervisor(message) {
      this.$refs.toast.add({
        severity: 'success',
        summary: 'Éxito',
        detail: message,
        life: 3000,
      });
    },

    showValidationErrorSupervisor(message) {
      this.$refs.toast.add({
        severity: 'error',
        summary: 'Error de validación',
        detail: message,
        life: 5000, // Duración en milisegundos
      });
    },

    showWarnToastSupervisor(message) {
    this.$refs.toast.add({
      severity: 'warn',
      summary: 'Aviso',
      detail: message,
      life: 5000,
    });
  },

  /*
    Componentes VUE
    VUEX
    Vue Router
    API REST con FAST API
  */ 

  },
};
</script>

     
  