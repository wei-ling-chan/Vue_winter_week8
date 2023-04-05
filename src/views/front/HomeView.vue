<template>
  <!-- <div class="home">
    <h1>這是首頁</h1>
  </div> -->
  <!-- <MyLoading v-model:active="isLoading" :is-full-page="true">
            <div class="loadingio-spinner-gear-o9y8761wfgm"><div class="ldio-y0ra79765tc">
              <div><div></div><div></div><div></div><div></div><div></div><div></div></div>
              </div></div>
          </MyLoading> -->
  <loading v-model:active="isLoading"
          :can-cancel="true"
          :color="color"
          :on-cancel="onCancel"
          :loader="loader"
          :is-full-page="fullPage"/>
  <div class="index bg-primary">
    <section class="banner d-flex flex-column align-items-center justify-content-between pt-3 pb-6 mb-36 mb-md-100" data-aos="flip-up">
      <div class="banner-title">
        <h2 class="text-light">用心製麵</h2>
      </div>
      <div class="banner-info ">
        <p class="text-light display-6">為您獻上美味的一碗</p>
        <!-- <a href="./tasty.html" class="button d-block bg-light  text-center  mx-auto h6">了解更多</a> -->
        <router-link to="/products" class="button d-block bg-light  text-center  mx-auto h6 text-decoration-none">了解更多</router-link>
      </div>
    </section>

    <section class="hot-food my-4">
      <div class="container">
        <h1 class="my-36">熱門美食</h1>
        <div class="row">
          <a href="#" class="col-12 col-md-6 d-block" data-aos="fade-up">
            <img class="w-100" src="../../assets/images/hot-food1.png" alt="" data-aos="zoom-in">
            <h4 class="text-center pt-2 pb-4">涼麵系列</h4>
          </a>
          <a href="#" class="col-12 col-md-6">
            <img class="w-100" src="../../assets/images/hot-food2.png" alt="" data-aos="zoom-in">
            <h4 class="text-center pt-2 pb-4">湯麵系列</h4>
          </a>
          <a href="#" class="col-12 col-md-6" style="margin-top:-36px ;">
            <img class="w-100" src="../../assets/images/hot-food4.png" alt="" data-aos="zoom-in">
            <h4 class="text-center pt-2 pb-4 ">炸物系列</h4>
          </a>
          <a href="#" class="col-12 col-md-6">
            <img class="w-100" src="../../assets/images/hot-food3.png" style="margin-top:-36px ;" alt="" data-aos="zoom-in">
            <h4 class="text-center pt-2 pb-4 ">小菜系列</h4>
          </a>
        </div>
      </div>
    </section>

    <section class="news mt-0 mb-100 my-md-200">
      <div class="news-list container px-4">
        <div class="news-items">
          <div class="news-border d-flex d-flex d-flex justify-content-between align-items-center border border-light border-3">
            <div class="news-info p-lg-4 text-light" data-aos="fade-right">
              <h3 class="news-title  mb-lg-4 ">最新消息</h3>
              <p class="fs-5 fs-md-3 mb-0">香酥蔥油乾麵口味新品上市!</p>
              <p class="fs-5 mb-2 mb-md-2">即日起加入會員享...</p>
              <router-link to="/products" class="button bg-dark p-2 text-light fs-6 text-center">了解更多</router-link>
              <!-- <div href="./tasty.html" class="button bg-dark p-2 text-light fs-6 text-center">了解更多</div> -->
            </div>
            <div class=" news-image d-none d-lg-block">
              <img src="../../assets/images/news1.png" alt="" class="rounded-3 shadow-lg">
            </div>
          </div>
        </div>

      </div>
    </section>

    <section class="hot-product pb-100">
      <div class="container">
        <h3 class="m-36" style="margin-bottom: 1rem;margin-top: 6rem;">熱門商品</h3>
        <!-- <div class="swiper-father mx-3">
          <swiper  :slidesPerView="3" :spaceBetween="30" :centeredSlides="true" :loop="true" :navigation="{nextEl:'.swiper-button-next',prevEl:'.swiper-button-prev'}" :modules="modules" :autoplay="{delay: 2500,disableOnInteraction: false,}" :breakpoints="{0: {slidesPerView: 1,spaceBetween: 10,
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
        spaceBetween: 33,
      },}" class="mySwiper" ref="mySwiper">

            <swiper-slide>
              <div class="card">
                <h4 class="card-title pt-3">經典涼麵</h4>
                <p class="card-text">麵條、小黃瓜番茄、蛋</p>
                <div class="slide-img img-1"></div>
                <div class="card-body">
                  <p class="card-text">NT$.80</p>
                  <a href="#" class="btn btn-info text-light" @click.prevent="addToCart">加入購物車</a>
                </div>
              </div>
            </swiper-slide>
            <swiper-slide>
              <div class="card">
                <h4 class="card-title pt-3">叉燒涼麵</h4>
                <p class="card-text">麵條、小黃瓜、番茄</p>
                <div class="slide-img img-2"></div>
                <div class="card-body">
                  <p class="card-text">NT$.120</p>
                  <a href="#" class="btn btn-info text-light"  @click.prevent="addToCart">加入購物車</a>
                </div>
              </div>
            </swiper-slide>
            <swiper-slide>
              <div class="card">
                <h4 class="card-title pt-3">家常麵</h4>
                <p class="card-text">香菇、蒜頭、洋蔥</p>
                <div class="slide-img img-3"></div>
                <div class="card-body">
                  <p class="card-text">NT$.65</p>
                  <a href="#" class="btn btn-info text-light"  @click.prevent="addToCart">加入購物車</a>
                </div>
              </div>
            </swiper-slide>
            <swiper-slide>
              <div class="card pt-3">
                <h4 class="card-title">南洋叻沙湯麵</h4>
                <p class="card-text">叉燒、蘿蔔絲、香菜</p>
                <div class="slide-img img-4"></div>
                <div class="card-body">
                  <p class="card-text">NT$.120</p>
                  <a href="#" class="btn btn-info text-light"  @click.prevent="addToCart">加入購物車</a>
                </div>
              </div>
            </swiper-slide>
            <swiper-slide>
              <div class="card">
                <h4 class="card-title pt-3">叉燒涼麵</h4>
                <p class="card-text">麵條、小黃瓜、番茄</p>
                <div class="slide-img img-2"></div>
                <div class="card-body">
                  <p class="card-text">NT$.120</p>
                  <a href="#" class="btn btn-info text-light"  @click.prevent="addToCart">加入購物車</a>
                </div>
              </div>
            </swiper-slide>
            <swiper-slide>
              <div class="card">
                <h4 class="card-title pt-3">叉燒涼麵</h4>
                <p class="card-text">麵條、小黃瓜、番茄</p>
                <div class="slide-img img-2"></div>
                <div class="card-body">
                  <p class="card-text">NT$.120</p>
                  <a href="#" class="btn btn-info text-light"  @click.prevent="addToCart(product.id,qty)">加入購物車</a>
                </div>
              </div>
            </swiper-slide>
          </swiper>
          <div class="swiper-button-prev" ref="prevButton"  @click="onPrev">
            <img src="../../assets/images/images_swiper/arrow-left.png" />
          </div>
          <div class="swiper-button-next"  ref="nextButton" @click="onNext">
            <img src="../../assets/images/images_swiper/arrow-right.png" />
          </div>
        </div> -->
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
                <div class="slide-img mt-auto" :style="{ backgroundImage: `url(${item.imageUrl})`}" ></div>
                <div class="card-body h-100 w-100 d-flex flex-column justify-content-between">
                  <div>
                    <h4 class="card-title" data-aos="fade-right">{{item.title}}</h4>
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
      </div>
    </section>
  </div>
  <!-- 輪播 -->
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Autoplay } from 'swiper'
import { mapActions } from 'pinia'
import cartStore from '../../store/cartStore.js'
// loading
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/css/index.css'
// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/autoplay'
import 'swiper/swiper-bundle.css'
const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env
export default {
  data () {
    return {
      products: [],
      modules: [Navigation, Autoplay],
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
          this.isLoading = false
          console.log(this.products)
        })
    },
    ...mapActions(cartStore, ['addToCart']),
    doAjax () {
      this.isLoading = true
    }
  },
  mounted () {
    this.doAjax()
    this.getProducts()
  }

}
</script>

<style scoped>
/* .swiper {

  width: 600px;
  height: 500px;
}
.swiper-slide img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
} */
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
