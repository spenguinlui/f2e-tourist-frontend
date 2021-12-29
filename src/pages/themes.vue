<template>
  <div class="container-fluid">
    <header class="benner-container" :style="{ backgroundImage: bgImage }">
      <h1 class="benner-title">主題{{ classType_zh }}</h1>
    </header>
    <div class="theme">
      <template v-if="Object.keys(themes).length > 0">
        <section class="theme-section" v-for="theme in themes" :key="theme.themeId">
          <div class="theme-section-title">
            <h2 class="theme-section-title-text">{{ theme.themeName }}</h2>
            <div class="theme-section-title-right">
              <button><router-link :to="{ name: 'theme', params: { index: theme.themeId } }" class="theme-section-title-btn">查看更多</router-link></button>
            </div>
          </div>
          <div class="theme-cards-slider">
            <!-- 資料讀取中 -->
            <template v-if="dataLoaing">
              <div v-for="(item, index) in new Array(3)" :key="index" class="card-container">
                <MaskCard />
              </div>
            </template>

            <!-- 資料完成 -->
            <template v-else>
              <!-- 有資料 -->
              <template v-if="theme.themeDataList ? theme.themeDataList.length > 0 : false">
                <div v-for="item in theme.themeDataList" :key="item.ID" class="card-container">
                  <Card :item="item" :type="item.Type" :classType="'commonCard'"/>
                </div>
              </template>
              <!-- 沒資料 -->
              <template v-else>
                <NoContent/>
              </template>
            </template>
          </div>
        </section>
      </template>

      <!-- 沒任何 theme (防呆) -->
      <template v-else>
        <NoContent/>
      </template>
    </div>
  </div>
</template>

<script>
import Card from '@/components/card.vue';
import MaskCard from '@/components/mask-card.vue';
import NoContent from '@/components/no-content.vue';
import { mapGetters } from 'vuex';

export default {
  name: "theme",
  data() {
    return {
      dataType: ""
    }
  },
  watch: {
    themes() {
      this.getThemeDataList();
    }
  },
  computed: {
    classType_zh() {
      switch (this.dataType) {
        case "activities": return "活動";
        case "restaurants": return "餐廳";
        case "hotels": return "飯店";
        case "scenicspots": return "景點";
        default: return "其他";
      }
    },
    bgImage() {
      switch (this.dataType) {
        case "activities":  return `url(${require('../assets/images/tour-benner.png')})`;
        case "restaurants": return `url(${require('../assets/images/food-benner.png')})`;
        case "hotels":      return `url(${require('../assets/images/hotel-benner.png')})`;
        case "scenicspots": return `url(${require('../assets/images/tour-benner.png')})`;
        default:            return `url(${require('../assets/images/tour-benner.png')})`;
      }
    },
    ...mapGetters(['themes', 'dataLoaing'])
  },
  methods: {
    getThemeDataList() {
      const dataType = this.dataType = this.$route.params.type;
      this.$store.dispatch("getSingleTypeThemeDataList", dataType);
    }
  },
  created() {
    this.getThemeDataList();
  },
  components: {
    Card,
    NoContent,
    MaskCard
  }
}
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/main.scss";

  .benner-container {
    @include flex-row-center-center;
    @include content-padding($section-padding-y);
    @include darken-benner;
    height: $class-benner-m-height;
    .benner-title {
      @include font-h4(bold);
      color: $grey-100;
    }
  }

  .theme {
    @include content-padding(1.5vh, true);
    .theme {
      &-section {
        &-title {
          @include flex-row-space-between-center;
          padding: 0 3vw;
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
    }
  }

  @include screen-up {
    .benner-container {
      @include flex-row-flex-start-center;
      height: $class-benner-height;
      .benner-title {
        @include font-h1(bold);
      }
    }
  }
</style>