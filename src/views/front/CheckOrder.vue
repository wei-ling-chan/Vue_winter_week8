<template>
  <loading v-model:active="isLoading"
          :can-cancel="true"
          :color="color"
          :on-cancel="onCancel"
          :loader="loader"
          :is-full-page="fullPage"/>
  <div class="container">
    <!-- <Loading :active="isLoading" :z-index="1060"></Loading> -->
    <div class="my-5 row justify-content-center">
      <form class="col-md-6" @click="payOrder" style="width: 70%;">
          <!-- 訂單明細 -->
          <h2 class="text-center h5 mb-4 mt-6">訂單明細</h2>
          <table class="table align-middle mb-7">
            <thead>
              <th class="d-none d-md-block" style="display: table-cell !important;">圖片</th>
              <th>品名</th>
              <th>數量</th>
              <th>單價</th>
              <th>小計</th>
            </thead>
            <tbody>
            <tr v-for="item in order.products" :key="item.id">
              <td class="d-none d-md-block border-0"><div
                        style="
                          height: 100px;
                          background-size: cover;
                          background-position: center;
                          width: 100px
                        "
                        :style="{ backgroundImage: `url(${item.product.imageUrl})` }"
                      ></div></td>
              <td class="text-start">{{ item.product.title }}</td>
              <td class="text-start">{{ item.qty }}</td>
              <td class="text-start">{{ item.product.price }}</td>
              <td class="text-start">{{ item.final_total }}</td>
            </tr>
            </tbody>
            <tfoot>
            <tr>
              <td class="text-start"></td>
              <td class="text-start"></td>
              <td class="text-start d-none d-md-table-cell"></td>
              <td class="text-start">總計</td>
              <td class="text-start">{{ order.total }}</td>
            </tr>
            </tfoot>
          </table>
           <!-- 訂單資訊 -->
           <h2 class="text-center h5 mb-4">訂單資訊</h2>
          <table class="table mb-4">
            <tbody>
            <tr>
              <th width="100">Email</th>
              <td>{{ order.user.email }}</td>
            </tr>
            <tr>
              <th>姓名</th>
              <td>{{ order.user.name }}</td>
            </tr>
            <tr>
              <th>收件人電話</th>
              <td>{{ order.user.tel }}</td>
            </tr>
            <tr>
              <th>收件人地址</th>
              <td>{{ order.user.address }}</td>
            </tr>
            <tr>
              <th>付款狀態</th>
              <td>
                <span v-if="!order.is_paid">尚未付款</span>
                <span v-else class="text-success">付款完成</span>
              </td>
            </tr>
            </tbody>
          </table>
          <div class="text-end" v-if="order.is_paid === false">
            <button class="btn btn-danger mb-9">確認付款去</button>
          </div>
      </form>
    </div>
  </div>

</template>

<script>
// loading
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/css/index.css'
const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env
export default {
  data () {
    return {
      order: {
        user: {}
      },
      orderId: '',
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
        this.isLoading = false
      }).catch((error) => {
        this.$httpMessageState(error.response, '錯誤訊息')
      })
    },
    payOrder () {
      const url = `${VITE_APP_URL}/api/${VITE_APP_PATH}/pay/${this.orderId}`
      // this.isLoading = true
      this.$http.post(url).then(() => {
        // this.isLoading = false
        this.getOrder()
      }).catch((error) => {
        // this.isLoading = false
        this.$httpMessageState(error.response, '錯誤訊息')
      })
    }
  },
  mounted () {
    console.log(this.$route.params.orderId)
    this.orderId = this.$route.params.orderId
    console.log(this.orderId)
    this.getOrder()
    this.doAjax()
  }
}
</script>
