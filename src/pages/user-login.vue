<template>
  <div class="container">
    <LoginCard :login="login" :signUp="signUp" :identity="'user'"/>
  </div>
</template>

<script>
import LoginCard from "@/components/login-card.vue";

export default {
  methods: {
    async login(userParams) {
      await this.$store.dispatch("serverModule/loginUserOnServer", { userParams, vm: this });
    },
    async signUp(userParams) {
      await this.$store.dispatch("serverModule/signUpUserOnServer", { userParams, vm: this });
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
    height: calc(100vh - #{$nav-height} - #{$footer-m-height});
  }
  
  @include screen-up {
    .container {
      height: calc(100vh - #{$nav-height} - #{$footer-height});
    }
  }

</style>