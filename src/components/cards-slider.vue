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
      <div v-for="data in dataList" :key="data.ID" class="card-container">
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
      requestCount: 0
    }
  },
  computed: {
    dataList() {
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
    async getHotDataList() {
      await this.$store.dispatch("getHotDataList");
      this.dataLoaing = false;
    },
    async getThemeDataList() {
      await this.$store.dispatch("getThemeDataList", { theme: this.theme, count: 3 });
      this.dataLoaing = false;
    },
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
      vm.getThemeDataList();
    }
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