"use strict";(self.webpackChunkstarter_bt5=self.webpackChunkstarter_bt5||[]).push([[395],{4213:(e,n,i)=>{i.d(n,{A:()=>r});i(5043);var l=i(1637),c=i(8903),t=i(579);const r=function(){return(0,t.jsx)(c.Ay,{container:!0,spacing:0,alignItems:"center",justify:"center",style:{minHeight:"100vh"},children:(0,t.jsx)(l.A,{})})}},851:(e,n,i)=>{i.d(n,{A:()=>R});var l=i(5043),c=i(3216),t=i(7154),r=i(4213),o=i(9981),d=i(310),a=i(6446),s=i(1806),h=i(3460),u=i(2420),g=i(9650),x=i(4882),m=i(9098),p=i(8076),A=i(8093),b=i(5263),j=i(5865),v=i(3336),f=i(3217),_=i(7392),P=i(2167),k=i(3471),S=i(8242),y=i(2088),C=i(579);function w(e,n,i){return n[i]<e[i]?-1:n[i]>e[i]?1:0}const O=[{id:"",numeric:!1,disablePadding:!1,label:"Encuestar"},{id:"codigo_sn",numeric:!1,disablePadding:!1,label:"Codigo"},{id:"nombre_sn",numeric:!1,disablePadding:!1,label:"Nombre"},{id:"correo_electronico",numeric:!1,disablePadding:!1,label:"Correo"},{id:"correo_recepcion",numeric:!1,disablePadding:!1,label:"Correo Recepcion"},{id:"Telefono_movil",numeric:!1,disablePadding:!0,label:"Movil"},{id:"telefono_1",numeric:!1,disablePadding:!0,label:"Telefono1"},{id:"telefono_2",numeric:!1,disablePadding:!0,label:"Telefono2"},{id:"estado_encuesta",numeric:!1,disablePadding:!1,label:"Estado"},{id:"nombre_grupo",numeric:!1,disablePadding:!1,label:"Grupo"},{id:"codigo_proyecto",numeric:!1,disablePadding:!1,label:"Proyecto"}];function T(e){const{onSelectAllClick:n,order:i,orderBy:l,numSelected:c,rowCount:t,onRequestSort:r}=e;return(0,C.jsx)(x.A,{children:(0,C.jsxs)(p.A,{children:[(0,C.jsx)(u.A,{padding:"checkbox",children:(0,C.jsx)(f.A,{color:"primary",indeterminate:c>0&&c<t,checked:t>0&&c===t,onChange:n,inputProps:{"aria-label":"select all desserts"}})}),O.map((e=>{return(0,C.jsx)(u.A,{align:e.numeric?"right":"left",padding:e.disablePadding?"none":"normal",sortDirection:l===e.id&&i,children:(0,C.jsxs)(A.A,{active:l===e.id,direction:l===e.id?i:"asc",onClick:(n=e.id,e=>{r(e,n)}),children:[e.label,l===e.id?(0,C.jsx)(a.A,{component:"span",sx:y.A,children:"desc"===i?"sorted descending":"sorted ascending"}):null]})},e.id);var n}))]})})}function M(e){const{numSelected:n}=e;return(0,C.jsxs)(b.A,{sx:{pl:{sm:2},pr:{xs:1,sm:1},...n>0&&{bgcolor:e=>(0,d.X4)(e.palette.primary.main,e.palette.action.activatedOpacity)}},children:[n>0?(0,C.jsxs)(j.A,{sx:{flex:"1 1 100%"},color:"inherit",variant:"subtitle1",component:"div",children:[n," Seleccionados"]}):(0,C.jsx)(j.A,{sx:{flex:"1 1 100%"},variant:"h6",id:"tableTitle",component:"div",children:"Clientes sin encuesta"}),n>0?(0,C.jsx)(P.A,{title:"Delete",children:(0,C.jsx)(_.A,{children:(0,C.jsx)(k.A,{})})}):(0,C.jsx)(P.A,{title:"Filter list",children:(0,C.jsx)(_.A,{children:(0,C.jsx)(S.A,{})})})]})}const R=e=>{const n=(0,c.Zp)(),[i,d]=l.useState("asc"),[x,A]=l.useState("calories"),[b,j]=l.useState([]),[_,P]=l.useState(0),[k,S]=l.useState(5),[y,O]=(0,l.useState)(!1),[R,z]=l.useState([]);(0,l.useEffect)((()=>{(async()=>{O(!0),await(0,t.A)({method:"GET",url:"".concat("https://encuesta-commerk.onrender.com","/cliente/listaF")}).then((e=>{z(e.data),O(!1)}))})()}),[]);const E=_>0?Math.max(0,(1+_)*k-R.length):0,B=l.useMemo((()=>function(e,n){const i=e.map(((e,n)=>[e,n]));return i.sort(((e,i)=>{const l=n(e[0],i[0]);return 0!==l?l:e[1]-i[1]})),i.map((e=>e[0]))}(R,function(e,n){return"desc"===e?(e,i)=>w(e,i,n):(e,i)=>-w(e,i,n)}(i,x)).slice(_*k,_*k+k)),[i,x,_,k,R]);return y?(0,C.jsx)(r.A,{}):(0,C.jsx)("div",{children:(0,C.jsx)(a.A,{sx:{width:"100%"},children:(0,C.jsxs)(v.A,{sx:{width:"100%",mb:2},children:[(0,C.jsx)(M,{numSelected:b.length}),(0,C.jsx)(g.A,{children:(0,C.jsxs)(s.A,{sx:{minWidth:750},"aria-labelledby":"tableTitle",size:"small",children:[(0,C.jsx)(T,{numSelected:b.length,order:i,orderBy:x,onSelectAllClick:e=>{if(e.target.checked&&R.length>0){const e=null===R||void 0===R?void 0:R.map((e=>e.id_cliente));j(e)}else j([])},onRequestSort:(e,n)=>{d(x===n&&"asc"===i?"desc":"asc"),A(n)},rowCount:null===R||void 0===R?void 0:R.length}),(0,C.jsxs)(h.A,{children:[B.map(((e,i)=>{const l=(c=e.id_cliente,-1!==b.indexOf(c));var c;const t="enhanced-table-checkbox-".concat(i);return(0,C.jsxs)(p.A,{hover:!0,onClick:n=>((e,n)=>{const i=b.indexOf(n);let l=[];-1===i?l=l.concat(b,n):0===i?l=l.concat(b.slice(1)):i===b.length-1?l=l.concat(b.slice(0,-1)):i>0&&(l=l.concat(b.slice(0,i),b.slice(i+1))),j(l)})(0,e.id_cliente),role:"checkbox","aria-checked":l,tabIndex:-1,selected:l,sx:{cursor:"pointer"},options:{exportButton:!0},children:[(0,C.jsx)(u.A,{padding:"checkbox",children:(0,C.jsx)(f.A,{color:"primary",checked:l,inputProps:{"aria-labelledby":t}})}),(0,C.jsx)(u.A,{align:"center",padding:"normal",children:(0,C.jsx)(o.A,{cursor:"pointer",onClick:i=>(e=>{n("/encuesta",{state:{val:e}})})(e)})}),(0,C.jsx)(u.A,{component:"th",id:t,scope:"row",padding:"none",children:e.codigo_sn}),(0,C.jsx)(u.A,{align:"center",padding:"none",children:e.nombre_sn}),(0,C.jsx)(u.A,{align:"center",padding:"normal",children:e.correo_electronico}),(0,C.jsx)(u.A,{align:"center",padding:"normal",children:e.correo_recepcion}),(0,C.jsx)(u.A,{align:"center",padding:"normal",children:e.telefono_movil}),(0,C.jsx)(u.A,{align:"center",padding:"normal",children:e.telefono_1}),(0,C.jsx)(u.A,{align:"center",padding:"normal",children:e.telefono_2}),(0,C.jsx)(u.A,{align:"center",padding:"normal",children:!0===e.estado_encuesta?"OK":"NO"}),(0,C.jsx)(u.A,{align:"center",padding:"normal",children:e.nombre_grupo}),(0,C.jsx)(u.A,{align:"center",padding:"normal",children:e.codigo_proyecto})]},e.id_cliente)})),E>0&&(0,C.jsx)(p.A,{style:{height:33*E},children:(0,C.jsx)(u.A,{colSpan:6})})]})]})}),(0,C.jsx)(m.A,{labelRowsPerPage:" Filas por p\xe1gina",rowsPerPageOptions:[5,10,25],component:"div",count:null===R||void 0===R?void 0:R.length,rowsPerPage:k,page:_,onPageChange:(e,n)=>{P(n)},onRowsPerPageChange:e=>{S(parseInt(e.target.value,10)),P(0)}})]})})})}},2395:(e,n,i)=>{i.r(n),i.d(n,{default:()=>o});var l=i(851),c=i(2327),t=i(2345),r=i(579);const o=()=>(0,r.jsx)(c.A,{children:(0,r.jsx)(t.A,{lg:"12",children:(0,r.jsx)(l.A,{})})})},9981:(e,n,i)=>{var l=i(4994);n.A=void 0;var c=l(i(39)),t=i(579);n.A=(0,c.default)((0,t.jsx)("path",{d:"M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2M9 17H7v-7h2zm4 0h-2V7h2zm4 0h-2v-4h2z"}),"Poll")}}]);
//# sourceMappingURL=395.821a3d14.chunk.js.map