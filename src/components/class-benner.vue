<template>
  <div>
    <div class="benner-container" :style="{ backgroundImage: bgImage }">
      <h1 class="benner-title">{{ classType_zh }}列表</h1>
      <div class="benner-btn-container">
        <div class="left-btn">
          <div class="relative">
            <div class="choose-btn" @click.prevent.stop="showSelectBlock">選擇地區</div>
            <div v-show="areaSelectBlockVisible" ref="selectAreaBlockContainer">
              <!-- <SelectAreaBlock :hideSelectBlock="hideSelectBlock"/> -->
            </div>
          </div>
          <div class="choose-btn">選擇日期</div>
        </div>
        <div class="right-btn">
          <button class="filter-btn">篩選<img src="../assets/images/icon/filter-f.svg" alt="切換列表icon"></button>
          <div v-if="classType === 'scenicspots'" @click="isMap = !isMap">
            <router-link v-show="isMap" :to="{ name: 'scenicspots-list' }" class="filter-icon-btn"><img src="../assets/images/icon/list-f.svg" alt="切換列表icon"></router-link>
            <router-link v-show="!isMap" :to="{ name: 'scenicspots-map' }" class="filter-icon-btn"><img src="../assets/images/icon/map-f.svg" alt="切換地圖icon"></router-link>
          </div>
          <div v-if="classType === 'activities'" @click="isMap = !isMap">
            <router-link v-show="isMap" :to="{ name: 'activities-list' }" class="filter-icon-btn"><img src="../assets/images/icon/list-f.svg" alt="切換列表icon"></router-link>
            <router-link v-show="!isMap" :to="{ name: 'activities-map' }" class="filter-icon-btn"><img src="../assets/images/icon/map-f.svg" alt="切換地圖icon"></router-link>
          </div>
          <div v-if="classType === 'hotels'" @click="isMap = !isMap">
            <router-link v-show="isMap" :to="{ name: 'hotels-list' }" class="filter-icon-btn"><img src="../assets/images/icon/list-f.svg" alt="切換列表icon"></router-link>
            <router-link v-show="!isMap" :to="{ name: 'hotels-map' }" class="filter-icon-btn"><img src="../assets/images/icon/map-f.svg" alt="切換地圖icon"></router-link>
          </div>
          <div v-if="classType === 'restaurants'" @click="isMap = !isMap">
            <router-link v-show="isMap" :to="{ name: 'restaurants-list' }" class="filter-icon-btn"><img src="../assets/images/icon/list-f.svg" alt="切換列表icon"></router-link>
            <router-link v-show="!isMap" :to="{ name: 'restaurants-map' }" class="filter-icon-btn"><img src="../assets/images/icon/map-f.svg" alt="切換地圖icon"></router-link>
          </div>
        </div>
      </div>
    </div>
    <div class="benner-m-menu">
      <div class="left-block">
        <div class="relative">
          <div class="left-btn" @click.stop.prevent="showSelectBlock">選擇地區</div>
          <div v-show="areaSelectBlockVisible" ref="selectAreaBlockContainer">
            <!-- <SelectAreaBlock :hideSelectBlock="hideSelectBlock"/> -->
          </div>
        </div>
        <div class="left-btn">選擇日期</div>
      </div>

      <div class="right-block">
        <div class="right-btn"><img src="../assets/images/icon/filter-f.svg" alt="切換列表icon"></div>
        <div v-if="classType === 'scenicspots'" @click="isMap = !isMap">
          <router-link v-show="isMap" :to="{ name: 'scenicspots-list' }" class="right-btn"><img src="../assets/images/icon/list-f.svg" alt="切換列表icon"></router-link>
          <router-link v-show="!isMap" :to="{ name: 'scenicspots-map' }" class="right-btn"><img src="../assets/images/icon/map-f.svg" alt="切換地圖icon"></router-link>
        </div>
        <div v-if="classType === 'activities'" @click="isMap = !isMap">
          <router-link v-show="isMap" :to="{ name: 'activities-list' }" class="right-btn"><img src="../assets/images/icon/list-f.svg" alt="切換列表icon"></router-link>
          <router-link v-show="!isMap" :to="{ name: 'activities-map' }" class="right-btn"><img src="../assets/images/icon/map-f.svg" alt="切換地圖icon"></router-link>
        </div>
        <div v-if="classType === 'hotels'" @click="isMap = !isMap">
          <router-link v-show="isMap" :to="{ name: 'hotels-list' }" class="right-btn"><img src="../assets/images/icon/list-f.svg" alt="切換列表icon"></router-link>
          <router-link v-show="!isMap" :to="{ name: 'hotels-map' }" class="right-btn"><img src="../assets/images/icon/map-f.svg" alt="切換地圖icon"></router-link>
        </div>
        <div v-if="classType === 'restaurants'" @click="isMap = !isMap">
          <router-link v-show="isMap" :to="{ name: 'restaurants-list' }" class="right-btn"><img src="../assets/images/icon/list-f.svg" alt="切換列表icon"></router-link>
          <router-link v-show="!isMap" :to="{ name: 'restaurants-map' }" class="right-btn"><img src="../assets/images/icon/map-f.svg" alt="切換地圖icon"></router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  // import SelectAreaBlock from './select_area_block.vue';

  export default {
    props: ['type'],
    data () {
      return {
        isMap: false,
        areaSelectBlockVisible: false
      }
    },
    methods: {
      showSelectBlock () {
        if (this.areaSelectBlockVisible) {
          this.hideSelectBlock();
        } else {
          this.areaSelectBlockVisible = true
          document.addEventListener('click', this.checkElementIsNotBlock, false);
        }
      },
      hideSelectBlock () {
        this.areaSelectBlockVisible = false;
        document.removeEventListener('click', this.checkElementIsNotBlock, false)
      },
      checkElementIsNotBlock (e) {
        if (!this.$refs.selectAreaBlockContainer.contains(e.target)) {
          this.hideSelectBlock();
        }
      }
    },
    computed: {
      classType() {
        const currentPath = this.$route.name;
        if (currentPath.indexOf("activities") >= 0) {
          return "activities"
        } else if (currentPath.indexOf("restaurants") >= 0) {
          return "restaurants"
        } else if (currentPath.indexOf("hotels") >= 0) {
          return "hotels"
        } else if (currentPath.indexOf("scenicspots") >= 0) {
          return "scenicspots"
        } else {
          return "others"
        }
      },
      classType_zh() {
        switch (this.classType) {
          case "activities":
            return "活動";
          case "restaurants":
            return "餐廳";
          case "hotels":
            return "飯店";
          case "scenicspots":
            return "景點";
          default:
            return "其他";
        }
      },
      bgImage() {
        switch (this.classType) {
          case "activities":
            return `url(${require('../assets/images/tour-benner.png')})`;
          case "restaurants":
            return `url(${require('../assets/images/food-benner.png')})`;
          case "hotels":
            return `url(${require('../assets/images/hotel-benner.png')})`;
          case "scenicspots":
            return `url(${require('../assets/images/tour-benner.png')})`;
          default:
            return `url(${require('../assets/images/tour-benner.png')})`;
        }
      }
    },
    components: {
      // SelectAreaBlock
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
    .benner-btn-container {
      display: none;
    }
    .benner-title {
      @include font-h1(bold);
      color: $grey-100;
    }
  }
  .benner-m-menu {
    @include flex-row-space-between-center;
    height: $benner-m-menu-height;
    padding: 0 10px;
    @include pad {
      padding: 0 24px;
    }
    .left-block, .right-block {
      @include flex-row-center-center;
      gap: .5rem;
      @include pad {
        gap: 1rem;
      }
    }
    .left-btn {
      @include btn-choose;
      @include btn-outline;
    }
    .right-btn {
      @include btn-icon;
      @include btn-filled;
    }
  }

  @include screen-up {
    .benner-container {
      @include flex-column-center-baseline;
      height: $class-benner-height;
      .benner-title {
        @include font-h4(bold);
      }
      .benner-btn-container {
        @include flex-row-space-between-center;
        width: 100%;
        margin-top: .5rem;
        .left-btn, .right-btn {
          @include flex-row-center-center;
          .choose-btn {
            @include btn-choose;
            @include btn-outline;
          }
          .filter-btn {
            @include btn-icon-text;
            @include btn-filled;
          }
          .filter-icon-btn {
            @include btn-icon;
            @include btn-filled;
          }
        }
        .left-btn > div:nth-child(2), .right-btn > div:nth-child(2) {
          margin-left: 1.25rem;
        }
      }
    }
    .benner-m-menu {
      display: none;
    }
  }
</style>