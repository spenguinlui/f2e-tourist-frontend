<template>
  <section class="content" @scroll="contentScroll">
    <template v-if="dataLoaing">
      <div v-for="(data, index) in new Array(9)" :key="index" class="card-container">
        <MaskCard />
      </div>
    </template>
    <template v-else>
      <template v-if="ptxData.dataList.length > 0">
        <div v-for="data in ptxData.dataList" :key="data.ID" class="card-container">
          <Card :data="data" :type="data.Type" :classType="'commonCard'"/>
        </div>
      </template>
      <template v-else>
        <NoContent/>
      </template>
    </template>
  </section>
</template>

<script>
  import Card from '@/components/card.vue';
  import MaskCard from '@/components/mask-card.vue';
  import NoContent from '@/components/no-content.vue';
  import { mapGetters } from 'vuex';

  export default {
    name: 'card-list',
    computed: {
      ...mapGetters(['ptxData', 'dataLoaing', 'moreDataLoading']),
      dataType() {
        return this.$route.name
      },
    },
    methods: {
      contentScroll(e) {
        const { scrollHeight, scrollTop } = e.target;
        if (scrollHeight - scrollTop < (scrollHeight * 0.15) && !this.moreDataLoading) {
          this.$store.dispatch("getMoreDataList", this.dataType);
        }
      }
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

  .content {
    @include flex-row-flex-start-center;
    @include content-padding(0, true);
    @include scroll;
    @include mobile {
      @include flex-row-center-center;
    }
    flex-wrap: wrap;
    height: calc(100vh - #{$nav-height} - #{$class-benner-m-height} - #{$benner-m-menu-height} - #{$footer-m-height});
    .card-container {
      @include card-flex;
    }
  }
  
  @include screen-up {
    .content {
      height: calc(100vh - #{$nav-height} - #{$class-benner-height} - #{$footer-height});
    }
  }
  
</style>