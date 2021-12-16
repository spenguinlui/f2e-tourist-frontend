<template>
  <div>
    <nav>
      <div class="nav">
        <div class="nav-mobile-menu" @click="expandingMenu">
          <img src="../assets/images/icon/menu.svg" alt="手機版選單">
        </div>
        <div class="nav-brand">
          <router-link class="nav-brand-item" :to="{ name: 'home' }"><img src="../assets/images/logo.svg" alt="首頁Logo"></router-link>
          <div class="nav-brand-search-bar">
            <input v-model="keyword" @keyup.enter="goSearch" type="text" placeholder="想要去哪？">
            <div @click="goSearch"><img src="../assets/images/icon/search.svg" alt="搜尋"></div>
          </div>
        </div>
        <div class="nav-mobile-search" @click="expandingSearch">
          <img src="../assets/images/icon/search-m.svg" alt="手機版搜尋">
        </div>
        <div class="nav-list">
          <router-link class="nav-list-item" :to="{ name: 'scenicspots' }">找景點<img src="../assets/images/icon/tour-o.svg" alt="景點icon"></router-link>
          <router-link class="nav-list-item" :to="{ name: 'hotels' }">找飯店<img src="../assets/images/icon/bed-o.svg" alt="飯店icon"></router-link>
          <router-link class="nav-list-item" :to="{ name: 'restaurants' }">找餐廳<img src="../assets/images/icon/food-o.svg" alt="住宿icon"></router-link>
          <router-link class="nav-list-item-f" :to="{ name: 'favorites' }">我的旅程</router-link>
        </div>
      </div>
    </nav>
    <div class="nav-mobile-search-block" :class="{ expanding: searchShow }">
      <div class="nav-mobile-search-bar">
        <input v-model="keyword" @keyup.enter="goSearch" type="text" placeholder="想要去哪？">
        <div @click="goSearch"><img src="../assets/images/icon/search.svg" alt="搜尋"></div>
      </div>
    </div>
    <div class="nav-mobile" :class="{ expanding: menuShow }">
      <div class="nav-mobile-list">
        <router-link class="nav-mobile-list-item" :to="{ name: 'scenicspots' }">找景點<img src="../assets/images/icon/tour-o.svg" alt="景點icon"></router-link>
        <router-link class="nav-mobile-list-item" :to="{ name: 'hotels' }">找飯店<img src="../assets/images/icon/bed-o.svg" alt="飯店icon"></router-link>
        <router-link class="nav-mobile-list-item" :to="{ name: 'restaurants' }">找餐廳<img src="../assets/images/icon/food-o.svg" alt="住宿icon"></router-link>
      </div>
      <div class="nav-mobile-list">
        <router-link class="nav-mobile-list-item-f" :to="{ name: 'favorites' }">我的旅程</router-link>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        menuShow: false,
        searchShow: false,
        keyword: ""
      }
    },
    methods:  {
      expandingMenu() {
        if (this.menuShow === false) {
          this.menuShow = true;
          this.searchShow = false;
        } else {
          this.menuShow = false;
        }
      },
      expandingSearch() {
        if (this.searchShow === false) {
          this.searchShow = true;
          this.menuShow = false;
        } else {
          this.searchShow = false;
        }
      },
      goSearch(event) {
        if (event.isComposing) { return }  // 還在輸入中文別要資料
        // keyword 加入到網址，方便分享
        this.$router.push(`/search?keyword=${this.keyword}`);
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/main.scss";

  nav {
    @include flex-column-center-center;
    @include content-padding(.5vh);
    @include posi(f);
    width: 100vw;
    min-height: $nav-height;
    background-color: $grey-200;
    z-index: $nav-bar-z;
    .nav {
      @include flex-row-space-between-center;
      width: 100%;
      &-menu-mobile, &-brand {
        @include flex-row-center-center;
        cursor: pointer;
      }
      &-brand {
        &-search-bar {
          display: none;
        }
      }
      &-list {
        display: none;
      }
    }
  }
  .nav-mobile-search-block {
    @include flex-row-center-center;
    @include posi(f);
    top: -10vh;
    width: 100%;
    height: 10vh;
    background-color: $grey-200;
    padding-bottom: .75rem;
    transition: all 0.3s ease-in-out;
    &.expanding {
      top: $nav-height;
    }
    .nav-mobile-search-bar {
      @include flex-row-space-between-center;
      @include font-caption;
      width: 80%;
      padding: .5rem 1rem;
      background-color: $grey-100;
      color: $grey-500;
      border-radius: $oval-bora;
      input {
        width: 100%;
        background-color: inherit;
      }
      img {
        @include font-h5(bold);
      }
    }
  }
  .nav-mobile {
    @include flex-row-center-center;
    @include posi(f);
    top: -20vh;
    width: 100%;
    height: 20vh;
    flex-wrap: wrap;
    background-color: $grey-200;
    padding: .5rem 0;
    transition: all 0.3s ease-in-out;
    &.expanding {
      top: $nav-height;
    }
    &-list {
      @include flex-row-center-center;
      width: 100%;
      padding: .5rem;
      &-item {
        margin-right: 1vw;
        @include btn-outline;
        @include btn-icon-text;
        img {
          margin-left: 0.2rem;
        }
      }
      &-item-f {
        @include btn-filled;
        @include btn-text;
      }
    }
  }

  @include screen-up {
    nav {
      @include flex-row-space-between-center;
      [class^="nav-mobile"] {
        display: none;
      }
      .nav {
        &-brand {
          &-item {
            margin-right: 1vw;
          }
          &-search-bar {
            @include flex-row-space-between-center;
            @include font-caption;
            width: 20vw;
            padding: .5rem 1rem;
            background-color: $grey-100;
            color: $grey-500;
            border-radius: $oval-bora;
            input {
              width: 100%;
              background-color: inherit;
            }
            img {
              @include font-h5(bold);
            }
          }
        }
        &-list {
          @include flex-row-center-center;
          &-item {
            @include btn-outline;
            @include btn-icon-text;
            margin-right: 1vw;
          }
          &-item-f {
            @include btn-filled;
            @include btn-text;
          }
        }
      }
    }
  }

</style>