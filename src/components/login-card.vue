<template>
  <div class="login-card-container">
    <div class="bg-card" :style="{ height: `${cardHight}px`, backgroundImage: bgImg }">
      <h1>實現<br />夢想旅程</h1>
    </div>
    <div class="login-card" ref="loginCard">
      <header class="login-card-header">
        <div class="login-card-header-btn" :class="{ active: isLogin }" @click="isLogin = !isLogin">{{ identityZh }}登入</div>
        <div class="login-card-header-btn" :class="{ active: !isLogin }" @click="isLogin = !isLogin">{{ identity === 'user' ? '新戶註冊' : identity === 'supplier' ? '廠商申請' : '--' }}</div>
      </header>
      <section class="login-card-section">
        <form action="post" class="form">
          <input type="email" v-model="email" placeholder="信箱" class="form-input" required="required">
          <input type="password" v-model="password" placeholder="密碼" class="form-input" required="required">
          <input type="password" v-show="!isLogin" v-model="confirmPassword" placeholder="再次輸入密碼" class="form-input" required="required">
          <a href="#" class="forget" @click.prevent.stop="forgetPassword">忘記密碼？</a>
          <div class="btn-group">
            <button type="submit" v-show="isLogin" @click.prevent.stop="formValidate(login)" class="form-btn">登入</button>
            <button type="submit" v-show="!isLogin" @click.prevent.stop="formValidate(signUp)" class="form-btn">註冊</button>
          </div>
        </form>
        <template v-if="identity === 'user'">
          <div class="hr-text">
            <hr/>
            <span class="text">快速登入</span>
          </div>
          <div class="img-row">
            <img src="../assets/images/icon/facebook-login.svg" alt="facebook-icon">
            <img src="../assets/images/icon/google-login.svg" alt="facebook-icon">
          </div>
        </template>
      </section>
    </div>
  </div>
</template>

<script>

export default {
  props: ["login", "signUp", "identity"],
  data() {
    return {
      email: "",
      password: "",
      confirmPassword: "",
      isLogin: true,
      cardHight: ""
    }
  },
  computed: {
    bgImg() {
      if (this.isLogin) {
        return `url(${require('../assets/images/login-bg.png')})`;
      } else {
        return `url(${require('../assets/images/sign-up-bg.png')})`;
      }
    },
    identityZh() {
      switch (this.identity) {
        case "user": return "會員";
        case "supplier": return "廠商";
        case "admin": return "管理者";
        default: return "會員";
      }
    }
  },
  methods: {
    forgetPassword() {
      window.alert("尚未開放！")
    },
    formValidate(callbackFunc) {
      const { isLogin, email, password, confirmPassword } = this;
      if (!email || !password) {
        window.alert("信箱或密碼不得留空！");
        return;
      }
      if (!isLogin && password !== confirmPassword) {
        window.alert("確認密碼不符！");
        return;
      }
      callbackFunc({ email, password });
    }
  },
  created() {
    this.$nextTick(() => {
      this.cardHight = this.$refs.loginCard.offsetHeight;
    })
  },
  updated() {
    this.cardHight = this.$refs.loginCard.offsetHeight;
  }
}
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/main.scss";

  .login-card-container {
    @include flex-row-center-center;
    width: 100%;
    .bg-card {
      display: none;
    }
    .login-card {
      @include card-shadow;
      width: 90%;
      background: $grey-100;
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
            margin-bottom: .5rem;
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
          height: 2rem;
          > img {
            width: 2rem;
          }
        }
      }
    }
  }

  @include screen-up {
    .login-card-container {
      .bg-card {
        position: relative;
        display: block;
        width: calc(40vw * 0.618);
        margin-right: -0.5rem;
        border-radius: .5rem 0 0 .5rem;
        background-size: cover;
        &::before {
          content: " ";
          width: 20rem;
          height: 20rem;
          position: absolute;
          bottom: -3rem;
          left: -15rem;
          background: url("../assets/images/login-bgimg-2.png");
          background-size: cover;
          z-index: -1;
        }
        h1 {
          @include font-h2(bold);
          position: absolute;
          left: 1rem;
          bottom: 1.5rem;
          color: $grey-100;
        }
      }
      .login-card {
        width: 40vw;
        position: relative;
        &-section {
          padding: 1rem 4rem;
        }
        &::after {
          content: " ";
          width: 20rem;
          height: 15rem;
          position: absolute;
          bottom: 0rem;
          right: -14rem;
          background: url("../assets/images/login-bgimg-1.png");
          background-size: cover;
          z-index: -1;
        }
      }
    }
  }
  @include full-screen {
    .login-card-container {
      .bg-card {
        width: calc(30vw * 0.618);
      }
      .login-card {
        width: 30vw;
      }
    }
  }

</style>