<!-- noodle開始 -->
<template>
  <loading v-model:active="isLoading"
          :can-cancel="true"
          :color="color"
          :on-cancel="onCancel"
          :loader="loader"
          :is-full-page="fullPage"/>
  <div class="tasty bg-primary pb-36">
    <section class="banner banner-products">
      <div class="banner-title h-100">
        <div class="row  h-100 position-relative g-0">
          <div class="col-md-6 col-12  offset-md-3 banner-title position-absolute">
            <h2 class="text-light"><span class="banner-delicious-title">美味</span>專區</h2>
            <p class="text-light banner-subtitle">DELICIOUS ZONE</p>
            <!-- <img src="../../assets/images/tasty-banner.jpg" alt=""> -->
          </div>
          <div class="col-md-10 col-12 banner-info position-absolute">
            <!--pc-->
            <p class="text-light offset-md-5 d-none d-md-block">採用天然新鮮食材精心製作，呈現美味。</p>
            <!--mobile-->
            <p class="text-light offset-md-5 d-block d-md-none banner-info-mobile">採用天然新鮮食材精心製作，<br>呈現美味。</p>
          </div>
        </div>
      </div>
    </section>
  <div>
    <div class="container">
      <h1 class="text-center my-5"><span class="fw-bold">RESULT</span> <span class="h4"> 搜尋結果</span></h1>
      <p class="h5 text-center mb-4">您搜尋的關鍵字「 <span style="color: red;">{{$route.query.name}}</span> 」結果如下:</p>
      <div>
        <section class="tasty-list">
          <div class="row" v-if="searchProducts.length>0">
            <div class="col-12 col-md-6 col-xl-4 tasty-item-block" v-for="searchProduct in searchProducts" :key="searchProduct.id">
              <div class="card mx-2 my-4">
                <img :src="searchProduct.imageUrl" alt="" class="slide-img">
                <div class="card-body p-3">
                <div class="row  mb-4 tasty-item">
                  <h5 class="card-title col-7 col-md-12 fw-bolder tasty-item-title">{{searchProduct.title}}</h5>
                  <div class="d-flex justify-content-between">
                    <div class="card-text  text-md end tasty-item-price">NT$ {{searchProduct.price}}</div>
                    <div class="card-text  text-md end tasty-item-price fs-6">原價 <span class="text-decoration-line-through"> NT$ {{searchProduct.origin_price}}</span></div>
                  </div>

                </div>
                <div class="d-flex justify-content-between mb-1  tasty-button">
                  <router-link :to="`/searchProduct/${searchProduct.id}`" class="d-md-block btn btn-info text-light more py-2">查看更多</router-link>
                  <button type="button" class="d-md-block btn btn-info text-light" @click="addToCart(searchProduct.id,qty)">加入購物車</button>
                </div>
                </div>
              </div>
            </div>
          </div>
          <div class="text-center h5 mb-9" v-else><p>目前沒有符合搜尋條件的產品。</p></div>
        </section>
      </div>
      <!-- <section class="tasty-menu-fixed text-center bg-primary my-md-100 mt-5 fixed-right" data-aos="fade-right" style="display:none;">
      <div class="column text-light">
        <div  class="col-2 tasty-menu-item border rounded-circle mx-md-1 d-none d-md-block" @click="scrollMeTo('cool-noodle')"><div><img src="../../assets/images/noodles2.png" alt=""><span class="d-block">涼麵</span></div></div>
        <div  class="col-2 tasty-menu-item border rounded-circle mx-md-1 d-none d-md-block" @click="scrollMeTo('soup-noodle')"><div><img src="../../assets/images/chinese-food.png" alt=""><span class="d-block">湯麵</span></div></div>
        <div  class="col-2 tasty-menu-item border rounded-circle mx-md-1 d-none d-md-block" @click="scrollMeTo('fride')"><div><img src="../../assets/images/fried-chicken.png" alt=""><span class="d-block">炸物</span></div></div>
        <div class="col-2 tasty-menu-item border rounded-circle mx-md-1 d-none d-md-block" @click="scrollMeTo('side-desh')"><div><img src="../../assets/images/skewer.png" alt=""><span class="d-block">小菜</span></div></div>
        <div  class="col-2 tasty-menu-item border rounded-circle mx-md-1 d-none d-md-block" @click="scrollMeTo('soup')"><div><img src="../../assets/images/soup.png" alt=""><span class="d-block">湯品</span></div></div>
      </div>
    </section> -->
    </div>
  </div>
  </div>
</template>

<script>
// loading
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/css/index.css'
// import { RouterLink } from 'vue-router'
import { mapActions } from 'pinia'
import cartStore from '../../store/cartStore.js'
const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env
export default {

  data () {
    return {
      products: [],
      searchProducts: [],
      lodingItem: '',
      qty: 1,
      // loding css
      color: '#9cd020',
      isLoading: false,
      fullPage: true,
      loader: 'bars'
    }
  },
  components: {
    Loading
  },
  methods: {
    getProducts () {
      this.$http.get(`${VITE_APP_URL}/v2/api/${VITE_APP_PATH}/products/all`)
        .then((res) => {
          this.products = res.data.products

          // 篩選
          this.searchProducts = Array.from(this.products.filter(item => {
            return item.title.indexOf(this.$route.query.name) !== -1
          }))
        })
    },
    doAjax () {
      this.isLoading = true
    },
    ...mapActions(cartStore, ['addToCart'])
  },
  mounted () {
    this.getProducts()
    this.$watch(
      () => this.$route.query.name,
      (newValue, oldValue) => {
        console.log('searchProducts changed', newValue, oldValue)
        // 在此处处理 searchProducts 的变化
        this.searchProducts = this.getProducts()
      }
    )
  }
}
</script>
