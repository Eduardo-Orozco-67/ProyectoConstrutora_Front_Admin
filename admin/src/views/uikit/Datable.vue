<template>
    <div class="p-grid">
      <div class="p-col-12">
        <div class="card">
          <Panel header="PUNTO DE VENTA (POS)" style="height: 100%">
            <Toolbar class="p-mb-4">
              <template v-slot:start>
                <InputText type="text" size="40" placeholder="Nombre del producto..." v-model="productoItem.nomProducto" />
                <InputText type="text" placeholder="Cant" v-model="productoItem.cantidad" />
                <InputText type="text" placeholder="$ Precio U." v-model="productoItem.precioUnitario" />
              </template>
              <template v-slot:end>
                <Button v-if="editando" label="Guardar Cambios" icon="pi pi-check" class="p-button-primary p-mr-2" @click="guardarCambios" />
                <!-- Botón de Registrar con la propiedad disabled vinculada a nuevoRegistro -->
              <Button label="Registrar" icon="pi pi-plus" class="p-button-success p-mr-2" @click="registrarCompra" :disabled="!nuevoRegistro"/>
              </template>
            </Toolbar>
            <br>
            <DataTable :value="tablaCompras" v-model:selection="productoItem" class="p-datatable-gridlines" dataKey="cns" :rows="5"
              paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
              :rowsPerPageOptions="[5, 10, 25]"
              currentPageReportTemplate="Visualizando {last} de {totalRecords} productos"
              style="margin-bottom: 20px" :paginator="true" responsiveLayout="scroll">
              <Column field="cns" header="Cns" :sortable="true" style="width:50px"></Column>
              <Column field="nomProducto" header="Nombre del Producto" style="width:370px"></Column>
              <Column field="precioUnitario" header="Precio U." dataType="numeric" style="width:80px">
                <template #body="slotProps">
                  {{ formatoMoneda(slotProps.data.precioUnitario) }}
                </template>
              </Column>
              <Column field="cantidad" header="Cant." style="width:60px;text-align:center"></Column>
              <Column field="precioParcial" header="Precio P." style="width:80px">
                <template #body="slotProps">
                  {{ formatoMoneda(slotProps.data.precioParcial) }}
                </template>
              </Column>
              <Column style="width:140px">
                <template #header>
                  Acciones
                </template>
                <template #body="slotProps">
                  <Button icon="pi pi-pencil" type="button" class="p-button-success p-mr-2 p-mb-1" @click="editarProductos(slotProps.data)"></Button>
                  <Button icon="pi pi-trash" type="button" class="p-button-danger p-mb-1" @click="confirmarEliminacion(slotProps.data)"></Button>
                </template>
              </Column>
            </DataTable>
            <br>
            <Toolbar class="p-mb-4">
              <template v-slot:start></template>
              <template v-slot:end>
                <label for="subtotal">Subtotal: </label>
                <InputText id="subtotal" type="text" placeholder="$ " :value="formatoMoneda(subtotal)" readonly />
                <label for="iva">IVA (16%): </label>
                <InputText id="iva" type="text" placeholder="$ " :value="formatoMoneda(iva)" readonly />
                <label for="total">Total: </label>
                <InputText id="total" type="text" placeholder="$ " :value="formatoMoneda(total)" readonly />
              </template>
            </Toolbar>
          </Panel>
          <Dialog header="Confirmar eliminación" :visible="eliminarDialogVisible" @hide="eliminarDialogVisible = false">
            <div>
              ¿Estás seguro de que deseas eliminar este producto?
            </div>
            <div class="p-d-flex p-jc-end">
              <Button label="Cancelar" class="p-button-text" @click="eliminarDialogVisible = false" />
              <Button label="Eliminar" class="p-button-danger" @click="eliminarProducto(productoItem)" />
            </div>
          </Dialog>
          <Toast ref="toast" />
        </div>
      </div>
    </div>
  </template>
  
  

<script>
export default {
  data() {
    return {
      tablaCompras: 
      [
        {"cns": 1, "nomProducto": "Impresora LaserJet Color", "cantidad": 2, "precioUnitario": 5200.00, "precioParcial": 10400.00},
		{"cns": 2, "nomProducto": "Monitor LED 31 plg.", "cantidad": 3, "precioUnitario": 1700.00, "precioParcial": 5100.00}
      ],
      productoItem: {
        cns: null,
        nomProducto: null,
        cantidad: null,
        precioUnitario: null,
        precioParcial: null
      },
      totalCompra: 0,
      eliminarDialogVisible: false,
      editando: false,
      nuevoRegistro: true
    };
  },
  computed: {
    subtotal() {
      return this.tablaCompras.reduce((total, producto) => total + (producto.precioParcial || 0), 0);
    },
    iva() {
      return this.subtotal * 0.16;
    },
    total() {
      return this.subtotal + this.iva;
    }
  },
  watch: {
    'productoItem.cantidad': 'actualizarSubtotalIvaTotal',
    'productoItem.precioUnitario': 'actualizarSubtotalIvaTotal'
  },
  methods: {
    formatoMoneda(value) {
      if (value) {
        return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
      }
      return '';
    },
    registrarCompra() {
      if (this.productoItem.nomProducto && this.productoItem.cantidad && this.productoItem.precioUnitario) {
        this.productoItem.cns = this.tablaCompras.length + 1;
        this.productoItem.precioParcial = this.productoItem.cantidad * this.productoItem.precioUnitario;
        this.tablaCompras.push({ ...this.productoItem });
        this.limpiarCamposEntrada();
        this.$refs.toast.add({ severity: 'success', summary: 'Confirmación', detail: 'Nueva compra registrada', life: 3000 });
      }
    },
    editarProductos(producto) {
        this.editando = true;
      this.productoItem.cns = producto.cns;
      this.productoItem.nomProducto = producto.nomProducto;
      this.productoItem.cantidad = producto.cantidad;
      this.productoItem.precioUnitario = producto.precioUnitario;
      this.productoItem.precioParcial = producto.precioParcial;
      this.nuevoRegistro = false;  // Desactiva el botón + Registrar
    },
    confirmarEliminacion(producto) {
      this.productoItem = { ...producto };
      this.eliminarDialogVisible = true;
    },
    eliminarProducto(producto) {
      const index = this.tablaCompras.findIndex(p => p.cns === producto.cns);
      if (index !== -1) {
        this.tablaCompras.splice(index, 1);
        this.actualizarTotalCompra();
        this.eliminarDialogVisible = false;
        this.$refs.toast.add({ severity: 'success', summary: 'Confirmación', detail: 'Producto eliminado', life: 3000 });
      }
    },
    guardarCambios() {
      const index = this.tablaCompras.findIndex(p => p.cns === this.productoItem.cns);
      if (index !== -1) {
        this.tablaCompras[index] = { ...this.productoItem };
        this.actualizarTotalCompra();
        this.limpiarCamposEntrada();
        this.editando = false;
        this.$refs.toast.add({ severity: 'success', summary: 'Confirmación', detail: 'Cambios guardados', life: 3000 });

        // Desactiva el modo de edición y habilita el botón + Registrar
      this.editando = false;
      this.nuevoRegistro = true;  // Habilita el botón + Registrar
      }
    },
    actualizarTotalCompra() {
      this.totalCompra = this.tablaCompras.reduce((total, producto) => total + (producto.precioParcial || 0), 0);
    },
    limpiarCamposEntrada() {
      this.productoItem.cns = null;
      this.productoItem.nomProducto = '';
      this.productoItem.cantidad = null;
      this.productoItem.precioUnitario = null;
      this.productoItem.precioParcial = null;
    },
    actualizarSubtotalIvaTotal() {
      const cantidad = parseFloat(this.productoItem.cantidad);
      const precioUnitario = parseFloat(this.productoItem.precioUnitario);
      if (!isNaN(cantidad) && !isNaN(precioUnitario)) {
        this.productoItem.precioParcial = cantidad * precioUnitario;
      } else {
        this.productoItem.precioParcial = null;
      }
    }
  }
};
</script>