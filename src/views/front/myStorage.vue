<template>
  <div style="height: 20vh;"></div>
  <div class="filter-product my-md-5 my-4 tasty-list" ref="filter-product">
    <div class="container">
      <h1 class="text-center mb-md-4 m-0">我的收藏</h1>
      <div class="row" v-if="temProducts.length>0">
        <div class="col-12 col-md-6 col-xl-4 tasty-item-block" v-for="product in temProducts" :key="product.id">
          <div class="card mx-2 my-5">
            <div class="slide-hover">
              <img :src="product.imageUrl" alt="收藏" class="slide-img">
            </div>
            <div class="card-body p-3">
            <div class="mb-4 tasty-item">
              <div class="d-flex justify-content-between align-items-center mb-2">
                <h5 class="card-title fw-bolder tasty-item-title d-block">{{ product.title }}</h5>
                <div><i :class="heartClass(product.id)" @click="toggleFavorite(product.id)"></i></div>
              </div>
              <div class="d-flex justify-content-between">
                <div class="card-text  text-md end tasty-item-price fs-7">原價 <span class="text-decoration-line-through"> NT$ {{ product.origin_price }}</span></div>
                <div class="card-text  text-md end tasty-item-price text-danger">優惠價 NT$ {{ product.price }}</div>
              </div>
            </div>
            <div class="d-flex justify-content-between mb-1  tasty-button">
              <router-link :to="`/product/${ product.id }`" class="d-md-block btn btn-info text-light more py-2">查看更多</router-link>
              <button type="button" class="d-md-block btn btn-info text-light" @click="addToCart(product.id,qty)">加入購物車</button>
            </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <div class="h5 py-7 text-center">目前還沒有收藏喔!趕快去收藏吧~</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'pinia'
import cartStore from '../../store/cartStore.js'
const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env
export default {
  data () {
    return {
      products: [],
      temProducts: [],
      favorites: []
    }
  },
  methods: {
    testItems () {
      this.favorites = JSON.parse(localStorage.getItem('favorites')) || []
      this.$http.get(`${VITE_APP_URL}/v2/api/${VITE_APP_PATH}/products/all`)
        .then((res) => {
          this.products = res.data.products
          this.filteredItems()
        })
    },
    filteredItems () {
      this.temProducts = this.products.filter(item => this.favorites.includes(item.id))
    },
    toggleFavorite (productId) {
      if (this.favorites.includes(productId)) {
        this.favorites = this.favorites.filter(id => id !== productId)
      } else {
        this.favorites.push(productId)
      }
      localStorage.setItem('favorites', JSON.stringify(this.favorites))
    },
    heartClass (productId) {
      return this.favorites.includes(productId) ? 'fa-solid fa-heart fs-5 text-danger' : 'fa-regular fs-5 fa-heart'
    },
    ...mapActions(cartStore, ['addToCart'])
  },
  watch: {
    favorites: function () {
      this.filteredItems()
    }
  },
  mounted () {
    this.favorites = JSON.parse(localStorage.getItem('favorites')) || []
    this.testItems()
  }
}
</script>
