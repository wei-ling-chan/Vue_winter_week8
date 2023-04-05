<template>
<loading v-model:active="isLoading"
          :can-cancel="true"
          :color="color"
          :on-cancel="onCancel"
          :loader="loader"
          :is-full-page="fullPage"/>
<!-- 購物資訊與表單驗證 -->

  <!--購物資訊  -->
  <div class="cart d-flex flex-column align-items-center mb-7 mt-9">
    <h1 class="mb-5">我的購物車</h1>
      <div class="d-none d-md-block" style="width: 70%;">
        <table class="table align-middle">
          <thead>
            <tr>
              <th class="table-image">圖片</th>
              <th>品名</th>
              <th style="width: 150px">數量</th>
              <th class="text-center">小計</th>
              <th class="text-center" v-if="cart.total !== cart.final_total">折扣後金額</th>
              <!-- <th class="text-center"></th> -->
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
                  <div class="ms-2">
                    {{ item.qty }}
                  </div>
                </td>
                <td class="text-center" :class="{ 'text-decoration-line-through': item.total !== item.final_total }">
                  {{ item.total }}
                </td>
                <td class="text-center" v-if="cart.total !== cart.final_total">
                  {{ Math.round(item.total - item.final_total)}}
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
                    <div class="text-center mt-1">
                      {{ item.qty }}
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
              </tr>
            </template>
          </tbody>
          <!-- 手機板結束ok -->
          <tfoot>
            <tr>
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
  </div>

  <!--表單驗證開始-->
<!-- row justify-content-center -->
  <div class=" d-flex flex-column  align-items-center mb-9">
    <h1 class="h4 text-center mb-4">填寫資訊</h1>
      <v-form ref="form" style="width: 70%;" v-slot="{ errors }" >
        <div class="mb-3">
          <label for="email" class="form-label">Email</label>
          <v-field id="email" name="email" type="email" class="form-control"
                    :class="{ 'is-invalid': errors['email'] }" placeholder="請輸入 Email"
                    rules="email|required" v-model="data.user.email"></v-field>
          <error-message name="email" class="invalid-feedback"></error-message>
        </div>

        <div class="mb-3">
          <label for="name" class="form-label">收件人姓名</label>
          <v-field id="name" name="姓名" type="text" class="form-control" :class="{ 'is-invalid': errors['姓名'] }"
                    placeholder="請輸入姓名" rules="required" v-model="data.user.name"></v-field>
          <error-message name="姓名" class="invalid-feedback"></error-message>
        </div>

        <div class="mb-3">
          <label for="tel" class="form-label">收件人電話</label>
          <v-field id="tel" name="電話" type="text" class="form-control" :class="{ 'is-invalid': errors['電話'] }"
                    placeholder="請輸入電話" rules="required|max:10|integer" v-model="data.user.tel"></v-field>
          <error-message name="電話" class="invalid-feedback"></error-message>
        </div>

        <div class="mb-3">
          <label for="address" class="form-label">收件人地址</label>
          <v-field id="address" name="地址" type="text" class="form-control" :class="{ 'is-invalid': errors['地址'] }"
                    placeholder="請輸入地址" rules="required" v-model="data.user.address"></v-field>
          <error-message name="地址" class="invalid-feedback"></error-message>
        </div>

        <div class="mb-3">
          <label for="message" class="form-label">留言</label>
          <!-- errors -->
          <v-field v-slot="{ field}" v-model="data.message" name="comment" rules="required">
            <textarea v-bind="field" name="comment" class="form-control"></textarea>
          </v-field>
        </div>
        <div class="text-center mt-4">
          <button type="button" class="btn btn-danger" @click.prevent="order"
                  >送出訂單</button>
        </div>
      </v-form>
  </div>

</template>

<script>
// loading
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/css/index.css'
// 表單驗證
import { Field, Form, ErrorMessage, defineRule, configure } from 'vee-validate'
import AllRules from '@vee-validate/rules'
import { localize } from '@vee-validate/i18n'
// 環境API
const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env
// 驗證規則加入 VeeValidate
Object.keys(AllRules).forEach((rule) => {
  defineRule(rule, AllRules[rule])
})
configure({ // 用來做一些設定
  generateMessage: localize('zh_TW'), // 啟用 locale
  VeeValidateNoInput: true // 輸入字元立即驗證
})
localize('zh_TW', {
  messages: {
    required: '這裡不能為空',
    email: '請輸入正確的電子郵件地址',
    min: '至少1碼',
    max: '超過8碼',
    integer: '須為整數'

  }
})

export default {
  data () {
    return {
      data: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: ''
        },
        message: ''
      },
      cart: [],
      // loding css
      color: '#9cd020',
      isLoading: false,
      fullPage: true,
      loader: 'bars'
    }
  },
  components: {
    VForm: Form,
    VField: Field,
    ErrorMessage,
    Loading
  },
  methods: {
    doAjax () {
      this.isLoading = true
    },
    // 取得購物車
    getCart () {
      this.$http.get(`${VITE_APP_URL}/v2/api/${VITE_APP_PATH}/cart`)
        .then(res => {
          this.cart = res.data.data
          console.log(this.cart)
          this.isLoading = false
        })
        .catch((err) => {
          alert(err.response.data.message)
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
    // reset表單
    resetForm () {
      console.log(this.$refs.form)
      this.$refs.form.resetForm()
    }
  },
  mounted () {
    this.doAjax()
    this.getCart()
  }
}
</script>
