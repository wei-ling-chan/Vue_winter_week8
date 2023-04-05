import { defineStore } from 'pinia'
const { VITE_APP_URL } = import.meta.env

export default defineStore('productStore', {

  state: () => ({
    products: []
  }),
  actions: {
    getProducts () {
      this.$http.get(`${VITE_APP_URL}/v2/api/wlc606/products/all`)
        .then((res) => {
          console.log(res)
          this.products = res.data.products
          console.log(this.products)
        })
    }
  },
  getters: {
    storeProduct: ({ products }) => {
      return products
    }
  }

})
