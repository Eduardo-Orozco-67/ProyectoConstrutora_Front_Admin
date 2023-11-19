import{P as C}from"./ProductService-c3f21ab6.js";import{r as l,o as R,b as d,c as D,d as F,e,f as s,g as n,t as o,n as b,i as v}from"./index-68db9915.js";const T={class:"grid"},k={class:"col-12"},U={class:"card"},K=e("h5",null,"DataView",-1),N={class:"grid grid-nogutter"},I={class:"col-6 text-left"},j={class:"col-6 text-right"},M={class:"col-12"},H={class:"flex flex-column md:flex-row align-items-center p-3 w-full"},$=["src","alt"],z={class:"flex-1 text-center md:text-left"},A={class:"font-bold text-2xl"},E={class:"mb-3"},q={class:"flex align-items-center"},G=e("i",{class:"pi pi-tag mr-2"},null,-1),J={class:"font-semibold"},Q={class:"flex flex-row md:flex-column justify-content-between w-full md:w-auto align-items-center md:align-items-end mt-5 md:mt-0"},W={class:"text-2xl font-semibold mb-2 align-self-center md:align-self-end"},X={class:"col-12 md:col-4"},Y={class:"card m-3 border-1 surface-border"},Z={class:"flex align-items-center justify-content-between"},P={class:"flex align-items-center"},ee=e("i",{class:"pi pi-tag mr-2"},null,-1),te={class:"font-semibold"},ae={class:"text-center"},oe=["src","alt"],se={class:"text-2xl font-bold"},le={class:"mb-3"},ne={class:"flex align-items-center justify-content-between"},de={class:"text-2xl font-semibold"},ie={class:"col-12 lg:col-8"},ce={class:"card"},re=e("h5",null,"PickList",-1),ue={class:"col-12 lg:col-4"},me={class:"card"},_e=e("h5",null,"OrderList",-1),pe={__name:"List",setup(ve){const h=l([[{name:"San Francisco",code:"SF"},{name:"London",code:"LDN"},{name:"Paris",code:"PRS"},{name:"Istanbul",code:"IST"},{name:"Berlin",code:"BRL"},{name:"Barcelona",code:"BRC"},{name:"Rome",code:"RM"}],[]]),g=l([{name:"San Francisco",code:"SF"},{name:"London",code:"LDN"},{name:"Paris",code:"PRS"},{name:"Istanbul",code:"IST"},{name:"Berlin",code:"BRL"},{name:"Barcelona",code:"BRC"},{name:"Rome",code:"RM"}]),p=l(null),u=l("grid"),c=l(null),m=l(null),_=l(null),w=l([{label:"Price High to Low",value:"!price"},{label:"Price Low to High",value:"price"}]),y=new C;R(()=>{y.getProductsSmall().then(i=>p.value=i)});const V=i=>{const a=i.value.value,r=i.value;a.indexOf("!")===0?(m.value=-1,_.value=a.substring(1,a.length),c.value=r):(m.value=1,_.value=a,c.value=r)};return(i,a)=>{const r=d("Dropdown"),S=d("DataViewLayoutOptions"),f=d("Rating"),x=d("Button"),L=d("DataView"),O=d("PickList"),B=d("OrderList");return D(),F("div",T,[e("div",k,[e("div",U,[K,s(L,{value:p.value,layout:u.value,paginator:!0,rows:9,sortOrder:m.value,sortField:_.value},{header:n(()=>[e("div",N,[e("div",I,[s(r,{modelValue:c.value,"onUpdate:modelValue":a[0]||(a[0]=t=>c.value=t),options:w.value,optionLabel:"label",placeholder:"Sort By Price",onChange:a[1]||(a[1]=t=>V(t))},null,8,["modelValue","options"])]),e("div",j,[s(S,{modelValue:u.value,"onUpdate:modelValue":a[2]||(a[2]=t=>u.value=t)},null,8,["modelValue"])])])]),list:n(t=>[e("div",M,[e("div",H,[e("img",{src:"demo/images/product/"+t.data.image,alt:t.data.name,class:"my-4 md:my-0 w-9 md:w-10rem shadow-2 mr-5"},null,8,$),e("div",z,[e("div",A,o(t.data.name),1),e("div",E,o(t.data.description),1),s(f,{modelValue:t.data.rating,readonly:!0,cancel:!1,class:"mb-2"},null,8,["modelValue"]),e("div",q,[G,e("span",J,o(t.data.category),1)])]),e("div",Q,[e("span",W,"$"+o(t.data.price),1),s(x,{icon:"pi pi-shopping-cart",label:"Add to Cart",disabled:t.data.inventoryStatus==="OUTOFSTOCK",class:"mb-2"},null,8,["disabled"]),e("span",{class:b("product-badge status-"+t.data.inventoryStatus.toLowerCase())},o(t.data.inventoryStatus),3)])])])]),grid:n(t=>[e("div",X,[e("div",Y,[e("div",Z,[e("div",P,[ee,e("span",te,o(t.data.category),1)]),e("span",{class:b("product-badge status-"+t.data.inventoryStatus.toLowerCase())},o(t.data.inventoryStatus),3)]),e("div",ae,[e("img",{src:"demo/images/product/"+t.data.image,alt:t.data.name,class:"w-9 shadow-2 my-3 mx-0"},null,8,oe),e("div",se,o(t.data.name),1),e("div",le,o(t.data.description),1),s(f,{modelValue:t.data.rating,readonly:!0,cancel:!1},null,8,["modelValue"])]),e("div",ne,[e("span",de,"$"+o(t.data.price),1),s(x,{icon:"pi pi-shopping-cart",disabled:t.data.inventoryStatus==="OUTOFSTOCK"},null,8,["disabled"])])])])]),_:1},8,["value","layout","sortOrder","sortField"])])]),e("div",ie,[e("div",ce,[re,s(O,{modelValue:h.value,"onUpdate:modelValue":a[3]||(a[3]=t=>h.value=t),listStyle:"height:250px",dataKey:"code"},{sourceheader:n(()=>[v(" From ")]),targetheader:n(()=>[v(" To ")]),item:n(t=>[e("div",null,o(t.item.name),1)]),_:1},8,["modelValue"])])]),e("div",ue,[e("div",me,[_e,s(B,{modelValue:g.value,"onUpdate:modelValue":a[4]||(a[4]=t=>g.value=t),listStyle:"height:250px",dataKey:"code",rows:10},{header:n(()=>[v(" Cities ")]),item:n(t=>[e("div",null,o(t.item.name),1)]),_:1},8,["modelValue"])])])])}}};export{pe as default};
