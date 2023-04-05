<template>
  <loading v-model:active="isLoading"
          :can-cancel="true"
          :color="color"
          :on-cancel="onCancel"
          :loader="loader"
          :is-full-page="fullPage"/>
  <div class="tastyDetail bg-primary">
    <div class="tastyDetail">
    <section class="banner" style="background-image:url('src/assets/images/about-banner.png')">
      <div class="banner-title position-absolute w-100">
        <h2 class="text-light"><span class="border-bottom border-light border-4 banner-delicious-title">美味</span>專區</h2>
        <P class="text-light fs-3 banner-subtitle">DELICIOUS ZONE</P>
      </div>
      <div class="banner-info position-absolute">
        <p class="text-light fs-4">採用天然新鮮食材精心製作，呈現美味</p>
      </div>
    </section>

    <div class="container">
      <section class="tastyDetail-breadcrumb d-flex mx-4">
        <div class="tastyDetail-breadcrumb-list mx-auto d-flex justify-content-between">
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb my-5">
              <router-link to="/" class="breadcrumb-item text-dark router-link-custom" style="text-decoration:none;">首頁</router-link>
              <router-link to="/products" class="breadcrumb-item text-dark router-link-custom" style="text-decoration: none;">美味專區</router-link>
              <li class="breadcrumb-item active" aria-current="page">產品詳頁</li>
            </ol>
          </nav>
        </div>
      </section>

      <section class="tastyDetail-product mx-3 mb-100">
        <div class="tastyDetail-product-item mx-auto">
          <div class="row">
            <div class="col-12 col-md-6 px-4">
              <div><img :src="product.imageUrl" alt="" class="rounded"></div>
            </div>
            <div class="product-info col-12 col-md-6 px-4">

              <div class="row">
                <div class="col-12 mb-3"><h1 class="">{{ product.title}}<span class="badge bg-info ms-2 product_type">{{product.category}}</span></h1></div>
                <div class="col-3">產品描述:</div>
                <div class="col-9 pb-3 ps-0 description">{{ product.description}}</div>
                <div class="col-3">商品內容:</div>
                <div class="col-9 pb-3 ps-0 content">{{ product.content}}</div>
                <div class="col-3 pb-3">價格:</div>
                <div class="col-9 pb-3 ps-0"><span class="price">{{ product.price }}</span>元</div>
              </div>
              <div class="row justify-content-between">
                <select class="col-5 py-1"  v-model="product.qty">
                  <option :value="i" v-for="i in 20" :key="i+'45621'">{{i}}</option>
                </select>
                <button type="button" class="col-5 btn btn-dark text-light" @click="addToCart(product.id,product.qty)">加到購物車</button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="pb-100">
        <div class="maybe-like">
          <h3 class="text-center mb-5">或許你會喜歡...</h3>
        </div>
        <div class="swiper-father mx-3">
          <swiper  :slidesPerView="3" :spaceBetween="30" :autoHeight="true" :centeredSlides="true" :loop="true" :navigation="{nextEl:'.swiper-button-next',prevEl:'.swiper-button-prev'}" :modules="modules"  :breakpoints="{0: {slidesPerView: 1,spaceBetween: 10,
      },
      600: {
        slidesPerView: 2,
        spaceBetween: 10,
      },769: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      1025: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
      }" class="mySwiper" ref="mySwiper">
            <!-- Additional required wrapper -->
            <swiper-slide v-for="item in products" :key="item.id">
              <div class="card h-100 justify-content-between">
                <div class="slide-img mt-auto" :style="{ backgroundImage: `url(${item.imageUrl})` }"></div>
                <div class="card-body h-100 d-flex flex-column justify-content-between">
                  <div>
                    <h4 class="card-title">{{item.title}}</h4>
                    <p class="card-text">{{item.content}}</p>
                  </div>
                  <div>
                    <p class="card-text">NT <span class="text-dangers">${{item.price}}</span></p>
                    <a href="#" class="btn btn-info text-light" @click.prevent="addToCart(item.id,qty)">加入購物車</a>
                  </div>
                </div>
              </div>
            </swiper-slide>
          </swiper>
          <div class="swiper-button-prev" ref="prevButton"  @click="onPrev">
            <img src="/src/assets/images/images_swiper/arrow-left.png" />
          </div>
          <div class="swiper-button-next"  ref="nextButton" @click="onNext">
            <img src="/src/assets/images/images_swiper/arrow-right.png" />
          </div>
        </div>
      </section>
    </div>
  </div>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Autoplay } from 'swiper'
// loading
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/css/index.css'
// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/autoplay'
import 'swiper/swiper-bundle.css'
// pinia
import { mapActions } from 'pinia'
import cartStore from '../../store/cartStore.js'

const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env
export default {
  data () {
    return {
      modules: [Navigation, Autoplay],
      products: [],
      product: {
        qty: 1
      },
      // loding css
      color: '#9cd020',
      isLoading: false,
      fullPage: true,
      loader: 'bars'
    }
  },
  components: {
    Swiper, SwiperSlide, Loading
  },
  methods: {
    getProducts () {
      this.$http.get(`${VITE_APP_URL}/v2/api/${VITE_APP_PATH}/products/all`)
        .then((res) => {
          console.log(res)
          this.products = res.data.products
          console.log(this.products)
        })
    },
    getProduct () {
      console.log(this.$route.params)
      const { id } = this.$route.params
      this.$http.get(`${VITE_APP_URL}/v2/api/${VITE_APP_PATH}/product/${id}`)
        .then(res => {
          console.log(res.data.product)
          this.product = res.data.product
          this.isLoading = false
        })
    },
    doAjax () {
      this.isLoading = true
    },
    ...mapActions(cartStore, ['addToCart'], ['getCart'])
  },
  watch: {
    product: {
      handler () {
        // 使用 $nextTick 方法確保下拉選單已經渲染完畢再設定值
        this.$nextTick(() => {
          this.product.qty = this.product.qty || 1
        })
      },
      deep: true
    }
  },
  mounted () {
    this.doAjax()
    this.getProducts()
    this.getProduct()
  }
}
</script>

<style scoped>
.swiper {
  /* width: 600px; */
  width: 600px;
  height: 500px;
}
.swiper-slide img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
