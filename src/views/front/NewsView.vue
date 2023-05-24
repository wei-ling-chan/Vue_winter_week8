<template>
  <div class="news">
    <section class="banner banner-news">
      <div class="banner-title h-100">
        <div class="row  h-100 position-relative g-0">
          <div class="col-md-6 col-12  offset-md-3  banner-title position-absolute">
            <h2 class="text-light"><span class="banner-delicious-title">最新</span>消息</h2>
            <p class="text-light banner-subtitle">LATESE NEWS</p>
          </div>
          <div class="col-md-10 col-12 banner-info position-absolute">
            <!--pc-->
            <p class="text-light offset-md-5 d-none d-md-block">最新公告將不定期更新</p>
            <!--mobile-->
            <p class="text-light offset-md-5 d-block d-md-none banner-info-mobile">最新公告將不定期更新</p>
          </div>
        </div>
      </div>
    </section>
  </div>

<div class="news pt-36 pb-100">
  <section class="news-content">
    <div class="container">

        <div class="collapse-left-menu d-block d-lg-none w-100 text-center pb-5">
            <button class="btn btn-info w-100" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-menu" aria-expanded="false" aria-controls="collapse-menu">
                消息分類
            </button>
            <div class="collapse text-center" id="collapse-menu">
                <div class="card card-body w-100 mx-auto bg-info">
                    <ul class="menu-list">
                        <li><a class="list-group-item bg-info border-0 select-all" type="button">全部</a></li>
                        <li><a class="list-group-item bg-info border-0 select-importent" type="button">重要公告</a></li>
                        <li><a class="list-group-item bg-info border-0 select-newproduct" type="button">新品上市</a></li>
                    </ul>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="d-none d-lg-block col-lg-3 left-menu">
                <div class="left-menu-block shadow">
                    <h3 class="news-category-title">分類</h3>
                    <ul class="category-filter">
                        <li><button class="list-group-item select-all" type="button" @click="filterNews('select-all')">全部</button></li>
                        <li><button class="list-group-item select-importent" type="button" @click="filterNews('select-importent')">重要公告</button></li>
                        <li><button class="list-group-item select-newproduct" type="button" @click="filterNews('select-newproduct')">新品上市</button></li>
                    </ul>
                </div>
            </div>

            <div class="col-12 offset-lg-1 col-lg-8 news-block">
                <div class="news-block-items news-info px-5 pt-3 shadow">
                    <h3 class="info-title">慶開幕-全館打九折</h3>
                    <ul class="info-content pt-3 pb-5">
                        <li class="info-line fw-bold">即日起輸入優惠碼999，全館享9折優惠</li>
                        <li class="info-line">快！優惠將於5/31截止！優惠不等人，快來享受這美味且經濟實惠的拌麵吧！</li>
                    </ul>
                </div>
                <div class="news-newproduct-all" ref="newsProductAll" :class="{'d-none': !showAll }">
                  <div class="news-newproduct shadow news-block-items d-flex flex-column flex-lg-row" v-for="item in newsProducts" :key="item.id">
                  <div class="pro-img m-lg-4 mx-auto my-4" :style="{ backgroundImage: `url(${item.imageUrl})` }"></div>
                  <div class="pro-content w-100 d-flex flex-column py-lg-4 px-4 pe-lg-4">
                      <div class="content-head d-flex flex-column flex-lg-row justify-content-between pb-lg-3 align-items-center">
                          <div class="content-title pb-4 pb-lg-0">
                              <span class="h3">{{item.title}}</span>
                          </div>
                          <div class="d-flex flex-lg-column head-tags justify-content-between pb-3 pb-lg-0">
                              <div class="content-tag px-3 py-1 py-lg-2 bg-danger text-white shadow">新品上市</div>
                              <div class="content-date text-end pt-2">2023.5.1</div>
                          </div>
                      </div>
                      <div class="content-body">
                          <p class="h5">{{item.description}}</p>
                      </div>
                  </div>
                  </div>
                </div>
                <div class="news-importent news-block-items d-flex shadow" ref="newsImportent" :class="{'d-none': !showImportent }">
                    <div class="p-md-3 px-4 fs-5">
                       <p class="mb-md-3 fw-bold">目前無重要公告</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
<section class="tasty-menu-fixed" data-aos="fade-right" :class="{ 'show': isMenuFixed }" @click="scrollMeTo">
  <div class="column text-light">
    <div class="d-block"><i class="bi bi-arrow-up-square-fill" style="color: #918f59;font-size: 2rem;"></i></div>
  </div>
</section>
</div>
</template>
<script>
const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env
export default {
  data () {
    return {
      products: [],
      newsProducts: [],
      isLoading: false,
      showAll: true,
      showImportent: true,
      isMenuFixed: false
    }
  },
  methods: {
    filterNewsProducts () {
      this.$http.get(`${VITE_APP_URL}/v2/api/${VITE_APP_PATH}/products/all`)
        .then((res) => {
          console.log(res)
          this.products = res.data.products
          this.isLoading = false
          console.log(this.products)
          this.newsProducts = this.products.filter(function (item) {
            return item.title === '日式擔仔麵' || item.title === '椒香湯拌麵'
          })
          console.log(this.newsProducts)
        })
    },
    filterNews (state) {
      if (state === 'select-all') {
        this.showAll = true
        this.showImportent = true
      } else if (state === 'select-importent') {
        this.showAll = false
        this.showImportent = true
      } else if (state === 'select-newproduct') {
        this.showAll = true
        this.showImportent = false
      }
    },
    setMenuFixed () {
      if (window.scrollY > 500) {
        this.isMenuFixed = true
      } else {
        this.isMenuFixed = false
      }
    },
    scrollMeTo () {
      const top = window.offsetTop - 120

      window.scrollTo(0, top)
    }
  },
  mounted () {
    this.filterNewsProducts()
    window.addEventListener('scroll', this.setMenuFixed)
  }
}
</script>
<style scoped>

</style>
