<template>
  <div class="login-card">
    <header class="login-card-header">
      <div class="login-card-header-btn" :class="{ active: isLogin }" @click="isLogin = !isLogin">會員登入</div>
      <div class="login-card-header-btn" :class="{ active: !isLogin }" @click="isLogin = !isLogin">新戶註冊</div>
    </header>
    <section class="login-card-section">
      <form action="post" class="form">
        <input type="text" v-model="email" placeholder="信箱" class="form-input">
        <input type="text" v-model="password" placeholder="密碼" class="form-input">
        <a href="#" class="forget" @click.prevent.stop="forgetPassword">忘記密碼？</a>
        <div class="btn-group">
          <button type="submit" v-show="isLogin" @click.prevent.stop="login({email, password})" class="form-btn">登入</button>
          <button type="submit" v-show="!isLogin" @click.prevent.stop="signUp({email, password})" class="form-btn">註冊</button>
        </div>
      </form>
      <div class="hr-text">
        <hr/>
        <span class="text">快速登入</span>
      </div>
      <div class="img-row">
        <img src="../assets/images/icon/facebook-login.svg" alt="facebook-icon">
        <img src="../assets/images/icon/google-login.svg" alt="facebook-icon">
      </div>
    </section>
  </div>
</template>

<script>
export default {
  props: ["login", "signUp"],
  data() {
    return {
      email: "",
      password: "",
      isLogin: true
    }
  },
  methods: {
    forgetPassword() {
      window.alert("尚未開放！")
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/main.scss";

  .login-card {
    width: 90%;
    box-shadow: 0px .25rem 1rem rgba(0, 0, 0, 0.2);
    border-radius: .5rem;
    &-header {
      @include flex-row-center-center;
      &-btn {
        @include font-h5(700);
        width: 50%;
        padding: .75rem 0;
        text-align: center;
        cursor: pointer;
        color: $grey-400;
        border-bottom: 3px solid $grey-300;
        &.active {
          color: $primary-700;
          border-bottom: 3px solid $primary-600;
        }
      }
    }
    &-section {
      width: 100%;
      padding: 1rem 2rem;
      .form {
        @include flex-column-flex-start-center;
        &-input {
          width: 100%;
          background-color: $grey-100;
          color: $grey-500;
          border-radius: $oval-bora;
          border: 1px solid $grey-300;
          padding: .5em 1em;
          margin: 1rem 0;
          &::placeholder {
            color: $grey-300;
          }
        }
        &-btn {
          @include btn-choose;
          background-color: $primary-600;
          color: $grey-100;
          &:hover {
            background-color: $primary-700;
          }
        }
        .forget {
          @include font-caption(700);
          align-self: flex-end;
          color: $primary-700;
        }
      }
      .btn-group {
        @include flex-row-center-center;
        gap: 10px;
        > button {
          @include font-h5(700);
        }
      }
      .hr-text {
        position: relative;
        margin: 1rem 0;
        height: 2rem;
        .text {
          @include font-content(700);
          position: absolute;
          top: 50%;
          left: calc(50% - 2.5rem);
          width: 5rem;
          background: $grey-100;
          text-align: center;
          color: $grey-400;
        }
        hr {
          position: absolute;
          top: 60%;
          width: 100%;
          height: 1px;
          border: 0;
          background-color: $grey-300;
        }
      }
      .img-row {
        @include flex-row-center-center;
        gap: 1rem;
        > img {
          width: 2rem;
        }
      }
    }
  }

  @include screen-up {
    .login-card {
      width: 60%;
      &-section {
        padding: 1rem 4rem;
      }
    }
  }

</style>