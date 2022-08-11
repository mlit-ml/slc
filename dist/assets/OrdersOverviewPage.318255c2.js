import{o as a,x as M,m as r,d as N,l as k,b as m,g as e,t as S,_ as j,u as B,v as D,q as H,s as q,w as J,c as F,y as z,p as y,F as T,h as P,e as K,a as I,A as Z,H as Q}from"./index.66740f22.js";import{u as U}from"./ordersStore.27a2f439.js";import{A as W,_ as O,a as C,P as X}from"./apiService.a3466785.js";import{_ as ee,T as V}from"./Tab.eed34850.js";function te(i,c){return a(),M("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20",fill:"currentColor","aria-hidden":"true"},[r("path",{"fill-rule":"evenodd",d:"M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z","clip-rule":"evenodd"})])}function oe(i,c){return a(),M("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20",fill:"currentColor","aria-hidden":"true"},[r("path",{"fill-rule":"evenodd",d:"M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z","clip-rule":"evenodd"})])}function re(i,c){return a(),M("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20",fill:"currentColor","aria-hidden":"true"},[r("path",{"fill-rule":"evenodd",d:"M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z","clip-rule":"evenodd"})])}const se={class:"top-0 right-0 left-0 z-50 md:inset-0 h-modal md:h-full"},ae={class:"relative w-full max-w-md h-full md:h-auto"},ne={class:"p-2 text-left"},le={class:"mb-2 text-lg font-bold text-gray-500 dark:text-gray-400"},de={class:"mb-5 text-md font-normal text-gray-500 dark:text-gray-400"},ie={class:"text-center items-center pb-2 md:pb-0"},ce=N({name:"GMapDialog",props:{id:null,header:null,footer:null,buttonText:null},emits:["addToRouteClicked","infoClicked"],setup(i,{emit:c}){const n=i,u=k(!0);function b(l){c("addToRouteClicked",l),t(!1)}function t(l){u.value=l}return(l,f)=>(a(),m("div",se,[e("div",ae,[e("div",ne,[e("h3",le,S(l.$t(i.header)),1),e("p",de,S(l.$t(i.footer)),1),e("div",ie,[e("button",{type:"button",class:"text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 rounded-lg text-sm px-4 py-2 text-center mr-2",onClick:f[0]||(f[0]=p=>b(i.id))},S(n.buttonText),1),e("button",{type:"button",class:"md:mr-0 mr-2 text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm px-4 py-2 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600",onClick:f[1]||(f[1]=p=>l.$emit("infoClicked",i.id))},S(l.$t("Info")),1)])])])]))}});const ue={},pe={type:"range",min:"1",max:"100",value:"0",class:"range-slider shadow",oninput:"valueChanged(this)"};function ve(i,c){return a(),m("input",pe)}var fe=j(ue,[["render",ve],["__scopeId","data-v-a751c3c2"]]);const ge="M32 2C15.432 2 2 15.432 2 32c0 16.568 13.432 30 30 30s30-13.432 30-30C62 15.432 48.568 2 32 2zm6 46h-6.107V24.979c-2.232 2.086-4.863 3.629-7.893 4.629v-5.543c1.594-.521 3.326-1.512 5.195-2.967c1.871-1.455 3.152-3.156 3.848-5.098H38v32z",he="M 20 5 L 20 10.46875 L 17 12.25 L 17 9.21875 L 15.5 10.15625 L 12 12.25 L 12 9.21875 L 10.5 10.15625 L 5.5 13.15625 L 5 13.4375 L 5 27 L 27 27 L 27 5 Z M 22 7 L 25 7 L 25 25 L 7 25 L 7 14.53125 L 10 12.75 L 10 15.78125 L 11.5 14.84375 L 15 12.75 L 15 15.78125 L 16.5 14.84375 L 21.5 11.84375 L 22 11.5625 Z M 9 17 L 9 19 L 11 19 L 11 17 Z M 13 17 L 13 19 L 15 19 L 15 17 Z M 17 17 L 17 19 L 19 19 L 19 17 Z M 21 17 L 21 19 L 23 19 L 23 17 Z M 9 21 L 9 23 L 11 23 L 11 21 Z M 13 21 L 13 23 L 15 23 L 15 21 Z M 17 21 L 17 23 L 19 23 L 19 21 Z M 21 21 L 21 23 L 23 23 L 23 21 Z";var me={NUMBER_1:ge,INDUSTRY:he};const be={key:0},_e={class:"grid grid-cols-6 gap-7 items-center absolute w-full right-0 pt-1"},ye={class:"col-span-4 flex"},we={class:"justify-self-end"},xe=N({name:"OrdersOverview",props:{selectedRoute:null},emits:["mapIsReady","orderAdded","orderRemoved"],setup(i,{emit:c}){const n=i,u=new W(B()),b=D(),t=U();H();const{t:l}=q(),f=k({lat:56.993048,lng:9.8212}),p=k();var v=k();const w=k(n.selectedRoute);J(()=>n.selectedRoute,(s,o)=>{w.value=s});const g=F(()=>{if(!v.value)return[];const s=v.value.map(o=>({id:o.orderId,position:{lat:o.latitude,lng:o.longitude},icon:L(o),clickable:!0,draggable:!1,infoWindow:{header:o.description,footer:l("Samples:")+" "+o.samples.map(x=>x.place).reduce((x,R)=>x+R.samplesCount,0),buttonText:o.routeOrderNo?l("Remove"):l("Add")}}));return console.log(s),s});function h(s,o){return String(s).padStart(o,"0")}const L=s=>s.routeOrderNo?"/images/markers/black"+h(s.routeOrderNo,2)+".png":{path:me.INDUSTRY,scale:1,strokeColor:"black",strokeOpacity:.1,fillColor:"black",fillOpacity:1,anchor:{x:15,y:30}};t.$persistedState.isReady().then(async()=>{if(t.orders)v.value=t.orders;else{const s=await u.get("orders");v.value=s,t.orders=v.value}});const _=async s=>{var x;let o=(x=v.value)==null?void 0:x.filter(R=>R.orderId==s)[0];if(o&&v.value&&w.value)if(o!=null&&o.routeOrderNo){o.routeOrderNo=void 0;let R=1;v.value.filter($=>$.routeOrderNo).sort(($,d)=>$.routeOrderNo-d.routeOrderNo).forEach($=>{$.routeOrderNo=R++}),c("orderRemoved",s)}else console.error(w.value.waypoints.length),o.routeOrderNo=w.value.waypoints.length+1,c("orderAdded",s);p.value=null},A=async s=>{b.push({name:"Order",params:{orderId:s.toString()}})},G=async()=>{p.value=null},E=async(s,o)=>{p.value=s.id};return(s,o)=>{const x=z("GMapInfoWindow"),R=z("GMapMarker"),$=z("GMapMap");return a(),m(T,null,[r($,{class:"pb-2",center:f.value,zoom:9,options:{gestureHandling:"greedy"},"map-type-id":"terrain",onClick:G,onIdle:o[0]||(o[0]=d=>c("mapIsReady"))},{default:y(()=>[(a(!0),m(T,null,P(I(g),(d,Y)=>(a(),M(R,{key:Y,position:d.position,clickable:d.clickable,draggable:d.draggable,icon:d.icon,onClick:Ze=>E(d)},{default:y(()=>[p.value===d.id?(a(),m("div",be,[r(x,{"v-if":p.value===d.id,closeclick:!0,onCloseclick:G},{default:y(()=>[r(ce,{id:d.id,header:d.infoWindow.header,footer:d.infoWindow.footer,"button-text":d.infoWindow.buttonText,onAddToRouteClicked:_,onInfoClicked:A},null,8,["id","header","footer","button-text"])]),_:2},1032,["v-if"])])):K("",!0)]),_:2},1032,["position","clickable","draggable","icon","onClick"]))),128))]),_:1},8,["center"]),e("div",_e,[e("button",null,[(a(),M(Z(I(te)),{class:"text-indigo-600 w-6 h-6"}))]),e("div",ye,[r(fe,{class:"w-full"})]),e("button",we,[(a(),M(Z(I(re)),{class:"text-indigo-600 w-6 h-6"}))])])],64)}}});const ke=e("div",{class:"hidden lg:block"},"big screen not supported yet",-1),Le={class:"bg-white"},Re={key:0,class:"bg-white"},$e=e("hr",{class:"border"},null,-1),Me=e("div",{class:"absolute ml-5 w-5"},[e("div",{class:"bg-gray-300 w-1 h-1 rounded-full mt-1 m-auto place-self-center"}),e("div",{class:"bg-gray-300 w-3 h-3 rounded-full mt-1 m-auto place-self-center"}),e("div",{style:{},class:"bg-gray-300 w-1 h-1 rounded-full mt-1 m-auto place-self-center"}),e("div",{class:"bg-gray-300 w-1 h-1 rounded-full mt-1 m-auto place-self-center"}),e("div",{class:"bg-gray-300 w-1 h-1 rounded-full mt-1 m-auto place-self-center"})],-1),Ce=e("hr",{class:"border ml-6"},null,-1),Ie={class:"absolute ml-5 w-5"},Se=e("div",{class:"bg-gray-300 w-1 h-1 rounded-full mt-1 m-auto place-self-center"},null,-1),Oe=e("hr",{class:"border"},null,-1),Te={key:1,class:"bg-white"},Ne={class:"bg-white"},Ae=N({name:"RouteDetails",props:{selectedRoute:null},setup(i){const c=new W(B());D();const n=H(),u=k(),b=F(()=>{var t;return(t=u.value)!=null&&t.waypoints?u.value.waypoints.length>0:!1});return n.$persistedState.isReady().then(async()=>{n.selectedRoute||c.get("routes/{}"),u.value=n.selectedRoute}),(t,l)=>(a(),m(T,null,[ke,r(X,{class:"lg:hidden"},{content:y(()=>{var f,p;return[r(O,{title:t.$t("Route")},null,8,["title"]),e("tbody",Le,[r(C,{header:(f=u.value)==null?void 0:f.description,footer1:"Footer"},null,8,["header"])]),r(O,{title:t.$t("Directions")},null,8,["title"]),I(b)?(a(),m("tbody",Re,[(a(!0),m(T,null,P((p=u.value)==null?void 0:p.waypoints,(v,w)=>(a(),m("div",{key:w},[$e,r(C,{header:"First waypoint",footer1:"Address",footer2:"Samples collected","no-borders":!0,styles:"padding-left:1.5rem"},{default:y(()=>[Me]),_:1},8,["styles"])]))),128)),Ce,r(C,{header:"Home",footer1:"Address","no-borders":!0,styles:"padding-left:1.5rem"},{default:y(()=>[e("div",Ie,[Se,(a(),M(Z(I(oe)),{class:"text-gray-300 w-5 h-5 mt-1 m-auto place-self-center"}))])]),_:1},8,["styles"]),Oe])):(a(),m("tbody",Te,[r(C,{header:"No directions to show",footer1:"Add orders to the route in the overview"})])),r(O,{title:t.$t("Packaging")},null,8,["title"]),e("tbody",Ne,[r(C,{header:"First bottle",footer1:"description"})]),r(O)]}),_:1})],64))}}),ze={class:"w-screen max-w-full"},Ge=N({name:"OrdersOverviewPage",setup(i){const c=Q.exports.useLoading();D();const n=U(),u=H();new W(B());const b=k(0),t=k(),l=g=>{var L;const h=(L=n.orders)==null?void 0:L.filter(_=>_.orderId==g)[0];t.value&&h&&t.value.waypoints.push({orderId:h.orderId,contact:h.contact,lat:h.latitude,lon:h.longitude,places:h.samples.map(_=>_.place)})},f=g=>{var L;const h=(L=n.orders)==null?void 0:L.filter(_=>_.orderId==g)[0];if(t.value&&h){const _=t.value.waypoints.filter(A=>A.orderId==g);t.value.waypoints=_}};n.$persistedState.isReady().then(async()=>{n.selectedTabIndex&&(b.value=n.selectedTabIndex,n.selectedTabIndex=0)}),b.value=0,u.$persistedState.isReady().then(async()=>{u.selectedRoute&&(t.value=u.selectedRoute)});const p=async g=>{b.value=g},v=c.show({isFullPage:!0,loader:"dots",canCancel:!1});setTimeout(()=>{v.hide()},5e3);const w=async()=>{v.hide()};return(g,h)=>(a(),m("div",ze,[r(ee,{"selected-tab-index":b.value,classes:"mb-2",onSelectedTabChanged:p},{default:y(()=>[r(V,{title:g.$t("Overview")},{default:y(()=>[r(xe,{"selected-route":t.value,onMapIsReady:w,onOrderAdded:l,onOrderRemoved:f},null,8,["selected-route"])]),_:1},8,["title"]),r(V,{title:g.$t("Route details")},{default:y(()=>[r(Ae,{"selected-route":t.value},null,8,["selected-route"])]),_:1},8,["title"])]),_:1},8,["selected-tab-index"])]))}});export{Ge as default};
