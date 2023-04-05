<!-- noodle開始 -->
<template>
  <loading v-model:active="isLoading"
          :can-cancel="true"
          :color="color"
          :on-cancel="onCancel"
          :loader="loader"
          :is-full-page="fullPage"/>
  <div class="tasty bg-primary pb-36">
    <section class="banner" style="background-image:url('src/assets/images/tasty-banner.jpg')">
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
      <div>
        <section class="tasty-menu text-center bg-primary my-md-100 mt-5" data-aos="fade-right">
          <div class="row text-light justify-evenly justify-content-sm-center ps-4">
            <div class="col-2 tasty-menu-item border rounded-circle mx-md-3"  @click="scrollMeTo('cool-noodle')"><div><img src="../../assets/images/noodles2.png" alt=""><span class="d-block">涼麵</span></div></div>
            <div class="col-2 tasty-menu-item border rounded-circle mx-md-3"  @click="scrollMeTo('soup-noodle')"><div><img src="../../assets/images/chinese-food.png" alt=""><span class="d-block">湯麵</span></div></div>
            <div class="col-2 tasty-menu-item border rounded-circle mx-md-3"  @click="scrollMeTo('fride')"><div><img src="../../assets/images/fried-chicken.png" alt=""><span class="d-block">炸物</span></div></div>
            <div class="col-2 tasty-menu-item border rounded-circle mx-md-3"  @click="scrollMeTo('soup')"><div><img src="../../assets/images/soup.png" alt=""><span class="d-block">湯品</span></div></div>
            <div class="col-2 tasty-menu-item border rounded-circle mx-md-3"  @click="scrollMeTo('side-desh')"><div><img src="../../assets/images/skewer.png" alt=""><span class="d-block">小菜</span></div></div>
          </div>
        </section>
        <section class="tasty-list">
          <form action="tastyDetail2.html">
            <input type="hidden" id="product" name="product" value="">
                  <!--cool-noodle-->
              <div class="cool-noodle my-5" ref="cool-noodle">
                <div class="d-flex justify-content-center">
                  <h2 class="tasty-tite fs-3 border-3 border-start border-dark px-2 text-center">涼麵 <span class="fs-6">COLD NOODLES</span></h2>
                </div>
                <div class="row" >
                  <div class="col-12 col-md-6 col-xl-4 tasty-item-block" v-for="product in filteredItems('涼麵')" :key="product.id">
                    <div class="card mx-2 my-4">
                      <img :src="product.imageUrl" alt="" class="slide-img">
                      <div class="card-body p-3">
                      <div class="row  mb-4 tasty-item">
                        <h5 class="card-title col-7 col-md-12 fw-bolder tasty-item-title">{{product.title}}</h5>
                        <div class="d-flex justify-content-between">
                          <div class="card-text  text-md end tasty-item-price">NT$ {{product.price}}</div>
                          <div class="card-text  text-md end tasty-item-price fs-6">原價 <span class="text-decoration-line-through"> NT$ {{product.origin_price}}</span></div>
                        </div>

                      </div>
                      <div class="d-flex justify-content-between mb-1  tasty-button">
                        <router-link :to="`/product/${product.id}`" class="d-md-block btn btn-info text-light more py-2">查看更多</router-link>
                        <button type="button" class="d-md-block btn btn-info text-light" @click="addToCart(product.id,qty)">加入購物車</button>
                      </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
                <!--soup-noodle-->
              <div class="soup-noodle my-5" ref="soup-noodle">
                <div class="d-flex justify-content-center">
                  <h2 class="tasty-tite fs-3 border-3 border-start border-dark px-2 text-center">湯麵 <span class="fs-6">COLD NOODLES</span></h2>
                </div>
                <div class="row" >
                  <div class="col-12 col-md-6 col-xl-4 tasty-item-block" v-for="product in filteredItems('湯麵')" :key="product.id">
                    <div class="card mx-2 my-4">
                      <img :src="product.imageUrl" alt="" class="slide-img">
                      <div class="card-body p-3">
                      <div class="row  mb-4 tasty-item">
                        <h5 class="card-title col-7 col-md-12 fw-bolder tasty-item-title">{{product.title}}</h5>
                        <div class="d-flex justify-content-between">
                          <div class="card-text  text-md end tasty-item-price">NT$ {{product.price}}</div>
                          <div class="card-text  text-md end tasty-item-price fs-6">原價 <span class="text-decoration-line-through"> NT$ {{product.origin_price}}</span></div>
                        </div>
                      </div>
                      <div class="d-flex justify-content-between mb-1  tasty-button">
                        <router-link :to="`/product/${product.id}`" class="d-md-block btn btn-info text-light more py-2">查看更多</router-link>
                        <button type="button" class="d-md-block btn btn-info text-light" @click="addToCart(product.id,qty)">加入購物車</button>
                      </div>
                      </div>
                    </div>

                  </div>

                </div>
              </div>
              <!--fride-->
              <div class="fride my-5" data-aos="fade-right" ref="fride">
                <div class="d-flex justify-content-center">
                  <h2 class="tasty-tite fs-3 border-3 border-start border-dark px-2 text-center" >炸物 <span class="fs-6">COLD NOODLES</span></h2>
                </div>
                <div class="row" >
                  <div class="col-12 col-md-6 col-xl-4 tasty-item-block" v-for="product in filteredItems('炸物')" :key="product.id">
                    <div class="card mx-2 my-4">
                      <img :src="product.imageUrl" alt="" class="slide-img">
                      <div class="card-body p-3">
                      <div class="row  mb-4 tasty-item">
                        <h5 class="card-title col-7 col-md-12 fw-bolder tasty-item-title">{{product.title}}</h5>
                        <div class="d-flex justify-content-between">
                          <div class="card-text  text-md end tasty-item-price">NT$ {{product.price}}</div>
                          <div class="card-text  text-md end tasty-item-price fs-6">原價 <span class="text-decoration-line-through"> NT$ {{product.origin_price}}</span></div>
                        </div>
                      </div>
                      <div class="d-flex justify-content-between mb-1  tasty-button">
                        <router-link :to="`/product/${product.id}`" class="d-md-block btn btn-info text-light more py-2">查看更多</router-link>
                        <button type="button" class="d-md-block btn btn-info text-light" @click="addToCart(product.id,qty)">加入購物車</button>
                      </div>

                      </div>
                    </div>

                  </div>

                </div>
              </div>
              <!--side desh-->
              <div class="side desh my-5" ref="side-desh">
                <div class="d-flex justify-content-center">
                  <h2 class="tasty-tite fs-3 border-3 border-start border-dark px-2 text-center">精緻小菜 <span class="fs-6">COLD NOODLES</span></h2>
                </div>
                <div class="row" >
                  <div class="col-12 col-md-6 col-xl-4 tasty-item-block" v-for="product in filteredItems('精緻小菜')" :key="product.id">
                    <div class="card mx-2 my-4">
                      <img :src="product.imageUrl" alt="" class="slide-img">
                      <div class="card-body p-3">
                      <div class="row  mb-4 tasty-item">
                        <h5 class="card-title col-7 col-md-12 fw-bolder tasty-item-title">{{product.title}}</h5>
                        <div class="d-flex justify-content-between">
                          <div class="card-text  text-md end tasty-item-price">NT$ {{product.price}}</div>
                          <div class="card-text  text-md end tasty-item-price fs-6">原價 <span class="text-decoration-line-through"> NT$ {{product.origin_price}}</span></div>
                        </div>
                      </div>
                      <div class="d-flex justify-content-between mb-1  tasty-button">
                        <router-link :to="`/product/${product.id}`" class="d-md-block btn btn-info text-light more py-2">查看更多</router-link>
                        <button type="button" class="d-md-block btn btn-info text-light" @click="addToCart(product.id,qty)">加入購物車</button>
                      </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!--soup-->
              <div class="soup my-5" ref="soup">
                <div class="d-flex justify-content-center">
                  <h2 class="tasty-tite fs-3 border-3 border-start border-dark px-2 text-center">湯品 <span class="fs-6">COLD NOODLES</span></h2>
                </div>
                <div class="row" >
                  <div class="col-12 col-md-6 col-xl-4 tasty-item-block" v-for="product in filteredItems('湯品')" :key="product.id">
                    <div class="card mx-2 my-4">
                      <img :src="product.imageUrl" alt="" class="slide-img">
                      <div class="card-body p-3">
                      <div class="row  mb-4 tasty-item">
                        <h5 class="card-title col-7 col-md-12 fw-bolder tasty-item-title">{{product.title}}</h5>
                        <div class="d-flex justify-content-between">
                          <div class="card-text  text-md end tasty-item-price">NT$ {{product.price}}</div>
                          <div class="card-text  text-md end tasty-item-price fs-6">原價 <span class="text-decoration-line-through"> NT$ {{product.origin_price}}</span></div>
                        </div>
                      </div>
                      <div class="d-flex justify-content-between mb-1  tasty-button">
                        <router-link :to="`/product/${product.id}`" class="d-md-block btn btn-info text-light more py-2">查看更多</router-link>
                        <button type="button" class="d-md-block btn btn-info text-light" @click="addToCart(product.id,qty)">加入購物車</button>
                      </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
          </form>
        </section>
      </div>
      <section class="tasty-menu-fixed text-center bg-primary my-md-100 mt-5 fixed-right" data-aos="fade-right">
      <div class="column text-light">
        <div  class="col-2 tasty-menu-item border rounded-circle mx-md-1 d-none d-md-block" @click="scrollMeTo('cool-noodle')"><div><img src="../../assets/images/noodles2.png" alt=""><span class="d-block">涼麵</span></div></div>
        <div  class="col-2 tasty-menu-item border rounded-circle mx-md-1 d-none d-md-block" @click="scrollMeTo('soup-noodle')"><div><img src="../../assets/images/chinese-food.png" alt=""><span class="d-block">湯麵</span></div></div>
        <div  class="col-2 tasty-menu-item border rounded-circle mx-md-1 d-none d-md-block" @click="scrollMeTo('fride')"><div><img src="../../assets/images/fried-chicken.png" alt=""><span class="d-block">炸物</span></div></div>
        <div  class="col-2 tasty-menu-item border rounded-circle mx-md-1 d-none d-md-block" @click="scrollMeTo('side-desh')"><div><img src="../../assets/images/soup.png" alt=""><span class="d-block">湯品</span></div></div>
        <div class="col-2 tasty-menu-item border rounded-circle mx-md-1 d-none d-md-block" @click="scrollMeTo('soup')"><div><img src="../../assets/images/skewer.png" alt=""><span class="d-block">小菜</span></div></div>
      </div>
    </section>
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
          console.log(res)
          this.products = res.data.products
          this.isLoading = false
          console.log(this.products)
        })
    },
    filteredItems (category) {
      return this.products.filter(item => item.category === category)
    },
    doAjax () {
      this.isLoading = true
    },
    setMenuFixed () {
      const menuFixed = document.querySelector('.tasty-menu-fixed')
      if (window.scrollY > 500) {
        menuFixed.style.display = 'block'
      } else {
        menuFixed.style.display = 'none'
      }
    },
    scrollMeTo (refName) {
      const element = this.$refs[refName]
      const top = element.offsetTop - 120

      window.scrollTo(0, top)
    },
    ...mapActions(cartStore, ['addToCart'])
  },
  mounted () {
    this.doAjax()
    this.getProducts()
    window.addEventListener('scroll', this.setMenuFixed)
  }
}
</script>
