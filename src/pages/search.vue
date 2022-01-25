<template>
  <div>
    <header class="benner-container">
      <h1 class="benner-title">搜尋結果</h1>
    </header>
    <CardList v-if="!mapMode"/>
    <MapList v-else/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import CardList from "@/pages/card-list.vue";
import MapList from "@/pages/map-list.vue";


export default {
  name: 'search',
  computed: {
    ...mapGetters(['ptxData', 'keyword', 'dataLoaing']),
    ...mapGetters('otherModule', ['mapMode'])
  },
  components: {
    CardList,
    MapList
  },
  created() {
    // 用網址進入的也要一次資料
    const keyword = this.localKeyword = this.$route.query.keyword;
    this.$store.commit("UPDATE_KEYWORD", keyword);
    this.$store.dispatch("getAllTypeDataListWithKeyword", keyword);
  },
  updated() {
    if (this.mapMode) this.$store.dispatch("otherModule/setMarkerOnMap", 0);
  },
  beforeDestroy() {
    this.$store.commit("INIT_DATA_QUERY");
    console.log("初始化", this.ptxData.query)
  }
}
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/main.scss";

  .benner-container {
    @include flex-row-center-center;
    @include content-padding($section-padding-y);
    @include darken-benner;
    background: url("../assets/images/spare-benner-1.jpeg");
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