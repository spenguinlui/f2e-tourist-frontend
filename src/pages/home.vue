<template>
  <div class="home">
    <header class="home-benner">
      <h1 class="home-benner-title">開始實現你的夢想旅程</h1>
      <SearchBar :className="'home-search-bar'" />
    </header>
    <section class="home-section">
      <div class="home-section-title">
        <h2 class="home-section-title-text">熱門景點</h2>
      </div>
      <CardSlider :mode="'hot'"/>
    </section>
    <section class="home-theme">
      <h2 class="home-theme-title">你不能錯過的注目景點 !</h2>
      <button><router-link :to="{ name: 'theme', params: { index: 2 } }" class="home-theme-btn">賞楓秘境看這裡</router-link></button>
    </section>
    <section class="home-section">
      <div class="home-section-title">
        <h2 class="home-section-title-text">{{ themes[1].themeName }}</h2>
        <div class="home-section-title-right">
          <button><router-link :to="{ name: 'theme', params: { index: 1 } }" class="home-section-title-btn">查看更多</router-link></button>
        </div>
      </div>
      <CardSlider v-if="themes[1].themeDataList" :mode="'theme'" :theme="themes[1]"/>
      <template v-else><NoContent /></template>
    </section>
  </div>
</template>

<script>
import SearchBar from "@/components/search-bar.vue";
import CardSlider from '@/components/cards-slider.vue';
import NoContent from '@/components/no-content.vue';
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters(['hotDataList', 'themes', 'dataLoaing'])
  },
  created() {
    // 增加更新
    this.$store.dispatch("serverModule/getHotsByServer");
    this.$store.dispatch("serverModule/getThemesByServer");
  },
  components: {
    SearchBar,
    CardSlider,
    NoContent
  }
}
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/main.scss";

  .home {
    margin-bottom: $footer-m-height;
    &-benner {
      @include benner-background('../assets/images/home-benner.png');
      @include flex-column-center-center;
      width: 100%;
      height: calc(100vh - #{$nav-height} - #{$footer-m-height});
      margin-top: $nav-height;
      &-title {
        @include font-h1(bold);
        color: $grey-100;
        text-shadow: $tilte-shadow;
        width: 70%;
        text-align: center;
      }
    }
    &-section {
      @include content-padding(2.5vh);
      &-title {
        @include flex-row-space-between-center;
        &-text {
          @include font-h3(bold);
          color: $primary-800;
          padding: .5rem 0;
        }
        &-btn {
          @include btn-text;
          @include btn-filled;
        }
      }
    }
    &-theme {
      @include benner-background('../assets/images/theme-benner.png');
      @include flex-column-center-center;
      @include content-padding(2.5vh);
      width: 100%;
      height: 50vh;
      &-title {
        @include font-h2(bold);
        padding: 1.25rem;
        text-shadow: $tilte-shadow;
        color: $grey-100;
      }
      &-btn {
        @include btn-text;
        @include btn-filled;
      }
    }
  }
  @include screen-up {
    .home {
      margin-bottom: $footer-height;
      &-benner {
        height: calc(100vh - #{$nav-height} - #{$footer-height});
        &-title {
          width: 100%;
        }
      }
    }
  }
</style>