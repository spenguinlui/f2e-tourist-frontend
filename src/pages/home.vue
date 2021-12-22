<template>
  <div class="home">
    <header class="home-benner">
      <h1 class="home-benner-title">開始實現你的夢想旅程</h1>
      <SearchBar :className="'home-search-bar'" />
    </header>
    <section class="home-section">
      <div class="home-section-title">
        <h2 class="home-section-title-left">熱門景點</h2>
        <div class="home-section-title-right">
          <div class="section-btn">查看更多</div>
        </div>
      </div>
      <div class="home-cards-slider">
        
      </div>
    </section>
    <section class="home-theme">
      <div>
        <h2 class="home-theme-tittle">你不能錯過的注目景點 !</h2>
        <router-link :to="{ name: 'theme' }" class="home-theme-btn">賞楓秘境看這裡</router-link>
      </div>
    </section>
    <section class="home-section">
      <div class="home-section-title">
        <h2 class="home-section-title-left">主題</h2>
        <div class="home-section-title-right">
          <div class="section-btn">查看更多</div>
        </div>
      </div>
      <div class="home-cards-slider">
        
      </div>
    </section>
  </div>
</template>

<script>
import SearchBar from "../components/search-bar.vue";
export default {
  components: {
    SearchBar
  }
}
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/main.scss";

  .home {
    &-benner {
      @include benner-background('../assets/images/home-benner.png');
      @include flex-column-center-center;
      width: 100%;
      height: 686px;
      margin-top: $nav-height;
      &-title {
        @include font-h1(bold);
        color: $grey-100;
        text-shadow: $tilte-shadow;
      }
    }
  }
</style>