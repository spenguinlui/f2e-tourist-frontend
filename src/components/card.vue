<template>
  <div :class="`card ${classType || ''} ${type}`" @click="toDetail()">
    <div class="card-img">
      <img :src="pictureUrl" :alt="pictureAlt">
      <div
        :class="favorites.includes(data.ID) ? 'favorite-btn filled' : 'favorite-btn'"
        @click.prevent.stop="changeFavorite(data.ID, !favorites.includes(data.ID))">
        <img :src="favoriteImg" alt="加入我的最愛icon">
      </div>
    </div>
    <div class="card-content">
      <div class="card-content-title">{{ data.Name }}</div>
      <Stars :score="data.CommentScore || 3.5"/>
      <ul class="card-content-tags">
        <li class="card-tag" v-if="noTags">無標記</li>
        <li class="card-tag" v-if="data.Class">{{ data.Class }}</li>
        <li class="card-tag" v-if="data.Class1">{{ data.Class1 }}</li>
        <li class="card-tag" v-if="data.Class2">{{ data.Class2 }}</li>
        <li class="card-tag" v-if="data.Class3">{{ data.Class3 }}</li>
      </ul>
      <div v-if="classType === 'full-card'" class="card-content-text">
        {{ data.Description }}
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from "vuex";
  import Stars from "@/components/stars.vue";
  import EmptyImg from "@/assets/images/empty-img.png";
  import OutlineHeart from "@/assets/images/icon/heart-outline.svg";
  import FilledHeart from "@/assets/images/icon/heart-filled.svg";

  export default {
    props: ['data', 'type', 'classType'],
    data () {
      return {
        // card 內的 dataType 是吃父元件傳進來的，因為一頁內可能會有多種類型
        heart: false
      }
    },
    computed: {
      pictureUrl() {
        return this.data.Picture && this.data.Picture.PictureUrl1 ? this.data.Picture.PictureUrl1 : EmptyImg;
      },
      pictureAlt() {
        return this.data.Picture && this.data.Picture.PictureDescription1 ? this.data.Picture.PictureDescription1 : 'no-image';
      },
      favoriteImg() {
        console.log(this.favorites)
        return this.favorites.includes(this.data.ID) ? FilledHeart : OutlineHeart;
      },
      noTags() {
        return !this.data.Class && !this.data.Class1 && !this.data.Class2 && !this.data.Class3;
      },
      ...mapGetters(['favorites', 'favoriteAdding']),
      ...mapGetters('serverModule', ['userIsLogin']),
    },
    methods: {
      routeName(dataType) {
        switch (dataType) {
          case "ScenicSpot": return "scenicspots";
          case "Restaurant": return "restaurants";
          case "Hotel":      return "hotels";
          case "Activity":   return "activities";
          default:           return "";
        }
      },
      toDetail() {
        const routeName = this.routeName(this.data.Type);
        this.$router.push(`/${routeName}/${this.data.ID}`);
      },
      async changeFavorite(id, add) {
        if (this.favoriteAdding) { return; }
        const favoriteParams = { dataId: id, add, vm: this };

        // 有登入就讀取 DB，沒有就讀取瀏覽器
        if (this.userIsLogin)
          await this.$store.dispatch("serverModule/changeFavoriteToData", favoriteParams);
        else
          await this.$store.dispatch("otherModule/changeFavoriteToData", favoriteParams);
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
    @include card-shadow;
    padding: 1.25rem;
    &.scenicspots, &.ScenicSpot {
      border: 1px solid $primary-800;
    }
    &.activities, &.Activity {
      border: 1px solid #09097c;
    }
    &.restaurants, &.Restaurant {
      border: 1px solid $accent-800;
    }
    &.hotels, &.Hotel {
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
        border-radius: $normal-bora;
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
        height: 3.5rem;  // todo 太多的 tag 會有問題，應該還有解
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