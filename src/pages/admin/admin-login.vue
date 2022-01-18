<template>
  <div class="container">
    <LoginCard :login="login" :signUp="signUp" :identity="'admin'"/>
  </div>
</template>

<script>
import LoginCard from "@/components/login-card.vue";

export default {
  methods: {
    async login() {
      const adminParams = { email: this.email, password: this.password };
      await this.$store.dispatch("serverModule/loginAdminOnServer", { adminParams, vm: this });
    },
    signUp() {
      window.alert("尚不開放");
    }
  },
  components: {
    LoginCard
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