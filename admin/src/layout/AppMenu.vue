
<script setup>
import { ref } from 'vue';

import AppMenuItem from './AppMenuItem.vue';

const model = ref([
    {
        label: 'Principal',
        items: [{ label: 'Inicio', icon: 'pi pi-fw pi-home', to: '/', selected: false}]
    },
    {
        label: 'Apartados',
        items: [
        {
            label: 'Empresas',
                icon: 'pi pi-fw pi-building',
                selected: false,
                items: [
                    {
                        label: 'Empresas registradas',
                        icon: 'pi pi-fw pi-verified',
                        selected: false,
                        to: '/uikit/EmpresaAPI'
                    },
                    {
                        label: 'Registrar empresa',
                        icon: 'pi pi-fw pi-file-edit',
                        to: '/uikit/list',
                        selected: false // Agregar una propiedad para rastrear la selección
                    }
                ]
            },
            { 
                label: 'Solicitudes', 
                icon: 'pi pi-fw pi-check-square',  
                items: [
                    {
                        label: 'Solicitudes de proyectos',
                        icon: 'pi pi-fw pi-clock',
                        selected: false,
                        to: '/uikit/SolicitudesAPI'
                    },
                    {
                        label: 'Crear solicitud',
                        icon: 'pi pi-fw pi-file-edit',
                        to: '/uikit/InvalidState',
                        selected: false // Agregar una propiedad para rastrear la selección
                    },
                    {
                        label: 'Agregar detalles de solicitudes',
                        icon: 'pi pi-fw pi-book',
                        selected: false,
                        to: '/uikit/DetalleSolicitud'
                    },
                    {
                        //Se agrego detalle de servicio
                        label: 'Agregar servicio a solicitudes',
                        icon: 'pi pi-fw pi-truck',
                        selected: false,
                        to: '/uikit/DetalleServicio'
                    },
                ]
            },
            { 
                label: 'Proyectos', 
                icon: 'pi pi-fw pi-briefcase',  
                items: [
                    {
                        label: 'Ver proyectos',
                        icon: 'pi pi-fw pi-th-large',
                        selected: false,
                        to: '/uikit/ProyectoAPI'
                    },
                    {
                        label: 'Agregar supervisor a proyectos',
                        icon: 'pi pi-fw pi-book',
                        selected: false,
                        to: '/uikit/DetalleProyecto'
                    },
                    {
                        label: 'Ver supervisores',
                        icon: 'pi pi-fw pi-users',
                        selected: false,
                        to: '/uikit/SupervisorAPI'
                    },
                    {
                        label: 'Ver colaboradores',
                        icon: 'pi pi-fw pi-users',
                        selected: false,
                        to: '/uikit/ColaboradorAPI'
                    },
                    {
                        label: 'Crear proyectos',
                        icon: 'pi pi-fw pi-file-edit',
                        selected: false,
                        to: '/uikit/overlay'
                    },
                    {
                        label: 'Crear supervisores y colaboradores',
                        icon: 'pi pi-fw pi-user-plus',
                        selected: false,
                        to: '/uikit/tree'
                    }
                ]
            },
            {
                label: 'Servicios', 
                icon: 'pi pi-fw pi-truck',  
                items: [
                    {
                        label: 'Ver servicios disponibles',
                        icon: 'pi pi-fw pi-book',
                        selected: false,
                        to: '/uikit/ServiciosAPI'
                    },
                    {
                        label: 'Agregar servicios',
                        icon: 'pi pi-fw pi-file-edit',
                        selected: false,
                        to: '/uikit/file'
                    },
                ]
            }
        ]
    },
]);


</script>

<template>
    <ul class="layout-menu">
      <template v-for="(item, i) in model" :key="item.label">
        <app-menu-item v-if="!item.separator" :item="item" :index="i"></app-menu-item>
        <li v-if="item.separator" class="menu-separator"></li>
      </template>
      
    </ul>
  </template>
  
  <style lang="scss" scoped>
  // Clase para íconos naranjas cuando está seleccionado
  .icon-orange {
    color: orange;
  }
  </style>


