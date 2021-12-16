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
    @include flex-row-center-center;
    @include content-padding(0, true);
    flex-wrap: wrap;
    .card-container {
      @include flex-col(12);
      padding: 1rem;
      @media screen and (min-width: 560px) and (max-width: 920px) {
        @include flex-col(6);
      }
      @media screen and (min-width: 921px) {
        @include flex-col(4);
      }
      @include full-screen {
        @include flex-col(3);
      }
    }
  }
  
</style>