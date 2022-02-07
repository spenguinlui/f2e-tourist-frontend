<template>
  <nav class="filter" ref="selectBlock" :style="{ bottom: ispc ? 'auto' : visible ? 0 : `-${blockHeight}px` }">
    <div class="filter-container">
      <section v-for="area in areaList" :key="area.area" class="filter-block">
        <h3 class="filter-subtitle">{{ area.area }}</h3>

        <section v-for="city in area.citys" :key="city.cityName" class="filter-area">
          <div class="filter-area-title" @click.prevent.stop="toggleList(city.cityName)">
            <h4 class="filter-area-title-text">{{ city.cityName }}</h4>
            <div class="filter-area-title-icon" :class="{ show: localCityName === city.cityName }"></div>
          </div>

          <ul class="filter-area-list" v-show="localCityName === city.cityName">
            <li
              v-for="town in city.towns" :key="town.TownName"
              class="filter-area-list-item"
              :class="{ active: currentCity === city.cityName && currentTown === town.TownName }"
              @click="filterCityData(town.TownName)"
              >{{ town.TownName }}
            </li>
          </ul>
        </section>
      </section>
    </div>
  </nav>
</template>

<script>
import citys from "@/json/citys.json";
import { mapGetters } from 'vuex';

export default {
  props: ['areaBlock', 'dataType', 'hideBlock', 'visible', 'ispc'],
  data () {
    return {
      areaList: citys,
      localCityName: "臺北市",
      blockHeight: 0
    }
  },
  methods: {
    // 切換選單範圍
    toggleList(cityName) {
      this.localCityName = cityName;
    },
    // 選定篩選類型
    filterCityData(townName) {
      this.$store.commit("TOGGLE_CITY", this.localCityName);
      this.$store.dispatch("filterDataListWithTown", { dataType: this.dataType, townName });
      this.hideBlock(this.areaBlock);
    }
  },
  created() {
    // 取得區塊高度
    this.$nextTick(() => {
      this.blockHeight = this.$refs.selectBlock.offsetHeight;
    })
  },
  computed: {
    ...mapGetters(['currentCity', 'currentTown'])
  }
}
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/main.scss";

  .filter {
    width: 100vw;
    position: fixed;
    left: 0;
    top: initial;
    padding: 1.5rem;
    background-color: $grey-100;
    box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.2);
    border-radius: 0.5rem 0.5rem 0 0;
    z-index: 1;
    cursor: default;
    transition: $trsi;
    &-container {
      @include scroll;
      height: 50vh;
      width: 100%;
    }
    &-block {
      color: $grey-700;
      padding-top: 0.5rem;
    }
    &-subtitle {
      @include font-caption(700);
    }
    &-area {
      border-bottom: 1px solid $grey-300;
      padding: 0.5rem 0;
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
        @include flex-row-flex-start-center;
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