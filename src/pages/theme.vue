<template>
  <div class="container-fluid">
    <header class="benner-container">
      <h1 class="benner-title">{{ theme.themeName }}</h1>
    </header>
    <div class="content">
      <template v-if="theme.themeDataList.length > 0">
        <div v-for="item in theme.themeDataList" :key="item.ID" class="card-container">
          <Card :item="item" :type="item.Type" :classType="'commonCard'"/>
        </div>
      </template>
      <template v-else>
        <NoContent/>
      </template>
    </div>
  </div>
</template>

<script>
import Card from '@/components/card.vue';
import NoContent from '@/components/no-content.vue';
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      themeIndex: ""
    }
  },
  computed: {
    theme() {
      return this.themes[this.themeIndex];
    },
    ...mapGetters(['themes'])
  },
  methods: {
    getThemeDataList() {
      const index = this.themeIndex = this.$route.params.index;
      this.$store.dispatch("getThemeDataList", this.themes[index]);
    }
  },
  created() {
    this.getThemeDataList();
  },
  components: {
    Card,
    NoContent
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