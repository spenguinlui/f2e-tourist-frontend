<template>
  <div :class="`card ${classType || ''} ${type}`" @click="toDetail()">
    <div class="card-img">
      <img v-if="isPicturePresent" :src="data.Picture.PictureUrl1" :alt="data.Picture.PictureDescription1">
      <img v-else src="../assets/images/empty-img.png" alt="no-image'">
      <div :class="favorites.includes(data.ID) ? 'favorite-btn filled' : 'favorite-btn'" @click.prevent.stop="changeFavorite(data.ID, !favorites.includes(data.ID))">
        <img v-show="favorites.includes(data.ID)" src="../assets/images/icon/heart-filled.svg" alt="加入我的最愛icon">
        <img v-show="!favorites.includes(data.ID)" src="../assets/images/icon/heart-outline.svg" alt="加入我的最愛icon">
      </div>
    </div>
    <div class="card-content">
      <div class="card-content-title">{{ data.Name }}</div>
      <Stars />
      <div class="card-content-tags">
        <!-- <template v-for="(tag, index) in data.Tag">
          <div class="card-tag" :key="index">{{ tag }}</div>
        </template>
        <div v-if="!data.Tag" class="card-tag">尚未建立</div> -->
        <div class="card-tag" v-if="!data.Class && !data.Class1">無標記</div>
        <div class="card-tag" v-if="data.Class">{{ data.Class }}</div>
        <div class="card-tag" v-if="data.Class1">{{ data.Class1 }}</div>
        <div class="card-tag" v-if="data.Class2">{{ data.Class2 }}</div>
        <div class="card-tag" v-if="data.Class3">{{ data.Class3 }}</div>
      </div>
      <div v-if="classType === 'full-card'" class="card-content-text">
        {{ data.Description }}
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from "vuex";
  import Stars from "@/components/stars.vue";

  export default {
    props: ['data', 'type', 'classType'],
    data () {
      return {
        // card 內的 dataType 是吃父元件傳進來的，因為一頁內可能會有多種類型
        heart: false
      }
    },
    computed: {
      isPicturePresent() {
        if (this.data.Picture) {
          if (this.data.Picture.PictureUrl1) {
            return true;
          } else {
            return false;
          }
        } else {
          return false;
        }
      },
      ...mapGetters(['favorites']),
      ...mapGetters('otherModule', ['adding']),
      ...mapGetters('serverModule', ['userAuthToken']),
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
      changeFavorite(id, add) {
        !this.adding && this.$store.dispatch("serverModule/changeFavoriteToData", { dataId: id, add: add });
        // if (this.userAuthToken) {
        // } else {
        //   !this.adding && this.$store.dispatch("otherModule/changeFavoriteToData", { dataId: id, add: add });
        // }
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