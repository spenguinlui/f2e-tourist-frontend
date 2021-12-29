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
  created() {
    this.$store.dispatch("serverModule/getThemesByServer");
    this.$store.dispatch("otherModule/getFavorites");
  }
}
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/main.scss";
</style>