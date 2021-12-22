<template>
  <nav class="select-area-block">
    <div class="area-container">
      <section v-for="area in areaList" :key="area.area" class="area">
        <h3 class="v-area">{{ area.area }}</h3>

        <section v-for="city in area.citys" :key="city.cityName" class="area-block">
          <div class="area-title" @click="toggleList(city.cityName)">
            <h4 class="title-text">{{ city.cityName }}</h4>
            <div class="title-icon" :class="{ show: localCityName === city.cityName }"></div>
          </div>

          <ul class="area-list" v-show="localCityName === city.cityName">
            <li
              v-for="town in city.towns" :key="town.TownName"
              class="area-item"
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
import citys from "../json/citys.json";
import { mapGetters } from 'vuex';

export default {
  props: ['hideSelectBlock', 'dataType'],
  data () {
    return {
      areaList: citys,
      localCityName: "臺北市",
    }
  },
  methods: {
    toggleList(cityName) {
      this.localCityName = cityName;
    },
    filterCityData(townName) {
      this.$store.commit("TOGGLE_CITY", this.localCityName);
      this.$store.dispatch("filterDataListWithTown", { dataType: this.dataType, townName });
      this.hideSelectBlock();
    }
  },
  computed: {
    ...mapGetters(['currentCity', 'currentTown'])
  }
}
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/main.scss";

  .select-area-block {
    width: 100vw;
    position: fixed;
    left: 0;
    top: initial;
    bottom: 0;
    padding: 1.5rem;
    background-color: $grey-100;
    box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.2);
    border-radius: 0.5rem;
    z-index: 1;
    cursor: default;
    .area-container {
      height: 50vh;
      width: 100%;
      overflow: auto;
      .area {
        color: $grey-700;
        padding-top: 0.5rem;
        .v-area {
          @include font-caption(700);
        }
        .area-block {
          border-bottom: 1px solid $grey-300;
          padding: 0.5rem 0;
          .area-title {
            @include flex-row-flex-start-center;
            padding: 0.25rem 0 0.5rem 0;
            .title-text {
              @include font-content(700);
            }
            .title-icon {
              margin-left: 0.5rem;
              // 以下三角型設定
              width: 0;
              height: 0;
              border-style: solid;
              border-width: 6px 0 6px 10px;
              border-color: transparent transparent transparent $grey-600;
              transition: .2s ease-in-out;
            }
            .title-icon.show {
              transform: rotate(90deg); // 控制去增加這個
            }
          }
          .area-list {
            @include flex-row-flex-start-center;
            flex-wrap: wrap;
            gap: 0.75rem;
            .area-item {
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
    }
  }

  @include screen-up {
    .select-area-block {
      width: 23rem;
      position: absolute;
      top: 40px;
      bottom: initial;
    }
  }
</style>