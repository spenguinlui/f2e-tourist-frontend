<template>
  <div class="img-player-container">
    <div class="show-image" :style="showImageUrl" :alt="showPicture ? '景點大圖' : '找不到圖片'"></div>
    <ul class="imgs-row">
      <template v-if="!data.Picture">
        <li v-for="item in imageList" :key="item" class="img-empty"><img src="../assets/images/icon/empty-img-sm.svg" alt="找不到圖片"></li>
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
import noImage from "@/assets/images/empty-img.png"
import { mapGetters } from 'vuex'

export default {
  props: ['data'],
  data() {
    return {
      imageList: new Array(3)
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
    ...mapGetters('otherModule', ['showPicture'])
  },
  methods: {
    getShowPicture() {
      if (this.showPicture) { return; }
      if (this.data.Picture && this.data.Picture.PictureUrl1) {
        this.$store.commit("otherModule/SET_SHOW_PICTURE", this.data.Picture.PictureUrl1);
      }
    },
    removeShowPicture() {
      this.$store.commit("otherModule/REMOVE_SHOW_PICTURE");
    },
    checkImage(PictureUrl) {
      if (PictureUrl) this.$store.dispatch("otherModule/changeDetailShowPicture", PictureUrl);
    }
  },
  created() {
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
      height: $show-image-h;
      background-image: url("../assets/images/empty-img.png");
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
    }
    .imgs-row {
      @include flex-row-center-center;
      height: $imgs-h;
      border-top: .5rem solid $grey-800;
      li {
        border-right: .5rem solid $grey-800;
      }
      li:last-child {
        border-right: none;
      }
      border-collapse: collapse;
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