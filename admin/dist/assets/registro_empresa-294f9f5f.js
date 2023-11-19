import{a as l}from"./axios-47b9d439.js";import{_ as p,a as n,b as f,c as h,d as o,e as a,j as _}from"./index-e9023bbb.js";const b="/assets/Empresas-797906f8.jpg",v={data(){return{formData:{nombre:"",direccion:"",telefono:"",correo:""},authToken:null}},created(){this.obtenerToken()},methods:{obtenerToken(){const s={username:"admin",password:"secretaacces123"};l.post("https://api-constructora.onrender.com/token",{username:s.username,password:s.password},{headers:{"Content-Type":"application/json"}}).then(e=>{this.authToken=e.data.access_token,l.defaults.headers.common.Authorization=`Bearer ${this.authToken}`}).catch(e=>{console.error("Error al obtener el token JWT",e),e.response&&console.error("Respuesta del servidor:",e.response.data)})},submitForm(){console.log("Submit button clicked"),this.validateFields()&&l.post(`https://api-constructora.onrender.com/empresa/create?jsonwebtoken=${this.authToken}`,this.formData).then(s=>{s.status===200&&(this.showSuccessToast("¡Empresa creada exitosamente!"),this.limpiarCamposEntrada())}).catch(s=>{console.error("Error al crear la empresa",s),this.showApiErrorToast(s)})},validateFields(){return this.formData.nombre&&this.formData.direccion&&this.formData.telefono&&this.formData.correo?!0:(this.showValidationError("Por favor, complete todos los campos."),!1)},showSuccessToast(s){this.$refs.toast.add({severity:"success",summary:"Éxito",detail:s,life:3e3})},showValidationError(s){this.$refs.toast.add({severity:"error",summary:"Error de validación",detail:s,life:5e3})},showApiErrorToast(s){let e="Error al procesar la solicitud";s.response&&(s.response.status===401?e="La empresa con ese nombre ya existe":e="Ya existe la empresa"),this.$refs.toast.add({severity:"error",summary:"Error",detail:e,life:5e3})},limpiarCamposEntrada(){this.formData.nombre="",this.formData.direccion="",this.formData.telefono="",this.formData.correo=""}}},D=o("h1",null,"Registro de Empresa",-1),T={class:"col-6 md:6"},E={class:"card p-fluid"},V={class:"field col-9 md:6"},y=o("label",{for:"nombre"},"Nombre de la empresa:",-1),k={class:"field col-9 md:6"},x=o("label",{for:"direccion"},"Dirección:",-1),w={class:"field col-9 md:6"},g=o("label",{for:"telefono"},"Teléfono:",-1),C={class:"field col-9 md:6"},B=o("label",{for:"correo"},"Correo electronico:",-1),j={class:"field col-3 md:3"},F=o("div",{class:"col-6 md:6"},[o("div",{class:"card p-fluid"},[o("div",null,[o("img",{src:b,alt:"Imagen de empresas",style:{"max-width":"100%",height:"auto"}})])])],-1);function S(s,e,c,q,r,d){const i=n("InputText"),m=n("Button"),u=n("Toast");return f(),h("div",null,[D,o("form",{onSubmit:e[4]||(e[4]=_((...t)=>d.submitForm&&d.submitForm(...t),["prevent"])),class:"grid"},[o("div",T,[o("div",E,[o("div",V,[y,a(i,{id:"nombre",type:"text",placeholder:"Empresa",modelValue:r.formData.nombre,"onUpdate:modelValue":e[0]||(e[0]=t=>r.formData.nombre=t),required:""},null,8,["modelValue"])]),o("div",k,[x,a(i,{id:"direccion",type:"text",placeholder:"Calle Principal 123",modelValue:r.formData.direccion,"onUpdate:modelValue":e[1]||(e[1]=t=>r.formData.direccion=t),required:""},null,8,["modelValue"])]),o("div",w,[g,a(i,{id:"telefono",type:"tel",placeholder:"9614567890",modelValue:r.formData.telefono,"onUpdate:modelValue":e[2]||(e[2]=t=>r.formData.telefono=t),required:""},null,8,["modelValue"])]),o("div",C,[B,a(i,{id:"correo",type:"email",placeholder:"ejemplo@correo.com",modelValue:r.formData.correo,"onUpdate:modelValue":e[3]||(e[3]=t=>r.formData.correo=t),required:""},null,8,["modelValue"])]),o("div",j,[a(m,{label:"Success",class:"p-button-success mr-2 mb-2",type:"submit"})])])]),F],32),a(u,{ref:"toast"},null,512)])}const I=p(v,[["render",S]]);export{I as default};
