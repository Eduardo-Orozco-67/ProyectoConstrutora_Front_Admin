<template>
  <div>
    <div class="p-grid">
      <div class="p-col-12">
        <div class="card">
          <Panel header="Registro de empresas" style="height: 100%">
            <!-- Agrega los campos de búsqueda y filtros aquí si es necesario -->
            <div class="p-grid">
              <div class="p-col-12 p-md-6">
                <InputText type="text" placeholder="Nombre de la empresa" v-model="nombreEmpresa" />
                <Button label="Buscar" icon="pi pi-search" @click="buscarEmpresaPorNombre" /> <!-- Modificado: Llama a buscarEmpresaPorNombre -->
              </div>
            </div>
            <!-- Aquí puedes agregar más filtros si es necesario -->
          </Panel>
          <DataTable :value="apiData" :paginator="true" :rows="5" :rowsPerPageOptions="[5, 10, 25]" responsiveLayout="scroll">
            <Column field="nombre" header="Nombre" :sortable="true"></Column>
            <Column field="direccion" header="Dirección" :sortable="true"></Column>
            <Column field="telefono" header="Teléfono" :sortable="true"></Column>
            <Column field="correo" header="Correo" :sortable="true"></Column>
            <Column style="width:150px">
              <template #header>
                Editar/eliminar registro
              </template>
              <template #body="slotProps">
                  <Button icon="pi pi-pencil" class="p-button-success p-mr-2" @click="editarEmpresa(slotProps.data)"></Button>
                  <Button icon="pi pi-trash" class="p-button-danger" @click="confirmarEliminacion(slotProps.data)"></Button>
              </template>
            </Column>
          </DataTable>
        </div>
      </div>
    </div>
    <Dialog header="Confirmar eliminación" :visible="eliminarDialogVisible" @hide="eliminarDialogVisible = false">
      <div>
        ¿Estás seguro de que deseas eliminar esta empresa?
      </div>
      <div class="p-d-flex p-jc-end">
        <Button label="Cancelar" class="p-button-text" @click="eliminarDialogVisible = false" />
        
        <Button label="Eliminar" class="p-button-danger" @click="eliminarEmpresa" /> <!-- Modificado: Llama a eliminarEmpresa en lugar de confirmarEliminacion -->
      </div>
    </Dialog>

    <!-- Panel de edición -->
    <Dialog header="Editar empresa" :visible="editarDialogVisible" @hide="editarDialogVisible = false">
      <div>
        <div class="p-grid">
          <div class="p-col-12">
            <div class="p-fluid">
              <div class="p-field">
                <label for="edit-nombre">Nombre</label>
                <InputText id="edit-nombre" v-model="empresaEdit.nombre" readonly/>
              </div>
              <br>
              <div class="p-field">
                <label for="edit-direccion">Dirección</label>
                <InputText id="edit-direccion" v-model="empresaEdit.direccion" />
              </div>
              <br>
              <div class="p-field">
                <label for = "edit-telefono">Teléfono</label>
                <InputText id="edit-telefono" v-model="empresaEdit.telefono" />
              </div>
              <br>
              <div class="p-field">
                <label for="edit-correo">Correo</label>
                <InputText id="edit-correo" v-model="empresaEdit.correo" />
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
      apiData: [],
      eliminarDialogVisible: false,
      editarDialogVisible: false,
      nombreEmpresa: '',
      confirmacionEmpresa: null,
      empresaEdit: {
        nombre: '',
        direccion: '',
        telefono: '',
        correo: '',
      },
      // Nuevo estado para almacenar el token JWT
      authToken: null,
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

  cargarEmpresas() {
    // Verificar que authToken no sea null antes de hacer la solicitud
    if (this.authToken) {
      // Modificar la URL para incluir el token JWT como parámetro de consulta
      axios.get(`https://api-constructora.onrender.com/empresa/ver-todas?jsonwebtoken=${this.authToken}`)
        .then(response => {
          this.apiData = response.data;
        })
        .catch(error => {
          console.error('Error al obtener los datos de la API', error);
        });
    }
  },

    // Nueva función para cargar datos de una ruta protegida
    cargarDatosProtegidos() {
    // Modificar la URL para incluir el token JWT como parámetro de consulta
    axios.get(`https://api-constructora.onrender.com/protected-route?jsonwebtoken=${this.authToken}`)
      .then(response => {
        console.log('Datos de la ruta protegida:', response.data);
        // Hacer algo con los datos obtenidos de la ruta protegida
      })
      .catch(error => {
        console.error('Error al cargar datos de la ruta protegida', error);
      });
    },

    confirmarEliminacion(empresa) {
      this.eliminarDialogVisible = true;
      this.confirmacionEmpresa = empresa;
    },
    eliminarEmpresa() {
    if (this.confirmacionEmpresa && this.authToken) {
      axios.delete(`https://api-constructora.onrender.com/empresa/delete/${this.confirmacionEmpresa.nombre}?jsonwebtoken=${this.authToken}`)
        .then(response => {
          if (response.status === 200) {
            this.cargarEmpresas();
            this.mostrarNotificacion("Eliminación exitosa", "La empresa ha sido eliminada con éxito.", "success");
          }
        })
        .catch(error => {
          console.error('Error al eliminar la empresa', error);
          this.mostrarNotificacion("Error", "No se pudo eliminar la empresa.", "error");
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

    buscarEmpresaPorNombre() {
    if (this.nombreEmpresa && this.authToken) {
      axios.get(`https://api-constructora.onrender.com/empresa/ver1/${this.nombreEmpresa}?jsonwebtoken=${this.authToken}`)
        .then(response => {
          this.apiData = [response.data];
          this.mostrarNotificacion("Empresa encontrada!", "Empresa encontrada con éxito.", "success");
        })
        .catch(error => {
          console.error('Error al buscar empresa por nombre', error);
          this.mostrarNotificacion("Error", "No se pudo encontrar la empresa.", "error");
        });
    } else {
      this.mostrarNotificacion("Advertencia", "Ingrese un nombre de empresa para buscar.", "warn");
    }
    },

    editarEmpresa(empresa) {
      this.empresaEdit = { ...empresa }; // Clonar la empresa para la edición
      this.editarDialogVisible = true;
    },
    cancelarEdicion() {
      this.editarDialogVisible = false;
      this.empresaEdit = { // Restablecer los campos de edición
        nombre: '',
        direccion: '',
        telefono: '',
        correo: '',
      };
    },

    guardarEdicion() {
    if (this.empresaEdit && this.authToken) {
      axios.put(`https://api-constructora.onrender.com/empresa/update/${this.empresaEdit.nombre}?jsonwebtoken=${this.authToken}`, this.empresaEdit)
        .then(response => {
          if (response.status === 200) {
            this.cargarEmpresas();
            this.editarDialogVisible = false;
            this.mostrarNotificacion("Actualización exitosa", "La empresa ha sido actualizada con éxito.", "success");
          }
        })
        .catch(error => {
          console.error('Error al actualizar la empresa', error);
          this.mostrarNotificacion("Error", "No se pudo actualizar la empresa.", "error");
        });
    }
    },

  },
};
</script>