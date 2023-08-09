import{_ as T,k as V,m as P,a as n,b as t,F as g,l as y,h as r,n as R,t as i,bt as x,bk as C,d as v,w as k,e as p,g as u,r as U,o as l,q as I,bj as M}from"./index-f7d035f6.js";import{c as E}from"./cartStore-81ff5113.js";import{T as h}from"./toasts-7b69de8e.js";import"./sweetalert2.all-47733a3a.js";const A="/vue_winter_week8/assets/eat-noodle-8bc494a7.png",{VITE_APP_URL:_,VITE_APP_PATH:b}={VITE_APP_URL:"https://vue3-course-api.hexschool.io",VITE_APP_PATH:"wlc606",BASE_URL:"/vue_winter_week8/",MODE:"production",DEV:!1,PROD:!0},N={data(){return{reEnter:!1,showEnter:"",products:[],productId:"",lodingItem:"",lodingItema:"",tempProduct:{},data:{user:{name:"",email:"",tel:""},message:""},coupon_code:"",discount_total_price:"",couponApplied:!1}},methods:{...V(E,["getCart"]),updateCart(s,o){if(o>=1){this.lodingItem=s.id;const w={product_id:s.product.id,qty:o};this.$http.put(`${_}/v2/api/${b}/cart/${s.id}`,{data:w}).then(m=>{h.fire({width:250,title:m.data.message,icon:"success"}),this.getCart(),this.lodingItem=""}).catch(m=>{this.showReEnter(m.response.data.message)})}},deleteCartItem(s){this.lodingItem=s.id,this.$http.delete(`${_}/v2/api/${b}/cart/${s.id}`).then(o=>{h.fire({width:250,title:o.data.message,icon:"success"}),this.lodingItem="",this.getCart()}).catch(o=>{h.fire({width:250,title:o.response.data.message,icon:"error"}),this.lodingItem=""})},deleteCartAll(){this.lodingItem="123",this.$http.delete(`${_}/v2/api/${b}/carts`).then(s=>{h.fire({width:250,title:s.data.message,icon:"success"}),this.lodingItem="",this.getCart()}).catch(s=>{h.fire({width:250,title:s.response.data.message,icon:"error"}),this.lodingItem=""})},order(){const s={data:this.data};this.$http.post(`${_}/v2/api/${b}/order`,s).then(o=>{this.$router.push(`/checkOrder/${o.data.orderId}`),this.$refs.form.resetForm()}).catch(o=>{h.fire({width:250,title:o.response.data.message,icon:"error"})}),this.cart="",this.$refs.form.resetForm()},showReEnter(s){this.showEnter=s},addCouponCode(){const s={code:this.coupon_code};this.$http.post(`${_}/v2/api/${b}/coupon`,{data:s}).then(o=>{this.discount_total_price=o.data.data.final_total,this.reEnter=!1,h.fire({width:270,title:o.data.message,icon:"success"}),this.lodingItem="",this.couponApplied=!0,this.$refs.coupon_input.value="",this.coupon_code="",this.getCart()}).catch(o=>{this.showReEnter(o.response.data.message),this.reEnter=!0,this.lodingItem=""})},resetForm(){this.$refs.form.resetForm()},nextCart(){this.$router.push("/cartFront")}},computed:{...P(E,["cart","total","final_total"])},mounted(){this.getCart()}},F=t("div",{class:"cart-space"},null,-1),q={class:"cart d-flex flex-column align-items-center mb-5 mb-md-8 mt-4"},z={key:0,class:"d-none d-md-block",style:{width:"100%"}},D=t("div",{class:"position-relative mx-auto mt-4 mb-lg-9 mb-md-8",style:{width:"50%"}},[t("div",{class:"progress",style:{height:"1px"}},[t("div",{class:"progress-bar",role:"progressbar",style:{width:"100%","background-color":"black"},"aria-valuenow":"50","aria-valuemin":"0","aria-valuemax":"100"})]),t("button",{type:"button",class:"position-absolute bg-success text-white top-0 start-0 translate-middle btn btn-sm btn-primary rounded-pill fs-7",style:{width:"6rem",height:"6rem"}},"購物車"),t("button",{type:"button",class:"position-absolute boeder border-dark bg-0 text-dark top-0 start-50 translate-middle btn btn-sm btn-primary rounded-pill fs-7",style:{width:"6rem",height:"6rem"}},"填寫訂單"),t("button",{type:"button",class:"position-absolute bg-primary text-dark top-0 start-100 translate-middle btn btn-sm btn-secondary rounded-pill fs-7",style:{width:"6rem",height:"6rem"}},"完成訂單")],-1),L={class:"container text-end px-md-0 my-4"},S={class:"table align-middle fs-5 container"},j=t("thead",null,[t("tr"),t("tr",{class:"text-center fs-md"},[t("th",{class:"cart-product"},"商品"),t("th",{class:"cart-product"},"品名"),t("th",{class:"cart-product"},"數量"),t("th",{class:"cart-product"},"金額"),t("th",{style:{width:"20%"}})])],-1),O={class:"text-center"},$={key:0,class:"text-center text-info use-coupon"},B={class:"input-group mx-auto cart-amount"},H=["onClick"],G=t("i",{class:"bi bi-dash-lg"},null,-1),J=[G],K=["value"],Q=["onClick"],W=t("i",{class:"bi bi-plus"},null,-1),X=[W],Y={class:"text-center position-relative"},Z={key:0},tt={key:1,class:"text-center"},et={class:"text-center"},st=["onClick","disabled"],ot=t("i",{class:"bi bi-trash3 fs-7"},null,-1),nt={key:0,class:"fas fa-spinner fa-pulse"},lt={style:{border:"0"},class:"fs-md"},dt=t("td",{class:"text-end",style:{border:"0"}},null,-1),at=t("td",{class:"text-end",style:{border:"0"}},null,-1),rt=t("td",{style:{border:"0"}},null,-1),it=t("td",{class:"text-center",style:{border:"0"}},"總計",-1),ct={key:0,class:"fs-md"},ut=t("td",{class:"text-end"},null,-1),ht=t("td",{class:"text-end"},null,-1),pt=t("td",null,null,-1),_t=t("td",{class:"text-center"},"折扣後金額",-1),bt={class:"text-center text-danger"},mt={class:"container px-md-0"},gt={class:"input-group input-group-sm coupon mt-5"},ft={class:"col-xl-3 col-md-3 me-2"},yt=["disabled"],xt={class:"col-xl-3 col-md-3"},vt={class:"input-group-append"},kt=["disabled"],wt={class:"d-flex ms-auto"},Ct={type:"button",class:"btn btn-dark rounded-3 fs-md"},It={key:0,class:"fs-6 mt-1"},Et=t("i",{class:"fa-solid fa-triangle-exclamation me-1 text-info"},null,-1),At={key:1,class:"text-center"},Tt=t("div",{class:"d-flex flex-column justify-content-center"},[t("img",{src:A,class:"d-none d-md-block mx-auto",alt:"趕快去購買喔!",style:{width:"500px",height:"500px"}}),t("img",{src:A,class:"d-block d-md-none mx-auto",alt:"趕快去購買喔!",style:{width:"400px",height:"400px"}}),t("h1",{class:"h5 text-center mb-4 fw-normal"},"購物車還沒有任何商品喔!")],-1),Vt={type:"button",class:"btn btn-dark rounded-0 margin-auto"},Pt={key:2,class:"d-md-none px-11 table-responsive",style:{width:"100%"}},Rt=t("div",{class:"position-relative mx-auto m-5 mb-7",style:{width:"70%"}},[t("div",{class:"progress",style:{height:"1px"}},[t("div",{class:"progress-bar",role:"progressbar",style:{width:"100%","background-color":"black"},"aria-valuenow":"50","aria-valuemin":"0","aria-valuemax":"100"})]),t("button",{type:"button",class:"position-absolute bg-success text-white top-0 start-0 translate-middle btn btn-sm btn-primary rounded-pill fs-7",style:{width:"4rem",height:"4rem"}},"購物車"),t("button",{type:"button",class:"position-absolute boeder border-dark bg-0 text-dark top-0 start-50 translate-middle btn btn-sm btn-primary rounded-pill fs-7",style:{width:"4rem",height:"4rem"}},"填寫訂單"),t("button",{type:"button",class:"position-absolute bg-primary text-dark top-0 start-100 translate-middle btn btn-sm btn-secondary rounded-pill fs-7",style:{width:"4rem",height:"4rem"}},"完成訂單")],-1),Ut={class:"table align-middle"},Mt=t("thead",null,[t("tr",null,[t("th",{class:"text-center"},"商品"),t("th",{class:"text-center"},"品名/數量"),t("th",{class:"text-center"},"金額"),t("th",{class:"text-center"})])],-1),Nt={class:"text-center"},Ft={class:"d-flex flex-column"},qt={class:"name-number mb-2"},zt={key:0,class:"text-success d-none fs-7"},Dt={class:"input-group input-group-sm"},Lt=["onUpdate:modelValue","onChange","disabled"],St=["value"],jt={class:"priced-flex flex-column"},Ot={key:0,class:"text-center"},$t={key:1,class:"text-center"},Bt={class:"text-center"},Ht=["onClick","disabled"],Gt={key:0,class:"fas fa-spinner fa-pulse"},Jt=t("td",{class:"text-end"},null,-1),Kt=t("td",{class:"text-end"},null,-1),Qt=t("td",{class:"text-center"},"總計",-1),Wt={class:"text-center"},Xt={key:0},Yt=t("td",{class:"text-end"},null,-1),Zt=t("td",{class:"text-end"},null,-1),te=t("td",{class:"text-center"},"折扣後金額",-1),ee={class:"text-center text-danger"},se={class:"d-flex flex-column align-items-betw input-group input-group-sm coupon"},oe={class:"d-flex justify-content-between mt-1 mb-3"},ne={class:"col-8 col-xl-3 col-md-12 me-2"},le=["disabled"],de={class:"col-xl-3 col-md-12"},ae={class:"input-group-append"},re=["disabled"],ie={key:0,class:"fs-12 text-dark reEnter"},ce=t("i",{class:"fa-solid fa-triangle-exclamation me-1 mb-3"},null,-1),ue={class:"d-flex flex-column align-items-center"},he={type:"button",class:"btn btn-dark rounded-3 fs-8 w-50 mb-2 w-100"};function pe(s,o,w,m,d,a){const f=U("RouterLink");return l(),n(g,null,[F,t("div",q,[s.cart.carts&&Object.keys(s.cart.carts).length>0?(l(),n("table",z,[D,t("div",L,[t("button",{class:"btn btn-outline-danger",type:"button",onClick:o[0]||(o[0]=(...e)=>a.deleteCartAll&&a.deleteCartAll(...e))}," 清空購物車 ")]),t("table",S,[j,t("tbody",null,[s.cart.carts?(l(!0),n(g,{key:0},y(s.cart.carts,e=>(l(),n("tr",{key:e.id,class:"fs-md"},[t("td",null,[t("div",{style:I([{width:"90%",height:"150px","background-size":"cover","background-repeat":"no-repeat","background-position":"center"},{backgroundImage:`url(${e.product.imageUrl})`}]),class:"cart-product cart-product-img rounded-3 mx-auto"},null,4)]),t("td",null,[t("div",O,i(e.product.title),1),e.coupon?(l(),n("div",$,"已套用優惠卷")):r("",!0)]),t("td",null,[t("div",B,[t("button",{class:"btn btn-outline-secondary rounded-start px-2",type:"button",onClick:p(c=>a.updateCart(e,e.qty-1),["prevent"])},J,8,H),t("input",{type:"text",class:"form-control text-center",value:e.qty,onChange:o[1]||(o[1]=c=>a.updateCart(s.itemitem.qty)),placeholder:"","aria-label":"Example text with two button addons",readonly:""},null,40,K),t("button",{class:"btn btn-outline-secondary rounded-end px-2",type:"button",onClick:p(c=>a.updateCart(e,e.qty+1),["prevent"])},X,8,Q)])]),t("td",Y,[e.total!==e.final_total?(l(),n("div",Z,"NT$ "+i(Math.round(e.final_total)),1)):r("",!0),e.total===e.final_total?(l(),n("div",tt,"NT$ "+i(e.total),1)):r("",!0)]),t("td",et,[t("button",{type:"button",class:"btn btn-outline-danger btn-sm",onClick:p(c=>a.deleteCartItem(e),["prevent"]),disabled:d.lodingItem===e.id},[ot,d.lodingItem===e.id?(l(),n("i",nt)):r("",!0)],8,st)])]))),128)):r("",!0)]),t("tfoot",null,[t("tr",lt,[dt,at,rt,it,t("td",{class:R(["text-center",{"text-decoration-line-through":s.cart.total!==s.cart.final_total}]),style:{border:"0"}},"NT$ "+i(s.cart.total),3)]),s.cart.total!==s.cart.final_total?(l(),n("tr",ct,[ut,ht,pt,_t,t("td",bt,"NT$ "+i(Math.round(s.cart.final_total)),1)])):r("",!0)])]),t("div",mt,[t("div",gt,[t("div",ft,[x(t("input",{ref:"coupon_input",type:"text",class:"form-control me-3 rounded-3 fs-md","onUpdate:modelValue":o[2]||(o[2]=e=>d.coupon_code=e),disabled:d.couponApplied,placeholder:"請輸入優惠碼"},null,8,yt),[[C,d.coupon_code]])]),t("div",xt,[t("div",vt,[t("button",{class:"btn btn-outline-secondary rounded-3 fs-md",type:"button",disabled:d.couponApplied,onClick:o[3]||(o[3]=(...e)=>a.addCouponCode&&a.addCouponCode(...e))},i(d.couponApplied?"優惠碼已套用":"套用優惠碼"),9,kt)])]),t("div",wt,[t("button",Ct,[v(f,{to:"/products",class:"nav-link"},{default:k(()=>[u("繼續購物")]),_:1})]),t("button",{type:"button",class:"btn btn-info ms-4 rounded-3 text-white fs-md",onClick:o[4]||(o[4]=p((...e)=>a.nextCart&&a.nextCart(...e),["prevent"]))},"下一步")])]),d.reEnter?(l(),n("div",It,[Et,u(i(d.showEnter),1)])):r("",!0)])])):(l(),n("div",At,[Tt,t("button",Vt,[v(f,{to:"/products",class:"nav-link"},{default:k(()=>[u("繼續購物")]),_:1})])])),s.cart.carts&&Object.keys(s.cart.carts).length>0?(l(),n("div",Pt,[Rt,t("table",Ut,[Mt,t("tbody",null,[s.cart.carts?(l(!0),n(g,{key:0},y(s.cart.carts,e=>(l(),n("tr",{key:e.id},[t("td",null,[t("div",{class:"rounded-3 mx-auto",style:I([{height:"100px","background-size":"cover","background-position":"center",width:"100px"},{backgroundImage:`url(${e.product.imageUrl})`}])},null,4)]),t("td",Nt,[t("div",Ft,[t("div",qt,[u(i(e.product.title)+" ",1),e.coupon?(l(),n("div",zt,"已套用")):r("",!0)]),t("div",Dt,[x(t("select",{name:"",id:"",class:"form-select","onUpdate:modelValue":c=>e.qty=c,onChange:c=>a.updateCart(e),disabled:d.lodingItem===e.id},[(l(),n(g,null,y(20,c=>t("option",{value:c,key:c+"45621"},i(c),9,St)),64))],40,Lt),[[M,e.qty]])])])]),t("td",null,[t("div",jt,[e.total===e.final_total?(l(),n("div",Ot,i(e.total),1)):r("",!0),e.total!==e.final_total?(l(),n("div",$t,i(Math.round(e.final_total)),1)):r("",!0)])]),t("td",Bt,[t("button",{type:"button",class:"btn btn-outline-danger btn-sm",onClick:c=>a.deleteCartItem(e),disabled:d.lodingItem===e.id},[d.lodingItem===e.id?(l(),n("i",Gt)):r("",!0),u(" x ")],8,Ht)])]))),128)):r("",!0)]),t("tfoot",null,[t("tr",null,[Jt,Kt,Qt,t("td",Wt,i(s.cart.total),1)]),s.cart.total!==s.cart.final_total?(l(),n("tr",Xt,[Yt,Zt,te,t("td",ee,i(Math.round(s.cart.final_total)),1)])):r("",!0)])]),t("div",se,[t("div",oe,[t("div",ne,[x(t("input",{ref:"coupon_input",type:"text",class:"form-control me-3 rounded-3 fs-md-8 molbile-size","onUpdate:modelValue":o[5]||(o[5]=e=>d.coupon_code=e),disabled:d.couponApplied,placeholder:"請輸入優惠碼"},null,8,le),[[C,d.coupon_code]])]),t("div",de,[t("div",ae,[t("button",{class:"btn btn-outline-secondary fs-md-6 rounded-3 molbile-size",type:"button",disabled:d.couponApplied,onClick:o[6]||(o[6]=(...e)=>a.addCouponCode&&a.addCouponCode(...e))},i(d.couponApplied?"優惠碼已套用":"套用優惠碼"),9,re)])])]),d.reEnter?(l(),n("div",ie,[ce,u(i(d.showEnter),1)])):r("",!0),t("div",ue,[t("button",he,[v(f,{to:"/products",class:"nav-link"},{default:k(()=>[u("繼續購物")]),_:1})]),t("button",{type:"button",class:"btn btn-info rounded-3 text-white fs-8 w-100",onClick:o[7]||(o[7]=p((...e)=>a.nextCart&&a.nextCart(...e),["prevent"]))},"下一步")])])])):r("",!0)])],64)}const fe=T(N,[["render",pe]]);export{fe as default};
