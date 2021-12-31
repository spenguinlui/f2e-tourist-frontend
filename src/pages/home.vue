<template>
  <div class="home">
    <header class="home-benner">
      <h1 class="home-benner-title">開始實現你的夢想旅程</h1>
      <SearchBar :className="'home-search-bar'" />
    </header>
    <section class="home-section">
      <div class="home-section-title">
        <h2 class="home-section-title-text">熱門景點</h2>
        <button class="home-section-title-btn">查看更多</button>
      </div>
      <div class="home-cards-slider">
        <!-- 資料讀取中 -->
        <template v-if="!dataLoaing">
          <div v-for="(item, index) in new Array(3)" :key="index" class="card-container">
            <MaskCard />
          </div>
        </template>
        <!-- 資料完成 -->
        <template v-else>
          <div v-for="item in hotDataList" :key="item.ID" class="card-container">
            <Card :item="item" :type="item.Type" :classType="'commonCard'"/>
          </div>
        </template>
      </div>
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
      <div class="home-cards-slider">
        <!-- 資料讀取中 -->
        <template v-if="dataLoaing">
          <div v-for="(item, index) in new Array(3)" :key="index" class="card-container">
            <MaskCard />
          </div>
        </template>
        <!-- 資料完成 -->
        <template v-else>
          <div v-for="item in themes[1].themeDataList" :key="item.ID" class="card-container">
            <Card :item="item" :type="item.Type" :classType="'commonCard'"/>
          </div>
        </template>
      </div>
    </section>
  </div>
</template>

<script>
import SearchBar from "@/components/search-bar.vue";
import Card from "@/components/card.vue";
import MaskCard from '@/components/mask-card.vue';
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters(['hotDataList', 'themes', 'dataLoaing'])
  },
  methods: {
    getHotDataList() {
      this.$store.dispatch("getHotDataList");
    },
    getThemeDataList() {
      this.$store.dispatch("getThemeDataList", this.themes[1]);
    }
  },
  created() {
    this.getHotDataList();
    this.getThemeDataList();
  },
  components: {
    SearchBar,
    Card,
    MaskCard
  }
}
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/main.scss";

  section {
    @include content-padding(2.5vh);
  }

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
    &-cards-slider {
      @include flex-row-flex-start-center;
      @include scroll;
      .card-container {
        @include card-flex;
      }
    }
    &-theme {
      @include benner-background('../assets/images/theme-benner.png');
      @include flex-column-center-center;
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