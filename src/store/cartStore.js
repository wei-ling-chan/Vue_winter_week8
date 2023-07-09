import axios from 'axios'
import { defineStore, mapActions } from 'pinia'
import Swal from 'sweetalert2'
import SweetAlert from '@/store/SweetAlert.js'
const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env
export default defineStore('cart', {

  state: () => ({
    storeCarts: [],
    cart: {},
    total: 0,
    final_total: 0,
    cartsLength: null,
    cartCoupon: {},
    couponPercent: '',
    coupon_code: ''
  }),
  actions: {
    // 取得購物車
    getCart () {
      axios.get(`${VITE_APP_URL}/v2/api/${VITE_APP_PATH}/cart`)
        .then(res => {
          this.storeCarts = res.data.data.carts
          this.cart = res.data.data
          this.total = res.data.data.total
          this.final_total = res.data.data.final_total
          this.cartsLength = this.storeCarts.length
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
          Swal.fire({
            title: '加入購物車成功!',
            confirmButtonColor: '#7b7d42cc',
            icon: 'success',
            confirmButtonText: '確認'
          })
          this.getCart()
        })
        .catch((error) => {
          this.showErrorAlert(error)
        })
    },
    ...mapActions(SweetAlert, ['showErrorAlert'])
  }
})
