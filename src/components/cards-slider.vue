<template>
  <section class="cards-slider">
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
  </section>
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
      themeRequestCount: 0
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

  .cards-slider {
    @include flex-row-flex-start-center;
    @include scroll;
    .card-container {
      @include card-flex;
    }
  }
</style>