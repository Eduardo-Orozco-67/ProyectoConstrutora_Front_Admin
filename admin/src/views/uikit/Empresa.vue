<template>
    <div>
      <h1>Registro de Empresa</h1>
      <form @submit.prevent="submitForm" class="grid">
        <div class="col-6 md:6">
          <div class="card p-fluid">
            <div class="field col-9 md:6">
              <label for="nombre">Nombre de la empresa:</label>
              <InputText id="nombre" type="text" placeholder="Empresa" v-model="formData.nombre" required />
            </div>
            <div class="field col-9 md:6">
              <label for="direccion">Dirección:</label>
              <InputText id="direccion" type="text" placeholder="Calle Principal 123" v-model="formData.direccion" required />
            </div>
            <div class="field col-9 md:6">
              <label for="telefono">Teléfono:</label>
              <InputText id="telefono" type="tel" placeholder="9614567890" v-model="formData.telefono" required />
            </div>
            <div class="field col-9 md:6">
              <label for="correo">Correo electronico:</label>
              <InputText id="correo" type="email" placeholder="ejemplo@correo.com" v-model="formData.correo" required />
            </div>
            <div class="field col-2 md:12">
                <Button label="Success" class="p-button-success mr-2 mb-2" />
            </div>
          </div>
        </div>

        <div class="col-6 md:6">
            <div class="card p-fluid">
                <img src="/ruta/de/imagen.png" alt="Logo de la Empresa" />
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
          nombre: "",
          direccion: "",
          telefono: "",
          correo: "",
        },
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
  