<template>
  <loading v-model:active="isLoading"
          :can-cancel="true"
          :color="color"
          :on-cancel="onCancel"
          :loader="loader"
          :is-full-page="fullPage"/>
  <div style="height: 25vh;"></div>
  <div class="cart d-flex flex-column align-items-center mb-5 mb-md-8 mt-4">
      <table class="d-none d-md-block"  style="width: 70%;" v-if="cart.carts && Object.keys(cart.carts).length > 0">
        <!-- 購物流程開始 -->
        <div class="position-relative mx-auto m-4 mb-7" style="width: 50%;">
          <div class="progress" style="height: 1px;">
            <div class="progress-bar" role="progressbar" style="width: 100%;background-color:black;" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
          </div>
          <button type="button" class="position-absolute  bg-success text-white top-0 start-0 translate-middle btn btn-sm btn-primary rounded-pill fs-7" style="width: 6rem; height:6rem;">購物車</button>
          <button type="button" class="position-absolute boeder border-dark bg-0 text-dark top-0 start-50 translate-middle btn btn-sm btn-primary rounded-pill fs-7" style="width: 6rem; height:6rem;">填寫訂單</button>
          <button type="button" class="position-absolute  bg-primary text-dark top-0 start-100 translate-middle btn btn-sm btn-secondary rounded-pill fs-7" style="width: 6rem; height:6rem;">完成訂單</button>
        </div>
        <!-- 購物流程結束 -->
        <div class="container text-end my-4">
          <button
            class="btn btn-outline-danger"
            type="button"
            @click="deleteCartAll"
          >
            清空購物車
          </button>
        </div>
        <table class="table align-middle fs-5">
          <thead>
            <tr></tr>
            <tr>
              <th>商品</th>
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
                        height: 150px;
                        background-size: cover;
                        background-position: center;
                        width: 250px
                      "
                      :style="{ backgroundImage: `url(${item.product.imageUrl})` }"
                    ></div>
                </td>
                <td>
                  {{ item.product.title }}
                  <div class="text-success fs-7" v-if="item.coupon">已套用</div>
                </td>
                <td>
                  <div class="input-group" style="width: 180px;">
                    <button class="btn btn-outline-secondary rounded-0 px-2" type="button" @click.prevent="updateCart(item,item.qty-1)"><i class="bi bi-dash-lg"></i></button>
                    <input type="text" class="form-control text-center"  :value="item.qty"  @change="updateCart(itemitem.qty)" placeholder="" aria-label="Example text with two button addons" readonly>
                    <button class="btn btn-outline-secondary rounded-0 px-2" type="button" @click.prevent="updateCart(item,item.qty+1)"><i class="bi bi-plus"></i></button>
                  </div>
                </td>
                <td class="text-center" :class="{ 'text-decoration-line-through': item.total !== item.final_total }">
                  {{ item.total }}
                </td>
                <td class="text-center" v-if="cart.total !== cart.final_total">
                  {{ Math.round(item.total - item.final_total) }}
                </td>
                <td class="text-center">
                  <button type="button" class="btn btn-outline-danger btn-sm" @click.prevent="deleteCartItem(item)" :disabled="lodingItem === item.id">
                    <i class="bi bi-trash3 fs-7"></i>
                    <i class="fas fa-spinner fa-pulse" v-if="lodingItem === item.id"></i>
                  </button>
                </td>
              </tr>
            </template>
          </tbody>
          <tfoot>
            <tr style="border:0;">
              <td class="text-end" style="border:0;"></td>
              <td class="text-end" style="border:0;"></td>
              <td style="border:0;"></td>
              <td style="border:0;"></td>
              <td class="text-center" style="border:0;">總計</td>
              <td class="text-center" :class="{ 'text-decoration-line-through': cart.total !== cart.final_total }" style="border:0;">{{ cart.total }}</td>
            </tr>
            <tr v-if="cart.total !== cart.final_total">
              <td class="text-end"></td>
              <td class="text-end"></td>
              <td></td>
              <td></td>
              <td class="text-center">折扣後金額</td>
              <td class="text-center text-danger">{{ Math.round(cart.total-cart.final_total) }}</td>
            </tr>

          </tfoot>
        </table>
        <!-- 優惠碼開始 -->
        <div class="input-group input-group-sm coupon mt-5">
          <div class="col-xl-3 col-md-12 me-2">
            <input ref="coupon_input"
              type="text"
              class="form-control me-3 rounded-0 fs-6"
              v-model="coupon_code"
              placeholder="請輸入優惠碼"/>
          </div>
          <div class="col-xl-3 col-md-12">
            <div class="input-group-append">
              <button
                class="btn btn-outline-secondary me-3 rounded-0 fs-6 fs-md-6"
                type="button" :disabled="couponApplied"
                @click="addCouponCode"
                >
                {{ couponApplied ? '優惠碼已套用' : '套用優惠碼' }}
              </button>
            </div>
          </div>
          <div class="d-flex ms-auto">
            <button type="button" class="btn btn-dark rounded-0 fs-5"><router-link to="/products" class="nav-link">繼續購物</router-link></button>
            <button type="button" class="btn btn-info ms-4 rounded-0 text-white fs-5" @click.prevent="nextCart">下一步</button>
          </div>
        </div>
      </table>
      <!-- 購物車沒品項開始 -->
      <div v-else class="text-center">
        <div class="d-flex flex-column justify-content-center">
          <img src="../../assets/images/eat-noodle.png" class="d-none d-md-block mx-auto" alt="" style="width: 500px;height:500px;">
          <img src="../../assets/images/eat-noodle.png" class="d-block d-md-none mx-auto" alt="" style="width: 400px;height:400px;">
          <h1 class="h5 text-center mb-4">購物車還沒有任何商品喔!</h1>
        </div>
        <button type="button" class="btn btn-dark rounded-0 margin-auto"><router-link to="/products" class="nav-link">繼續購物</router-link></button>
      </div>
      <!-- 購物車沒品項結束 -->
       <!-- 手機板開始 -->
      <div class="d-md-none px-2 table-responsive" v-if="cart.carts && Object.keys(cart.carts).length > 0">
        <!-- 購物流程開始 -->
        <div class="position-relative mx-auto m-5 mb-7" style="width: 50%;">
          <div class="progress" style="height: 1px;">
            <div class="progress-bar" role="progressbar" style="width: 100%;background-color:black;" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
          </div>
          <button type="button" class="position-absolute  bg-success text-white top-0 start-0 translate-middle btn btn-sm btn-primary rounded-pill fs-7" style="width: 4rem; height:4rem;">購物車</button>
          <button type="button" class="position-absolute boeder border-dark bg-0 text-dark top-0 start-50 translate-middle btn btn-sm btn-primary rounded-pill fs-7" style="width: 4rem; height:4rem;">填寫訂單</button>
          <button type="button" class="position-absolute  bg-primary text-dark top-0 start-100 translate-middle btn btn-sm btn-secondary rounded-pill fs-7" style="width: 4rem; height:4rem;">完成訂單</button>
        </div>
        <!-- 購物流程結束 -->
        <table class="table align-middle">
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
                      <div class="text-success d-none fs-7" v-if="item.coupon">已套用</div>
                    </div>
                    <div class="input-group input-group-sm">
                    <select name="" id="" class="form-select" v-model="item.qty" @change="updateCart(item)" :disabled="lodingItem === item.id">
                      <option :value="i" v-for="i in 20" :key="i+'45621'">{{ i }}</option>
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

                      折扣後金額:{{ Math.round(item.total - item.final_total) }}
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
        <!-- 手機板優惠碼開始 -->
        <div class="d-flex flex-column align-items-betw input-group input-group-sm coupon">
          <div class="d-flex justify-content-end mb-3">
            <div class="col-7 col-xl-3 col-md-12 me-2">
              <input ref="coupon_input"
                type="text"
                class="form-control me-3 rounded-0 fs-md-8 fs-14"
                v-model="coupon_code"
                placeholder="請輸入優惠碼"/>
            </div>
            <div class="col-4 col-xl-3 col-md-12">
              <div class="input-group-append">
                <button
                  class="btn btn-outline-secondary fs-md-6 fs-14 me-3 rounded-0"
                  type="button" :disabled="couponApplied"
                  @click="addCouponCode"
                  >
                  {{ couponApplied ? '優惠碼已套用' : '套用優惠碼' }}
                </button>
              </div>
            </div>
          </div>
          <div class="px-2 d-flex flex-column align-items-center">
            <button type="button" class="btn btn-dark rounded-0 fs-8 w-50 mb-2 w-100"><router-link to="/products" class="nav-link">繼續購物</router-link></button>
            <button type="button" class="btn btn-info rounded-0 text-white fs-8 w-100" @click.prevent="nextCart">下一步</button>
          </div>
        </div>
        <!-- 手機板優惠碼結束 -->
      </div>
      <!-- 手機板結束 -->
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
          tel: ''
          // address: ''
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
    updateCart (item, qty) { // 購物車id 產品id
      this.lodingItem = item.id
      const data = {
        product_id: item.product.id,
        qty
      }
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
      const orderData = {
        data: this.data
      }

      this.$http.post(`${VITE_APP_URL}/v2/api/${VITE_APP_PATH}/order`, orderData)
        .then(res => {
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
          this.getCart()
        })
        .catch((err) => {
          alert(err.data)
          this.lodingItem = ''
        })
    },
    // reset表單
    resetForm () {
      this.$refs.form.resetForm()
    },
    // 下一步
    nextCart () {
      // 轉址
      this.$router.push('/cartFront')
    },
    saveCart () {

    }
  },
  computed: {
    ...mapState(cartStore, ['cart'])

  },
  mounted () {
    this.getCart()
  }
}
</script>
