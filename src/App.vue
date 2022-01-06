<template>
  <div id="app">
    <Navbar/>
    <router-view :key="$route.fullPath"/>
    <Footer />
  </div>
</template>

<script>
import Navbar from './components/navbar.vue';
import Footer from './components/footer.vue';

export default {
  name: 'App',
  components: {
    Navbar,
    Footer
  },
  methods: {
    checkUserIsLogin() {
      const userAuthToken = this.$cookie.get('_u');
      if (userAuthToken)
        this.$store.commit("serverModule/UPDATE_USER_LOGIN", true);
    }
  },
  created() {
    this.$store.dispatch("serverModule/getHotsByServer");
    this.$store.dispatch("serverModule/getThemesByServer");
    this.$store.dispatch("otherModule/getFavorites");
    this.checkUserIsLogin();
  }
}
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/main.scss";
</style>