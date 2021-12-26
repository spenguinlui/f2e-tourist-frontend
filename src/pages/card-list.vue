<template>
  <section class="content">
    <template v-if="dataList.length > 0">
      <div v-for="item in dataList" :key="item.ID" class="card-container">
        <Card :item="item" :type="dataType" :classType="'commonCard'"/>
      </div>
    </template>
    <template v-else>
      <NoContent/>
    </template>
  </section>
</template>

<script>
  import Card from '../components/card.vue';
  import NoContent from '../components/no-content.vue';
  import { mapGetters } from 'vuex';

  export default {
    name: 'card-list',
    data () {
      return {
      }
    },
    computed: {
      ...mapGetters(['dataList']),
      dataType() {
        return this.$route.name
      },
    },
    methods: {
    },
    components: {
      Card,
      NoContent
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