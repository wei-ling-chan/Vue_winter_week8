<template>
  <h1>後台產品列表</h1>
  <div class="container">
    <div class="text-end mt-4">
      <button class="btn btn-info" @click="openModal('create')">
        建立新的產品
      </button>
    </div>
    <table class="table mt-4">
      <thead>
        <tr>
          <th width="120">
            分類
          </th>
          <th>產品名稱</th>
          <th width="120">
            原價
          </th>
          <th width="120">
            售價
          </th>
          <th width="100">
            是否啟用
          </th>
          <th width="120">
            編輯
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in product" :key="item.id">
          <td>{{item.category}}</td>
          <td>{{item.title}}</td>
          <td class="text-start">{{item.origin_price}}</td>
          <td class="text-start">{{item.price}}</td>
          <td>
            <span class="text-success">{{item.is_enabled ? '啟用':'未啟用'}}</span>

          </td>
          <td>
            <div class="btn-group">
              <button type="button" class="btn btn-outline-info btn-sm" @click="openModal('edit',item)" data-id="item.id">
                編輯
              </button>
              <button type="button" class="btn btn-outline-danger btn-sm" @click="openModal('del',item)">
                刪除
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <pagination-components :pages="page" :get-product="getProduct" @change-page="getProduct"></pagination-components>
    <product-modal ref="productModal" @update-product="updateProduct" :product="template"></product-modal>
    <delproduct-modal ref="delproductModal" @del-product="delProduct" :product="template"></delproduct-modal>
  </div>
</template>

<script>
import PaginationComponents from '../../components/PaginationComponents.vue'
import ProductModal from '../../components/ProductModal.vue'
import delproductModal from '../../components/delproductModal.vue'
const { VITE_APP_URL } = import.meta.env
export default {
  data () {
    return {
      product: [],
      template: {
        imagesUrl: []
      },
      isNew: false, // 確認是編輯或新增所使用
      page: {} /// /用變數決定現在要帶第幾頁
    }
  },
  components: {
    PaginationComponents, ProductModal, delproductModal

  },
  methods: {
    getProduct (page) {
      this.$http.get(`${VITE_APP_URL}/v2/api/wlc606/admin/products/?page=${page}`)
        .then(res => {
          this.product = res.data.products
          this.page = res.data.pagination
          console.log(this.product)
        })
        .catch(error => {
          console.dir(error)
        })
    },
    // 新增 post
    updateProduct (item) {
      this.template = item
      console.log('updateProduct')
      let httpMethod = 'post'
      let api = `${VITE_APP_URL}/v2/api/wlc606/admin/product`
      // 編輯 put
      if (!this.isNew) {
        httpMethod = 'put'
        console.log(this.template)
        api = `${VITE_APP_URL}/v2/api/wlc606/admin/product/${this.template.id}`
      }
      this.$http[httpMethod](api, { data: this.template })

        .then(res => {
          this.$refs.productModal.hideModal()
          alert('新增成功')
          this.getProduct()
        })
        .catch(error => {
          alert('新增失敗，請重新檢視')
          console.dir(error)
        })
    },

    // 刪除
    delProduct () {
      this.$http.delete(`${VITE_APP_URL}/v2/api/wlc606/admin/product/${this.template.id}`)
        .then(res => {
          this.$refs.delproductModal.hideModal()
          alert('刪除成功')
          this.getProduct()
        })
        .catch(error => {
          alert('刪除失敗')
          console.dir(error)
        })
    },

    // 打開Modal 新增or編輯or刪除
    openModal (status, item) {
      if (status === 'create') {
        this.template = {
          imagesUrl: []
        }
        this.isNew = true
        this.$refs.productModal.openModal()
      } else if (status === 'edit') {
        this.template = { ...item }
        this.$refs.productModal.openModal()
      } else if (status === 'del') {
        this.$refs.delproductModal.openModal()
        this.template = { ...item }
      }
    }

  },
  mounted () {
    // 取出token
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1')
    // 預設token帶入header
    this.$http.defaults.headers.common.Authorization = token
    this.getProduct()
  }
}
</script>
