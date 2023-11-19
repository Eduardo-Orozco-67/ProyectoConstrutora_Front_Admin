
<template>
    <div class="grid">
        <div class="col-12 lg:col-6 xl:col-3">
            <div class="card mb-0">
                <div class="flex justify-content-between mb-3">
                    <div>
                        <span class="block text-500 font-medium mb-3">Clientes</span>
                        <div class="text-900 font-medium text-xl">0</div>
                    </div>
                    <div class="flex align-items-center justify-content-center bg-blue-100 border-round" style="width: 2.5rem; height: 2.5rem">
                        <i class="pi pi-user text-blue-500 text-xl"></i>
                    </div>
                </div>
                <span class="text-green-500 font-medium">0 nuevos </span>
                <span class="text-500">desde la última visita</span>
            </div>
        </div>


        <div class="col-12 lg:col-6 xl:col-3">
            <div class="card mb-0">
                <div class="flex justify-content-between mb-3">
                    <div>
                        <span class="block text-500 font-medium mb-3">Usuarios conectados</span>
                        <div class="text-900 font-medium text-xl">0</div>
                    </div>
                    <div class="flex align-items-center justify-content-center bg-cyan-100 border-round" style="width: 2.5rem; height: 2.5rem">
                        <i class="pi pi-eye text-cyan-500 text-xl"></i>
                    </div>
                </div>
                <span class="text-green-500 font-medium">0 </span>
                <span class="text-500">Recientemente</span>
            </div>
        </div>
        
        <div class="col-12 xl:col-12">
            <div class="card">
                <h5>Solicitudes en espera</h5>
                <DataTable :value="solicitudes" :paginator="true" :rows="5" :rowsPerPageOptions="[5, 10, 25]" responsiveLayout="scroll">
                    <Column field="id_solicitud" header="ID Solicitud" :sortable="true"></Column>
                    <Column field="nombre_empresa" header="Nombre de empresa" :sortable="true"></Column>
                    <Column field="fecha" header="Fecha" :sortable="true"></Column>
                    <Column field="monto_presupuesto" header="Monto de Presupuesto" :sortable="true">
                    <template #body="slotProps">{{ formatCurrency(slotProps.data.monto_presupuesto) }}</template>
                    </Column>
                    <Column field="monto_anticipo" header="Monto de Anticipo" :sortable="true">
                    <template #body="slotProps">{{ formatCurrency(slotProps.data.monto_anticipo) }}</template>
                    </Column>
                    <Column field="folio_solicitud" header="Folio de Solicitud" :sortable="true"></Column>
                    <Column field="estado" header="Estado" :sortable="true"></Column>
                    <Column style="width:150px">
                    <template #header>
                        Aceptar/Rechazar Solicitud
                    </template>
                    <template #body="slotProps">
                        <Button icon="pi pi-check-circle" class="p-button-success p-mr-2" @click="aceptarSolicitud(slotProps.data)"></Button>
                        <Button icon="pi pi-ban" class="p-button-danger" @click="rechazarSolicitud(slotProps.data)"></Button>
                        </template>
                    </Column>
                </DataTable>
            </div>
        </div>

        <div class="col-12 xl:col-12">
            <div class="card">
                <h5>Proyectos con mas del 50% de avance</h5>
                <DataTable :value="reporte1" :paginator="true" :rows="5" :rowsPerPageOptions="[5, 10, 25]" responsiveLayout="scroll">
                    <Column field="id_solicitud" header="ID Solicitud" :sortable="true"></Column>
                    <Column field="nombre_empresa" header="Nombre de empresa" :sortable="true"></Column>
                    <Column field="fecha" header="Fecha" :sortable="true"></Column>
                    <Column field="monto_presupuesto" header="Monto de Presupuesto" :sortable="true">
                    <template #body="slotProps">{{ formatCurrency(slotProps.data.monto_presupuesto) }}</template>
                    </Column>
                    <Column field="monto_anticipo" header="Monto de Anticipo" :sortable="true">
                    <template #body="slotProps">{{ formatCurrency(slotProps.data.monto_anticipo) }}</template>
                    </Column>
                    <Column field="folio_solicitud" header="Folio de Solicitud" :sortable="true"></Column>
                    <Column field="estado" header="Estado" :sortable="true"></Column>
                    <Column field="descripcion_solicitud" header="Descripción de Solicitud" :sortable="true"></Column>
                    <Column field="costo_solicitud" header="Costo de Solicitud" :sortable="true">
                    <template #body="slotProps">{{ formatCurrency(slotProps.data.costo_solicitud) }}</template>
                    </Column>
                </DataTable>
            </div>
        </div>

        <div class="col-12 xl:col-12">
            <div class="card">
                <h5>Proyectos aceptados</h5>
                <DataTable :value="reporte2" :paginator="true" :rows="5" :rowsPerPageOptions="[5, 10, 25]" responsiveLayout="scroll">
                <Column field="id_solicitud" header="ID Solicitud" :sortable="true"></Column>
                <Column field="nombre_empresa" header="Nombre de empresa" :sortable="true"></Column>
                <Column field="fecha" header="Fecha" :sortable="true"></Column>
                <Column field="monto_presupuesto" header="Monto de Presupuesto" :sortable="true">
                <template #body="slotProps">{{ formatCurrency(slotProps.data.monto_presupuesto) }}</template>
                </Column>
                <Column field="monto_anticipo" header="Monto de Anticipo" :sortable="true">
                    <template #body="slotProps">{{ formatCurrency(slotProps.data.monto_anticipo) }}</template>
                </Column>
                <Column field="folio_solicitud" header="Folio de Solicitud" :sortable="true"></Column>
                <Column field="estado" header="Estado" :sortable="true"></Column>
                <Column field="descripcion_solicitud" header="Descripción de Solicitud" :sortable="true"></Column>
                <Column field="costo_solicitud" header="Costo de Solicitud" :sortable="true">
                    <template #body="slotProps">{{ formatCurrency(slotProps.data.costo_solicitud) }}</template>
                </Column>
                <Column header="Servicios" :sortable="false">
                <template #body="slotProps">
                <ul>
                    <li v-for="servicio in slotProps.data.servicios">
                {{ servicio.servicio }} - {{ servicio.descripcion_servicio }}
                    </li>
                </ul>
                </template>
                </Column>
                </DataTable>
            </div>
        </div>

        <div class="col-12 xl:col-12">
            <div class="card">
                <h5>Proyectos con prioridad Alta</h5>
                <DataTable :value="reporte3" :paginator="true" :rows="5" :rowsPerPageOptions="[5, 10, 25]" responsiveLayout="scroll">
                <Column field="id_solicitud" header="ID Solicitud" :sortable="true"></Column>
                <Column field="nombre_empresa" header="Nombre de empresa" :sortable="true"></Column>
                <Column field="fecha" header="Fecha" :sortable="true"></Column>
                <Column field="monto_presupuesto" header="Monto de Presupuesto" :sortable="true">
                <template #body="slotProps">{{ formatCurrency(slotProps.data.monto_presupuesto) }}</template>
                </Column>
                <Column field="monto_anticipo" header="Monto de Anticipo" :sortable="true">
                    <template #body="slotProps">{{ formatCurrency(slotProps.data.monto_anticipo) }}</template>
                </Column>
                <Column field="folio_solicitud" header="Folio de Solicitud" :sortable="true"></Column>
                <Column field="estado" header="Estado" :sortable="true"></Column>
                <Column field="descripcion_solicitud" header="Descripción de Solicitud" :sortable="true"></Column>
                <Column field="costo_solicitud" header="Costo de Solicitud" :sortable="true">
                    <template #body="slotProps">{{ formatCurrency(slotProps.data.costo_solicitud) }}</template>
                </Column>
                <Column header="Servicios" :sortable="false">
                <template #body="slotProps">
                <ul>
                    <li v-for="servicio in slotProps.data.servicios">
                {{ servicio.servicio }} - {{ servicio.descripcion_servicio }}
                    </li>
                </ul>
                </template>
                </Column>
                </DataTable>
            </div>
        </div>

        <div class="col-12 xl:col-6">
            
            
        </div>
        <Toast ref="toast" />
    </div>
</template>



<script setup>
import { onMounted, ref} from 'vue';
import axios from 'axios';
import { useToast } from 'primevue/usetoast';


//ejemplo de solicitudes
const toast = ref(null);
const solicitudes = ref([]);
const reporte1 = ref([]);
const reporte2 = ref([]);
const reporte3 = ref([]);
const authToken = ref(null);

const cargarSolicitudes = async () => {
  try {
    const response = await axios.get(`https://api-constructora.onrender.com/solicitud_proyecto/ver-todas?jsonwebtoken=${authToken.value}`);
    solicitudes.value = response.data.filter(solicitud => {
      return solicitud.estado === 'en espera';
    });
  } catch (error) {
    console.error('Error al obtener los datos de la API', error);
  }
};

const cargarReporte1 = async () => {
  try {
    const response = await axios.get(`https://api-constructora.onrender.com/reportes/proyectos-50/?jsonwebtoken=${authToken.value}`);
    reporte1.value = response.data
  } catch (error) {
    console.error('Error al obtener los datos de la API', error);
  }
};

const cargarReporte2 = async () => {
  try {
    const response = await axios.get(`https://api-constructora.onrender.com/reportes/proyectos-aceptados/?jsonwebtoken=${authToken.value}`);
    reporte2.value = response.data
  } catch (error) {
    console.error('Error al obtener los datos de la API', error);
  }
};

const cargarReporte3 = async () => {
  try {
    const response = await axios.get(`https://api-constructora.onrender.com/reportes/proyectos-prioridad/?jsonwebtoken=${authToken.value}`);
    reporte3.value = response.data
  } catch (error) {
    console.error('Error al obtener los datos de la API', error);
  }
};

const obtenerToken = async () => {
  const credentials = {
    username: 'admin',
    password: 'secretaacces123',
  };

  try {
    const response = await axios.post(
      'https://api-constructora.onrender.com/token',
      {
        username: credentials.username,
        password: credentials.password,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    authToken.value = response.data.access_token;
    axios.defaults.headers.common['Authorization'] = `Bearer ${authToken.value}`;
    cargarSolicitudes();
    cargarReporte1();
    cargarReporte2();
    cargarReporte3();
  } catch (error) {
    console.error('Error al obtener el token JWT', error);
    if (error.response) {
      console.error('Respuesta del servidor:', error.response.data);
    }
  }
};

onMounted(() => {
  obtenerToken();
  toast.value = ref("toast");
});

//datos mostrados en la datatable de solicitudes

const formatCurrency = (value) => {
    return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
};

// Nuevos métodos para aceptar y rechazar solicitudes
const mostrarNotificacion = (summary, detail, severity) => {
  if (toast.value) {
    toast.value.add({
      severity,
      summary,
      detail,
      life: 5000,
    });
  }
};

const aceptarSolicitud = async (solicitud) => {
  const folioSolicitud = solicitud.folio_solicitud;
  const estado = encodeURIComponent('aceptado');
  try {
    const response = await axios.patch(`https://api-constructora.onrender.com/solicitud_proyecto/actualizar-estado/${folioSolicitud}?estado=${estado}&jsonwebtoken=${authToken.value}`);
    console.log('Aceptar solicitud:', solicitud);
    console.log('Respuesta de la API:', response.data);
    cargarSolicitudes();
    mostrarNotificacion('Solicitud aceptada', 'La solicitud ha sido aceptada', 'success');
  } catch (error) {
    console.error('Error al aceptar la solicitud', error);
    mostrarNotificacion('Error', 'No se pudo aceptar la solicitud', 'error');
  }
};

const rechazarSolicitud = async (solicitud) => {
  const folioSolicitud = solicitud.folio_solicitud;
  const estado = encodeURIComponent('rechazado');
  try {
    const response = await axios.patch(`https://api-constructora.onrender.com/solicitud_proyecto/actualizar-estado/${folioSolicitud}?estado=${estado}&jsonwebtoken=${authToken.value}`);
    console.log('Rechazar solicitud:', solicitud);
    console.log('Respuesta de la API:', response.data);
    cargarSolicitudes();
    mostrarNotificacion('Solicitud rechazada', 'La solicitud ha sido rechazada', 'error');
  } catch (error) {
    console.error('Error al rechazar la solicitud', error);
    mostrarNotificacion('Error', 'No se pudo rechazar la solicitud', 'error');
  }
};


</script>