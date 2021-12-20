<template>
  <div class="home">
    <div class="home-benner">
      <div class="home-benner-title">
        開始實現你的夢想旅程
      </div>
    </div>
    <div class="home-section">
      <div class="home-section-title">
        <div class="home-section-title-left">熱門景點</div>
        <div class="home-section-title-right">
          <div class="section-btn">查看更多</div>
        </div>
      </div>
      <div class="home-cards-slider">
        
      </div>
    </div>
    <div class="home-theme">
      <div>
        <div class="home-theme-tittle">你不能錯過的注目景點！</div>
        <router-link :to="{ name: 'theme' }" class="home-theme-btn">賞楓秘境看這裡</router-link>
      </div>
    </div>
    <div class="home-section">
      <div class="home-section-title">
        <div class="home-section-title-left">主題</div>
        <div class="home-section-title-right">
          <div class="section-btn">查看更多</div>
        </div>
      </div>
      <div class="home-cards-slider">
        
      </div>
    </div>
  </div>
</template>

<script>
export default {
  
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