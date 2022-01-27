<template>
  <div class="cards-slider-container">
    <button type="button" class="page-button left" @click="goLeft"><img src="../assets/images/icon/left.svg" alt="選單左移按鈕"></button>
    <section class="cards-slider">
        <div class="scroll-container" ref="scroll" :style="{ transform: `translateX(${offsetWidth}px)` }">
          <!-- 資料讀取中 -->
          <template v-if="dataLoaing">
            <div v-for="(data, index) in new Array(3)" :key="index" class="card-container">
              <MaskCard />
            </div>
          </template>
          <!-- 資料完成 -->
          <template v-else>
              <div v-for="data in DataList" :key="data.ID" class="card-container">
                <Card :data="data" :type="data.Type" :classType="'commonCard'"/>
              </div>
          </template>
        </div>
    </section>
    <button type="button" class="page-button right" @click="goRight"><img src="../assets/images/icon/right.svg" alt="選單右移按鈕"></button>
  </div>
</template>

<script>
import Card from "@/components/card.vue";
import MaskCard from '@/components/mask-card.vue';
import { mapGetters } from 'vuex';

export default {
  name: "cards-slider",
  props: ["mode", "theme"],
  data() {
    return {
      dataLoaing: true,
      timeout: {},
      themeTimeout: {},
      requestCount: 0,
      themeRequestCount: 0,
      offsetWidth: 0,
      scrollWidth: 0
    }
  },
  computed: {
    DataList() {
      if (this.mode === "hot") {
        return this.hotDataList;
      } else if (this.mode === "theme") {
        return this.themes[this.theme.themeId].themeDataList;
      } else {
        return [];
      }
    },
    ...mapGetters(['hots', 'hotDataList', "themes"])
  },
  methods: {
    getHotDataList() {
      this.$store.dispatch("getHotDataList",
        { callbackFn: this.dataLoaingFinish }
      );
    },
    getThemeDataList() {
      this.$store.dispatch("getThemeDataList",
        { theme: this.theme, count: 3, callbackFn: this.dataLoaingFinish }
      );
    },
    dataLoaingFinish() {
      this.dataLoaing = false;
    },
    getScrollWidth() {
      this.$nextTick(() => {
        this.scrollWidth = this.$refs.scroll.clientWidth;
        this.offsetWidth = 0;
      });
    },
    goLeft() {
      if (Math.abs(this.offsetWidth) > 0) {
        this.offsetWidth += this.scrollWidth;
      }
    },
    goRight() {
      const { scrollWidth, clientWidth } = this.$refs.scroll;
      if (Math.abs(this.offsetWidth) + 5 < (scrollWidth - clientWidth)) {
        this.offsetWidth -= this.scrollWidth;
      }
    }
  },
  created() {
    const vm = this;
    if (vm.mode === "hot") {
      vm.timeout = window.setInterval(() => {
        vm.requestCount ++;
        if (vm.hots.length > 0) {
          vm.getHotDataList();
        }
        if (vm.hotDataList.length > 0 || vm.requestCount >= 35) {
          window.clearInterval(vm.timeout);
        }
      }, 1000);
    }
    if (vm.mode === "theme") {
      vm.themeTimeout = window.setInterval(() => {
        vm.themeRequestCount ++;
        vm.getThemeDataList();
        if (this.themes[this.theme.themeId].themeDataList.length > 0 || vm.themeRequestCount >= 35) {
          window.clearInterval(vm.themeTimeout);
        }
      }, 1000);
    }
    this.getScrollWidth();
  },
  beforeDestroy() {
    const vm = this;
    window.clearInterval(vm.themeTimeout);
    window.clearInterval(vm.timeout);
  },
  components: {
    Card,
    MaskCard
  }
}
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/main.scss";

  .cards-slider-container {
    position: relative;
  }
  .cards-slider {
    @include scroll;
    .scroll-container {
      @include flex-row-flex-start-center;
      transition: $trsi;
      .card-container {
        @include card-flex;
      }
    }
  }
  .page-button {
    display: none;
  }

  @include screen-up {
    .cards-slider {
      overflow: hidden;
    }
    .page-button {
      @include card-shadow;
      display: block;
      position: absolute;
      z-index: 1;
      cursor: pointer;
      top: calc(50% - (2.75rem / 2));
      &.left {
        left: calc((2.75rem / 2) + 2.2rem * -1);
      }
      &.right {
        right: calc((2.75rem / 2) + 2.3rem * -1);
      }
      border-radius: $cycle-bora;
      background-color: $grey-100;
      width: 2.75rem;
      height: 2.75rem;
      padding: .8rem;
      > img {
        width: 100%;
        height: 100%;
      }
    }
  }
</style>