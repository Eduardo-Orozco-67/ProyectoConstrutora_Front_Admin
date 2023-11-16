<template>
    <div>
      <h1>Registrar de Proyecto</h1>
      <form @submit.prevent="submitForm" class="grid">
        <div class="col-6 md:6">
          <div class="card p-fluid">
            <div class="field col-9 md-6">
              <label for="id_empresa">ID de la Empresa:</label>
              <InputText id="id_empresa" type="number" v-model="formData.id_empresa" required />
            </div>
            <div class="field col-9 md-6">
              <label for="id_solicitud">ID de la Solicitud:</label>
              <InputText id="id_solicitud" type="number" v-model="formData.id_solicitud" required />
            </div>
            <div class="field col-9 md-6">
              <label for="fecha_inicio">Fecha de Inicio:</label>
              <InputText id="fecha_inicio" type="date" v-model="formData.fecha_inicio" required />
            </div>
            <div class="field col-9 md-6">
              <label for="fecha_fin">Fecha de Fin:</label>
              <InputText id="fecha_fin" type="date" v-model="formData.fecha_fin" required />
            </div>
            <div class="field col-9 md-6">
              <label for="monto">Monto:</label>
              <InputText id="monto" type="number" v-model="formData.monto" placeholder="Ejemplo: $50000.00" required />
            </div>
            <div class="field col-9 md-6">
              <label for="prioridad">Prioridad:</label>
              <InputText id="prioridad" type="text" v-model="formData.prioridad" required />
            </div>
            <div class="field col-9 md-6">
              <label for="porcentaje_avance">Porcentaje de Avance:</label>
              <InputText id="porcentaje_avance" type="number" v-model="formData.porcentaje_avance" required />
            </div>
            <div class="field col-9 md-6">
              <label for="estado_proyecto">Estado del Proyecto:</label>
              <Dropdown
                id="estado_proyecto"
                v-model="formData.estado_proyecto"
                :options="estadoProyectoOptions"
                optionLabel="label"
                optionValue="value"
                placeholder="Estado del proyecto"
                required
              />
            </div>
            <div class="field col-2 md-2">
              <Button label="Registrar" class="p-button-success mr-2 mb-2" />
            </div>
          </div>
        </div>
        <div class="col-6 md:6">
          <div class="card p-fluid">
            <img src="/ruta/de/imagen.png" alt="Logo representativo" />
          </div>
        </div>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        formData: {
          id_empresa: null,
          id_solicitud: null,
          fecha_inicio: "",
          fecha_fin: "",
          monto: null,
          prioridad: "",
          porcentaje_avance: null,
          estado_proyecto: null,
        },
        estadoProyectoOptions: [
          { label: "Aperturado", value: "aperturado" },
          { label: "Aceptado", value: "aceptado" },
          { label: "Cancelado", value: "cancelado" },
        ],
      };
    },
    methods: {
      submitForm() {
        // Aquí puedes enviar los datos al servidor para guardar en la base de datos
        // Por ejemplo, puedes utilizar Axios o Fetch para enviar una solicitud POST al servidor
        // y procesar los datos en el backend
        // Después de enviar los datos, puedes redirigir al usuario a otra página o mostrar un mensaje de éxito
        console.log("Datos a enviar:", this.formData);
      },
    },
  };
  </script>
  