import{d as m,l as b,K as T,w as y,L as k,z as C,o as n,b as o,g as v,n as _,F as g,h as w,t as I,f,_ as $,M as S,C as B,D,a as z}from"./index.322ac4ed.js";const F={class:"text-sm font-small text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700"},L=["onClick"],N=m({name:"Tabs",props:{classes:null,selectedTabIndex:null},emits:["selectedTabChanged"],setup(d,{emit:c}){const t=d,a=b(t.selectedTabIndex),i=b();T("selectedTitle",i),y(()=>t.selectedTabIndex,e=>{u(e)});const r=b(),l=k(),x=e=>e==a.value?"text-indigo-500 border-indigo-500 active dark:text-indigo-500 dark:border-indigo-500":"hover:text-gray-900 hover:border-gray-300 dark:hover:text-gray-300",u=async e=>{a.value=e,r.value&&(i.value=r.value[e].title),c("selectedTabChanged",e)};return C(()=>{var e;l&&(r.value=(e=l.default)==null?void 0:e.call(l).map(p=>{var s;return{title:(s=p.props)==null?void 0:s.title}}),u(a.value))}),(e,p)=>(n(),o(g,null,[v("div",F,[v("ul",{id:"orders-tabs",class:_([t.classes,"flex flex-wrap"]),"data-tabs-toggle":"#orders-tabs-content",role:"tablist"},[(n(!0),o(g,null,w(r.value,(s,h)=>(n(),o("li",{key:s.title,class:"mr-2",onClick:E=>u(h)},[v("a",{href:"#",class:_(["inline-block p-1 rounded-t-lg border-b-2 border-transparent",x(h)])},I(s.title),3)],8,L))),128))],2)]),f(e.$slots,"default")],64))}});const M={class:"tab tab-height relative"},j=m({name:"Tab",props:{title:null},setup(d){const c=d,t=S("selectedTitle");return(a,i)=>B((n(),o("div",M,[f(a.$slots,"default",{},void 0,!0)],512)),[[D,c.title==z(t)]])}});var V=$(j,[["__scopeId","data-v-231b3696"]]);export{V as T,N as _};
