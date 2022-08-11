import{_ as j,d as H,q as J,s as K,c as D,l as v,u as W,b as G,m as t,p as B,F as z,N as X,O as Y,P as ee,y as F,o as h,a as _,x as L,g as r,h as te,Q as N}from"./index.e8935084.js";import{u as oe}from"./ordersStore.c9c52bfd.js";import{u as ae}from"./customersStore.87de32ca.js";import{A as le,P as se,a as s,_ as i}from"./apiService.6f9bb616.js";function re(n){const a=n.toLocaleDateString(void 0,{year:"numeric",month:"2-digit",day:"2-digit"}),d=n.toLocaleTimeString(void 0,{hour:"2-digit",minute:"2-digit"});return console.log(a+" "+d),a+" "+d}const V=n=>(X("data-v-62e9892e"),n=n(),Y(),n),ne=V(()=>r("div",{class:"hidden lg:block"},"big screen not supported yet",-1)),ie=V(()=>r("thead",{class:"border-t-0"},null,-1)),de={class:"bg-white"},ue={class:"bg-white"},ce={class:"bg-white"},pe={class:"bg-white"},me={class:"bg-white"},he={class:"bg-white"},ge=H({name:"OrderPage",setup(n){const a=oe(),d=J(),x=ae();K();const E=ee(),y=D(()=>{var e,f,p,m;return{lat:(f=(e=l.value)==null?void 0:e.latitude)!=null?f:0,lng:(m=(p=l.value)==null?void 0:p.longitude)!=null?m:0}}),l=v(),o=v(),q=new le(W()),u=v(),g=D(()=>{const e=E.path.split("/");return parseInt(e[e.length-1])}),Q=e=>{u.value=e},U=()=>{a.selectedTabIndex=1,N.push("/scheduling/orders")},Z=e=>{N.push({name:"OrderSample",params:{orderId:g.value.toString(),sampleId:e.toString()}})};return d.selectedRoute&&(u.value=new Date(d.selectedRoute.scheduledSampling.toString())),a.$persistedState.isReady().then(async()=>{if(a.orders)a.orders.filter(e=>e.orderId==g.value),l.value=a.orders[0];else{const e=await q.get(`orders/${g.value}`);l.value=e}l.value.samples=[{sampleId:22,type:"Drinking water assesment",label:"Group A analysis",place:{name:"Martins Place",latitude:57,longitude:9,samplesCount:1}}],x.$persistedState.isReady().then(async()=>{o.value={city:"Aalborg",customerId:2,email:"martin.lykke@sgs.com",mobile:"+4531503854",name:"Martin",phone:"+4531503854",address:"S\xF8parken 35"}})}),(e,f)=>{const p=F("GMapMarker"),m=F("GMapMap");return h(),G(z,null,[ne,t(se,{class:"lg:hidden"},{content:B(()=>{var b,k,S,w,C,$,I,M,R,A,P,T,O;return[ie,t(m,{center:_(y),zoom:16,options:{mapTypeControl:!1,scaleControl:!1,streetViewControl:!1,rotateControl:!1,fullscreenControl:!1,draggable:!1,scrollwheel:!1,disableDoubleClickZoom:!0,zoomControl:!1,clickableIcons:!1,keyboardShortcuts:!1},"map-type-id":"terrain",class:"w-full h-32"},{default:B(()=>[(h(),L(p,{key:1,position:_(y)},null,8,["position"]))]),_:1},8,["center"]),r("tbody",de,[t(s,{clickable:!0,header:(b=o.value)==null?void 0:b.name,footer1:(k=o.value)==null?void 0:k.address,footer2:(S=o.value)==null?void 0:S.city,hyperlink:encodeURI("https://www.google.com/maps/dir/?api=1&destination="+((w=l.value)==null?void 0:w.latitude)+","+((C=l.value)==null?void 0:C.longitude)+"&travelmode=driving")},null,8,["header","footer1","footer2","hyperlink"])]),t(i,{title:e.$t("Contact:")+" "+(($=o.value)==null?void 0:$.name)},null,8,["title"]),r("tbody",ue,[t(s,{header:e.$t("Telephone"),footer1:(I=o.value)==null?void 0:I.phone,hyperlink:`tel:${(M=o.value)==null?void 0:M.phone}`},null,8,["header","footer1","hyperlink"]),t(s,{header:e.$t("Mobile"),footer1:(R=o.value)==null?void 0:R.mobile,hyperlink:`tel:${(A=o.value)==null?void 0:A.mobile}`},null,8,["header","footer1","hyperlink"]),t(s,{header:e.$t("E-mail"),footer1:(P=o.value)==null?void 0:P.email,hyperlink:`mailto: ${(T=o.value)==null?void 0:T.email}`},null,8,["header","footer1","hyperlink"])]),t(i,{title:e.$t("Sampling notes:")},null,8,["title"]),r("tbody",ce,[t(s,{"text-area":!0})]),t(i,{title:e.$t("Sampling:")},null,8,["title"]),r("tbody",pe,[t(s,{header:e.$t("Select sampling date and time"),footer1:u.value?_(re)(u.value):"","date-input":!0,"date-initial":u.value,onDateChanged:Q},null,8,["header","footer1","date-initial"])]),t(i,{title:e.$t("Samples:")},null,8,["title"]),r("tbody",me,[(h(!0),G(z,null,te((O=l.value)==null?void 0:O.samples,c=>(h(),L(s,{key:c.sampleId,header:c.place.name,footer1:c.type,footer2:c.label,clickable:!0,onRowClicked:fe=>Z(c.sampleId)},null,8,["header","footer1","footer2","onRowClicked"]))),128))]),t(i,{title:e.$t("Add order")},null,8,["title"]),r("tbody",he,[t(s,{header:e.$t("Add to route"),footer1:e.$t("Adds order to route with the selected sampling date"),clickable:!0,onRowClicked:U},null,8,["header","footer1"])]),t(i)]}),_:1})],64)}}});var ke=j(ge,[["__scopeId","data-v-62e9892e"]]);export{ke as default};