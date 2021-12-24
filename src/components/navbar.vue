<template>
  <nav>
    <div class="nav">
      <!-- mobile -->
      <button class="nav-mobile-menu" @click="expandingMenu">
        <img src="../assets/images/icon/menu.svg" alt="手機版選單">
      </button>
      <!-- pc -->
      <button class="nav-brand">
        <router-link class="nav-brand-item" :to="{ name: 'home' }"><img src="../assets/images/logo.svg" alt="首頁Logo"></router-link>
        <SearchBar :className="'nav-search-bar'" />
      </button>
      <!-- mobile -->
      <button class="nav-mobile-search" @click="expandingSearch">
        <img src="../assets/images/icon/search-m.svg" alt="手機版搜尋">
      </button>
      <!-- pc -->
      <ul class="nav-list">
        <li><router-link class="nav-list-item" :class="{ active: $route.params.name === 'scenicspots' }" :to="{ name: 'scenicspots' }">找景點<img src="../assets/images/icon/tour-o.svg" alt="景點icon"></router-link></li>
        <li><router-link class="nav-list-item" :class="{ active: $route.params.name === 'hotels' }" :to="{ name: 'hotels' }">找飯店<img src="../assets/images/icon/bed-o.svg" alt="飯店icon"></router-link></li>
        <li><router-link class="nav-list-item" :class="{ active: $route.params.name === 'restaurants' }" :to="{ name: 'restaurants' }">找餐廳<img src="../assets/images/icon/food-o.svg" alt="住宿icon"></router-link></li>
        <li><router-link class="nav-list-item-f" :to="{ name: 'favorites' }">我的旅程</router-link></li>
      </ul>
    </div>
    <!-- mobile -->
    <div class="nav-mobile-search-block" :class="{ expanding: searchShow }">
      <SearchBar :className="'nav-mobile-search-bar'" />
    </div>
    <!-- mobile -->
    <div class="nav-mobile" :class="{ expanding: menuShow }">
      <ul class="nav-mobile-list">
        <li><router-link class="nav-mobile-list-item" :class="{ active: $route.params.name === 'scenicspots' }" :to="{ name: 'scenicspots' }">找景點<img src="../assets/images/icon/tour-o.svg" alt="景點icon"></router-link></li>
        <li><router-link class="nav-mobile-list-item" :class="{ active: $route.params.name === 'hotels' }" :to="{ name: 'hotels' }">找飯店<img src="../assets/images/icon/bed-o.svg" alt="飯店icon"></router-link></li>
        <li><router-link class="nav-mobile-list-item" :class="{ active: $route.params.name === 'restaurants' }" :to="{ name: 'restaurants' }">找餐廳<img src="../assets/images/icon/food-o.svg" alt="住宿icon"></router-link></li>
      </ul>
      <ul class="nav-mobile-list">
        <li><router-link class="nav-mobile-list-item-f" :to="{ name: 'favorites' }">我的旅程</router-link></li>
      </ul>
    </div>
  </nav>
</template>

<script>
import SearchBar from "./search-bar.vue";

export default {
  data () {
    return {
      menuShow: false,
      searchShow: false
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
    }
  },
  components: {
    SearchBar
  }
}
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/main.scss";

  .nav {
    @include flex-row-space-between-center;
    @include content-padding;
    @include posi(f);
    width: 100vw;
    min-height: $nav-height;
    background-color: $grey-200;
    z-index: $nav-bar-z;
    &-menu-mobile, &-brand {
      @include flex-row-center-center;
      cursor: pointer;
    }
    &-brand-search-bar, &-list {
      display: none;
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
    z-index: calc(#{$nav-bar-z} - 1);
    &.expanding {
      top: $nav-height;
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
    z-index: calc(#{$nav-bar-z} - 1);
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
    [class^="nav-mobile"] {
      display: none;
    }
    .nav {
      &-brand {
        &-item {
          margin-right: 1vw;
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

</style>