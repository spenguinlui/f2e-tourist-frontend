<template>
  <header>
    <div class="class-benner" :style="{ backgroundImage: bgImage }">
      <h1 class="class-benner-title">{{ classType_zh }}列表</h1>
      <div class="class-benner-btns">
        <div class="left-btn">
          <div class="relative">
            <button class="choose-btn"
              @click.prevent.stop="showBlock(areaBlock)">選擇地區</button>
            <SelectAreaBlock 
              v-show="areaBlock.visible"
              :ispc="true"
              ref="areaBlockContainer"
              :dataType="classType"
              :areaBlock="areaBlock"
              :hideBlock="hideBlock"/>
          </div>
          <button class="choose-btn" @click="showDateBlock">選擇日期</button>
        </div>
        <div class="right-btn">
          <button type="button" class="filter-btn"
            @click.prevent.stop="showBlock(filterBlock)">
            篩選
            <img src="../assets/images/icon/filter-f.svg" alt="切換列表icon">
          </button>
          <FilterBlock
            v-show="filterBlock.visible"
            :ispc="true"
            ref="filterBlockContainer"
            :dataType="classType"
            :filterBlock="filterBlock"
            :hideBlock="hideBlock"/>
          <button type="button" class="filter-icon-btn" @click="toggleMapMode">
            <img :src="modeIcon" :alt="mapMode ? '切換地圖icon' : '切換列表icon'">
          </button>
        </div>
      </div>
    </div>
    <!-- mobile -->
    <div class="class-benner-m">
      <div class="class-benner-m-left-block">
        <button class="left-btn" @click.prevent.stop="showBlock(areaMBlock)">選擇地區</button>
        <button class="left-btn">選擇日期</button>
        <SelectAreaBlock
          :visible="areaMBlock.visible"
          ref="areaMBlockContainer"
          :dataType="classType"
          :areaBlock="areaMBlock"
          :hideBlock="hideBlock"/>
      </div>

      <div class="class-benner-m-right-block">
        <button class="right-btn"
          @click.prevent.stop="showBlock(filterMBlock)">
          <img src="../assets/images/icon/filter-f.svg" alt="切換列表icon">
        </button>
        <FilterBlock
          :visible="filterMBlock.visible"
          ref="filterMBlockContainer"
          :dataType="classType"
          :filterBlock="filterMBlock"
          :hideBlock="hideBlock"/>
        <button class="right-btn" @click="toggleMapMode">
          <img :src="modeIcon" :alt="mapMode ? '切換地圖icon' : '切換列表icon'">
        </button>
      </div>
    </div>
  </header>
</template>

<script>
import { mapGetters } from 'vuex';
import SelectAreaBlock from '@/components/select-area-block.vue';
import FilterBlock from '@/components/filter-block.vue';
import ListIcon from "@/assets/images/icon/list-f.svg";
import MapIcon from "@/assets/images/icon/map-f.svg";

export default {
  props: ['type'],
  data () {
    return {
      areaBlock: {
        visible: false,
        checkFn: (e) => { !this.$refs.areaBlockContainer.$el.contains(e.target) && this.hideBlock(this.areaBlock) }
      },
      filterBlock: {
        visible: false,
        checkFn: (e) => { !this.$refs.filterBlockContainer.$el.contains(e.target) && this.hideBlock(this.filterBlock) }
      },
      areaMBlock: {
        visible: false,
        checkFn: (e) => { !this.$refs.areaMBlockContainer.$el.contains(e.target) && this.hideBlock(this.areaMBlock) }
      },
      filterMBlock: {
        visible: false,
        checkFn: (e) => { !this.$refs.filterMBlockContainer.$el.contains(e.target) && this.hideBlock(this.filterMBlock) }
      }
    }
  },
  computed: {
    modeIcon() {
      return this.mapMode ? MapIcon : ListIcon;
    },
    classType() {
      const currentPath = this.$route.name;
      if (currentPath.indexOf("activities") >= 0) {
        return "activities";
      } else if (currentPath.indexOf("restaurants") >= 0) {
        return "restaurants";
      } else if (currentPath.indexOf("hotels") >= 0) {
        return "hotels";
      } else if (currentPath.indexOf("scenicspots") >= 0) {
        return "scenicspots";
      } else {
        return "others";
      }
    },
    classType_zh() {
      switch (this.classType) {
        case "activities":  return "活動";
        case "restaurants": return "餐廳";
        case "hotels":      return "飯店";
        case "scenicspots": return "景點";
        default:            return "其他";
      }
    },
    bgImage() {
      switch (this.classType) {
        case "activities":  return `url(${require('../assets/images/tour-benner.png')})`;
        case "restaurants": return `url(${require('../assets/images/food-benner.png')})`;
        case "hotels":      return `url(${require('../assets/images/hotel-benner.png')})`;
        case "scenicspots": return `url(${require('../assets/images/tour-benner.png')})`;
        default:            return `url(${require('../assets/images/tour-benner.png')})`;
      }
    },
    ...mapGetters('otherModule', ['mapMode'])
  },
  methods: {
    // 展開篩選區塊
    showBlock(blockObject) {
      if (blockObject.visible) {
        this.hideBlock(this.areaBlock);
        this.hideBlock(this.filterBlock);
        this.hideBlock(this.areaMBlock);
        this.hideBlock(this.filterMBlock);
      } else {
        this.areaBlock.visible = this.filterBlock.visible = this.areaMBlock.visible = this.filterMBlock.visible = false;
        blockObject.visible = true;
        document.addEventListener('click', blockObject.checkFn, false);
      }
    },
    // 收合篩選區塊
    hideBlock(blockObject) {
      blockObject.visible = false;
      document.removeEventListener('click', blockObject.checkFn, false);
    },
    // 日期選單
    showDateBlock () {
      this.window.alert('功能尚未開放');
    },
    // 切換地圖/列表模式
    toggleMapMode() {
      this.$store.commit("otherModule/TOGGLE_MAP_MODE", !this.mapMode);
    }
  },
  components: {
    SelectAreaBlock,
    FilterBlock
  }
}
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/main.scss";

  .class-benner {
    @include flex-row-center-center;
    @include content-padding($section-padding-y);
    @include darken-benner;
    height: $class-benner-m-height;
    &-btns {
      display: none;
    }
    &-title {
      @include font-h4(bold);
      color: $grey-100;
    }
  }
  .class-benner-m {
    @include flex-row-space-between-center;
    height: $class-benner-m-height;
    padding: 0 10px;
    @include pad {
      padding: 0 24px;
    }
    &-left-block, &-right-block {
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
    .class-benner {
      @include flex-column-center-baseline;
      height: $class-benner-height;
      &-title {
        @include font-h1(bold);
      }
      &-btns {
        @include flex-row-space-between-center;
        width: 100%;
        margin-top: .5rem;
        .left-btn, .right-btn {
          @include flex-row-center-center;
          position: relative;
          gap: 1.5rem;
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
      }
    }
    .class-benner-m {
      display: none;
    }
  }
</style>