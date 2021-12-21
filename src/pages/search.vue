<template>
  <div class="container-fluid">
    <header class="benner-container">
      <h1 class="benner-title">搜尋 - {{ keyword }}</h1>
    </header>
    <section class="content">
      <template v-if="allTypeDataList.length > 0">
        <div v-for="item in allTypeDataList" :key="item.ID" class="card-container">
          <Card :item="item" :type="item.Type"/>
        </div>
      </template>
      <template v-else>
        <h2>無符合資料 !</h2>
      </template>
    </section>
  </div>
</template>

<script>
import Card from '../components/card.vue';
import { mapGetters } from 'vuex';

export default {
  name: 'search',
  data() {
    return {
      keyword: ""
    }
  },
  computed: {
    ...mapGetters(['allTypeDataList']),
  },
  components: {
    Card
  },
  created() {
    const keyword = this.keyword = this.$route.query.keyword;
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
    @include flex-row-center-center;
    @include content-padding(0, true);
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