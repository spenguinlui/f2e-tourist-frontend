<template>
  <div class="container">
    <div class="login-card-container">
      <div class="bg-card" :style="{ height: `${cardHight}px` }">
        <h1>實現<br />夢想旅程</h1>
      </div>
      <div class="login-card" ref="loginCard">
        <header class="login-card-header">
          <div type="button" class="login-card-header-btn">忘記密碼</div>
        </header>
        <section class="login-card-section">
          <form action="post" class="form">
            <label class="form-input">
              <input type="email" v-model="email"  placeholder=" " class="form-input-field" required="required">
              <span class="form-input-label">信箱</span>
            </label>
            <div class="btn-group">
              <button type="submit" @click.prevent.stop="sendEamil" class="form-btn">發信</button>
            </div>
          </form>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      email: "",
      cardHight: ""
    }
  },
  methods: {
    sendEamil() {
      const domain = process.env.NODE_ENV === "development" ? process.env.VUE_APP_BACKEND_DEV_DOMAIN : process.env.VUE_APP_BACKEND_DOMAIN;
      axios.post(`${domain}/api/v1/user/forget_password`, { email: this.email })
      .then(() => {
        window.alert("已寄送密碼信件，請至您信箱收信");
      })
      .catch(error => {
        window.alert("發信失敗！");
        console.log(error)
      })
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

    .container {
    @include content-padding(.1vh);
    @include flex-column-center-center;
    height: calc(100vh - #{$nav-height} - #{$footer-m-height});
  }

  .login-card-container {
    @include flex-row-center-center;
    width: 100%;
  }
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
        color: $primary-700;
        border-bottom: 3px solid $primary-600;
      }
    }
    &-section {
      width: 100%;
      padding: 1rem 2rem;
      .form {
        @include flex-column-flex-start-center;
        &-input {
          position: relative;
          width: 100%;
          margin: 1rem 0;
          &-field {
            width: 100%;
            padding: calc(.5em * 1.75) calc(.5em * 3);
            background-color: $grey-100;
            color: $grey-500;
            border-radius: $oval-bora;
            border: 1px solid $grey-300;
            &:-webkit-autofill {
              box-shadow: 0 0 0px 1000px $grey-100 inset;
              -webkit-box-shadow: 0 0 0px 1000px $grey-100 inset;
            }
            &:focus, &:not(:placeholder-shown) {
              border: 2px solid $primary-300;
              & + .form-input-label {
                width: auto;
                left: 0;
                transform: translate(.25rem, -65%) scale(.8);
                color: $primary-700;
              }
            }
          }
          &-label {
            width: calc(100% - (.5em * 1.2 * 2));
            border-radius: $oval-bora;
            position: absolute;
            left: .5em;
            top: 0;
            padding: calc(.5em * 0.5) calc(.5em * 1.2);
            margin: calc(.5em * 0.75) calc(.5em * .5);
            background-color: $grey-100;
            color: $grey-400;
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
        img {
          width: 2rem;
          cursor: pointer;
        }
      }
    }
  }

  @include screen-up {
    .container {
      height: calc(100vh - #{$nav-height} - #{$footer-height});
    }
    .bg-card {
      position: relative;
      display: block;
      width: calc(40vw * 0.618);
      margin-right: -0.5rem;
      border-radius: .5rem 0 0 .5rem;
      background-size: cover;
      background-image: url("../assets/images/sign-up-bg.png");
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
  @include full-screen {
    .bg-card {
      width: calc(30vw * 0.618);
    }
    .login-card {
      width: 30vw;
    }
  }

</style>
