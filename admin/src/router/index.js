import { createRouter, createWebHashHistory } from 'vue-router';
import AppLayout from '@/layout/AppLayout.vue';

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            component: AppLayout,
            children: [
                {
                    path: '/',
                    name: 'dashboard',
                    component: () => import('@/views/Dashboard.vue')
                },
                {
                    path: '/uikit/formlayout',
                    name: 'formlayout',
                    component: () => import('@/views/uikit/FormLayout.vue')
                },
                {
                    path: '/uikit/SupervisorAPI',
                    name: 'SupervisorAPI',
                    component: () => import('@/views/uikit/SupervisorAPI.vue')
                },
                {
                    path: '/uikit/ColaboradorAPI',
                    name: 'ColaboradorAPI',
                    component: () => import('@/views/uikit/ColaboradorAPI.vue')
                },
                {
                    path: '/uikit/input',
                    name: 'input',
                    component: () => import('@/views/uikit/Input.vue')
                },
                {
                    path: '/uikit/floatlabel',
                    name: 'floatlabel',
                    component: () => import('@/views/uikit/FloatLabel.vue')
                },
                {
                    path: '/uikit/invalidstate',
                    name: 'invalidstate',
                    component: () => import('@/views/uikit/solicitud_proyecto_crete.vue')
                },
                {
                    path: '/uikit/table',
                    name: 'table',
                    component: () => import('@/views/uikit/Table.vue')
                },
                {
                    path: '/uikit/Datable',
                    name: 'Datable',
                    component: () => import('@/views/uikit/Datable.vue')
                },
                {
                    path: '/uikit/SolicitudesAPI',
                    name: 'SolicitudesAPI',
                    component: () => import('@/views/uikit/SolicitudesAPI.vue')
                },
                {
                    path: '/uikit/list',
                    name: 'list',
                    component: () => import('@/views/uikit/registro_empresa.vue')
                },
                {
                    path: '/uikit/tree',
                    name: 'tree',
                    component: () => import('@/views/uikit/registro_super_colab.vue')
                },
                {
                    path: '/uikit/panel',
                    name: 'panel',
                    component: () => import('@/views/uikit/Panels.vue')
                },

                {
                    path: '/uikit/overlay',
                    name: 'overlay',
                    component: () => import('@/views/uikit/create_proyecto.vue')
                },
                {
                    path: '/uikit/media',
                    name: 'media',
                    component: () => import('@/views/uikit/Media.vue')
                },
                {
                    path: '/uikit/menu',
                    component: () => import('@/views/uikit/Menu.vue'),
                    children: [
                        {
                            path: '/uikit/menu',
                            component: () => import('@/views/uikit/menu/PersonalDemo.vue')
                        },
                        {
                            path: '/uikit/menu/seat',
                            component: () => import('@/views/uikit/menu/SeatDemo.vue')
                        },
                        {
                            path: '/uikit/menu/payment',
                            component: () => import('@/views/uikit/menu/PaymentDemo.vue')
                        },
                        {
                            path: '/uikit/menu/confirmation',
                            component: () => import('@/views/uikit/menu/ConfirmationDemo.vue')
                        }
                    ]
                },
                {
                    path: '/uikit/message',
                    name: 'message',
                    component: () => import('@/views/uikit/Messages.vue')
                },
                {
                    path: '/uikit/EmpresaAPI',
                    name: 'EmpresaAPI',
                    component: () => import('@/views/uikit/EmpresaAPI.vue')
                },
                {
                    path: '/uikit/ProyectoAPI',
                    name: 'ProyectoAPI',
                    component: () => import('@/views/uikit/ProyectoAPI.vue')
                },
                {
                    path: '/uikit/ServiciosAPI',
                    name: 'ServiciosAPI',
                    component: () => import('@/views/uikit/ServiciosAPI.vue')
                },
                {
                    path: '/uikit/DetalleProyecto',
                    name: 'DetalleProyecto',
                    component: () => import('@/views/uikit/DetalleProyecto.vue')
                },
                {
                    path: '/uikit/DetalleSolicitud',
                    name: 'DetalleSolicitud',
                    component: () => import('@/views/uikit/DetalleSolicitud.vue')
                },
                {
                    path: '/uikit/DetalleServicio',
                    name: 'DetalleServicio',
                    component: () => import('@/views/uikit/DetalleServicio.vue')
                },
                {
                    path: '/uikit/file',
                    name: 'file',
                    component: () => import('@/views/uikit/registro_servicios.vue')
                },
                {
                    path: '/uikit/charts',
                    name: 'charts',
                    component: () => import('@/views/uikit/Chart.vue')
                },
                {
                    path: '/uikit/porcentaje',
                    name: 'porcentaje',
                    component: () => import('@/views/uikit/porcentaje_proyecto.vue')
                },
                {
                    path: '/uikit/proyectosSupervisor',
                    name: 'proyectossupervisor',
                    component: () => import('@/views/uikit/proyectos_supervisor.vue')
                },
                {
                    path: '/blocks',
                    name: 'blocks',
                    component: () => import('@/views/utilities/Blocks.vue')
                },
                {
                    path: '/utilities/icons',
                    name: 'icons',
                    component: () => import('@/views/utilities/Icons.vue')
                },
                {
                    path: '/pages/timeline',
                    name: 'timeline',
                    component: () => import('@/views/pages/Timeline.vue')
                },
                {
                    path: '/pages/empty',
                    name: 'empty',
                    component: () => import('@/views/pages/Empty.vue')
                },
                {
                    path: '/pages/crud',
                    name: 'crud',
                    component: () => import('@/views/pages/Crud.vue')
                },
                {
                    path: '/documentation',
                    name: 'documentation',
                    component: () => import('@/views/utilities/Documentation.vue')
                },
                {
                    path: '/ChatBOT',
                    name: 'ChatBOT',
                    component: () => import('@/views/utilities/ChatBOT.vue')
                }
            ]
        },
        {
            path: '/landing',
            name: 'landing',
            component: () => import('@/views/pages/Landing.vue')
        },
        {
            path: '/pages/notfound',
            name: 'notfound',
            component: () => import('@/views/pages/NotFound.vue')
        },

        {
            path: '/auth/login',
            name: 'login',
            component: () => import('@/views/pages/auth/Login.vue')
        },
        {
            path: '/auth/access',
            name: 'accessDenied',
            component: () => import('@/views/pages/auth/Access.vue')
        },
        {
            path: '/auth/error',
            name: 'error',
            component: () => import('@/views/pages/auth/Error.vue')
        }
    ]
});

export default router;
