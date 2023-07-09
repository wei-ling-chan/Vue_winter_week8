<template>
  <Loading v-model:active="isLoading"
          :can-cancel="true"
          :color="color"
          :on-cancel="onCancel"
          :loader="loader"
          :is-full-page="fullPage"/>
  <div class="cart-space"></div>
  <div class="check-order d-none d-md-block d-flex flex-column align-items-center mb-0 mb-md-7 mt-4 mt-md-7">
    <div class="mx-auto" style="width: 70%;">
      <!-- 購物流程開始 -->
      <div class="position-relative mx-auto m-4 mb-8" style="width: 50%;" v-if="!order.is_paid">
        <div class="progress" style="height: 1px;">
          <div class="progress-bar" role="progressbar" style="width: 100%;background-color:black;" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
        </div>
        <button type="button" class="position-absolute bg-success text-light border border-dark top-0 start-0 translate-middle btn btn-sm btn-primary rounded-pill fs-7" style="width: 6rem; height:6rem;">購物車</button>
        <button type="button" class="position-absolute bg-success text-light boeder border-dark bg-0 top-0 start-50 translate-middle btn btn-sm btn-primary rounded-pill fs-7" style="width: 6rem; height:6rem;">填寫訂單</button>
        <button type="button" class="position-absolute  bg-primary text-dark top-0 start-100 translate-middle btn btn-sm btn-secondary rounded-pill fs-7" style="width: 6rem; height:6rem;">完成訂單</button>
      </div>
      <div class="position-relative mx-auto m-4 mb-8" style="width: 50%;" v-if="order.is_paid">
        <div class="progress" style="height: 1px;">
          <div class="progress-bar" role="progressbar" style="width: 100%;background-color:black;" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
        </div>
        <button type="button" class="position-absolute bg-success text-light border border-dark top-0 start-0 translate-middle btn btn-sm btn-primary rounded-pill fs-7" style="width: 6rem; height:6rem;">購物車</button>
        <button type="button" class="position-absolute bg-success text-light boeder border-dark bg-0 top-0 start-50 translate-middle btn btn-sm btn-primary rounded-pill fs-7" style="width: 6rem; height:6rem;">填寫訂單</button>
        <button type="button" class="position-absolute bg-success text-light top-0 start-100 translate-middle btn btn-sm btn-secondary rounded-pill fs-7" style="width: 6rem; height:6rem;">完成訂單</button>
      </div>
      <!-- 購物流程結束 -->

      <!-- 正式開始 -->
      <div class="d-flex justify-content-start align-items-start">
        <table class="table align-middle border border-dark" style="width: 50%;">
          <thead>
            <tr class="table-dark text-center fs-md">
              <th colspan="4">訂單內容</th>
            </tr>
            <tr class="fs-md">
              <th class="table-image text-center order-product">商品</th>
              <th class="text-center  order-product">品名</th>
              <th class="text-center  order-product">數量</th>
              <th class="text-center fs-7  order-product">金額</th>
            </tr>
          </thead>
          <tbody>
            <template v-if="order">
              <tr v-for="item in order.products" :key="item.id" class="fs-md">
                <td>
                  <div
                      style="
                        height: 100px;
                        background-size: cover;
                        background-position: center;
                        width: 100%
                      "
                      :style="{ backgroundImage: `url(${ item.product.imageUrl })` }"
                    ></div>
                </td>
                <td class="text-center">
                  {{ item.product.title }}
                </td>
                <td>
                  <div class="ms-2 text-center">
                    {{ item.qty }}
                  </div>
                </td>
                <td class="text-center" v-if="item.total === item.final_total">
                  {{ item.total }}
                </td>
                <td class="text-center" v-if="item.total !== item.final_total">
                  {{ Math.round(item.final_total) }}
                </td>
              </tr>
            </template>
          </tbody>
          <tfoot>
            <tr>
              <td class="text-center text-info" v-if="order.total !==0">已折扣</td>
              <td class="text-center text-info" v-if="order.total !==0">{{ totalSum-order.total }}</td>
              <td class="text-center" style="color: #a64942;" v-if="order.total !==0">金額</td>
              <td class="text-center" style="color: #a64942;" v-if="order.total ===0">總計</td>
              <td class="text-center" style="color: #a64942;" v-if="order.total ===0" :class="{ 'text-decoration-line-through': cart.total !== cart.final_total }">{{ totalSum-order.total }}</td>
            </tr>
          </tfoot>
        </table>
        <!-- 訂單資訊開始 -->
        <div class=" d-flex flex-column align-items-center ms-4 mb-1 border border-1 border-dark information" style="width: 49%;">
          <div class="text-center p-2 bg-dark text-white w-100 border-bottom border-dark information-titlte fs-md">訂單資訊<span class="badge text-light ms-2 fw-normal" style="background-color: #356408;">{{ localOrder.inOrOut }}</span></div>
          <table class="table text-start" style="margin-bottom: -1px !important;">
            <tbody class="fs-md">
              <tr style="height: 46px;">
              <th  style="color: #a64942;">取單號</th>
              <td  style="color: #a64942;">{{ localOrder.orderCount }}</td>
            </tr>
            <tr style="height: 46px;vertical-align:middle;">
              <th>Email</th>
              <td>{{ order.user.email }}</td>
            </tr>
            <tr style="height: 46px;vertical-align:middle;">
              <th>姓名</th>
              <td>{{ order.user.name }}</td>
            </tr>
            <tr style="height: 46px;vertical-align:middle;">
              <th>收件人電話</th>
              <td>{{ order.user.tel }}</td>
            </tr>
            <tr style="height: 46px;vertical-align:middle;">
              <th>取餐時間</th>
              <td>{{ localOrder.payTime }}</td>
            </tr>
            <tr style="height: 46px;vertical-align:middle;">
              <th>付款方式</th>
              <td>{{ localOrder.payBy }}</td>
            </tr>
            <tr style="height: 46px;vertical-align:middle;">
              <th>付款狀態</th>
              <td>
                <span v-if="!order.is_paid">尚未付款</span>
                <span v-else class="text-success">付款完成</span>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
        <!-- 訂單資訊結束 -->
      </div>
      <div class="text-end align-self-end mt-2" v-if="order.is_paid === false">
        <button class="btn btn-info text-light" @click="payOrder">確認付款去</button>
      </div>
      <div class="text-end align-self-end mt-2" v-if="order.is_paid === true">
        <button class="btn btn-info text-light" @click="payOrder">繼續購物</button>
      </div>
        <!-- 正式結束 -->
    </div>
  </div>
  <!-- 手機板開始 -->
  <div class="check-order d-md-none d-flex flex-column align-items-center px-0 table-responsive">
    <!-- 購物流程開始 -->
    <div class="position-relative mx-auto m-5 mb-7" style="width: 50%;">
      <div class="progress" style="height: 1px;">
        <div class="progress-bar" role="progressbar" style="width: 100%;background-color:black;" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
      </div>
      <button type="button" class="position-absolute  bg-success text-white top-0 start-0 translate-middle btn btn-sm btn-primary rounded-pill fs-7" style="width: 4rem; height:4rem;">購物車</button>
      <button type="button" class="position-absolute boeder border-dark bg-success text-light top-0 start-50 translate-middle btn btn-sm btn-primary rounded-pill fs-7" style="width: 4rem; height:4rem;">填寫訂單</button>
      <button type="button" class="position-absolute  bg-success text-light top-0 start-100 translate-middle btn btn-sm btn-secondary rounded-pill fs-7" v-if="order.is_paid" style="width: 4rem; height:4rem;">完成訂單</button>
      <button type="button" class="position-absolute  bg-primary text-dark top-0 start-100 translate-middle btn btn-sm btn-secondary rounded-pill fs-7" v-else style="width: 4rem; height:4rem;">完成訂單</button>
    </div>
    <!-- 購物流程結束 -->
    <!-- 正式開始 -->
    <div class="d-flex flex-column px-2">
      <table class="table align-middle border border-dark">
        <thead>
          <tr class="table-dark text-center fs-md">
            <th colspan="4" class="w-100">訂單內容</th>
          </tr>
          <tr class="fs-md">
            <th class="table-image text-center order-product">商品</th>
            <th class="text-center order-product">品名</th>
            <th class="text-center order-productr">數量</th>
            <!-- <th class="text-center">小計</th> -->
            <th class="text-center order-product">金額</th>
          </tr>
        </thead>
        <tbody>
          <template v-if="order">
            <tr v-for="item in order.products" :key="item.id" class="fs-md">
              <td>
                <div
                    style="
                      height: 100px;
                      background-size: cover;
                      background-position: center;
                      width: 100px
                    "
                    :style="{ backgroundImage: `url(${ item.product.imageUrl })` }"
                  ></div>
              </td>
              <td class="text-center">
                {{ item.product.title }}
              </td>
              <td>
                <div class="ms-2 text-center">
                  {{ item.qty }}
                </div>
              </td>
              <td class="text-center" v-if="item.total === item.final_total">
                {{ item.total }}
              </td>
              <td class="text-center" v-if="item.total !== item.final_total">
                {{ Math.round(item.final_total) }}
              </td>
            </tr>
          </template>
        </tbody>
        <tfoot>
          <tr>
            <td class="text-center text-info" v-if="order.total !==0">已折扣</td>
            <td class="text-center text-info" v-if="order.total !==0">{{ totalSum-order.total }}</td>
            <td class="text-center" style="color: #a64942;" v-if="order.total !==0">金額</td>
            <td class="text-center" style="color: #a64942;" v-if="order.total !==0">{{ totalSum }}</td>
            <td v-if="order.total ===0"></td>
            <td v-if="order.total ===0"></td>
            <td class="text-center" v-if="order.total ===0">總計</td>
            <td class="text-center" v-if="order.total ===0" :class="{ 'text-decoration-line-through': cart.total !== cart.final_total }">{{ totalSum-order.total }}</td>
          </tr>
        </tfoot>
      </table>
      <!-- 訂單資訊開始 -->
      <div class=" d-flex flex-column align-items-center my-3 border border-1 border-dark information">
        <div class="text-center p-2 bg-dark text-white w-100 border-bottom border-dark information-title fs-md">訂單資訊<span class="badge text-light ms-2 fw-normal" style="background-color: #356408;">{{ localOrder.inOrOut }}</span></div>
        <table class="table text-start" style="margin-bottom: -1px !important;">
          <tbody class="fs-md">
            <tr style="height: 46px;">
            <th  style="color: #a64942;">取單號</th>
            <td  style="color: #a64942;">{{ localOrder.orderCount }}</td>
          </tr>
          <tr style="height: 46px;vertical-align:middle;">
            <th>Email</th>
            <td>{{ order.user.email }}</td>
          </tr>
          <tr style="height: 46px;vertical-align:middle;">
            <th>姓名</th>
            <td>{{ order.user.name }}</td>
          </tr>
          <tr style="height: 46px;vertical-align:middle;">
            <th>收件人電話</th>
            <td>{{ order.user.tel }}</td>
          </tr>
          <tr style="height: 46px;vertical-align:middle;">
            <th>取餐時間</th>
            <td>{{ localOrder.payTime }}</td>
          </tr>
          <tr style="height: 46px;vertical-align:middle;">
            <th>付款方式</th>
            <td>{{ localOrder.payBy }}</td>
          </tr>
          <tr style="height: 46px;vertical-align:middle;">
            <th>付款狀態</th>
            <td>
              <span v-if="!order.is_paid">尚未付款</span>
              <span v-else class="text-success">付款完成</span>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
      <div class="text-end align-self-end mt-2 mb-4 px-md-2" v-if="order.is_paid === false">
        <button class="btn btn-info" @click="payOrder">確認付款去</button>
      </div>
      <!-- 訂單資訊結束 -->
    </div>
  <!-- 正式結束 -->
  </div>
  <!-- 手機板結束 -->

</template>

<script>
// loading
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/css/index.css'
import Swal from 'sweetalert2'
const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env
export default {
  data () {
    return {
      order: {
        user: {}
      },
      orderId: '',
      orderProductsObj: {},
      localOrder: {},
      Subtotal: 0,
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
    doAjax () {
      this.isLoading = true
    },
    getOrder () {
      const url = `${VITE_APP_URL}/api/${VITE_APP_PATH}/order/${this.orderId}`
      this.$http.get(url).then((response) => {
        this.order = response.data.order
        this.orderProductsObj = response.data.order.products
        this.isLoading = false
      }).catch((error) => {
        this.$httpMessageState(error.response, '錯誤訊息')
      })
    },
    payOrder () {
      const url = `${VITE_APP_URL}/api/${VITE_APP_PATH}/pay/${this.orderId}`

      this.$http.post(url).then(() => {
        this.getOrder()
        Swal.fire({
          // sweealert2
          title: '<strong>訂購成功</strong>',
          iconHtml: '<i class="fa-solid fa-check"></i>',
          html: '感謝您的訂購</b>' + '<p>商品將會盡速送達</p> ',
          showCloseButton: true,
          focusConfirm: false,
          confirmButtonText: '<i class="bi bi-house-door"></i> 回首頁',
          confirmButtonAriaLabel: 'Thumbs up, great!',
          preConfirm: () => {
            return this.$router.push('/')
          },
          preDeny: () => {
            return this.$router.push('/products')
          },
          showDenyButton: true,
          denyButtonText: '繼續購物',
          denyButtonAriaLabel: 'Thumbs down',
          denyButtonColor: '#91905a',
          denyButtonTextColor: '#fff'
        })
      }).catch((error) => {
        this.$httpMessageState(error.response, '錯誤訊息')
      })
    },
    getorderinfo () {
      this.localOrder = JSON.parse(localStorage.getItem('order'))
    }
  },
  computed: {
    totalSum () {
      let sum = 0
      for (const key in this.orderProductsObj) {
        if (Object.prototype.hasOwnProperty.call(this.orderProductsObj, key)) {
          sum += this.orderProductsObj[key].total
        }
      }
      return sum
    }
  },
  mounted () {
    this.orderId = this.$route.params.orderId
    this.getOrder()
    this.doAjax()
    this.getorderinfo()
  }
}
</script>
