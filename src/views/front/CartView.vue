<template>
  <loading v-model:active="isLoading"
          :can-cancel="true"
          :color="color"
          :on-cancel="onCancel"
          :loader="loader"
          :is-full-page="fullPage"/>
  <div class="cart d-flex flex-column align-items-center mb-8 mt-7">
    <h1 class="my-36 mb-2">我的購物車</h1>
    <div class="text-end my-4 offset-7">
        <button
          class="btn btn-outline-danger"
          type="button"
          @click="deleteCartAll"
        >
          清空購物車
        </button>
      </div>
      <div class="d-none d-md-block" style="width: 70%;">
        <table class="table align-middle">
          <thead>
            <tr>
              <th>圖片</th>
              <th>品名</th>
              <th style="width: 150px">數量</th>
              <th class="text-center">小計</th>
              <th class="text-center" v-if="cart.total !== cart.final_total">折扣後金額</th>
              <th class="text-center"></th>
            </tr>
          </thead>
          <tbody>
            <template v-if="cart.carts">
              <tr v-for="item in cart.carts" :key="item.id">
                <td>
                  <div
                      style="
                        height: 100px;
                        background-size: cover;
                        background-position: center;
                        width: 100px
                      "
                      :style="{ backgroundImage: `url(${item.product.imageUrl})` }"
                    ></div>
                </td>
                <td>
                  {{ item.product.title }}
                  <div class="text-success" v-if="item.coupon">已套用</div>
                </td>
                <td>
                  <div class="input-group input-group-sm">
                    <select name="" id="" class="form-select" v-model="item.qty" @change="updateCart(item)" :disabled="lodingItem === item.id">
                      <option :value="i" v-for="i in 20" :key="i+'45621'">{{i}}</option>
                    </select>
                  </div>
                </td>
                <td class="text-center" :class="{ 'text-decoration-line-through': item.total !== item.final_total }">
                  {{ item.total }}
                </td>
                <td class="text-center" v-if="cart.total !== cart.final_total">
                  {{ Math.round(item.total - item.final_total)}}
                </td>
                <td class="text-center">
                  <button type="button" class="btn btn-outline-danger btn-sm" @click.prevent="deleteCartItem(item)" :disabled="lodingItem === item.id">
                    <i class="fas fa-spinner fa-pulse" v-if="lodingItem === item.id"></i>
                    x
                  </button>
                </td>
              </tr>
            </template>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="2" class="text-end"></td>
              <td class="text-end"></td>
              <td class="text-center">總計</td>
              <td class="text-center">{{ cart.total }}</td>
            </tr>
            <tr v-if="cart.total !== cart.final_total">
              <td colspan="2" class="text-end"></td>
              <td class="text-end"></td>
              <td class="text-center">折扣後金額</td>
              <td class="text-center text-danger">{{ Math.round(cart.total-cart.final_total) }}</td>
            </tr>

          </tfoot>
        </table>
      </div>

      <div class="d-md-none px-0 table-responsive">
        <table class="table align-middle">
          <!-- 手機板開始ok -->
          <thead>
            <tr>
              <th class="text-start">圖片</th>
              <th class="text-start">品名/數量</th>
              <th class="text-center">金額</th>
              <th class="text-center"></th>
            </tr>
          </thead>
          <tbody>
            <template v-if="cart.carts">
              <tr v-for="item in cart.carts" :key="item.id">
                <td>
                  <div
                      style="
                        height: 100px;
                        background-size: cover;
                        background-position: center;
                        width: 100px
                      "
                      :style="{ backgroundImage: `url(${item.product.imageUrl})` }"
                    ></div>
                </td>
                <td>
                  <div class="d-flex flex-column">
                    <div class="name-number">
                      {{ item.product.title }}
                      <div class="text-success d-none" v-if="item.coupon">已套用</div>
                    </div>
                    <div class="input-group input-group-sm">
                    <select name="" id="" class="form-select" v-model="item.qty" @change="updateCart(item)" :disabled="lodingItem === item.id">
                      <option :value="i" v-for="i in 20" :key="i+'45621'">{{i}}</option>
                    </select>
                  </div>
                  </div>
                </td>
                <td>
                  <div class="priced-flex flex-column">
                    <div class="text-center" :class="{ 'text-decoration-line-through': item.total !== item.final_total }">
                      小計:{{ item.total }}
                    </div>
                    <div class="text-center" v-if="cart.total !== cart.final_total">
                      折扣後金額:{{ Math.round(item.total - item.final_total)}}
                    </div>
                  </div>
                </td>

                <td class="text-center">
                  <button type="button" class="btn btn-outline-danger btn-sm" @click="deleteCartItem(item)" :disabled="lodingItem === item.id">
                    <i class="fas fa-spinner fa-pulse" v-if="lodingItem === item.id"></i>
                    x
                  </button>
                </td>
              </tr>
            </template>
          </tbody>
          <!-- 手機板結束ok -->
          <tfoot>
            <tr>
              <td class="text-end"></td>
              <td class="text-end"></td>
              <td class="text-center">總計</td>
              <td class="text-center">{{ cart.total }}</td>
            </tr>
            <tr v-if="cart.total !== cart.final_total">
              <td class="text-end"></td>
              <td class="text-end"></td>
              <td class="text-center">折扣後金額</td>
              <td class="text-center text-danger">{{ Math.round(cart.total-cart.final_total) }}</td>
            </tr>

          </tfoot>
        </table>
      </div>

      <div class="d-flex justify-content-between" style="width: 70%;"> <!--class="d-flex justify-content-between p-0"-->
        <div class="input-group mb-3 input-group-sm coupon">
          <div class="col-xl-6 col-md-12 px-md-1 mb-1">
            <input ref="coupon_input"
              type="text"
              class="form-control me-3"
              v-model="coupon_code"
              placeholder="請輸入優惠碼"
            />
          </div>
           <div class="col-xl-3 col-md-12 px-md-1 mb-1">
              <div class="input-group-append">
                  <button
                    class="btn btn-outline-secondary me-3"
                    type="button" :disabled="couponApplied"
                    @click="addCouponCode"
                    >
                    {{ couponApplied ? '優惠碼已套用' : '套用優惠碼' }}
                  </button>
                </div>
            </div>
            <div class="col-xl-3 col-md-12 px-md-1 mb-4">
            <button type="button" class="btn btn-dark" @click.prevent="nextCart">下一步</button>
          </div>
           </div>
      </div>

  </div>

</template>

<script>
import { mapActions, mapState } from 'pinia'
import cartStore from '../../store/cartStore.js'
import Swal from 'sweetalert2'
const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env

export default {
  data () {
    return {
      text: 'hello',
      products: [],
      productId: '',
      lodingItem: '',
      lodingItema: '',
      tempProduct: {},
      data: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: ''
        },
        message: ''
      },
      coupon_code: '',
      discount_total_price: '',
      couponApplied: false
    }
  },
  methods: {
    ...mapActions(cartStore, ['getCart']),
    // 更新購物車
    updateCart (item) { // 購物車id 產品id
      this.lodingItem = item.id
      const data = {
        product_id: item.product.id,
        qty: item.qty
      }
      console.log(data)
      this.$http.put(`${VITE_APP_URL}/v2/api/${VITE_APP_PATH}/cart/${item.id}`, { data })
        .then(res => {
          Swal.fire({
            title: '更新成功!',
            confirmButtonColor: '#7b7d42cc',
            icon: 'success',
            iconColor: '#EBDABC',
            confirmButtonText: '確認'
          })
          this.getCart()
          this.lodingItem = ''
        })
        .catch((err) => {
          alert(err.response.data.message)
        })
    },
    // 刪除單一品項購物車
    deleteCartItem (item) {
      this.lodingItem = item.id
      this.$http.delete(`${VITE_APP_URL}/v2/api/${VITE_APP_PATH}/cart/${item.id}`)
        .then(res => {
          Swal.fire({
            title: '刪除成功!',
            confirmButtonColor: '#7b7d42cc',
            icon: 'success',
            iconColor: '#EBDABC',
            confirmButtonText: '確認'
          })
          this.lodingItem = ''
          this.getCart()
        })
        .catch((err) => {
          alert(err.data.message)
          this.lodingItem = ''
        })
    },
    // 刪除全部品項購物車
    deleteCartAll () {
      this.lodingItem = '123'
      this.$http.delete(`${VITE_APP_URL}/v2/api/${VITE_APP_PATH}/carts`)
        .then(res => {
          console.log(res.data)
          Swal.fire({
            title: '刪除成功!',
            confirmButtonColor: '#7b7d42cc',
            icon: 'success',
            iconColor: '#EBDABC',
            confirmButtonText: '確認'
          })
          this.lodingItem = ''
          this.getCart()
        })
        .catch((err) => {
          alert(err.data.message)
          this.lodingItem = ''
        })
    },
    // 結帳
    order () {
      console.log(this.data)
      const orderData = {
        data: this.data
      }

      this.$http.post(`${VITE_APP_URL}/v2/api/${VITE_APP_PATH}/order`, orderData)
        .then(res => {
          // alert('res.data.message')
          // console.log(res.data.orderId)
          this.$router.push(`/checkOrder/${res.data.orderId}`)
          this.$refs.form.resetForm()
        })
        .catch((err) => {
          alert(err.response.data.message)
        })
      this.cart = ''
      this.$refs.form.resetForm()
    },
    // 套用優惠碼
    addCouponCode () {
      const data = { code: this.coupon_code }
      this.$http.post(`${VITE_APP_URL}/v2/api/${VITE_APP_PATH}/coupon`, { data })
        .then(res => {
          console.log(res.data.data.final_total)
          this.discount_total_price = res.data.data.final_total
          Swal.fire({
            title: '套用成功!',
            confirmButtonColor: '#7b7d42cc',
            icon: 'success',
            iconColor: '#EBDABC',
            confirmButtonText: '確認'
          })
          this.lodingItem = ''
          this.couponApplied = true
          this.$refs.coupon_input.value = ''
          this.coupon_code = ''
          console.log(this.$refs.coupon_input.value)
          this.getCart()
        })
        .catch((err) => {
          alert(err.data)
          this.lodingItem = ''
        })
    },
    // reset表單
    resetForm () {
      console.log(this.$refs.form)
      this.$refs.form.resetForm()
    },
    // 下一步
    nextCart () {
      // 轉址
      this.$router.push('/cartFront')
    }
  },
  computed: {
    ...mapState(cartStore, ['cart'])

  },
  mounted () {
    Swal.fire({
      title: '慶開幕輸入999可折9折',
      confirmButtonColor: '#7b7d42cc',
      icon: 'warning',
      iconColor: 'red',
      confirmButtonText: '確認'
    })
    this.getCart()
  }
}
</script>
