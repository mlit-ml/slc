if(!self.define){let e,s={};const l=(l,i)=>(l=new URL(l+".js",i).href,s[l]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=l,e.onload=s,document.head.appendChild(e)}else e=l,importScripts(l),s()})).then((()=>{let e=s[l];if(!e)throw new Error(`Module ${l} didn’t register its module`);return e})));self.define=(i,r)=>{const n=e||("document"in self?document.currentScript.src:"")||location.href;if(s[n])return;let a={};const u=e=>l(e,n),c={module:{uri:n},exports:a,require:u};s[n]=Promise.all(i.map((e=>c[e]||u(e)))).then((e=>(r(...e),a)))}}define(["./workbox-c1760cce"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.clientsClaim(),e.precacheAndRoute([{url:"assets/apiService.61d13de6.js",revision:null},{url:"assets/apiService.94036c7b.css",revision:null},{url:"assets/customersStore.7f0c0aa1.js",revision:null},{url:"assets/HomePage.e4594ac4.js",revision:null},{url:"assets/index.3d6e101b.css",revision:null},{url:"assets/index.90b462b0.js",revision:null},{url:"assets/LoginPage.c639bdcb.js",revision:null},{url:"assets/OrderPage.6cac5c14.css",revision:null},{url:"assets/OrderPage.f3e8645e.js",revision:null},{url:"assets/OrdersOverviewPage.4156111c.css",revision:null},{url:"assets/OrdersOverviewPage.62c4be94.js",revision:null},{url:"assets/ordersStore.2f2132b0.js",revision:null},{url:"assets/RouteDetails.7a8cd7d5.css",revision:null},{url:"assets/RouteDetails.a18f93c8.js",revision:null},{url:"assets/routeHelper.f7d73c44.js",revision:null},{url:"assets/RoutesPage.fa3229b5.js",revision:null},{url:"assets/SamplePage.3cf6a083.js",revision:null},{url:"assets/SamplePage.8fe4071c.css",revision:null},{url:"assets/SchedulingPage.05aeb0d1.css",revision:null},{url:"assets/SchedulingPage.cb1d6ec2.js",revision:null},{url:"assets/Tab.586fe730.js",revision:null},{url:"assets/Tab.d691ab80.css",revision:null},{url:"callback.html",revision:"fa4626b2ad16b27db01d13d722e5acaf"},{url:"index.html",revision:"92c2d0742759268c913d0da26c08a309"},{url:"js/oidc-client.min.js",revision:"973a9da7179da95cccf9818bc0c17242"},{url:"silent-renew.html",revision:"0c550cd18dc2fa09ecf9316d3555bb35"},{url:"favicon.png",revision:"8867322c2894b17b790f2f1f05808edf"},{url:"logo_144.png",revision:"719c57419650c9e9a93975729823a5bf"},{url:"logo_192.png",revision:"10ebea5a91e3b838cecaeb4d5044722c"},{url:"logo_512.png",revision:"d2fef909f4de265fe7856a39a26cf64d"},{url:"manifest.webmanifest",revision:"e368277762a65b38aa6c5484a55379f5"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
