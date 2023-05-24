<template>
<loading v-model:active="isLoading"
          :can-cancel="true"
          :color="color"
          :on-cancel="onCancel"
          :loader="loader"
          :is-full-page="fullPage"/>

<!-- 購物資訊與表單驗證 -->
  <!--購物資訊  -->
  <div style="height: 20vh;"></div>
  <div class="cart d-flex flex-column align-items-center mb-5 mb-md-7 mt-4 mt-md-7">
    <!-- <h1 class="mb-5">我的購物車</h1> -->
      <div class="d-none d-md-block" style="width: 70%;">
         <!-- 購物流程開始 -->
        <div class="position-relative mx-auto m-4 mb-9" style="width: 50%;">
          <div class="progress" style="height: 1px;">
            <div class="progress-bar" role="progressbar" style="width: 100%;background-color:black;" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
          </div>
          <button type="button" class="position-absolute bg-success text-light border border-dark top-0 start-0 translate-middle btn btn-sm btn-primary rounded-pill fs-7" style="width: 6rem; height:6rem;">購物車</button>
          <button type="button" class="position-absolute bg-success text-light boeder border-dark bg-0 top-0 start-50 translate-middle btn btn-sm btn-primary rounded-pill fs-7" style="width: 6rem; height:6rem;">填寫訂單</button>
          <button type="button" class="position-absolute  bg-primary text-dark top-0 start-100 translate-middle btn btn-sm btn-secondary rounded-pill fs-7" style="width: 6rem; height:6rem;">完成訂單</button>
        </div>
         <!-- 購物流程結束 -->

        <!-- 正式開始 -->
          <div class="d-flex justify-content-start align-items-start">
            <table class="table align-middle fs-6 border border-dark" style="width: 50%;">
              <thead>
                <tr class="table-dark">
                  <th>訂單內容</th>
                  <th></th>
                  <th></th>
                  <th></th>
                  <th></th>
                  <th></th>
                </tr>
                <tr>
                  <th class="table-image">商品</th>
                  <th>品名</th>
                  <th>數量</th>
                  <th class="text-center">小計</th>
                  <th class="text-center fs-7" v-if="cart.total !== cart.final_total">折扣後金額</th>
                  <th></th>
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
                      <!-- <div class="text-success" v-if="item.coupon">已套用</div> -->
                    </td>
                    <td>
                      <div class="ms-2 text-center">
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
                  <td class="text-center text-info" v-if="cart.total !== cart.final_total">已折扣</td>
                  <td class="text-center text-info" v-if="cart.total !== cart.final_total">{{ Math.round(cart.final_total) }}</td>
                  <td v-if="cart.total !== cart.final_total"></td>
                  <td class="text-center" v-if="cart.total !== cart.final_total">金額</td>
                  <td class="text-center text-danger" v-if="cart.total !== cart.final_total">{{ Math.round(cart.total-cart.final_total) }}</td>
                  <td v-if="cart.total === cart.final_total"></td>
                  <td v-if="cart.total === cart.final_total"></td>
                  <td class="text-center" v-if="cart.total === cart.final_total">總計</td>
                  <td class="text-center" v-if="cart.total === cart.final_total" :class="{ 'text-decoration-line-through': cart.total !== cart.final_total }">{{ cart.total }}</td>
                </tr>
              </tfoot>
            </table>
            <!-- 表單驗證開始123 -->
            <div class=" d-flex flex-column align-items-center ms-4 mb-9 border border-1 border-dark" style="width: 49%;">
              <div class="text-center fs-6 p-2 bg-dark text-white w-100">填寫資訊</div>
                <v-form ref="form" class="p-4" style="width: 95%;" v-slot="{ errors }" >
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
                    <label for="form-select" class="form-label">選擇<span class="fw-bold">內用</span>或<span class="fw-bold">外帶</span></label>
                    <select class="form-select" aria-label="Default select example" ref="inOut" @change="updateIsOut">
                      <option value="內用">內用</option>
                      <option value="外帶">外帶</option>
                    </select>
                  </div>
                  <div class="mb-3" v-if="isOut">
                    <label for="datepicker" class="form-label">預計 <span class="fw-bold">外帶</span> 取餐時間</label><br/>
                    <div class="d-flex w-100">
                      <v-date-picker v-model="date" mode="dateTime" is24hr>
                        <template v-slot="{ inputValue, inputEvents }">
                          <input ref="myInput"
                            class="px-2 py-1 border border-dark rounded-0 rounded-start px-11 py-10 w-100 rounded focus:outline-none focus:border-blue-300"
                            :value="inputValue"
                            v-on="inputEvents"/>
                        </template>
                      </v-date-picker><div class="px-2 py-1 border border-1 border-start-0 border-dark rounded-end" style="background-color: #e9ecef;"><i class="bi bi-calendar-date text-dark fs-6"></i></div>
                    </div>
                    <div class="text-danger">*當天預約，取餐時間需準備20分鐘</div>
                  </div>
                  <!-- <div class="mb-3">
                    <label for="address" class="form-label">收件人地址</label>
                    <v-field id="address" name="地址" type="text" class="form-control" :class="{ 'is-invalid': errors['地址'] }"
                              placeholder="請輸入地址" v-model="data.user.address"></v-field>
                    <error-message name="地址" class="invalid-feedback"></error-message>
                  </div> -->
                  <div class="mb-3">
                    <label for="form-select" class="form-label">付款方式</label>
                    <select class="form-select" aria-label="Default select example" ref="payInput">
                      <option selected>LINE Pay</option>
                      <option>信用卡</option>
                      <option>現金</option>
                    </select>
                  </div>
                  <div class="mb-3">
                    <label for="message" class="form-label">留言</label>
                    <!-- errors -->
                    <v-field v-slot="{ field}" v-model="data.message" name="comment" rules="required">
                      <textarea v-bind="field" name="comment" class="form-control"></textarea>
                    </v-field>
                  </div>
                  <div class="text-end mt-4">
                    <button type="button" class="btn btn-info text-white" @click.prevent="order"
                            >送出訂單</button>
                  </div>
                </v-form>
            </div>
            <!-- 表單驗證結束123 -->
          </div>
        <!-- 正式結束 -->

      </div>
      <!-- 手機板開始 -->
      <div class="d-md-none d-flex flex-column px-0 table-responsive">
        <!-- 購物流程開始 -->
        <div class="position-relative mx-auto m-5 mb-7" style="width: 50%;">
          <div class="progress" style="height: 1px;">
            <div class="progress-bar" role="progressbar" style="width: 100%;background-color:black;" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
          </div>
          <button type="button" class="position-absolute  bg-success text-white top-0 start-0 translate-middle btn btn-sm btn-primary rounded-pill fs-7" style="width: 4rem; height:4rem;">購物車</button>
          <button type="button" class="position-absolute boeder border-dark bg-success text-light top-0 start-50 translate-middle btn btn-sm btn-primary rounded-pill fs-7" style="width: 4rem; height:4rem;">填寫訂單</button>
          <button type="button" class="position-absolute  bg-primary text-dark top-0 start-100 translate-middle btn btn-sm btn-secondary rounded-pill fs-7" style="width: 4rem; height:4rem;">完成訂單</button>
        </div>
        <!-- 購物流程結束 -->
        <div class="d-flex justify-content-start align-items-start">
          <table class="table align-middle border border-1 border-dark">
            <thead>
              <tr class="table-dark">
                <th>訂單內容</th>
                <th></th>
                <th></th>
                <th></th>
              </tr>
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
                        <!-- <div class="text-success d-none" v-if="item.coupon">已套用</div> -->
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
            <tfoot>
              <tr>
                  <td class="text-center text-info" v-if="cart.total !== cart.final_total">已折扣</td>
                  <td class="text-center text-info" v-if="cart.total !== cart.final_total">{{ Math.round(cart.final_total) }}</td>
                  <!-- <td v-if="cart.total !== cart.final_total"></td> -->
                  <td class="text-center" v-if="cart.total !== cart.final_total">金額</td>
                  <td class="text-center text-danger" v-if="cart.total !== cart.final_total">{{ Math.round(cart.total-cart.final_total) }}</td>
                  <td v-if="cart.total === cart.final_total"></td>
                  <td v-if="cart.total === cart.final_total"></td>
                  <td class="text-center" v-if="cart.total === cart.final_total">總計</td>
                  <td class="text-center" v-if="cart.total === cart.final_total" :class="{ 'text-decoration-line-through': cart.total !== cart.final_total }">{{ cart.total }}</td>
                </tr>
            </tfoot>
          </table>
        </div>
        <!-- 表單驗證開始123 -->
        <div class=" d-flex flex-column align-items-center mb-2 border border-1 border-dark">
          <div class="text-center fs-6 p-2 bg-dark text-white w-100">填寫資訊</div>
            <v-form ref="form" class="p-4" style="width: 100%;" v-slot="{ errors }" >
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
                <label for="form-select" class="form-label">選擇<span class="fw-bold">內用</span>或<span class="fw-bold">外帶</span></label>
                <select class="form-select" aria-label="Default select example" ref="inOut" @change="updateIsOut">
                  <option value="內用">內用</option>
                  <option value="外帶">外帶</option>
                </select>
              </div>
              <div class="mb-3" v-if="isOut">
                <label for="datepicker" class="form-label">預計 <span class="fw-bold">外帶</span> 取餐時間</label><br/>
                <div class="d-flex w-100">
                  <v-date-picker v-model="date" mode="dateTime" is24hr>
                    <template v-slot="{ inputValue, inputEvents }">
                      <input ref="myInput"
                        class="px-2 py-1 border border-dark rounded-0 rounded-start px-11 py-10 w-100 rounded focus:outline-none focus:border-blue-300"
                        :value="inputValue"
                        v-on="inputEvents"/>
                    </template>
                  </v-date-picker><div class="px-2 py-1 border border-1 border-start-0 border-dark rounded-end" style="background-color: #e9ecef;"><i class="bi bi-calendar-date text-dark fs-6"></i></div>
                </div>
                <div class="text-danger">*當天預約，取餐時間需準備20分鐘</div>
              </div>
              <!-- <div class="mb-3">
                <label for="address" class="form-label">收件人地址</label>
                <v-field id="address" name="地址" type="text" class="form-control" :class="{ 'is-invalid': errors['地址'] }"
                          placeholder="請輸入地址" v-model="data.user.address"></v-field>
                <error-message name="地址" class="invalid-feedback"></error-message>
              </div> -->
              <div class="mb-3">
                <label for="form-select" class="form-label">付款方式</label>
                <select class="form-select" aria-label="Default select example" ref="payInput">
                  <option selected>LINE Pay</option>
                  <option>信用卡</option>
                  <option>現金</option>
                </select>
              </div>
              <div class="mb-3">
                <label for="message" class="form-label">留言</label>
                <!-- errors -->
                <v-field v-slot="{ field}" v-model="data.message" name="comment" rules="required">
                  <textarea v-bind="field" name="comment" class="form-control"></textarea>
                </v-field>
              </div>
              <div class="text-end mt-4">
                <button type="button" class="btn btn-info text-white" @click.prevent="order"
                        >送出訂單</button>
              </div>
            </v-form>
        </div>
            <!-- 表單驗證結束123 -->
        <!-- 手機板結束 -->
      </div>
  </div>
</template>

<script>
// loading
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/css/index.css'
// import { ref } from 'vue'
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
    const date = new Date()
    date.setMinutes(date.getMinutes() + 20) // 将时间设置为当前时间加上 20 分钟
    return {
      data: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: '目前無此服務'
        },
        message: ''
      },
      cart: [],
      // date: new Date(),
      date,
      payMethos: {
        inOrOut: '',
        payTime: '',
        payBy: '',
        orderCount: 0
      },
      // loding css
      color: '#9cd020',
      isLoading: false,
      fullPage: true,
      loader: 'bars',
      isOut: false
    }
  },
  components: {
    VForm: Form,
    VField: Field,
    ErrorMessage,
    Loading
    // VDatePicker

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
          console.log(err.response.data.message)
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
          this.$router.push(`/checkOrder/${res.data.orderId}`)
          this.$refs.form.resetForm()
          this.orderinfo()
        })
        .catch((err) => {
          console.log(err.response)
        })
      this.cart = ''
      this.$refs.form.resetForm()
    },
    // reset表單
    resetForm () {
      console.log(this.$refs.form)
      this.$refs.form.resetForm()
    },
    updateIsOut () {
      if (this.$refs.inOut.value === '內用') {
        this.isOut = false
      } else if (this.$refs.inOut.value === '外帶') {
        this.isOut = true
      }
    },
    orderinfo () {
      // 選擇內用或外帶
      console.log(this.$refs.inOut.value)
      this.payMethos.inOrOut = this.$refs.inOut.value
      // 預計外帶取餐時間
      const value = this.$refs.myInput.value

      this.payMethos.payTime = value
      // 付款方式

      this.payMethos.payBy = this.$refs.payInput.value
      // 取單號
      this.payMethos.orderCount = this.payMethos.orderCount + 1
      const payMethosStr = JSON.stringify(this.payMethos)
      localStorage.setItem('order', payMethosStr)
    }
  },
  mounted () {
    this.doAjax()
    this.getCart()
  }
}

</script>
