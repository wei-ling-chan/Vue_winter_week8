import axios from 'axios'
import { defineStore } from 'pinia'
import Swal from 'sweetalert2'
const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env
export default defineStore('cart', {

  state: () => ({
    storeCarts: [],
    cart: {},
    cartsLength: null
  }),
  actions: {
    // 取得購物車
    getCart () {
      axios.get(`${VITE_APP_URL}/v2/api/${VITE_APP_PATH}/cart`)
        .then(res => {
          this.storeCarts = res.data.data.carts
          this.cart = res.data.data
          console.log('pinia', this.cart)
          this.cartsLength = this.storeCarts.length
          console.log(this.cartsLength)
        })
        .catch((err) => {
          alert(err.response.data.message)
        })
    },
    // 加入購物車
    addToCart (id, qty = 1) {
      this.lodingItem = id
      const data = {
        product_id: id,
        qty
      }
      axios.post(`${VITE_APP_URL}/v2/api/${VITE_APP_PATH}/cart`, { data })
        .then(res => {
          console.log(res.data)
          // alert('加入購物車成功!')
          Swal.fire({
            title: '加入購物車成功!',
            confirmButtonColor: '#7b7d42cc',
            icon: 'success',
            iconColor: '#EBDABC',
            confirmButtonText: '確認'
          })
          this.getCart()
          // this.lodingItem = ''
        })
        .catch((err) => {
          console.log(err.response)
          alert(err.response)
        })
    }
  }
})
