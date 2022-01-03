<template>
  <div class="container-fluid">
    <header class="benner-container">
      <h1 class="benner-title" v-if="!dataLoaing">{{ theme.themeName }}</h1>
    </header>
    <div class="content">
      <!-- 資料讀取中 -->
      <template v-if="dataLoaing">
        <div v-for="(item, index) in new Array(9)" :key="index" class="card-container">
          <MaskCard />
        </div>
      </template>

      <!-- 資料完成 -->
      <template v-else>
        <!-- 有資料 -->
        <template v-if="theme.themeDataList.length > 0">
          <div v-for="data in theme.themeDataList" :key="data.ID" class="card-container">
            <Card :data="data" :type="data.Type" :classType="'commonCard'"/>
          </div>
        </template>
        <!-- 沒資料 -->
        <template v-else>
          <NoContent/>
        </template>
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
  data() {
    return {
      themeIndex: "",
      timeout: {},
      requestCount: 0
    }
  },
  computed: {
    theme() {
      return this.themes[this.themeIndex];
    },
    ...mapGetters(['themes', 'dataLoaing'])
  },
  methods: {
    getThemeDataList() {
      this.$store.dispatch("getThemeDataList", { theme: this.themes[this.themeIndex], count: 9 });
    }
  },
  created() {
    const vm = this;
    vm.themeIndex = vm.$route.params.index;
    vm.timeout = window.setInterval(() => {
      vm.requestCount ++;
      if (this.themeIndex) {
        vm.getThemeDataList();
      }
      if (vm.theme || vm.requestCount >= 35) {
        window.clearInterval(vm.timeout);
      }
    }, 1000);
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
    background-image: url("../assets/images/theme-benner.png");
    height: $class-benner-m-height;
    .benner-title {
      @include font-h4(bold);
      color: $grey-100;
    }
  }

  .content {
    @include flex-row-flex-start-center;
    @include content-padding(0, true);
    @include mobile {
      @include flex-row-center-center;
    }
    flex-wrap: wrap;
    .card-container {
      @include card-flex;
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