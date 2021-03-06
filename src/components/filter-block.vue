<template>
  <nav class="filter" ref="selectBlock" :style="{ bottom: ispc ? 'auto' : visible ? 0 : `-${blockHeight}px` }">
    <div class="filter-container">
      <section class="filter-block">
        <div class="filter-title" @click.prevent.stop="toggleList()">
          <h4 class="filter-title-text">{{ dataObject.title }}</h4>
          <div class="filter-title-icon" :class="{ show: typeListShow }"></div>
        </div>
        <ul class="filter-list" v-show="typeListShow">
          <li
            v-for="type in dataObject.typeList" :key="type"
            class="filter-list-item"
            :class="{ active: currentClassType === type }"
            @click="filterByType(type)"
            >{{ type }}
          </li>
        </ul>
      </section>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  props: ['filterBlock', 'dataType', 'hideBlock', 'visible', 'ispc'],
  data () {
    return {
      typeListShow: true,
      blockHeight: 0,
      scenicspots: {
        title: "景點類型",
        typeList: ["文化類", "生態類", "遊憩類", "藝術類", "自然風景類", "國家風景區類", "觀光工廠類", "廟宇類", "體育健身類", "休閒農業類", "古蹟類", "溫泉類", "小吃/特產類"],
      },
      restaurants: {
        title: "餐點類型",
        typeList: ["地方特產", "異國料理", "中式美食", "夜市小吃", "甜點冰品", "伴手禮", "素食", "火烤料理"],
      },
      hotels: {
        title: "住宿類型",
        typeList: ["民宿", "一般旅館", "一般觀光旅館", "國際觀光旅館"]
      }
    }
  },
  computed: {
    dataObject() {
      if (this.dataType === "scenicspots") {
        return this.scenicspots;
      } else if (this.dataType === "restaurants") {
        return this.restaurants;
      } else if (this.dataType === "hotels") {
        return this.hotels;
      } else {
        return {}
      }
    },
    ...mapGetters(['currentClassType'])
  },
  methods: {
    // 切換選單範圍
    toggleList() {
      this.typeListShow = !this.typeListShow;
    },
    // 選定篩選類型
    filterByType(classType) {
      this.$store.dispatch("filterDataListByClass", { dataType: this.dataType, classType });
      this.hideBlock(this.filterBlock);
    }
  },
  created() {
    // 取得區塊高度
    this.$nextTick(() => {
      this.blockHeight = this.$refs.selectBlock.offsetHeight;
    })
  },
}
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/main.scss";

  .filter {
    width: 100vw;
    position: fixed;
    right: 0;
    top: initial;
    bottom: 0;
    padding: 1.5rem;
    background-color: $grey-100;
    box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.2);
    border-radius: $normal-bora $normal-bora 0 0;
    z-index: 1;
    cursor: default;
    transition: $trsi;
    &-container {
      @include scroll;
      width: 100%;
    }
    &-block {
      padding: 0.5rem 0;
    }
    &-title {
      @include flex-row-flex-start-center;
      padding: 0.25rem 0 0.5rem 0;
      &-text {
        @include font-content(700);
      }
      &-icon {
        @include triangle;
        margin-left: 0.5rem;
      }
    }
    &-list {
      @include flex-row-flex-start-space-between;
      flex-wrap: wrap;
      gap: 0.75rem;
      &-item {
        @include font-button(500);
        line-height: 20px;
        &:hover {
          color: $grey-400;
        }
        &.active {
          color: $primary-600;
        }
      }
    }
  }

  @include screen-up {
    .filter {
      width: 23rem;
      position: absolute;
      top: 40px;
      bottom: initial;
      border-radius: $normal-bora;
    }
  }
</style>