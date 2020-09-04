(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{15:function(e,t,a){"use strict";a.d(t,"a",(function(){return C}));var i=a(24),l=a(6),s=a(25);class n{static build(e,t,a){const i=document.createElement(e);for(const[e,a]of Object.entries(t))switch(e){case"cssText":i.style.cssText=a;break;case"dataset":for(const[e,t]of Object.entries(a))i.dataset[e]=t;break;default:i[e]=a}return a&&i.append(...a),i}static link(e,t,a){return n.build("a",{href:e,title:t,target:"_blank",rel:"noopener",innerHTML:a})}}class r{constructor(){this.parent=null,Object.defineProperty(this,"parent",{enumerable:!1})}init(e){this.parent=e}render(){}}var c=a(7);class d extends r{constructor(){super(...arguments),this.ctrl=null,this.events={selectStyle:()=>{}}}init(e){super.init(e),this.render()}render(){const e=n.build("ul",{className:"mdc-list",role:"menu",ariaOrientation:"vertical"});for(const t in c.a.styles){const a=n.build("li",{className:"mdc-list-item",role:"menuitem",dataset:{code:parseInt(t)}},[n.build("span",{className:"mdc-list-item__text",innerHTML:c.a.styles[t].title})]);e.append(a)}const t=n.build("div",{className:"mdc-menu mdc-menu-surface"},[e]),a=n.build("div",{className:"mdc-menu-surface--anchor"},[t]);this.parent.append(a),this.ctrl=new i.a(t),this.ctrl.listen("MDCMenu:selected",e=>{const t=e.detail.item;this.events.selectStyle(parseInt(t.dataset.code),t.querySelector("span").innerHTML)})}open(){this.ctrl.open||(this.ctrl.open=!0)}}class o extends r{constructor(){super(...arguments),this.menu=new d,this.elementPreference=null,this.elementMenu=null,this.events={openPreference:()=>{},selectStyle:()=>{}}}init(e){super.init(e),this.render()}render(){const e=n.build("section",{className:["mdc-top-app-bar__section","mdc-top-app-bar__section--align-end"].join(" ")});this.elementPreference=n.build("button",{className:"mdc-icon-button fa",title:"Preference",innerHTML:"&#xf013"}),e.append(this.elementPreference);const t=new l.a(this.elementPreference);t.unbounded=!0,t.listen("click",()=>this.events.openPreference());const a=n.build("span",{className:"mdc-button__label",innerHTML:c.a.selectedStyle.title});this.elementMenu=n.build("button",{className:"mdc-button mdc-button--unelevated"},[a]),e.append(this.elementMenu);const i=new l.a(this.elementMenu);this.menu.init(e),this.menu.events.selectStyle=(e,t)=>{a.innerHTML=t,this.events.selectStyle(e)},i.listen("click",()=>this.menu.open());const r=n.build("header",{className:"mdc-top-app-bar"},[n.build("div",{className:"mdc-top-app-bar__row"},[n.build("section",{className:["mdc-top-app-bar__section","mdc-top-app-bar__section--align-start"].join(" ")},[n.build("span",{className:"mdc-top-app-bar__title",innerHTML:"Mapler"})]),e])]);this.parent.append(r),this.parent.append(n.build("div",{className:"mdc-top-app-bar--fixed-adjust"})),new s.a(r)}enable(){this.elementPreference.disabled=!1,this.elementMenu.disabled=!1}disable(){this.elementPreference.disabled=!0,this.elementMenu.disabled=!0}}var p=a(9),h=a.n(p),m=a(2);class u extends r{constructor(){super(...arguments),this.container=null,this.ctrl=null,this.events={idle:()=>{}}}init(e){super.init(e),h.a.accessToken="pk.eyJ1IjoibHVja2EtbWUiLCJhIjoiY2poa2xyN3J4MGJ0bTM3bjV5bjdvNDh3ZSJ9.QztckHrHyEuKp5_pVXmpIw",this.render()}render(){this.container=n.build("div",{cssText:"flex: 1"}),this.parent.append(this.container),this.ctrl=new h.a.Map({container:this.container,style:c.a.selectedStyle.uri,center:[m.a.get("mapler.camera.lon"),m.a.get("mapler.camera.lat")],zoom:m.a.get("mapler.camera.zoom"),bearing:m.a.get("mapler.camera.bearing"),pitch:m.a.get("mapler.camera.tilt"),preserveDrawingBuffer:!0}),this.ctrl.once("load",()=>{m.a.get("mapler.display.labels")||this.setLabels(!1),this.ctrl.resize()}),this.ctrl.on("idle",()=>this.onIdle()),this.ctrl.addControl(new h.a.NavigationControl),this.ctrl.addControl(new h.a.GeolocateControl({positionOptions:{enableHighAccuracy:!0},showUserLocation:!1}))}onIdle(){const e=this.ctrl.getCenter(),t=this.ctrl.getZoom(),a=this.ctrl.getBearing(),i=this.ctrl.getPitch();this.events.idle(e.lng,e.lat,t,a,i),m.a.set("mapler.camera.lon",e.lng),m.a.set("mapler.camera.lat",e.lat),m.a.set("mapler.camera.zoom",t),m.a.set("mapler.camera.bearing",a),m.a.set("mapler.camera.tilt",i)}setLabels(e){m.a.set("mapler.display.labels",e),this.ctrl.getStyle().layers.forEach(t=>{"symbol"===t.type&&this.ctrl.setLayoutProperty(t.id,"visibility",e?"visible":"none")})}setStyle(e){this.ctrl.setStyle(c.a.select(e).uri),m.a.get("mapler.display.labels")||this.ctrl.once("styledata",e=>{this.setLabels(!1)})}setCamera(e,t,a,i,l){this.ctrl.flyTo({center:[e,t],zoom:a,bearing:i,pitch:l})}shot(e,t,a,i){const l=n.build("img",{cssText:"position: fixed; left: 0; bottom: 0; z-index: 5;",src:this.ctrl.getCanvas().toDataURL()});this.parent.append(l);const s=this.ctrl.getBounds();this.container.style.cssText=["position: fixed","top: 0","left:0;",`width: ${t/i}px`,`height: ${a/i}px`].join(";"),this.ctrl.resize(),this.ctrl.fitBounds(s),this.ctrl.once("idle",()=>{const t=n.build("a",{href:this.ctrl.getCanvas().toDataURL(),download:"Mapler.png",cssText:"display:none"});this.parent.append(t),t.click(),this.parent.removeChild(t),this.container.style.cssText="flex: 1",this.ctrl.resize(),this.ctrl.fitBounds(s),this.parent.removeChild(l),e()})}}var b=a(14),g=a(26),v=a(27),f=a(23);class w{constructor(){this.camera={longitude:null,latitude:null,zoom:null,bearing:null,tilt:null},this.size={width:null,height:null,pixelRatio:null},this.display={labels:null}}}class x extends r{constructor(){super(...arguments),this.ctrl=null,this.panelCtrl=new w,this.events={setCamera:()=>{},setLabels:()=>{}}}render(){const e=[];e.push(n.build("h2",{className:"mdc-dialog__title",innerHTML:"Preference"}));const t=[];t.push(this.buildHeadline("Camera"));const a=[],i=this.buildTextfield("text","decimal","Longitude","input-pref-camera-lon");this.panelCtrl.camera.longitude=new f.a(i),this.panelCtrl.camera.longitude.value=m.a.get("mapler.camera.lon");const s=this.buildTextfield("text","decimal","Latitude ","input-pref-camera-lat");this.panelCtrl.camera.latitude=new f.a(s),this.panelCtrl.camera.latitude.value=m.a.get("mapler.camera.lat"),a.push(n.build("div",{className:"flex-box-row--nowrap flex-align-items--baseline"},[i,s]));const r=this.buildTextfield("text","decimal","Zoom","input-pref-camera-zoom");this.panelCtrl.camera.zoom=new f.a(r),this.panelCtrl.camera.zoom.value=m.a.get("mapler.camera.zoom");const c=this.buildTextfield("text","decimal","Bearing","input-pref-camera-bearing");this.panelCtrl.camera.bearing=new f.a(c),this.panelCtrl.camera.bearing.value=m.a.get("mapler.camera.bearing");const d=this.buildTextfield("text","decimal","Tilt","input-pref-camera-tilt");this.panelCtrl.camera.tilt=new f.a(d),this.panelCtrl.camera.tilt.value=m.a.get("mapler.camera.tilt"),a.push(r,c,d);const o=n.build("button",{className:"mdc-button mdc-button--unelevated margin-v--8 margin-h--4"},[n.build("span",{className:"mdc-button__label",innerHTML:"Set"})]);new l.a(o).listen("click",()=>this.onSetCamera()),t.push(n.build("div",{className:"flex-box-row--wrap flex-align-items--center"},a)),t.push(this.buildHeadline("Size"));const p=window.devicePixelRatio,h=this.buildTextfield("number","numeric","Width","input-pref-size-width");this.panelCtrl.size.width=new f.a(h),this.panelCtrl.size.width.value=""+window.screen.width*p;const u=this.buildTextfield("number","numeric","Height","input-pref-size-height");this.panelCtrl.size.height=new f.a(u),this.panelCtrl.size.height.value=""+window.screen.height*p;const w=this.buildTextfield("number","numeric","Pixel Ratio","input-pref-size-pixelRatio");this.panelCtrl.size.pixelRatio=new f.a(w),this.panelCtrl.size.pixelRatio.value=""+p,t.push(h,u,w),t.push(this.buildHeadline("Display"));const x=n.build("div",{className:"mdc-switch"},[n.build("div",{className:"mdc-switch__track"}),n.build("div",{className:"mdc-switch__thumb-underlay",id:"input-pref-display-labels"},[n.build("div",{className:"mdc-switch__thumb"},[n.build("input",{type:"checkbox",className:"mdc-switch__native-control",role:"switch"})])])]),N=n.build("div",{className:"mdc-switch-box margin-h--4"},[x,n.build("label",{for:"input-pref-display-labels",title:"Labels",innerHTML:"Labels"})]);this.panelCtrl.display.labels=new v.a(x),this.panelCtrl.display.labels.checked=m.a.get("mapler.display.labels"),this.panelCtrl.display.labels.listen("change",()=>{this.events.setLabels(this.panelCtrl.display.labels.checked)}),t.push(N),t.push(this.buildHeadline("About")),t.push(n.build("span",{className:"mdc-typography--body2"},[n.link("https://github.com/lucka-me/mapler","GitHub","Repository")])),t.push(n.build("span",{className:"mdc-typography--body2"},[n.link("https://github.com/lucka-me/mapler/blob/master/CHANGELOG.md","Changelog",b.version)," by ",n.link("https://lucka.moe","Blog","Lucka")])),e.push(n.build("div",{className:"mdc-dialog__content flex-box-col scrollable"},t)),e.push(n.build("footer",{className:"mdc-dialog__actions"},[n.build("button",{className:"mdc-button mdc-dialog__button",dataset:{mdcDialogAction:"close"}},[n.build("span",{className:"mdc-button__label",innerHTML:"Close"})])]));const C=n.build("div",{className:"mdc-dialog mdc-dialog--scrollable",role:"dialog",ariaModal:!0},[n.build("div",{className:"mdc-dialog__container"},[n.build("div",{className:"mdc-dialog__surface"},e)]),n.build("div",{className:"mdc-dialog__scrim"})]);this.parent.append(C),this.ctrl=new g.a(C)}open(){this.ctrl||this.render(),this.ctrl.open()}get size(){let e=window.devicePixelRatio,t=e*window.screen.width,a=e*window.screen.height;return this.ctrl&&(e=parseFloat(this.panelCtrl.size.pixelRatio.value),isNaN(e)&&(e=window.devicePixelRatio,this.panelCtrl.size.pixelRatio.value=""+e),t=parseInt(this.panelCtrl.size.width.value),(isNaN(t)||t<1)&&(t=e*window.screen.width,this.panelCtrl.size.width.value=""+t),a=parseInt(this.panelCtrl.size.height.value),(isNaN(a)||a<1)&&(a=e*window.screen.height,this.panelCtrl.size.height.value=""+a)),[t,a,e]}updateCamera(e,t,a,i,l){this.ctrl&&(this.panelCtrl.camera.longitude.value=""+e,this.panelCtrl.camera.latitude.value=""+t,this.panelCtrl.camera.zoom.value=""+a,this.panelCtrl.camera.bearing.value=""+i,this.panelCtrl.camera.tilt.value=""+l)}onSetCamera(){let e=!0,t=parseFloat(this.panelCtrl.camera.longitude.value);(isNaN(t)||t<-180||t>180)&&(t=m.a.get("mapler.camera.lon"),this.panelCtrl.camera.longitude.value=""+t,e=!1);let a=parseFloat(this.panelCtrl.camera.latitude.value);(isNaN(a)||a<-90||a>90)&&(a=m.a.get("mapler.camera.lat"),this.panelCtrl.camera.latitude.value=""+a,e=!1);let i=parseFloat(this.panelCtrl.camera.zoom.value);(isNaN(i)||i<0||i>20)&&(i=m.a.get("mapler.camera.zoom"),this.panelCtrl.camera.zoom.value=""+i,e=!1);let l=parseFloat(this.panelCtrl.camera.bearing.value);(isNaN(l)||l<0||l>360)&&(l=m.a.get("mapler.camera.bearing"),this.panelCtrl.camera.bearing.value=""+l,e=!1);let s=parseFloat(this.panelCtrl.camera.tilt.value);(isNaN(s)||s<0||s>60)&&(s=m.a.get("mapler.camera.tilt"),this.panelCtrl.camera.tilt.value=""+s,e=!1),e&&this.events.setCamera(t,a,i,l,s)}buildHeadline(e){return n.build("span",{className:"mdc-typography--headline6",innerHTML:e})}buildTextfield(e,t,a,i){return n.build("div",{className:"mdc-text-field mdc-text-field--outlined margin-v--8 margin-h--4"},[n.build("input",{type:e,inputmode:t,id:i,className:"mdc-text-field__input"}),n.build("div",{className:"mdc-notched-outline"},[n.build("div",{className:"mdc-notched-outline__leading"}),n.build("div",{className:"mdc-notched-outline__notch"},[n.build("label",{for:i,innerHTML:a,className:"mdc-floating-label"})]),n.build("div",{className:"mdc-notched-outline__trailing"})])])}}class N extends r{constructor(){super(...arguments),this.ctrl=null,this.events={click:()=>{}}}init(e){super.init(e),this.render()}render(){const e=n.build("button",{className:"mdc-fab mdc-fab--extended",cssText:["position: fixed","bottom: 2rem","left: 50%","transform: translateX(-50%)"].join(";")},[n.build("div",{className:"mdc-fab__ripple"}),n.build("span",{className:"mdc-fab__icon fa",innerHTML:"&#xf030"}),n.build("span",{className:"mdc-fab__label"},["Snapshot"])]);this.parent.append(e),this.ctrl=new l.a(e),this.ctrl.listen("click",()=>this.events.click())}show(){this.ctrl.root.classList.remove("mdc-fab--exited")}hide(){this.ctrl.root.classList.add("mdc-fab--exited")}}class C{constructor(){this.appBar=new o,this.map=new u,this.panelDialog=new x,this.shotAction=new N}init(){const e=document.body;e.className="mdc-typography flex-box-col",this.appBar.init(e),this.map.init(e),this.shotAction.init(e),this.panelDialog.init(e),this.panelDialog.events.setLabels=e=>this.map.setLabels(e),this.appBar.events.openPreference=()=>this.panelDialog.open(),this.appBar.events.selectStyle=e=>this.map.setStyle(e),this.map.events.idle=(...e)=>this.panelDialog.updateCamera(...e),this.shotAction.events.click=()=>{this.appBar.disable(),this.shotAction.hide(),this.map.shot(()=>{this.appBar.enable(),this.shotAction.show()},...this.panelDialog.size)}}}}}]);