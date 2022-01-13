<template>
  <div class="container">
    <form action="post" class="form">
      <input type="text" v-model="email" placeholder="請填寫 Email" class="form-input">
      <input type="text" v-model="password" placeholder="請填寫密碼" class="form-input">
      <div class="btn-group">
        <button type="submit" @click.prevent.stop="login" class="form-btn">登入</button>
        <button type="submit" @click.prevent.stop="signUp" class="form-btn">我想成為商家</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: ""
    }
  },
  methods: {
    async login() {
      const supplierParams = { email: this.email, password: this.password };
      await this.$store.dispatch("serverModule/loginSupplierOnServer", { supplierParams, vm: this });
    },
    signUp () {
      window.alert("尚未開放！");
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/main.scss";

  .container {
    @include content-padding(.1vh);
    @include flex-column-center-center;
    height: calc(100vh - #{$nav-height} - #{$footer-height});
    .form {
      @include flex-column-flex-start-center;
      &-input {
        width: 30em;
        background-color: $grey-100;
        color: $grey-500;
        border-radius: $oval-bora;
        border: 1px solid $grey-500;
        padding: .5em 1em;
        margin: 1rem 0;
      }
      &-btn {
        @include btn-text;
        @include btn-outline;
      }
    }
    .btn-group {
      @include flex-row-center-center;
      gap: 10px;
    }
    .res-msg {
      @include font-h5(bold);
      margin-top: 1rem;
    }
  }

</style>