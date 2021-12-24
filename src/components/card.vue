<template>
  <div :class="`card ${classType || ''} ${type}`" @click="toDetail(item.ID)">
    <div class="card-img">
      <img v-if="!item.Picture || !item.Picture.PictureUrl1" src="../assets/images/empty-img.png" alt="no-image'">
      <img v-if="item.Picture && item.Picture.PictureUrl1" :src="item.Picture.PictureUrl1" :alt="item.Picture.PictureDescription1">
      <div :class="favorites.includes(item.ID) ? 'favorite-btn filled' : 'favorite-btn'" @click.prevent.stop="changeFavorite(item.ID, !favorites.includes(item.ID))">
        <img v-show="favorites.includes(item.ID)" src="../assets/images/icon/heart-filled.svg" alt="加入我的最愛icon">
        <img v-show="!favorites.includes(item.ID)" src="../assets/images/icon/heart-outline.svg" alt="加入我的最愛icon">
      </div>
    </div>
    <div class="card-content">
      <div class="card-content-title">{{ item.Name }}</div>
      <Stars />
      <div class="card-content-tags">
        <!-- <template v-for="(tag, index) in item.Tag">
          <div class="card-tag" :key="index">{{ tag }}</div>
        </template>
        <div v-if="!item.Tag" class="card-tag">尚未建立</div> -->
        <div class="card-tag" v-if="!item.Class1">無標記</div>
        <div class="card-tag" v-if="item.Class1">{{ item.Class1 }}</div>
        <div class="card-tag" v-if="item.Class2">{{ item.Class2 }}</div>
        <div class="card-tag" v-if="item.Class3">{{ item.Class3 }}</div>
      </div>
      <div v-if="classType === 'full-card'" class="card-content-text">
        {{ item.Description }}
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from "vuex";
  import Stars from "./stars.vue";

  export default {
    props: ['item', 'type', 'classType'],
    data () {
      return {
        // card 內的 dataType 是吃父元件傳進來的，因為一頁內可能會有多種類型
        heart: false
      }
    },
    computed: {
      ...mapGetters(['favorites'])
    },
    methods: {
      toDetail(id) {
        this.$router.push(`/${this.type}/${id}`);
      },
      changeFavorite(id, add) {
        !this.$store.getters.heartIsLoading && this.$store.dispatch("changeFavoriteToData", { dataId: id, add: add });
        this.$store.dispatch("getFavoriteDataList");
      }
    },
    components: {
      Stars
    }
  }
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/main.scss";

  .card {
    @include flex-column-center-baseline;
    padding: 1.25rem;
    box-shadow: 0px .25rem 1rem rgba(0, 0, 0, 0.2);
    border-radius: .5rem;
    &.scenicspots {
      border: 1px solid $primary-800;
    }
    &.activities {
      border: 1px solid #09097c;
    }
    &.restaurants {
      border: 1px solid $accent-800;
    }
    &.hotels {
      border: 1px solid $alert-600;
    }
    &.full-card {
      margin-bottom: 1rem;
    }
    .card-img {
      width: 100%;
      height: 25vh;
      position: relative;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
        border-radius: .5rem;
      }
      .favorite-btn {
        @include btn-icon;
        @include btn-outline;
        &.filled {
          @include btn-filled;
        }
        position: absolute;
        top: 5%;
        right: 5%;
        img {
          width: 1.125rem;
          height: 100%;
        }
      }
    }
    .card-content {
      padding: 5px;
      &-title {
        @include font-h4(bold);
        @include ellipsis-text(1);
        color: $grey-700;
        margin: .5rem 0;
      }
      &-tags {
        @include tags-row;
        flex-wrap: wrap;
        margin: .25rem 0;
        .card-tag {
          @include btn-tag-filled;
          margin-bottom: .5rem;
        }
      }
      &-stars {
        margin: .25rem 0;
      }
      &-text {
        @include ellipsis-text(3);
        @include font-content;
        color: $grey-600;
        margin: .25rem 0;
      }
    }
  }
</style>