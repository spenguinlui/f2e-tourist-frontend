<template>
  <div :class="className">
    <input class="keyword" v-model="localKeyword" @keyup.enter="goSearch" type="text" placeholder="想要去哪？">
    <div @click="goSearch"><img src="../assets/images/icon/search.svg" alt="搜尋"></div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  props: ["className"],
  computed: {
    localKeyword: {
      get() {
        return this.keyword;
      },
      set(word) {
        this.$store.commit("UPDATE_KEYWORD", word);
      }
    },
    ...mapGetters(['keyword'])
  },
  methods: {
    // 搜尋資料
    goSearch(event) {
      if (event.isComposing || !this.keyword) { return }  // 還在輸入中文別要資料
      // keyword 加入到網址，方便分享
      this.$store.dispatch("getAllTypeDataListWithKeyword", this.keyword);
      this.$router.push(`/search?keyword=${this.keyword}`);
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/main.scss";

  .home-search-bar {
    @include flex-row-space-between-center;
    @include font-button(500);
    margin-top: 1rem;
    background-color: $grey-100;
    color: $grey-500;
    border-radius: $oval-bora;
    width: 80vw;
    padding: 1em 3em;
    > input {
      @include font-inherit;
    }
    img {
      width: $font-size-button;
    }
  }

  .nav-search-bar {
    display: none;
  }

  .nav-mobile-search-bar {
    @include flex-row-space-between-center;
    @include font-caption;
    width: 80%;
    padding: .5rem 1rem;
    background-color: $grey-100;
    color: $grey-500;
    border-radius: $oval-bora;
    .keyword {
      width: 100%;
      background-color: inherit;
    }
    img {
      @include font-h5(bold);
    }
  }

  @include screen-up {
    .home-search-bar {
      @include font-h5(500);
      width: 50vw;
      img {
        width: $font-size-h5;
      }
    }

    .nav-search-bar {
      @include flex-row-space-between-center;
      @include font-caption;
      width: 20vw;
      padding: .5rem 1rem;
      background-color: $grey-100;
      color: $grey-500;
      border-radius: $oval-bora;
      .keyword {
        width: 100%;
        background-color: inherit;
      }
      img {
        @include font-h5(bold);
      }
    }
  }

</style>