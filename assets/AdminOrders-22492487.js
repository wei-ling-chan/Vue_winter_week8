import{M as g}from"./modal-26fe6acd.js";import{_ as f,o,a as d,b as t,t as l,h as p,F as h,l as b,bt as v,bg as M,g as $,d as k,r as O,n as w}from"./index-f7d035f6.js";import"./base-component-373a2dc8.js";const A={props:["order"],data(){return{modal:"",tempOrder:{}}},methods:{openModal(){this.modal.show()},hideModal(){this.modal.hide()},changestatus(e){this.$emit("change-status",e)},formattedDate(e,n){return new Date(e*1e3).toLocaleDateString(void 0,{dateFormat:n})}},watch:{order(){this.tempOrder=this.order}},mounted(){this.modal=new g(this.$refs.ordermodal)}},P={class:"modal fade",id:"orderModal",tabindex:"-1",role:"dialog","aria-labelledby":"exampleModalLabel","aria-hidden":"true",ref:"ordermodal"},V={class:"modal-dialog modal-xl",role:"document"},E={class:"modal-content border-0"},L=t("div",{class:"modal-header bg-dark text-white"},[t("h5",{class:"modal-title",id:"exampleModalLabel"},[t("span",null,"訂單細節")]),t("button",{type:"button",class:"btn-close","data-bs-dismiss":"modal","aria-label":"Close"})],-1),T={class:"modal-body"},S={class:"row"},I={class:"col-md-4"},U=t("h3",null,"用戶資料",-1),B={class:"table"},F={key:0},N=t("th",{style:{width:"100px"}},"姓名",-1),R=t("th",null,"Email",-1),z=t("th",null,"電話",-1),q=t("th",null,"地址",-1),H={class:"col-md-8"},j=t("h3",null,"訂單細節",-1),G={class:"table"},J=t("th",{style:{width:"100px"}},"訂單編號",-1),K=t("th",null,"下單時間",-1),Q=t("th",null,"付款時間",-1),W={key:0},X={key:1},Y=t("th",null,"付款狀態",-1),Z={key:0,class:"text-success"},tt={key:1,class:"text-muted"},et=t("th",null,"總金額",-1),st=t("h3",null,"選購商品",-1),ot={class:"table"},dt=t("thead",null,[t("tr")],-1),lt=t("td",{class:"text-end"},null,-1),nt={class:"d-flex justify-content-end"},rt={class:"form-check"},at={class:"form-check-label",for:"flexCheckDefault"},it={key:0},ct={key:1},ht={class:"modal-footer"},_t=t("button",{type:"button",class:"btn btn-outline-secondary","data-bs-dismiss":"modal"}," 取消 ",-1);function ut(e,n,_,y,s,a){return o(),d("div",P,[t("div",V,[t("div",E,[L,t("div",T,[t("div",S,[t("div",I,[U,t("table",B,[s.tempOrder.user?(o(),d("tbody",F,[t("tr",null,[N,t("td",null,l(s.tempOrder.user.name),1)]),t("tr",null,[R,t("td",null,l(s.tempOrder.user.email),1)]),t("tr",null,[z,t("td",null,l(s.tempOrder.user.tel),1)]),t("tr",null,[q,t("td",null,l(s.tempOrder.user.address),1)])])):p("",!0)])]),t("div",H,[j,t("table",G,[t("tbody",null,[t("tr",null,[J,t("td",null,l(s.tempOrder.id),1)]),t("tr",null,[K,t("td",null,l(a.formattedDate(s.tempOrder.create_at,"yyyy-MM-dd")),1)]),t("tr",null,[Q,t("td",null,[s.tempOrder.paid_date?(o(),d("span",W,l(a.formattedDate(s.tempOrder.paid_date,"yyyy-MM-dd")),1)):(o(),d("span",X,"時間不正確"))])]),t("tr",null,[Y,t("td",null,[s.tempOrder.is_paid?(o(),d("strong",Z,"已付款")):(o(),d("span",tt,"尚未付款"))])]),t("tr",null,[et,t("td",null,l(s.tempOrder.total),1)])])]),st,t("table",ot,[dt,t("tbody",null,[(o(!0),d(h,null,b(s.tempOrder.products,i=>(o(),d("tr",{key:i.id},[t("th",null,l(i.product.title),1),t("td",null,l(i.qty)+" / "+l(i.product.unit),1),lt]))),128))])]),t("div",nt,[t("div",rt,[v(t("input",{class:"form-check-input",type:"checkbox",value:"",id:"flexCheckDefault","onUpdate:modelValue":n[0]||(n[0]=i=>s.tempOrder.is_paid=i)},null,512),[[M,s.tempOrder.is_paid]]),t("label",at,[s.tempOrder.is_paid?(o(),d("span",it,"已付款")):(o(),d("span",ct,"未付款"))])])])])])]),t("div",ht,[_t,t("button",{type:"button",class:"btn btn-info",onClick:n[1]||(n[1]=i=>a.changestatus(s.tempOrder))}," 修改付款狀態 ")])])])],512)}const mt=f(A,[["render",ut]]),pt={props:["order"],data(){return{tempOrder:{}}},methods:{delorder(){this.tempOrder=this.order},openModal(){this.modal.show()},hideModal(){this.modal.hide()}},watch:{order(){this.tempOrder=this.order}},mounted(){const e=document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,"$1");this.$http.defaults.headers.common.Authorization=e,this.modal=new g(this.$refs.delOrderModal)}},bt={class:"modal fade",id:"delOrderModal",tabindex:"-1",role:"dialog","aria-labelledby":"exampleModalLabel","aria-hidden":"true",ref:"delOrderModal"},ft={class:"modal-dialog",role:"document"},yt={class:"modal-content border-0"},$t={class:"modal-header bg-danger text-white"},kt={class:"modal-title"},Ot=t("button",{type:"button",class:"btn-close","data-bs-dismiss":"modal","aria-label":"Close"},null,-1),gt={class:"modal-body"},vt={class:"text-danger"},Mt={class:"modal-footer"},xt=t("button",{type:"button",class:"btn btn-outline-secondary","data-bs-dismiss":"modal"},"取消 ",-1);function Ct(e,n,_,y,s,a){return o(),d("div",bt,[t("div",ft,[t("div",yt,[t("div",$t,[t("h5",kt,[t("span",null,"刪除 "+l(s.tempOrder.id),1)]),Ot]),t("div",gt,[$(" 是否刪除 "),t("strong",vt,l(s.tempOrder.id),1),$(" (刪除後將無法恢復)。 ")]),t("div",Mt,[xt,t("button",{type:"button",class:"btn btn-danger",onClick:n[0]||(n[0]=i=>e.$emit("del-item"))},"確認刪除 ")])])])],512)}const Dt=f(pt,[["render",Ct]]),{VITE_APP_URL:u,VITE_APP_PATH:m}={VITE_APP_URL:"https://vue3-course-api.hexschool.io",VITE_APP_PATH:"wlc606",BASE_URL:"/vue_winter_week8/",MODE:"production",DEV:!1,PROD:!0},wt={data(){return{adminOrders:[],tempOrder:{},currentPage:1,timestamp:"",orderComponent:"",delorderComponent:"",paid:{}}},components:{AdminOrdermodal:mt,DelOrdermodal:Dt},methods:{getAdminOrders(e=1){this.currentPage=e,this.$http.get(`${u}/v2/api/${m}/admin/orders?page=${e}`).then(n=>{this.adminOrders=n.data.orders,this.formattedDate()}).catch(n=>{alert(n.response.data.message)})},updatePaid(e){this.paid={is_paid:e.is_paid},this.$http.put(`${u}/v2/api/${m}/admin/order/${e.id}`,{data:this.paid}).then(n=>{alert(n.data.message),this.orderComponent.hideModal(),this.getAdminOrders()})},delAdminOrder(){this.$http.delete(`${u}/v2/api/${m}/admin/order/${this.tempOrder.id}`).then(e=>{alert(e.data.message),this.delorderComponent.hideModal(),this.getAdminOrders()}).catch(e=>{alert(e.response.data.message)})},openModal(e){this.tempOrder={...e},this.orderComponent=this.$refs.orderModal,this.orderComponent.openModal()},delOrderModal(e){this.tempOrder={...e},this.delorderComponent=this.$refs.delOrderModal,this.delorderComponent.openModal()},formattedDate(e,n){return new Date(e*1e3).toLocaleDateString(void 0,{dateFormat:n})}},mounted(){const e=document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,"$1");this.$http.defaults.headers.common.Authorization=e,this.getAdminOrders()}},At=t("h1",null,"這是後台訂單列表",-1),Pt={class:"table mt-4"},Vt=t("thead",null,[t("tr",null,[t("th",null,"購買時間"),t("th",null,"Email"),t("th",null,"購買款項"),t("th",null,"應付金額"),t("th",null,"是否付款"),t("th",null,"編輯")])],-1),Et=["textContent"],Lt={class:"list-unstyled"},Tt={class:"text-right"},St={class:"form-check form-switch"},It=["id","onUpdate:modelValue","onChange"],Ut=["for"],Bt={key:0},Ft={key:1},Nt={class:"btn-group"},Rt=["onClick"],zt=["onClick"];function qt(e,n,_,y,s,a){const i=O("AdminOrdermodal"),x=O("DelOrdermodal");return o(),d(h,null,[At,t("table",Pt,[Vt,t("tbody",null,[(o(!0),d(h,null,b(s.adminOrders,(r,C)=>(o(),d(h,{key:C+"12345"},[s.adminOrders.length?(o(),d("tr",{key:0,class:w({"text-secondary":!r.is_paid})},[t("td",null,l(a.formattedDate(r.create_at,"yyyy-MM-dd")),1),t("td",null,[r.user?(o(),d("span",{key:0,textContent:l(r.user.email)},null,8,Et)):p("",!0)]),t("td",null,[t("ul",Lt,[(o(!0),d(h,null,b(r.products,(c,D)=>(o(),d("li",{key:D+"111"},l(c.product.title)+" 數量："+l(c.qty)+" "+l(c.product.unit),1))),128))])]),t("td",Tt,l(r.total),1),t("td",null,[t("div",St,[v(t("input",{class:"form-check-input",type:"checkbox",id:`paidSwitch${r.id}`,"onUpdate:modelValue":c=>r.is_paid=c,onChange:c=>a.updatePaid(r)},null,40,It),[[M,r.is_paid]]),t("label",{class:"form-check-label",for:`paidSwitch${r.id}`},[r.is_paid?(o(),d("span",Bt,"已付款")):(o(),d("span",Ft,"未付款"))],8,Ut)])]),t("td",null,[t("div",Nt,[t("button",{class:"btn btn-outline-info btn-sm",type:"button",onClick:c=>a.openModal(r)}," 檢視 ",8,Rt),t("button",{class:"btn btn-outline-danger btn-sm",type:"button",onClick:c=>a.delOrderModal(r)}," 刪除 ",8,zt)])])],2)):p("",!0)],64))),128))])]),k(i,{ref:"orderModal",order:s.tempOrder,onChangeStatus:a.updatePaid},null,8,["order","onChangeStatus"]),k(x,{ref:"delOrderModal",order:s.tempOrder,onDelItem:a.delAdminOrder},null,8,["order","onDelItem"])],64)}const Jt=f(wt,[["render",qt]]);export{Jt as default};
