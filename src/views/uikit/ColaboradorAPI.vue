<template>
    <div>
      <div class="p-grid">
        <div class="p-col-12">
          <div class="card">
            <Panel header="Colaboradores registrados" style="height: 100%">
              <div class="p-grid">
                <div class="p-col-12 p-md-8">
                  <InputText type="text" placeholder="Teléfono del Colaborador" v-model="telefono_colaborador" />
                  <InputText type="text" placeholder="Correo del Colaborador" v-model="correo_colaborador" />
                  <Button label="Buscar" icon="pi pi-search" @click="buscarColaboradorPorTelefonoYCorreo" />
                </div>
              </div>
            </Panel>
            <DataTable :value="colaboradores" :paginator="true" :rows="5" :rowsPerPageOptions="[5, 10, 25]" responsiveLayout="scroll">
                <Column field="id_supervisor" header="ID supervisor" :sortable="true" style="width: 25%"></Column>
                <Column field="nombre" header="Nombre" :sortable="true" style="width: 25%"></Column>
                <Column field="cargo" header="Cargo" :sortable="true" style="width: 25%"></Column>
                <Column field="telefono" header="Teléfono" :sortable="true" style="width: 25%"></Column>
                <Column field="correo" header="Correo" :sortable="true" style="width: 25%"></Column>
                <Column style="width:150px">
                <template #header>
                  Editar/Eliminar
                </template>
                <template #body="slotProps">
                  <Button icon="pi pi-pencil" class="p-button-success p-mr-2" @click="editarColaborador(slotProps.data)"></Button>
                  <Button icon="pi pi-trash" class="p-button-danger" @click="confirmarEliminacionColaborador(slotProps.data)"></Button>
                </template>
              </Column>
            </DataTable>
          </div>
        </div>
      </div>
  
      <Dialog header="Editar Colaborador" :visible="editarDialogVisible" @hide="editarDialogVisible = false">
        <div>
          <div class="p-grid">
            <div class="p-col-12">
              <div class="p-fluid">
                <div class="p-field">
                  <label for="edit-nombre">Nombre</label>
                  <InputText id="edit-nombre" v-model="colaboradorEdit.nombre" />
                </div>
                <br>
                <div class="p-field">
                  <label for="edit-cargo">Cargo</label>
                  <InputText id="edit-cargo" v-model="colaboradorEdit.cargo" />
                </div>
                <br>
                <div class="p-field">
                  <label for="edit-telefono">Teléfono</label>
                  <InputText id="edit-telefono" v-model="colaboradorEdit.telefono" readonly/>
                </div>
                <br>
                <div class="p-field">
                  <label for="edit-correo">Correo</label>
                  <InputText id="edit-correo" v-model="colaboradorEdit.correo" readonly/>
                </div>
                <br>
              </div>
            </div>
          </div>
          <div class="p-d-flex p-jc-end">
            <Button label="Cancelar" class="p-button-text" @click="cancelarEdicionColaborador" />
            <Button label="Guardar" class="p-button-success" @click="guardarEdicionColaborador" />
          </div>
        </div>
      </Dialog>
  
      <Dialog header="Eliminar Colaborador" :visible="eliminarDialogVisible" @hide="eliminarDialogVisible = false">
        <div>
          <p>¿Está seguro de que desea eliminar este colaborador?</p>
          <div class="p-d-flex p-jc-end">
            <Button label="Cancelar" class="p-button-text" @click="cancelarEliminacionColaborador" />
            <Button label="Eliminar" class="p-button-danger" @click="eliminarColaborador" />
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
        colaboradores: [],
        eliminarDialogVisible: false,
        editarDialogVisible: false,
        telefono_colaborador: '',
        correo_colaborador: '',
        confirmacionColaborador: null,
        colaboradorEdit: {
          id_supervisor: null,
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
      this.cargarColaboradores();
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
          this.cargarColaboradores();
        })
        .catch(error => {
          console.error('Error al obtener el token JWT', error);
          if (error.response) {
            console.error('Respuesta del servidor:', error.response.data);
          }
        });
      },
  
      cargarColaboradores(){
        if (this.authToken) {
          axios.get(`http://localhost:8000/colaborador/ver-todos/?jsonwebtoken=${this.authToken}`)
            .then(response => {
              this.colaboradores = response.data;
            })
            .catch(error => {
              console.error('Error al obtener los datos de la API', error);
            });
        }
      },
  
      confirmarEliminacionColaborador(colaborador) {
        this.eliminarDialogVisible = true;
        this.confirmacionColaborador = colaborador;
      },
  
      eliminarColaborador() {
        if (this.confirmacionColaborador) {
          const url = `http://localhost:8000/colaborador/delete/${this.confirmacionColaborador.telefono}/${this.confirmacionColaborador.correo}?jsonwebtoken=${this.authToken}`;

            axios.delete(url)
                .then(response => {
                if (response.status === 200) {
                    this.cargarColaboradores();
                    this. showSuccessDeleteColaborador();
                }
            })
            .catch(error => {
                console.error('Error al eliminar el colaborador', error);
                this.showErrorDeleteColaborador();
            });
        }
        this.eliminarDialogVisible = false;
    },

// Métodos para editar y guardar colaborador
editarColaborador(colaborador) {
  this.colaboradorEdit = { ...colaborador };
  this.editarDialogVisible = true;
},

guardarEdicionColaborador() {
  const url = `http://localhost:8000/colaborador/update/${this.colaboradorEdit.telefono}/${this.colaboradorEdit.correo}?jsonwebtoken=${this.authToken}`;

  axios.put(url, this.colaboradorEdit)
    .then(response => {
      if (response.status === 200) {
        this.cargarColaboradores();
        this.showSuccessEditColaborador(); // Mostrar mensaje de éxito
      }
    })
    .catch(error => {
      console.error('Error al editar el colaborador', error);
      this.showErrorEditColaborador(); // Mostrar mensaje de error
    });

  this.editarDialogVisible = false;
},

cancelarEdicionColaborador() {
  this.editarDialogVisible = false;
  this.colaboradorEdit = {
    id_supervisor: null,
    nombre: '',
    cargo: '',
    telefono: '',
    correo: '',
  };
},

cancelarEliminacionColaborador() {
    this.eliminarDialogVisible = false;
    this.confirmacionColaborador = null;
  },

// Métodos para buscar colaboradores por teléfono y correo
buscarColaboradorPorTelefonoYCorreo() {
      if (this.telefono_colaborador || this.correo_colaborador) {
        const url = `http://localhost:8000/colaborador/ver1/${this.telefono_colaborador}/${this.correo_colaborador}?jsonwebtoken=${this.authToken}`;

      axios.get(url)
      .then(response => {
        this.colaboradores = [response.data];
        this.showSuccessToastColaborador("Colaborador encontrado!", "Colaborador encontrado con éxito.", "success");
      })
      .catch(error => {
        console.error('Error al buscar Colaborador', error);
        this.showErrorToastColaborador("Error", "No se pudo encontrar el Colaborador.", "error");
      });
      } else {
        this.showWarnToastColaborador("Complete los campos de busqueda", "verifique los campos de entrada.", "warn");
      }
    },

showSuccessToastColaborador(message) {
    this.$refs.toast.add({
      severity: 'success',
      summary: 'Éxito',
      detail: message,
      life: 3000,
    });
  },

  showErrorToastColaborador(message) {
    this.$refs.toast.add({
      severity: 'error',
      summary: 'Error',
      detail: message,
      life: 5000,
    });
  },
  showWarnToastColaborador(message) {
    this.$refs.toast.add({
      severity: 'warn',
      summary: 'Aviso',
      detail: message,
      life: 5000,
    });
  },

  // Método para mostrar mensajes de éxito al editar colaborador
  showSuccessEditColaborador() {
    this.showSuccessToastColaborador("El colaborador ha sido editado con éxito.");
  },

  // Método para mostrar mensajes de error al editar colaborador
  showErrorEditColaborador() {
    this.showErrorToastColaborador("No se pudo editar el colaborador.");
  },

  // Método para mostrar mensajes de éxito al eliminar colaborador
  showSuccessDeleteColaborador() {
    this.showSuccessToastColaborador("El colaborador ha sido eliminado con éxito.");
  },

  // Método para mostrar mensajes de error al eliminar colaborador
  showErrorDeleteColaborador() {
    this.showErrorToastColaborador("No se pudo eliminar el colaborador.");
  },

// Mostrar notificación con PrimeVue Toast
mostrarNotificacion(resumen, detalle, tipo) {
this.$refs.toast.show({ severity: tipo, summary: resumen, detail: detalle });
},


},
};
</script>

  