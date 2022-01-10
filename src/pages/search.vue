<template>
  <div>
    <header class="benner-container">
      <h1 class="benner-title">搜尋結果</h1>
    </header>
    <section class="content">
      <!-- 資料讀取中 -->
      <template v-if="dataLoaing">
        <div v-for="(data, index) in new Array(9)" :key="index" class="card-container">
          <MaskCard />
        </div>
      </template>
      <!-- 資料完成 -->
      <template v-else>
        <!-- 查詢有資料 -->
        <template v-if="allTypeDataList.length > 0">
          <div v-for="data in allTypeDataList" :key="data.ID" class="card-container">
            <Card :data="data" :type="data.Type"/>
          </div>
        </template>
        <!-- 查詢無資料 -->
        <template v-else>
          <NoContent />
        </template>
      </template>
    </section>
  </div>
</template>

<script>
import Card from '@/components/card.vue';
import MaskCard from '@/components/mask-card.vue';
import NoContent from '@/components/no-content.vue';
import { mapGetters } from 'vuex';

export default {
  name: 'search',
  computed: {
    ...mapGetters(['allTypeDataList', 'keyword', 'dataLoaing']),
  },
  components: {
    Card,
    MaskCard,
    NoContent
  },
  created() {
    // 用網址進入的也要一次資料
    const keyword = this.localKeyword = this.$route.query.keyword;
    this.$store.commit("UPDATE_KEYWORD", keyword);
    this.$store.dispatch("getAllTypeDataListWithKeyword", keyword);
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