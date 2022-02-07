<template>
  <div class="img-player-container">
    <div class="show-image" :style="showImageUrl" :alt="showPicture ? '景點大圖' : '找不到圖片'"></div>
    <ul class="imgs-row">
      <template v-if="!data.Picture">
        <li v-for="item in imageList" :key="item" class="img-empty">
          <img src="../assets/images/icon/empty-img-sm.svg" alt="找不到圖片">
        </li>
      </template>
      <template v-else>
        <li v-for="(item, index) in imageList" :key="item"
          @click="checkImage(data.Picture[`PictureUrl${index + 1}`])"
          :class="{'img-small': data.Picture[`PictureUrl${index + 1}`], 'img-empty': !data[`PictureUrl${index + 1}`] }"
          >
          <img 
            :src="data.Picture[`PictureUrl${ index + 1 }`] || require('../assets/images/icon/empty-img-sm.svg')"
            :alt="data.Picture[`PictureDescription${ index + 1 }`] || '找不到圖片'">
        </li>
      </template>
    </ul>
  </div>
</template>

<script>
import noImage from "@/assets/images/empty-img.png";

export default {
  props: ['data'],
  data() {
    return {
      imageList: new Array(3),
      showPicture: ""
    }
  },
  computed: {
    showImageUrl() {
      if (this.showPicture) {
        return { "backgroundImage" : `url(${this.showPicture})`};
      } else {
        return { "backgroundImage": noImage };
      }
    },
  },
  methods: {
    // 取得展示用大圖(用第一張圖)
    getShowPicture() {
      if (this.showPicture) { return; }
      if (this.data.Picture && this.data.Picture.PictureUrl1) {
        this.showPicture = this.data.Picture.PictureUrl1;
      }
    },
    // 移除展示用大圖
    removeShowPicture() {
      this.$store.commit("otherModule/REMOVE_SHOW_PICTURE");
    },
    // 切換展示用大圖
    checkImage(PictureUrl) {
      if (PictureUrl) this.showPicture = PictureUrl;
    }
  },
  created() {
    this.getShowPicture();
  },
  updated() {
    this.getShowPicture();
  },
  beforeDestroy() {
    this.removeShowPicture();
  }
}
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/main.scss";

  $show-image-h: 45vh;
  $imgs-h: 15vh;

  .img-player-container {
    border: 8px solid $grey-800;
    .show-image {
      @include benner-background("../assets/images/empty-img.png");
      height: $show-image-h;
    }
    .imgs-row {
      @include flex-row-center-center;
      height: $imgs-h;
      border-top: .5rem solid $grey-800;
      border-collapse: collapse;
      li {
        border-right: .5rem solid $grey-800;
        &:last-child {
          border-right: none;
        }
      }
      .img-small {
        width: 100%;
        height: 100%;
        > img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
      .img-empty {
        @include flex-row-center-center;
        width: 100%;
        height: 100%;
        background-color: $grey-300;
      }
    }
  }
</style>