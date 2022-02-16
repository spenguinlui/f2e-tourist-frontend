<template>
  <footer class="footer-container">
    <div class="footer">
      <div class="footer-brand">
        <img src="../assets/images/icon/footer-logo.svg" alt="logo-icon">
        <div class="footer-brand-icon">
          <img src="../assets/images/icon/facebook.svg" alt="facebook-icon">
          <img src="../assets/images/icon/line.svg" alt="line-icon">
          <img src="../assets/images/icon/twitter.svg" alt="twitter-icon">
        </div>
      </div>
      <div class="footer-link">
        <div class="footer-link-item">
          <router-link :to="{ name: 'scenicspots' }">找景點</router-link>
          <router-link :to="{ name: 'themes', params: { type: 'scenicspots' } }">主題景點</router-link>
        </div>
        <!-- <div class="footer-link-item">
          <router-link :to="{ name: 'activities' }">找活動</router-link>
          <router-link :to="{ name: 'themes', params: { type: 'activities' } }">主題活動</router-link>
        </div> -->
        <div class="footer-link-item">
          <router-link :to="{ name: 'restaurants' }">找餐廳</router-link>
          <router-link :to="{ name: 'themes', params: { type: 'restaurants' } }">主題餐廳</router-link>
        </div>
        <div class="footer-link-item">
          <router-link :to="{ name: 'hotels' }">找飯店</router-link>
          <router-link :to="{ name: 'themes', params: { type: 'hotels' } }">嚴選住宿</router-link>
        </div>
        <div class="footer-link-item">
          <router-link :to="{ name: 'user-login' }" v-if="!userIsLogin">會員登入</router-link>
          <button v-else @click="logout">會員登出</button>
          <router-link :to="{ name: 'suppliers' }">商家專區</router-link>
        </div>
      </div>
      <div class="footer-copyright">Released 2021 by Shiaohan & 阿柳 ©</div>
    </div>
  </footer>
</template>

<script>
import { mapGetters } from 'vuex';

  export default {
    computed: {
      ...mapGetters('serverModule', ['userIsLogin'])
    },
    methods: {
      // 使用者登出
      logout() {
        this.$store.dispatch("serverModule/signOutUserOnServer", this);
        this.$store.dispatch("otherModule/getFavorites");
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/main.scss";

  .footer-container {
    @include flex-column-center-center;
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: $footer-height;
    background-color: $primary-600;
    padding: 0 3vw;
    z-index: $footer-z;
  }
  .footer {
    @include flex-column-center-center;
    margin: auto;
    width: 90%;
    height: 100%;
    color: $grey-100;
    &-brand, &-link, &-copyright {
      padding: 1vh 1%;
    }
    &-brand {
      @include flex-row-center-center;
      &-icon {
        @include flex-row-center-center;
        margin-top: 0;
        margin-left: .5rem;
        img {
          margin-right: .375rem;
        }
      }
    }
    &-link {
      display: none;
      &-item {
        @include flex-column-center-center;
        a, button {
          @include font-button(700);
          margin-bottom: .5rem;
          color: $grey-100;
          cursor: pointer;
          &:visited {
            color: $grey-100;
          }
        }
      }
    }
    &-copyright {
      @include font-button(500);
    }
  }

  @include screen-up {
    .footer {
      @include flex-row-center-center;
      &-brand {
        @include flex-column-center-center;
        &-icon {
          margin-top: .5rem;
          margin-left: 0;
        }
      }
      &-link {
        @include flex-row-space-between-center;
        width: 40%;
        padding: 0 1%;
      }
    }
  }
  
</style>