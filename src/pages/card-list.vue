<template>
  <div class="content">
    <div v-for="item in dataList" :key="item.ID" class="card-container">
      <Card :item="item" :type="dataType" :classType="'commonCard'"/>
    </div>
  </div>
</template>

<script>
  import Card from '../components/card.vue';
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
      Card
    }
  }
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/main.scss";

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
  
</style>