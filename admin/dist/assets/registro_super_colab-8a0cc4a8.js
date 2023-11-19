import{a as i}from"./axios-47b9d439.js";import{_ as b,a as d,b as h,c as v,d as e,e as t}from"./index-e9023bbb.js";const f={data(){return{supervisorFormData:{nombre:"",cargo:"",telefono:"",correo:""},colaboradorFormData:{telefono_supervisor:null,nombre:"",cargo:"",telefono:"",correo:""},telefonoSupervisorOptions:[],authToken:null}},created(){this.obtenerToken()},methods:{obtenerToken(){const r={username:"admin",password:"secretaacces123"};i.post("https://api-constructora.onrender.com/token",{username:r.username,password:r.password},{headers:{"Content-Type":"application/json"}}).then(o=>{this.authToken=o.data.access_token,i.defaults.headers.common.Authorization=`Bearer ${this.authToken}`,this.cargarSupervisor()}).catch(o=>{console.error("Error al obtener el token JWT",o),o.response&&console.error("Respuesta del servidor:",o.response.data)})},cargarSupervisor(){this.authToken&&i.get(`https://api-constructora.onrender.com/supervisor/ver-todos/?jsonwebtoken=${this.authToken}`).then(r=>{this.telefonoSupervisorOptions=r.data.map(o=>o.telefono)}).catch(r=>{console.error("Error al obtener los datos de la API",r)})},submitFormSupervisor(){console.log("Submit button clicked"),this.validateFields()&&i.post(`https://api-constructora.onrender.com/supervisor/create/?jsonwebtoken=${this.authToken}`,this.supervisorFormData).then(r=>{r.status===200&&(this.showSuccessToast("¡Supervisor creado exitosamente!"),this.limpiarCamposEntrada())}).catch(r=>{console.error("Error al crear el supervisor",r),this.showApiErrorToast(r)})},submitFormColaborador(){console.log("Submit button clicked"),this.validateFieldsColaborador()&&i.post(`https://api-constructora.onrender.com/colaborador/create/?telefono_supervisor=${this.colaboradorFormData.telefono_supervisor}&jsonwebtoken=${this.authToken}`,this.colaboradorFormData).then(r=>{r.status===200&&(this.showSuccessToast("¡Colaborador creado exitosamente!"),this.limpiarCamposEntradaColaborador())}).catch(r=>{console.error("Error al crear el colaborador",r),this.showApiErrorToastColaborador(r)})},showValidationErrorColaborador(r){this.showToastColaborador("error","Error de validación",r)},showApiErrorToastColaborador(r){let o="Error al procesar el colaborador";r.response&&(r.response.status===401?o="El colaborador con ese nombre ya existe":o="Ya existe el colaborador"),this.showToastColaborador("error","Error",o)},validateFields(){return this.supervisorFormData.nombre&&this.supervisorFormData.cargo&&this.supervisorFormData.telefono&&this.supervisorFormData.correo?!0:(this.showValidationError("Por favor, complete todos los campos del Supervisor."),!1)},validateFieldsColaborador(){return this.colaboradorFormData.telefono_supervisor&&this.colaboradorFormData.nombre&&this.colaboradorFormData.cargo&&this.colaboradorFormData.telefono&&this.colaboradorFormData.correo?!0:(this.showValidationError("Por favor, complete todos los campos del Colaborador."),!1)},showSuccessToast(r){this.$refs.toast.add({severity:"success",summary:"Éxito",detail:r,life:3e3})},showValidationError(r){this.$refs.toast.add({severity:"error",summary:"Error de validación",detail:r,life:5e3})},showApiErrorToast(r){let o="Error al procesar el supervisor";r.response&&(r.response.status===401?o="El supervisor con ese nombre ya existe":o="Ya existe el supervisor"),this.$refs.toast.add({severity:"error",summary:"Error",detail:o,life:5e3})},limpiarCamposEntrada(){this.supervisorFormData.nombre="",this.supervisorFormData.cargo="",this.supervisorFormData.telefono="",this.supervisorFormData.correo=""},limpiarCamposEntradaColaborador(){this.colaboradorFormData.telefono_supervisor=null,this.colaboradorFormData.nombre="",this.colaboradorFormData.cargo="",this.colaboradorFormData.telefono="",this.colaboradorFormData.correo=""}}},_=e("h1",null,"Registro de Supervisor y Colaborador",-1),F={class:"grid"},C={class:"col-6 md:6"},D={class:"card p-fluid"},E={class:"field col-9 md-6"},V=e("label",{for:"nombreSupervisor"},"Nombre del Supervisor:",-1),g={class:"field col-9 md-6"},S=e("label",{for:"cargoSupervisor"},"Cargo del Supervisor:",-1),T={class:"field col-9 md-6"},k=e("label",{for:"telefonoSupervisor"},"Teléfono del Supervisor:",-1),w={class:"field col-9 md-6"},y=e("label",{for:"correoSupervisor"},"Correo del Supervisor:",-1),x={class:"col-3 md-3"},j={class:"col-6 md:6"},q={class:"card p-fluid"},U={class:"field col-9 md-6"},A=e("label",{for:"telefono_supervisor"},"Telefono del Supervisor:",-1),B={class:"field col-9 md-6"},P=e("label",{for:"nombreColaborador"},"Nombre del Colaborador:",-1),N={class:"field col-9 md-6"},R=e("label",{for:"cargoColaborador"},"Cargo del Colaborador:",-1),z={class:"field col-9 md-6"},G=e("label",{for:"telefonoColaborador"},"Teléfono del Colaborador:",-1),I={class:"field col-9 md-6"},M=e("label",{for:"correoColaborador"},"Correo del Colaborador:",-1),O={class:"col-3 md-3"};function J(r,o,n,Y,s,c){const l=d("InputText"),u=d("Button"),m=d("Dropdown"),p=d("Toast");return h(),v("div",null,[_,e("form",F,[e("div",C,[e("div",D,[e("div",E,[V,t(l,{id:"nombreSupervisor",type:"text",modelValue:s.supervisorFormData.nombre,"onUpdate:modelValue":o[0]||(o[0]=a=>s.supervisorFormData.nombre=a),placeholder:"Ejemplo: Juan Pérez",required:""},null,8,["modelValue"])]),e("div",g,[S,t(l,{id:"cargoSupervisor",type:"text",modelValue:s.supervisorFormData.cargo,"onUpdate:modelValue":o[1]||(o[1]=a=>s.supervisorFormData.cargo=a),placeholder:"Ejemplo: Gerente de Proyectos",required:""},null,8,["modelValue"])]),e("div",T,[k,t(l,{id:"telefonoSupervisor",type:"tel",modelValue:s.supervisorFormData.telefono,"onUpdate:modelValue":o[2]||(o[2]=a=>s.supervisorFormData.telefono=a),placeholder:"Ejemplo: 9614567890",required:""},null,8,["modelValue"])]),e("div",w,[y,t(l,{id:"correoSupervisor",type:"email",modelValue:s.supervisorFormData.correo,"onUpdate:modelValue":o[3]||(o[3]=a=>s.supervisorFormData.correo=a),placeholder:"Ejemplo: juan.perez@empresa.com",required:""},null,8,["modelValue"])]),e("div",x,[t(u,{label:"Registrar",id:"btnSupervisor",class:"p-button-success mr-2 mb-2",onClick:c.submitFormSupervisor},null,8,["onClick"])])])]),e("div",j,[e("div",q,[e("div",U,[A,t(m,{id:"telefono_supervisor",modelValue:s.colaboradorFormData.telefono_supervisor,"onUpdate:modelValue":o[4]||(o[4]=a=>s.colaboradorFormData.telefono_supervisor=a),options:s.telefonoSupervisorOptions,showClear:"",required:""},null,8,["modelValue","options"])]),e("div",B,[P,t(l,{id:"nombreColaborador",type:"text",modelValue:s.colaboradorFormData.nombre,"onUpdate:modelValue":o[5]||(o[5]=a=>s.colaboradorFormData.nombre=a),placeholder:"Ejemplo: María García",required:""},null,8,["modelValue"])]),e("div",N,[R,t(l,{id:"cargoColaborador",type:"text",modelValue:s.colaboradorFormData.cargo,"onUpdate:modelValue":o[6]||(o[6]=a=>s.colaboradorFormData.cargo=a),placeholder:"Ejemplo: Diseñador Gráfico",required:""},null,8,["modelValue"])]),e("div",z,[G,t(l,{id:"telefonoColaborador",type:"tel",modelValue:s.colaboradorFormData.telefono,"onUpdate:modelValue":o[7]||(o[7]=a=>s.colaboradorFormData.telefono=a),placeholder:"Ejemplo: 9621234567",required:""},null,8,["modelValue"])]),e("div",I,[M,t(l,{id:"correoColaborador",type:"email",modelValue:s.colaboradorFormData.correo,"onUpdate:modelValue":o[8]||(o[8]=a=>s.colaboradorFormData.correo=a),placeholder:"Ejemplo: maria.garcia@empresa.com",required:""},null,8,["modelValue"])]),e("div",O,[t(u,{label:"Registrar",id:"btnColaborador",class:"p-button-success mr-2 mb-2",onClick:c.submitFormColaborador},null,8,["onClick"])])])])]),t(p,{ref:"toast"},null,512)])}const K=b(f,[["render",J]]);export{K as default};
