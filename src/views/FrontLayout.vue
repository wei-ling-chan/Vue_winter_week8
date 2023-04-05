<template>
<!-- header -->
<div class="web">
  <header class="header bg-primary  sticky-top">
      <div class="container">
        <nav class="navbar navbar-expand-lg navbar-light">
          <div class="container-fluid justify-content-between">
            <router-link to="/"><img src="../assets/images/logo.png" class="logo" alt="麵鋪子"></router-link>
            <!-- <a href="index.html"><img src="../assets/images/logo.png" class="logo" alt="麵鋪子"> </a> -->
            <a class="logo navbar-brand d-none d-md-block " href="#"></a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse justify-content-between" id="navbarSupportedContent">
              <ul class="menu navbar-nav  fs-5 fw-bold text-center mb-md-0 mb-3">
                <li class="nav-item me-md-6 me-0 mt-md-2  my-2 mt-4">
                  <router-link to="/about" class="nav-link">關於我們</router-link>
                </li>
                <li class="nav-item me-md-6 me-0 my-2 ">
                  <router-link to="/products" class="nav-link">美味專區</router-link>
                </li>
                <li class="nav-item me-md-6 me-0 my-2">
                  <router-link to="/news" class="nav-link">最新消息</router-link>
                </li>
                <li class="nav-item me-md-6 me-0 my-2">
                  <router-link to="/cart" class="nav-link"><i class="bi bi-cart-fill"></i><span class="badge cart-badge rounded-pill bg-danger fs-18">{{cartsLength}}</span></router-link>
                </li>
              </ul>
              <!-- <ul class="serch-shopCart navbar-nav text-center flex-row flex-nowrap justify-content-between">
                <li class="serch nav-item me-2">
                  <form action="tasty2.html" method="get" id="search_tasty">
                    <div class="d-flex">
                      <input type="text" class="form-control bg-primary border-2" name="keyword" placeholder="請輸入搜尋產品">
                      <button type="submit" class="btn btn-primary"><i class="bi bi-search"></i></button>
                    </div>
                  </form>
                </li>
              </ul> -->

            </div>
          </div>
        </nav>
      </div>
    </header>
  <!--router-view -->
  <router-view></router-view>
  <!-- footer -->
  <footer class="footer bg-dark">
    <div class="container  d-flex justify-content-between py-md-5 py-4">
      <nav class="contact">
        <div class="mb-3 text-light"> <a href="javascript:void(0)" class="text-decoration-none">聯絡我們</a></div>
        <ul class="contact-info">
          <li class="mb-1"><a href="tel:+0800-123-4567" class="text-decoration-none">電話: 04-1234567</a></li>
          <li class="mb-1"><a href="mailto:wlc606@gmail.com" class="text-decoration-none">E-mail: wlc606@gmail.com</a></li>
          <li class="mb-1"><a href="javascript:void(0)" class="text-decoration-none">營業時間(週二公休): 11:00 am-7:00 pm</a></li>
          <li class="mb-1"><a href="#" class="text-decoration-none">地址: 台中市XX區XX里一段XX巷</a></li>
        </ul>
      </nav>
      <nav class="menu-social d-md-block d-none">
        <ul class="contact-info d-flex mb-6 justify-content-between">
            <router-link to="/about" class="me-3 text-decoration-none">關於我們</router-link>
            <router-link to="/products" class="me-3 text-decoration-none">美味專區</router-link>
            <router-link to="/news" class="me-3 text-decoration-none">最新消息</router-link>
            <router-link to="/login" class="me-3 text-decoration-none">後台登入</router-link>
            <router-link to="/admin/products" class="me-3 text-decoration-none">後臺產品列表</router-link>
        </ul>
        <ul class="contact-icon d-flex justify-content-end">
          <li class="me-3"><a href="#"><i class="bi bi-facebook"></i></a></li>
          <li class="me-3"><a href="#"><i class="bi bi-instagram"></i></a></li>
          <li><a href="#"><i class="bi bi-github"></i></a></li>
        </ul>

      </nav>
    </div>
    <div class="copyright bg-success">
      <div class="container">
        <p class="text-light mb-0  py-2">ⓒ Copyright 2022 麵鋪子僅作為個人作品，無任何商業用途</p>
      </div>
    </div>
    </footer>
</div>

</template>

<script>
import { RouterView } from 'vue-router'
import { mapState } from 'pinia'
import cartStore from '../store/cartStore'
export default {
  components: {
    RouterView
  },
  computed: {
    ...mapState(cartStore, ['cartsLength', 'getCart'])
  },
  mounted () {
    this.getCart()
  }
}
</script>
