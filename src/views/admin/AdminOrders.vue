<template>
  <h1>這是後台訂單列表</h1>
  <table class="table mt-4">
    <thead>
      <tr>
        <th>購買時間</th>
        <th>Email</th>
        <th>購買款項</th>
        <th>應付金額</th>
        <th>是否付款</th>
        <th>編輯</th>
      </tr>
    </thead>
    <tbody>
      <template v-for="(adminOrder, key) in adminOrders" :key="key+'12345'">
        <tr v-if="adminOrders.length" :class="{ 'text-secondary': !adminOrder.is_paid }">
          <td>{{formattedDate(adminOrder.create_at, 'yyyy-MM-dd') }}</td>
          <td><span v-text="adminOrder.user.email" v-if="adminOrder.user"></span></td>
          <td>
            <ul class="list-unstyled">
              <li v-for="(product, i) in adminOrder.products" :key="i">
                {{ product.product.title }} 數量：{{ product.qty }}
                {{ product.product.unit }}
              </li>
            </ul>
          </td>
          <td class="text-right">{{ adminOrder.total }}</td>
          <td>
            <div class="form-check form-switch">
              <input
                class="form-check-input"
                type="checkbox"
                :id="`paidSwitch${adminOrder.id}`"
                v-model="adminOrder.is_paid"
                @change="updatePaid(adminOrder)"
              />
              <label class="form-check-label" :for="`paidSwitch${adminOrder.id}`">
                <span v-if="adminOrder.is_paid">已付款</span>
                <span v-else>未付款</span>
              </label>
            </div>
          </td>
          <td>
            <div class="btn-group">
              <button
                class="btn btn-outline-info btn-sm"
                type="button"
                @click="openModal(adminOrder)"
              >
                檢視
              </button>
              <button
                class="btn btn-outline-danger btn-sm"
                type="button"
                @click="delOrderModal(adminOrder)"
              >
                刪除
              </button>
            </div>
          </td>
        </tr>
      </template>
    </tbody>
  </table>
  <order-modal ref="orderModal" :order="tempOrder" @change-status="updatePaid"></order-modal>
  <del-order-modal ref="delOrderModal" :order="tempOrder" @del-item="delAdminOrder"></del-order-modal>
</template>

<script>
import orderModal from '../../components/adminOrderModal.vue'
import delOrderModal from '../../components/delOrderModal.vue'
const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env
export default {
  data () {
    return {
      adminOrders: [],
      tempOrder: {},
      currentPage: 1,
      timestamp: '',
      orderComponent: '',
      delorderComponent: '',
      paid: {}
    }
  },
  components: {
    orderModal, delOrderModal
  },
  methods: {
    // 取得後台訂單
    getAdminOrders (currentPage = 1) {
      this.currentPage = currentPage
      this.$http.get(`${VITE_APP_URL}/v2/api/${VITE_APP_PATH}/admin/orders?page=${currentPage}`)
        .then(res => {
          console.log(res.data.success)
          this.adminOrders = res.data.orders
          // this.timestamp = this.adminOrders.filter(function (item) {
          //   return 123
          // })
          console.log(this.adminOrders)
          this.formattedDate()
        })
        .catch((err) => {
          alert(err.response.data.message)
        })
    },
    updatePaid (adminOrder) {
      console.log(adminOrder.is_paid)
      // this.isLoading = true
      this.paid = {
        is_paid: adminOrder.is_paid
      }
      this.$http.put(`${VITE_APP_URL}/v2/api/${VITE_APP_PATH}/admin/order/${adminOrder.id}`, { data: this.paid })
        .then((res) => {
          alert(res.data.message)
          console.log('updatePaid', res.data)
          this.orderComponent.hideModal()
          this.getAdminOrders()
        })
    },
    delAdminOrder () {
      console.log(this.tempOrder.id)
      this.$http.delete(`${VITE_APP_URL}/v2/api/${VITE_APP_PATH}/admin/order/${this.tempOrder.id}`)
        .then(res => {
          alert(res.data.message)
          this.delorderComponent.hideModal()
          this.getAdminOrders()
        })
        .catch((err) => {
          alert(err.response.data.message)
        })
    },
    openModal (item) {
      this.tempOrder = { ...item }
      console.log(this.$refs.orderModal)
      this.orderComponent = this.$refs.orderModal
      this.orderComponent.openModal()
    },
    delOrderModal (item) {
      this.tempOrder = { ...item }
      this.delorderComponent = this.$refs.delOrderModal
      this.delorderComponent.openModal()
    },
    formattedDate (timestamp, format) {
      const date = new Date(timestamp * 1000) // 将 Unix 时间戳转换为 JavaScript Date 对象
      return date.toLocaleDateString(undefined, { dateFormat: format })
    }
  },
  mounted () {
    // 取出token
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1')
    // 預設token帶入header
    this.$http.defaults.headers.common.Authorization = token
    this.getAdminOrders()
  }
}
</script>
