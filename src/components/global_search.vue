<template>
  <div class="search-bar">
    <input v-model="keyword" @keyup.enter="goSearch" :class="size === 'g' ? (size === 'xl' ? 'text-grey-500' : 'h5') : ''" type="text" placeholder="想要去哪？">
    <div @click="goSearch">
      <img v-if="size !== 'xl'" src="../assets/images/icon/search.svg" alt="搜尋">
      <img v-if="size === 'xl'" class="mp-display" src="../assets/images/icon/search.svg" alt="搜尋">
      <img v-if="size === 'xl'" class="mp-not-display" src="../assets/images/icon/search-xl.svg" alt="搜尋">
    </div>
  </div>
</template>

<script>
  export default {
    props: ['size'],
    data () {
      return {
        keyword: ""
      }
    },
    computed: {
      
    },
    methods: {
      goSearch(event) {
        if (event.isComposing) { return }  // 還在輸入中文別要資料
        const keyword = this.keyword;
        this.$store.dispatch("filterDataListWithKeyword", keyword);
        this.$router.push(`/search?keyword=${keyword}`);
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/main.scss";

  .search-bar {
    @include flex-row-space-between-center;
    @include font-caption;
    background-color: $grey-100;
    color: $grey-500;
    border-radius: $oval-bora;
    input {
      width: 100%;
      background-color: inherit;
    }
    img {
      @include font-h5;
    }
  }
  .search-bar-xl {
    @include font-button;
    width: 271px;
    height: 50px;
    padding: 18px 40px;
    @include screen-up {
      width: 562px;
      height: 74px;
      padding: 18px 40px;
      input, img {
        @include font-h5;
      }
    }
    .mp-not-display {
      // @include mp-not-display;
    }
    .mp-display {
      @include screen-up {
        display: none;
      }
    }
  }
  .search-bar-s {
    width: 271px;
    height: 31px;
    padding: 18px 16px;
  }

</style>